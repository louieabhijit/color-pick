import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorThief from 'colorthief';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
function luminance(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map(i => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Proxy candidates tried in order until one loads successfully
function proxyUrl(raw: string, attempt: number): string | null {
  const enc = encodeURIComponent(raw);
  const bare = raw.replace(/^https?:\/\//, '');
  switch (attempt) {
    case 0: return raw;                                              // direct (works if server has CORS headers)
    case 1: return `https://images.weserv.nl/?url=${bare}`;         // dedicated image proxy, very reliable
    case 2: return `https://wsrv.nl/?url=${bare}`;                  // same service, alt domain
    case 3: return `https://corsproxy.io/?${enc}`;                  // general CORS proxy
    case 4: return `https://api.allorigins.win/raw?url=${enc}`;     // last resort
    default: return null;
  }
}

const COLOR_COUNTS = [4, 6, 8, 10, 12, 16];

const SAMPLE_URLS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800',
];

const PaletteFromURL = () => {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState('');
  const [colorCount, setColorCount] = useState(8);
  const [colors, setColors] = useState<string[]>([]);
  const [previewSrc, setPreviewSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenImgRef = useRef<HTMLImageElement>(null);

  // Try each proxy in sequence until the image loads
  const tryLoadWithProxy = useCallback((rawUrl: string, attempt = 0) => {
    const src = proxyUrl(rawUrl, attempt);
    if (!src) {
      setError('Could not load the image through any proxy. Try downloading it and using the Upload tab instead.');
      setLoading(false);
      return;
    }

    const img = hiddenImgRef.current!;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Update preview to the working src
      setPreviewSrc(src);
      try {
        const ct = new ColorThief();
        const palette = ct.getPalette(img, colorCount) ?? [];
        setColors(palette.map(([r, g, b]) => rgbToHex(r, g, b)));
        setError('');
      } catch {
        setError('Could not extract colours - the image may be too small.');
      }
      setLoading(false);
    };

    img.onerror = () => {
      // Silently try the next proxy
      tryLoadWithProxy(rawUrl, attempt + 1);
    };

    img.src = src;
  }, [colorCount]);

  const handleURL = useCallback(() => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setColors([]);
    setSelected(new Set());
    setPreviewSrc('');
    tryLoadWithProxy(url.trim());
  }, [url, tryLoadWithProxy]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, WebP, etc.)');
      return;
    }
    setLoading(true);
    setError('');
    setColors([]);
    setSelected(new Set());
    const objectUrl = URL.createObjectURL(file);
    setPreviewSrc(objectUrl);
    tryLoadWithProxy(objectUrl);
  }, [tryLoadWithProxy]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const toggleSelect = (hex: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(hex) ? next.delete(hex) : next.add(hex);
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
        title="Extract Colors from Image - Palette from Image URL or Photo"
        description="Extract a color palette from any image URL or uploaded photo using ColorThief. Get up to 16 dominant colors, see them live, and export as CSS variables. Free image color extractor at ColorPeek."
        path="/palette-url"
        keywords="extract colors from image, color palette from image, image color extractor, palette from url, dominant color extractor, color picker from photo"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebApplication', name: 'Color Extractor from Image | ColorPeek', description: 'Extract dominant colors from any image URL or uploaded photo.', url: 'https://color-peek.com/palette-url', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
            { '@type': 'FAQPage', mainEntity: [
              { '@type': 'Question', name: 'How does the color extraction work?', acceptedAnswer: { '@type': 'Answer', text: 'The tool uses ColorThief, a library that analyzes the pixel data of an image using a median cut algorithm to identify the most dominant and visually distinct colors present in the image.' } },
              { '@type': 'Question', name: 'Can I upload my own image?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can upload an image from your device (JPEG, PNG, WebP, GIF) or paste a public image URL. Uploaded images are processed entirely in your browser and never sent to a server.' } },
            ]},
          ],
        }}
      />
      {/* Hidden img used by ColorThief - must be in DOM */}
      <img ref={hiddenImgRef} className="hidden" alt="" aria-hidden="true"/>
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Extract Colors <span className="gradient-text">from Website</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">
            Extract dominant colours from any image URL or uploaded photo using ColorThief.
          </p>
        </motion.div>

        {/* Input card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="glass-card p-6 mb-6">

          {/* Mode toggle */}
          <div className="flex gap-2 mb-5">
            {(['url', 'upload'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setColors([]); setError(''); setPreviewSrc(''); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${mode === m ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                {m === 'url' ? 'Image URL' : 'Upload Image'}
              </button>
            ))}
          </div>

          {mode === 'url' ? (
            <div className="space-y-3">
              <div className="flex gap-3">
                <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleURL()}
                  placeholder="https://example.com/photo.jpg"
                  className="glass-input flex-1 text-sm"/>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleURL} disabled={loading || !url.trim()}
                  className="glass-button-primary px-5 py-2.5 text-sm font-semibold disabled:opacity-50 whitespace-nowrap">
                  {loading ? 'Extracting…' : 'Extract'}
                </motion.button>
              </div>
              {/* Sample URLs */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] text-[var(--text-muted)] self-center">Try:</span>
                {SAMPLE_URLS.map((s, i) => (
                  <button key={i} onClick={() => { setUrl(s); }}
                    className="glass-button px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    Sample {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center gap-3 p-10 rounded-xl border-2 border-dashed cursor-pointer transition-all
                ${isDragging
                  ? 'border-indigo-400 bg-indigo-500/10'
                  : 'border-white/30 dark:border-white/10 hover:border-indigo-300/50 dark:hover:border-indigo-500/30'
                }`}>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden"/>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-[var(--text-secondary)]">Drop an image or click to browse</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">JPG, PNG, WebP, GIF supported</p>
              </div>
            </div>
          )}

          {/* Colour count */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/20 dark:border-white/8">
            <span className="text-xs text-[var(--text-muted)] flex-shrink-0">Colours to extract</span>
            <div className="flex gap-1.5 flex-wrap">
              {COLOR_COUNTS.map(n => (
                <button key={n} onClick={() => setColorCount(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all
                    ${colorCount === n ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {(colors.length > 0 || (loading && previewSrc)) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }} className="grid lg:grid-cols-5 gap-6">

              {/* Image preview */}
              <div className="lg:col-span-2 glass-card p-3 rounded-2xl">
                {previewSrc && (
                  <img src={previewSrc} alt="Source"
                    className="w-full h-56 object-cover rounded-xl"/>
                )}
                {colors.length > 0 && (
                  <div className="flex rounded-xl overflow-hidden mt-3 h-8">
                    {colors.map(hex => (
                      <div key={hex} className="flex-1" style={{ backgroundColor: hex }}/>
                    ))}
                  </div>
                )}
                {loading && (
                  <div className="flex items-center justify-center gap-2 mt-3 py-2">
                    <svg className="w-4 h-4 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <span className="text-xs text-[var(--text-muted)]">Analysing image…</span>
                  </div>
                )}
              </div>

              {/* Palette + export */}
              <div className="lg:col-span-3 flex flex-col gap-4">

                {colors.length > 0 && (
                  <>
                    {/* Swatch grid */}
                    <div className="glass-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-[var(--text-secondary)]">
                          {colors.length} colours extracted
                          {selected.size > 0 && ` · ${selected.size} selected`}
                        </p>
                        {selected.size > 0 && (
                          <button onClick={() => setSelected(new Set())}
                            className="glass-button px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {colors.map(hex => {
                          const lum = luminance(hex);
                          const isSelected = selected.has(hex);
                          return (
                            <motion.button key={hex} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              onClick={() => toggleSelect(hex)}
                              className="group relative flex flex-col items-center gap-1.5">
                              <div className="w-full h-14 rounded-xl shadow-md transition-all duration-200 relative"
                                style={{
                                  backgroundColor: hex,
                                  outline: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                                  outlineOffset: '2px',
                                }}>
                                {isSelected && (
                                  <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                      stroke={lum > 0.35 ? '#000' : '#fff'}>
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <span className="text-[9px] font-mono text-[var(--text-muted)]">{hex}</span>
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
                      <pre className="glass-card p-3 rounded-xl text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-40 overflow-y-auto mb-4">
                        {`:root {\n${cssVars}\n}`}
                      </pre>

                      <div className="grid sm:grid-cols-2 gap-2">
                        {palette.map(hex => (
                          <div key={hex} className="flex items-center gap-2.5 p-2 rounded-lg glass-card border border-white/20 dark:border-white/8">
                            <div className="w-6 h-6 rounded-lg flex-shrink-0 shadow-sm" style={{ backgroundColor: hex }}/>
                            <span className="text-xs font-mono text-[var(--text-primary)] flex-1">{hex}</span>
                            <button onClick={() => copy(hex, hex)}
                              className="text-[10px] glass-button px-2 py-0.5 font-medium">
                              {copied === hex ? '✓' : 'Copy'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {colors.length === 0 && !loading && !error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="glass-card p-12 rounded-2xl text-center border border-dashed border-white/30 dark:border-white/10">
            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-indigo-300/50 dark:border-indigo-600/40
                            flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">No palette yet</p>
            <p className="text-xs text-[var(--text-muted)]">Paste an image URL or upload a photo to extract its colours</p>
          </motion.div>
        )}

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Extract Colors from an Image</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Click the Device tab to upload an image from your computer, or the URL tab to paste a public image link.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>The tool analyzes the image and extracts up to 16 dominant colors using the ColorThief algorithm.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>View the extracted palette in a live swatch grid alongside the image preview.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Click any color swatch to copy its HEX code to your clipboard.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Export the full palette as CSS custom properties for use in your project.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is Color Extraction?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">Color extraction (or color quantization) is the process of algorithmically identifying the most visually prominent colors in an image. This tool uses ColorThief, which applies a median cut algorithm to the image's pixel data. It divides the color space repeatedly, cutting the dimension with the greatest range each time, until it has isolated the requested number of color clusters. The representative color of each cluster - its median - becomes a palette swatch. This technique is widely used by designers to derive color palettes from photography, artwork, brand imagery, and nature. Instead of manually sampling colors with an eyedropper, you get a mathematically derived set of dominant hues that represent the image's true visual palette. These palettes can then be used as the basis for brand color systems, mood boards, and design tokens.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Why does the URL extraction sometimes fail?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Some image URLs block cross-origin requests (CORS). The tool uses a fallback chain of CORS proxy services to bypass this. If all proxies fail, try downloading the image and uploading it directly from your device instead.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Is my uploaded image stored anywhere?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">No. Images uploaded from your device are processed entirely in your browser using the File API and Canvas. No image data is ever sent to any server. URL-based images are fetched through proxy services solely for CORS access, but not stored.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How many colors can I extract?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">The tool extracts up to 16 dominant colors by default. For most images, 6–10 colors capture the key palette. Extracting more colors surfaces subtle hues; extracting fewer shows only the broadest dominant tones.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/palettes','/palette-exporter','/color-converter']} />
        </div>
      </main>
    </div>
  );
};

export default PaletteFromURL;
