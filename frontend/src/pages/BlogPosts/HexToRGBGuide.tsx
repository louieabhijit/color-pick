import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const HexToRGBGuide = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "HEX to RGB and Beyond: The Complete Color Format Conversion Guide",
    description:
      "Master every color format: HEX, RGB, RGBA, HSL, HSLA, CMYK, and OKLCH. Learn when to use each format, how to convert between them, and which CSS contexts require which format.",
    author: "Priya Sharma",
    date: "April 22, 2026",
    readTime: "9 min read",
    tags: ["Color Formats", "CSS", "HEX", "RGB", "HSL", "Developer Tools"],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
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
          href="https://color-peek.com/blog/hex-to-rgb-color-conversion-guide"
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
          content="hex to rgb converter, color format conversion, rgb to hsl, css color formats, oklch css, cmyk to rgb, color codes explained"
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
            Every front-end developer has copy-pasted a hex code from Figma, only to
            realize the CSS property they need requires <code>rgb()</code> — or the
            animation library expects HSL. Color format confusion wastes time and
            introduces bugs. This guide walks through every format you'll encounter,
            when to use each, and exactly how to convert between them.
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
              1. Why Color Formats Matter
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              The web supports many color formats — and they're not interchangeable in
              every context. Some CSS properties accept only specific formats. Some
              JavaScript APIs require numeric values. Print workflows use CMYK. Modern
              CSS Level 4 introduces perceptually uniform spaces like OKLCH.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Choosing the right format affects:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
              <li><strong>Opacity control</strong> — only RGBA/HSLA/OKLCH support the alpha channel inline</li>
              <li><strong>Programmatic manipulation</strong> — HSL is far easier to lighten/darken in JS</li>
              <li><strong>Color interpolation</strong> — gradients look different in sRGB vs OKLCH</li>
              <li><strong>Print accuracy</strong> — screens use RGB; printers use CMYK</li>
              <li><strong>Perceptual consistency</strong> — OKLCH ensures equal-step lightness feels equal visually</li>
            </ul>
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
              2. HEX — What Each Character Means
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              A hex color like <code>#2a56f0</code> encodes three 8-bit channels — Red,
              Green, Blue — as pairs of base-16 digits. Each pair ranges from{' '}
              <code>00</code> (0) to <code>ff</code> (255).
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`#  2a   56   f0
   ↑    ↑    ↑
   R    G    B
   (42) (86) (240)

Calculation:
  R = 0x2a = 2×16 + 10 = 42
  G = 0x56 = 5×16 + 6  = 86
  B = 0xf0 = 15×16 + 0 = 240`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4 mb-4">
              <strong>3-digit shorthand:</strong> When both digits of each pair are
              identical, you can use the 3-digit form:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`#aabbcc  →  #abc   ✓ (valid shorthand)
#2a56f0  →  no shorthand possible (digits differ)`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              <strong>8-digit hex with alpha:</strong> CSS also supports{' '}
              <code>#rrggbbaa</code> where the last two digits control opacity:
              <code>#2a56f0ff</code> = fully opaque, <code>#2a56f080</code> = 50%
              transparent.
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
              3. RGB and RGBA — When Opacity Matters
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              <code>rgb()</code> expresses the same three channels as HEX but in decimal
              notation, making it easier to read and manipulate programmatically.{' '}
              <code>rgba()</code> adds the alpha channel as a 0–1 decimal.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Equivalent colors */
color: #2a56f0;
color: rgb(42, 86, 240);

/* With opacity */
background: rgba(42, 86, 240, 0.15);  /* 15% tinted overlay */
background: rgba(42, 86, 240, 0.5);   /* 50% semi-transparent */

/* Modern CSS syntax (space-separated, / for alpha) */
background: rgb(42 86 240 / 0.15);`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              RGB shines in <strong>JavaScript Canvas</strong> and{' '}
              <strong>WebGL</strong> contexts where you're passing numeric values to
              APIs. It's also the format used by <code>getComputedStyle()</code> — so
              when you read a color from the DOM, you'll always get back an{' '}
              <code>rgb()</code> string regardless of how you specified it.
            </p>
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
              4. HSL and HSLA — The Designer's Format
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              HSL stands for <strong>Hue</strong>, <strong>Saturation</strong>, and{' '}
              <strong>Lightness</strong>. It maps to how humans actually think about
              color — "a medium-bright blue" is far more intuitive than "42, 86, 240".
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`hsl(221, 85%, 55%)
     ↑    ↑    ↑
   Hue  Sat  Light
   221° 85%   55%

/* Hue: 0–360° on the color wheel
   0/360 = red, 120 = green, 240 = blue

   Saturation: 0% = grayscale, 100% = vivid
   Lightness:  0% = black, 50% = pure hue, 100% = white */

