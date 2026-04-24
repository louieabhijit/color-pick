import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

type Unit = 'px' | '%' | 'rem';

interface Corners { tl: number; tr: number; br: number; bl: number }

const PRESETS: { label: string; corners: Corners }[] = [
  { label: 'None',     corners: { tl: 0,  tr: 0,  br: 0,  bl: 0  } },
  { label: 'Small',    corners: { tl: 4,  tr: 4,  br: 4,  bl: 4  } },
  { label: 'Medium',   corners: { tl: 8,  tr: 8,  br: 8,  bl: 8  } },
  { label: 'Large',    corners: { tl: 16, tr: 16, br: 16, bl: 16 } },
  { label: 'XL',       corners: { tl: 24, tr: 24, br: 24, bl: 24 } },
  { label: 'Pill',     corners: { tl: 50, tr: 50, br: 50, bl: 50 } },
  { label: 'Squircle', corners: { tl: 30, tr: 30, br: 30, bl: 30 } },
  { label: 'Leaf',     corners: { tl: 0,  tr: 48, br: 0,  bl: 48 } },
  { label: 'Tab',      corners: { tl: 12, tr: 12, br: 0,  bl: 0  } },
  { label: 'Teardrop', corners: { tl: 48, tr: 48, br: 0,  bl: 48 } },
];

function buildCSS(c: Corners, unit: Unit) {
  const u = unit;
  if (c.tl === c.tr && c.tr === c.br && c.br === c.bl) return `border-radius: ${c.tl}${u};`;
  if (c.tl === c.br && c.tr === c.bl) return `border-radius: ${c.tl}${u} ${c.tr}${u};`;
  return `border-radius: ${c.tl}${u} ${c.tr}${u} ${c.br}${u} ${c.bl}${u};`;
}

const Slider = ({ label, value, onChange, max }: { label: string; value: number; onChange: (v: number) => void; max: number }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className="font-mono text-[var(--text-primary)]">{value}</span>
    </div>
    <input type="range" min={0} max={max} value={value} onChange={e => onChange(+e.target.value)}
      className="w-full accent-indigo-500"/>
  </div>
);

