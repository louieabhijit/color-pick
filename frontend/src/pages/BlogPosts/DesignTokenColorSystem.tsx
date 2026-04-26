import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaCode, FaLayerGroup, FaSync } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const DesignTokenColorSystem = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "How to Build a Color Design System with Tokens",
    description: "Learn how to create a scalable color design system using design tokens. Covers naming conventions, primitive vs semantic tokens, CSS custom properties, Tailwind integration, and team workflows.",
    author: "Marcus Johnson",
    date: "April 22, 2026",
    readTime: "13 min read",
    tags: ["Design System", "Design Tokens", "CSS Variables", "Tailwind", "Color Palette", "Frontend"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop"
  };

  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/design-token-color-system" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="design tokens, color design system, css variables design tokens, design token naming, semantic color tokens, tailwind design tokens, color system frontend" />
      </Helmet>
      <Navbar onColorSelect={() => {}} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-5xl font-bold text-white mb-4">{metadata.title}</motion.h1>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
            <div className="flex items-center"><FaCalendar className="w-4 h-4 mr-2" /><span>{metadata.date}</span></div>
            <div className="flex items-center"><FaClock className="w-4 h-4 mr-2" /><span>{metadata.readTime}</span></div>
            <div className="flex items-center"><FaTags className="w-4 h-4 mr-2" /><span className="hidden md:inline">{metadata.tags.join(', ')}</span></div>
          </motion.div>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaLayerGroup className="text-indigo-500" /> What Are Design Tokens?</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Design tokens are named variables that store design decisions - colors, spacing, typography, shadows - in a single source of truth. Instead of hardcoding <code className="text-indigo-500">#4f46e5</code> scattered across 50 files, you define it once as <code className="text-indigo-500">--color-brand-primary</code> and reference that name everywhere. When the brand color changes, you update one value.
            </p>
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What you'll build</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>✓ A two-layer token system (primitive → semantic)</li>
                <li>✓ Naming conventions that scale across teams</li>
                <li>✓ CSS custom properties implementation</li>
                <li>✓ Tailwind config integration</li>
                <li>✓ Dark mode token overrides</li>
                <li>✓ A workflow for exporting from ColorPeek</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">Layer 1: Primitive Tokens</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              Primitive tokens are your raw color scale - every shade of every color in your palette, named by hue and numeric value. They don't carry meaning yet, they're just the full inventory. Think of them as the paint supply.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-6">
              <h3 className="font-semibold mb-4">CSS Custom Properties - Primitives</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{`:root {
  /* Indigo scale */
  --color-indigo-50:  #eef2ff;
  --color-indigo-100: #e0e7ff;
  --color-indigo-200: #c7d2fe;
  --color-indigo-300: #a5b4fc;
  --color-indigo-400: #818cf8;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-indigo-700: #4338ca;
  --color-indigo-800: #3730a3;
  --color-indigo-900: #312e81;

  /* Neutral scale */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-500: #64748b;
  --color-neutral-900: #0f172a;
  --color-neutral-950: #020617;
}`}</pre>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">Layer 2: Semantic Tokens</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              Semantic tokens reference primitives and assign purpose. They answer "what is this color for?" - not "what color is it?". This layer enables dark mode: you keep the same semantic name but point it at a different primitive.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-6">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{`:root {
  /* Light mode - semantic layer */
  --color-bg-base:       var(--color-neutral-0);
  --color-bg-surface:    var(--color-neutral-50);
  --color-bg-elevated:   var(--color-neutral-100);

  --color-text-primary:  var(--color-neutral-900);
  --color-text-secondary:var(--color-neutral-500);
  --color-text-disabled: var(--color-neutral-200);

  --color-brand-primary: var(--color-indigo-600);
  --color-brand-hover:   var(--color-indigo-700);
  --color-brand-subtle:  var(--color-indigo-50);

  --color-border:        var(--color-neutral-200);
  --color-focus-ring:    var(--color-indigo-400);
}

.dark {
  /* Dark mode - same names, different primitives */
  --color-bg-base:       var(--color-neutral-950);
  --color-bg-surface:    var(--color-neutral-900);
  --color-bg-elevated:   #1e1e2e; /* custom dark surface */

  --color-text-primary:  var(--color-neutral-50);
  --color-text-secondary:var(--color-neutral-400);

  --color-brand-primary: var(--color-indigo-400);
  --color-brand-hover:   var(--color-indigo-300);
  --color-brand-subtle:  rgba(99,102,241,0.15);

  --color-border:        rgba(255,255,255,0.1);
}`}</pre>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaCode className="text-indigo-500" /> Tailwind Integration</h2>
            <p className="text-[var(--text-secondary)] mt-4">
              Wire your CSS tokens into Tailwind so you get utility class coverage. Point Tailwind's theme to your CSS variables, and you can use classes like <code className="text-indigo-500">bg-brand-primary</code> or <code className="text-indigo-500">text-text-secondary</code> directly in your JSX.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-6">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          base:     'var(--color-bg-base)',
          surface:  'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          disabled:  'var(--color-text-disabled)',
        },
        brand: {
          primary: 'var(--color-brand-primary)',
          hover:   'var(--color-brand-hover)',
          subtle:  'var(--color-brand-subtle)',
        },
        border: 'var(--color-border)',
      },
    },
  },
}`}</pre>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold">Token Naming Conventions</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6">
              <p className="text-[var(--text-secondary)] mb-4">Use a consistent <code className="text-indigo-500">category-property-variant</code> pattern:</p>
              <div className="space-y-3">
                {[
                  { token: "--color-bg-base", meaning: "Background / base layer" },
                  { token: "--color-text-primary", meaning: "Text / most important" },
                  { token: "--color-brand-primary", meaning: "Brand / default CTA" },
                  { token: "--color-feedback-error", meaning: "Feedback / error state" },
                  { token: "--color-feedback-success", meaning: "Feedback / success state" },
                  { token: "--color-border-subtle", meaning: "Border / low contrast" },
                ].map((row) => (
                  <div key={row.token} className="flex items-center gap-4 text-sm">
                    <code className="text-indigo-500 flex-1 font-mono">{row.token}</code>
                    <span className="text-[var(--text-muted)] flex-1">{row.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="my-12">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3"><FaSync className="text-indigo-500" /> Workflow: From ColorPeek to Code</h2>
            <p className="text-[var(--text-secondary)] mt-4">Here's a practical workflow for building your token system using ColorPeek's tools:</p>
            <ol className="mt-6 space-y-4 text-[var(--text-secondary)]">
              {[
                "Generate your brand color scale (50–900) using the Tint & Shade Generator - one base hex produces the full primitive scale.",
                "Add up to 16 named swatches in the Palette Exporter - assign semantic names like 'bg-base', 'brand-primary', 'text-secondary'.",
                "Export as CSS variables or Tailwind config with one click - paste directly into your project.",
                "For dark mode, duplicate the export and adjust the semantic layer to point darker primitives at the appropriate values.",
                "Commit the token file as a shared source of truth - both designers (via Figma tokens) and developers reference it.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li>• Two layers: primitives (raw scale) + semantics (purpose)</li>
                <li>• Dark mode = same semantic names, different primitive values</li>
                <li>• Name by role, not by color: <code>--color-brand-primary</code> not <code>--color-indigo</code></li>
                <li>• Export once from ColorPeek, use everywhere via CSS variables</li>
                <li>• Tailwind theme extension lets you use tokens as utility classes</li>
              </ul>
            </div>
          </motion.section>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4"><FaShare className="mr-2" />Share this article</h3>
            <div className="flex space-x-4">
              <button onClick={shareOnTwitter} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></button>
              <button onClick={shareOnFacebook} className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><FaFacebook className="w-5 h-5" /></button>
              <button onClick={shareOnLinkedIn} className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"><FaLinkedin className="w-5 h-5" /></button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20" style={{ background: 'rgba(99,102,241,0.06)' }}>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Build your token system now</h3>
            <p className="text-[var(--text-muted)] mb-6 text-sm">Generate a full color scale, name your tokens, and export as CSS variables, Tailwind config, or JSON - all free.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/palette-exporter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">Palette Exporter →</a>
              <a href="/tint-shade" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">Tint &amp; Shade Generator</a>
              <a href="/color-converter" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">Color Converter</a>
            </div>
          </motion.div>

          {/* Final ad placement */}
        </div>
      </article>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={scrollToTop} className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignTokenColorSystem;
