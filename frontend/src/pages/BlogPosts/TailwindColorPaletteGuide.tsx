import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TailwindColorPaletteGuide = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "Tailwind CSS Color Palette: Complete Guide to Custom Colors",
    description:
      "Learn how to customize the Tailwind CSS color palette, create design tokens, generate complete color scales from a single hex, and export your palette for production.",
    author: "Marcus Johnson",
    date: "April 22, 2026",
    readTime: "11 min read",
    tags: ["Tailwind CSS", "Color Palette", "Frontend", "CSS", "Design Tokens"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2070&auto=format&fit=crop",
  };

  const shareUrl = window.location.href;
  const shareOnTwitter = () =>
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`,
      '_blank'
    );
  const shareOnFacebook = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank'
    );
  const shareOnLinkedIn = () =>
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`,
      '_blank'
    );

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link
          rel="canonical"
          href="https://color-peek.com/blog/tailwind-css-color-palette-guide"
        />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta
          name="keywords"
          content="tailwind css color palette, tailwind custom colors, tailwind color scale, tailwind design tokens, tailwind color config, tailwind theme colors"
        />
      </Helmet>

      <Navbar onColorSelect={() => {}} />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={metadata.image}
            alt={metadata.title}
            className="w-full h-full object-cover"
          />
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
            <div className="flex items-center">
              <FaCalendar className="w-4 h-4 mr-2" />
              <span>{metadata.date}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="w-4 h-4 mr-2" />
              <span>{metadata.readTime}</span>
            </div>
            <div className="flex items-center">
              <FaTags className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">{metadata.tags.join(', ')}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-8"
          >
            Tailwind CSS ships with an impressive built-in color palette - 22 named hues,
            each spanning 11 shades from 50 to 950. But real-world projects have brand
            colors, design systems, and accessibility requirements that go beyond what
            any generic palette can offer. In this guide you'll learn how to extend,
            override, and fully control Tailwind's color system to fit any project.
          </motion.p>

          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              1. Why Tailwind's Default Palette Isn't Enough
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Tailwind's default palette is excellent as a starting point, but it was
              designed to be generic and broadly applicable. The moment you're building
              a product with a brand identity - a specific teal that matches your logo,
              a warm neutral that feels premium, or a red that meets WCAG contrast on
              dark backgrounds - you'll hit the limits of the defaults.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Common pain points with the default palette include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
              <li>
                <strong>Brand mismatch:</strong> Your brand blue is <code>#1a4fd6</code>,
                not Tailwind's <code>blue-600</code> (<code>#2563eb</code>). Close, but
                not production-ready.
              </li>
              <li>
                <strong>Missing semantic names:</strong> Utility classes like{' '}
                <code>bg-blue-600</code> have no semantic meaning. Renaming to{' '}
                <code>bg-brand-primary</code> makes code self-documenting.
              </li>
              <li>
                <strong>No design token integration:</strong> Modern design systems use
                tokens (e.g. Figma variables) that map to specific values - not
                framework-specific shade numbers.
              </li>
              <li>
                <strong>Accessibility constraints:</strong> You may need a custom scale
                where the contrast between 400 and 600 is guaranteed to pass AA/AAA
                standards at your specific background colors.
              </li>
            </ul>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              The good news: Tailwind's configuration system is built for exactly this.
              You have full control over every color, shade, and semantic alias.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              2. Understanding Tailwind's Color Scale (50–950)
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Tailwind uses a numeric scale system where each number represents a
              perceptual step in lightness. The scale runs from <strong>50</strong>{' '}
              (nearly white) through <strong>950</strong> (nearly black), with{' '}
              <strong>11 stops</strong> in between: 50, 100, 200, 300, 400, 500, 600,
              700, 800, 900, 950.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Shade</th>
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Use Case</th>
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Example (Indigo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {[
                    ['50', 'Background tints, hover surfaces', '#eef2ff'],
                    ['100', 'Light backgrounds, badges', '#e0e7ff'],
                    ['200', 'Borders, dividers on light BG', '#c7d2fe'],
                    ['300', 'Disabled states, placeholders', '#a5b4fc'],
                    ['400', 'Secondary text on white', '#818cf8'],
                    ['500', 'Brand color baseline', '#6366f1'],
                    ['600', 'Primary buttons, links', '#4f46e5'],
                    ['700', 'Hover states on buttons', '#4338ca'],
                    ['800', 'Dark text, dark card BGs', '#3730a3'],
                    ['900', 'Headings on dark mode', '#312e81'],
                    ['950', 'Near-black tones', '#1e1b4b'],
                  ].map(([shade, use, hex]) => (
                    <tr key={shade} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400">{shade}</td>
                      <td className="px-4 py-2 text-[var(--text-secondary)] dark:text-gray-300">{use}</td>
                      <td className="px-4 py-2">
                        <span className="flex items-center gap-2">
                          <span
                            className="inline-block w-4 h-4 rounded-sm border border-gray-200"
                            style={{ background: hex }}
                          />
                          <code className="text-xs text-[var(--text-muted)] dark:text-gray-400">{hex}</code>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[var(--text-secondary)] dark:text-gray-300">
              The <strong>500 shade is always the "pure" hue</strong> - your base color
              at full saturation. Shades below 500 mix in white; shades above 500 mix in
              black (though the exact method Tailwind uses is more perceptually nuanced
              than simple tinting).
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              3. Adding Custom Colors in tailwind.config.js
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Tailwind's <code>tailwind.config.js</code> file has a <code>theme</code>{' '}
              key with two ways to customize colors:
            </p>
            <ul className="list-disc list-inside mb-4 text-[var(--text-secondary)] dark:text-gray-300 space-y-1">
              <li>
                <code>theme.extend.colors</code> - <strong>adds</strong> your colors
                alongside the defaults (recommended)
              </li>
              <li>
                <code>theme.colors</code> - <strong>replaces</strong> the entire palette
                (use only if you want full control)
              </li>
            </ul>

            <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200 mb-2">
              Example: Adding a brand color with a full scale
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce6fe',
          200: '#b9cdfd',
          300: '#87a9fb',
          400: '#5480f7',
          500: '#2a56f0',   // base brand color
          600: '#1a40d6',
          700: '#1433ae',
          800: '#102a8c',
          900: '#0d2370',
          950: '#071247',
        },
        // Semantic aliases (reference brand scale)
        primary: 'var(--color-primary)',
        surface: {
          DEFAULT: '#ffffff',
          dark:    '#0f172a',
        },
      },
    },
  },
};`}
            </pre>

            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4 mb-2">
              You can now use <code>bg-brand-500</code>, <code>text-brand-700</code>,{' '}
              <code>border-brand-200</code>, etc., throughout your project.
            </p>

            <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200 mb-2 mt-4">
              For Tailwind v4 (CSS-first config):
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* app.css - Tailwind v4 uses CSS variables natively */
@import "tailwindcss";

@theme {
  --color-brand-50:  #f0f4ff;
  --color-brand-500: #2a56f0;
  --color-brand-950: #071247;
  --color-primary:   var(--color-brand-500);
}`}
            </pre>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              4. Generating a Full 50–900 Scale from One Base Color
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Manually picking 11 harmonious shades for every brand color is time-consuming
              and inconsistent. The better approach: start with your <strong>one brand hex</strong>{' '}
              and generate the entire scale algorithmically.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              This is exactly what ColorPeek's{' '}
              <a href="/tint-shade" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                Tint &amp; Shade Generator
              </a>{' '}
              does. Enter your base hex, and it produces a perceptually uniform scale
              that you can copy directly into your Tailwind config.
            </p>

            <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
              <p className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
                How the scale generation works:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
                <li>Convert your base hex to <strong>HSL</strong> (Hue, Saturation, Lightness)</li>
                <li>Keep the <strong>hue fixed</strong> across all 11 stops</li>
                <li>
                  Apply a <strong>lightness curve</strong>: shade 50 → L 97%, shade 500 →
                  base L, shade 950 → L 8%
                </li>
                <li>
                  Adjust <strong>saturation</strong> slightly - tints desaturate a bit,
                  shades stay punchy
                </li>
                <li>Convert each stop back to hex for Tailwind compatibility</li>
              </ol>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`// Result of generating a scale from #2a56f0:
// Paste directly into tailwind.config.js

brand: {
  50:  '#eef2ff',   // L: 96%
  100: '#dce6fe',   // L: 92%
  200: '#b9cdfd',   // L: 84%
  300: '#87a9fb',   // L: 74%
  400: '#5480f7',   // L: 63%
  500: '#2a56f0',   // L: 55% ← your base
  600: '#1a40d6',   // L: 46%
  700: '#1433ae',   // L: 37%
  800: '#102a8c',   // L: 29%
  900: '#0d2370',   // L: 22%
  950: '#071247',   // L: 14%
}`}
            </pre>

            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              The key advantage of a generated scale over manually chosen values is
              <strong> perceptual uniformity</strong> - the visual step between adjacent
              shades feels equal, which makes your UI look polished and intentional.
            </p>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              5. Design Tokens vs. Utility Classes
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              A <strong>design token</strong> is a named variable that stores a design
              decision - <code>color.brand.primary</code>, <code>color.surface.default</code>,
              <code>spacing.layout.gutter</code>. Utility classes like{' '}
              <code>bg-indigo-600</code> are implementation details; tokens are the
              intent.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                <p className="font-semibold text-red-700 dark:text-red-300 mb-2">Without Tokens</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`<button class="bg-indigo-600
  hover:bg-indigo-700
  text-white">
  Submit
</button>

<!-- If brand changes to teal,
     update every file -->`}
                </pre>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-2">With Tokens</p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto">
{`<button class="bg-primary
  hover:bg-primary-dark
  text-on-primary">
  Submit
</button>

<!-- Change token once,
     updates everywhere -->`}
                </pre>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              In Tailwind, you can bridge the gap by defining semantic token names in
              your config that reference your scale:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Raw scale (generated from one hex)
        brand: { 50: '...', 500: '#2a56f0', 950: '...' },

        // Semantic tokens that reference the scale
        primary:        ({ theme }) => theme('colors.brand.500'),
        'primary-dark': ({ theme }) => theme('colors.brand.700'),
        'on-primary':   '#ffffff',
        surface:        ({ theme }) => theme('colors.brand.50'),
        'surface-dark': ({ theme }) => theme('colors.brand.950'),
      },
    },
  },
};`}
            </pre>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              6. Exporting Your Palette as Tailwind Config
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Once you've built and refined your color palette - whether in ColorPeek's
              palette builder, a Figma file, or by hand - the final step is exporting it
              in a format you can paste directly into your project.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              ColorPeek's{' '}
              <a href="/palette-exporter" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                Palette Exporter
              </a>{' '}
              supports multiple output formats from a single palette:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              <li><strong>Tailwind config</strong> - <code>theme.extend.colors</code> object</li>
              <li><strong>Tailwind v4 CSS</strong> - <code>@theme</code> block with CSS variables</li>
              <li><strong>CSS custom properties</strong> - for any CSS framework or vanilla projects</li>
              <li><strong>SCSS variables</strong> - for SASS-based projects</li>
              <li><strong>JSON / Style Dictionary</strong> - for design token pipelines</li>
              <li><strong>Figma tokens plugin format</strong> - for design-to-code sync</li>
            </ul>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Exported as CSS custom properties */
:root {
  --color-brand-50:  #eef2ff;
  --color-brand-100: #dce6fe;
  --color-brand-200: #b9cdfd;
  --color-brand-300: #87a9fb;
  --color-brand-400: #5480f7;
  --color-brand-500: #2a56f0;
  --color-brand-600: #1a40d6;
  --color-brand-700: #1433ae;
  --color-brand-800: #102a8c;
  --color-brand-900: #0d2370;
  --color-brand-950: #071247;
}`}
            </pre>
          </motion.div>

          {/* Section 7 - Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
                7. Key Takeaways
              </h2>
              <ul className="space-y-3">
                {[
                  "Use theme.extend.colors to add brand colors without losing Tailwind defaults.",
                  "The numeric scale (50–950) maps to perceptual lightness steps - 500 is always your base hue.",
                  "Generate a full 11-shade scale from one hex using ColorPeek's Tint & Shade Generator for visual consistency.",
                  "Layer semantic token names on top of your raw scale - change one value, update the whole product.",
                  "Export in multiple formats (Tailwind config, CSS vars, SCSS, JSON) so every tool in your pipeline stays in sync.",
                  "Tailwind v4 replaces tailwind.config.js with a CSS-first @theme block - plan your token architecture accordingly.",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[var(--text-secondary)] dark:text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <FaShare className="mr-2" />Share this article
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={shareOnTwitter}
                className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Tool CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-white mb-2">
              Build Your Tailwind Palette in Seconds
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Enter one hex color and get a complete 11-shade scale ready to paste into
              your Tailwind config. Then export in any format you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/tint-shade"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Generate Tint &amp; Shade Scale →
              </a>
              <a
                href="/palette-exporter"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-600 transition-colors"
              >
                Export Palette as Tailwind Config
              </a>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Scroll to top */}
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

export default TailwindColorPaletteGuide;
