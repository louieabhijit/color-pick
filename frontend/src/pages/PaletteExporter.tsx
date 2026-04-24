import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

interface SwatchColor {
  id: string;
  hex: string;
  name: string;
}

let _id = 0;
const uid = () => `sw${++_id}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

type ExportFmt = 'css' | 'scss' | 'json' | 'tailwind' | 'svg';

const DEFAULT_COLORS: SwatchColor[] = [
  { id: uid(), hex: '#6366f1', name: 'Indigo' },
  { id: uid(), hex: '#8b5cf6', name: 'Violet' },
  { id: uid(), hex: '#ec4899', name: 'Pink' },
  { id: uid(), hex: '#10b981', name: 'Emerald' },
  { id: uid(), hex: '#f59e0b', name: 'Amber' },
  { id: uid(), hex: '#3b82f6', name: 'Blue' },
];

const PALETTE_PRESETS: { name: string; colors: Omit<SwatchColor, 'id'>[] }[] = [
  { name: 'Indigo Suite', colors: [
    { hex: '#eef2ff', name: '50' }, { hex: '#c7d2fe', name: '200' }, { hex: '#818cf8', name: '400' },
    { hex: '#6366f1', name: '500' }, { hex: '#4f46e5', name: '600' }, { hex: '#3730a3', name: '800' },
  ]},
  { name: 'Ocean Breeze', colors: [
    { hex: '#0ea5e9', name: 'Sky' }, { hex: '#06b6d4', name: 'Cyan' }, { hex: '#10b981', name: 'Emerald' },
    { hex: '#34d399', name: 'Green' }, { hex: '#6ee7b7', name: 'Mint' }, { hex: '#a7f3d0', name: 'Foam' },
  ]},
  { name: 'Sunset Glow', colors: [
    { hex: '#fbbf24', name: 'Gold' }, { hex: '#f97316', name: 'Orange' }, { hex: '#ef4444', name: 'Red' },
    { hex: '#ec4899', name: 'Pink' }, { hex: '#a855f7', name: 'Purple' }, { hex: '#6366f1', name: 'Indigo' },
  ]},
  { name: 'Neutral Studio', colors: [
    { hex: '#f8fafc', name: 'White' }, { hex: '#e2e8f0', name: 'Light' }, { hex: '#94a3b8', name: 'Muted' },
    { hex: '#475569', name: 'Mid' }, { hex: '#1e293b', name: 'Dark' }, { hex: '#0f172a', name: 'Black' },
  ]},
];

function buildExport(colors: SwatchColor[], fmt: ExportFmt, paletteName: string): string {
  const safeName = (s: string) => s.toLowerCase().replace(/\s+/g, '-');
  switch (fmt) {
    case 'css':
      return `:root {\n${colors.map(c => `  --color-${safeName(c.name)}: ${c.hex};`).join('\n')}\n}`;
    case 'scss':
      return colors.map(c => `$color-${safeName(c.name)}: ${c.hex};`).join('\n');
    case 'json':
      return JSON.stringify(
        Object.fromEntries(colors.map(c => [safeName(c.name), c.hex])),
        null, 2
      );
    case 'tailwind': {
      const entries = colors.map(c => `      '${safeName(c.name)}': '${c.hex}',`).join('\n');
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${safeName(paletteName)}': {\n${entries}\n        },\n      },\n    },\n  },\n};`;
    }
    case 'svg': {
      const w = 80, h = 80, cols = Math.min(colors.length, 6);
      const rows = Math.ceil(colors.length / cols);
      const rects = colors.map((c, i) => {
        const x = (i % cols) * w, y = Math.floor(i / cols) * h;
        return `  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c.hex}"/>`;
      }).join('\n');
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * w}" height="${rows * h}">\n${rects}\n</svg>`;
    }
    default: return '';
  }
}

