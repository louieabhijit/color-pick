import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

// ── Color blindness matrices ──────────────────────────────────────────────────
// Each row: [rR, rG, rB,  gR, gG, gB,  bR, bG, bB]

const MATRICES: Record<string, [number, number, number, number, number, number, number, number, number]> = {
  normal:        [1,     0,     0,     0,     1,     0,     0,     0,     1    ],
  protanopia:    [0.567, 0.433, 0,     0.558, 0.442, 0,     0,     0.242, 0.758],
  deuteranopia:  [0.625, 0.375, 0,     0.700, 0.300, 0,     0,     0.300, 0.700],
  tritanopia:    [0.950, 0.050, 0,     0,     0.433, 0.567, 0,     0.475, 0.525],
  protanomaly:   [0.817, 0.183, 0,     0.333, 0.667, 0,     0,     0.125, 0.875],
  deuteranomaly: [0.800, 0.200, 0,     0.258, 0.742, 0,     0,     0.142, 0.858],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
};

interface SimType {
  key: string;
  label: string;
  prevalence: string;
  description: string;
  icon: string;
}

const SIM_TYPES: SimType[] = [
  { key: 'normal',        label: 'Normal Vision',        prevalence: 'Baseline',   icon: '👁️', description: 'Full color perception with all three cone types functioning normally.' },
  { key: 'deuteranomaly', label: 'Deuteranomaly',        prevalence: '~5% of men', icon: '🟢', description: 'Most common — reduced sensitivity to green light. Red and green hues are harder to distinguish.' },
  { key: 'protanomaly',   label: 'Protanomaly',          prevalence: '~1% of men', icon: '🔴', description: 'Reduced sensitivity to red light. Reds appear darker and less vivid.' },
  { key: 'deuteranopia',  label: 'Deuteranopia',         prevalence: '~1% of men', icon: '🫧', description: 'No green cones. Red and green are indistinguishable — appear as shades of yellow/brown.' },
  { key: 'protanopia',    label: 'Protanopia',           prevalence: '~1% of men', icon: '🧡', description: 'No red cones. Red appears black; orange, yellow, green all look similar.' },
  { key: 'tritanopia',    label: 'Tritanopia',           prevalence: '<0.01%',     icon: '🔵', description: 'No blue cones. Blue and green are confused; yellow and violet look similar.' },
  { key: 'achromatopsia', label: 'Achromatopsia',        prevalence: '~0.003%',    icon: '⬜', description: 'Complete color blindness — the world appears only in shades of grey.' },
];

// ── Color utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, '0'))
    .join('');
}

function simulate(hex: string, type: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const m = MATRICES[type];
  if (!m) return hex;
  const [r, g, b] = rgb;
  return rgbToHex(
    m[0] * r + m[1] * g + m[2] * b,
    m[3] * r + m[4] * g + m[5] * b,
    m[6] * r + m[7] * g + m[8] * b,
  );
}

