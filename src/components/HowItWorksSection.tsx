import React from 'react';
import { ShieldCheck, HeartHandshake, Calendar, DollarSign, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenApplication: () => void;
  onExploreDirectory: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({
  onOpenApplication,
  onExploreDirectory,
}) => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 border-t border-[var(--theme-border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              The Auntie & Uncle Way
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text)]">
              Simplicity, dignity & <em>mutual trust.</em>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
            A household marketplace built around human connection. Here is how households and independent helpers connect seamlessly across South Africa.
          </p>
        </div>

        {/* 4 Steps Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-[var(--theme-kicker)]">
                01. STEP
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[var(--theme-text)]">
                Discover Local Helpers
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                Filter by service (cleaning, childcare, cooking, garden, repairs, moving) and your specific suburb in Gauteng.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)]">
              Verified local references
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-[var(--theme-kicker)]">
                02. STEP
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[var(--theme-text)]">
                Transparent Rates
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                Review verified hourly rates in ZAR, bios, schedules, and past customer reviews before sending an inquiry.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)]">
              Clear up-front pricing
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-[var(--theme-kicker)]">
                03. STEP
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[var(--theme-text)]">
                Flexible Scheduling
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                Choose single visits or Phase 5B bounded recurring series (weekly, fortnightly, monthly 2–8 visits) with date previews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)]">
              Morning, afternoon, or full day
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <span className="font-mono text-xs font-bold text-[var(--theme-kicker)]">
                04. STEP
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-[var(--theme-text)]">
                100% Direct Pay
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                Pay directly upon completion. Zero middleman deductions, ensuring fair wages and genuine relationship building.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border-subtle)] text-xs text-[var(--theme-text-muted)]">
              Fair Living Wage compliant
            </div>
          </div>
        </div>

        {/* Editorial Photo Split / Visual Proof */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 flex flex-col justify-between min-h-[320px]">
            <img
              src="/src/assets/images/home_cooking_table_1794245337850.jpg"
              alt="Wholesome family meal prepared with care by independent home cook"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Household Stories
              </span>
            </div>
            <div className="relative z-10 text-white">
              <h3 className="font-serif text-2xl font-bold">
                "More than cleaning—peace of mind for our home."
              </h3>
              <p className="mt-2 text-xs text-white/80 max-w-md">
                Connecting with Nandi K. gave our busy Johannesburg home time to breathe on weekends. Everything agreed directly with respect.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/90">
                <span>The Dlamini Family</span>
                <span aria-hidden="true">·</span>
                <span>Randburg</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 flex flex-col justify-between min-h-[320px]">
            <img
              src="/src/assets/images/garden_patio_bloom_1794245337619.jpg"
              alt="Lush green garden maintained with care by independent gardener in Gauteng"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-103"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Helper Network
              </span>
            </div>
            <div className="relative z-10 text-white">
              <h3 className="font-serif text-2xl font-bold">
                "I set my own rate and schedule with dignified clients."
              </h3>
              <p className="mt-2 text-xs text-white/80 max-w-md">
                Kabelo R. built a steady rotation of weekly gardening clients across Pretoria and Tshwane with zero agency commissions deducted.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/90">
                <span>Kabelo R.</span>
                <span aria-hidden="true">·</span>
                <span>Waterkloof & Pretoria</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="mt-12 rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="text-left">
            <h3 className="font-serif text-2xl font-bold text-[var(--theme-text)]">
              Ready to find a caring hand for your space?
            </h3>
            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
              Browse approved profiles or apply to offer your services as an independent helper.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenApplication}
              className="rounded-full border border-[var(--theme-border)] px-5 py-2.5 text-xs font-semibold text-[var(--theme-text)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            >
              Join as a Helper
            </button>
            <button
              type="button"
              onClick={onExploreDirectory}
              className="rounded-full bg-[var(--theme-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--theme-accent-hover)] transition-colors"
            >
              Explore Directory
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
