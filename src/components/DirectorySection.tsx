import React from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, Star, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { HelperProfile, ServiceCategory } from '../types';
import { formatZAR } from '../utils/marketplace';

interface DirectorySectionProps {
  helpers: HelperProfile[];
  category: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'recommended' | 'rate-low' | 'rate-high' | 'experience';
  onSortChange: (sort: 'recommended' | 'rate-low' | 'rate-high' | 'experience') => void;
  onViewProfile: (helper: HelperProfile) => void;
  onBookHelper: (helper: HelperProfile) => void;
  onResetFilters: () => void;
}

export const DirectorySection: React.FC<DirectorySectionProps> = ({
  helpers,
  category,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onViewProfile,
  onBookHelper,
  onResetFilters,
}) => {
  return (
    <section id="directory" className="py-16 lg:py-24 bg-[var(--theme-card-subtle)]/50 border-t border-[var(--theme-border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <ShieldCheck className="h-4 w-4" />
              <span>Independent Helper Directory</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text)]">
              People who can <em>make a difference.</em>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
            Search by service and suburb. Compare transparent hourly rates in ZAR and book one-off or recurring visits directly.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-4 sm:p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Category Dropdown */}
            <div className="md:col-span-4 flex flex-col justify-center">
              <label htmlFor="dir-category" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                Service category
              </label>
              <select
                id="dir-category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
              >
                <option value="all">All Household Services</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Childcare">Childcare</option>
                <option value="Cooking">Cooking</option>
                <option value="Gardening">Gardening</option>
                <option value="Handyman">Handyman</option>
                <option value="Moving & rearranging">Moving & Rearranging</option>
              </select>
            </div>

            {/* Suburb Search */}
            <div className="md:col-span-4 flex flex-col justify-center">
              <label htmlFor="dir-search" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                Suburb or region
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--theme-text-muted)]" />
                <input
                  id="dir-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="e.g. Randburg, Sandton, Soweto"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] pl-9 pr-3 py-2 text-xs font-medium text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]/60 focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex flex-col justify-center">
              <label htmlFor="dir-sort" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                Sort directory
              </label>
              <div className="relative mt-1">
                <ArrowUpDown className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--theme-text-muted)]" />
                <select
                  id="dir-sort"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as any)}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] pl-9 pr-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rate-low">Lowest rate (ZAR)</option>
                  <option value="rate-high">Highest rate (ZAR)</option>
                  <option value="experience">Most experience</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-1 flex items-end">
              <button
                type="button"
                onClick={onResetFilters}
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card-subtle)] py-2 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition-colors"
                title="Reset filters"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Metadata Summary (Zero-Pill Discipline) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--theme-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--theme-text)] font-mono-numbers">
              {helpers.length} {helpers.length === 1 ? 'profile' : 'profiles'} shown
            </span>
            <span aria-hidden="true">·</span>
            <span>Gauteng Independent Network</span>
            <span aria-hidden="true">·</span>
            <span>All rates in ZAR</span>
          </div>
          <span className="text-[11px] text-[var(--theme-text-muted)] italic">
            Rates are decided by independent helpers, not set by the platform.
          </span>
        </div>

        {/* Empty State */}
        {helpers.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-card)] p-12 text-center">
            <h3 className="font-serif text-2xl font-bold text-[var(--theme-text)]">
              No matching helper profiles found
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] max-w-md mx-auto">
              We couldn't find helpers matching your current filter. Try searching for a neighbouring suburb or exploring all services.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 rounded-full bg-[var(--theme-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--theme-accent-hover)] transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Helper Cards Grid */
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpers.map((helper) => (
              <article
                key={helper.id}
                className="flex flex-col justify-between rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--theme-card-subtle)] border border-[var(--theme-border-subtle)] font-serif text-lg font-bold text-[var(--theme-accent)]">
                        {helper.initials}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[var(--theme-text)]">
                          {helper.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]">
                          <span>{helper.service}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-medium font-mono-numbers">
                            <Star className="h-3 w-3 fill-amber-500" />
                            {helper.rating || 4.9}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      APPROVED
                    </span>
                  </div>

                  {/* Headline */}
                  <p className="mt-4 text-xs sm:text-sm font-medium text-[var(--theme-text)] line-clamp-2">
                    "{helper.headline}"
                  </p>

                  {/* Unboxed Metadata (Zero-Pill Discipline) */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--theme-text-muted)] border-t border-[var(--theme-border-subtle)] pt-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{helper.area}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-numbers">
                      {helper.years} yrs experience
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-numbers">
                      {helper.completedJobs || 50}+ jobs
                    </span>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="mt-3 text-xs text-[var(--theme-text-muted)] line-clamp-2">
                    {helper.bio}
                  </p>
                </div>

                {/* Card Bottom: Rate & Direct Actions */}
                <div className="mt-6 border-t border-[var(--theme-border-subtle)] pt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-serif text-xl font-bold font-mono-numbers text-[var(--theme-text)]">
                      {formatZAR(helper.rate)}
                    </span>
                    <span className="text-[11px] text-[var(--theme-text-muted)]">
                      /hr
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewProfile(helper)}
                      className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] px-3.5 py-1.5 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card-subtle)] transition-colors"
                    >
                      Profile ↗
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookHelper(helper)}
                      className="rounded-full bg-[var(--theme-accent)] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--theme-accent-hover)] transition-colors"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
