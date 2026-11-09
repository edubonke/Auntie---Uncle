/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { DirectorySection } from './components/DirectorySection';
import { FairWageCalculator } from './components/FairWageCalculator';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';
import { AwwwardsPaletteStudio } from './components/AwwwardsPaletteStudio';
import { HelperModal } from './components/HelperModal';
import { BookingModal } from './components/BookingModal';
import { PortalModal } from './components/PortalModal';
import { HelperApplicationModal } from './components/HelperApplicationModal';
import { INITIAL_HELPERS } from './data/helpers';
import { HelperProfile, BookingRequest, PaletteTheme } from './types';
import { filterHelpers } from './utils/marketplace';
import { CheckCircle2 } from 'lucide-react';

const INITIAL_DEMO_BOOKINGS: BookingRequest[] = [
  {
    id: 'bk-demo-01',
    helperId: 'p01',
    helperName: 'Nandi K.',
    helperInitials: 'NK',
    helperTone: 'peach',
    service: 'Cleaning',
    clientName: 'Lerato Moloi',
    clientPhone: '083 456 7890',
    clientEmail: 'lerato.m@example.co.za',
    suburb: 'Randburg',
    address: '18 Hillcrest Ave, Blairgowrie',
    date: '2026-11-12',
    timeSlot: 'morning',
    hours: 4,
    ratePerHour: 180,
    isRecurring: true,
    frequency: 'weekly',
    totalVisits: 4,
    recurringDates: ['2026-11-12', '2026-11-19', '2026-11-26', '2026-12-03'],
    totalAmount: 2880,
    status: 'requested',
    notes: 'Weekly routine cleaning for 2-bedroom home. Vacuuming and balcony wash.',
    createdAt: '2026-11-09T08:30:00Z',
  },
];

export default function App() {
  // Theme state inspired by Awwwards color tools
  const [activeTheme, setActiveTheme] = useState<PaletteTheme>(() => {
    return (localStorage.getItem('au_theme') as PaletteTheme) || 'protea';
  });

  // Helpers dataset
  const [helpers, setHelpers] = useState<HelperProfile[]>(() => {
    const saved = localStorage.getItem('au_helpers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_HELPERS;
  });

  // Bookings dataset
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('au_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'rate-low' | 'rate-high' | 'experience'>('recommended');

  // Modal Dialogs
  const [isPaletteStudioOpen, setIsPaletteStudioOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [viewingHelper, setViewingHelper] = useState<HelperProfile | null>(null);
  const [bookingHelper, setBookingHelper] = useState<HelperProfile | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize palette theme attributes on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', activeTheme);
    if (activeTheme === 'obsidian') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('au_theme', activeTheme);
  }, [activeTheme]);

  // Persist helpers
  useEffect(() => {
    localStorage.setItem('au_helpers', JSON.stringify(helpers));
  }, [helpers]);

  // Persist bookings
  useEffect(() => {
    localStorage.setItem('au_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setSelectedCategory(serviceName);
    const element = document.getElementById('directory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = () => {
    const element = document.getElementById('directory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  const handleCreateBooking = (newBooking: BookingRequest) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingHelper(null);
    showToast(`Booking request sent to ${newBooking.helperName}! View status in My Bookings.`);
    setIsPortalOpen(true);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingRequest['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showToast(`Booking status updated to ${newStatus}.`);
  };

  const handleRescheduleBooking = (id: string, newDate: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, date: newDate, status: 'rescheduled' } : b
      )
    );
    showToast(`Appointment rescheduled to ${newDate}.`);
  };

  const handleRegisterHelper = (newHelper: HelperProfile) => {
    setHelpers((prev) => [newHelper, ...prev]);
    showToast(`Welcome ${newHelper.name}! Your profile is now listed on Auntie & Uncle.`);
  };

  // Compute filtered helpers list
  const filteredHelpers = filterHelpers(helpers, selectedCategory, searchQuery, sortBy);

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] px-4 py-3 shadow-xl text-xs font-medium text-[var(--theme-text)] animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        activeTheme={activeTheme}
        onOpenPaletteStudio={() => setIsPaletteStudioOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenApplication={() => setIsApplicationOpen(true)}
        bookingsCount={bookings.length}
      />

      <main>
        {/* Hero Section */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          totalHelpers={helpers.length}
        />

        {/* Six Services Section with 3D Craft Tokens */}
        <ServicesSection onSelectService={handleSelectServiceFromCard} />

        {/* Directory Section */}
        <DirectorySection
          helpers={filteredHelpers}
          category={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onViewProfile={(helper) => setViewingHelper(helper)}
          onBookHelper={(helper) => setBookingHelper(helper)}
          onResetFilters={handleResetFilters}
        />

        {/* Interactive Living Wage & Fair Work Calculator */}
        <FairWageCalculator />

        {/* How It Works & Editorial Proof */}
        <HowItWorksSection
          onOpenApplication={() => setIsApplicationOpen(true)}
          onExploreDirectory={() => {
            const el = document.getElementById('directory');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Awwwards Floating Tools */}
      <AwwwardsPaletteStudio
        isOpen={isPaletteStudioOpen}
        onClose={() => setIsPaletteStudioOpen(false)}
        activeTheme={activeTheme}
        onSelectTheme={(theme) => {
          setActiveTheme(theme);
          showToast(`Switched atmosphere to ${theme.toUpperCase()}`);
        }}
      />

      <HelperModal
        helper={viewingHelper}
        onClose={() => setViewingHelper(null)}
        onBook={(helper) => setBookingHelper(helper)}
      />

      <BookingModal
        helper={bookingHelper}
        onClose={() => setBookingHelper(null)}
        onSubmitBooking={handleCreateBooking}
      />

      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        bookings={bookings}
        onUpdateStatus={handleUpdateBookingStatus}
        onReschedule={handleRescheduleBooking}
      />

      <HelperApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        onRegisterHelper={handleRegisterHelper}
      />
    </div>
  );
}
