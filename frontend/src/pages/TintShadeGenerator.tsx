import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

// ── Color utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, '0'))
    .join('');
}

function luminance(r: number, g: number, b: number): number {
  return [r, g, b].reduce((acc, v, i) => {
    const c = v / 255;
    const lin = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return acc + lin * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function textOnBg(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000';
  return luminance(...rgb) > 0.179 ? '#1f2937' : '#f9fafb';
}

interface Swatch { label: string; hex: string }

function generateScale(baseHex: string): Swatch[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const [r, g, b] = rgb;
  const tints = [0.95, 0.88, 0.76, 0.57, 0.33];
  const shades = [0.16, 0.32, 0.52, 0.72];
  const labels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const scale: Swatch[] = [];
  tints.forEach((t, i) => scale.push({
    label: labels[i],
    hex: rgbToHex(r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t)
  }));
  scale.push({ label: '500', hex: baseHex.startsWith('#') ? baseHex : `#${baseHex}` });
  shades.forEach((s, i) => scale.push({
    label: labels[6 + i],
    hex: rgbToHex(r * (1 - s), g * (1 - s), b * (1 - s))
  }));
  return scale;
}

// ── Export formatters ────────────────────────────────────────────────────────

type Fmt = 'css' | 'tailwind' | 'scss';

function toCSS(scale: Swatch[], name: string) {
  return `:root {\n${scale.map(s => `  --color-${name}-${s.label}: ${s.hex};`).join('\n')}\n}`;
}
function toTailwind(scale: Swatch[], name: string) {
  const entries = scale.map(s => `          ${s.label}: '${s.hex}',`).join('\n');
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${name}: {\n${entries}\n        },\n      },\n    },\n  },\n};`;
}
function toSCSS(scale: Swatch[], name: string) {
  return scale.map(s => `$${name}-${s.label}: ${s.hex};`).join('\n');
}

// ── Constants ────────────────────────────────────────────────────────────────

const PRESETS = [
  { name: 'Indigo',   hex: '#6366f1' },
  { name: 'Violet',   hex: '#8b5cf6' },
  { name: 'Rose',     hex: '#f43f5e' },
  { name: 'Amber',    hex: '#f59e0b' },
  { name: 'Emerald',  hex: '#10b981' },
  { name: 'Sky',      hex: '#0ea5e9' },
  { name: 'Orange',   hex: '#f97316' },
  { name: 'Teal',     hex: '#14b8a6' },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

// ── Component ────────────────────────────────────────────────────────────────

const TintShadeGenerator = () => {
  const [inputHex, setInputHex] = useState('#6366f1');
  const [colorName, setColorName] = useState('primary');
  const [scale, setScale] = useState<Swatch[]>(() => generateScale('#6366f1'));
  const [copied, setCopied] = useState<string | null>(null);
  const [exportFmt, setExportFmt] = useState<Fmt>('css');
  const [inputError, setInputError] = useState(false);

  const apply = useCallback((hex: string) => {
    const h = hex.startsWith('#') ? hex : `#${hex}`;
    if (/^#[0-9a-fA-F]{6}$/.test(h)) {
      setInputHex(h);
      setScale(generateScale(h));
      setInputError(false);
    } else {
      setInputError(true);
    }
  }, []);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const exportText =
    exportFmt === 'css'      ? toCSS(scale, colorName)      :
    exportFmt === 'tailwind' ? toTailwind(scale, colorName)  :
                               toSCSS(scale, colorName);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Tint & Shade Generator — Generate Color Variations Online"
        description="Generate a complete 50–900 tint and shade scale from any base color, just like Tailwind CSS palettes. Export as CSS variables, Tailwind config, or SCSS in one click. Free at ColorPeek."
        path="/tint-shade"
        keywords="tint shade generator, tint generator, shade generator, color scale, tailwind color palette generator, css color variables, color ramp tool"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Tint & Shade Generator | ColorPeek', description: 'Generate a full 50–900 tint and shade scale from any color.', url: 'https://color-peek.com/tint-shade', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What is the difference between a tint and a shade?', acceptedAnswer: { '@type': 'Answer', text: 'A tint is a color mixed with white, making it lighter. A shade is a color mixed with black, making it darker. Together, tints and shades form a complete lightness scale for any hue.' } },
              { '@type': 'Question', name: 'How do I use tint/shade scales in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Copy the Tailwind config output and paste it into your tailwind.config.js under theme.extend.colors. This creates a custom color with 50–900 steps identical to Tailwind\'s built-in palettes.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center mb-12"
        >
          <span className="section-label mb-4 inline-block">Design Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-[var(--text-primary)]">
            Tint & Shade <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Generate a complete 50–900 color scale from any base color — just like Tailwind CSS.
            Click any swatch to copy its hex code.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-wrap items-end gap-6">

            {/* Color picker + hex input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Base Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={inputHex}
                  onChange={e => apply(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-white/30 cursor-pointer bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={inputHex}
                  onChange={e => { setInputHex(e.target.value); apply(e.target.value); }}
                  onKeyDown={e => e.key === 'Enter' && apply(inputHex)}
                  className={`glass-input w-32 text-sm font-mono ${inputError ? 'border-red-400/60' : ''}`}
                  placeholder="#6366f1"
                />
              </div>
              {inputError && (
                <p className="text-xs text-red-400 mt-0.5">Enter a valid 6-digit hex</p>
              )}
            </div>

            {/* Scale name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Scale Name</label>
              <input
                type="text"
                value={colorName}
                onChange={e => setColorName(e.target.value.replace(/\s+/g, '-').toLowerCase() || 'color')}
                className="glass-input w-36 text-sm"
                placeholder="primary"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Quick Presets</label>
              <div className="flex gap-2 flex-wrap">
                {PRESETS.map(p => (
                  <motion.button
                    key={p.name}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => apply(p.hex)}
                    title={p.name}
                    className="w-8 h-8 rounded-lg transition-all duration-200"
                    style={{
                      backgroundColor: p.hex,
                      outline: inputHex === p.hex ? `2px solid ${p.hex}` : '2px solid transparent',
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="h-3 rounded-full mb-8 overflow-hidden"
          style={{
            background: `linear-gradient(to right, ${scale.map(s => s.hex).join(', ')})`
          }}
        />

        {/* Scale swatches */}
        <motion.div
          key={inputHex}
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-10"
        >
          {scale.map(swatch => (
            <motion.button
              key={swatch.label}
              variants={fadeUp}
              whileHover={{ scale: 1.06, zIndex: 10, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => copy(swatch.hex, swatch.label)}
              className="relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-200"
              title={`Copy ${swatch.hex}`}
            >
              <div
                className="h-24 w-full flex flex-col items-center justify-end pb-2 px-1"
                style={{ backgroundColor: swatch.hex }}
              >
                <span className="text-xs font-bold leading-none" style={{ color: textOnBg(swatch.hex) }}>
                  {swatch.label}
                </span>
                <span className="text-[9px] font-mono mt-0.5 opacity-75" style={{ color: textOnBg(swatch.hex) }}>
                  {swatch.hex}
                </span>
              </div>
              <AnimatePresence>
                {copied === swatch.label && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 rounded-xl"
                  >
                    <span className="text-white text-xs font-semibold">✓</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Export */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Export Scale</h3>
            <div className="flex gap-2">
              {(['css', 'tailwind', 'scss'] as Fmt[]).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setExportFmt(fmt)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    exportFmt === fmt
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                      : 'glass-button text-[var(--text-secondary)]'
                  }`}
                >
                  {fmt === 'css' ? 'CSS Vars' : fmt === 'tailwind' ? 'Tailwind' : 'SCSS'}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-60 overflow-y-auto whitespace-pre leading-relaxed">
              {exportText}
            </pre>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => copy(exportText, 'export')}
              className="absolute top-3 right-3 glass-button px-3 py-1.5 text-xs font-semibold"
            >
              {copied === 'export' ? '✓ Copied' : 'Copy'}
            </motion.button>
          </div>
        </motion.div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Tint & Shade Generator</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Enter any HEX color value in the input field or use the color picker to select your base color.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>The tool instantly generates a 50–900 color scale — lighter tints at the top, darker shades at the bottom.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Click any swatch to copy its individual HEX code to your clipboard.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Use the Export section to copy the full scale as CSS variables, Tailwind config, or SCSS variables.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Paste the Tailwind config into <code className="text-indigo-400">theme.extend.colors</code> to use your custom scale in your project.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What are Tints and Shades?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">A tint is created by adding white to a color, progressively lightening it. A shade is created by adding black, progressively darkening it. Together, tints and shades form a continuous lightness ramp that gives designers a full vocabulary for any hue — from near-white background washes to near-black text tones. Design systems like Tailwind CSS, Material Design, and Ant Design use this pattern to define a 10-step palette (50, 100, 200 ... 900) for every brand color. The 500 value is usually the true base color, values below 500 are tints, and values above are shades. Having a complete scale ensures you always have a subtle background variant, a hover state, and a dark pressed state available, all harmoniously derived from your brand color.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What does the 50–900 numbering mean?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">It's a convention popularized by Tailwind CSS. 50 is the lightest tint (nearly white), 900 is the darkest shade (nearly black), and 500 represents the pure, unmodified base color. The scale gives you 10 usable steps for any hue.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How does this differ from opacity?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Opacity changes transparency, not the color itself — the underlying element or background shows through. Tints and shades produce fully opaque colors by blending with white or black, which means they look consistent on any background.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I export the scale for design tools like Figma?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Copy the HEX codes from each swatch and import them into Figma as local styles. You can also export as CSS variables and reference them in Figma's Tokens Studio plugin for full design-token integration.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Is the WCAG contrast ratio maintained across the scale?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Not automatically — but lighter tints (50–200) are generally safe for backgrounds with dark text, and darker shades (700–900) work for text on light backgrounds. Use the <a href="/color-blindness" className="text-indigo-500 hover:underline">Color Blindness Simulator</a> to verify your combinations.</p>
              </details>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center">
            Also explore: <a href="/palettes" className="text-indigo-500 hover:underline">Color Palettes</a> · <a href="/palette-exporter" className="text-indigo-500 hover:underline">Palette Exporter</a> · <a href="/color-converter" className="text-indigo-500 hover:underline">Color Converter</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default TintShadeGenerator;
