import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { HelperProfile, ServiceCategory } from '../types';
import { formatZAR } from '../utils/marketplace';

interface HelperApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterHelper: (helper: HelperProfile) => void;
}

export const HelperApplicationModal: React.FC<HelperApplicationModalProps> = ({
  isOpen,
  onClose,
  onRegisterHelper,
}) => {
  const [name, setName] = useState('');
  const [service, setService] = useState<ServiceCategory>('Cleaning');
  const [area, setArea] = useState('Sandton');
  const [suburbsInput, setSuburbsInput] = useState('Sandton, Morningside, Bryanston');
  const [rate, setRate] = useState(200);
  const [years, setYears] = useState(5);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [schedule, setSchedule] = useState('Mondays to Fridays (08:00 – 16:30)');
  const [skillsInput, setSkillsInput] = useState('Routine care, Deep cleans, Move-in preparation');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !headline.trim()) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newHelper: HelperProfile = {
      id: `h-user-${Date.now()}`,
      name: name.trim(),
      initials,
      service,
      area: area.trim(),
      regions: suburbsInput.split(',').map((s) => s.trim()).filter(Boolean),
      rate: Number(rate),
      years: Number(years),
      icon: '✨',
      tone: 'peach',
      headline: headline.trim(),
      bio: bio.trim() || 'Independent home care professional with verified local references and strong dedication to household care.',
      services: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      schedule: schedule.trim(),
      isLive: true,
      rating: 5.0,
      completedJobs: 1,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    };

    onRegisterHelper(newHelper);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="helper-app-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--theme-border-subtle)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              <UserPlus className="h-4 w-4" />
              <span>Independent Helper Onboarding</span>
            </div>
            <h2 id="helper-app-title" className="mt-1 font-serif text-2xl font-bold text-[var(--theme-text)]">
              Join the Auntie & Uncle Network
            </h2>
            <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
              Set your own hourly rate in ZAR, choose your suburbs, and receive 100% of your earnings.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--theme-text-muted)] hover:bg-[var(--theme-card-subtle)] transition-colors"
            aria-label="Close application modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-[var(--theme-text)]">
              Welcome to Auntie & Uncle!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-muted)] max-w-md mx-auto">
              Your profile for <strong>{name}</strong> ({service} in {area}) has been activated and added to the live directory at {formatZAR(rate)}/hour.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[var(--theme-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[var(--theme-accent-hover)] transition-colors"
            >
              Explore Directory
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nomvula Dube"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Primary Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceCategory)}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
                >
                  <option value="Cleaning">Cleaning</option>
                  <option value="Childcare">Childcare</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Handyman">Handyman</option>
                  <option value="Moving & rearranging">Moving & rearranging</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Primary Suburb
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Sandton"
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Hourly Rate (ZAR)
                </label>
                <input
                  type="number"
                  min="120"
                  max="500"
                  step="10"
                  required
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)] font-mono-numbers"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[var(--theme-text)] mb-1">
                Other Suburbs Served (comma separated)
              </label>
              <input
                type="text"
                value={suburbsInput}
                onChange={(e) => setSuburbsInput(e.target.value)}
                placeholder="e.g. Sandton, Rivonia, Rosebank"
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--theme-text)] mb-1">
                Headline / Calling Card
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Meticulous home care with 5+ years of family trust"
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[var(--theme-text)] mb-1">
                Short Bio & Experience
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your experience, specialties, and approach to caring for households..."
                className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)] font-mono-numbers"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--theme-text)] mb-1">
                  Typical Schedule
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg)] px-3 py-2 text-xs text-[var(--theme-text)]"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card-subtle)] p-3 text-[11px] text-[var(--theme-text-muted)]">
              Auntie & Uncle connects independent helpers directly with local households. By joining, you confirm that you act as an independent service provider and set your own rates.
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--theme-border-subtle)]">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[var(--theme-border)] px-4 py-2 font-medium text-[var(--theme-text)] hover:bg-[var(--theme-card-subtle)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-[var(--theme-accent)] px-6 py-2.5 font-semibold text-white shadow-xs hover:bg-[var(--theme-accent-hover)] transition-colors"
              >
                <span>Submit Profile</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
