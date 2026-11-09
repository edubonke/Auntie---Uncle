import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBookingTotal,
  formatZAR,
  evaluateWageCompliance,
  filterHelpers,
  generateRecurringDates,
  HelperProfile,
} from './marketplace';

const SAMPLE_DATA: HelperProfile[] = [
  {
    id: 'h1',
    name: 'Nandi K.',
    initials: 'NK',
    service: 'Cleaning',
    area: 'Randburg',
    regions: ['Randburg', 'Johannesburg'],
    rate: 180,
    years: 8,
    icon: '🧹',
    tone: 'peach',
    headline: 'Reliable, thoughtful home refreshes',
    bio: 'Dedicated cleaning with high attention to detail.',
    services: ['Routine cleaning', 'Deep cleans'],
    schedule: 'Mondays to Fridays',
  },
  {
    id: 'h2',
    name: 'Thabo M.',
    initials: 'TM',
    service: 'Childcare',
    area: 'Sandton',
    regions: ['Sandton', 'Johannesburg'],
    rate: 220,
    years: 6,
    icon: '🧸',
    tone: 'sand',
    headline: 'Patient, routine-centered childcare',
    bio: 'Experienced caregiver with focus on routines.',
    services: ['After-school care', 'Homework help'],
    schedule: 'Afternoons',
  },
  {
    id: 'h3',
    name: 'Sipho D.',
    initials: 'SD',
    service: 'Handyman',
    area: 'Midrand',
    regions: ['Midrand'],
    rate: 290,
    years: 12,
    icon: '🛠️',
    tone: 'amber',
    headline: 'Practical household fixes',
    bio: 'Master of assemblies and fixtures.',
    services: ['Furniture assembly', 'Minor repairs'],
    schedule: 'By appointment',
  },
];

test('calculateBookingTotal returns correct ZAR multiplication', () => {
  assert.equal(calculateBookingTotal(180, 4, 1), 720);
  assert.equal(calculateBookingTotal(200, 4, 4), 3200);
  assert.equal(calculateBookingTotal(0, 4, 2), 0);
  assert.equal(calculateBookingTotal(150, 0, 2), 0);
});

test('formatZAR formats with proper en-ZA R prefix', () => {
  assert.equal(formatZAR(720), 'R720');
  assert.equal(formatZAR(3200), 'R3,200');
});

test('evaluateWageCompliance correctly calculates statutory ratios and tiers', () => {
  const result = evaluateWageCompliance(180);
  assert.equal(result.isAboveFairwork, true);
  assert.equal(result.tier, 'standard');
  assert.ok(result.ratioToStatutory > 3.0);

  const premium = evaluateWageCompliance(290);
  assert.equal(premium.tier, 'premium');
});

test('filterHelpers handles category, query and sorting properly', () => {
  // Category filter
  const cleaningOnly = filterHelpers(SAMPLE_DATA, 'Cleaning', '');
  assert.equal(cleaningOnly.length, 1);
  assert.equal(cleaningOnly[0].id, 'h1');

  // Search query in suburb
  const midrandOnly = filterHelpers(SAMPLE_DATA, 'all', 'Midrand');
  assert.equal(midrandOnly.length, 1);
  assert.equal(midrandOnly[0].id, 'h3');

  // Rate sorting: lowest to highest
  const sortedRateAsc = filterHelpers(SAMPLE_DATA, 'all', '', 'rate-low');
  assert.equal(sortedRateAsc[0].rate, 180);
  assert.equal(sortedRateAsc[sortedRateAsc.length - 1].rate, 290);

  // Experience sorting: highest first
  const sortedExp = filterHelpers(SAMPLE_DATA, 'all', '', 'experience');
  assert.equal(sortedExp[0].years, 12);
});

test('generateRecurringDates creates predictable series of dates', () => {
  const dates = generateRecurringDates('2026-11-10', 'weekly', 4);
  assert.equal(dates.length, 4);
  assert.equal(dates[0], '2026-11-10');
  assert.equal(dates[1], '2026-11-17');
  assert.equal(dates[2], '2026-11-24');
  assert.equal(dates[3], '2026-12-01');
});
