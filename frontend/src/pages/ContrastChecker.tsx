import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function toHSL(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'N/A';
  const [r, g, b] = rgb.map(v => v / 255);
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
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg), l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function suggestColor(fg: string, bg: string, targetRatio = 4.5): string {
  const bgLum = luminance(bg);
  const targetLum = bgLum > 0.5
    ? (bgLum + 0.05) / targetRatio - 0.05
    : (bgLum + 0.05) * targetRatio - 0.05;
  const clamped = Math.max(0, Math.min(1, targetLum));
  const linearToSRGB = (c: number) => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  const v = Math.round(linearToSRGB(clamped) * 255);
  return rgbToHex(v, v, v);
}

const PRESETS = [
  { label: 'Black', value: '#000000' },
  { label: 'Dark', value: '#333333' },
  { label: 'Gray', value: '#666666' },
  { label: 'Light', value: '#999999' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Indigo', value: '#6366f1' },
];

const Badge = ({ label, ratio, min }: { label: string; ratio: number; min: number }) => {
  const pass = ratio >= min;
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${pass ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30' : 'bg-red-500/12 text-red-600 dark:text-red-400 border border-red-400/30'}`}>
      <span className="text-base">{pass ? '✓' : '✗'}</span>
      <span>{label}</span>
      <span className="ml-auto text-xs opacity-70">{min}:1</span>
    </div>
  );
};

const ContrastChecker = () => {
  const [fg, setFg] = useState('#1a1a2e');
  const [bg, setBg] = useState('#ffffff');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const params = new URLSearchParams(hash);
    const fgParam = params.get('fg');
    const bgParam = params.get('bg');
    if (fgParam) setFg('#' + fgParam);
    if (bgParam) setBg('#' + bgParam);
  }, []);

  const updateURL = useCallback((newFg: string, newBg: string) => {
    const hash = `fg=${newFg.replace('#', '')}&bg=${newBg.replace('#', '')}`;
    window.history.replaceState(null, '', `#${hash}`);
  }, []);

  const handleFg = (v: string) => { setFg(v); updateURL(v, bg); };
  const handleBg = (v: string) => { setBg(v); updateURL(fg, v); };
  const swap = () => { setFg(bg); setBg(fg); updateURL(bg, fg); };

  const ratio = contrastRatio(fg, bg);
  const ratioStr = ratio.toFixed(2) + ':1';
  const suggested = ratio < 4.5 ? suggestColor(fg, bg, 4.5) : null;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  };

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Contrast Checker — WCAG AA & AAA Compliance"
        description="Check color contrast ratios for WCAG 2.1 accessibility compliance. Test text and background color combinations for AA and AAA standards. Free online tool."
        path="/contrast-checker"
        keywords="color contrast checker, wcag contrast ratio, accessibility contrast, aa aaa compliance, text background contrast"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Color Contrast Checker | ColorPeek', description: 'Check WCAG color contrast ratios.', url: 'https://color-peek.com/contrast-checker', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Accessibility Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color Contrast <span className="gradient-text">Checker</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">Test foreground/background combinations against WCAG 2.1 AA and AAA standards.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            {/* Foreground */}
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Foreground (Text)</p>
              <div className="flex items-center gap-3 mb-3">
                <input type="color" value={fg} onChange={e => handleFg(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5 flex-shrink-0"/>
                <input type="text" value={fg} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) handleFg(e.target.value); }}
                  className="glass-input flex-1 font-mono text-sm uppercase" placeholder="#000000"/>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(fg, 'fg')}
                  className="glass-button px-3 py-1.5 text-xs font-semibold flex-shrink-0">
                  {copied === 'fg' ? '✓' : 'Copy'}
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map(p => (
                  <button key={p.value} onClick={() => handleFg(p.value)}
                    className="w-6 h-6 rounded-lg border-2 border-white/30 hover:scale-110 transition-transform"
                    style={{ backgroundColor: p.value }} title={p.label}/>
                ))}
              </div>
              {fgRgb && <p className="text-xs text-[var(--text-muted)] mt-2">rgb({fgRgb.join(', ')}) · {toHSL(fg)}</p>}
            </div>

            {/* Swap */}
            <div className="flex justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={swap}
                className="glass-button px-5 py-2 text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
                Swap Colors
              </motion.button>
            </div>

            {/* Background */}
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Background</p>
              <div className="flex items-center gap-3 mb-3">
                <input type="color" value={bg} onChange={e => handleBg(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5 flex-shrink-0"/>
                <input type="text" value={bg} onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) handleBg(e.target.value); }}
                  className="glass-input flex-1 font-mono text-sm uppercase" placeholder="#FFFFFF"/>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(bg, 'bg')}
                  className="glass-button px-3 py-1.5 text-xs font-semibold flex-shrink-0">
                  {copied === 'bg' ? '✓' : 'Copy'}
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map(p => (
                  <button key={p.value} onClick={() => handleBg(p.value)}
                    className="w-6 h-6 rounded-lg border-2 border-white/30 hover:scale-110 transition-transform"
                    style={{ backgroundColor: p.value }} title={p.label}/>
                ))}
              </div>
              {bgRgb && <p className="text-xs text-[var(--text-muted)] mt-2">rgb({bgRgb.join(', ')}) · {toHSL(bg)}</p>}
            </div>

            {/* Share */}
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(window.location.href, 'url')}
              className="w-full glass-button py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              {copied === 'url' ? '✓ Link Copied!' : 'Copy Shareable Link'}
            </motion.button>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            {/* Ratio */}
            <div className="glass-card p-6 rounded-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Contrast Ratio</p>
              <p className="text-6xl font-bold text-[var(--text-primary)] mb-1">{ratioStr}</p>
              <p className="text-sm text-[var(--text-muted)]">
                {ratio >= 7 ? 'AAA — Excellent' : ratio >= 4.5 ? 'AA — Good' : ratio >= 3 ? 'AA Large — Marginal' : 'Fails WCAG'}
              </p>
            </div>

            {/* Badges */}
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">WCAG 2.1 Compliance</p>
              <div className="space-y-2">
                <Badge label="AA Normal Text" ratio={ratio} min={4.5}/>
                <Badge label="AA Large Text (18pt+)" ratio={ratio} min={3}/>
                <Badge label="AAA Normal Text" ratio={ratio} min={7}/>
                <Badge label="AAA Large Text" ratio={ratio} min={4.5}/>
                <Badge label="AA UI Components" ratio={ratio} min={3}/>
              </div>
            </div>

            {/* Suggestion */}
            {suggested && (
              <div className="glass-card p-4 rounded-2xl border border-amber-400/30 bg-amber-500/5">
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2">Suggested AA-passing color</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-white/20 flex-shrink-0" style={{ backgroundColor: suggested }}/>
                  <span className="font-mono text-sm text-[var(--text-primary)]">{suggested}</span>
                  <span className="text-xs text-[var(--text-muted)]">(ratio: {contrastRatio(suggested, bg).toFixed(2)}:1)</span>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => { handleFg(suggested); }} className="ml-auto glass-button px-3 py-1.5 text-xs">Use</motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Live Preview */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 glass-card p-6 rounded-2xl">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Live Preview</p>
          <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: bg }}>
            <p className="text-2xl font-bold leading-tight" style={{ color: fg }}>Large Heading Text (18pt Bold)</p>
            <p className="text-base leading-relaxed" style={{ color: fg }}>
              Normal body text at 16px. The quick brown fox jumps over the lazy dog.
              Good typography ensures readability for all users.
            </p>
            <p className="text-sm" style={{ color: fg }}>Small text at 14px — used for captions, labels, and secondary content.</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ backgroundColor: fg, color: bg }}>Primary Button</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: fg, color: fg, backgroundColor: 'transparent' }}>Outline Button</button>
              <span className="px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: fg, color: fg }}>Badge</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto space-y-8">
          <RelatedTools tools={['/color-blindness', '/color-converter', '/palettes']} />
        </div>
      </main>
    </div>
  );
};

export default ContrastChecker;
