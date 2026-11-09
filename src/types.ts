export type ServiceCategory =
  | 'Cleaning'
  | 'Childcare'
  | 'Cooking'
  | 'Gardening'
  | 'Handyman'
  | 'Moving & rearranging';

export interface HelperProfile {
  id: string;
  name: string;
  initials: string;
  service: ServiceCategory;
  area: string;
  regions: string[];
  rate: number; // ZAR per hour
  years: number;
  icon: string;
  tone: 'mint' | 'peach' | 'sage' | 'lilac' | 'sand' | 'amber';
  headline: string;
  bio: string;
  services: string[];
  schedule: string;
  isLive?: boolean;
  rating?: number;
  completedJobs?: number;
  availableDays?: string[];
}

export interface BookingRequest {
  id: string;
  helperId: string;
  helperName: string;
  helperInitials: string;
  helperTone: string;
  service: ServiceCategory;
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
  recurringDates?: string[];
  totalAmount: number;
  status: 'requested' | 'accepted' | 'declined' | 'rescheduled' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export type PaletteTheme =
  | 'protea'
  | 'highveld'
  | 'jacaranda'
  | 'tablemountain'
  | 'obsidian';
