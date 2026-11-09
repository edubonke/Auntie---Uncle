import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Repeat, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { HelperProfile, BookingRequest } from '../types';
import { calculateBookingTotal, formatZAR, generateRecurringDates } from '../utils/marketplace';

interface BookingModalProps {
  helper: HelperProfile | null;
  onClose: () => void;
  onSubmitBooking: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  helper,
  onClose,
  onSubmitBooking,
}) => {
  if (!helper) return null;

  // Defaults: tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(defaultDateStr);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'fullday'>('morning');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'weekly' | 'fortnightly' | 'monthly'>('weekly');
  const [visitCount, setVisitCount] = useState<number>(4);

  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [suburb, setSuburb] = useState<string>(helper.area);
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hoursPerVisit = timeSlot === 'fullday' ? 8 : 4;
  const totalVisits = isRecurring ? visitCount : 1;
  const totalAmount = calculateBookingTotal(helper.rate, hoursPerVisit, totalVisits);
  const scheduledDates = isRecurring
    ? generateRecurringDates(date, frequency, totalVisits)
    : [date];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) errs.clientName = 'Please enter your name';
    if (!clientPhone.trim()) errs.clientPhone = 'Please enter your contact phone number';
    if (!clientEmail.trim() || !clientEmail.includes('@')) errs.clientEmail = 'Please enter a valid email';
    if (!address.trim()) errs.address = 'Please enter your street address';
    if (!date) errs.date = 'Please pick a starting date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newBooking: BookingRequest = {
      id: `bk-${Date.now()}`,
      helperId: helper.id,
      helperName: helper.name,
      helperInitials: helper.initials,
      helperTone: helper.tone,
      service: helper.service,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      suburb: suburb.trim(),
      address: address.trim(),
      date,
      timeSlot,
      hours: hoursPerVisit,
      ratePerHour: helper.rate,
      isRecurring,
      frequency: isRecurring ? frequency : undefined,
      totalVisits,
      recurringDates: scheduledDates,
      totalAmount,
      status: 'requested',
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onSubmitBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border-subtle)] pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <Calendar className="h-4 w-4" />
              <span>Phase 5A & 5B Booking Engine</span>
            </div>
            <h2 id="booking-modal-title" className="mt-1 font-serif text-2xl font-bold text-[var(--theme-text)]">
              Request a booking with {helper.name}
            </h2>
            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
              {helper.service} · {formatZAR(helper.rate)}/hour · Direct helper agreement
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            aria-label="Close booking modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Phase 5A: Time slot & Date Picker */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-3">
              1. Date & Time Slot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="booking-date" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Starting Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
                {errors.date && <p className="text-[11px] text-red-500 mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTimeSlot('morning')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      timeSlot === 'morning'
                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)]'
                    }`}
                  >
                    <p className="font-bold">Morning</p>
                    <p className="text-[10px] opacity-75">08:00–12:00</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('afternoon')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      timeSlot === 'afternoon'
                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)]'
                    }`}
                  >
                    <p className="font-bold">Afternoon</p>
                    <p className="text-[10px] opacity-75">13:00–17:00</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeSlot('fullday')}
                    className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
                      timeSlot === 'fullday'
                        ? 'border-[var(--theme-accent)] bg-[var(--theme-accent-soft)] text-[var(--theme-accent)]'
                        : 'border-[var(--theme-border)] bg-[var(--theme-bg)] text-[var(--theme-text)]'
                    }`}
                  >
                    <p className="font-bold">Full Day</p>
                    <p className="text-[10px] opacity-75">08:00–16:00</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 5B: Bounded Recurring Booking Option */}
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card-subtle)] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4 text-[var(--theme-accent)]" />
                <span className="text-xs font-bold text-[var(--theme-text)]">
                  Phase 5B: Bounded Recurring Visit Series
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isRecurring}
                aria-label="Toggle Phase 5B Bounded Recurring Series"
                onClick={() => setIsRecurring(!isRecurring)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isRecurring ? 'bg-[var(--theme-accent)]' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isRecurring ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {isRecurring ? (
              <div className="mt-4 space-y-3 pt-3 border-t border-[var(--theme-border-subtle)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                      Frequency
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as any)}
                      className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)]"
                    >
                      <option value="weekly">Weekly visits</option>
                      <option value="fortnightly">Fortnightly (Every 2 weeks)</option>
                      <option value="monthly">Monthly visits</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                      Number of Bounded Visits (2 to 8)
                    </label>
                    <select
                      value={visitCount}
                      onChange={(e) => setVisitCount(Number(e.target.value))}
                      className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)]"
                    >
                      <option value="2">2 visits series</option>
                      <option value="3">3 visits series</option>
                      <option value="4">4 visits series (1 month weekly)</option>
                      <option value="6">6 visits series</option>
                      <option value="8">8 visits series (2 months weekly)</option>
                    </select>
                  </div>
                </div>

                <div className="text-[11px] text-[var(--theme-text-muted)] bg-[var(--theme-card)] p-3 rounded-xl border border-[var(--theme-border-subtle)]">
                  <p className="font-semibold text-[var(--theme-text)] mb-1">Scheduled Dates Preview:</p>
                  <p className="font-mono-numbers">{scheduledDates.join(' · ')}</p>
                  <p className="mt-1 text-[10px] text-[var(--theme-text-muted)]">
                    * Bounded series require separate confirmation for each visit date. No recurring subscriptions or automatic credit card billings.
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-[11px] text-[var(--theme-text-muted)]">
                Single one-time appointment for {date}.
              </p>
            )}
          </div>

          {/* Household & Contact Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--theme-text-muted)] mb-3">
              2. Household & Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="client-name" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Full Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Siphesihle Dlamini"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
                {errors.clientName && <p className="text-[11px] text-red-500 mt-1">{errors.clientName}</p>}
              </div>

              <div>
                <label htmlFor="client-phone" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  id="client-phone"
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 082 123 4567"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
                {errors.clientPhone && <p className="text-[11px] text-red-500 mt-1">{errors.clientPhone}</p>}
              </div>

              <div>
                <label htmlFor="client-email" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Email Address
                </label>
                <input
                  id="client-email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. siphesihle@example.co.za"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
                {errors.clientEmail && <p className="text-[11px] text-red-500 mt-1">{errors.clientEmail}</p>}
              </div>

              <div>
                <label htmlFor="booking-suburb" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Suburb
                </label>
                <input
                  id="booking-suburb"
                  type="text"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  placeholder="e.g. Randburg"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="booking-address" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Street Address & Complex/Unit
                </label>
                <input
                  id="booking-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 42 Republic Road, Ferndale"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="booking-notes" className="block text-xs font-medium text-[var(--theme-text)] mb-1">
                  Task Scope & Access Notes (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. 2-bedroom townhouse, cleaning supplies provided on site, access gate code is #4821"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs font-medium text-[var(--theme-text)] focus:outline-hidden focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Summary */}
          <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card-subtle)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--theme-text-muted)]">
                Estimated Total (ZAR)
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold font-mono-numbers text-[var(--theme-text)]">
                  {formatZAR(totalAmount)}
                </span>
                <span className="text-xs text-[var(--theme-text-muted)] font-mono-numbers">
                  ({totalVisits} visit{totalVisits > 1 ? 's' : ''} × {hoursPerVisit} hrs @ {formatZAR(helper.rate)}/hr)
                </span>
              </div>
              <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5">
                100% direct payment on visit · Zero middleman fees
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto rounded-full border border-[var(--theme-border)] px-5 py-2.5 text-xs font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[var(--theme-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[var(--theme-accent-hover)] transition-all"
              >
                <span>Submit Request</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
