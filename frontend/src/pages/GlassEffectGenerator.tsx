import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
}

const BG_PRESETS = [
  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
  'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
  'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
  'linear-gradient(160deg, #ede9fe 0%, #e0e7ff 40%, #fce7f3 100%)',
  'radial-gradient(ellipse at 30% 30%, #6366f1 0%, #1e1b4b 100%)',
];

const GlassEffectGenerator = () => {
  const [blur, setBlur] = useState(12);
  const [bgOpacity, setBgOpacity] = useState(18);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [shadow, setShadow] = useState(true);
  const [saturation, setSaturation] = useState(180);
  const [bgPreset, setBgPreset] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const [br, bg_g, bb] = hexToRgb(bgColor);
  const [bor, bog, bob] = hexToRgb(borderColor);

  const glassStyle = {
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    backgroundColor: `rgba(${br},${bg_g},${bb},${(bgOpacity / 100).toFixed(2)})`,
    border: `1px solid rgba(${bor},${bog},${bob},${(borderOpacity / 100).toFixed(2)})`,
    ...(shadow ? { boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)` } : {}),
  };

  const cssOutput = `.glass {
  backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
  background-color: rgba(${br}, ${bg_g}, ${bb}, ${(bgOpacity / 100).toFixed(2)});
  border: 1px solid rgba(${bor}, ${bog}, ${bob}, ${(borderOpacity / 100).toFixed(2)});${shadow ? `
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);` : ''}
}`;

  const copy = (text: string, id: string) => { navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 1800); };

  const Slider = ({ label, value, min = 0, max, onChange }: { label: string; value: number; min?: number; max: number; onChange: (v: number) => void }) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--text-muted)] w-24 flex-shrink-0">{label}</span>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)} className="flex-1 accent-indigo-500"/>
      <span className="text-xs font-mono text-[var(--text-primary)] w-10 text-right">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      <Helmet><title>Glass Effect Generator | ColorPeek</title></Helmet>
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Glass Effect <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Build glassmorphism panels with live preview — <code className="text-indigo-500">backdrop-filter</code> + <code className="text-indigo-500">rgba</code>.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="flex flex-col gap-4">
            {/* BG presets */}
            <div className="flex gap-2 flex-wrap">
              {BG_PRESETS.map((bg, i) => (
                <button key={i} onClick={() => setBgPreset(i)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${bgPreset === i ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ background: bg }}/>
              ))}
            </div>
            {/* Live preview */}
            <div className="relative rounded-2xl overflow-hidden h-72 flex items-center justify-center"
              style={{ background: BG_PRESETS[bgPreset] }}>
              <div className="rounded-2xl p-6 w-56 transition-all duration-300" style={glassStyle}>
                <div className="w-8 h-8 rounded-full bg-white/30 mb-3"/>
                <div className="h-3 bg-white/40 rounded mb-2 w-24"/>
                <div className="h-2 bg-white/25 rounded mb-1.5 w-32"/>
                <div className="h-2 bg-white/25 rounded w-20"/>
              </div>
            </div>
            {/* CSS */}
            <div className="relative">
              <pre className="glass-card p-4 rounded-xl text-xs font-mono text-[var(--text-secondary)] whitespace-pre pr-20 overflow-x-auto">{cssOutput}</pre>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => copy(cssOutput, 'css')}
                className="absolute top-3 right-3 glass-button px-3 py-1.5 text-xs font-semibold">
                {copied === 'css' ? '✓ Copied' : 'Copy CSS'}
              </motion.button>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="glass-card p-6 space-y-5">
            <p className="text-sm font-semibold text-[var(--text-secondary)]">Controls</p>
            <Slider label="Blur" value={blur} max={40} onChange={setBlur}/>
            <Slider label="Saturation %" value={saturation} min={100} max={300} onChange={setSaturation}/>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)] w-24">BG Color</span>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                className="w-9 h-9 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
              <span className="text-xs font-mono text-[var(--text-muted)]">{bgColor}</span>
            </div>
            <Slider label="BG Opacity %" value={bgOpacity} max={80} onChange={setBgOpacity}/>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)] w-24">Border Color</span>
              <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)}
                className="w-9 h-9 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5"/>
            </div>
            <Slider label="Border Opacity %" value={borderOpacity} max={80} onChange={setBorderOpacity}/>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-[var(--text-muted)] w-24">Box Shadow</span>
              <button onClick={() => setShadow(!shadow)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${shadow ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                {shadow ? 'On' : 'Off'}
              </button>
            </div>

            {/* Quick copy buttons */}
            <div className="pt-3 border-t border-white/20 dark:border-white/8 grid grid-cols-2 gap-2">
              {[
                { label: 'backdrop-filter', val: `backdrop-filter: blur(${blur}px) saturate(${saturation}%);` },
                { label: 'background-color', val: `background-color: rgba(${br}, ${bg_g}, ${bb}, ${(bgOpacity / 100).toFixed(2)});` },
              ].map(({ label, val }) => (
                <button key={label} onClick={() => copy(val, label)}
                  className="glass-button px-3 py-2 text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-xl text-left truncate">
                  {copied === label ? '✓ Copied' : label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default GlassEffectGenerator;
