// Shared SVG icon components — all tools.
// Style: 24×24 viewBox, strokeWidth 1.5, Heroicons-compatible.

interface IconProps { className?: string }

// ── Existing tools ────────────────────────────────────────────────────────────

export const IconPalettes = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3"    y="3"    width="7.5" height="7.5" rx="2"/>
    <rect x="13.5" y="3"    width="7.5" height="7.5" rx="2"/>
    <rect x="3"    y="13.5" width="7.5" height="7.5" rx="2"/>
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>
  </svg>
);

export const IconGradients = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3"/>
    <circle cx="8"  cy="12" r="2.5" fill="currentColor" opacity="0.85" stroke="none"/>
    <circle cx="14" cy="12" r="2.5" fill="currentColor" opacity="0.45" stroke="none"/>
    <circle cx="20" cy="12" r="2.5" fill="currentColor" opacity="0.15" stroke="none"/>
    <line x1="10.5" y1="12" x2="11.5" y2="12" strokeOpacity="0.5"/>
  </svg>
);

export const IconGradientGenerator = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="14" width="18" height="3.5" rx="1.75"/>
    <line x1="7"  y1="13.5" x2="7"  y2="18.5"/>
    <line x1="17" y1="13.5" x2="17" y2="18.5"/>
    <path d="M12 3 L12 11"/>
    <path d="M9 6 L15 6"/>
    <circle cx="12" cy="6"  r="0.75" fill="currentColor" stroke="none"/>
    <circle cx="6"  cy="7"  r="0.75" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="18" cy="5"  r="0.75" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="17" cy="10" r="0.75" fill="currentColor" stroke="none" opacity="0.4"/>
  </svg>
);

export const IconTintShade = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="1.5"  y="5" width="3.5" height="14" rx="1.75" opacity="0.12"/>
    <rect x="6.5"  y="5" width="3.5" height="14" rx="1.75" opacity="0.30"/>
    <rect x="11.5" y="5" width="3.5" height="14" rx="1.75" opacity="0.55"/>
    <rect x="16.5" y="5" width="3.5" height="14" rx="1.75" opacity="0.75"/>
    <rect x="19.5" y="5" width="3"   height="14" rx="1.5"  opacity="0.92"/>
  </svg>
);

export const IconColorBlindness = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12c0 0 4-7 10-7s10 7 10 7-4 7-10 7S2 12 2 12z"/>
    <circle cx="12" cy="12" r="3"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    <path d="M10 10 Q12 8.5 14 10" strokeWidth="1"/>
  </svg>
);

// ── New tools ─────────────────────────────────────────────────────────────────

export const IconColorConverter = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Two horizontal transfer arrows */}
    <path d="M5 8h14M5 8l3-3M5 8l3 3"/>
    <path d="M19 16H5m14 0l-3-3m3 3l-3 3"/>
    {/* Center swatch dot */}
    <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" opacity="0.5"/>
  </svg>
);

export const IconPaletteURL = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Link chain */}
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

export const IconFontPairing = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Large "A" */}
    <path d="M4 18L8 6l4 12"/>
    <path d="M5.5 14h5"/>
    {/* Small "a" */}
    <path d="M16 11c0-1.1.9-2 2-2s2 .9 2 2v5"/>
    <path d="M16 15.5a2 2 0 004 0"/>
  </svg>
);

export const IconTypeScale = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Lines of decreasing length = type scale */}
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="10" x2="17" y2="10"/>
    <line x1="3" y1="14" x2="13" y2="14"/>
    <line x1="3" y1="18" x2="9"  y2="18"/>
  </svg>
);

export const IconBoxShadow = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Shadow (offset rect, dashed) */}
    <rect x="7" y="7" width="14" height="14" rx="2" strokeDasharray="3 2" strokeOpacity="0.4"/>
    {/* Main card */}
    <rect x="3" y="3" width="14" height="14" rx="2"/>
  </svg>
);

export const IconGlassEffect = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer panel */}
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    {/* Inner frosted panel */}
    <rect x="7" y="7" width="10" height="10" rx="2" strokeOpacity="0.5"/>
    {/* Shine line */}
    <path d="M9 9 L11 11" strokeOpacity="0.6"/>
  </svg>
);

export const IconBorderRadius = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Square with one highlighted rounded corner */}
    <path d="M3 14V19a2 2 0 002 2h5"/>
    <path d="M14 21h5a2 2 0 002-2v-5"/>
    <path d="M21 10V5a2 2 0 00-2-2h-5"/>
    {/* Highlighted top-left corner curve */}
    <path d="M10 3H5a2 2 0 00-2 2v5" stroke="currentColor" strokeWidth="2"/>
    {/* Corner arc indicator */}
    <path d="M6 10 A4 4 0 0 1 10 6" strokeWidth="1" opacity="0.5"/>
  </svg>
);

export const IconPaletteExporter = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Palette dots */}
    <circle cx="7"  cy="8"  r="1.5" fill="currentColor" stroke="none" opacity="0.8"/>
    <circle cx="12" cy="6"  r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle cx="17" cy="8"  r="1.5" fill="currentColor" stroke="none" opacity="0.4"/>
    {/* Download arrow */}
    <path d="M12 13 L12 20"/>
    <path d="M9 17 L12 20 L15 17"/>
    {/* Base line */}
    <path d="M5 21 L19 21"/>
  </svg>
);
