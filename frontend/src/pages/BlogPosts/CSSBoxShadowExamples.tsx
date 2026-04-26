import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import {
  FaCalendar,
  FaClock,
  FaTags,
  FaShare,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaArrowUp,
  FaCode,
  FaLightbulb,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const CSSBoxShadowExamples = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: '10 CSS Box Shadow Examples Every Developer Should Know',
    description:
      'Master CSS box shadows with 10 practical examples - from basic drops to neumorphism and glows. Includes copy-paste code snippets for every technique.',
    author: 'Alex Rivera',
    date: 'April 22, 2026',
    readTime: '8 min read',
    tags: ['CSS', 'Web Design', 'Frontend', 'Box Shadow', 'UI Effects'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop&fm=webp',
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
          href="https://color-peek.com/blog/css-box-shadow-examples"
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
          content="css box shadow examples, box shadow css, css shadow effects, drop shadow css, box shadow generator, css box shadow tutorial"
        />
      </Helmet>

      <Navbar onColorSelect={() => {}} />

      {/* Hero Section */}
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          {/* What you'll learn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center">
              <FaLightbulb className="mr-2" /> What you'll learn
            </h2>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] dark:text-gray-300">
              <li>The full <code>box-shadow</code> syntax and every parameter explained</li>
              <li>10 production-ready shadow techniques with copy-paste CSS</li>
              <li>Material Design elevation system recreated in pure CSS</li>
              <li>Neumorphism, glow effects, and colored shadows</li>
              <li>How to layer multiple shadows for depth and realism</li>
              <li>When to reach for <code>filter: drop-shadow</code> instead</li>
            </ul>
          </motion.div>

          {/* Syntax primer */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaCode className="mr-3 text-indigo-500" />
                Understanding the <code>box-shadow</code> Syntax
              </h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Before diving into examples, let's lock down the syntax. Every
                <code> box-shadow</code> value follows this pattern:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`box-shadow: [inset] <offset-x> <offset-y> [blur-radius] [spread-radius] <color>;

/* Multiple shadows are comma-separated */
box-shadow: shadow1, shadow2, shadow3;`}
              </pre>
              <ul className="mt-4 space-y-2 text-[var(--text-secondary)] dark:text-gray-300 text-sm">
                <li><strong>offset-x / offset-y</strong> - horizontal and vertical displacement (can be negative)</li>
                <li><strong>blur-radius</strong> - how soft/diffuse the shadow is (0 = hard edge)</li>
                <li><strong>spread-radius</strong> - expands (+) or contracts (−) the shadow before blurring</li>
                <li><strong>inset</strong> - renders the shadow inside the element rather than outside</li>
              </ul>
            </div>
          </motion.section>

          {/* Example 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">1. Basic Drop Shadow</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                The workhorse of UI design. A simple offset shadow lifts an element
                off the page and creates an immediate sense of hierarchy.
              </p>
              <div className="flex justify-center my-6">
                <div
                  className="w-48 h-24 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-sm font-semibold text-[var(--text-secondary)] dark:text-gray-200"
                  style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)' }}
                >
                  Basic Shadow
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -2px rgba(0, 0, 0, 0.1);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">2. Layered Multiple Shadows</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Stacking several shadows with different blur radii produces a far more
                natural, physically accurate result. This is the secret behind polished
                design systems.
              </p>
              <div className="flex justify-center my-6">
                <div
                  className="w-48 h-24 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-sm font-semibold text-[var(--text-secondary)] dark:text-gray-200"
                  style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 8px 16px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07)' }}
                >
                  Layered Shadow
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Five-layer natural shadow */
.card-deep {
  box-shadow:
    0 1px 2px  rgba(0, 0, 0, 0.07),
    0 2px 4px  rgba(0, 0, 0, 0.07),
    0 4px 8px  rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">3. Inner Shadow (Inset)</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                The <code>inset</code> keyword flips the shadow inside the element,
                perfect for pressed-button states, input wells, or embossed UI elements.
              </p>
              <div className="flex justify-center my-6">
                <div
                  className="w-48 h-24 bg-gray-100 dark:bg-gray-600 rounded-xl flex items-center justify-center text-sm font-semibold text-[var(--text-secondary)] dark:text-gray-200"
                  style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)' }}
                >
                  Inset Shadow
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Pressed / input well effect */
.input-field {
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Combining outer + inner */
.embossed {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(255, 255, 255, 0.6);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">4. Colored Shadows</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Replacing black with a hue creates vivid, branded shadows that make
                colored buttons and cards feel especially vibrant. Use low opacity to
                keep it tasteful.
              </p>
              <div className="flex justify-center gap-6 my-6 flex-wrap">
                <div
                  className="w-36 h-20 bg-indigo-500 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
                  style={{ boxShadow: '0 8px 24px rgba(99,102,241,0.5)' }}
                >
                  Indigo
                </div>
                <div
                  className="w-36 h-20 bg-pink-500 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
                  style={{ boxShadow: '0 8px 24px rgba(236,72,153,0.5)' }}
                >
                  Pink
                </div>
                <div
                  className="w-36 h-20 bg-emerald-500 rounded-xl flex items-center justify-center text-sm font-semibold text-white"
                  style={{ boxShadow: '0 8px 24px rgba(16,185,129,0.5)' }}
                >
                  Emerald
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.btn-indigo {
  background: #6366f1;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
}

.btn-pink {
  background: #ec4899;
  box-shadow: 0 8px 24px rgba(236, 72, 153, 0.5);
}

.btn-emerald {
  background: #10b981;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">5. Material Design Elevation Shadows</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Google's Material Design defines a precise elevation scale using paired
                shadows (key light + ambient light). Here are the most useful levels:
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Elevation 1 - resting card */
.elevation-1 {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24);
}

/* Elevation 2 - hovered card */
.elevation-2 {
  box-shadow:
    0 3px 6px rgba(0,0,0,0.15),
    0 2px 4px rgba(0,0,0,0.12);
}

/* Elevation 3 - dialogs / drawers */
.elevation-3 {
  box-shadow:
    0 10px 20px rgba(0,0,0,0.15),
    0 3px 6px rgba(0,0,0,0.10);
}

/* Elevation 4 - modals */
.elevation-4 {
  box-shadow:
    0 15px 25px rgba(0,0,0,0.15),
    0 5px 10px rgba(0,0,0,0.05);
}

/* Elevation 5 - highest priority */
.elevation-5 {
  box-shadow:
    0 20px 40px rgba(0,0,0,0.2);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">6. Neumorphism Effect</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Neumorphism (soft UI) uses two shadows - one light, one dark - cast in
                opposite directions to simulate physical extrusion from the background.
                The background color of the element must match the page background.
              </p>
              <div className="flex justify-center my-6">
                <div
                  className="w-48 h-24 rounded-2xl flex items-center justify-center text-sm font-semibold text-[var(--text-muted)]"
                  style={{ background: '#e0e5ec', boxShadow: '9px 9px 16px #b8bec7, -9px -9px 16px #ffffff' }}
                >
                  Neumorphic
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Page background: #e0e5ec */
.neumorphic {
  background: #e0e5ec;
  border-radius: 16px;
  box-shadow:
     9px  9px 16px #b8bec7,  /* dark shadow */
    -9px -9px 16px #ffffff;  /* light shadow */
}

/* Pressed / active state */
.neumorphic:active {
  box-shadow:
    inset  5px  5px 10px #b8bec7,
    inset -5px -5px 10px #ffffff;
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">7. Glow Effect</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                A glow is simply a zero-offset, high-spread colored shadow. It works
                beautifully on dark backgrounds for interactive elements, notifications,
                or hero CTAs.
              </p>
              <div className="flex justify-center gap-6 my-6 flex-wrap">
                <div
                  className="w-36 h-14 bg-cyan-400 rounded-full flex items-center justify-center text-sm font-bold text-[var(--text-primary)]"
                  style={{ boxShadow: '0 0 20px 6px rgba(34,211,238,0.6)' }}
                >
                  Cyan Glow
                </div>
                <div
                  className="w-36 h-14 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ boxShadow: '0 0 30px 8px rgba(168,85,247,0.55)' }}
                >
                  Purple Glow
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Cyan glow */
.glow-cyan {
  background: #22d3ee;
  box-shadow: 0 0 20px 6px rgba(34, 211, 238, 0.6);
}

/* Purple glow */
.glow-purple {
  background: #a855f7;
  box-shadow: 0 0 30px 8px rgba(168, 85, 247, 0.55);
}

/* Pulsing glow animation */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px 2px rgba(99,102,241,0.4); }
  50%       { box-shadow: 0 0 25px 8px rgba(99,102,241,0.7); }
}
.glow-animated {
  animation: pulse-glow 2s ease-in-out infinite;
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 8 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">8. Hard / Cut-Out Shadow</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Set blur to <code>0</code> for a completely sharp shadow. Popular in
                retro design, brutalist UI, and comic-book-style components.
              </p>
              <div className="flex justify-center my-6">
                <div
                  className="w-48 h-20 bg-yellow-300 border-2 border-gray-900 rounded-xl flex items-center justify-center text-sm font-bold text-[var(--text-primary)]"
                  style={{ boxShadow: '6px 6px 0 #111827' }}
                >
                  Brutalist Card
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.brutalist-card {
  background: #fde047;
  border: 2px solid #111827;
  border-radius: 12px;
  box-shadow: 6px 6px 0 #111827; /* no blur! */
}

.brutalist-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #111827;
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 9 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">9. Text Shadow</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                <code>text-shadow</code> shares a similar syntax (minus spread-radius)
                and adds depth or legibility to headings. For SVG icons and irregular
                shapes, use <code>filter: drop-shadow()</code> instead - it respects
                the actual alpha channel.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Basic text shadow */
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Glowing text */
.glow-text {
  color: #fff;
  text-shadow:
    0 0 10px rgba(99, 102, 241, 0.8),
    0 0 20px rgba(99, 102, 241, 0.5),
    0 0 40px rgba(99, 102, 241, 0.3);
}

/* SVG / irregular shape - use filter instead */
.icon {
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.4));
}`}
              </pre>
            </div>
          </motion.section>

          {/* Example 10 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">10. Hover Transition Shadow</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Animating between two shadow states on hover communicates interactivity
                and provides delightful feedback. Always pair with a subtle
                <code> transform</code> for maximum effect.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.interactive-card {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 1px 2px rgba(0,0,0,0.24);
  transform: translateY(0);
  transition:
    box-shadow 0.3s ease,
    transform   0.3s ease;
}

.interactive-card:hover {
  box-shadow:
    0 14px 28px rgba(0,0,0,0.25),
    0  5px 10px rgba(0,0,0,0.22);
  transform: translateY(-4px);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8"
          >
            <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">Key Takeaways</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
              <li>Layer multiple shadows for natural, physically accurate depth</li>
              <li>Match shadow color to the element color for vibrant colored shadows</li>
              <li>Use <code>inset</code> for pressed states and input wells</li>
              <li>Always transition <code>box-shadow</code> with <code>transform</code> on hover</li>
              <li>Neumorphism requires the element background to match the page background</li>
              <li>For SVGs and PNG icons, use <code>filter: drop-shadow()</code> not <code>box-shadow</code></li>
            </ul>
          </motion.div>

          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <FaShare className="mr-2" />
              Share this article
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
            <h3 className="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">
              Generate Box Shadows Visually
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Stop guessing values. ColorPeek's interactive tools let you dial in the
              perfect shadow and copy the CSS instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/box-shadow"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Box Shadow Generator
              </a>
              <a
                href="/glass-generator"
                className="inline-flex items-center px-6 py-3 border border-indigo-400 text-indigo-600 dark:text-indigo-300 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Glass Effect Generator
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

export default CSSBoxShadowExamples;
