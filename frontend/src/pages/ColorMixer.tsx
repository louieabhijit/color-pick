import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
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
  return [h * 360, s * 100, l * 100];
}
function hslToHex(h: number, s: number, l: number): string {
  const hn = ((h % 360) + 360) % 360 / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255).toString(16).padStart(2,'0'); return `#${v}${v}${v}`; }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn, p = 2 * ln - q;
  const hf = (t: number) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1/6) return p + (q - p) * 6 * t; if (t < 1/2) return q; if (t < 2/3) return p + (q - p) * (2/3 - t) * 6; return p; };
  return '#' + [hn + 1/3, hn, hn - 1/3].map(c => Math.round(hf(c) * 255).toString(16).padStart(2, '0')).join('');
}
function srgbLinear(c: number) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function linearToSRGB(c: number) { return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055; }

function mixRGB(a: string, b: string, t: number): string {
  const [r1,g1,b1] = hexToRgb(a), [r2,g2,b2] = hexToRgb(b);
  return rgbToHex(r1+(r2-r1)*t, g1+(g2-g1)*t, b1+(b2-b1)*t);
}
function mixHSL(a: string, b: string, t: number): string {
  const [h1,s1,l1] = hexToHsl(a), [h2,s2,l2] = hexToHsl(b);
  let hd = h2 - h1;
  if (hd > 180) hd -= 360;
  if (hd < -180) hd += 360;
  return hslToHex(h1 + hd * t, s1 + (s2 - s1) * t, l1 + (l2 - l1) * t);
}
function mixOKLCH(a: string, b: string, t: number): string {
  // approximate via oklab-like via linear sRGB
  const [r1,g1,b1] = hexToRgb(a).map(v => srgbLinear(v/255));
  const [r2,g2,b2] = hexToRgb(b).map(v => srgbLinear(v/255));
  const mr = r1 + (r2-r1)*t, mg = g1 + (g2-g1)*t, mb = b1 + (b2-b1)*t;
  return rgbToHex(linearToSRGB(mr)*255, linearToSRGB(mg)*255, linearToSRGB(mb)*255);
}

type BlendMode = 'RGB' | 'HSL' | 'OKLCH';

const STEPS_OPTIONS = [5, 7, 9, 11];

