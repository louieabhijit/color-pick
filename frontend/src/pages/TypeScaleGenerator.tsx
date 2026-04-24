import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

const RATIOS = [
  { label: 'Minor Second',   value: 1.067 },
  { label: 'Major Second',   value: 1.125 },
  { label: 'Minor Third',    value: 1.200 },
  { label: 'Major Third',    value: 1.250 },
  { label: 'Perfect Fourth', value: 1.333 },
  { label: 'Augmented Fourth', value: 1.414 },
  { label: 'Perfect Fifth',  value: 1.500 },
  { label: 'Golden Ratio',   value: 1.618 },
];

const STEPS = [
  { name: 'xs',   exp: -2 },
  { name: 'sm',   exp: -1 },
  { name: 'base', exp:  0 },
  { name: 'lg',   exp:  1 },
  { name: 'xl',   exp:  2 },
  { name: '2xl',  exp:  3 },
  { name: '3xl',  exp:  4 },
  { name: '4xl',  exp:  5 },
  { name: '5xl',  exp:  6 },
  { name: '6xl',  exp:  7 },
];

type OutputUnit = 'rem' | 'px' | 'em';
type ExportFmt = 'css' | 'tailwind' | 'scss';

function buildScale(base: number, ratio: number) {
  return STEPS.map(s => ({ ...s, px: +(base * Math.pow(ratio, s.exp)).toFixed(2) }));
}

