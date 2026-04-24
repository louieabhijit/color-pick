import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

interface FilterValues {
  blur: number; brightness: number; contrast: number; grayscale: number;
  hueRotate: number; invert: number; opacity: number; saturate: number; sepia: number;
  shadowX: number; shadowY: number; shadowBlur: number; shadowColor: string; shadowEnabled: boolean;
}

const DEFAULTS: FilterValues = {
  blur: 0, brightness: 100, contrast: 100, grayscale: 0,
  hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0,
  shadowX: 2, shadowY: 2, shadowBlur: 4, shadowColor: '#000000', shadowEnabled: false,
};

const PRESETS: { name: string; values: Partial<FilterValues> }[] = [
  { name: 'Vintage', values: { sepia: 40, contrast: 85, brightness: 95, saturate: 75 } },
  { name: 'B&W', values: { grayscale: 100, contrast: 110 } },
  { name: 'High Contrast', values: { contrast: 160, brightness: 90 } },
  { name: 'Warm', values: { sepia: 20, brightness: 108, saturate: 120 } },
  { name: 'Cool', values: { hueRotate: 200, saturate: 80, brightness: 105 } },
  { name: 'Faded', values: { brightness: 120, contrast: 75, saturate: 60 } },
  { name: 'Dramatic', values: { contrast: 140, saturate: 130, brightness: 85 } },
  { name: 'Reset', values: { ...DEFAULTS } },
];

const SAMPLES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80',
];

interface SliderDef { key: keyof FilterValues; label: string; min: number; max: number; default: number; unit: string }

const SLIDERS: SliderDef[] = [
  { key: 'blur', label: 'Blur', min: 0, max: 20, default: 0, unit: 'px' },
  { key: 'brightness', label: 'Brightness', min: 0, max: 300, default: 100, unit: '%' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 300, default: 100, unit: '%' },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, default: 0, unit: '%' },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, default: 0, unit: 'deg' },
  { key: 'invert', label: 'Invert', min: 0, max: 100, default: 0, unit: '%' },
  { key: 'opacity', label: 'Opacity', min: 0, max: 100, default: 100, unit: '%' },
  { key: 'saturate', label: 'Saturate', min: 0, max: 300, default: 100, unit: '%' },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, default: 0, unit: '%' },
];

function buildFilter(v: FilterValues): string {
  const parts: string[] = [];
  if (v.blur !== 0) parts.push(`blur(${v.blur}px)`);
  if (v.brightness !== 100) parts.push(`brightness(${v.brightness}%)`);
  if (v.contrast !== 100) parts.push(`contrast(${v.contrast}%)`);
  if (v.grayscale !== 0) parts.push(`grayscale(${v.grayscale}%)`);
  if (v.hueRotate !== 0) parts.push(`hue-rotate(${v.hueRotate}deg)`);
  if (v.invert !== 0) parts.push(`invert(${v.invert}%)`);
  if (v.opacity !== 100) parts.push(`opacity(${v.opacity}%)`);
  if (v.saturate !== 100) parts.push(`saturate(${v.saturate}%)`);
  if (v.sepia !== 0) parts.push(`sepia(${v.sepia}%)`);
  if (v.shadowEnabled) parts.push(`drop-shadow(${v.shadowX}px ${v.shadowY}px ${v.shadowBlur}px ${v.shadowColor})`);
  return parts.length ? parts.join(' ') : 'none';
}

