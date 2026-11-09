import React, { useState } from 'react';
import { Calculator, CheckCircle2, TrendingUp, HeartHandshake, Info } from 'lucide-react';
import { formatZAR, SA_LIVING_WAGE_HOURLY } from '../utils/marketplace';

export const FairWageCalculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(200);
  const [weeklyHours, setWeeklyHours] = useState<number>(16);

  const weeklyIncome = hourlyRate * weeklyHours;
  const monthlyIncome = weeklyIncome * 4.33;
  const ratioToStatutory = (hourlyRate / SA_LIVING_WAGE_HOURLY).toFixed(1);

  return (
    <section id="fair-wage" className="py-16 lg:py-24 border-t border-[var(--theme-border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Laws of UX Principles */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <Calculator className="h-4 w-4" />
              <span>Awwwards Interactive Tool · Laws of UX Applied</span>
            </div>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text)]">
              Fair work, transparent pay, <em>zero cuts.</em>
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
              Standard agency platforms charge up to 30% broker deductions on every hour worked. Auntie & Uncle operates on a 100% direct model: every cent you pay goes directly into the helper's hands.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--theme-text)]">
                    Dignified Living Wage Baseline
                  </h4>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                    We educate households to contract above statutory minimums (R27.58/hr) so helpers can support families and cover transport costs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--theme-text)]">
                    Direct P2P Agreement (No Lock-in)
                  </h4>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                    Clients and helpers agree directly on task scopes, supplies, and recurring schedules with total flexibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--theme-text)]">
                    South African Community First
                  </h4>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                    Designed specifically for Gauteng and South African urban contexts with genuine neighbourhood safety protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Living Wage Calculator Sandbox */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-[var(--theme-border-subtle)] pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[var(--theme-text)]">
                    Household Budget & Helper Earnings Simulator
                  </h3>
                  <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                    Adjust hours and hourly rates to simulate take-home compensation.
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              {/* Sliders */}
              <div className="mt-6 space-y-6">
                {/* Hourly Rate Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="rate-slider" className="font-semibold text-[var(--theme-text)]">
                      Helper Hourly Rate (ZAR)
                    </label>
                    <span className="font-serif text-lg font-bold font-mono-numbers text-[var(--theme-accent)]">
                      {formatZAR(hourlyRate)}/hr
                    </span>
                  </div>
                  <input
                    id="rate-slider"
                    type="range"
                    min="140"
                    max="350"
                    step="10"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="mt-2 w-full accent-[var(--theme-accent)] cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-[var(--theme-text-muted)] font-mono-numbers">
                    <span>R140/hr (Fair Entry)</span>
                    <span>R220/hr (Skilled Average)</span>
                    <span>R350/hr (Artisan / Master)</span>
                  </div>
                </div>

                {/* Weekly Hours Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor="hours-slider" className="font-semibold text-[var(--theme-text)]">
                      Weekly Service Commitment
                    </label>
                    <span className="font-serif text-lg font-bold font-mono-numbers text-[var(--theme-text)]">
                      {weeklyHours} hrs/week
                    </span>
                  </div>
                  <input
                    id="hours-slider"
                    type="range"
                    min="4"
                    max="40"
                    step="2"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="mt-2 w-full accent-[var(--theme-accent)] cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-[var(--theme-text-muted)] font-mono-numbers">
                    <span>4 hrs (One half-day)</span>
                    <span>16 hrs (2 full days)</span>
                    <span>40 hrs (Full-time)</span>
                  </div>
                </div>
              </div>

              {/* Result Cards Grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[var(--theme-border-subtle)] pt-6">
                <div className="rounded-2xl bg-[var(--theme-card-subtle)] p-4 border border-[var(--theme-border-subtle)]">
                  <p className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    Weekly Total
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-text)]">
                    {formatZAR(weeklyIncome)}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                    Direct to helper
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--theme-card-subtle)] p-4 border border-[var(--theme-border-subtle)]">
                  <p className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    Est. Monthly Total
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-accent)]">
                    {formatZAR(monthlyIncome)}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                    ~4.33 weeks
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--theme-card-subtle)] p-4 border border-[var(--theme-border-subtle)]">
                  <p className="text-[11px] font-semibold text-[var(--theme-text-muted)] uppercase tracking-wider">
                    Decency Multiple
                  </p>
                  <p className="mt-1 font-serif text-2xl font-bold font-mono-numbers text-emerald-600 dark:text-emerald-400">
                    {ratioToStatutory}×
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                    vs SA living benchmark
                  </p>
                </div>
              </div>

              {/* Notice */}
              <div className="mt-6 flex items-start gap-2 text-xs text-[var(--theme-text-muted)] bg-[var(--theme-bg)] p-3 rounded-xl border border-[var(--theme-border-subtle)]">
                <Info className="h-4 w-4 shrink-0 text-[var(--theme-accent)] mt-0.5" />
                <span>
                  The Auntie & Uncle platform does not take commissions or transaction percentages from these amounts. Payments are made directly between client and helper.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
