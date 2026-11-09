import React from 'react';
import { Palette, Check, Sparkles, X, Sun, Moon } from 'lucide-react';
import { PaletteTheme } from '../types';

interface AwwwardsPaletteStudioProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: PaletteTheme;
  onSelectTheme: (theme: PaletteTheme) => void;
}

interface ThemeSpec {
  id: PaletteTheme;
  name: string;
  region: string;
  inspiration: string;
  colors: {
    bg: string;
    card: string;
    accent: string;
    text: string;
  };
  isDark?: boolean;
}

const THEMES: ThemeSpec[] = [
  {
    id: 'protea',
    name: 'Warm Protea',
    region: 'Western Cape & Highveld',
    inspiration: 'Inspired by South Africa’s national floral symbol and warm terracotta clay homes.',
    colors: {
      bg: '#FAF8F5',
      card: '#FFFFFF',
      accent: '#C2562E',
      text: '#191E1A',
    },
  },
  {
    id: 'highveld',
    name: 'Highveld Ochre',
    region: 'Johannesburg & Witwatersrand',
    inspiration: 'Warm afternoon golden light over Joburg mine stone, warm grass, and amber sunsets.',
    colors: {
      bg: '#FAF7F0',
      card: '#FFFFFF',
      accent: '#C47814',
      text: '#1C1B17',
    },
  },
  {
    id: 'jacaranda',
    name: 'Jacaranda Bloom',
    region: 'Pretoria & Rosebank',
    inspiration: 'Spring purple tree canopies in October across Pretoria and Johannesburg avenues.',
    colors: {
      bg: '#F9F7FA',
      card: '#FFFFFF',
      accent: '#6C498C',
      text: '#1B1824',
    },
  },
  {
    id: 'tablemountain',
    name: 'Table Mountain Sage',
    region: 'Cape Peninsula Fynbos',
    inspiration: 'Indigenous fynbos flora, wild olive leaves, and crisp Atlantic morning mist.',
    colors: {
      bg: '#F6F8F6',
      card: '#FFFFFF',
      accent: '#256E52',
      text: '#142018',
    },
  },
  {
    id: 'obsidian',
    name: 'Karoo Obsidian',
    region: 'Great Karoo Night Sky',
    inspiration: 'Dark editorial stargazing aesthetic, deep basalt stone, and warm brass starlight.',
    colors: {
      bg: '#121413',
      card: '#1A1D1B',
      accent: '#CCA84D',
      text: '#F3F5F4',
    },
    isDark: true,
  },
];

export const AwwwardsPaletteStudio: React.FC<AwwwardsPaletteStudioProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-studio-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Awwwards Tool Feature · Inspired by Colir & Huemint</span>
            </div>
            <h2 id="palette-studio-title" className="mt-1 font-serif text-2xl font-bold text-[var(--theme-text)]">
              South African Atmosphere Studio
            </h2>
            <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
              Switch the marketplace colour palette in real-time. Each atmosphere is tuned for legibility, warmth, and regional identity.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            aria-label="Close atmosphere studio"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {THEMES.map((theme) => {
            const isSelected = activeTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onSelectTheme(theme.id)}
                className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] shadow-xs'
                    : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 bg-[var(--theme-card)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-1">
                    <span
                      className="h-8 w-8 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: theme.colors.accent }}
                      title={`Accent: ${theme.colors.accent}`}
                    />
                    <span
                      className="h-8 w-8 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: theme.colors.bg }}
                      title={`Background: ${theme.colors.bg}`}
                    />
                    <span
                      className="h-8 w-8 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: theme.colors.text }}
                      title={`Text: ${theme.colors.text}`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-[var(--theme-text)]">
                        {theme.name}
                      </h3>
                      <span className="text-xs text-[var(--theme-text-muted)]">
                        · {theme.region}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--theme-text-muted)] line-clamp-1">
                      {theme.inspiration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4">
                  {theme.isDark ? (
                    <Moon className="h-4 w-4 text-[var(--theme-text-muted)]" />
                  ) : (
                    <Sun className="h-4 w-4 text-[var(--theme-text-muted)]" />
                  )}
                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--theme-accent)] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--theme-border-subtle)] pt-4 text-xs text-[var(--theme-text-muted)]">
          <span>Tuned to WCAG AA 4.5:1 contrast standards</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--theme-accent)] px-4 py-2 font-medium text-white hover:bg-[var(--theme-accent-hover)] transition-colors"
          >
            Apply Atmosphere
          </button>
        </div>
      </div>
    </div>
  );
};
