import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IconPalettes, IconGradients, IconGradientGenerator, IconTintShade,
  IconColorBlindness, IconColorConverter, IconPaletteURL, IconFontPairing,
  IconTypeScale, IconBoxShadow, IconGlassEffect, IconBorderRadius, IconPaletteExporter,
  IconContrastChecker, IconTextShadow, IconColorHarmonies, IconRandomColor,
  IconColorMixer, IconColorName, IconCSSFilter, IconSpacingScale, IconFlexbox, IconGrid,
} from './ToolIcons';

interface ToolItem {
  name: string;
  href: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const TOOL_GROUPS: { label: string; tools: ToolItem[] }[] = [
  {
    label: 'Color',
    tools: [
      { name: 'Palettes',        href: '/palettes',          desc: 'Curated collections',         Icon: IconPalettes,         gradient: 'from-indigo-500 to-violet-500' },
      { name: 'Color Converter', href: '/color-converter',   desc: 'HEX · RGB · HSL · OKLCH',     Icon: IconColorConverter,   gradient: 'from-cyan-500 to-blue-500' },
      { name: 'Tint & Shade',    href: '/tint-shade',        desc: '50–900 scale generator',      Icon: IconTintShade,        gradient: 'from-rose-500 to-orange-500' },
      { name: 'Color Harmonies', href: '/color-harmonies',   desc: 'Complementary, triadic…',     Icon: IconColorHarmonies,   gradient: 'from-pink-500 to-rose-500' },
      { name: 'Color Mixer',     href: '/color-mixer',       desc: 'Blend two colors',            Icon: IconColorMixer,       gradient: 'from-indigo-500 to-pink-500' },
      { name: 'Random Color',    href: '/random-color',      desc: 'Generate random colors',      Icon: IconRandomColor,      gradient: 'from-emerald-400 to-teal-500' },
      { name: 'Color Name',      href: '/color-name',        desc: 'Find any color\'s name',      Icon: IconColorName,        gradient: 'from-yellow-400 to-orange-400' },
      { name: 'Palette from URL',href: '/palette-url',       desc: 'Extract from image or URL',   Icon: IconPaletteURL,       gradient: 'from-emerald-500 to-teal-500' },
      { name: 'Palette Exporter',href: '/palette-exporter',  desc: 'Export CSS · JSON · SVG',     Icon: IconPaletteExporter,  gradient: 'from-amber-400 to-orange-500' },
    ],
  },
  {
    label: 'CSS',
    tools: [
      { name: 'Gradients',       href: '/gradients',         desc: 'CSS gradient presets',        Icon: IconGradients,        gradient: 'from-violet-500 to-fuchsia-500' },
      { name: 'Gradient Gen.',   href: '/gradient-generator',desc: 'Linear, radial & conic',      Icon: IconGradientGenerator,gradient: 'from-fuchsia-500 to-rose-500' },
      { name: 'Box Shadow',      href: '/box-shadow',        desc: 'Multi-layer shadows',         Icon: IconBoxShadow,        gradient: 'from-blue-500 to-indigo-500' },
      { name: 'Text Shadow',     href: '/text-shadow',       desc: 'CSS text-shadow effects',     Icon: IconTextShadow,       gradient: 'from-violet-600 to-purple-700' },
      { name: 'CSS Filters',     href: '/css-filter',        desc: 'Blur, contrast, sepia…',      Icon: IconCSSFilter,        gradient: 'from-sky-500 to-blue-600' },
      { name: 'Glass Effect',    href: '/glass-generator',   desc: 'backdrop-filter builder',     Icon: IconGlassEffect,      gradient: 'from-indigo-400 to-sky-400' },
      { name: 'Border Radius',   href: '/border-radius',     desc: 'Shape any corner',            Icon: IconBorderRadius,     gradient: 'from-violet-500 to-indigo-400' },
      { name: 'Flexbox',         href: '/flexbox',           desc: 'Flex layout builder',         Icon: IconFlexbox,          gradient: 'from-orange-500 to-amber-500' },
      { name: 'CSS Grid',        href: '/grid',              desc: 'Grid layout builder',         Icon: IconGrid,             gradient: 'from-rose-500 to-red-500' },
    ],
  },
  {
    label: 'Typography',
    tools: [
      { name: 'Type Scale',      href: '/type-scale',        desc: 'Modular scale generator',     Icon: IconTypeScale,        gradient: 'from-fuchsia-500 to-violet-500' },
      { name: 'Font Pairing',    href: '/font-pairing',      desc: 'Google Fonts combos',         Icon: IconFontPairing,      gradient: 'from-rose-400 to-fuchsia-500' },
      { name: 'Spacing Scale',   href: '/spacing-scale',     desc: 'Design system spacing',       Icon: IconSpacingScale,     gradient: 'from-teal-500 to-cyan-500' },
    ],
  },
  {
    label: 'Accessibility',
    tools: [
      { name: 'Contrast Checker',href: '/contrast-checker',  desc: 'WCAG AA & AAA testing',       Icon: IconContrastChecker,  gradient: 'from-slate-600 to-slate-800' },
      { name: 'Color Blindness', href: '/color-blindness',   desc: '7 vision simulations',        Icon: IconColorBlindness,   gradient: 'from-orange-500 to-amber-400' },
    ],
  },
];

const ToolsSidebar = () => {
  const location = useLocation();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">Tools</span>
        <Link to="/tools" className="text-xs font-medium text-indigo-500 dark:text-indigo-400 hover:underline">
          View all
        </Link>
      </div>

      {TOOL_GROUPS.map(({ label, tools }) => (
        <div key={label}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] opacity-60 px-1 mb-1.5">
            {label}
          </p>
          <div className="space-y-1.5">
            {tools.map(({ name, href, desc, Icon, gradient }, i) => {
              const active = location.pathname === href;
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={href}
                    className={`group flex items-center gap-2.5 p-2.5 rounded-xl border transition-all duration-200
                      ${active
                        ? 'glass-card border-indigo-300/50 dark:border-indigo-500/40 shadow-sm'
                        : 'glass-card border-white/30 dark:border-white/8 hover:border-indigo-300/40 dark:hover:border-indigo-500/30'
                      }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0
                                     bg-gradient-to-br ${gradient} shadow-sm
                                     group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[11px] font-semibold leading-tight truncate transition-colors duration-150
                        ${active
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-[var(--text-primary)] group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                        }`}>
                        {name}
                      </p>
                      <p className="text-[9px] text-[var(--text-muted)] leading-tight mt-0.5 truncate">{desc}</p>
                    </div>
                    <svg
                      className="w-2.5 h-2.5 text-[var(--text-muted)] flex-shrink-0
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsSidebar;
