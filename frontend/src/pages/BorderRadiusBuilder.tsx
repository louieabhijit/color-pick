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
        title="CSS Border Radius Builder"
        description="Visually design any CSS border-radius shape with live preview. Control all four corners independently, switch between px, %, and rem units, and copy the optimised CSS shorthand."
        path="/border-radius"
        keywords="css border radius builder, border radius generator, rounded corners css, border radius tool, css shape builder, border radius online"
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
      </main>
    </div>
  );
};

export default BorderRadiusBuilder;
