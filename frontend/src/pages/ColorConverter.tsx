import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

// ── Conversion math ──────────────────────────────────────────────────────────

function clamp(v: number, lo = 0, hi = 255) { return Math.min(hi, Math.max(lo, v)); }
function round(v: number, d = 2) { return Math.round(v * 10 ** d) / 10 ** d; }

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => clamp(Math.round(v)).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return [round(h * 360), round(s * 100), round(l * 100)];
}
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255); return [v, v, v]; }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return [Math.round(hue(hn + 1/3) * 255), Math.round(hue(hn) * 255), Math.round(hue(hn - 1/3) * 255)];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn), d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max, v = max;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return [round(h * 360), round(s * 100), round(v * 100)];
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return [0, 0, 0, 100];
  return [round((1 - rn - k) / (1 - k) * 100), round((1 - gn - k) / (1 - k) * 100), round((1 - bn - k) / (1 - k) * 100), round(k * 100)];
}
function cmykToRgb(c: number, m: number, y: number, k: number): [number, number, number] {
  const kn = k / 100;
  return [Math.round(255 * (1 - c / 100) * (1 - kn)), Math.round(255 * (1 - m / 100) * (1 - kn)), Math.round(255 * (1 - y / 100) * (1 - kn))];
}

function srgbLinear(c: number) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const [rl, gl, bl] = [r, g, b].map(v => srgbLinear(v / 255));
  const x = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const y = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const z = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
  const l = Math.cbrt(x), m2 = Math.cbrt(y), s2 = Math.cbrt(z);
  const L = round(0.2104542553 * l + 0.7936177850 * m2 - 0.0040720468 * s2, 4);
  const a = round(1.9779984951 * l - 2.4285922050 * m2 + 0.4505937099 * s2, 4);
  const bv = round(0.0259040371 * l + 0.7827717662 * m2 - 0.8086757660 * s2, 4);
  const C = round(Math.sqrt(a * a + bv * bv), 4);
  let H = round(Math.atan2(bv, a) * 180 / Math.PI, 1);
  if (H < 0) H += 360;
  return [round(L * 100, 1), round(C, 4), H];
}

// ── Parse any input ──────────────────────────────────────────────────────────

function parseInput(raw: string): [number, number, number] | null {
  const s = raw.trim();
  // HEX
  const hexM = s.match(/^#?([0-9a-fA-F]{6})$/);
  if (hexM) return hexToRgb('#' + hexM[1]);
  // rgb(r,g,b)
  const rgbM = s.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbM) return [+rgbM[1], +rgbM[2], +rgbM[3]];
  // hsl(h,s%,l%)
  const hslM = s.match(/hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)/i);
  if (hslM) return hslToRgb(+hslM[1], +hslM[2], +hslM[3]);
  // cmyk(c%,m%,y%,k%)
  const cmykM = s.match(/cmyk\s*\(\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*\)/i);
  if (cmykM) return cmykToRgb(+cmykM[1], +cmykM[2], +cmykM[3], +cmykM[4]);
  return null;
}

// ── UI ────────────────────────────────────────────────────────────────────────

const EXAMPLES = ['#6366f1', 'rgb(99, 102, 241)', 'hsl(239, 84%, 67%)', 'cmyk(59%, 58%, 0%, 5%)'];

