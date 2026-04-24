import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';
import toast from 'react-hot-toast';

// ── Curated gradient data ─────────────────────────────────────────────────────

interface Gradient {
  id: string;
  name: string;
  css: string;       // full CSS background value
  colors: string[];  // hex stops for swatch display
  category: string;
}

const GRADIENT_DATA: Omit<Gradient, 'id'>[] = [
  // Vibrant
  { name: 'Aurora',       colors: ['#6366f1','#8b5cf6','#ec4899'], css: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)', category: 'vibrant' },
  { name: 'Candy',        colors: ['#f43f5e','#a855f7'],            css: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 100%)',             category: 'vibrant' },
  { name: 'Neon Burst',   colors: ['#22d3ee','#a855f7','#f59e0b'], css: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #f59e0b 100%)', category: 'vibrant' },
  { name: 'Tropical',     colors: ['#10b981','#3b82f6'],            css: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',             category: 'vibrant' },
  { name: 'Citrus',       colors: ['#f97316','#eab308'],            css: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',             category: 'vibrant' },
  { name: 'Electric',     colors: ['#06b6d4','#6366f1'],            css: 'linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)',             category: 'vibrant' },
  { name: 'Watermelon',   colors: ['#f43f5e','#fb923c'],            css: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',             category: 'vibrant' },
  { name: 'Cosmic Berry', colors: ['#7c3aed','#db2777'],            css: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',             category: 'vibrant' },
  { name: 'Lime Punch',   colors: ['#84cc16','#06b6d4'],            css: 'linear-gradient(135deg, #84cc16 0%, #06b6d4 100%)',             category: 'vibrant' },
  { name: 'Flamingo',     colors: ['#ec4899','#f97316'],            css: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',             category: 'vibrant' },
  { name: 'Ocean Fire',   colors: ['#0ea5e9','#f43f5e'],            css: 'linear-gradient(135deg, #0ea5e9 0%, #f43f5e 100%)',             category: 'vibrant' },
  { name: 'Plasma',       colors: ['#8b5cf6','#f43f5e','#f97316'],  css: 'linear-gradient(135deg, #8b5cf6 0%, #f43f5e 50%, #f97316 100%)', category: 'vibrant' },

  // Pastel / Subtle
  { name: 'Cotton Candy', colors: ['#fbcfe8','#c7d2fe'],            css: 'linear-gradient(135deg, #fbcfe8 0%, #c7d2fe 100%)',             category: 'subtle' },
  { name: 'Lavender Mist',colors: ['#ede9fe','#dbeafe'],            css: 'linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)',             category: 'subtle' },
  { name: 'Peach Bliss',  colors: ['#fed7aa','#fde68a'],            css: 'linear-gradient(135deg, #fed7aa 0%, #fde68a 100%)',             category: 'subtle' },
  { name: 'Mint Cream',   colors: ['#d1fae5','#bfdbfe'],            css: 'linear-gradient(135deg, #d1fae5 0%, #bfdbfe 100%)',             category: 'subtle' },
  { name: 'Rose Quartz',  colors: ['#fce7f3','#ede9fe'],            css: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',             category: 'subtle' },
  { name: 'Baby Blue',    colors: ['#bfdbfe','#c7d2fe'],            css: 'linear-gradient(135deg, #bfdbfe 0%, #c7d2fe 100%)',             category: 'subtle' },
  { name: 'Buttercup',    colors: ['#fef9c3','#fde68a'],            css: 'linear-gradient(135deg, #fef9c3 0%, #fde68a 100%)',             category: 'subtle' },
  { name: 'Sakura',       colors: ['#fda4af','#c4b5fd'],            css: 'linear-gradient(135deg, #fda4af 0%, #c4b5fd 100%)',             category: 'subtle' },
  { name: 'Morning Dew',  colors: ['#cffafe','#d1fae5'],            css: 'linear-gradient(135deg, #cffafe 0%, #d1fae5 100%)',             category: 'subtle' },
  { name: 'Blush',        colors: ['#fecdd3','#fde8d8'],            css: 'linear-gradient(135deg, #fecdd3 0%, #fde8d8 100%)',             category: 'subtle' },

  // Dark
  { name: 'Midnight',     colors: ['#0f172a','#1e1b4b'],            css: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',             category: 'dark' },
  { name: 'Obsidian',     colors: ['#111827','#1f2937'],            css: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',             category: 'dark' },
  { name: 'Night Sky',    colors: ['#0c0a1a','#1e1b4b','#4c1d95'], css: 'linear-gradient(135deg, #0c0a1a 0%, #1e1b4b 50%, #4c1d95 100%)', category: 'dark' },
  { name: 'Charcoal Glow',colors: ['#18181b','#3f3f46'],            css: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',             category: 'dark' },
  { name: 'Deep Space',   colors: ['#020617','#0c0a1a','#1e1b4b'], css: 'linear-gradient(135deg, #020617 0%, #0c0a1a 50%, #1e1b4b 100%)', category: 'dark' },
  { name: 'Abyss',        colors: ['#000000','#1e293b'],            css: 'linear-gradient(135deg, #000000 0%, #1e293b 100%)',             category: 'dark' },
  { name: 'Midnight Rose',colors: ['#1c0513','#3b0764'],            css: 'linear-gradient(135deg, #1c0513 0%, #3b0764 100%)',             category: 'dark' },
  { name: 'Storm',        colors: ['#1e293b','#334155'],            css: 'linear-gradient(160deg, #1e293b 0%, #334155 100%)',             category: 'dark' },
  { name: 'Dark Forest',  colors: ['#052e16','#14532d'],            css: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)',             category: 'dark' },
  { name: 'Void',         colors: ['#030712','#4c1d95'],            css: 'linear-gradient(135deg, #030712 0%, #4c1d95 100%)',             category: 'dark' },

  // Ocean / Blue
  { name: 'Ocean Depth',  colors: ['#0284c7','#0c4a6e'],            css: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',             category: 'ocean' },
  { name: 'Aegean',       colors: ['#0ea5e9','#1e40af'],            css: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)',             category: 'ocean' },
  { name: 'Tidal Wave',   colors: ['#22d3ee','#0ea5e9','#2563eb'], css: 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%)', category: 'ocean' },
  { name: 'Aqua Dream',   colors: ['#06b6d4','#0284c7'],            css: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',             category: 'ocean' },
  { name: 'Bioluminescent',colors:['#ecfdf5','#06b6d4','#0284c7'], css: 'linear-gradient(135deg, #ecfdf5 0%, #06b6d4 50%, #0284c7 100%)', category: 'ocean' },
  { name: 'Deep Blue',    colors: ['#1d4ed8','#1e3a8a'],            css: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',             category: 'ocean' },
  { name: 'Lagoon',       colors: ['#14b8a6','#0ea5e9'],            css: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)',             category: 'ocean' },
  { name: 'Pacific',      colors: ['#0891b2','#1e40af'],            css: 'linear-gradient(135deg, #0891b2 0%, #1e40af 100%)',             category: 'ocean' },

  // Sunset / Warm
  { name: 'Sunset',       colors: ['#f97316','#ef4444','#ec4899'], css: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)', category: 'sunset' },
  { name: 'Golden Hour',  colors: ['#fbbf24','#f97316'],            css: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',             category: 'sunset' },
  { name: 'Desert Dawn',  colors: ['#fcd34d','#fb923c','#f43f5e'], css: 'linear-gradient(135deg, #fcd34d 0%, #fb923c 50%, #f43f5e 100%)', category: 'sunset' },
  { name: 'Amber Glow',   colors: ['#f59e0b','#d97706'],            css: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',             category: 'sunset' },
  { name: 'Dusk',         colors: ['#fb923c','#7c3aed'],            css: 'linear-gradient(135deg, #fb923c 0%, #7c3aed 100%)',             category: 'sunset' },
  { name: 'Bonfire',      colors: ['#ef4444','#f97316','#fbbf24'], css: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)', category: 'sunset' },
  { name: 'Lava',         colors: ['#7f1d1d','#ef4444'],            css: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',             category: 'sunset' },
  { name: 'Creamsicle',   colors: ['#fde68a','#fb923c'],            css: 'linear-gradient(135deg, #fde68a 0%, #fb923c 100%)',             category: 'sunset' },

  // Nature / Green
  { name: 'Forest',       colors: ['#166534','#15803d'],            css: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',             category: 'nature' },
  { name: 'Spring Meadow',colors: ['#86efac','#4ade80'],            css: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',             category: 'nature' },
  { name: 'Emerald',      colors: ['#10b981','#065f46'],            css: 'linear-gradient(135deg, #10b981 0%, #065f46 100%)',             category: 'nature' },
  { name: 'Sage',         colors: ['#d1fae5','#6ee7b7','#34d399'],  css: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)', category: 'nature' },
  { name: 'Jungle',       colors: ['#14532d','#065f46'],            css: 'linear-gradient(135deg, #14532d 0%, #065f46 100%)',             category: 'nature' },
  { name: 'Avocado',      colors: ['#84cc16','#4d7c0f'],            css: 'linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)',             category: 'nature' },
  { name: 'Seafoam',      colors: ['#6ee7b7','#67e8f9'],            css: 'linear-gradient(135deg, #6ee7b7 0%, #67e8f9 100%)',             category: 'nature' },

  // Purple / Cosmic
  { name: 'Nebula',       colors: ['#4c1d95','#6d28d9','#c026d3'], css: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #c026d3 100%)', category: 'cosmic' },
  { name: 'Galaxy',       colors: ['#1e1b4b','#4c1d95','#6d28d9'], css: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #6d28d9 100%)', category: 'cosmic' },
  { name: 'Supernova',    colors: ['#7c3aed','#db2777','#f97316'], css: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f97316 100%)', category: 'cosmic' },
  { name: 'Violet Haze',  colors: ['#8b5cf6','#6366f1'],            css: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',             category: 'cosmic' },
  { name: 'Ultraviolet',  colors: ['#4f46e5','#7c3aed'],            css: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',             category: 'cosmic' },
  { name: 'Cosmos',       colors: ['#0f172a','#4c1d95','#c026d3'], css: 'linear-gradient(160deg, #0f172a 0%, #4c1d95 50%, #c026d3 100%)', category: 'cosmic' },
  { name: 'Stardust',     colors: ['#6d28d9','#a21caf'],            css: 'linear-gradient(135deg, #6d28d9 0%, #a21caf 100%)',             category: 'cosmic' },

  // Minimal / Neutral
  { name: 'Silver',       colors: ['#f1f5f9','#cbd5e1'],            css: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',             category: 'minimal' },
  { name: 'Ash',          colors: ['#e2e8f0','#94a3b8'],            css: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',             category: 'minimal' },
  { name: 'Graphite',     colors: ['#374151','#6b7280'],            css: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',             category: 'minimal' },
  { name: 'Pearl',        colors: ['#ffffff','#f1f5f9'],            css: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',             category: 'minimal' },
  { name: 'Slate',        colors: ['#475569','#1e293b'],            css: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',             category: 'minimal' },
  { name: 'Linen',        colors: ['#fef3c7','#fef9ee'],            css: 'linear-gradient(135deg, #fef3c7 0%, #fef9ee 100%)',             category: 'minimal' },

  // Rainbow / Multi-color
  { name: 'Prism',        colors: ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6'], css: 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)', category: 'rainbow' },
  { name: 'Spectrum',     colors: ['#f43f5e','#a855f7','#3b82f6'], css: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 50%, #3b82f6 100%)', category: 'rainbow' },
  { name: 'Holographic',  colors: ['#67e8f9','#c4b5fd','#fbcfe8'], css: 'linear-gradient(135deg, #67e8f9 0%, #c4b5fd 50%, #fbcfe8 100%)', category: 'rainbow' },
  { name: 'Unicorn',      colors: ['#f9a8d4','#c4b5fd','#93c5fd'], css: 'linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 50%, #93c5fd 100%)', category: 'rainbow' },
  { name: 'Opal',         colors: ['#bfdbfe','#c4b5fd','#fbcfe8','#fde68a'], css: 'linear-gradient(135deg, #bfdbfe, #c4b5fd, #fbcfe8, #fde68a)', category: 'rainbow' },
  { name: 'Pride',        colors: ['#ef4444','#f97316','#fbbf24','#22c55e','#3b82f6','#8b5cf6'], css: 'linear-gradient(135deg, #ef4444, #f97316, #fbbf24, #22c55e, #3b82f6, #8b5cf6)', category: 'rainbow' },

  // Radial
  { name: 'Solar Flare',  colors: ['#fbbf24','#ef4444'],            css: 'radial-gradient(ellipse at center, #fbbf24 0%, #ef4444 100%)',   category: 'radial' },
  { name: 'Glow Core',    colors: ['#8b5cf6','#1e1b4b'],            css: 'radial-gradient(ellipse at center, #8b5cf6 0%, #1e1b4b 100%)',   category: 'radial' },
  { name: 'Iris',         colors: ['#06b6d4','#0f172a'],            css: 'radial-gradient(ellipse at 30% 30%, #06b6d4 0%, #0f172a 100%)', category: 'radial' },
  { name: 'Ember',        colors: ['#fde68a','#f97316','#7f1d1d'],  css: 'radial-gradient(ellipse at center, #fde68a 0%, #f97316 50%, #7f1d1d 100%)', category: 'radial' },
  { name: 'Spotlight',    colors: ['#ffffff','#6366f1'],            css: 'radial-gradient(ellipse at 40% 40%, #ffffff 0%, #6366f1 100%)',   category: 'radial' },
  { name: 'Ring Light',   colors: ['#e0f2fe','#0ea5e9','#0c4a6e'], css: 'radial-gradient(ellipse at center, #e0f2fe 0%, #0ea5e9 50%, #0c4a6e 100%)', category: 'radial' },
];

// Assign IDs
const ALL_GRADIENTS: Gradient[] = GRADIENT_DATA.map((g, i) => ({ ...g, id: `g-${i}` }));

const CATEGORIES = [
  { key: 'all',     label: 'All' },
  { key: 'vibrant', label: 'Vibrant' },
  { key: 'subtle',  label: 'Subtle' },
  { key: 'dark',    label: 'Dark' },
  { key: 'ocean',   label: 'Ocean' },
  { key: 'sunset',  label: 'Sunset' },
  { key: 'nature',  label: 'Nature' },
  { key: 'cosmic',  label: 'Cosmic' },
  { key: 'minimal', label: 'Minimal' },
  { key: 'rainbow', label: 'Rainbow' },
  { key: 'radial',  label: 'Radial' },
];

const ITEMS_PER_PAGE = 24;

// ── Component ─────────────────────────────────────────────────────────────────

const GradientCard = ({ gradient, glassMode }: { gradient: Gradient; glassMode: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`background: ${gradient.css};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    toast.success('CSS copied!', { duration: 1500, position: 'bottom-center' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={copy}
      className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-black/15 transition-shadow duration-300"
      style={{ aspectRatio: '4 / 5' }}
    >
      {/* Pure gradient - the star of the card */}
      <div className="absolute inset-0" style={{ background: gradient.css }} />

      {/* Glass overlay - animates in when glassMode is on */}
      <motion.div
        animate={{
          opacity: glassMode ? 1 : 0,
          backdropFilter: glassMode ? 'blur(14px) saturate(180%)' : 'blur(0px) saturate(100%)',
        }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.10)',
          borderTop: '1px solid rgba(255,255,255,0.35)',
          borderLeft: '1px solid rgba(255,255,255,0.35)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          WebkitBackdropFilter: glassMode ? 'blur(14px) saturate(180%)' : 'blur(0px)',
        }}
      />

      {/* Bottom name strip - always visible, minimal */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pt-8 pb-4"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)' }}
      >
        <p className="text-sm font-semibold text-white tracking-wide leading-tight">
          {gradient.name}
        </p>
        <p className="text-[10px] text-white/55 capitalize mt-0.5 tracking-widest uppercase">
          {gradient.category}
        </p>
      </div>

      {/* Hover copy overlay - fades in on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <motion.div
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold text-white"
          style={{
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            backgroundColor: copied ? 'rgba(16, 185, 129, 0.35)' : 'rgba(0, 0, 0, 0.30)',
            border: copied ? '1px solid rgba(16,185,129,0.5)' : '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            transition: 'background-color 0.2s, border-color 0.2s',
          }}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy CSS
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const Gradients = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [glassMode, setGlassMode] = useState(false);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let result = ALL_GRADIENTS;
    if (category !== 'all') result = result.filter(g => g.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(g => g.name.toLowerCase().includes(q) || g.category.includes(q));
    }
    return result;
  }, [category, search]);

  const displayed = useMemo(() => filtered.slice(0, page * ITEMS_PER_PAGE), [filtered, page]);
  const hasMore = displayed.length < filtered.length;

  // Reset page when filter changes
  useEffect(() => { setPage(1); }, [category, search]);

  const loadMore = useCallback(() => {
    if (hasMore) setPage(p => p + 1);
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const gradientsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebApplication', name: 'CSS Gradient Library | ColorPeek', description: 'Browse beautiful CSS gradients.', url: 'https://color-peek.com/gradients', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What is a CSS gradient?', acceptedAnswer: { '@type': 'Answer', text: 'A CSS gradient is a smooth color transition using linear-gradient(), radial-gradient(), or conic-gradient(). They are used as backgrounds without image files.' } },
        { '@type': 'Question', name: 'Can I use these gradients commercially?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All gradients are free for personal and commercial use with no attribution required.' } },
      ]},
    ],
  };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Gradient Library - Browse Free Gradient Backgrounds"
        description="Discover beautiful CSS gradients for web and app design. Browse by style - vibrant, subtle, dark, ocean, sunset, cosmic, and more. Copy CSS with one click. Free at ColorPeek."
        path="/gradients"
        keywords="css gradients, gradient backgrounds, linear gradient css, gradient library, web design gradients, free css gradients"
        schema={gradientsSchema}
      />
      <Navbar onColorSelect={() => {}} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-label mb-3 inline-block">CSS Library</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            CSS Gradient <span className="gradient-text">Library</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            {ALL_GRADIENTS.length}+ curated CSS gradients. Click any card to copy the CSS - ready to paste into your stylesheet.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 rounded-2xl mb-6 flex flex-wrap items-center gap-3"
        >
          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  category === cat.key
                    ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-500/25'
                    : 'glass-button text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.label}
                {cat.key !== 'all' && (
                  <span className="ml-1.5 opacity-60 text-[10px]">
                    {ALL_GRADIENTS.filter(g => g.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="glass-input pl-9 pr-4 py-1.5 w-40 text-sm"
            />
          </div>

          {/* Glass Effect toggle */}
          <div className="flex items-center gap-2.5 flex-shrink-0 pl-1 border-l border-white/20">
            <span className="text-xs font-medium text-[var(--text-secondary)] select-none whitespace-nowrap">
              Glass Effect
            </span>
            <button
              onClick={() => setGlassMode(g => !g)}
              className="relative flex-shrink-0 focus:outline-none"
              role="switch"
              aria-checked={glassMode}
              title={glassMode ? 'Disable glass effect' : 'Enable glass effect'}
            >
              {/* Track */}
              <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${
                glassMode
                  ? 'bg-indigo-500 shadow-inner shadow-indigo-700/40'
                  : 'bg-black/10 dark:bg-white/10'
              }`} />
              {/* Thumb */}
              <motion.div
                animate={{ x: glassMode ? 22 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full shadow-md flex items-center justify-center"
                style={{
                  background: glassMode
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.80)',
                }}
              >
                {/* Mini glass icon on the thumb */}
                <svg className={`w-2.5 h-2.5 transition-colors duration-200 ${glassMode ? 'text-indigo-500' : 'text-gray-400'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="3"/>
                  <rect x="7" y="7" width="10" height="10" rx="2" strokeOpacity="0.5"/>
                </svg>
              </motion.div>
            </button>
          </div>

          {/* Count */}
          <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
            {filtered.length} gradient{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayed.map(gradient => (
              <GradientCard key={gradient.id} gradient={gradient} glassMode={glassMode} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-16 text-center">
            <p className="text-2xl mb-2">🎨</p>
            <p className="text-[var(--text-secondary)] font-medium">No gradients match "{search}"</p>
            <button onClick={() => setSearch('')} className="mt-3 glass-button px-4 py-2 text-sm font-medium">
              Clear search
            </button>
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={observerRef} className="py-8 flex justify-center">
          {hasMore && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"/>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-8 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the CSS Gradient Library</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Browse the gallery or filter by style - Vibrant, Subtle, Dark, Ocean, Sunset, Cosmic, and more.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Hover over any card and click "Copy CSS" - or click the copy icon in the card footer.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>The copied value is a ready-to-paste <code className="text-indigo-400">background: linear-gradient(…)</code> CSS rule.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>For Tailwind, wrap it as an arbitrary value: <code className="text-indigo-400">bg-[linear-gradient(135deg,#6366f1,#ec4899)]</code>.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Need a custom gradient? Use the <a href="/gradient-generator" className="text-indigo-500 hover:underline">Gradient Generator</a> to build your own.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is a CSS Gradient?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">A CSS gradient is a smooth color transition generated entirely in CSS - no images needed. <code className="text-indigo-400">linear-gradient()</code> transitions colors along a straight line at any angle. <code className="text-indigo-400">radial-gradient()</code> radiates outward from a center point. Both render at any resolution and have zero file size overhead. Gradients are used everywhere in modern UI: hero backgrounds, card overlays, button fills, text effects, and decorative borders. You can stack multiple gradient layers using comma-separated values for complex mesh and duotone effects.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I use these gradients commercially?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes. All gradients in the ColorPeek library are free for personal and commercial use with no attribution required.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I add a gradient to text in CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Apply <code className="text-indigo-400">background: linear-gradient(…)</code> combined with <code className="text-indigo-400">-webkit-background-clip: text</code> and <code className="text-indigo-400">-webkit-text-fill-color: transparent</code>.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I use this in Tailwind CSS?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Use Tailwind's arbitrary value syntax: <code className="text-indigo-400">className="bg-[linear-gradient(135deg,#6366f1_0%,#ec4899_100%)]"</code>. Replace spaces with underscores inside brackets.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/gradient-generator', '/palettes', '/glass-generator']} />
        </div>

      </main>
    </div>
  );
};

export default Gradients;
