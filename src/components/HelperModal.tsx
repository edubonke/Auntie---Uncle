import React from 'react';
import { X, MapPin, Calendar, Clock, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { HelperProfile } from '../types';
import { formatZAR } from '../utils/marketplace';

interface HelperModalProps {
  helper: HelperProfile | null;
  onClose: () => void;
  onBook: (helper: HelperProfile) => void;
}

export const HelperModal: React.FC<HelperModalProps> = ({ helper, onClose, onBook }) => {
  if (!helper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="helper-profile-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border-subtle)] pb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--theme-card-subtle)] border border-[var(--theme-border-subtle)] font-serif text-2xl font-bold text-[var(--theme-accent)]">
              {helper.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
                  {helper.service}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  APPROVED LISTING
                </span>
              </div>
              <h2 id="helper-profile-title" className="mt-1 font-serif text-2xl font-bold text-[var(--theme-text)]">
                {helper.name}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-xs text-[var(--theme-text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{helper.area}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{helper.years} years verified experience</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-0.5 text-amber-600 font-semibold font-mono-numbers">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  {helper.rating || 4.9} ({helper.completedJobs || 60} reviews)
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            aria-label="Close profile"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Headline quote */}
          <div className="rounded-2xl bg-[var(--theme-card-subtle)] p-4 border border-[var(--theme-border-subtle)]">
            <p className="font-serif text-base italic text-[var(--theme-text)]">
              "{helper.headline}"
            </p>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
              About {helper.name}
            </h3>
            <p className="mt-2 text-sm text-[var(--theme-text)] leading-relaxed">
              {helper.bio}
            </p>
          </div>

          {/* Services Provided */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
              Services & Capabilities
            </h3>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {helper.services.map((srv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-[var(--theme-border-subtle)] bg-[var(--theme-bg)] p-3 text-xs font-medium text-[var(--theme-text)]"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Suburbs & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--theme-border-subtle)] pt-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>Service Suburbs</span>
              </h3>
              <p className="mt-1.5 text-xs text-[var(--theme-text)]">
                {helper.regions.join(', ')}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Typical Schedule</span>
              </h3>
              <p className="mt-1.5 text-xs text-[var(--theme-text)]">
                {helper.schedule}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Rate & Direct Booking Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--theme-border-subtle)] pt-6">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl font-bold font-mono-numbers text-[var(--theme-text)]">
                {formatZAR(helper.rate)}
              </span>
              <span className="text-xs text-[var(--theme-text-muted)]">
                /hour
              </span>
            </div>
            <p className="text-[11px] text-[var(--theme-text-muted)]">
              Direct payment on arrival · Zero platform fee
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto rounded-full border border-[var(--theme-border)] px-5 py-2.5 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBook(helper);
              }}
              className="w-1/2 sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[var(--theme-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--theme-accent-hover)] transition-all"
            >
              <span>Book with {helper.name.split(' ')[0]}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
