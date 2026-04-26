import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const WebTypographyGuide = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "Perfect Web Typography: How to Build a Modular Type Scale",
    description:
      "Learn why a modular type scale creates visual harmony in web design. Understand scale ratios, how to calculate font sizes mathematically, and how to implement a type scale in CSS, SCSS, and Tailwind.",
    author: "Sarah Chen",
    date: "April 22, 2026",
    readTime: "10 min read",
    tags: ["Typography", "Web Design", "CSS", "Type Scale", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=2070&auto=format&fit=crop",
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

  // Perfect Fourth (1.333) scale from 16px base
  const typeScale = [
    { name: 'xs',  step: -2, px: '9px',   rem: '0.563rem', use: 'Fine print, legal text' },
    { name: 'sm',  step: -1, px: '12px',  rem: '0.75rem',  use: 'Captions, labels, helper text' },
    { name: 'base',step:  0, px: '16px',  rem: '1rem',     use: 'Body text, paragraphs' },
    { name: 'lg',  step:  1, px: '21px',  rem: '1.333rem', use: 'Lead paragraphs, large body' },
    { name: 'xl',  step:  2, px: '28px',  rem: '1.777rem', use: 'H4, section subheadings' },
    { name: '2xl', step:  3, px: '38px',  rem: '2.369rem', use: 'H3, card titles' },
    { name: '3xl', step:  4, px: '51px',  rem: '3.157rem', use: 'H2, page section headings' },
    { name: '4xl', step:  5, px: '68px',  rem: '4.209rem', use: 'H1, hero headings' },
    { name: '5xl', step:  6, px: '90px',  rem: '5.61rem',  use: 'Display, large hero' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link
          rel="canonical"
          href="https://color-peek.com/blog/web-typography-type-scale-guide"
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
          content="modular type scale, web typography, css font size scale, typographic hierarchy, tailwind font size, type scale ratios, responsive typography"
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
            Pick any design that feels polished and professional - the text sizes are
            almost certainly following a mathematical system. A modular type scale
            takes a single base size and a ratio, and generates every heading and body
            size automatically. The result is visual harmony that "just feels right."
            Here's how to build one from scratch.
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
              1. What Is a Modular Type Scale (and Why Random Font Sizes Look Bad)
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              A <strong>modular type scale</strong> is a set of font sizes derived from
              a base size multiplied repeatedly by a fixed ratio. Every size in the
              scale has a mathematical relationship to every other size - creating visual
              rhythm and hierarchy that feels intentional.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              When designers choose font sizes arbitrarily - say, 13px for captions,
              17px for body, 22px for subheadings, 31px for headings - each size is
              correct in isolation but the <em>spacing between sizes</em> feels
              inconsistent. The visual step from body to subheading doesn't match the
              step from subheading to heading, creating subtle visual noise.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                <p className="font-semibold text-red-700 dark:text-red-300 mb-3 text-sm">Arbitrary sizes (feels uneven)</p>
                <div className="space-y-2">
                  <div className="text-gray-800 dark:text-gray-200" style={{ fontSize: '31px', lineHeight: 1.2 }}>Heading</div>
                  <div className="text-[var(--text-secondary)] dark:text-gray-300" style={{ fontSize: '22px', lineHeight: 1.3 }}>Subheading</div>
                  <div className="text-[var(--text-secondary)] dark:text-gray-400" style={{ fontSize: '17px', lineHeight: 1.5 }}>Body text paragraph goes here.</div>
                  <div className="text-[var(--text-muted)] dark:text-[var(--text-muted)]" style={{ fontSize: '13px' }}>Caption text</div>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-3 text-sm">Modular scale 1.333 (harmonious)</p>
                <div className="space-y-2">
                  <div className="text-gray-800 dark:text-gray-200" style={{ fontSize: '28.43px', lineHeight: 1.2 }}>Heading</div>
                  <div className="text-[var(--text-secondary)] dark:text-gray-300" style={{ fontSize: '21.33px', lineHeight: 1.3 }}>Subheading</div>
                  <div className="text-[var(--text-secondary)] dark:text-gray-400" style={{ fontSize: '16px', lineHeight: 1.5 }}>Body text paragraph goes here.</div>
                  <div className="text-[var(--text-muted)] dark:text-[var(--text-muted)]" style={{ fontSize: '12px' }}>Caption text</div>
                </div>
              </div>
            </div>
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
              2. Popular Scale Ratios
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              The ratio determines how dramatic the size jumps are. Smaller ratios
              (1.067, 1.125) create subtle hierarchy - good for text-heavy apps. Larger
              ratios (1.414, 1.618) create bold, expressive headings - good for
              marketing sites.
            </p>

            <div className="space-y-4">
              {[
                {
                  name: 'Minor Second',
                  ratio: '1.067',
                  musicRef: 'Half-step in music',
                  desc: 'Extremely subtle. Good for dense data UIs where hierarchy must be gentle.',
                  sizes: ['15px', '16px', '17px', '18px', '19px'],
                  tone: 'subdued',
                },
                {
                  name: 'Major Second',
                  ratio: '1.125',
                  musicRef: 'Whole-step in music',
                  desc: 'Soft, readable. Popular for long-form content sites and documentation.',
                  sizes: ['14px', '16px', '18px', '20px', '23px'],
                  tone: 'gentle',
                },
                {
                  name: 'Minor Third',
                  ratio: '1.2',
                  musicRef: 'Three half-steps',
                  desc: 'Balanced and versatile. The most common choice for web apps.',
                  sizes: ['13px', '16px', '19px', '23px', '28px'],
                  tone: 'balanced',
                },
                {
                  name: 'Perfect Fourth',
                  ratio: '1.333',
                  musicRef: 'Five half-steps (4th interval)',
                  desc: 'Clear hierarchy, expressive headings. Great for marketing and landing pages.',
                  sizes: ['12px', '16px', '21px', '28px', '38px'],
                  tone: 'expressive',
                },
                {
                  name: 'Golden Ratio',
                  ratio: '1.618',
                  musicRef: 'φ - the golden ratio',
                  desc: 'Very dramatic jumps. Use sparingly - display headings stand out boldly.',
                  sizes: ['10px', '16px', '26px', '42px', '67px'],
                  tone: 'dramatic',
                },
              ].map(({ name, ratio, musicRef, desc, sizes, tone }) => (
                <div key={name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="text-lg font-bold text-[var(--text-primary)] dark:text-white">{name}</span>
                    <code className="text-indigo-600 dark:text-indigo-400 font-mono text-sm bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                      ×{ratio}
                    </code>
                    <span className="text-xs text-[var(--text-muted)] dark:text-gray-400">({musicRef})</span>
                  </div>
                  <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm mb-3">{desc}</p>
                  <div className="flex items-end gap-3 overflow-x-auto pb-1">
                    {sizes.map((size, i) => (
                      <span
                        key={i}
                        className="flex-shrink-0 font-bold text-indigo-500 dark:text-indigo-400"
                        style={{ fontSize: size, lineHeight: 1 }}
                      >
                        Aa
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 dark:text-[var(--text-muted)] mt-2">
                    Approximate sizes: {sizes.join(' → ')}
                  </p>
                </div>
              ))}
            </div>
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
              3. How to Calculate a Scale from a Base
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              The formula is simple. Given a base size <em>b</em> and a ratio <em>r</em>,
              the size at step <em>n</em> is:
            </p>

            <div className="my-6 p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700 text-center">
              <p className="font-mono text-2xl text-indigo-700 dark:text-indigo-300 font-bold">
                size(n) = b × r<sup>n</sup>
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-400 text-sm mt-2">
                n = 0 is your base size. Positive n = larger. Negative n = smaller.
              </p>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Base: 16px | Ratio: Perfect Fourth (1.333) */

Step -2 = 16 × 1.333^(-2) = 16 ÷ 1.777 = 9.0px  → xs
Step -1 = 16 × 1.333^(-1) = 16 ÷ 1.333 = 12.0px → sm
Step  0 = 16 × 1.333^0    = 16 × 1     = 16.0px → base ← body text
Step +1 = 16 × 1.333^1    = 16 × 1.333 = 21.3px → lg
Step +2 = 16 × 1.333^2    = 16 × 1.777 = 28.4px → xl
Step +3 = 16 × 1.333^3    = 16 × 2.369 = 37.9px → 2xl
Step +4 = 16 × 1.333^4    = 16 × 3.157 = 50.5px → 3xl
Step +5 = 16 × 1.333^5    = 16 × 4.209 = 67.3px → 4xl
Step +6 = 16 × 1.333^6    = 16 × 5.610 = 89.8px → 5xl`}
            </pre>

            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              In practice, you round to whole or half pixels. ColorPeek's{' '}
              <a href="/type-scale" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                Type Scale Generator
              </a>{' '}
              does this calculation automatically - you pick your base and ratio, and it
              outputs a complete scale you can copy.
            </p>
          </motion.div>

          {/* Section 4 - Scale Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[var(--text-primary)] dark:text-white">
                4. Perfect Fourth Scale: xs through 5xl
              </h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm mb-6">
                Base: 16px | Ratio: 1.333 (Perfect Fourth)
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-indigo-100 dark:bg-indigo-800/40">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Step</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">px</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">rem</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Preview</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] dark:text-gray-200">Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-100 dark:divide-indigo-800/30">
                    {typeScale.map(({ name, step, px, rem, use }) => (
                      <tr key={name} className="hover:bg-indigo-50/50 dark:hover:bg-indigo-800/20">
                        <td className="px-4 py-3">
                          <code className="text-indigo-700 dark:text-indigo-300 font-mono text-xs bg-indigo-100 dark:bg-indigo-800/40 px-2 py-0.5 rounded">
                            {name}
                          </code>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-secondary)] dark:text-gray-400 font-mono text-xs">
                          {step >= 0 ? `+${step}` : step}
                        </td>
                        <td className="px-4 py-3 font-mono text-[var(--text-secondary)] dark:text-gray-300 text-xs">{px}</td>
                        <td className="px-4 py-3 font-mono text-[var(--text-secondary)] dark:text-gray-300 text-xs">{rem}</td>
                        <td className="px-4 py-3">
                          <span
                            className="font-bold text-[var(--text-primary)] dark:text-gray-200 leading-none"
                            style={{ fontSize: px }}
                          >
                            Aa
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[var(--text-muted)] dark:text-gray-400 text-xs">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
              5. Implementing in CSS Custom Properties
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Store your type scale as CSS custom properties in <code>:root</code>.
              This makes theme switching (larger/smaller base for accessibility) trivial.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Perfect Fourth scale - base 16px / ratio 1.333 */
:root {
  --font-size-xs:   0.563rem;   /*  ~9px  */
  --font-size-sm:   0.750rem;   /* ~12px  */
  --font-size-base: 1rem;       /*  16px  */
  --font-size-lg:   1.333rem;   /* ~21px  */
  --font-size-xl:   1.777rem;   /* ~28px  */
  --font-size-2xl:  2.369rem;   /* ~38px  */
  --font-size-3xl:  3.157rem;   /* ~51px  */
  --font-size-4xl:  4.209rem;   /* ~67px  */
  --font-size-5xl:  5.610rem;   /* ~90px  */
}

/* Usage */
body        { font-size: var(--font-size-base); }
h1          { font-size: var(--font-size-4xl); }
h2          { font-size: var(--font-size-3xl); }
h3          { font-size: var(--font-size-2xl); }
h4          { font-size: var(--font-size-xl);  }
.lead       { font-size: var(--font-size-lg);  }
.caption    { font-size: var(--font-size-sm);  }
.legal      { font-size: var(--font-size-xs);  }

/* Accessibility override - boost base for vision impairment */
@media (prefers-larger-text) {
  :root { font-size: 18px; } /* entire scale scales proportionally */
}`}
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
              6. Implementing in Tailwind Config
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Override Tailwind's default <code>fontSize</code> scale with your modular
              values. Each entry accepts a tuple of <code>[size, lineHeight]</code> for
              bundled line-height defaults.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`// tailwind.config.js
module.exports = {
  theme: {
    fontSize: {
      xs:   ['0.563rem', { lineHeight: '1rem' }],
      sm:   ['0.750rem', { lineHeight: '1.25rem' }],
      base: ['1rem',     { lineHeight: '1.6rem' }],
      lg:   ['1.333rem', { lineHeight: '1.75rem' }],
      xl:   ['1.777rem', { lineHeight: '2rem' }],
      '2xl':['2.369rem', { lineHeight: '2.5rem' }],
      '3xl':['3.157rem', { lineHeight: '1.2' }],
      '4xl':['4.209rem', { lineHeight: '1.1' }],
      '5xl':['5.610rem', { lineHeight: '1' }],
    },
  },
};

/* Usage in JSX */
// <h1 className="text-4xl font-bold">Hero Heading</h1>
// <p className="text-base leading-relaxed">Body text...</p>
// <span className="text-xs text-[var(--text-muted)]">Caption</span>`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mt-4">
              Notice line-height values: smaller heading sizes need relative line-heights
              (1.2, 1.1, 1.0) while body text needs more generous spacing (1.5–1.6).
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
              7. Responsive Type Scales with clamp()
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              The CSS <code>clamp()</code> function enables truly fluid typography -
              font sizes that smoothly scale between a minimum and maximum value based on
              viewport width, without any breakpoints.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* clamp(min, preferred, max) */
/* preferred = viewport-relative value */

:root {
  /* H1: 28px on mobile → scales to 68px on 1280px viewport */
  --font-size-4xl: clamp(1.75rem, 2.5vw + 1rem, 4.25rem);

  /* H2: 22px mobile → 51px desktop */
  --font-size-3xl: clamp(1.375rem, 2vw + 0.875rem, 3.2rem);

  /* H3: 18px mobile → 38px desktop */
  --font-size-2xl: clamp(1.125rem, 1.5vw + 0.75rem, 2.375rem);

  /* Body: fixed at 1rem, no scaling needed */
  --font-size-base: 1rem;
}

/* The formula to calculate the preferred value:
   preferred = (maxSize - minSize) / (maxVW - minVW) × 100vw
             + (minSize - slope × minVW)

   Or use a tool like utopia.fyi or ColorPeek's Type Scale generator */`}
            </pre>
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
              <p className="text-amber-800 dark:text-amber-200 text-sm font-semibold mb-1">
                Pro tip: Only clamp headings, not body text
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm">
                Body text (base, sm, xs) should stay fixed at their defined sizes for
                readability. Fluid scaling is most impactful on headings (xl and above)
                where the visual weight matters more on different screen sizes.
              </p>
            </div>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] dark:text-white">
              8. Pairing Type Scale with Line-Height and Letter-Spacing
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
              Font size alone doesn't create great typography. Line-height and
              letter-spacing work together with font size to achieve optimal readability.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Size Role</th>
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Line Height</th>
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Letter Spacing</th>
                    <th className="px-4 py-2 text-left font-semibold text-[var(--text-secondary)] dark:text-gray-200">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {[
                    ['Display / 5xl', '1.0–1.1', '-0.03em to -0.04em', 'Tight tracking at large sizes avoids gaps'],
                    ['H1 / 4xl', '1.1–1.2', '-0.02em to -0.03em', 'Headings need tight leading'],
                    ['H2–H3 / 2xl–3xl', '1.2–1.3', '-0.01em to -0.02em', 'Slightly looser for readability'],
                    ['H4–Lead / lg–xl', '1.4–1.5', '0em', 'Neutral spacing'],
                    ['Body / base', '1.5–1.7', '0em to 0.01em', 'Maximum comfort for long reads'],
                    ['Caption / xs–sm', '1.4–1.5', '0.01em to 0.02em', 'Small text needs looser tracking'],
                  ].map(([role, lh, ls, why]) => (
                    <tr key={role} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-2 font-medium text-[var(--text-secondary)] dark:text-gray-300 text-xs">{role}</td>
                      <td className="px-4 py-2 font-mono text-indigo-600 dark:text-indigo-400 text-xs">{lh}</td>
                      <td className="px-4 py-2 font-mono text-teal-600 dark:text-teal-400 text-xs">{ls}</td>
                      <td className="px-4 py-2 text-[var(--text-muted)] dark:text-gray-400 text-xs">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Complete heading system */
h1 {
  font-size: var(--font-size-4xl);    /* 67px */
  line-height: 1.1;
  letter-spacing: -0.025em;
  font-weight: 800;
}

h2 {
  font-size: var(--font-size-3xl);    /* 51px */
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 700;
}

/* Body - optimized for long-form reading */
body {
  font-size: var(--font-size-base);   /* 16px */
  line-height: 1.65;
  letter-spacing: 0.01em;
  font-weight: 400;
}

/* Small print */
.caption {
  font-size: var(--font-size-xs);     /* 9px */
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-weight: 500;                   /* slightly bolder compensates for small size */
}`}
            </pre>
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
              Generate Your Type Scale in Seconds
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Pick a base size, choose a ratio, and instantly get a complete type scale
              with CSS variables, Tailwind config, and SCSS output - plus fluid{' '}
              <code>clamp()</code> values for responsive typography.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/type-scale"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Open Type Scale Generator →
              </a>
              <a
                href="/font-pairing"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-600 transition-colors"
              >
                Find Font Pairings
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

export default WebTypographyGuide;
