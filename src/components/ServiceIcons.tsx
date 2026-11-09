import React from 'react';

export const CleaningIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cl-handle" x1="18" y1="10" x2="36" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="cl-bristle" x1="16" y1="36" x2="48" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="cl-bubble" cx="48" cy="20" r="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#93C5FD" stopOpacity="0.9" />
        <stop offset="1" stopColor="#3B82F6" stopOpacity="0.4" />
      </radialGradient>
      <filter id="soft-shadow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
      </filter>
    </defs>
    <g filter="url(#soft-shadow)">
      {/* Broom Stick */}
      <rect x="28" y="8" width="6" height="30" rx="3" fill="url(#cl-handle)" transform="rotate(-25 31 23)" />
      {/* Broom Head Base */}
      <path d="M18 42C20 36 34 33 42 38L44 43C42 45 22 47 18 42Z" fill="#D97706" />
      {/* Broom Bristles */}
      <path d="M16 43C22 39 40 40 46 45L44 54C34 56 18 54 14 51L16 43Z" fill="url(#cl-bristle)" />
      {/* Suds Bubbles */}
      <circle cx="48" cy="20" r="6" fill="url(#cl-bubble)" />
      <circle cx="46" cy="18" r="2" fill="#FFFFFF" fillOpacity="0.8" />
      <circle cx="40" cy="12" r="3" fill="url(#cl-bubble)" />
      <circle cx="52" cy="30" r="4" fill="url(#cl-bubble)" />
    </g>
  </svg>
);

export const ChildcareIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="ch-bear" x1="16" y1="16" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="ch-heart" x1="36" y1="28" x2="52" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#BE123C" />
      </linearGradient>
    </defs>
    <g>
      {/* Bear Ears */}
      <circle cx="20" cy="20" r="8" fill="url(#ch-bear)" />
      <circle cx="20" cy="20" r="4" fill="#FDE68A" />
      <circle cx="44" cy="20" r="8" fill="url(#ch-bear)" />
      <circle cx="44" cy="20" r="4" fill="#FDE68A" />
      {/* Bear Head */}
      <circle cx="32" cy="32" r="16" fill="url(#ch-bear)" />
      {/* Snout */}
      <ellipse cx="32" cy="36" rx="7" ry="5" fill="#FEF3C7" />
      <ellipse cx="32" cy="34" rx="2.5" ry="1.8" fill="#78350F" />
      {/* Eyes */}
      <circle cx="27" cy="29" r="1.8" fill="#78350F" />
      <circle cx="37" cy="29" r="1.8" fill="#78350F" />
      {/* Heart */}
      <path
        d="M44 38C44 35 47 33 50 33C52 33 54 34.5 54 36.5C54 39.5 49 44 44 47C39 44 34 39.5 34 36.5C34 34.5 36 33 38 33C41 33 44 35 44 38Z"
        fill="url(#ch-heart)"
      />
    </g>
  </svg>
);

export const CookingIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="ck-pot" x1="12" y1="28" x2="52" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EA580C" />
        <stop offset="1" stopColor="#9A3412" />
      </linearGradient>
      <linearGradient id="ck-lid" x1="16" y1="22" x2="48" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C2410C" />
        <stop offset="1" stopColor="#7C2D12" />
      </linearGradient>
    </defs>
    <g>
      {/* Pot Steam */}
      <path d="M26 14C24 18 28 20 26 24" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 10C32 14 36 17 34 22" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 15C40 19 44 21 42 25" stroke="#D1D5DB" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lid Handle */}
      <rect x="29" y="19" width="6" height="4" rx="2" fill="#7C2D12" />
      {/* Lid */}
      <ellipse cx="32" cy="27" rx="18" ry="4" fill="url(#ck-lid)" />
      {/* Pot Body */}
      <path d="M14 28C14 28 16 52 32 52C48 52 50 28 50 28H14Z" fill="url(#ck-pot)" />
      {/* Handles */}
      <path d="M11 32C9 32 8 34 8 36C8 38 9 40 11 40" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
      <path d="M53 32C55 32 56 34 56 36C56 38 55 40 53 40" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
      {/* Highlight Rim */}
      <ellipse cx="32" cy="29" rx="16" ry="2" fill="#FFFFFF" fillOpacity="0.2" />
    </g>
  </svg>
);

export const GardeningIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gd-pot" x1="20" y1="36" x2="44" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D97706" />
        <stop offset="1" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="gd-leaf1" x1="16" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="gd-leaf2" x1="28" y1="10" x2="50" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    <g>
      {/* Left Leaf */}
      <path d="M30 36C22 34 14 26 18 14C28 16 32 26 30 36Z" fill="url(#gd-leaf1)" />
      {/* Center Big Leaf */}
      <path d="M32 36C30 22 36 10 44 12C48 22 42 32 32 36Z" fill="url(#gd-leaf2)" />
      {/* Right Leaf */}
      <path d="M32 36C36 30 46 22 50 26C48 34 40 36 32 36Z" fill="url(#gd-leaf1)" />
      {/* Pot Rim */}
      <rect x="18" y="36" width="28" height="5" rx="2.5" fill="#B45309" />
      {/* Pot Base */}
      <path d="M20 41L23 54C23 55.5 24.5 56.5 26 56.5H38C39.5 56.5 41 55.5 41 54L44 41H20Z" fill="url(#gd-pot)" />
    </g>
  </svg>
);

export const HandymanIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="hm-wrench" x1="14" y1="14" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#94A3B8" />
        <stop offset="1" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="hm-screw" x1="24" y1="12" x2="40" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <g>
      {/* Wrench */}
      <path
        d="M21 15C18 18 18 23 21 26L39 44C42 47 47 47 50 44C53 41 53 36 50 33L32 15C29 12 24 12 21 15Z"
        fill="url(#hm-wrench)"
      />
      {/* Wrench Jaw Cutout */}
      <path d="M16 16L23 23L27 19L20 12C18 13 17 14 16 16Z" fill="#1E293B" opacity="0.3" />
      {/* Assembly Nut/Gear Accent */}
      <circle cx="44" cy="20" r="8" fill="url(#hm-screw)" />
      <circle cx="44" cy="20" r="3.5" fill="#1E293B" opacity="0.4" />
    </g>
  </svg>
);

export const MovingIcon3D: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="mv-top" x1="32" y1="14" x2="32" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="mv-left" x1="14" y1="26" x2="32" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D97706" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="mv-right" x1="32" y1="26" x2="50" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B45309" />
        <stop offset="1" stopColor="#78350F" />
      </linearGradient>
    </defs>
    <g>
      {/* Isometric Box Top */}
      <path d="M32 14L49 24L32 34L15 24L32 14Z" fill="url(#mv-top)" />
      {/* Isometric Box Left Face */}
      <path d="M15 24L32 34V52L15 42V24Z" fill="url(#mv-left)" />
      {/* Isometric Box Right Face */}
      <path d="M32 34L49 24V42L32 52V34Z" fill="url(#mv-right)" />
      {/* Packing Tape */}
      <path d="M26 17.5L43 27.5L38 30.5L21 20.5L26 17.5Z" fill="#FDE68A" fillOpacity="0.8" />
    </g>
  </svg>
);
