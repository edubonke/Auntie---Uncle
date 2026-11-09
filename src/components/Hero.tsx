import React from 'react';
import { Search, MapPin, Sparkles, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';
import { ServiceCategory } from '../types';

interface HeroProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  totalHelpers: number;
}

const QUICK_SUBURBS = ['Sandton', 'Randburg', 'Soweto', 'Pretoria', 'Midrand', 'Rosebank'];

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalHelpers,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Value Proposition & Search Tool */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <Sparkles className="h-4 w-4" />
              <span>South Africa’s Household Helper Marketplace</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--theme-text)] leading-[1.12] text-balance">
              The right help for <em>everyday life.</em>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[var(--theme-text-muted)] leading-relaxed max-w-xl">
              Connect directly with verified independent cleaners, childcare companions, home cooks, gardeners, and handymen. No middlemen, no commission deductions.
            </p>

            {/* Interactive Discovery Toolbar */}
            <div className="mt-8 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3 sm:p-4 shadow-xl transition-all">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearchSubmit();
                }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3"
              >
                {/* Service Dropdown */}
                <div className="sm:col-span-5 flex flex-col justify-center px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-[var(--theme-border-subtle)]">
                  <label htmlFor="hero-service-select" className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    I need help with
                  </label>
                  <select
                    id="hero-service-select"
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className="mt-0.5 bg-transparent font-medium text-sm text-[var(--theme-text)] focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">All 6 Household Services</option>
                    <option value="Cleaning">Cleaning & Deep Refreshes</option>
                    <option value="Childcare">Childcare & Routines</option>
                    <option value="Cooking">Cooking & Meal Prep</option>
                    <option value="Gardening">Gardening & Outdoor Care</option>
                    <option value="Handyman">Handyman & Assemblies</option>
                    <option value="Moving & rearranging">Moving & Rearranging</option>
                  </select>
                </div>

                {/* Suburb / Location Search */}
                <div className="sm:col-span-4 flex flex-col justify-center px-3 py-1.5">
                  <label htmlFor="hero-location-input" className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    Location or suburb
                  </label>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[var(--theme-text-muted)] shrink-0" />
                    <input
                      id="hero-location-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="e.g. Randburg, Sandton"
                      className="w-full bg-transparent font-medium text-sm text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]/60 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-3 flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[var(--theme-accent)] px-6 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-[var(--theme-accent-hover)] transition-all active:scale-98"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Quick Suburb Filters */}
              <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-t border-[var(--theme-border-subtle)] pt-3 text-xs">
                <span className="text-[var(--theme-text-muted)] mr-1">Popular:</span>
                {QUICK_SUBURBS.map((suburb) => (
                  <button
                    key={suburb}
                    type="button"
                    onClick={() => {
                      onSearchChange(suburb);
                      onSearchSubmit();
                    }}
                    className="rounded-full bg-[var(--theme-card-subtle)] px-2.5 py-1 text-[11px] font-medium text-[var(--theme-text)] hover:bg-[var(--theme-accent-soft)] transition-colors"
                  >
                    {suburb}
                  </button>
                ))}
              </div>
            </div>

            {/* Proof Metrics & Adjacency */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--theme-border-subtle)] pt-6 text-[var(--theme-text)]">
              <div>
                <p className="font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-text)]">
                  {totalHelpers}+
                </p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                  Vetted Profiles
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-text)]">
                  R0
                </p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                  Broker Deductions
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-text)]">
                  100%
                </p>
                <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                  Direct Helper Pay
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Photography & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-2xl aspect-4/3 lg:aspect-5/4">
                <img
                  src="/src/assets/images/hero_household_care_1794245337497.jpg"
                  alt="Bright, welcoming South African home living room with natural plants and peaceful family atmosphere"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                    The Auntie & Uncle Promise
                  </p>
                  <p className="font-serif text-lg font-bold leading-snug">
                    Dignified work, peaceful homes.
                  </p>
                </div>
              </div>

              {/* Floating Badge 1 (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3 shadow-lg flex items-center gap-3 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--theme-text)]">Approved Directory</p>
                  <p className="text-[11px] text-[var(--theme-text-muted)]">Gauteng independent network</p>
                </div>
              </div>

              {/* Floating Badge 2 (Bottom Right) */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-3 shadow-lg flex items-center gap-3 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[var(--theme-text)]">Fair Living Wage</p>
                  <p className="text-[11px] text-[var(--theme-text-muted)]">Benchmark standards verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
