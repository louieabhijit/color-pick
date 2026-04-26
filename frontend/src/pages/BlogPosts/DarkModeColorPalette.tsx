import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const DarkModeColorPalette = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const metadata = {
    title: "Designing Dark Mode Color Palettes: A Complete Developer's Guide",
    description: "Learn the principles behind great dark mode design: surface levels, elevation, text contrast, and semantic color tokens. Includes practical examples and CSS implementation.",
    author: "Kai Nakamura",
    date: "April 22, 2026",
    readTime: "12 min read",
    tags: ["Dark Mode", "Color Palette", "UI Design", "CSS", "Accessibility"],
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop&fm=webp",
  };
  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/dark-mode-color-palette-design" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="dark mode color palette, dark mode design, dark ui colors, dark theme css, dark mode accessibility, dark mode color scheme" />
      </Helmet>
      <Navbar onColorSelect={() => {}} />

      {/* Hero */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {metadata.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-gray-300 text-sm"
          >
            <div className="flex items-center"><FaCalendar className="w-4 h-4 mr-2" /><span>{metadata.date}</span></div>
            <div className="flex items-center"><FaClock className="w-4 h-4 mr-2" /><span>{metadata.readTime}</span></div>
            <div className="flex items-center"><FaTags className="w-4 h-4 mr-2" /><span className="hidden md:inline">{metadata.tags.join(', ')}</span></div>
          </motion.div>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          {/* Summary box */}
          <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 mt-0">What You'll Learn</h2>
            <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300 mb-0">
              <li>Why dark mode is fundamentally different from color inversion</li>
              <li>How to use surface elevation to create visual depth</li>
              <li>WCAG contrast rules specifically for dark UI text</li>
              <li>How to define semantic color tokens for theming</li>
              <li>How to adapt brand colors for dark backgrounds</li>
              <li>A complete CSS implementation with custom properties</li>
            </ul>
          </div>

          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              1. Why Dark Mode Is More Than Just Inverting Colors
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              A common misconception among developers starting out with dark mode is that it's simply a matter of flipping the color scale - making backgrounds dark and text light. Hit <code>filter: invert(1)</code> on the <code>body</code> and you're done, right? Wrong. That approach creates garish, inconsistent experiences that actually strain the eyes more than a well-lit screen.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              True dark mode design is a deliberate system. It accounts for how the human eye perceives luminance differently in low-light environments, how UI elements need to communicate depth without relying on drop shadows the same way they do in light mode, and how colors that work brilliantly on a white canvas can feel overwhelming or washed-out on a dark one.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Consider the difference: in light mode, depth is communicated by shadows - a card sits above a background because it has a drop shadow. In dark mode, shadows on dark surfaces are nearly invisible, so depth must instead be communicated through surface color itself. The card appears lighter than the background, not by a shadow, but by its surface tone.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-3">Light Mode vs. Dark Mode: Key Differences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-[var(--text-secondary)] dark:text-gray-400 text-sm mb-2">Light Mode Logic</p>
                  <ul className="text-[var(--text-secondary)] dark:text-gray-300 text-sm space-y-1">
                    <li>Depth via drop shadows</li>
                    <li>Backgrounds near white (#FFFFFF, #F8F9FA)</li>
                    <li>Text near black (#1A1A1A)</li>
                    <li>Brand colors show full saturation</li>
                    <li>Color stands out against neutral backgrounds</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-secondary)] dark:text-gray-400 text-sm mb-2">Dark Mode Logic</p>
                  <ul className="text-[var(--text-secondary)] dark:text-gray-300 text-sm space-y-1">
                    <li>Depth via lighter surface levels</li>
                    <li>Backgrounds near dark gray (#121212, #1E1E1E)</li>
                    <li>Text near off-white (#E8E8F0)</li>
                    <li>Brand colors may need lightening/desaturating</li>
                    <li>Glows and subtle gradients enhance depth</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              Google's Material Design guidelines recommend a background of <strong>#121212</strong> as the base dark surface - not pure black. Pure black (#000000) creates a harsh contrast that can cause eye strain, and it doesn't allow for the elevation system to function properly because there's nowhere lower to go.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              2. Surface Levels and Elevation in Dark Mode
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Material Design's elevation model translates beautifully to dark mode. The core principle: the higher an element is in the z-stack, the lighter its surface color should be. This creates a perceptual sense of elevation without relying on shadows.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Each elevation level adds a white overlay with increasing opacity. At elevation 0 (the background), the surface is the base dark color. At elevation 1 (cards, panels), a 5% white overlay is applied. At elevation 8 (modals, popovers), a 12% overlay. At elevation 24 (dialogs at the very top), up to 16%.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Dark Mode Elevation Scale</h3>
              <div className="space-y-3">
                {[
                  { level: 'Elevation 0 (Background)', hex: '#121212', label: 'Base background' },
                  { level: 'Elevation 1 (Cards)', hex: '#1E1E1E', label: '5% white overlay' },
                  { level: 'Elevation 2 (Navigation)', hex: '#222222', label: '7% white overlay' },
                  { level: 'Elevation 3 (Dropdowns)', hex: '#272727', label: '8% white overlay' },
                  { level: 'Elevation 4 (Modals)', hex: '#2C2C2C', label: '9% white overlay' },
                  { level: 'Elevation 8 (Popovers)', hex: '#2E2E2E', label: '11% white overlay' },
                  { level: 'Elevation 16 (Snackbars)', hex: '#333333', label: '14% white overlay' },
                  { level: 'Elevation 24 (Dialogs)', hex: '#383838', label: '16% white overlay' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-center gap-4">
                    <div style={{ backgroundColor: item.hex }} className="w-16 h-8 rounded-lg flex-shrink-0 border border-white/10" />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)] dark:text-gray-200">{item.level}</p>
                      <p className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex} - {item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              In practice, you don't need all 8 levels. Most interfaces get by with 3–4 distinct surface levels. The key is consistency: once you define your elevation system, apply it uniformly so users can intuitively understand that lighter = closer.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              3. Text Contrast Rules for Dark Mode
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The WCAG (Web Content Accessibility Guidelines) require a minimum contrast ratio of <strong>4.5:1</strong> for normal text (AA compliance) and <strong>7:1</strong> for AAA compliance. For large text (18px+ bold or 24px+ regular), AA requires just 3:1. These rules apply equally to dark mode - but the challenge is different.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              On a light background, near-black text (#1A1A1A on #FFFFFF) scores an enormous 18.5:1 ratio - far exceeding even AAA requirements. On a dark background, you might assume that pure white on pure black (#FFFFFF on #000000) is perfect. And mathematically it is - 21:1 is the maximum possible ratio. But pure white text on pure black causes a "halation" effect where the extreme contrast makes the letters appear to glow, creating eye strain during extended reading.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Recommended Dark Mode Text Colors</h3>
              <div className="space-y-4">
                {[
                  { label: 'Primary Text', hex: '#E8E8F0', desc: 'Main body text - off-white with a subtle cool tint, contrast ~15:1 on #121212', contrast: '~15:1' },
                  { label: 'Secondary Text', hex: '#A0A0B0', desc: 'Captions, metadata, labels - readable but clearly subordinate', contrast: '~7:1' },
                  { label: 'Disabled Text', hex: '#606070', desc: 'Disabled states, placeholder text', contrast: '~3:1' },
                  { label: 'Hint Text', hex: '#4A4A5A', desc: 'Very subtle hints - only for decorative contexts, not real content', contrast: '<2:1' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div style={{ backgroundColor: item.hex }} className="w-full h-8 rounded-lg mb-1 border border-gray-200 dark:border-gray-600" />
                      <code className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex}</code>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-gray-200">{item.label} <span className="text-indigo-500 font-normal">({item.contrast})</span></p>
                      <p className="text-xs text-[var(--text-secondary)] dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The key insight: <strong>never use pure #FFFFFF as your primary body text in dark mode</strong>. Instead, use a slightly warm or cool off-white like <code>#E8E8F0</code> or <code>#F0EFE9</code>. This subtle softening reduces halation while maintaining excellent contrast ratios well above AA requirements.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              Similarly, avoid using secondary text that's too dim - many designers make the mistake of using mid-gray text on dark backgrounds, producing contrast ratios below 3:1 that fail accessibility standards entirely.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              4. Semantic Color Tokens for Dark Mode
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Hard-coding color values like <code>#1E1E1E</code> directly into your components is a recipe for a maintenance nightmare. Instead, the modern approach is to define <strong>semantic color tokens</strong> - named variables that describe the role of a color, not its specific value.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The distinction: a primitive token is <code>gray-900: #121212</code>. A semantic token is <code>background-base: var(--gray-900)</code>. The component uses <code>background-base</code>, and when you switch to dark mode, you only change what <code>background-base</code> points to - the component itself needs no modification.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Core Semantic Token Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 text-sm uppercase tracking-wider">Background Tokens</p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                    <li><code className="text-indigo-500">--bg-base</code> - Page background</li>
                    <li><code className="text-indigo-500">--bg-surface</code> - Cards, panels</li>
                    <li><code className="text-indigo-500">--bg-overlay</code> - Modals, dialogs</li>
                    <li><code className="text-indigo-500">--bg-sunken</code> - Inputs, code blocks</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 text-sm uppercase tracking-wider">Text Tokens</p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                    <li><code className="text-indigo-500">--text-primary</code> - Headings, body</li>
                    <li><code className="text-indigo-500">--text-secondary</code> - Captions, labels</li>
                    <li><code className="text-indigo-500">--text-disabled</code> - Disabled states</li>
                    <li><code className="text-indigo-500">--text-inverse</code> - Text on colored buttons</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 text-sm uppercase tracking-wider">Border Tokens</p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                    <li><code className="text-indigo-500">--border-default</code> - Standard dividers</li>
                    <li><code className="text-indigo-500">--border-strong</code> - Emphasized borders</li>
                    <li><code className="text-indigo-500">--border-focus</code> - Focus rings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3 text-sm uppercase tracking-wider">Brand / Interactive Tokens</p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                    <li><code className="text-indigo-500">--color-primary</code> - Primary actions</li>
                    <li><code className="text-indigo-500">--color-primary-hover</code> - Hover state</li>
                    <li><code className="text-indigo-500">--color-danger</code> - Errors, destructive</li>
                    <li><code className="text-indigo-500">--color-success</code> - Confirmations</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              This token architecture means you can ship a complete dark mode by simply defining a new set of values for each semantic token under a <code>.dark</code> class or <code>@media (prefers-color-scheme: dark)</code> rule. Every component automatically inherits the correct dark values.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              5. Handling Brand Colors in Dark Mode
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Brand colors present a unique challenge when transitioning to dark mode. A vivid indigo that looks sharp on white (#4F46E5 on #FFFFFF) can feel oppressively heavy and visually "bleed" when placed on a dark background. The solution is to shift your brand color toward a lighter, slightly more saturated variant for dark mode.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The general rule: for dark backgrounds, use a lighter tint of your brand color (around the 300–400 shade in a Tailwind-style scale) as your interactive/accent color. Reserve the 600–700 shades for backgrounds and containers, and use them sparingly.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Brand Color Adaptation: Indigo Example</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-2">Light Mode - Button Primary</p>
                  <div className="flex items-center gap-3">
                    <div style={{ backgroundColor: '#4F46E5' }} className="w-full h-12 rounded-lg" />
                    <code className="text-sm text-[var(--text-secondary)] dark:text-gray-300 whitespace-nowrap">#4F46E5</code>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-2">Dark Mode - Button Primary (lighter, same energy)</p>
                  <div className="flex items-center gap-3">
                    <div style={{ backgroundColor: '#818CF8' }} className="w-full h-12 rounded-lg" />
                    <code className="text-sm text-[var(--text-secondary)] dark:text-gray-300 whitespace-nowrap">#818CF8</code>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-2">Dark Mode - Subtle Background / Container</p>
                  <div className="flex items-center gap-3">
                    <div style={{ backgroundColor: '#312E81' }} className="w-full h-12 rounded-lg" />
                    <code className="text-sm text-[var(--text-secondary)] dark:text-gray-300 whitespace-nowrap">#312E81</code>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mt-4">
                Notice how #818CF8 (indigo-400) reads clearly against #121212 while still feeling on-brand. The original #4F46E5 (indigo-600) barely passes 4.5:1 contrast on dark backgrounds and feels heavy.
              </p>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              For status colors - success green, danger red, warning yellow - apply the same principle. Use lighter, less saturated tones in dark mode. A full-saturation red (#EF4444) works as a danger state in light mode, but <code>#FCA5A5</code> (red-300) communicates the same urgency on dark backgrounds while maintaining comfortable contrast.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              6. A Complete Dark Mode Palette Example
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-6">
              Here's a production-ready dark mode palette with named tokens and specific hex values. This system is based on a cool-neutral dark gray with an indigo brand accent:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-5">Complete Dark Mode System Palette</h3>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Backgrounds</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { name: '--bg-base', hex: '#0F0F13', desc: 'Page background' },
                  { name: '--bg-surface', hex: '#1A1A24', desc: 'Cards, panels (elev. 1)' },
                  { name: '--bg-overlay', hex: '#24243A', desc: 'Modals, dropdowns (elev. 4)' },
                  { name: '--bg-sunken', hex: '#0A0A0E', desc: 'Code blocks, inputs' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-center gap-3">
                    <div style={{ backgroundColor: item.hex }} className="w-14 h-10 rounded-lg flex-shrink-0 border border-white/10" />
                    <div>
                      <code className="text-xs text-indigo-400">{item.name}</code>
                      <p className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex} - {item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Typography</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { name: '--text-primary', hex: '#E8E8F0', desc: 'Headings, body copy' },
                  { name: '--text-secondary', hex: '#9898B0', desc: 'Captions, meta' },
                  { name: '--text-disabled', hex: '#55556A', desc: 'Disabled elements' },
                  { name: '--text-link', hex: '#818CF8', desc: 'Links, inline actions' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-center gap-3">
                    <div style={{ backgroundColor: item.hex }} className="w-14 h-10 rounded-lg flex-shrink-0 border border-white/10" />
                    <div>
                      <code className="text-xs text-indigo-400">{item.name}</code>
                      <p className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex} - {item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Brand & Interactive</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  { name: '--color-primary', hex: '#6366F1', desc: 'Primary buttons, CTAs' },
                  { name: '--color-primary-hover', hex: '#818CF8', desc: 'Hover state' },
                  { name: '--color-success', hex: '#86EFAC', desc: 'Success states (green-300)' },
                  { name: '--color-danger', hex: '#FCA5A5', desc: 'Error states (red-300)' },
                  { name: '--color-warning', hex: '#FCD34D', desc: 'Warning states (yellow-300)' },
                  { name: '--color-info', hex: '#93C5FD', desc: 'Info states (blue-300)' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-center gap-3">
                    <div style={{ backgroundColor: item.hex }} className="w-14 h-10 rounded-lg flex-shrink-0 border border-white/10" />
                    <div>
                      <code className="text-xs text-indigo-400">{item.name}</code>
                      <p className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex} - {item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm font-semibold text-[var(--text-muted)] dark:text-gray-400 uppercase tracking-wider mb-3">Borders</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: '--border-default', hex: '#2A2A3E', desc: 'Dividers, card outlines' },
                  { name: '--border-strong', hex: '#3E3E58', desc: 'Emphasized separators' },
                  { name: '--border-focus', hex: '#6366F1', desc: 'Focus ring' },
                ].map((item) => (
                  <div key={item.hex} className="flex items-center gap-3">
                    <div style={{ backgroundColor: item.hex }} className="w-14 h-10 rounded-lg flex-shrink-0 border border-white/10" />
                    <div>
                      <code className="text-xs text-indigo-400">{item.name}</code>
                      <p className="text-xs text-[var(--text-muted)] dark:text-gray-400">{item.hex} - {item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              7. CSS Implementation with Custom Properties
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              CSS custom properties (variables) are the best way to implement a dual-mode color system. Define all your light mode values under <code>:root</code>, then override them under a <code>.dark</code> class or <code>@media (prefers-color-scheme: dark)</code>. Every element in the page automatically recomputes its colors.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* === LIGHT MODE DEFAULTS === */
:root {
  /* Backgrounds */
  --bg-base:        #FFFFFF;
  --bg-surface:     #F8F9FA;
  --bg-overlay:     #FFFFFF;
  --bg-sunken:      #F1F3F5;

  /* Typography */
  --text-primary:   #1A1A2E;
  --text-secondary: #6B7280;
  --text-disabled:  #9CA3AF;
  --text-link:      #4F46E5;

  /* Brand */
  --color-primary:       #4F46E5;
  --color-primary-hover: #4338CA;
  --color-success:       #16A34A;
  --color-danger:        #DC2626;
  --color-warning:       #D97706;
  --color-info:          #2563EB;

  /* Borders */
  --border-default: #E5E7EB;
  --border-strong:  #D1D5DB;
  --border-focus:   #4F46E5;
}

/* === DARK MODE OVERRIDE === */
.dark {
  /* Backgrounds */
  --bg-base:        #0F0F13;
  --bg-surface:     #1A1A24;
  --bg-overlay:     #24243A;
  --bg-sunken:      #0A0A0E;

  /* Typography */
  --text-primary:   #E8E8F0;
  --text-secondary: #9898B0;
  --text-disabled:  #55556A;
  --text-link:      #818CF8;

  /* Brand (lighter tints for dark bg) */
  --color-primary:       #6366F1;
  --color-primary-hover: #818CF8;
  --color-success:       #86EFAC;
  --color-danger:        #FCA5A5;
  --color-warning:       #FCD34D;
  --color-info:          #93C5FD;

  /* Borders */
  --border-default: #2A2A3E;
  --border-strong:  #3E3E58;
  --border-focus:   #6366F1;
}

/* === SYSTEM PREFERENCE FALLBACK === */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --bg-base:        #0F0F13;
    --bg-surface:     #1A1A24;
    --text-primary:   #E8E8F0;
    /* ... rest of dark values ... */
  }
}

/* === USAGE IN COMPONENTS === */
.card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
}

.button-primary {
  background-color: var(--color-primary);
  color: #FFFFFF;
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mt-4">
              Notice that components never reference a raw color value - only token names. When you toggle the <code>.dark</code> class on your <code>&lt;html&gt;</code> element (common in React with a theme context), every component automatically receives the correct values. No component-level conditional styling needed.
            </p>
          </motion.section>

          {/* Section 8: Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              8. Key Takeaways
            </h2>
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <ul className="space-y-3 text-[var(--text-secondary)] dark:text-gray-300 mb-0">
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">01</span><span><strong>Never invert:</strong> Dark mode requires a thoughtful redesign of your color system, not a CSS filter trick.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">02</span><span><strong>Use elevation via lightness:</strong> Higher z-level elements get lighter surface colors to communicate depth.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">03</span><span><strong>Avoid pure white text:</strong> Use off-white (#E8E8F0) to prevent halation and eye strain during extended reading.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">04</span><span><strong>Define semantic tokens:</strong> Components should reference role-based tokens, not raw hex values.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">05</span><span><strong>Adapt brand colors:</strong> Use lighter tints (300–400 range) of your brand color for interactive elements on dark backgrounds.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">06</span><span><strong>Respect system preferences:</strong> Always support <code>prefers-color-scheme: dark</code> as a fallback, even if you build a manual toggle.</span></li>
                <li className="flex items-start gap-2"><span className="text-indigo-500 font-bold mt-0.5">07</span><span><strong>Test contrast rigorously:</strong> Use a contrast checker on every text color pair, not just your primary body text.</span></li>
              </ul>
            </div>
          </motion.section>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold mb-4"><FaShare className="mr-2" />Share this article</h3>
            <div className="flex space-x-4">
              <button onClick={shareOnTwitter} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></button>
              <button onClick={shareOnFacebook} className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><FaFacebook className="w-5 h-5" /></button>
              <button onClick={shareOnLinkedIn} className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"><FaLinkedin className="w-5 h-5" /></button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-white mb-2">Build Your Dark Mode Palette with ColorPeek</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-400 mb-6">
              Use ColorPeek's tools to generate, preview, and export a complete dark mode color system - from surface levels to semantic tokens.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/palettes" className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                Browse Dark Palettes
              </a>
              <a href="/tint-shade" className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                Tint & Shade Generator
              </a>
              <a href="/color-converter" className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                Color Converter
              </a>
            </div>
          </motion.div>
        </div>
      </article>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DarkModeColorPalette;
