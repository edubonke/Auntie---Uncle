/**
 * Core business and calculation logic for Auntie & Uncle Marketplace.
 * Decoupled from UI components for deterministic unit testing.
 */

import { HelperProfile, ServiceCategory } from '../types';

export type { HelperProfile, ServiceCategory };

export interface BookingRequest {
  id: string;
  helperId: string;
  helperName: string;
  service: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  suburb: string;
  address: string;
  date: string;
  timeSlot: 'morning' | 'afternoon' | 'fullday';
  hours: number;
  ratePerHour: number;
  isRecurring: boolean;
  frequency?: 'weekly' | 'fortnightly' | 'monthly';
  totalVisits: number;
  totalAmount: number;
  status: 'requested' | 'accepted' | 'declined' | 'rescheduled' | 'cancelled';
  notes?: string;
  createdAt: string;
}

// 2026 SA Living Wage Benchmark (approx R35 - R45/hr basic, R150+/hr for skilled independent domestic artisan work)
export const SA_LIVING_WAGE_HOURLY = 48; // Baseline statutory decent work benchmark
export const FAIRWORK_RECOMMENDED_MIN = 120; // Recommended minimum for skilled independent home care

/**
 * Calculates total booking amount in ZAR.
 */
export function calculateBookingTotal(
  ratePerHour: number,
  hoursPerVisit: number,
  totalVisits: number = 1
): number {
  if (ratePerHour <= 0 || hoursPerVisit <= 0 || totalVisits <= 0) {
    return 0;
  }
  return ratePerHour * hoursPerVisit * totalVisits;
}

/**
 * Format amount as South African Rands (ZAR).
 */
export function formatZAR(amount: number): string {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

/**
 * Evaluates fair wage metric compared to SA benchmarks.
 */
export function evaluateWageCompliance(ratePerHour: number): {
  ratioToStatutory: number;
  isAboveFairwork: boolean;
  tier: 'fair' | 'standard' | 'premium';
} {
  const ratio = Number((ratePerHour / SA_LIVING_WAGE_HOURLY).toFixed(2));
  const isAboveFairwork = ratePerHour >= FAIRWORK_RECOMMENDED_MIN;
  let tier: 'fair' | 'standard' | 'premium' = 'standard';
  if (ratePerHour >= 250) {
    tier = 'premium';
  } else if (ratePerHour >= 160) {
    tier = 'standard';
  } else {
    tier = 'fair';
  }
  return {
    ratioToStatutory: ratio,
    isAboveFairwork,
    tier,
  };
}

/**
 * Filter and sort helpers deterministically.
 */
export function filterHelpers(
  helpers: HelperProfile[],
  category: string,
  searchQuery: string,
  sortBy: 'recommended' | 'rate-low' | 'rate-high' | 'experience' = 'recommended'
): HelperProfile[] {
  const query = searchQuery.trim().toLowerCase();

  const filtered = helpers.filter((helper) => {
    const matchesCategory = category === 'all' || helper.service.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      !query ||
      helper.name.toLowerCase().includes(query) ||
      helper.area.toLowerCase().includes(query) ||
      helper.regions.some((r) => r.toLowerCase().includes(query)) ||
      helper.services.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered];
  if (sortBy === 'rate-low') {
    sorted.sort((a, b) => a.rate - b.rate);
  } else if (sortBy === 'rate-high') {
    sorted.sort((a, b) => b.rate - a.rate);
  } else if (sortBy === 'experience') {
    sorted.sort((a, b) => b.years - a.years);
  }

  return sorted;
}

/**
 * Generate dates for Phase 5B recurring visit series (2 to 8 visits).
 */
export function generateRecurringDates(
  startDateStr: string,
  frequency: 'weekly' | 'fortnightly' | 'monthly',
  visitCount: number
): string[] {
  const count = Math.max(1, Math.min(8, visitCount));
  const dates: string[] = [];
  const baseDate = new Date(startDateStr);

  if (isNaN(baseDate.getTime())) {
    return [startDateStr];
  }

  for (let i = 0; i < count; i++) {
    const d = new Date(baseDate);
    if (frequency === 'weekly') {
      d.setDate(baseDate.getDate() + i * 7);
    } else if (frequency === 'fortnightly') {
      d.setDate(baseDate.getDate() + i * 14);
    } else if (frequency === 'monthly') {
      d.setMonth(baseDate.getMonth() + i);
    }
    dates.push(d.toISOString().split('T')[0]);
  }

  return dates;
}
