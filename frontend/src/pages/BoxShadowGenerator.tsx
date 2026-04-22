import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

interface ShadowLayer {
  id: string;
  x: number; y: number; blur: number; spread: number;
  color: string; opacity: number; inset: boolean;
}

let _id = 0;
const uid = () => `sh${++_id}`;

function layerToCSS(l: ShadowLayer): string {
  const hex = l.color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const rgba = `rgba(${r},${g},${b},${(l.opacity / 100).toFixed(2)})`;
  return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`;
}

const PRESETS: { label: string; layers: Omit<ShadowLayer, 'id'>[] }[] = [
  { label: 'Soft', layers: [{ x: 0, y: 4, blur: 16, spread: 0, color: '#000000', opacity: 15, inset: false }] },
  { label: 'Deep', layers: [{ x: 0, y: 8, blur: 32, spread: -4, color: '#000000', opacity: 25, inset: false }] },
  { label: 'Glow', layers: [{ x: 0, y: 0, blur: 20, spread: 2, color: '#6366f1', opacity: 60, inset: false }] },
  { label: 'Layered', layers: [
    { x: 0, y: 2, blur: 4, spread: -1, color: '#000000', opacity: 20, inset: false },
    { x: 0, y: 8, blur: 16, spread: -2, color: '#000000', opacity: 15, inset: false },
    { x: 0, y: 20, blur: 40, spread: -4, color: '#000000', opacity: 10, inset: false },
  ]},
  { label: 'Inner', layers: [{ x: 0, y: 2, blur: 8, spread: 0, color: '#000000', opacity: 20, inset: true }] },
  { label: 'None', layers: [] },
];

const SliderRow = ({ label, value, min = -100, max = 100, onChange }: {
  label: string; value: number; min?: number; max?: number; onChange: (v: number) => void;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-[11px] text-[var(--text-muted)] w-12 flex-shrink-0">{label}</span>
    <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)}
      className="flex-1 accent-indigo-500"/>
    <input type="number" value={value} onChange={e => onChange(+e.target.value)}
      className="glass-input w-16 text-xs font-mono text-center py-1"/>
  </div>
);

const BoxShadowGenerator = () => {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: uid(), x: 0, y: 8, blur: 32, spread: -4, color: '#000000', opacity: 20, inset: false }
  ]);
  const [selected, setSelected] = useState<string>(layers[0].id);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [cardColor, setCardColor] = useState('#f8f9ff');
  const [copied, setCopied] = useState(false);

  const cssValue = layers.length ? layers.map(layerToCSS).join(',\n  ') : 'none';
  const fullCSS = `box-shadow: ${cssValue};`;

  const addLayer = () => {
    const l: ShadowLayer = { id: uid(), x: 0, y: 4, blur: 12, spread: 0, color: '#000000', opacity: 20, inset: false };
    setLayers(p => [...p, l]);
    setSelected(l.id);
  };

  const removeLayer = (id: string) => {
    setLayers(p => p.filter(l => l.id !== id));
    setSelected(prev => prev === id ? (layers[0]?.id ?? '') : prev);
  };

  const update = useCallback((id: string, patch: Partial<ShadowLayer>) => {
    setLayers(p => p.map(l => l.id === id ? { ...l, ...patch } : l));
  }, []);

  const active = layers.find(l => l.id === selected);

  const copy = () => { navigator.clipboard.writeText(fullCSS); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Box Shadow Generator"
        description="Build multi-layer CSS box shadows with live preview. Stack up to 5 layers, control x/y offset, blur, spread, color, opacity and inset. Copy the full box-shadow CSS rule instantly."
        path="/box-shadow"
        keywords="css box shadow generator, box shadow generator online, multi-layer shadow, drop shadow css, shadow builder, css shadow tool"
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Box Shadow <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Build multi-layer shadows with live preview and copy the CSS.</p>
        </motion.div>

        {/* Presets */}
        <div className="flex gap-2 flex-wrap mb-6">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => { setLayers(p.layers.map(l => ({ ...l, id: uid() }))); setSelected(''); }}
              className="px-3 py-1.5 glass-card text-xs font-medium rounded-xl border border-white/30 hover:border-indigo-300/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass-card p-6 flex flex-col gap-4 min-h-[360px]">
            {/* Background + card color pickers */}
            <div className="flex gap-4">
              {[{ label: 'Background', val: bgColor, set: setBgColor }, { label: 'Card', val: cardColor, set: setCardColor }].map(({ label, val, set }) => (
                <div key={label} className="flex items-center gap-2">
                  <input type="color" value={val} onChange={e => set(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                  <span className="text-xs text-[var(--text-muted)]">{label}</span>
                </div>
              ))}
            </div>
            {/* Preview area */}
            <div className="flex-1 rounded-2xl flex items-center justify-center transition-colors duration-200 min-h-[200px]"
              style={{ backgroundColor: bgColor }}>
              <div className="w-36 h-36 rounded-2xl transition-all duration-200"
                style={{ backgroundColor: cardColor, boxShadow: cssValue === 'none' ? 'none' : layers.map(layerToCSS).join(', ') }}/>
            </div>
            {/* CSS output */}
            <div className="relative">
              <pre className="glass-card p-3 rounded-xl text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap pr-16 max-h-28 overflow-y-auto">{fullCSS}</pre>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={copy}
                className="absolute top-2 right-2 glass-button px-3 py-1.5 text-xs font-semibold">
                {copied ? '✓' : 'Copy'}
              </motion.button>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="flex flex-col gap-4">
            {/* Layer list */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Layers ({layers.length}/5)</p>
                <button onClick={addLayer} disabled={layers.length >= 5}
                  className="glass-button-primary px-3 py-1.5 text-xs font-semibold disabled:opacity-40">+ Add</button>
              </div>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {layers.map((l, i) => (
                    <motion.div key={l.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${selected === l.id ? 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-300/50' : 'glass-card border border-white/20 hover:border-indigo-200/40'}`}
                      onClick={() => setSelected(l.id)}>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: l.color, opacity: l.opacity / 100 }}/>
                      <span className="text-xs font-medium text-[var(--text-secondary)] flex-1">Layer {i + 1}{l.inset ? ' (inset)' : ''}</span>
                      <button onClick={e => { e.stopPropagation(); removeLayer(l.id); }}
                        className="text-[var(--text-muted)] hover:text-red-400 transition-colors p-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {layers.length === 0 && <p className="text-xs text-center text-[var(--text-muted)] py-4">No layers — add one above</p>}
              </div>
            </div>

            {/* Selected layer editor */}
            {active && (
              <motion.div key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 space-y-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Edit Layer</p>
                <SliderRow label="X" value={active.x} onChange={v => update(active.id, { x: v })}/>
                <SliderRow label="Y" value={active.y} onChange={v => update(active.id, { y: v })}/>
                <SliderRow label="Blur" value={active.blur} min={0} max={100} onChange={v => update(active.id, { blur: v })}/>
                <SliderRow label="Spread" value={active.spread} onChange={v => update(active.id, { spread: v })}/>
                <SliderRow label="Opacity" value={active.opacity} min={0} max={100} onChange={v => update(active.id, { opacity: v })}/>
                <div className="flex items-center gap-3 pt-1">
                  <input type="color" value={active.color} onChange={e => update(active.id, { color: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                  <span className="text-xs text-[var(--text-muted)]">Color</span>
                  <button onClick={() => update(active.id, { inset: !active.inset })}
                    className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active.inset ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                    Inset
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BoxShadowGenerator;