function luminance(r: number, g: number, b: number): number {
  return [r, g, b].reduce((acc, v, i) => {
    const c = v / 255;
    return acc + (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)) * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}

function textOnBg(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000';
  return luminance(...rgb) > 0.179 ? '#1f2937' : '#f9fafb';
}

// ── Default palette ──────────────────────────────────────────────────────────

const DEFAULT_PALETTE = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

// ── Sub-components ───────────────────────────────────────────────────────────

interface SwatchProps {
  hex: string;
  simType: string;
  size?: 'sm' | 'md';
}

const Swatch = ({ hex, simType, size = 'md' }: SwatchProps) => {
  const simHex = simulate(hex, simType);
  const h = size === 'md' ? 'h-12' : 'h-8';
  return (
    <div
      className={`${h} rounded-xl transition-colors duration-300 relative group`}
      style={{ backgroundColor: simHex }}
      title={simHex}
    >
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        <span className="text-[10px] font-mono text-white font-semibold">{simHex}</span>
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const ColorBlindnessSimulator = () => {
  const [palette, setPalette] = useState<string[]>(DEFAULT_PALETTE);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const updateColor = useCallback((idx: number, hex: string) => {
    const h = hex.startsWith('#') ? hex : `#${hex}`;
    if (/^#[0-9a-fA-F]{6}$/.test(h)) {
      setPalette(prev => prev.map((c, i) => i === idx ? h : c));
    }
  }, []);

  const copyPalette = () => {
    navigator.clipboard.writeText(palette.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Blindness Simulator"
        description="Simulate how your colour palette appears to people with deuteranopia, protanopia, tritanopia and 4 more vision types. Uses accurate RGB matrix transforms for WCAG-compliant accessible design."
        path="/color-blindness"
        keywords="color blindness simulator, deuteranopia, protanopia, tritanopia, color vision deficiency, wcag accessibility, color accessibility checker"
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center mb-12"
        >
          <span className="section-label mb-4 inline-block">Accessibility Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-[var(--text-primary)]">
            Color Blindness <span className="gradient-text">Simulator</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            See how your palette looks to the{' '}
            <strong className="text-[var(--text-primary)]">~300 million people</strong>{' '}
            worldwide with color vision deficiency. Click any swatch to edit its color.
          </p>
        </motion.div>

        {/* Palette editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Your Palette</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setPalette(DEFAULT_PALETTE)}
                className="glass-button px-3 py-1.5 text-xs font-medium"
              >
                Reset
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={copyPalette}
                className="glass-button px-3 py-1.5 text-xs font-medium"
              >
                {copied ? '✓ Copied' : 'Copy Hex'}
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {palette.map((color, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <motion.div
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-14 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  style={{ backgroundColor: color }}
                  onClick={() => setEditingIdx(editingIdx === idx ? null : idx)}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </motion.div>

                {/* Inline color picker */}
                {editingIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-1"
                  >
                    <input
                      type="color"
                      value={color}
                      onChange={e => updateColor(idx, e.target.value)}
                      className="w-full h-8 rounded-lg border border-white/20 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={e => updateColor(idx, e.target.value)}
                      className="glass-input text-[10px] font-mono text-center p-1"
                    />
                  </motion.div>
                )}

                <p className="text-[10px] font-mono text-center text-[var(--text-muted)] truncate">{color}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Simulation grid */}
        <div className="space-y-4">
          {SIM_TYPES.map((sim, i) => (
            <motion.div
              key={sim.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`glass-card p-5 border ${
                sim.key === 'normal'
                  ? 'border-indigo-300/40 dark:border-indigo-500/30'
                  : 'border-white/40 dark:border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Label */}
                <div className="sm:w-52 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{sim.icon}</span>
                    <span className="font-semibold text-sm text-[var(--text-primary)]">{sim.label}</span>
                    {sim.key === 'normal' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                        Reference
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{sim.description}</p>
                  <p className="text-[11px] font-semibold text-indigo-500 dark:text-indigo-400 mt-1">
                    {sim.prevalence}
                  </p>
                </div>

                {/* Swatches */}
                <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${palette.length}, 1fr)` }}>
                  {palette.map((color, idx) => (
                    <Swatch key={idx} hex={color} simType={sim.key} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6 mt-8"
        >
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span>💡</span> Design Tips for Color Accessibility
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { tip: 'Never rely on color alone', desc: 'Use icons, patterns, or labels alongside color to convey information.' },
              { tip: 'Aim for 4.5:1 contrast ratio', desc: 'WCAG AA requires at least 4.5:1 for normal text. Use our Contrast Checker.' },
              { tip: 'Test with real tools', desc: 'Use a browser accessibility extension or OS accessibility settings to validate.' },
              { tip: 'Avoid red–green pairs', desc: 'These are the most common confusion — use blue–orange as a safe alternative.' },
              { tip: 'Add texture or pattern fills', desc: 'In charts and graphs, combine color with distinct patterns for clarity.' },
              { tip: 'Use sufficient saturation', desc: 'High-contrast palettes with good lightness variation work for most users.' },
            ].map(({ tip, desc }) => (
              <div key={tip} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{tip}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default ColorBlindnessSimulator;
