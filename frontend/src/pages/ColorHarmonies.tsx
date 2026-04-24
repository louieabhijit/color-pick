import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

function hexToHsl(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return [Math.round(hue * 360), Math.round(sat * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hn = ((h % 360) + 360) % 360 / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255).toString(16).padStart(2, '0'); return `#${v}${v}${v}`; }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hf = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return '#' + [hn + 1/3, hn, hn - 1/3].map(c => Math.round(hf(c) * 255).toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [(0) | parseInt(h.slice(0,2),16), (0) | parseInt(h.slice(2,4),16), (0) | parseInt(h.slice(4,6),16)];
}

type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'tetradic' | 'square' | 'monochromatic';

function generateHarmony(hex: string, type: HarmonyType): string[] {
  const [h, s, l] = hexToHsl(hex);
  switch (type) {
    case 'complementary':     return [hex, hslToHex(h + 180, s, l)];
    case 'analogous':         return [hslToHex(h - 30, s, l), hex, hslToHex(h + 30, s, l)];
    case 'triadic':           return [hex, hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)];
    case 'split-complementary': return [hex, hslToHex(h + 150, s, l), hslToHex(h + 210, s, l)];
    case 'tetradic':          return [hex, hslToHex(h + 60, s, l), hslToHex(h + 180, s, l), hslToHex(h + 240, s, l)];
    case 'square':            return [hex, hslToHex(h + 90, s, l), hslToHex(h + 180, s, l), hslToHex(h + 270, s, l)];
    case 'monochromatic':     return [20, 35, 50, 65, 80].map(li => hslToHex(h, s, li));
    default: return [hex];
  }
}

const HARMONY_TYPES: { value: HarmonyType; label: string; count: number }[] = [
  { value: 'complementary',      label: 'Complementary',       count: 2 },
  { value: 'analogous',          label: 'Analogous',           count: 3 },
  { value: 'triadic',            label: 'Triadic',             count: 3 },
  { value: 'split-complementary',label: 'Split-Complementary', count: 3 },
  { value: 'tetradic',           label: 'Tetradic',            count: 4 },
  { value: 'square',             label: 'Square',              count: 4 },
  { value: 'monochromatic',      label: 'Monochromatic',       count: 5 },
];

// SVG Color Wheel
const ColorWheel = ({ baseHex, harmony, type }: { baseHex: string; harmony: string[]; type: HarmonyType }) => {
  const size = 220;
  const cx = size / 2, cy = size / 2, r = 85, innerR = 40;

  const segments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < 360; i++) {
      const a1 = (i - 90) * Math.PI / 180;
      const a2 = (i + 1 - 90) * Math.PI / 180;
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const x2 = cx + (innerR) * Math.cos(a1), y2 = cy + (innerR) * Math.sin(a1);
      const x3 = cx + r * Math.cos(a2), y3 = cy + r * Math.sin(a2);
      const x4 = cx + innerR * Math.cos(a2), y4 = cy + innerR * Math.sin(a2);
      segs.push({ d: `M${x2},${y2} L${x1},${y1} L${x3},${y3} L${x4},${y4}Z`, fill: `hsl(${i},80%,55%)` });
    }
    return segs;
  }, []);

  const [baseH] = hexToHsl(baseHex);
  const dots = harmony.map(hex => {
    const [h, s, l] = hexToHsl(hex);
    const angle = (h - 90) * Math.PI / 180;
    const dr = innerR + (r - innerR) * 0.5;
    return { x: cx + dr * Math.cos(angle), y: cy + dr * Math.sin(angle), hex, h };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {segments.map((s, i) => <path key={i} d={s.d} fill={s.fill}/>)}
      <circle cx={cx} cy={cy} r={innerR} fill="var(--glass-bg)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      {dots.length > 1 && <polyline points={dots.map(d => `${d.x},${d.y}`).join(' ')} fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.7"/>}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={i === 0 ? 9 : 7} fill={d.hex} stroke="white" strokeWidth="2"/>
          {i === 0 && <circle cx={d.x} cy={d.y} r={12} fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>}
        </g>
      ))}
    </svg>
  );
};

