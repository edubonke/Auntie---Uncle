import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--theme-border-subtle)] bg-[var(--theme-card)] py-14 transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--theme-border-subtle)]">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <a href="#" className="font-serif text-2xl font-bold tracking-tight text-[var(--theme-text)]">
              Auntie & Uncle
            </a>
            <p className="mt-3 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed max-w-sm">
              South Africa’s premier independent marketplace connecting caring households with skilled cleaners, childcare companions, home cooks, gardeners, and handymen.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-[var(--theme-text-muted)]">
              <span>Crafted for South Africa</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                Ubuntu & Dignified Work
              </span>
            </div>
          </div>

          {/* Services Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
              Household Services
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--theme-text)]">
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Cleaning & Deep Refreshes</a></li>
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Childcare & Routine Support</a></li>
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Cooking & Weekly Prep</a></li>
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Gardening & Fynbos Upkeep</a></li>
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Handyman & Furniture Fixes</a></li>
              <li><a href="#directory" className="hover:text-[var(--theme-accent)] transition-colors">Moving & Rearranging</a></li>
            </ul>
          </div>

          {/* Regional Hubs & Trust */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
              Regional Coverage (Gauteng)
            </h4>
            <p className="mt-3 text-xs text-[var(--theme-text-muted)] leading-relaxed">
              Serving households across Sandton, Randburg, Rosebank, Johannesburg CBD, Soweto, Midrand, Centurion, Pretoria, and surrounding suburbs.
            </p>
            <div className="mt-4 rounded-xl border border-[var(--theme-border-subtle)] bg-[var(--theme-bg)] p-3 text-[11px] text-[var(--theme-text-muted)]">
              Listing approval is an administrative review of information provided by helpers, not an endorsement or employer verification.
            </div>
          </div>
        </div>

        {/* Bottom row: Clean metadata & legal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--theme-text-muted)]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Auntie & Uncle Marketplace</span>
            <span aria-hidden="true">·</span>
            <span>POPIA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Zero Broker Deductions</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="#fair-wage" className="hover:text-[var(--theme-text)] transition-colors">Fair Living Wage</a>
            <a href="#how-it-works" className="hover:text-[var(--theme-text)] transition-colors">Safety Guidelines</a>
            <a href="#services" className="hover:text-[var(--theme-text)] transition-colors">All Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
