import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

// ── Types ────────────────────────────────────────────────────────────────────

type GradientType = 'linear' | 'radial' | 'conic';
type RadialShape = 'circle' | 'ellipse';

interface Stop {
  id: string;
  color: string;
  position: number;
}

let _id = 0;
const uid = () => `s${++_id}`;

// ── CSS builder ──────────────────────────────────────────────────────────────

function buildGradient(
  type: GradientType,
  angle: number,
  stops: Stop[],
  shape: RadialShape,
  radialPos: string,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopStr})`;
  if (type === 'radial')  return `radial-gradient(${shape} at ${radialPos}, ${stopStr})`;
  return `conic-gradient(from ${angle}deg at center, ${stopStr})`;
}

// ── Preset gradients ─────────────────────────────────────────────────────────

interface Preset {
  name: string;
  type: GradientType;
  angle: number;
  stops: Stop[];
  shape: RadialShape;
  radialPos: string;
}

const PRESETS: Preset[] = [
  { name: 'Aurora',    type: 'linear', angle: 135, stops: [{ id: uid(), color: '#6366f1', position: 0 }, { id: uid(), color: '#8b5cf6', position: 50 }, { id: uid(), color: '#ec4899', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Sunset',    type: 'linear', angle: 90,  stops: [{ id: uid(), color: '#f97316', position: 0 }, { id: uid(), color: '#ef4444', position: 50 }, { id: uid(), color: '#ec4899', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Ocean',     type: 'linear', angle: 135, stops: [{ id: uid(), color: '#0ea5e9', position: 0 }, { id: uid(), color: '#06b6d4', position: 50 }, { id: uid(), color: '#10b981', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Candy',     type: 'linear', angle: 45,  stops: [{ id: uid(), color: '#f43f5e', position: 0 }, { id: uid(), color: '#a855f7', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Forest',    type: 'linear', angle: 160, stops: [{ id: uid(), color: '#14532d', position: 0 }, { id: uid(), color: '#16a34a', position: 50 }, { id: uid(), color: '#86efac', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Midnight',  type: 'linear', angle: 225, stops: [{ id: uid(), color: '#0f172a', position: 0 }, { id: uid(), color: '#1e1b4b', position: 50 }, { id: uid(), color: '#312e81', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Glow',      type: 'radial', angle: 0,   stops: [{ id: uid(), color: '#8b5cf6', position: 0 }, { id: uid(), color: '#1e1b4b', position: 100 }], shape: 'ellipse', radialPos: 'center' },
  { name: 'Rainbow',   type: 'conic',  angle: 0,   stops: [{ id: uid(), color: '#ef4444', position: 0 }, { id: uid(), color: '#f97316', position: 17 }, { id: uid(), color: '#eab308', position: 34 }, { id: uid(), color: '#22c55e', position: 50 }, { id: uid(), color: '#3b82f6', position: 67 }, { id: uid(), color: '#8b5cf6', position: 84 }, { id: uid(), color: '#ef4444', position: 100 }], shape: 'ellipse', radialPos: 'center' },
];

// ── Direction presets for linear ─────────────────────────────────────────────

const DIRECTIONS = [
  { label: '→',   angle: 90  },
  { label: '↘',   angle: 135 },
  { label: '↓',   angle: 180 },
  { label: '↙',   angle: 225 },
  { label: '←',   angle: 270 },
  { label: '↖',   angle: 315 },
  { label: '↑',   angle: 0   },
  { label: '↗',   angle: 45  },
];

const RADIAL_POSITIONS = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'];

// ── Component ────────────────────────────────────────────────────────────────

const GradientGenerator = () => {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { id: uid(), color: '#6366f1', position: 0 },
    { id: uid(), color: '#8b5cf6', position: 50 },
    { id: uid(), color: '#ec4899', position: 100 },
  ]);
  const [shape, setShape] = useState<RadialShape>('ellipse');
  const [radialPos, setRadialPos] = useState('center');
  const [copied, setCopied] = useState<string | null>(null);

  const gradientCSS = useMemo(
    () => buildGradient(type, angle, stops, shape, radialPos),
    [type, angle, stops, shape, radialPos]
  );

  const cssOutput = `background: ${gradientCSS};`;
  const tailwindOutput = `className="[background:${gradientCSS}]"`;
  const fullCSS = `.element {\n  background: ${gradientCSS};\n}`;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const loadPreset = (preset: Preset) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops.map(s => ({ ...s, id: uid() })));
    setShape(preset.shape);
    setRadialPos(preset.radialPos);
  };

  const addStop = () => {
    if (stops.length >= 8) return;
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const lastPos = sorted[sorted.length - 1]?.position ?? 0;
    const newPos = Math.min(100, lastPos + Math.round((100 - lastPos) / 2));
    setStops(prev => [...prev, { id: uid(), color: '#ffffff', position: newPos }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
  };

  const updateStop = useCallback((id: string, updates: Partial<Stop>) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops]);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Gradient Generator — Build Custom Linear & Radial Gradients"
        description="Create linear, radial, and conic CSS gradients visually with a live editor. Add up to 8 color stops, choose angle and type, and copy the ready-to-use CSS or Tailwind code instantly. Free at ColorPeek."
        path="/gradient-generator"
        keywords="css gradient generator, linear gradient builder, radial gradient tool, conic gradient generator, tailwind gradient, gradient color picker"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'CSS Gradient Generator | ColorPeek', description: 'Build custom CSS gradients with a live visual editor.', url: 'https://color-peek.com/gradient-generator', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What gradient types does this tool support?', acceptedAnswer: { '@type': 'Answer', text: 'The generator supports linear-gradient (with adjustable angle), radial-gradient, and conic-gradient. You can add up to 8 color stops per gradient.' } },
              { '@type': 'Question', name: 'Can I use the output in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool outputs a Tailwind arbitrary value like bg-[linear-gradient(...)] that you can paste directly into your className.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center mb-12"
        >
          <span className="section-label mb-4 inline-block">Design Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-[var(--text-primary)]">
            CSS Gradient <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Build linear, radial, and conic gradients with a live visual editor. Copy the CSS or Tailwind code in one click.
          </p>
        </motion.div>

        {/* Presets */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-3">Presets</p>
          <div className="flex gap-3 flex-wrap">
            {PRESETS.map(preset => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => loadPreset(preset)}
                className="flex items-center gap-2 px-3 py-2 glass-card rounded-xl border border-white/30 hover:border-indigo-300/50 transition-all duration-200 group"
              >
                <div
                  className="w-6 h-6 rounded-md flex-shrink-0"
                  style={{ background: buildGradient(preset.type, preset.angle, preset.stops, preset.shape, preset.radialPos) }}
                />
                <span className="text-xs font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                  {preset.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left: Preview + Output */}
          <div className="flex flex-col gap-6">

            {/* Live preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div
                className="w-full h-64 rounded-2xl shadow-xl transition-all duration-300"
                style={{ background: gradientCSS }}
              />
            </motion.div>

            {/* CSS Output */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-5"
            >
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">CSS Output</h3>

              {/* background value */}
              <div className="relative mb-3">
                <div className="glass-card p-3 rounded-xl pr-20">
                  <p className="text-xs font-mono text-[var(--text-secondary)] break-all leading-relaxed">{cssOutput}</p>
                </div>
                <button
                  onClick={() => copy(gradientCSS, 'value')}
                  className="absolute right-2 top-2 glass-button px-2.5 py-1 text-[11px] font-semibold"
                >
                  {copied === 'value' ? '✓' : 'Copy'}
                </button>
              </div>

              {/* Full CSS rule */}
              <div className="relative mb-3">
                <div className="glass-card p-3 rounded-xl pr-20">
                  <pre className="text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{fullCSS}</pre>
                </div>
                <button
                  onClick={() => copy(fullCSS, 'full')}
                  className="absolute right-2 top-2 glass-button px-2.5 py-1 text-[11px] font-semibold"
                >
                  {copied === 'full' ? '✓' : 'Copy'}
                </button>
              </div>

              {/* Tailwind */}
              <div className="relative">
                <div className="glass-card p-3 rounded-xl pr-20">
                  <p className="text-[11px] font-mono text-[var(--text-secondary)] break-all leading-relaxed">{tailwindOutput}</p>
                </div>
                <button
                  onClick={() => copy(tailwindOutput, 'tw')}
                  className="absolute right-2 top-2 glass-button px-2.5 py-1 text-[11px] font-semibold"
                >
                  {copied === 'tw' ? '✓' : 'Tailwind'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-col gap-5"
          >

            {/* Gradient type */}
            <div className="glass-card p-5">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Type</p>
              <div className="flex gap-2">
                {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                      type === t
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                        : 'glass-button text-[var(--text-secondary)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle / Direction */}
            {(type === 'linear' || type === 'conic') && (
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    {type === 'linear' ? 'Direction' : 'Start Angle'}
                  </p>
                  <span className="text-sm font-mono text-[var(--text-primary)]">{angle}°</span>
                </div>
                {type === 'linear' && (
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {DIRECTIONS.map(d => (
                      <button
                        key={d.angle}
                        onClick={() => setAngle(d.angle)}
                        className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
                          angle === d.angle
                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                            : 'glass-button text-[var(--text-secondary)]'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="range"
                  min={0} max={360} value={angle}
                  onChange={e => setAngle(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            )}

            {/* Radial settings */}
            {type === 'radial' && (
              <div className="glass-card p-5">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Radial Settings</p>
                <div className="flex gap-2 mb-3">
                  {(['circle', 'ellipse'] as RadialShape[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
                        shape === s ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-secondary)]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-2">Position</p>
                <div className="flex flex-wrap gap-1.5">
                  {RADIAL_POSITIONS.map(pos => (
                    <button
                      key={pos}
                      onClick={() => setRadialPos(pos)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                        radialPos === pos ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-secondary)]'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color stops */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  Color Stops <span className="text-[var(--text-muted)] font-normal">({stops.length}/8)</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={addStop}
                  disabled={stops.length >= 8}
                  className="glass-button-primary px-3 py-1.5 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + Add Stop
                </motion.button>
              </div>

              {/* Stop bar preview */}
              <div
                className="h-6 rounded-xl mb-4 shadow-inner"
                style={{ background: gradientCSS }}
              />

              <div className="space-y-3">
                <AnimatePresence>
                  {sortedStops.map(stop => (
                    <motion.div
                      key={stop.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      {/* Color swatch + picker */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-9 h-9 rounded-xl border-2 border-white/30 cursor-pointer overflow-hidden"
                          style={{ backgroundColor: stop.color }}
                        />
                        <input
                          type="color"
                          value={stop.color}
                          onChange={e => updateStop(stop.id, { color: e.target.value })}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>

                      {/* Color hex */}
                      <input
                        type="text"
                        value={stop.color}
                        onChange={e => {
                          const val = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
                          if (/^#[0-9a-fA-F]{0,6}$/.test(val)) updateStop(stop.id, { color: val });
                        }}
                        className="glass-input w-24 text-xs font-mono"
                      />

                      {/* Position slider */}
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="range"
                          min={0} max={100} value={stop.position}
                          onChange={e => updateStop(stop.id, { position: Number(e.target.value) })}
                          className="flex-1 accent-indigo-500"
                        />
                        <span className="text-xs font-mono text-[var(--text-muted)] w-8 text-right">
                          {stop.position}%
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeStop(stop.id)}
                        disabled={stops.length <= 2}
                        className="w-7 h-7 rounded-lg flex items-center justify-center glass-button text-[var(--text-muted)] hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the CSS Gradient Generator</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Choose a gradient type: Linear, Radial, or Conic.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>For linear gradients, set the angle using the slider (0–360°).</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Click any color stop on the gradient bar to change its color or move its position.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Add up to 8 color stops using the + button for complex multi-color gradients.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Copy the CSS or Tailwind output and paste it into your project.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is a CSS Gradient Generator?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">A CSS gradient generator lets you build complex color transitions visually, without writing gradient syntax by hand. CSS gradients — defined with <code className="text-indigo-400">linear-gradient()</code>, <code className="text-indigo-400">radial-gradient()</code>, or <code className="text-indigo-400">conic-gradient()</code> — can have unlimited color stops, each at a precise position. Getting this right manually requires trial and error. A visual generator lets you drag stops, pick colors, and see the result in real time. The output is clean, optimized CSS you can paste directly into a stylesheet or use as a Tailwind arbitrary value. Gradients are widely used for hero backgrounds, button fills, card overlays, text effects, and UI depth without any image overhead.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the difference between linear and radial gradients?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Linear gradients transition colors along a straight line at any angle. Radial gradients spread outward from a center point in a circular or elliptical shape. Conic gradients sweep around a center point like a pie chart.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I add more than 2 colors to a gradient?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes. This generator supports up to 8 color stops. Each stop has an independent color and position, so you can create rainbow gradients, duotones with a hard stop at 50%, or any complex multi-tone effect.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I use the gradient in Tailwind CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Copy the Tailwind output (e.g., <code className="text-indigo-400">bg-[linear-gradient(135deg,#6366f1_0%,#8b5cf6_100%)]</code>) and add it as a className. Tailwind's arbitrary value syntax supports full CSS gradient strings.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Are gradients better than background images for performance?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Generally yes. CSS gradients are rendered by the GPU with no HTTP request, no compression artifacts, and no resolution constraints. They scale perfectly to any screen size and have zero file size overhead.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/gradients','/glass-generator','/color-converter']} />
        </div>
      </main>
    </div>
  );
};

export default GradientGenerator;