const ColorHarmonies = () => {
  const [base, setBase] = useState('#6366f1');
  const [type, setType] = useState<HarmonyType>('complementary');
  const [copied, setCopied] = useState('');

  const harmony = useMemo(() => generateHarmony(base, type), [base, type]);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  };

  const copyAllCSS = () => {
    const css = `:root {\n${harmony.map((hex, i) => `  --harmony-${i + 1}: ${hex};`).join('\n')}\n}`;
    copy(css, 'all-css');
  };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Harmonies Generator — Complementary, Analogous & More"
        description="Generate color harmonies from any base color. Get complementary, analogous, triadic, split-complementary, and tetradic color schemes instantly."
        path="/color-harmonies"
        keywords="color harmonies generator, complementary colors, analogous colors, triadic color scheme, color wheel generator"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Color Harmonies Generator | ColorPeek', description: 'Generate color harmonies from any base color.', url: 'https://color-peek.com/color-harmonies', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Theory Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color <span className="gradient-text">Harmonies Generator</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">Generate complementary, analogous, triadic, and more harmony schemes from any base color.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input + Wheel */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Base Color</p>
              <div className="flex items-center gap-3 mb-3">
                <input type="color" value={base} onChange={e => setBase(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
                <input type="text" value={base} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBase(e.target.value); }}
                  className="glass-input flex-1 font-mono uppercase text-sm"/>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#14b8a6'].map(c => (
                  <button key={c} onClick={() => setBase(c)} className="w-6 h-6 rounded-md border border-white/30 hover:scale-110 transition-transform" style={{ backgroundColor: c }}/>
                ))}
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl">
              <ColorWheel baseHex={base} harmony={harmony} type={type}/>
            </div>
          </motion.div>

          {/* Harmony type + Colors */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 space-y-4">
            {/* Type selector */}
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Harmony Type</p>
              <div className="flex flex-wrap gap-2">
                {HARMONY_TYPES.map(ht => (
                  <button key={ht.value} onClick={() => setType(ht.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${type === ht.value ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                    {ht.label}
                    <span className="ml-1.5 opacity-60">{ht.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Harmony Colors</p>
                <div className="flex gap-2">
                  <motion.button whileTap={{ scale: 0.95 }} onClick={copyAllCSS}
                    className="glass-button px-3 py-1.5 text-xs font-semibold">
                    {copied === 'all-css' ? '✓ Copied!' : 'Copy CSS Vars'}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(harmony.join(', '), 'all-hex')}
                    className="glass-button px-3 py-1.5 text-xs font-semibold">
                    {copied === 'all-hex' ? '✓' : 'Copy HEX list'}
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3 mb-5">
                {harmony.map((hex, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => copy(hex, hex)}
                    className="flex-1 rounded-2xl overflow-hidden group relative"
                    style={{ minHeight: 100 }}>
                    <div className="w-full h-24 transition-transform duration-200 group-hover:scale-105" style={{ backgroundColor: hex }}/>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      <span className="text-white text-xs font-semibold">{copied === hex ? '✓' : 'Copy'}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Details table */}
              <div className="space-y-2">
                {harmony.map((hex, i) => {
                  const rgb = hexToRgb(hex);
                  const [h, s, l] = hexToHsl(hex);
                  return (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 dark:bg-white/3">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 border border-white/20" style={{ backgroundColor: hex }}/>
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <span className="font-mono text-xs text-[var(--text-primary)]">{hex.toUpperCase()}</span>
                        <span className="text-xs text-[var(--text-muted)]">rgb({rgb.join(', ')})</span>
                        <span className="text-xs text-[var(--text-muted)]">hsl({h}, {s}%, {l}%)</span>
                      </div>
                      <button onClick={() => copy(hex, `row-${i}`)} className="glass-button px-2 py-1 text-xs flex-shrink-0">
                        {copied === `row-${i}` ? '✓' : 'Copy'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/palettes', '/color-converter', '/tint-shade']} />
        </div>
      </main>
    </div>
  );
};

export default ColorHarmonies;
