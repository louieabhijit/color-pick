import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import {
  IconPalettes, IconGradients, IconGradientGenerator, IconTintShade,
  IconColorBlindness, IconColorConverter, IconPaletteURL, IconFontPairing,
  IconTypeScale, IconBoxShadow, IconGlassEffect, IconBorderRadius, IconPaletteExporter,
  IconContrastChecker, IconTextShadow, IconColorHarmonies, IconRandomColor,
  IconColorMixer, IconColorName, IconCSSFilter, IconSpacingScale, IconFlexbox, IconGrid,
} from '../components/ToolIcons';

interface Tool {
  name: string;
  href: string;
  description: string;
  longDesc: string;
  tags: string[];
  icon: React.ReactNode;
  gradient: string;
}

const TOOLS: Tool[] = [
  {
    name: 'Color Palettes',
    href: '/palettes',
    description: 'Curated collections of harmonious palettes',
    longDesc: 'Browse hundreds of hand-crafted, harmonious color palettes. Copy any color in HEX, RGB, or HSL — ready to drop straight into your project.',
    tags: ['Browse', 'Inspiration', 'HEX / RGB / HSL'],
    icon: <IconPalettes className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    name: 'Gradients',
    href: '/gradients',
    description: 'Explore ready-to-use CSS gradient presets',
    longDesc: 'A library of beautiful CSS gradient presets across every hue and style. One click to copy the CSS rule directly into your stylesheet.',
    tags: ['Browse', 'CSS', 'Presets'],
    icon: <IconGradients className="w-6 h-6" />,
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    name: 'Gradient Generator',
    href: '/gradient-generator',
    description: 'Build custom linear, radial & conic gradients',
    longDesc: 'Drag color stops, set angle, switch between linear, radial, and conic modes. Exports clean CSS or a Tailwind arbitrary class — no extra dependencies.',
    tags: ['Linear', 'Radial', 'Conic', 'CSS + Tailwind'],
    icon: <IconGradientGenerator className="w-6 h-6" />,
    gradient: 'from-fuchsia-500 to-rose-500',
  },
  {
    name: 'Tint & Shade Generator',
    href: '/tint-shade',
    description: 'Generate a full 50–900 scale from any base color',
    longDesc: "Enter any base color and get a complete ten-step scale — just like Tailwind's built-in palettes. Export as CSS custom properties, Tailwind config, or SCSS variables.",
    tags: ['Color Scale', 'CSS Vars', 'Tailwind', 'SCSS'],
    icon: <IconTintShade className="w-6 h-6" />,
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    name: 'Color Blindness Simulator',
    href: '/color-blindness',
    description: 'Preview your palette through 7 vision types',
    longDesc: 'See exactly how your colors appear to people with deuteranopia, protanopia, tritanopia, and more — using accurate RGB matrix transforms, not just CSS filters.',
    tags: ['Accessibility', 'WCAG', 'Deuteranopia', 'Protanopia'],
    icon: <IconColorBlindness className="w-6 h-6" />,
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    name: 'Color Converter',
    href: '/color-converter',
    description: 'Convert between HEX, RGB, HSL, HSV, CMYK and OKLCH',
    longDesc: 'Paste any color in any format and instantly see every other format. Includes modern OKLCH conversion via sRGB linearization — great for CSS Color Level 4.',
    tags: ['HEX', 'RGB', 'HSL', 'CMYK', 'OKLCH'],
    icon: <IconColorConverter className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Box Shadow Generator',
    href: '/box-shadow',
    description: 'Build multi-layer box shadows with live preview',
    longDesc: 'Stack up to 5 shadow layers, control x/y offset, blur, spread, color, opacity and inset — then copy the full CSS rule in one click.',
    tags: ['CSS', 'Multi-layer', 'Presets', 'Live preview'],
    icon: <IconBoxShadow className="w-6 h-6" />,
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Glass Effect Generator',
    href: '/glass-generator',
    description: 'Build glassmorphism panels with backdrop-filter',
    longDesc: 'Tune blur, saturation, background color/opacity, and border — live preview on five gradient backgrounds. Copy the complete CSS class instantly.',
    tags: ['CSS', 'Glassmorphism', 'backdrop-filter', 'rgba'],
    icon: <IconGlassEffect className="w-6 h-6" />,
    gradient: 'from-indigo-400 to-sky-400',
  },
  {
    name: 'Border Radius Builder',
    href: '/border-radius',
    description: 'Visually build any border-radius shape',
    longDesc: 'Adjust all four corners independently or link them together. Switch between px, %, and rem. Choose from 10 presets and copy the smart CSS shorthand.',
    tags: ['CSS', 'px / % / rem', 'Presets', 'Shapes'],
    icon: <IconBorderRadius className="w-6 h-6" />,
    gradient: 'from-violet-500 to-indigo-400',
  },
  {
    name: 'Type Scale Generator',
    href: '/type-scale',
    description: 'Generate a modular type scale from a base size + ratio',
    longDesc: 'Pick from 8 musical scale ratios (Minor Second through Golden Ratio) and preview all 10 steps live. Export as CSS custom properties, Tailwind fontSize, or SCSS.',
    tags: ['Typography', 'CSS Vars', 'Tailwind', 'SCSS'],
    icon: <IconTypeScale className="w-6 h-6" />,
    gradient: 'from-fuchsia-500 to-violet-500',
  },
  {
    name: 'Font Pairing',
    href: '/font-pairing',
    description: 'Discover Google Font pairings with live preview',
    longDesc: '10 curated heading/body font pairings — filter by style, preview with your own text and colors, then copy the Google Fonts import link or Tailwind config.',
    tags: ['Typography', 'Google Fonts', 'HTML', 'Tailwind'],
    icon: <IconFontPairing className="w-6 h-6" />,
    gradient: 'from-rose-400 to-fuchsia-500',
  },
  {
    name: 'Palette from URL',
    href: '/palette-url',
    description: 'Extract all colors from a website or pasted CSS',
    longDesc: 'Enter a URL or paste CSS/HTML directly — the tool parses every HEX, RGB, and HSL value, deduplicates them, and lets you select favorites for export.',
    tags: ['Extract', 'HEX', 'RGB', 'HSL'],
    icon: <IconPaletteURL className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Palette Exporter',
    href: '/palette-exporter',
    description: 'Build a custom palette and export to any format',
    longDesc: 'Build a palette up to 16 colors, name each swatch, load from presets, then export as CSS variables, SCSS, JSON, Tailwind config, SVG, or PNG.',
    tags: ['Export', 'CSS', 'SCSS', 'JSON', 'SVG', 'PNG'],
    icon: <IconPaletteExporter className="w-6 h-6" />,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Contrast Checker',
    href: '/contrast-checker',
    description: 'Test color contrast against WCAG AA & AAA',
    longDesc: 'Enter foreground and background colors to get the exact contrast ratio with pass/fail badges for all five WCAG 2.1 criteria. Includes live text preview and a shareable URL.',
    tags: ['WCAG', 'AA', 'AAA', 'Accessibility', 'Live preview'],
    icon: <IconContrastChecker className="w-6 h-6" />,
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    name: 'Text Shadow Generator',
    href: '/text-shadow',
    description: 'Build multi-layer CSS text-shadow effects',
    longDesc: 'Stack multiple shadow layers, control offset, blur, color, and opacity per layer. Includes 8 presets (Neon, Embossed, Retro 3D, Outline) and live preview with custom font and size.',
    tags: ['CSS', 'Multi-layer', 'Presets', 'Typography'],
    icon: <IconTextShadow className="w-6 h-6" />,
    gradient: 'from-violet-600 to-purple-700',
  },
  {
    name: 'Color Harmonies',
    href: '/color-harmonies',
    description: 'Generate complementary, triadic & more schemes',
    longDesc: 'Pick a base color and instantly generate complementary, analogous, triadic, split-complementary, tetradic, square, or monochromatic harmony. Visualized on an interactive SVG color wheel.',
    tags: ['Complementary', 'Triadic', 'Analogous', 'Color Wheel'],
    icon: <IconColorHarmonies className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Random Color Generator',
    href: '/random-color',
    description: 'Generate random colors with one click or Spacebar',
    longDesc: 'Click Generate or press Space for a random color. Filter by hue, saturation, and lightness range, or use presets like Pastel, Neon, or Earth Tones. Multi-mode generates 5 colors with lock toggles.',
    tags: ['Random', 'Palette', 'Filters', 'Spacebar'],
    icon: <IconRandomColor className="w-6 h-6" />,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Color Mixer',
    href: '/color-mixer',
    description: 'Blend two colors with adjustable ratio',
    longDesc: 'Pick two colors and blend them at any ratio. Choose between RGB, HSL, or OKLCH blend modes — each produces visibly different results. Preview 5–11 intermediate steps as a gradient strip.',
    tags: ['Blend', 'RGB', 'HSL', 'OKLCH', 'Steps'],
    icon: <IconColorMixer className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-pink-500',
  },
  {
    name: 'Color Name Finder',
    href: '/color-name',
    description: 'Find the name of any color by HEX value',
    longDesc: 'Enter any HEX color to find its closest named match from 200+ CSS and design color names. Shows top 5 similar colors with similarity scores, plus search by name (e.g. "ocean", "rose").',
    tags: ['Names', 'CSS Colors', 'Search', 'HEX'],
    icon: <IconColorName className="w-6 h-6" />,
    gradient: 'from-yellow-400 to-orange-400',
  },
  {
    name: 'CSS Filter Generator',
    href: '/css-filter',
    description: 'Blur, brightness, contrast, sepia and more',
    longDesc: 'Adjust all nine CSS filter properties with live sliders — blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia — plus drop-shadow. Preview on built-in or uploaded images.',
    tags: ['CSS', 'filter', 'Blur', 'Image', 'Presets'],
    icon: <IconCSSFilter className="w-6 h-6" />,
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Spacing Scale Generator',
    href: '/spacing-scale',
    description: 'Generate design-system spacing tokens',
    longDesc: 'Create a consistent spacing scale using linear multipliers or musical ratios. Visual bar chart preview, configurable naming (numbered, T-shirt, Tailwind), export as CSS vars, SCSS, Tailwind config, or JSON.',
    tags: ['Design System', 'CSS Vars', 'Tailwind', 'SCSS', 'JSON'],
    icon: <IconSpacingScale className="w-6 h-6" />,
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    name: 'Flexbox Generator',
    href: '/flexbox',
    description: 'Build CSS flex layouts visually',
    longDesc: 'Set flex-direction, wrap, justify-content, align-items, and gap on the container. Control flex-grow, shrink, basis, align-self, and order per item. Live preview + CSS and HTML output.',
    tags: ['CSS', 'Flexbox', 'Layout', 'Visual', 'HTML'],
    icon: <IconFlexbox className="w-6 h-6" />,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    name: 'CSS Grid Generator',
    href: '/grid',
    description: 'Build CSS grid layouts visually',
    longDesc: 'Define grid-template-columns and rows with freeform text (supports fr, px, %, auto, minmax). Place items with column/row start and end. Live preview with colored cells, CSS and HTML output.',
    tags: ['CSS', 'Grid', 'Layout', 'Visual', 'HTML'],
    icon: <IconGrid className="w-6 h-6" />,
    gradient: 'from-rose-500 to-red-500',
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const Tools = () => (
  <div className="min-h-screen w-full">
    <PageSEO
      title="Color Tools for Designers & Developers"
      description="Free colour tools for designers and developers — gradient generator, tint & shade scale, colour converter, box shadow builder, glassmorphism generator, font pairing, type scale, and more."
      path="/tools"
      keywords="color tools, css tools, design tools, gradient generator, color converter, box shadow generator, glass effect, type scale, font pairing, free design tools"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Color Tools for Designers & Developers | ColorPeek',
        description: 'A complete suite of free colour tools for designers and developers.',
        url: 'https://color-peek.com/tools',
        publisher: { '@type': 'Organization', name: 'ColorPeek', url: 'https://color-peek.com' },
      }}
    />
    <Navbar onColorSelect={() => {}} />

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} className="text-center mb-14"
      >
        <span className="section-label mb-4 inline-block">All Tools</span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-[var(--text-primary)]">
          Color Tools for <span className="gradient-text">Designers & Developers</span>
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          Everything you need to work with color — from palette discovery to accessibility testing.
          All tools are free, run entirely in the browser, and require no sign-up.
        </p>
      </motion.div>

      {/* Tools grid */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {TOOLS.map((tool) => (
          <motion.div key={tool.href} variants={card}>
            <Link
              to={tool.href}
              className="group glass-card card-shine border border-white/40 dark:border-white/10
                         hover:border-indigo-300/50 dark:hover:border-indigo-500/30
                         flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300
                         hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Icon header */}
              <div className="p-6 pb-0">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl
                                bg-gradient-to-br ${tool.gradient} shadow-lg mb-5
                                text-white group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2
                               group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {tool.name}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {tool.longDesc}
                </p>
              </div>

              {/* Tags + CTA */}
              <div className="mt-auto p-6 pt-4">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tool.tags.map(tag => (
                    <span key={tag}
                          className="px-2.5 py-0.5 text-[11px] font-medium rounded-full
                                     bg-indigo-50 dark:bg-indigo-950/40
                                     text-indigo-600 dark:text-indigo-400
                                     border border-indigo-200/50 dark:border-indigo-700/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-500 dark:text-indigo-400
                                group-hover:gap-3 transition-all duration-200">
                  <span>Open tool</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

      </motion.div>

    </main>
  </div>
);

export default Tools;