const ColorConverter = () => {
  const [input, setInput] = useState('#6366f1');
  const [rgb, setRgb] = useState<[number, number, number]>([99, 102, 241]);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const process = useCallback((raw: string) => {
    setInput(raw);
    const result = parseInput(raw);
    if (result) { setRgb(result); setError(false); }
    else setError(true);
  }, []);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id); setTimeout(() => setCopied(null), 1800);
  };

  const [r, g, b] = rgb;
  const hex = rgbToHex(r, g, b);
  const [h, sl, l] = rgbToHsl(r, g, b);
  const [hv, sv, v] = rgbToHsv(r, g, b);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  const [lch_L, lch_C, lch_H] = rgbToOklch(r, g, b);

  const formats = [
    { label: 'HEX',    id: 'hex',  value: hex },
    { label: 'RGB',    id: 'rgb',  value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL',    id: 'hsl',  value: `hsl(${h}, ${sl}%, ${l}%)` },
    { label: 'HSV',    id: 'hsv',  value: `hsv(${hv}, ${sv}%, ${v}%)` },
    { label: 'CMYK',   id: 'cmyk', value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` },
    { label: 'OKLCH',  id: 'oklch',value: `oklch(${lch_L}% ${lch_C} ${lch_H})` },
  ];

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Converter — HEX to RGB, HSL, HSV, CMYK & OKLCH"
        description="Convert any color between HEX, RGB, HSL, HSV, CMYK, and OKLCH instantly. Supports modern CSS Color Level 4. Paste any format and get all others with one click. Free at ColorPeek."
        path="/color-converter"
        keywords="color converter, hex to rgb, rgb to hsl, hsl to hex, hsl to cmyk, oklch converter, color format converter online, css color formats"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Color Converter | ColorPeek', description: 'Convert any color between HEX, RGB, HSL, HSV, CMYK, and OKLCH instantly.', url: 'https://color-peek.com/color-converter', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'What color formats does the converter support?', acceptedAnswer: { '@type': 'Answer', text: 'The converter supports HEX, RGB, HSL, HSV, CMYK, and OKLCH — all common formats used in CSS, design tools, and print workflows.' } },
              { '@type': 'Question', name: 'What is OKLCH color?', acceptedAnswer: { '@type': 'Answer', text: 'OKLCH is a perceptually uniform color space defined in CSS Color Level 4. It represents colors using Lightness, Chroma, and Hue in a way that better matches human vision, making it ideal for generating accessible color scales.' } },
            ]},
          ],
        }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color <span className="gradient-text">Converter</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">Paste any color in any format and instantly get all other formats.</p>
        </motion.div>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Paste a color</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text" value={input} onChange={e => process(e.target.value)}
                placeholder="#6366f1  or  rgb(99,102,241)  or  hsl(239,84%,67%)"
                className={`glass-input w-full pr-4 ${error ? 'border-red-400/60' : ''}`}
              />
            </div>
            <input type="color" value={error ? '#000000' : hex} onChange={e => process(e.target.value)}
              className="w-11 h-11 rounded-xl border border-white/30 cursor-pointer bg-transparent p-0.5 flex-shrink-0"/>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => process(ex)}
                className="px-2.5 py-1 text-xs rounded-lg glass-button text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono">
                {ex}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Preview + formats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: error ? 0.4 : 1 }} transition={{ duration: 0.3 }}>
          {/* Swatch */}
          <div className="h-24 rounded-2xl mb-6 shadow-lg transition-colors duration-200" style={{ backgroundColor: error ? '#888' : hex }}/>

          {/* Format grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {formats.map(fmt => (
              <motion.div key={fmt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 flex items-center justify-between gap-3 border border-white/30 dark:border-white/8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-0.5">{fmt.label}</p>
                  <p className="text-sm font-mono text-[var(--text-primary)]">{fmt.value}</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => copy(fmt.value, fmt.id)}
                  className="glass-button px-3 py-1.5 text-xs font-semibold flex-shrink-0">
                  {copied === fmt.id ? '✓' : 'Copy'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Color Converter</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Paste or type any color value into the input field — HEX, RGB, HSL, or HSV all work.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>The tool auto-detects the format and instantly converts to all other color formats.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Click the Copy button next to any format row to copy that value to your clipboard.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>A live color swatch shows you the actual color as you type.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Use OKLCH values in modern CSS with <code className="text-indigo-400">color(oklch L C H)</code> syntax for wider color gamut support.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What are Color Formats?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">Different tools and workflows use different ways to represent the same color. HEX (<code className="text-indigo-400">#6366f1</code>) is the most common format in web development, expressing red, green, and blue channels as two-digit hexadecimal values. RGB (<code className="text-indigo-400">rgb(99, 102, 241)</code>) uses decimal 0–255 values and maps directly to screen hardware. HSL (<code className="text-indigo-400">hsl(239, 84%, 67%)</code>) describes color in terms of Hue (color angle), Saturation, and Lightness — much closer to how humans think about color, making it ideal for generating palettes programmatically. HSV (Hue, Saturation, Value) is used in many design tool color pickers. CMYK (Cyan, Magenta, Yellow, Key/Black) is the print industry standard. OKLCH is a modern perceptually-uniform format from CSS Color Level 4, great for accessible color system design.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the most common color format in CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">HEX is the most widely used CSS color format, followed by RGB and HSL. Modern CSS also supports OKLCH and color() for wide-gamut displays. All are valid CSS color values and render identically in browsers.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Why does CMYK not convert to exactly the same HEX value?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">CMYK is a subtractive color model for print, while HEX/RGB is additive for screens. The color gamuts don't perfectly overlap — some CMYK colors are outside the sRGB screen gamut, and some screen colors can't be reproduced in print. Conversions are approximations.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is the advantage of using HSL over HEX?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">HSL makes it easy to programmatically lighten or darken a color by changing just the L (lightness) value, or shift hues by adjusting H (hue). This is why CSS variables and design systems often store colors in HSL for dynamic theming.</p>
              </details>
            </div>
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center">
            Also explore: <a href="/tint-shade" className="text-indigo-500 hover:underline">Tint & Shade Generator</a> · <a href="/color-blindness" className="text-indigo-500 hover:underline">Color Blindness Simulator</a> · <a href="/palettes" className="text-indigo-500 hover:underline">Color Palettes</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ColorConverter;
