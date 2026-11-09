import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  CleaningIcon3D,
  ChildcareIcon3D,
  CookingIcon3D,
  GardeningIcon3D,
  HandymanIcon3D,
  MovingIcon3D,
} from './ServiceIcons';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceCardData {
  id: string;
  category: 'home' | 'family' | 'projects';
  number: string;
  categoryLabel: string;
  title: string;
  description: string;
  iconComponent: React.ReactNode;
  tagline: string;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: 'Cleaning',
    category: 'home',
    number: '01',
    categoryLabel: 'Home Care',
    title: 'Cleaning',
    description: 'Routine apartment upkeep, deep sanitizing refreshes, post-event cleaning, and getting busy homes back in order.',
    iconComponent: <CleaningIcon3D className="w-14 h-14" />,
    tagline: 'A fresher space',
  },
  {
    id: 'Childcare',
    category: 'family',
    number: '02',
    categoryLabel: 'Family & Food',
    title: 'Childcare',
    description: 'Discuss family routines, school runs, homework supervision, and peaceful childcare assistance with vetted caregivers.',
    iconComponent: <ChildcareIcon3D className="w-14 h-14" />,
    tagline: 'An extra pair of caring hands',
  },
  {
    id: 'Cooking',
    category: 'family',
    number: '03',
    categoryLabel: 'Family & Food',
    title: 'Cooking',
    description: 'Wholesome weekday meal preparation, South African family feasts, dietary-specific dishes, and weekly batch prep.',
    iconComponent: <CookingIcon3D className="w-14 h-14" />,
    tagline: 'Made with care & aroma',
  },
  {
    id: 'Gardening',
    category: 'home',
    number: '04',
    categoryLabel: 'Home Care',
    title: 'Gardening',
    description: 'Seasonal outdoor upkeep, water-wise Highveld lawn care, weed removal, pruning, and indigenous garden rejuvenation.',
    iconComponent: <GardeningIcon3D className="w-14 h-14" />,
    tagline: 'A greener, thriving yard',
  },
  {
    id: 'Handyman',
    category: 'projects',
    number: '05',
    categoryLabel: 'Home Projects',
    title: 'Handyman',
    description: 'Flat-pack furniture assembly, hanging wall art and mirrors, tap washers, curtain tracks, and general household repairs.',
    iconComponent: <HandymanIcon3D className="w-14 h-14" />,
    tagline: 'Practical fixes solved',
  },
  {
    id: 'Moving & rearranging',
    category: 'projects',
    number: '06',
    categoryLabel: 'Home Projects',
    title: 'Moving & rearranging',
    description: 'Careful box packing, room reorganization, furniture shifting, and calm support for your household’s next chapter.',
    iconComponent: <MovingIcon3D className="w-14 h-14" />,
    tagline: 'Ready for a fresh start',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<'all' | 'home' | 'family' | 'projects'>('all');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  return (
    <section id="services" className="py-16 lg:py-24 border-t border-[var(--theme-border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-kicker)]">
              Six Ways to Get Things Done
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text)]">
              Everyday household care, <em>elevated.</em>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--theme-text-muted)] leading-relaxed">
            Browse the type of help you need, then discover verified independent helpers in your suburb with transparent rates.
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Control) */}
        <div className="flex flex-wrap items-center gap-2 pb-8">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'bg-[var(--theme-card)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)]'
            }`}
          >
            All services (06)
          </button>
          <button
            type="button"
            onClick={() => setFilter('home')}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              filter === 'home'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'bg-[var(--theme-card)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)]'
            }`}
          >
            Home care
          </button>
          <button
            type="button"
            onClick={() => setFilter('family')}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              filter === 'family'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'bg-[var(--theme-card)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)]'
            }`}
          >
            Family & food
          </button>
          <button
            type="button"
            onClick={() => setFilter('projects')}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
              filter === 'projects'
                ? 'bg-[var(--theme-accent)] text-white shadow-xs'
                : 'bg-[var(--theme-card)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] border border-[var(--theme-border)]'
            }`}
          >
            Home projects
          </button>
        </div>

        {/* Services Grid with 3D Craft Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between pb-6">
                  <div className="p-3 rounded-2xl bg-[var(--theme-card-subtle)] group-hover:scale-105 transition-transform duration-300">
                    {service.iconComponent}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--theme-text-muted)]">
                    {service.number}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--theme-text-muted)] mb-1">
                  <span>{service.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[var(--theme-kicker)]">{service.tagline}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[var(--theme-text)]">
                  {service.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[var(--theme-text-muted)] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--theme-border-subtle)] mt-6">
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--theme-accent)] hover:text-[var(--theme-accent-hover)] transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Browse {service.title} helpers</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[var(--theme-border-subtle)] bg-[var(--theme-card-subtle)] p-4 text-center text-xs text-[var(--theme-text-muted)]">
          <p>
            Service categories are proposed for the marketplace. Independent helpers decide their own services, hourly rates, service areas, and availability schedules.
          </p>
        </div>
      </div>
    </section>
  );
};
