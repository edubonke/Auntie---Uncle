import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, RefreshCw, UserCheck, Repeat } from 'lucide-react';
import { BookingRequest } from '../types';
import { formatZAR } from '../utils/marketplace';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRequest[];
  onUpdateStatus: (id: string, newStatus: BookingRequest['status']) => void;
  onReschedule: (id: string, newDate: string) => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateStatus,
  onReschedule,
}) => {
  const [roleMode, setRoleMode] = useState<'client' | 'helper'>('client');
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDateInput, setNewDateInput] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border-subtle)] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <Calendar className="h-4 w-4" />
              <span>Auntie & Uncle Portal</span>
            </div>
            <h2 id="portal-title" className="mt-1 font-serif text-2xl font-bold text-[var(--theme-text)]">
              My Appointments & Requests
            </h2>
            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
              Manage your active household help bookings and review statuses in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher (Household Client vs Independent Helper) */}
            <div className="flex items-center gap-1 rounded-xl bg-[var(--theme-card-subtle)] p-1 text-xs">
              <button
                type="button"
                onClick={() => setRoleMode('client')}
                className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  roleMode === 'client'
                    ? 'bg-[var(--theme-card)] text-[var(--theme-text)] shadow-xs'
                    : 'text-[var(--theme-text-muted)]'
                }`}
              >
                Household View
              </button>
              <button
                type="button"
                onClick={() => setRoleMode('helper')}
                className={`rounded-lg px-2.5 py-1 font-medium transition-colors ${
                  roleMode === 'helper'
                    ? 'bg-[var(--theme-card)] text-[var(--theme-text)] shadow-xs'
                    : 'text-[var(--theme-text-muted)]'
                }`}
              >
                Helper View
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-subtle)] transition-colors"
              aria-label="Close portal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--theme-border)] p-12 text-center bg-[var(--theme-card-subtle)]/50">
              <Calendar className="mx-auto h-8 w-8 text-[var(--theme-text-muted)] opacity-60" />
              <h3 className="mt-3 font-serif text-lg font-bold text-[var(--theme-text)]">
                No active bookings yet
              </h3>
              <p className="mt-1 text-xs text-[var(--theme-text-muted)]">
                Browse our directory of independent cleaners, childcare companions, cooks, and handymen to request your first visit.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-full bg-[var(--theme-accent)] px-5 py-2 text-xs font-semibold text-white hover:bg-[var(--theme-accent-hover)] transition-colors"
              >
                Browse Directory
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-5 shadow-xs transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--theme-border-subtle)] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--theme-card-subtle)] font-serif font-bold text-[var(--theme-accent)]">
                      {booking.helperInitials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[var(--theme-text)]">
                        {booking.service} with {booking.helperName}
                      </h4>
                      <p className="text-xs text-[var(--theme-text-muted)]">
                        Client: {booking.clientName} · {booking.suburb}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {booking.status === 'requested' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <AlertCircle className="h-3 w-3" />
                        Requested · Awaiting Helper
                      </span>
                    )}
                    {booking.status === 'accepted' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="h-3 w-3" />
                        Confirmed & Accepted
                      </span>
                    )}
                    {booking.status === 'rescheduled' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        <RefreshCw className="h-3 w-3" />
                        Rescheduled
                      </span>
                    )}
                    {booking.status === 'cancelled' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700">
                        <XCircle className="h-3 w-3" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--theme-text)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-[var(--theme-text-muted)] shrink-0" />
                    <span>
                      {booking.date}{' '}
                      <span className="text-[var(--theme-text-muted)] font-mono-numbers">
                        ({booking.timeSlot})
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[var(--theme-text-muted)] shrink-0" />
                    <span className="truncate">{booking.address}</span>
                  </div>

                  <div className="flex items-center justify-start sm:justify-end gap-1 font-mono-numbers font-bold text-[var(--theme-accent)]">
                    <span>{formatZAR(booking.totalAmount)}</span>
                    <span className="text-[11px] font-normal text-[var(--theme-text-muted)]">
                      ({booking.totalVisits} visit{booking.totalVisits > 1 ? 's' : ''})
                    </span>
                  </div>
                </div>

                {booking.isRecurring && booking.recurringDates && (
                  <div className="mt-2.5 rounded-lg bg-[var(--theme-card-subtle)] p-2 text-[11px] text-[var(--theme-text-muted)]">
                    <span className="font-semibold text-[var(--theme-text)]">
                      Phase 5B Bounded Series ({booking.frequency}):{' '}
                    </span>
                    <span className="font-mono-numbers">
                      {booking.recurringDates.join(', ')}
                    </span>
                  </div>
                )}

                {/* Rescheduling Form Drawer */}
                {reschedulingId === booking.id && (
                  <div className="mt-4 rounded-xl border border-[var(--theme-accent)]/30 bg-[var(--theme-card-subtle)] p-3 text-xs">
                    <p className="font-semibold text-[var(--theme-text)] mb-2">
                      Phase 5A: Select new visit date for helper confirmation:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={newDateInput}
                        onChange={(e) => setNewDateInput(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-bg)] px-2.5 py-1 text-xs text-[var(--theme-text)]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newDateInput) {
                            onReschedule(booking.id, newDateInput);
                            setReschedulingId(null);
                            setNewDateInput('');
                          }
                        }}
                        className="rounded-lg bg-[var(--theme-accent)] px-3 py-1 font-semibold text-white hover:bg-[var(--theme-accent-hover)] transition-colors"
                      >
                        Confirm Date
                      </button>
                      <button
                        type="button"
                        onClick={() => setReschedulingId(null)}
                        className="rounded-lg border border-[var(--theme-border)] px-3 py-1 text-[var(--theme-text)] hover:bg-[var(--theme-card)] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons based on Role Simulation */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--theme-border-subtle)] pt-3 text-xs">
                  {roleMode === 'client' ? (
                    <>
                      <span className="text-[11px] text-[var(--theme-text-muted)]">
                        Household controls · Direct helper contact: {booking.helperName}
                      </span>
                      <div className="flex items-center gap-2">
                        {booking.status !== 'cancelled' && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setReschedulingId(booking.id);
                                setNewDateInput(booking.date);
                              }}
                              className="rounded-lg border border-[var(--theme-border)] px-3 py-1.5 font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card-subtle)] transition-colors"
                            >
                              Reschedule
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                              className="rounded-lg border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 font-medium transition-colors"
                            >
                              Cancel Booking
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    /* Helper perspective controls */
                    <>
                      <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                        Helper Simulation Mode: Action request as {booking.helperName}
                      </span>
                      <div className="flex items-center gap-2">
                        {booking.status === 'requested' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(booking.id, 'accepted')}
                              className="rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 font-semibold transition-colors shadow-xs"
                            >
                              Accept Request
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateStatus(booking.id, 'declined')}
                              className="rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 px-3 py-1.5 font-medium transition-colors"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {booking.status === 'accepted' && (
                          <span className="text-[11px] text-emerald-600 font-semibold">
                            ✓ You have accepted this job
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
