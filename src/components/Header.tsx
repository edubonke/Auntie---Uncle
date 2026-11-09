import React from 'react';
import { Palette, CalendarCheck, Sparkles, UserPlus } from 'lucide-react';
import { PaletteTheme } from '../types';

interface HeaderProps {
  activeTheme: PaletteTheme;
  onOpenPaletteStudio: () => void;
  onOpenPortal: () => void;
  onOpenApplication: () => void;
  bookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPaletteStudio,
  onOpenPortal,
  onOpenApplication,
  bookingsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--theme-border-subtle)] bg-[var(--theme-bg)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-serif text-2xl font-bold tracking-tight text-[var(--theme-text)] whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          Auntie & Uncle
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--theme-text-muted)]">
          <a
            href="#services"
            className="hover:text-[var(--theme-text)] transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#directory"
            className="hover:text-[var(--theme-text)] transition-colors whitespace-nowrap shrink-0"
          >
            Helper Directory
          </a>
          <a
            href="#fair-wage"
            className="hover:text-[var(--theme-text)] transition-colors whitespace-nowrap shrink-0"
          >
            Fair Wage & Trust
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[var(--theme-text)] transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
        </nav>

        {/* Zone 3: 1 primary action with secondary portal & theme controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPaletteStudio}
            className="group flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] px-3.5 py-2 text-xs font-medium text-[var(--theme-text)] transition-all hover:border-[var(--theme-accent)] shadow-xs"
            aria-label="Open Palette Studio"
            title="Awwwards Palette Studio: Customize atmosphere"
          >
            <Palette className="h-3.5 w-3.5 text-[var(--theme-accent)] transition-transform group-hover:rotate-45" />
            <span className="hidden sm:inline">Atmosphere</span>
          </button>

          <button
            type="button"
            onClick={onOpenPortal}
            className="relative flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] px-3.5 py-2 text-xs font-medium text-[var(--theme-text)] transition-all hover:border-[var(--theme-accent)] shadow-xs"
            aria-label="My Bookings and Portal"
          >
            <CalendarCheck className="h-3.5 w-3.5 text-[var(--theme-accent)]" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookingsCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--theme-accent)] text-[10px] font-bold text-white font-mono-numbers">
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenApplication}
            className="hidden lg:flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card)] transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Join as Helper</span>
          </button>

          <a
            href="#directory"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--theme-accent)] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[var(--theme-accent-hover)] active:scale-98 whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Find a Helper</span>
          </a>
        </div>
      </div>
    </header>
  );
};