function toCSS(scale: ReturnType<typeof buildScale>, unit: OutputUnit) {
  const entries = scale.map(s => {
    const v = unit === 'px' ? `${s.px}px` : unit === 'rem' ? `${(s.px / 16).toFixed(4)}rem` : `${(s.px / 16).toFixed(4)}em`;
    return `  --text-${s.name}: ${v};`;
  }).join('\n');
  return `:root {\n${entries}\n}`;
}
function toTailwind(scale: ReturnType<typeof buildScale>, unit: OutputUnit) {
  const entries = scale.map(s => {
    const v = unit === 'px' ? `'${s.px}px'` : `'${(s.px / 16).toFixed(4)}rem'`;
    return `      ${s.name}: ${v},`;
  }).join('\n');
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n${entries}\n      },\n    },\n  },\n};`;
}
function toSCSS(scale: ReturnType<typeof buildScale>, unit: OutputUnit) {
  return scale.map(s => {
    const v = unit === 'px' ? `${s.px}px` : `${(s.px / 16).toFixed(4)}rem`;
    return `$text-${s.name}: ${v};`;
  }).join('\n');
}

const TypeScaleGenerator = () => {
  const [base, setBase] = useState(16);
  const [ratioIdx, setRatioIdx] = useState(4);
  const [unit, setUnit] = useState<OutputUnit>('rem');
  const [exportFmt, setExportFmt] = useState<ExportFmt>('css');
  const [previewText, setPreviewText] = useState('The quick brown fox');
  const [copied, setCopied] = useState(false);

  const ratio = RATIOS[ratioIdx].value;
  const scale = buildScale(base, ratio);

  const exportText = exportFmt === 'css' ? toCSS(scale, unit) : exportFmt === 'tailwind' ? toTailwind(scale, unit) : toSCSS(scale, unit);

  const copy = () => { navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Type Scale Generator - Modular Typography Calculator"
        description="Generate a harmonious modular typographic scale from any base size and ratio. Choose from 8 musical scale ratios, preview 10 steps live, export as CSS variables, Tailwind, or SCSS. Free at ColorPeek."
        path="/type-scale"
        keywords="type scale generator, modular scale, typographic scale, css font size scale, tailwind font scale, typography calculator online"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Type Scale Generator | ColorPeek', description: 'Generate a modular typographic scale with live preview and export as CSS, Tailwind, or SCSS.', url: 'https://color-peek.com/type-scale', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What is a modular type scale?', acceptedAnswer: { '@type': 'Answer', text: 'A modular type scale is a series of font sizes derived by multiplying or dividing a base size by a fixed ratio. The result is a harmonious set of sizes where each step is mathematically proportional to the next, creating visual rhythm in typography.' } },
              { '@type': 'Question', name: 'What is the Major Third ratio?', acceptedAnswer: { '@type': 'Answer', text: 'The Major Third ratio (1.25) is a popular type scale ratio derived from musical intervals. It creates gentle, readable size progressions - commonly used for body-heavy content like blogs and documentation.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Typography Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Type Scale <span className="gradient-text">Calculator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Set a base size and ratio to generate a harmonious modular type scale.</p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6">
          <div className="flex flex-wrap gap-6 items-end">
            {/* Base size */}
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Base size (px)</label>
              <div className="flex items-center gap-2">
                <input type="range" min={10} max={24} value={base} onChange={e => setBase(+e.target.value)} className="w-32 accent-indigo-500"/>
                <input type="number" value={base} onChange={e => setBase(+e.target.value)} className="glass-input w-16 text-sm font-mono text-center"/>
              </div>
            </div>
            {/* Ratio */}
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Scale ratio</label>
              <select value={ratioIdx} onChange={e => setRatioIdx(+e.target.value)}
                className="glass-input text-sm pr-8">
                {RATIOS.map((r, i) => <option key={r.label} value={i}>{r.label} ({r.value})</option>)}
              </select>
            </div>
            {/* Unit */}
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Unit</label>
              <div className="flex gap-1">
                {(['rem', 'px', 'em'] as OutputUnit[]).map(u => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${unit === u ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                    {u}
                  </button>
                ))}
              </div>
            </div>
            {/* Preview text */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1.5">Preview text</label>
              <input type="text" value={previewText} onChange={e => setPreviewText(e.target.value)} className="glass-input w-full text-sm"/>
            </div>
          </div>
        </motion.div>

        {/* Scale preview */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="glass-card p-6 mb-6 space-y-1">
          {[...scale].reverse().map(step => {
            const val = unit === 'px' ? `${step.px}px` : `${(step.px / 16).toFixed(3)}${unit}`;
            return (
              <div key={step.name} className="flex items-baseline gap-4 py-1.5 border-b border-white/10 dark:border-white/5 last:border-0">
                <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 w-10 flex-shrink-0">{step.name}</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] w-20 flex-shrink-0">{val}</span>
                <span className="text-[var(--text-primary)] leading-none truncate" style={{ fontSize: `${step.px}px` }}>
                  {previewText}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Export */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Export</h3>
            <div className="flex gap-2">
              {(['css', 'tailwind', 'scss'] as ExportFmt[]).map(f => (
                <button key={f} onClick={() => setExportFmt(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${exportFmt === f ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                  {f === 'css' ? 'CSS Vars' : f === 'tailwind' ? 'Tailwind' : 'SCSS'}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-60 overflow-y-auto whitespace-pre pr-20">{exportText}</pre>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={copy}
              className="absolute top-3 right-3 glass-button px-3 py-1.5 text-xs font-semibold">
              {copied ? '✓ Copied' : 'Copy'}
            </motion.button>
          </div>
        </motion.div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Type Scale Generator</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Set your Base Size in pixels - typically 16px (browser default) or your body text size.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Choose a Scale Ratio - Minor Third (1.2) for tight scales, Perfect Fourth (1.333) for standard, Major Third (1.25) for gentle.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>The live preview shows all 10 scale steps from XS to display size, with px and rem values.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Select an export format: CSS variables, Tailwind fontSize config, or SCSS variables.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click Copy and paste the scale into your project.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is a Type Scale?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">A typographic scale is a systematic set of font sizes that work harmoniously together. Rather than picking sizes arbitrarily (12px, 15px, 18px, 22px...), a modular scale derives each size by multiplying or dividing a base by a constant ratio. This creates mathematically proportional relationships between heading levels, subheadings, body text, captions, and labels - resulting in consistent visual rhythm across a design. The concept of ratios borrowed from music (octave = 2x, perfect fifth = 1.5, major third = 1.25, etc.) where proportional relationships create harmony. Design systems like Material Design, Fluent, and Polaris all define type scales. Using a generator ensures your font sizes follow a consistent rule rather than being chosen case-by-case, which reduces visual inconsistency and speeds up design decisions.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What ratio should I use for a blog?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">For body-heavy content like blogs, the Major Third (1.25) or Perfect Fourth (1.333) ratios are most common. They create clear heading differentiation without extremes - a 16px base with Major Third gives 20px, 25px, 31px, 39px for headings, which reads naturally at typical viewport sizes.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Why use rem instead of px for font sizes?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Rem (root em) units scale relative to the browser's root font size. Users who set their browser's default font larger (for accessibility) will see all rem-based text scale proportionally. Px values are absolute and override user preferences, which can be an accessibility barrier.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I add a custom type scale to Tailwind CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Copy the Tailwind export and paste it into <code className="text-indigo-400">theme.extend.fontSize</code> in your <code className="text-indigo-400">tailwind.config.js</code>. This gives you custom utilities like <code className="text-indigo-400">text-scale-xl</code> alongside Tailwind's built-ins.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/font-pairing','/palettes','/color-converter']} />
        </div>
      </main>
    </div>
  );
};

export default TypeScaleGenerator;