/* Darkening is trivial with HSL */
.button         { background: hsl(221, 85%, 55%); }
.button:hover   { background: hsl(221, 85%, 45%); } /* -10% L */
.button:active  { background: hsl(221, 85%, 35%); } /* -20% L */`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              This is why HSL is a designer's best friend in CSS. You can tweak
              lightness and saturation independently without touching the hue — creating
              hover, active, and disabled states with a single number change.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              <strong>Caveat:</strong> HSL is mathematically simple but not perceptually
              uniform. Two colors with the same HSL lightness value may look very
              different in actual brightness to the human eye (yellow at L 50% appears
              much brighter than blue at L 50%). For perceptual uniformity, use OKLCH.
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
              5. CMYK — Print vs. Screen
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              CMYK (Cyan, Magenta, Yellow, Key/Black) is the color model used by
              physical printers. Unlike RGB which adds light, CMYK{' '}
              <strong>subtracts light</strong> by absorbing specific wavelengths via ink.
            </p>

            <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
              <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Important: CSS does not natively support CMYK
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm">
                The web works in RGB color space. If you receive CMYK values from a
                print designer, you must convert to RGB before using them in CSS.
                The conversion is lossy — some CMYK colors (especially vivid cyans and
                magentas) cannot be exactly reproduced on screen.
              </p>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* CMYK to RGB conversion formula */
C = 0.46, M = 0.64, Y = 0, K = 0.06

R = 255 × (1 - C) × (1 - K)
  = 255 × 0.54 × 0.94 = 129

G = 255 × (1 - M) × (1 - K)
  = 255 × 0.36 × 0.94 = 86

B = 255 × (1 - Y) × (1 - K)
  = 255 × 1.00 × 0.94 = 240

Result: rgb(129, 86, 240) → #8156f0`}
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
              6. OKLCH — The Modern CSS Color Level 4 Format
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              OKLCH is the newest and most powerful color format for CSS, part of the
              CSS Color Level 4 specification. It stands for{' '}
              <strong>OK-LCH: Lightness, Chroma, Hue</strong> in the Oklab perceptual
              color space.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              The key difference from HSL: OKLCH is <strong>perceptually uniform</strong>.
              When you change the L value by 10%, the perceived lightness actually changes
              by the same amount regardless of hue. This solves HSL's biggest problem.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* OKLCH syntax */
oklch(L C H)
oklch(L C H / alpha)

/* L: 0 (black) to 1 (white) — or 0% to 100% */
/* C: chroma 0 (gray) to ~0.4 (vivid) */
/* H: hue angle 0–360° */

/* Example: vivid indigo */
color: oklch(0.55 0.22 264);

/* Generating a perceptually uniform scale is trivial: */
.brand-100 { color: oklch(0.95 0.10 264); }
.brand-300 { color: oklch(0.80 0.15 264); }
.brand-500 { color: oklch(0.55 0.22 264); }
.brand-700 { color: oklch(0.38 0.18 264); }
.brand-900 { color: oklch(0.22 0.12 264); }

/* Wide-gamut colors (P3, Rec2020 displays) */
color: oklch(0.65 0.35 264);  /* beyond sRGB — vivid on modern screens */`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              OKLCH has excellent browser support (Chrome 111+, Firefox 113+, Safari 15.4+)
              and is the recommended format for new CSS projects in 2026 and beyond.
            </p>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              7. Quick Conversion Formulas
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Here are the key conversion formulas you'll need most often:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* ── HEX → RGB ─────────────────────────────── */
hex = "#2a56f0"
R = parseInt(hex.slice(1,3), 16)  // 42
G = parseInt(hex.slice(3,5), 16)  // 86
B = parseInt(hex.slice(5,7), 16)  // 240

/* ── RGB → HEX ─────────────────────────────── */
hex = '#' + [R, G, B]
  .map(v => v.toString(16).padStart(2, '0'))
  .join('')   // "#2a56f0"

/* ── RGB → HSL ─────────────────────────────── */
r = R/255, g = G/255, b = B/255
max = Math.max(r,g,b), min = Math.min(r,g,b)
L = (max + min) / 2

if (max === min) { H = S = 0 }
else {
  d = max - min
  S = L > 0.5 ? d/(2-max-min) : d/(max+min)
  switch(max) {
    case r: H = ((g-b)/d + (g<b?6:0)) / 6; break
    case g: H = ((b-r)/d + 2) / 6; break
    case b: H = ((r-g)/d + 4) / 6; break
  }
}
// H×360, S×100%, L×100%  →  hsl(221, 85%, 55%)

/* ── HSL → RGB ─────────────────────────────── */
// Use CSS color-mix() or a library like chroma-js
// for production; manual formula is error-prone`}
            </pre>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)] dark:text-white">
                8. Which Format to Use Where
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-indigo-100 dark:bg-indigo-800/40">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Context</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Recommended</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-100 dark:divide-indigo-800/30">
                    {[
                      ['CSS variables / design tokens', 'OKLCH or HSL', 'Easy to manipulate programmatically'],
                      ['Static CSS colors', 'HEX', 'Shortest, most widely understood'],
                      ['CSS with opacity', 'rgb() / oklch() + alpha', 'Inline alpha channel support'],
                      ['CSS animations / transitions', 'HSL or OKLCH', 'Smooth interpolation'],
                      ['Canvas / WebGL', 'RGB (0–255)', 'APIs expect numeric channels'],
                      ['SVG fill / stroke', 'HEX or rgb()', 'Best SVG compatibility'],
                      ['Print / PDF export', 'CMYK', 'Printer color model'],
                      ['Design tokens (Figma/Style Dict)', 'HEX or OKLCH', 'Universal toolchain support'],
                      ['Wide-gamut P3 displays', 'OKLCH', 'Only format that accesses P3 gamut in CSS'],
                    ].map(([ctx, fmt, why]) => (
                      <tr key={ctx} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-800/20">
                        <td className="px-4 py-3 text-[var(--text-secondary)] dark:text-gray-300 font-medium">{ctx}</td>
                        <td className="px-4 py-3">
                          <code className="text-indigo-700 dark:text-indigo-300 text-xs bg-indigo-100 dark:bg-indigo-800/40 px-2 py-0.5 rounded">
                            {fmt}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-secondary)] dark:text-gray-400 text-xs">{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              Convert Any Color Format Instantly
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Paste any HEX, RGB, HSL, CMYK, or OKLCH value into ColorPeek's converter
              and get all formats at once — with one-click copy for each.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/color-converter"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Open Color Converter →
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

export default HexToRGBGuide;
