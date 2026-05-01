import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
  enabled: boolean;
}

let _id = 0;
const uid = () => `ts${++_id}`;

function layerToCSS(l: ShadowLayer): string {
  const h = l.color.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${l.x}px ${l.y}px ${l.blur}px rgba(${r},${g},${b},${(l.opacity / 100).toFixed(2)})`;
}

const PRESETS = [
  { name: 'Subtle Drop', layers: [{ x: 1, y: 2, blur: 4, color: '#000000', opacity: 25, enabled: true }] },
  { name: 'Hard Shadow', layers: [{ x: 3, y: 3, blur: 0, color: '#000000', opacity: 80, enabled: true }] },
  { name: 'Glow', layers: [{ x: 0, y: 0, blur: 20, color: '#6366f1', opacity: 90, enabled: true }] },
  { name: 'Neon', layers: [
    { x: 0, y: 0, blur: 7, color: '#00f5d4', opacity: 100, enabled: true },
    { x: 0, y: 0, blur: 21, color: '#00f5d4', opacity: 70, enabled: true },
    { x: 0, y: 0, blur: 42, color: '#00f5d4', opacity: 40, enabled: true },
  ]},
  { name: 'Embossed', layers: [
    { x: -2, y: -2, blur: 3, color: '#ffffff', opacity: 80, enabled: true },
    { x: 2, y: 2, blur: 3, color: '#000000', opacity: 30, enabled: true },
  ]},
  { name: 'Long Shadow', layers: [
    { x: 4, y: 4, blur: 0, color: '#000000', opacity: 18, enabled: true },
    { x: 8, y: 8, blur: 0, color: '#000000', opacity: 14, enabled: true },
    { x: 12, y: 12, blur: 0, color: '#000000', opacity: 10, enabled: true },
    { x: 16, y: 16, blur: 0, color: '#000000', opacity: 6, enabled: true },
  ]},
  { name: 'Retro 3D', layers: [
    { x: 2, y: 2, blur: 0, color: '#e11d48', opacity: 100, enabled: true },
    { x: 4, y: 4, blur: 0, color: '#9f1239', opacity: 100, enabled: true },
  ]},
  { name: 'Outline', layers: [
    { x: -1, y: -1, blur: 0, color: '#000000', opacity: 100, enabled: true },
    { x: 1, y: -1, blur: 0, color: '#000000', opacity: 100, enabled: true },
    { x: -1, y: 1, blur: 0, color: '#000000', opacity: 100, enabled: true },
    { x: 1, y: 1, blur: 0, color: '#000000', opacity: 100, enabled: true },
  ]},
];

const FONTS = [
  'Inter', 'Georgia', 'Playfair Display', 'Oswald', 'Lora',
  'Roboto Slab', 'Montserrat', 'Raleway', 'Source Sans 3', 'Space Grotesk',
];

const SliderRow = ({ label, value, min, max, unit, onChange }: { label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-[var(--text-muted)] w-20 flex-shrink-0">{label}</span>
    <input type="range" min={min} max={max} value={value}
      onInput={e => onChange(+(e.target as HTMLInputElement).value)}
      onChange={e => onChange(+e.target.value)}
      className="flex-1 accent-indigo-500"/>
    <span className="text-xs font-mono text-[var(--text-primary)] w-14 text-right">{value}{unit}</span>
  </div>
);

const TextShadowGenerator = () => {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: uid(), x: 2, y: 2, blur: 4, color: '#000000', opacity: 30, enabled: true }
  ]);
  const [selectedId, setSelectedId] = useState(layers[0].id);
  const [text, setText] = useState('ColorPeek');
  const [textColor, setTextColor] = useState('#1a1a2e');
  const [bgColor, setBgColor] = useState('#f8f9ff');
  const [fontSize, setFontSize] = useState(64);
  const [font, setFont] = useState('Inter');
  const [copied, setCopied] = useState(false);

  const activeLayers = layers.filter(l => l.enabled);
  const cssValue = activeLayers.length ? activeLayers.map(layerToCSS).join(',\n  ') : 'none';
  const fullCSS = `text-shadow: ${cssValue};`;

  const addLayer = () => {
    const l: ShadowLayer = { id: uid(), x: 0, y: 2, blur: 4, color: '#000000', opacity: 25, enabled: true };
    setLayers(p => [...p, l]);
    setSelectedId(l.id);
  };

  const remove = (id: string) => {
    setLayers(p => p.filter(l => l.id !== id));
    setSelectedId(layers[0]?.id ?? '');
  };

  const update = useCallback((id: string, patch: Partial<ShadowLayer>) => {
    setLayers(p => p.map(l => l.id === id ? { ...l, ...patch } : l));
  }, []);

  const loadPreset = (preset: typeof PRESETS[0]) => {
    const newLayers = preset.layers.map(l => ({ ...l, id: uid() }));
    setLayers(newLayers);
    setSelectedId(newLayers[0]?.id ?? '');
  };

  const active = layers.find(l => l.id === selectedId);
  const copy = () => { navigator.clipboard.writeText(fullCSS); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  const fontUrl = FONTS.includes(font) && font !== 'Inter' && font !== 'Georgia'
    ? `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;700&display=swap`
    : null;

  return (
    <div className="min-h-screen w-full">
      {fontUrl && <link rel="stylesheet" href={fontUrl}/>}
      <PageSEO
        title="CSS Text Shadow Generator - Visual Editor"
        description="Create CSS text-shadow effects visually. Adjust offset, blur, and color. Layer multiple shadows for advanced effects. Copy production-ready CSS code."
        path="/text-shadow"
        keywords="css text shadow generator, text shadow effect, glow text css, text shadow online, css typography effects"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'CSS Text Shadow Generator | ColorPeek', description: 'Create CSS text-shadow effects visually.', url: 'https://color-peek.com/text-shadow', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            CSS Text Shadow <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Build multi-layer text shadows with live preview and copy the CSS.</p>
        </motion.div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => loadPreset(p)}
              className="px-3 py-1.5 glass-card text-xs font-medium rounded-xl border border-white/30 hover:border-indigo-300/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              {p.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-4">
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                <span className="text-xs text-[var(--text-muted)]">BG</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                <span className="text-xs text-[var(--text-muted)]">Text</span>
              </div>
              <select value={font} onChange={e => setFont(e.target.value)} className="glass-input text-sm flex-1">
                {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden min-h-[200px] flex items-center justify-center p-8"
              style={{ backgroundColor: bgColor }}>
              <p style={{ color: textColor, fontSize: `${fontSize}px`, fontFamily: `'${font}', serif`, textShadow: cssValue, fontWeight: 700, lineHeight: 1.1, textAlign: 'center', transition: 'none' }}>
                {text}
              </p>
            </div>

            <div className="glass-card p-4 rounded-2xl space-y-3">
              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1.5">Preview text</label>
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="glass-input w-full text-sm"/>
              </div>
              <SliderRow label="Font size" value={fontSize} min={12} max={120} unit="px" onChange={setFontSize}/>
            </div>

            <div className="relative">
              <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap pr-20 max-h-32 overflow-y-auto">{fullCSS}</pre>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={copy}
                className="absolute top-2 right-2 glass-button px-3 py-1.5 text-xs font-semibold">
                {copied ? '✓' : 'Copy'}
              </motion.button>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="flex flex-col gap-4">
            {/* Layer list */}
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Shadow Layers ({layers.length})</p>
                <button onClick={addLayer} className="glass-button-primary px-3 py-1.5 text-xs font-semibold">+ Add Layer</button>
              </div>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {layers.map((l, i) => (
                    <motion.div key={l.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all ${selectedId === l.id ? 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-300/50' : 'glass-card border border-white/20'}`}
                      onClick={() => setSelectedId(l.id)}>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: l.color, opacity: l.opacity / 100 }}/>
                      <span className="text-xs font-medium text-[var(--text-secondary)] flex-1">Layer {i + 1}</span>
                      <button onClick={e => { e.stopPropagation(); update(l.id, { enabled: !l.enabled }); }}
                        className={`text-xs px-1.5 py-0.5 rounded ${l.enabled ? 'text-indigo-500' : 'text-[var(--text-muted)]'}`}>
                        {l.enabled ? '👁' : '🚫'}
                      </button>
                      <button onClick={e => { e.stopPropagation(); remove(l.id); }}
                        className="text-[var(--text-muted)] hover:text-red-400 p-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Layer editor */}
            {active && (
              <motion.div key={selectedId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5 rounded-2xl space-y-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Edit Selected Layer</p>
                <SliderRow label="X Offset" value={active.x} min={-50} max={50} unit="px" onChange={v => update(active.id, { x: v })}/>
                <SliderRow label="Y Offset" value={active.y} min={-50} max={50} unit="px" onChange={v => update(active.id, { y: v })}/>
                <SliderRow label="Blur" value={active.blur} min={0} max={50} unit="px" onChange={v => update(active.id, { blur: v })}/>
                <SliderRow label="Opacity" value={active.opacity} min={0} max={100} unit="%" onChange={v => update(active.id, { opacity: v })}/>
                <div className="flex items-center gap-3">
                  <input type="color" value={active.color} onChange={e => update(active.id, { color: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                  <span className="text-xs text-[var(--text-muted)]">Shadow Color</span>
                  <span className="ml-auto font-mono text-xs text-[var(--text-secondary)]">{active.color}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the CSS Text Shadow Generator</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Choose a preset (Subtle Drop, Glow, Neon, Embossed, Retro 3D) to start, or build from scratch.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Adjust X offset, Y offset, blur radius, shadow color, and opacity using the sliders.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Click "Add Layer" to stack multiple shadows for richer effects like neon glows or 3D depth.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Toggle individual layers on/off using the eye icon to compare before and after.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click "Copy" to copy the complete <code className="text-indigo-400">text-shadow</code> CSS declaration, ready to paste.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is CSS text-shadow?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">The CSS <code className="text-indigo-400">text-shadow</code> property adds one or more shadow effects to text. Each shadow is defined by four values: the horizontal offset (X), vertical offset (Y), blur radius, and color. Positive X moves the shadow right; positive Y moves it down. A blur radius of 0 creates a hard-edged shadow with no softness.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">Where CSS <code className="text-indigo-400">box-shadow</code> applies to the rectangular box of an element, <code className="text-indigo-400">text-shadow</code> follows the actual shape of each letter — making it ideal for typographic effects. Multiple shadows are stacked as a comma-separated list, processed from back to front. This lets you layer a tight hard shadow for definition, a wide soft shadow for depth, and a colored glow for atmosphere — all in a single declaration.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">Common uses include: subtle drop shadows for legibility on images, glowing neon effects for dark UI, letterpress or embossed text for editorial layouts, and long flat shadows for material-style headlines. Unlike <code className="text-indigo-400">filter: drop-shadow()</code>, <code className="text-indigo-400">text-shadow</code> does not affect surrounding elements and renders with excellent browser support across all modern platforms.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How many text shadows can I stack?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">There is no browser-imposed limit on the number of shadows. In practice, 3-5 layers cover most design needs. More than 8 layers can noticeably affect rendering performance on large text or when animations are involved.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I animate text-shadow with CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes. <code className="text-indigo-400">text-shadow</code> is animatable with CSS <code className="text-indigo-400">transition</code> and <code className="text-indigo-400">animation</code>. However, animating blur radius is expensive — prefer animating opacity or switching between pre-defined shadow values for better performance.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the difference between text-shadow and filter: drop-shadow?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]"><code className="text-indigo-400">text-shadow</code> applies only to text characters and is part of the text rendering layer. <code className="text-indigo-400">filter: drop-shadow()</code> applies to the entire element including borders and backgrounds, and is GPU-composited. For text-only effects, <code className="text-indigo-400">text-shadow</code> is the correct choice.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Does text-shadow affect layout or spacing?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">No. Like <code className="text-indigo-400">box-shadow</code>, <code className="text-indigo-400">text-shadow</code> is purely visual and does not affect the document layout, line height, or the space any element occupies.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/box-shadow', '/font-pairing', '/type-scale']} />
        </div>
      </main>
    </div>
  );
};

export default TextShadowGenerator;