const FilterSlider = ({ def, value, enabled, onToggle, onChange, onReset }: {
  def: SliderDef; value: number; enabled: boolean; onToggle: () => void; onChange: (v: number) => void; onReset: () => void;
}) => (
  <div className={`p-3 rounded-xl transition-all ${enabled ? 'bg-white/5' : 'opacity-40'}`}>
    <div className="flex items-center gap-2 mb-2">
      <button onClick={onToggle} className={`w-4 h-4 rounded flex-shrink-0 border ${enabled ? 'bg-indigo-500 border-indigo-500' : 'border-white/30 bg-transparent'}`}>
        {enabled && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
      </button>
      <span className="text-xs font-medium text-[var(--text-secondary)] flex-1">{def.label}</span>
      <span className="text-xs font-mono text-[var(--text-muted)] w-16 text-right">{value}{def.unit}</span>
      <button onClick={onReset} className="text-xs text-[var(--text-muted)] hover:text-indigo-400 px-1">↺</button>
    </div>
    <input type="range" min={def.min} max={def.max} value={value} disabled={!enabled}
      onInput={e => onChange(+(e.target as HTMLInputElement).value)}
      onChange={e => onChange(+e.target.value)}
      className="w-full accent-indigo-500"/>
  </div>
);

const CSSFilterGenerator = () => {
  const [values, setValues] = useState<FilterValues>({ ...DEFAULTS });
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ blur: true, brightness: true, contrast: true, grayscale: true, hueRotate: true, invert: true, opacity: true, saturate: true, sepia: true });
  const [sampleIdx, setSampleIdx] = useState(0);
  const [customImg, setCustomImg] = useState('');
  const [before, setBefore] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FilterValues) => (v: number | string | boolean) => setValues(p => ({ ...p, [key]: v }));
  const reset = (key: keyof FilterValues) => setValues(p => ({ ...p, [key]: DEFAULTS[key] }));
  const toggleEnabled = (key: string) => setEnabled(p => ({ ...p, [key]: !p[key] }));

  const effectiveValues = { ...values };
  SLIDERS.forEach(s => { if (!enabled[s.key]) (effectiveValues as any)[s.key] = DEFAULTS[s.key as keyof FilterValues]; });

  const filterStr = buildFilter(effectiveValues);
  const cssOutput = `filter: ${filterStr};`;

  const copy = () => { navigator.clipboard.writeText(cssOutput); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  const imgSrc = customImg || SAMPLES[sampleIdx];

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Filter Generator — Blur, Contrast, Sepia & More"
        description="Create CSS filter effects visually. Adjust blur, brightness, contrast, grayscale, sepia, hue-rotate, saturate, and invert. Copy the CSS code instantly."
        path="/css-filter"
        keywords="css filter generator, blur filter css, brightness contrast css, sepia filter, hue rotate css, css image filter tool"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'CSS Filter Generator | ColorPeek', description: 'Create CSS filter effects visually.', url: 'https://color-peek.com/css-filter', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            CSS Filter <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Adjust blur, brightness, contrast, and more with live preview.</p>
        </motion.div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => setValues({ ...DEFAULTS, ...p.values })}
              className="px-3 py-1.5 glass-card text-xs font-medium rounded-xl border border-white/30 hover:border-indigo-300/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              {p.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3 space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex gap-2">
                  {SAMPLES.map((_, i) => (
                    <button key={i} onClick={() => { setSampleIdx(i); setCustomImg(''); }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${sampleIdx === i && !customImg ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      Sample {i + 1}
                    </button>
                  ))}
                  <button onClick={() => fileRef.current?.click()} className="glass-button px-2.5 py-1 text-xs font-medium">Upload</button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) setCustomImg(URL.createObjectURL(f)); }}/>
                </div>
                <button onClick={() => setBefore(!before)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${before ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                  {before ? 'Before' : 'After'}
                </button>
              </div>
              <div className="relative">
                <img src={imgSrc} alt="Preview" className="w-full object-cover max-h-72"
                  style={{ filter: before ? 'none' : filterStr, transition: 'none' }}
                  crossOrigin="anonymous"/>
              </div>
            </div>

            {/* Drop shadow controls */}
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <button onClick={() => setValues(p => ({ ...p, shadowEnabled: !p.shadowEnabled }))}
                  className={`w-4 h-4 rounded border flex-shrink-0 ${values.shadowEnabled ? 'bg-indigo-500 border-indigo-500' : 'border-white/30'}`}>
                  {values.shadowEnabled && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                </button>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Drop Shadow</p>
              </div>
              {values.shadowEnabled && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'X', key: 'shadowX' as const, min: -20, max: 20 },
                    { label: 'Y', key: 'shadowY' as const, min: -20, max: 20 },
                    { label: 'Blur', key: 'shadowBlur' as const, min: 0, max: 20 },
                  ].map(({ label, key, min, max }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-xs text-[var(--text-muted)] w-8">{label}</span>
                      <input type="range" min={min} max={max} value={values[key] as number}
                        onInput={e => set(key)(+(e.target as HTMLInputElement).value)}
                        onChange={e => set(key)(+e.target.value)}
                        className="flex-1 accent-indigo-500"/>
                      <span className="text-xs font-mono text-[var(--text-muted)] w-8">{values[key] as number}px</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] w-8">Color</span>
                    <input type="color" value={values.shadowColor} onChange={e => set('shadowColor')(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                  </div>
                </div>
              )}
            </div>

            {/* CSS output */}
            <div className="relative">
              <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap pr-20">{cssOutput}</pre>
              <motion.button whileTap={{ scale: 0.96 }} onClick={copy}
                className="absolute top-2 right-2 glass-button px-3 py-1.5 text-xs font-semibold">
                {copied ? '✓' : 'Copy'}
              </motion.button>
            </div>
          </motion.div>

          {/* Sliders */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 glass-card p-4 rounded-2xl space-y-1">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Filter Controls</p>
            {SLIDERS.map(def => (
              <FilterSlider key={def.key} def={def}
                value={values[def.key] as number}
                enabled={enabled[def.key] ?? true}
                onToggle={() => toggleEnabled(def.key)}
                onChange={v => set(def.key)(v)}
                onReset={() => reset(def.key)}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/glass-generator', '/box-shadow', '/color-converter']} />
        </div>
      </main>
    </div>
  );
};

export default CSSFilterGenerator;