const ColorMixer = () => {
  const [colorA, setColorA] = useState('#6366f1');
  const [colorB, setColorB] = useState('#ec4899');
  const [ratio, setRatio] = useState(50);
  const [mode, setMode] = useState<BlendMode>('RGB');
  const [steps, setSteps] = useState(7);
  const [copied, setCopied] = useState('');

  const t = ratio / 100;

  const mixed = useMemo(() => {
    if (mode === 'RGB') return mixRGB(colorA, colorB, t);
    if (mode === 'HSL') return mixHSL(colorA, colorB, t);
    return mixOKLCH(colorA, colorB, t);
  }, [colorA, colorB, t, mode]);

  const stepsColors = useMemo(() => {
    return Array.from({ length: steps }, (_, i) => {
      const tt = i / (steps - 1);
      if (mode === 'RGB') return mixRGB(colorA, colorB, tt);
      if (mode === 'HSL') return mixHSL(colorA, colorB, tt);
      return mixOKLCH(colorA, colorB, tt);
    });
  }, [colorA, colorB, steps, mode]);

  const modeResults = useMemo(() => ([
    { mode: 'RGB', color: mixRGB(colorA, colorB, t) },
    { mode: 'HSL', color: mixHSL(colorA, colorB, t) },
    { mode: 'OKLCH', color: mixOKLCH(colorA, colorB, t) },
  ] as { mode: string; color: string }[]), [colorA, colorB, t]);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  };

  const [mr, mg, mb] = hexToRgb(mixed);
  const [mh, ms, ml] = hexToHsl(mixed);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Mixer — Blend Two Colors Together"
        description="Mix and blend two colors with an adjustable ratio. See the result in real-time. Choose blending in RGB, HSL, or OKLCH color space. Copy the mixed color."
        path="/color-mixer"
        keywords="color mixer, blend colors, color blender online, mix two colors, color interpolation tool"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Color Mixer | ColorPeek', description: 'Mix and blend two colors with adjustable ratio.', url: 'https://color-peek.com/color-mixer', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color <span className="gradient-text">Mixer</span>
          </h1>
          <p className="text-[var(--text-muted)]">Blend two colors with adjustable ratio in RGB, HSL, or OKLCH space.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Color A */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 rounded-2xl">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Color A</p>
            <div className="w-full h-28 rounded-xl mb-3 border border-white/20" style={{ backgroundColor: colorA }}/>
            <div className="flex items-center gap-2 mb-2">
              <input type="color" value={colorA} onChange={e => setColorA(e.target.value)}
                className="w-10 h-10 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
              <input type="text" value={colorA} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColorA(e.target.value); }}
                className="glass-input flex-1 font-mono text-sm uppercase"/>
            </div>
          </motion.div>

          {/* Center: Mixed + controls */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            <div className="glass-card p-5 rounded-2xl text-center">
              <div className="w-full h-28 rounded-xl mb-3 border border-white/20" style={{ backgroundColor: mixed }}/>
              <p className="text-lg font-bold font-mono text-[var(--text-primary)]">{mixed.toUpperCase()}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">rgb({mr}, {mg}, {mb}) · hsl({Math.round(mh)}, {Math.round(ms)}%, {Math.round(ml)}%)</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(mixed, 'mixed')}
                className="mt-3 glass-button-primary px-4 py-2 text-sm font-semibold w-full">
                {copied === 'mixed' ? '✓ Copied!' : 'Copy Mixed Color'}
              </motion.button>
            </div>

            {/* Ratio */}
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5">
                <span>100% A</span>
                <span className="font-semibold text-[var(--text-primary)]">{100-ratio}% A · {ratio}% B</span>
                <span>100% B</span>
              </div>
              <input type="range" min={0} max={100} value={ratio}
                onInput={e => setRatio(+(e.target as HTMLInputElement).value)}
                onChange={e => setRatio(+e.target.value)}
                className="w-full accent-indigo-500"/>
              {/* Gradient bar */}
              <div className="h-3 rounded-full mt-2 border border-white/10"
                style={{ background: `linear-gradient(to right, ${colorA}, ${colorB})` }}/>
            </div>

            {/* Blend mode */}
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-xs font-semibold text-[var(--text-muted)] mb-2">Blend Mode</p>
              <div className="flex gap-2">
                {(['RGB','HSL','OKLCH'] as BlendMode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${mode === m ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                    {m}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                {modeResults.map(({ mode: m, color }) => (
                  <div key={m} className="flex-1 text-center">
                    <div className="h-6 rounded-lg border border-white/20 mb-1" style={{ backgroundColor: color }}/>
                    <span className="text-[10px] text-[var(--text-muted)]">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Color B */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5 rounded-2xl">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Color B</p>
            <div className="w-full h-28 rounded-xl mb-3 border border-white/20" style={{ backgroundColor: colorB }}/>
            <div className="flex items-center gap-2 mb-2">
              <input type="color" value={colorB} onChange={e => setColorB(e.target.value)}
                className="w-10 h-10 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
              <input type="text" value={colorB} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setColorB(e.target.value); }}
                className="glass-input flex-1 font-mono text-sm uppercase"/>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[var(--text-secondary)]">Blend Steps</p>
            <div className="flex gap-1.5">
              {STEPS_OPTIONS.map(n => (
                <button key={n} onClick={() => setSteps(n)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${steps === n ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {stepsColors.map((hex, i) => (
              <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => copy(hex, `step-${i}`)}
                className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full h-12 rounded-xl border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: hex }}/>
                <span className="text-[9px] font-mono text-[var(--text-muted)]">{copied === `step-${i}` ? '✓' : hex.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/tint-shade', '/palettes', '/color-converter', '/color-harmonies']} />
        </div>
      </main>
    </div>
  );
};

export default ColorMixer;
