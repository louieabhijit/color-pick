import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

function hslToHex(h: number, s: number, l: number): string {
  const hn = h / 360, sn = s / 100, ln = l / 100;
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
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
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
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function srgbLinear(c: number) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function hexToOklch(hex: string): string {
  const [r, g, b] = hexToRgb(hex).map(v => srgbLinear(v / 255));
  const x = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const y = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const z = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
  const l = Math.cbrt(x), m = Math.cbrt(y), s2 = Math.cbrt(z);
  const L = Math.round((0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s2) * 1000) / 10;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s2;
  const bv = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s2;
  const C = Math.round(Math.sqrt(a*a + bv*bv) * 10000) / 10000;
  let H = Math.round(Math.atan2(bv, a) * 180 / Math.PI);
  if (H < 0) H += 360;
  return `oklch(${L}% ${C} ${H})`;
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => srgbLinear(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const FILTER_PRESETS = [
  { label: 'Any', hMin: 0, hMax: 360, sMin: 0, sMax: 100, lMin: 0, lMax: 100 },
  { label: 'Pastel', hMin: 0, hMax: 360, sMin: 25, sMax: 60, lMin: 70, lMax: 90 },
  { label: 'Vivid', hMin: 0, hMax: 360, sMin: 70, sMax: 100, lMin: 40, lMax: 65 },
  { label: 'Dark', hMin: 0, hMax: 360, sMin: 10, sMax: 80, lMin: 10, lMax: 35 },
  { label: 'Neon', hMin: 0, hMax: 360, sMin: 90, sMax: 100, lMin: 50, lMax: 70 },
  { label: 'Earth', hMin: 15, hMax: 55, sMin: 20, sMax: 60, lMin: 30, lMax: 60 },
];

interface ColorEntry { hex: string; locked: boolean }

const RandomColorGenerator = () => {
  const [hRange, setHRange] = useState([0, 360]);
  const [sRange, setSRange] = useState([0, 100]);
  const [lRange, setLRange] = useState([20, 90]);
  const [multiMode, setMultiMode] = useState(false);
  const [colors, setColors] = useState<ColorEntry[]>([{ hex: '#6366f1', locked: false }]);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState('');

  const randomInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const genOne = useCallback(() => {
    const h = randomInRange(hRange[0], hRange[1]);
    const s = randomInRange(sRange[0], sRange[1]);
    const l = randomInRange(lRange[0], lRange[1]);
    return hslToHex(h, s, l);
  }, [hRange, sRange, lRange]);

  const generate = useCallback(() => {
    if (multiMode) {
      setColors(prev => {
        const next = prev.map(c => c.locked ? c : { hex: genOne(), locked: false });
        const newHexes = next.filter((_, i) => !prev[i]?.locked).map(c => c.hex);
        setHistory(h => [...newHexes, ...h].slice(0, 20));
        return next;
      });
    } else {
      const hex = genOne();
      setColors([{ hex, locked: false }]);
      setHistory(h => [hex, ...h].slice(0, 20));
      window.history.replaceState(null, '', `#${hex.replace('#', '')}`);
    }
  }, [multiMode, genOne]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (/^[0-9a-fA-F]{6}$/.test(hash)) {
      setColors([{ hex: '#' + hash, locked: false }]);
    } else {
      generate();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); generate(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [generate]);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  };

  const mainColor = colors[0]?.hex ?? '#6366f1';
  const [r, g, b] = hexToRgb(mainColor);
  const [h, s, l] = hexToHsl(mainColor);
  const lum = luminance(mainColor);
  const textColor = lum > 0.4 ? '#1a1a2e' : '#ffffff';

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Random Color Generator — Get Random Colors Instantly"
        description="Generate random colors with one click. Get HEX, RGB, and HSL values. Lock colors you like and keep generating. Filter by hue, saturation, or lightness."
        path="/random-color"
        keywords="random color generator, random hex color, random palette generator, color randomizer online"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Random Color Generator | ColorPeek', description: 'Generate random colors instantly.', url: 'https://color-peek.com/random-color', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Random Color <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Click Generate or press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-xs font-mono">Space</kbd> to get a new color.</p>
        </motion.div>

        {/* Main color display */}
        {!multiMode && (
          <AnimatePresence mode="wait">
            <motion.div key={mainColor} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.25 }}
              className="rounded-3xl mb-6 overflow-hidden" style={{ backgroundColor: mainColor, minHeight: 220 }}>
              <div className="p-8 flex flex-col items-center justify-center" style={{ minHeight: 220 }}>
                <motion.p className="text-6xl sm:text-7xl font-bold font-mono mb-3 tracking-wider" style={{ color: textColor }}>
                  {mainColor.toUpperCase()}
                </motion.p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { label: 'HEX', val: mainColor.toUpperCase(), id: 'hex' },
                    { label: 'RGB', val: `rgb(${r}, ${g}, ${b})`, id: 'rgb' },
                    { label: 'HSL', val: `hsl(${h}, ${s}%, ${l}%)`, id: 'hsl' },
                    { label: 'OKLCH', val: hexToOklch(mainColor), id: 'oklch' },
                  ].map(({ label, val, id }) => (
                    <button key={id} onClick={() => copy(val, id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all backdrop-blur-sm"
                      style={{ backgroundColor: lum > 0.4 ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)', color: textColor }}>
                      {copied === id ? '✓ Copied!' : `${label}: ${val}`}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Multi mode */}
        {multiMode && (
          <div className="grid grid-cols-5 gap-3 mb-6">
            {(colors.length < 5 ? [...colors, ...Array(5 - colors.length).fill(null)] : colors).slice(0, 5).map((c, i) => {
              if (!c) return <div key={i} className="rounded-2xl bg-white/5 min-h-[140px]"/>;
              const lum2 = luminance(c.hex);
              const tc = lum2 > 0.4 ? '#1a1a2e' : '#ffffff';
              return (
                <motion.div key={i} className="rounded-2xl overflow-hidden cursor-pointer relative group" style={{ backgroundColor: c.hex, minHeight: 140 }}
                  onClick={() => copy(c.hex, `mc-${i}`)}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <span className="text-xs font-mono font-bold" style={{ color: tc }}>{c.hex.toUpperCase()}</span>
                    <span className="text-[10px] opacity-70 mt-0.5" style={{ color: tc }}>{copied === `mc-${i}` ? 'Copied!' : 'Click to copy'}</span>
                  </div>
                  <button onClick={e => { e.stopPropagation(); setColors(prev => prev.map((col, j) => j === i ? { ...col, locked: !col.locked } : col)); }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    {c.locked ? '🔒' : '🔓'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Controls */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Generate */}
          <div className="glass-card p-5 rounded-2xl flex flex-col gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={generate}
              className="glass-button-primary py-3 text-base font-bold flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Generate
            </motion.button>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">5-color mode</span>
              <button onClick={() => { setMultiMode(!multiMode); if (!multiMode) setColors(Array.from({length:5},()=>({hex:genOne(),locked:false}))); else setColors([{hex:genOne(),locked:false}]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${multiMode ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                {multiMode ? 'On' : 'Off'}
              </button>
            </div>
            {!multiMode && (
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(`--color-random: ${mainColor};`, 'cssvar')}
                className="glass-button py-2 text-xs font-semibold">
                {copied === 'cssvar' ? '✓ Copied!' : 'Copy as CSS Variable'}
              </motion.button>
            )}
          </div>

          {/* Filters */}
          <div className="glass-card p-5 rounded-2xl lg:col-span-2">
            <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Color Filters</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {FILTER_PRESETS.map(fp => (
                <button key={fp.label} onClick={() => { setHRange([fp.hMin, fp.hMax]); setSRange([fp.sMin, fp.sMax]); setLRange([fp.lMin, fp.lMax]); }}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium glass-button text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  {fp.label}
                </button>
              ))}
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Hue', range: hRange, setRange: setHRange, min: 0, max: 360, unit: '°' },
                { label: 'Saturation', range: sRange, setRange: setSRange, min: 0, max: 100, unit: '%' },
                { label: 'Lightness', range: lRange, setRange: setLRange, min: 0, max: 100, unit: '%' },
              ].map(({ label, range, setRange, min, max, unit }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-muted)] w-20">{label}</span>
                  <input type="range" min={min} max={max} value={range[0]}
                    onInput={e => setRange([+(e.target as HTMLInputElement).value, Math.max(+(e.target as HTMLInputElement).value, range[1])])}
                    onChange={e => setRange([+e.target.value, Math.max(+e.target.value, range[1])])}
                    className="flex-1 accent-indigo-500"/>
                  <span className="text-xs font-mono text-[var(--text-muted)] w-20 text-right">{range[0]}{unit}–{range[1]}{unit}</span>
                  <input type="range" min={min} max={max} value={range[1]}
                    onInput={e => setRange([Math.min(range[0], +(e.target as HTMLInputElement).value), +(e.target as HTMLInputElement).value])}
                    onChange={e => setRange([Math.min(range[0], +e.target.value), +e.target.value])}
                    className="flex-1 accent-indigo-500"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="glass-card p-4 rounded-2xl">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">History</p>
            <div className="flex flex-wrap gap-2">
              {history.map((hex, i) => (
                <button key={i} onClick={() => { setColors([{ hex, locked: false }]); }}
                  className="group relative w-10 h-10 rounded-xl border-2 border-white/20 hover:scale-110 transition-transform flex-shrink-0"
                  style={{ backgroundColor: hex }} title={hex}>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{hex.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/palettes', '/color-converter', '/color-harmonies']} />
        </div>
      </main>
    </div>
  );
};

export default RandomColorGenerator;
