import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

type ScaleMethod = 'linear' | 'ratio';
type Unit = 'px' | 'rem' | 'em';
type Naming = 'numbered' | 'tshirt' | 'tailwind';
type ExportFmt = 'css' | 'scss' | 'tailwind' | 'json';

const RATIOS = [
  { label: 'Minor Third (1.25)', value: 1.25 },
  { label: 'Perfect Fourth (1.333)', value: 1.333 },
  { label: 'Perfect Fifth (1.5)', value: 1.5 },
  { label: 'Golden Ratio (1.618)', value: 1.618 },
];

const TSHIRT = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl', '12xl'];
const TAILWIND_KEYS = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '64'];

function buildScale(base: number, method: ScaleMethod, ratio: number, steps: number): number[] {
  if (method === 'linear') return Array.from({ length: steps }, (_, i) => base * (i + 1));
  return Array.from({ length: steps }, (_, i) => base * Math.pow(ratio, i));
}

function toUnit(px: number, unit: Unit): string {
  if (unit === 'px') return `${Math.round(px)}px`;
  if (unit === 'rem') return `${(px / 16).toFixed(3).replace(/\.?0+$/, '')}rem`;
  return `${(px / 16).toFixed(3).replace(/\.?0+$/, '')}em`;
}

function getName(i: number, naming: Naming): string {
  if (naming === 'tshirt') return `--space-${TSHIRT[i] ?? i + 1}`;
  if (naming === 'tailwind') return TAILWIND_KEYS[i] ?? String(i + 1);
  return `--space-${i + 1}`;
}

function buildExport(scale: number[], unit: Unit, naming: Naming, fmt: ExportFmt): string {
  const entries = scale.map((px, i) => {
    const val = toUnit(px, unit);
    const name = getName(i, naming);
    if (fmt === 'css') return `  ${name}: ${val};  /* ${Math.round(px)}px */`;
    if (fmt === 'scss') return `$${name.replace('--', '')}: ${val};  // ${Math.round(px)}px`;
    if (fmt === 'tailwind') return `  '${name.replace('--space-', '')}': '${val}',`;
    return `  "${name.replace('--space-', '')}": "${val}"`;
  });
  if (fmt === 'css') return `:root {\n${entries.join('\n')}\n}`;
  if (fmt === 'scss') return entries.join('\n');
  if (fmt === 'tailwind') return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      spacing: {\n${entries.join('\n')}\n      }\n    }\n  }\n}`;
  return `{\n${entries.join(',\n')}\n}`;
}

const SpacingScaleGenerator = () => {
  const [base, setBase] = useState(4);
  const [method, setMethod] = useState<ScaleMethod>('linear');
  const [ratioIdx, setRatioIdx] = useState(0);
  const [customRatio, setCustomRatio] = useState('1.5');
  const [steps, setSteps] = useState(10);
  const [unit, setUnit] = useState<Unit>('rem');
  const [naming, setNaming] = useState<Naming>('numbered');
  const [fmt, setFmt] = useState<ExportFmt>('css');
  const [copied, setCopied] = useState(false);

  const ratio = method === 'ratio' ? (RATIOS[ratioIdx]?.value ?? parseFloat(customRatio)) : 1;
  const scale = useMemo(() => buildScale(base, method, ratio, steps), [base, method, ratio, steps]);
  const exportText = useMemo(() => buildExport(scale, unit, naming, fmt), [scale, unit, naming, fmt]);

  const maxPx = Math.max(...scale);
  const copy = () => { navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Spacing Scale Generator - Design System Spacing"
        description="Generate a consistent spacing scale for your design system. Choose a base value and ratio, preview the scale visually, and export as CSS or Tailwind config."
        path="/spacing-scale"
        keywords="spacing scale generator, design system spacing, css spacing variables, tailwind spacing config, design tokens spacing"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Spacing Scale Generator | ColorPeek', description: 'Generate design system spacing scales.', url: 'https://color-peek.com/spacing-scale', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Design System Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Spacing Scale <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Generate a consistent spacing scale for your design system and export as CSS, SCSS, Tailwind, or JSON.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Settings</p>

              <div className="mb-4">
                <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Base value (px)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={1} max={16} value={base}
                    onInput={e => setBase(+(e.target as HTMLInputElement).value)}
                    onChange={e => setBase(+e.target.value)}
                    className="flex-1 accent-indigo-500"/>
                  <input type="number" value={base} min={1} max={32} onChange={e => setBase(+e.target.value)}
                    className="glass-input w-16 text-sm font-mono text-center"/>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Scale method</label>
                <div className="flex gap-2">
                  {(['linear', 'ratio'] as ScaleMethod[]).map(m => (
                    <button key={m} onClick={() => setMethod(m)}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${method === m ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      {m === 'linear' ? 'Linear ×2' : 'Ratio-based'}
                    </button>
                  ))}
                </div>
              </div>

              {method === 'ratio' && (
                <div className="mb-4">
                  <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Ratio</label>
                  <select value={ratioIdx} onChange={e => setRatioIdx(+e.target.value)} className="glass-input w-full text-sm mb-2">
                    {RATIOS.map((r, i) => <option key={r.label} value={i}>{r.label}</option>)}
                    <option value={-1}>Custom</option>
                  </select>
                  {ratioIdx === -1 && (
                    <input type="number" step="0.001" min="1.001" max="3" value={customRatio}
                      onChange={e => setCustomRatio(e.target.value)} className="glass-input w-full text-sm font-mono"/>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Steps: {steps}</label>
                <input type="range" min={6} max={16} value={steps}
                  onInput={e => setSteps(+(e.target as HTMLInputElement).value)}
                  onChange={e => setSteps(+e.target.value)}
                  className="w-full accent-indigo-500"/>
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Unit</label>
                <div className="flex gap-1">
                  {(['px','rem','em'] as Unit[]).map(u => (
                    <button key={u} onClick={() => setUnit(u)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${unit === u ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Naming</label>
                <select value={naming} onChange={e => setNaming(e.target.value as Naming)} className="glass-input w-full text-sm">
                  <option value="numbered">Numbered (--space-1, --space-2…)</option>
                  <option value="tshirt">T-shirt (xs, sm, md, lg…)</option>
                  <option value="tailwind">Tailwind-style (1, 2, 4, 8…)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Visual + Export */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-4">
            {/* Visual bars */}
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Visual Scale</p>
              <div className="space-y-2">
                {scale.map((px, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--text-muted)] w-16 text-right flex-shrink-0">{toUnit(px, unit)}</span>
                    <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (px / maxPx) * 100)}%` }}/>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] w-12 flex-shrink-0">{Math.round(px)}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1.5">
                  {(['css','scss','tailwind','json'] as ExportFmt[]).map(f => (
                    <button key={f} onClick={() => setFmt(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${fmt === f ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      {f === 'tailwind' ? 'Tailwind' : f.toUpperCase()}
                    </button>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={copy} className="glass-button-primary px-3 py-1.5 text-xs font-semibold">
                  {copied ? '✓ Copied!' : 'Copy'}
                </motion.button>
              </div>
              <pre className="text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-64 overflow-y-auto whitespace-pre">{exportText}</pre>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/type-scale', '/font-pairing', '/palette-exporter']} />
        </div>
      </main>
    </div>
  );
};

export default SpacingScaleGenerator;