const PaletteExporter = () => {
  const [colors, setColors] = useState<SwatchColor[]>(DEFAULT_COLORS);
  const [paletteName, setPaletteName] = useState('My Palette');
  const [fmt, setFmt] = useState<ExportFmt>('css');
  const [copied, setCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addColor = () => {
    if (colors.length >= 16) return;
    setColors(p => [...p, { id: uid(), hex: '#a5b4fc', name: `Color ${p.length + 1}` }]);
  };

  const removeColor = (id: string) => setColors(p => p.filter(c => c.id !== id));

  const updateColor = useCallback((id: string, patch: Partial<SwatchColor>) => {
    setColors(p => p.map(c => c.id === id ? { ...c, ...patch } : c));
  }, []);

  const loadPreset = (preset: typeof PALETTE_PRESETS[0]) => {
    setColors(preset.colors.map(c => ({ ...c, id: uid() })));
    setPaletteName(preset.name);
  };

  const exportText = buildExport(colors, fmt, paletteName);

  const copy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const downloadSVG = () => {
    const svg = buildExport(colors, 'svg', paletteName);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${paletteName.replace(/\s+/g, '-').toLowerCase()}.svg`;
    a.click(); URL.revokeObjectURL(url);
  };

  const downloadPNG = async () => {
    const svgText = buildExport(colors, 'svg', paletteName);
    const img = new Image();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2; canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${paletteName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click(); URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const FMT_OPTIONS: { id: ExportFmt; label: string }[] = [
    { id: 'css', label: 'CSS Vars' },
    { id: 'scss', label: 'SCSS' },
    { id: 'json', label: 'JSON' },
    { id: 'tailwind', label: 'Tailwind' },
    { id: 'svg', label: 'SVG' },
  ];

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Palette Exporter - Export Colors to CSS, Tailwind, SCSS & More"
        description="Build a custom color palette with up to 16 named swatches and export as CSS variables, SCSS, JSON, Tailwind config, SVG, or PNG. Load from presets or design from scratch. Free at ColorPeek."
        path="/palette-exporter"
        keywords="color palette exporter, export palette css, palette to tailwind, color palette to scss, palette json export, color swatch downloader"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Palette Exporter | ColorPeek', description: 'Build and export custom color palettes as CSS, Tailwind, SCSS, JSON, SVG, or PNG.', url: 'https://color-peek.com/palette-exporter', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What export formats does the Palette Exporter support?', acceptedAnswer: { '@type': 'Answer', text: 'The tool exports palettes as CSS custom properties, SCSS variables, JSON (for design tokens), Tailwind CSS config, SVG swatches, and PNG image. Each format is ready to paste into your project.' } },
              { '@type': 'Question', name: 'Can I name each color in the palette?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each swatch has an editable name that becomes the variable name in CSS, SCSS, and JSON exports (e.g., --color-primary, $color-primary, "primary"). Names are sanitized automatically for valid variable syntax.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color Palette <span className="gradient-text">Exporter</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">Build a custom palette and export it as CSS variables, SCSS, JSON, Tailwind config, SVG, or PNG.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: palette builder */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4">

            {/* Palette name */}
            <div className="glass-card p-4">
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-2">Palette name</label>
              <input type="text" value={paletteName} onChange={e => setPaletteName(e.target.value)}
                className="glass-input w-full text-sm"/>
            </div>

            {/* Presets */}
            <div className="glass-card p-4">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-3">Load preset</p>
              <div className="grid grid-cols-2 gap-2">
                {PALETTE_PRESETS.map(p => (
                  <button key={p.name} onClick={() => loadPreset(p)}
                    className="glass-button px-3 py-2 text-xs font-medium text-left rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color swatches editor */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Colors ({colors.length}/16)</p>
                <button onClick={addColor} disabled={colors.length >= 16}
                  className="glass-button-primary px-3 py-1.5 text-xs font-semibold disabled:opacity-40">
                  + Add
                </button>
              </div>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {colors.map((c) => (
                    <motion.div key={c.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 p-2 rounded-xl glass-card border border-white/20 dark:border-white/8">
                      <input type="color" value={c.hex} onChange={e => updateColor(c.id, { hex: e.target.value })}
                        className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0"/>
                      {editingId === c.id ? (
                        <input type="text" value={c.name} autoFocus
                          onChange={e => updateColor(c.id, { name: e.target.value })}
                          onBlur={() => setEditingId(null)}
                          onKeyDown={e => e.key === 'Enter' && setEditingId(null)}
                          className="glass-input flex-1 text-xs py-1"/>
                      ) : (
                        <span className="flex-1 text-xs font-medium text-[var(--text-primary)] cursor-text"
                          onClick={() => setEditingId(c.id)}>
                          {c.name}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{c.hex}</span>
                      <button onClick={() => removeColor(c.id)}
                        className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: preview + export */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="lg:col-span-3 flex flex-col gap-4">

            {/* Visual palette strip */}
            <div className="glass-card p-5">
              <p className="text-xs font-medium text-[var(--text-muted)] mb-3">{paletteName}</p>
              <div className="flex rounded-xl overflow-hidden h-20 shadow-lg">
                {colors.map(c => (
                  <div key={c.id} className="flex-1 relative group" style={{ backgroundColor: c.hex }}>
                    <div className="absolute inset-0 flex items-end justify-center pb-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-white">{c.hex}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color detail row */}
              <div className="flex flex-wrap gap-2 mt-3">
                {colors.map(c => {
                  const [h, s, l] = hexToHsl(c.hex);
                  return (
                    <div key={c.id} className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: c.hex }}/>
                      <div>
                        <p className="text-[9px] font-medium text-[var(--text-secondary)]">{c.name}</p>
                        <p className="text-[9px] font-mono text-[var(--text-muted)]">{c.hex}</p>
                      </div>
                      <span className="hidden">{h},{s},{l}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Export format */}
            <div className="glass-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Export</h3>
                <div className="flex flex-wrap gap-1.5">
                  {FMT_OPTIONS.map(f => (
                    <button key={f.id} onClick={() => setFmt(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${fmt === f.id ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mb-4">
                <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-56 overflow-y-auto whitespace-pre pr-20">
                  {exportText}
                </pre>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={copy}
                  className="absolute top-3 right-3 glass-button px-3 py-1.5 text-xs font-semibold">
                  {copied ? '✓ Copied' : 'Copy'}
                </motion.button>
              </div>

              {/* Download buttons */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/20 dark:border-white/8">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={downloadSVG}
                  className="glass-button px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Download SVG
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={downloadPNG}
                  className="glass-button px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Download PNG
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const text = buildExport(colors, 'json', paletteName);
                    const blob = new Blob([text], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = `${paletteName.replace(/\s+/g, '-').toLowerCase()}.json`;
                    a.click(); URL.revokeObjectURL(url);
                  }}
                  className="glass-button px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                  Download JSON
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Palette Exporter</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Start by loading a preset palette or name your palette and add swatches from scratch.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Click any swatch to open a color picker and change its color. Edit its name for meaningful variable names.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Add up to 16 swatches with the + Add Color button.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Choose an export format: CSS Variables, SCSS, JSON, Tailwind Config, SVG, or PNG.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click Copy or Download to get your palette in the chosen format.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What are Color Palette Exports?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">A palette export converts your set of chosen colors into a format your codebase or design tools can consume directly. CSS custom properties (<code className="text-indigo-400">--color-primary: #6366f1</code>) are the most versatile web format - defined once in <code className="text-indigo-400">:root</code>, they cascade to every element and can be updated with JavaScript for dynamic theming. SCSS variables work similarly for Sass-based projects. JSON exports represent design tokens - a format compatible with tools like Style Dictionary, Figma Tokens, and Amazon Style Dictionary for cross-platform design systems. Tailwind config exports let you add named colors directly to <code className="text-indigo-400">theme.extend.colors</code>, making them available as Tailwind utilities. SVG exports create a visual swatch card you can share or embed. PNG exports let you save a visual reference of your palette as an image file.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I import a CSS variable palette into a project?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Copy the CSS export and paste it inside a <code className="text-indigo-400">:root &#123; &#125;</code> block in your global stylesheet. Then use the variables throughout your CSS: <code className="text-indigo-400">background: var(--color-primary)</code>. They work in any browser that supports CSS custom properties (all modern browsers).</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I import this palette into Figma?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Use the JSON export with a Figma plugin like Figma Tokens or Variables Importer to import your palette as local variables or styles. SVG exports can be placed directly as reference swatches in any Figma file.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the difference between CSS variables and SCSS variables?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">CSS custom properties (<code className="text-indigo-400">--var: value</code>) are resolved at runtime in the browser and can be changed dynamically with JavaScript. SCSS variables (<code className="text-indigo-400">$var: value</code>) are compiled at build time and cannot be changed after compilation - but SCSS offers powerful functions like <code className="text-indigo-400">lighten()</code> and <code className="text-indigo-400">darken()</code> for palette manipulation during development.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/palettes','/palette-url','/color-converter']} />
        </div>
      </main>
    </div>
  );
};

export default PaletteExporter;