const BorderRadiusBuilder = () => {
  const [corners, setCorners] = useState<Corners>({ tl: 16, tr: 16, br: 16, bl: 16 });
  const [unit, setUnit] = useState<Unit>('px');
  const [linked, setLinked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [bg, setBg] = useState('#6366f1');

  const max = unit === '%' ? 50 : unit === 'rem' ? 8 : 100;

  const set = (corner: keyof Corners) => (v: number) => {
    if (linked) setCorners({ tl: v, tr: v, br: v, bl: v });
    else setCorners(prev => ({ ...prev, [corner]: v }));
  };

  const css = buildCSS(corners, unit);

  const copy = () => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  const radiusVal = (v: number) => unit === 'rem' ? `${(v * 0.25).toFixed(2)}rem` : `${v}${unit}`;

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Border Radius Builder — Rounded Corners Generator"
        description="Visually design any CSS border-radius shape with live preview. Control all four corners independently, switch between px, %, and rem units, copy optimized CSS shorthand. Free at ColorPeek."
        path="/border-radius"
        keywords="css border radius generator, rounded corners css, border radius builder, css shape tool, border radius online, css corner radius"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'CSS Border Radius Builder | ColorPeek', description: 'Visually design any CSS border-radius with live preview and copy the CSS shorthand.', url: 'https://color-peek.com/border-radius', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What does CSS border-radius do?', acceptedAnswer: { '@type': 'Answer', text: 'The CSS border-radius property rounds the corners of an element. You can set all four corners to the same value for a uniform effect, or control each corner independently for custom shapes like teardrops, leaves, and squircles.' } },
              { '@type': 'Question', name: 'What is a squircle in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'A squircle is a shape between a square and a circle, created with a high border-radius (around 25–35%) applied to all corners. Apple popularized squircles for app icons; they appear more organic than simple rounded squares.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Border Radius <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-[var(--text-muted)]">Visually build any border-radius shape and copy the CSS output.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-8 flex flex-col items-center justify-center gap-6 min-h-[320px]">
            <div className="flex items-center gap-3 mb-2">
              <label className="text-xs text-[var(--text-muted)]">Color</label>
              <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
            </div>
            <div className="w-48 h-48 shadow-2xl transition-all duration-200"
              style={{ backgroundColor: bg, borderRadius: `${radiusVal(corners.tl)} ${radiusVal(corners.tr)} ${radiusVal(corners.br)} ${radiusVal(corners.bl)}` }}
            />
            <div className="relative w-full">
              <div className="glass-card p-3 rounded-xl font-mono text-sm text-[var(--text-secondary)] text-center pr-16">{css}</div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={copy} className="absolute right-2 top-2 glass-button px-3 py-1.5 text-xs font-semibold">
                {copied ? '✓' : 'Copy'}
              </motion.button>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="flex flex-col gap-5">
            {/* Presets */}
            <div className="glass-card p-5">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => setCorners(p.corners)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium glass-button text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Corners</p>
                <div className="flex items-center gap-3">
                  {/* Unit */}
                  <div className="flex gap-1">
                    {(['px', '%', 'rem'] as Unit[]).map(u => (
                      <button key={u} onClick={() => setUnit(u)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${unit === u ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                        {u}
                      </button>
                    ))}
                  </div>
                  {/* Link toggle */}
                  <button onClick={() => setLinked(!linked)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${linked ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                    {linked ? 'Linked' : 'Free'}
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <Slider label="Top Left"     value={corners.tl} onChange={set('tl')} max={max}/>
                <Slider label="Top Right"    value={corners.tr} onChange={set('tr')} max={max}/>
                <Slider label="Bottom Right" value={corners.br} onChange={set('br')} max={max}/>
                <Slider label="Bottom Left"  value={corners.bl} onChange={set('bl')} max={max}/>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Border Radius Builder</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Choose a preset shape (None, Small, Medium, Large, Pill, Squircle, Leaf, etc.) to start quickly.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Toggle Linked mode to adjust all corners together, or Free mode to control each corner independently.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Switch between px, %, and rem units using the unit buttons.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Use the color picker to change the preview box color and visualize your shape in context.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click Copy to copy the optimized CSS shorthand (e.g., <code className="text-indigo-400">border-radius: 16px 4px;</code>).</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is CSS Border Radius?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">The CSS <code className="text-indigo-400">border-radius</code> property rounds the corners of an element's box. You can specify a single value for all four corners, two values for the top-left/bottom-right and top-right/bottom-left pairs, or up to four individual values for complete control. Percentage values (like <code className="text-indigo-400">50%</code>) create circular or elliptical shapes. The property is widely used for buttons, cards, avatars, and decorative shapes. Using rem units ties corner sizes to the user's base font size, which respects accessibility preferences. The shorthand syntax automatically optimizes when corners share values — so <code className="text-indigo-400">border-radius: 16px 16px 16px 16px</code> compresses to <code className="text-indigo-400">border-radius: 16px</code>.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I make a perfect circle with CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Set <code className="text-indigo-400">border-radius: 50%</code> on an element with equal width and height. The 50% value creates a fully circular shape regardless of the element's size in pixels.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the border-radius shorthand syntax?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">With 4 values: top-left, top-right, bottom-right, bottom-left (clockwise). With 2 values: top-left & bottom-right, top-right & bottom-left. With 1 value: all four corners. The builder auto-generates the most compact shorthand for your settings.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I use border-radius in Tailwind CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes. Tailwind has built-in classes: <code className="text-indigo-400">rounded</code>, <code className="text-indigo-400">rounded-lg</code>, <code className="text-indigo-400">rounded-full</code>, etc. For custom values, use arbitrary syntax: <code className="text-indigo-400">rounded-[30px_4px]</code>.</p>
              </details>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center">
            Also explore: <a href="/box-shadow" className="text-indigo-500 hover:underline">Box Shadow Generator</a> · <a href="/glass-generator" className="text-indigo-500 hover:underline">Glassmorphism Generator</a> · <a href="/gradient-generator" className="text-indigo-500 hover:underline">Gradient Generator</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default BorderRadiusBuilder;
