import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

const HEX_RE = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const RGB_RE = /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/gi;
const HSL_RE = /hsl\s*\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/gi;

function expandHex3(h: string) {
  if (h.length === 3) return h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return h;
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => Math.min(255, Math.max(0, v)).toString(16).padStart(2, '0')).join('');
}
function hslToHex(h: number, s: number, l: number) {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255); return rgbToHex(v, v, v); }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue = (t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return rgbToHex(Math.round(hue(hn + 1/3) * 255), Math.round(hue(hn) * 255), Math.round(hue(hn - 1/3) * 255));
}

function extractColors(text: string): string[] {
  const found = new Set<string>();

  // HEX
  let m: RegExpExecArray | null;
  const hexRe = new RegExp(HEX_RE.source, 'gi');
  while ((m = hexRe.exec(text))) {
    const h = '#' + expandHex3(m[1]).toLowerCase();
    if (h !== '#000000' && h !== '#ffffff' && h !== '#fff' && h !== '#000') found.add(h);
  }

  // RGB
  const rgbRe = new RegExp(RGB_RE.source, 'gi');
  while ((m = rgbRe.exec(text))) {
    const hex = rgbToHex(+m[1], +m[2], +m[3]);
    if (hex !== '#000000' && hex !== '#ffffff') found.add(hex);
  }

  // HSL
  const hslRe = new RegExp(HSL_RE.source, 'gi');
  while ((m = hslRe.exec(text))) {
    const hex = hslToHex(+m[1], +m[2], +m[3]);
    if (hex !== '#000000' && hex !== '#ffffff') found.add(hex);
  }

  return [...found].slice(0, 64);
}

function luminance(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const PROXY = 'https://api.allorigins.win/get?url=';
const SAMPLE_CSS = `/* Paste your CSS here */
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #ec4899;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --bg: #f8fafc;
  --text: #1e293b;
}
.button {
  background-color: rgb(99, 102, 241);
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #fff;
}
.card {
  background: hsl(220, 14%, 96%);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}`;

const PaletteFromURL = () => {
  const [url, setUrl] = useState('');
  const [cssInput, setCssInput] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'url' | 'css'>('css');
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const extractFromCSS = useCallback(() => {
    const found = extractColors(cssInput);
    setColors(found);
    setError(found.length === 0 ? 'No colors found in the pasted content.' : '');
  }, [cssInput]);

  const fetchFromURL = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${PROXY}${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      const found = extractColors(data.contents ?? '');
      setColors(found);
      if (found.length === 0) setError('No colors found at that URL. Try pasting the CSS instead.');
    } catch {
      setError('Could not fetch the URL (CORS or network). Paste the CSS/HTML directly below.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  const toggleSelect = (hex: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(hex)) next.delete(hex); else next.add(hex);
      return next;
    });
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const palette = selected.size > 0 ? [...selected] : colors;
  const cssVars = palette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n');

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Palette from URL"
        description="Extract every color from any website URL or pasted CSS and HTML. Automatically finds HEX, RGB, and HSL values, deduplicates them, and lets you export the result as CSS variables."
        path="/palette-url"
        keywords="extract colors from website, palette from url, css color extractor, website color palette, color scraper, extract hex from css"
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Palette <span className="gradient-text">from URL</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">Extract all color values from a website URL or paste CSS/HTML directly.</p>
        </motion.div>

        {/* Mode tabs */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="glass-card p-6 mb-6">
          <div className="flex gap-2 mb-5">
            {(['url', 'css'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setColors([]); setError(''); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${mode === m ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                {m === 'url' ? 'Website URL' : 'Paste CSS / HTML'}
              </button>
            ))}
          </div>

          {mode === 'url' ? (
            <div className="flex gap-3">
              <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchFromURL()}
                placeholder="https://example.com"
                className="glass-input flex-1 text-sm"/>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={fetchFromURL} disabled={loading || !url.trim()}
                className="glass-button-primary px-5 py-2.5 text-sm font-semibold disabled:opacity-50">
                {loading ? 'Fetching…' : 'Extract'}
              </motion.button>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea value={cssInput} onChange={e => setCssInput(e.target.value)}
                rows={8}
                placeholder={SAMPLE_CSS}
                className="glass-input w-full text-xs font-mono resize-y min-h-[160px]"/>
              <div className="flex justify-between items-center">
                <button onClick={() => setCssInput(SAMPLE_CSS)}
                  className="glass-button px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
                  Load example
                </button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={extractFromCSS} disabled={!cssInput.trim()}
                  className="glass-button-primary px-5 py-2 text-sm font-semibold disabled:opacity-50">
                  Extract Colors
                </motion.button>
              </div>
            </div>
          )}

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {colors.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }} className="space-y-4">

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {colors.length} colors found {selected.size > 0 && `· ${selected.size} selected`}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(new Set())} className="glass-button px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
                    Clear selection
                  </button>
                </div>
              </div>

              {/* Color swatches */}
              <div className="glass-card p-4">
                <div className="flex flex-wrap gap-3">
                  {colors.map(hex => {
                    const lum = luminance(hex);
                    const isSelected = selected.has(hex);
                    return (
                      <motion.button key={hex} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                        onClick={() => toggleSelect(hex)}
                        className="relative group flex flex-col items-center gap-1.5">
                        <div className="w-12 h-12 rounded-xl shadow-md transition-all duration-200"
                          style={{
                            backgroundColor: hex,
                            outline: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                            outlineOffset: '2px',
                          }}>
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={lum > 0.3 ? '#000' : '#fff'}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] font-mono text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                          {hex}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Export */}
              <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    Export {selected.size > 0 ? 'selected' : 'all'} as CSS variables
                  </p>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => copy(`:root {\n${cssVars}\n}`, 'css')}
                    className="glass-button px-3 py-1.5 text-xs font-semibold">
                    {copied === 'css' ? '✓ Copied' : 'Copy CSS'}
                  </motion.button>
                </div>
                <pre className="glass-card p-3 rounded-xl text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-48 overflow-y-auto">
                  {`:root {\n${cssVars}\n}`}
                </pre>

                {/* Color list with copy */}
                <div className="mt-4 grid sm:grid-cols-2 gap-2">
                  {palette.slice(0, 20).map(hex => (
                    <div key={hex} className="flex items-center gap-2.5 p-2 rounded-lg glass-card border border-white/20 dark:border-white/8">
                      <div className="w-6 h-6 rounded-lg flex-shrink-0" style={{ backgroundColor: hex }}/>
                      <span className="text-xs font-mono text-[var(--text-primary)] flex-1">{hex}</span>
                      <button onClick={() => copy(hex, hex)}
                        className="text-[10px] glass-button px-2 py-0.5 font-medium">
                        {copied === hex ? '✓' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {colors.length === 0 && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="glass-card p-12 rounded-2xl text-center border border-dashed border-white/30 dark:border-white/10">
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-indigo-300/50 dark:border-indigo-600/40 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No colors extracted yet</p>
            <p className="text-xs text-[var(--text-muted)]">Enter a URL or paste CSS/HTML to get started</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PaletteFromURL;
