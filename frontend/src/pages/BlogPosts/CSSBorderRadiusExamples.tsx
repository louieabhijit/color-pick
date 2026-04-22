import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const CSSBorderRadiusExamples = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: "CSS Border Radius: 12 Creative Shapes, Tricks & Examples",
    description:
      "Go beyond rounded corners. Learn how to create pills, organic blobs, asymmetric cards, and creative shapes using CSS border-radius. Includes copy-paste code for 12 examples.",
    author: "Alex Rivera",
    date: "April 22, 2026",
    readTime: "8 min read",
    tags: ["CSS", "Border Radius", "Web Design", "Shapes", "Frontend"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2070&auto=format&fit=crop",
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
          href="https://color-peek.com/blog/css-border-radius-examples"
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
          content="css border radius examples, border radius shapes, organic shape css, pill button css, asymmetric border radius, css rounded corners tricks"
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
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
          >
            Most developers use <code>border-radius</code> for one thing: rounded
            corners on cards and buttons. But <code>border-radius</code> is actually
            one of CSS's most expressive properties — capable of producing circles,
            pills, organic blobs, teardrops, leaves, and asymmetric shapes that bring
            modern UI design to life. This guide breaks down the full syntax and
            delivers 12 ready-to-use shape recipes.
          </motion.p>

          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              1. Beyond <code>border-radius: 8px</code> — The Full Syntax
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The shorthand <code>border-radius</code> accepts up to 8 values separated
              by a forward slash — 4 for the <strong>horizontal radii</strong> and 4 for
              the <strong>vertical radii</strong> of each corner. This is what enables
              elliptical (egg-shaped) corners and organic blobs.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* 1 value: all 4 corners equal */
border-radius: 16px;

/* 2 values: top-left/bottom-right | top-right/bottom-left */
border-radius: 16px 8px;

/* 4 values: top-left | top-right | bottom-right | bottom-left */
border-radius: 16px 8px 24px 4px;

/* The slash syntax — horizontal / vertical radii */
/* Each corner can have a different ellipse shape */
border-radius: 40px 20px 50px 30px / 20px 40px 30px 50px;
              /*  ←── horizontal ──→   ←──── vertical ────→ */`}
            </pre>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              The 4 values in order are always: <strong>top-left → top-right →
              bottom-right → bottom-left</strong> (clockwise from top-left). The values
              before the slash control horizontal ellipse radius; values after control
              vertical ellipse radius.
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              2. Individual Corner Control
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Each corner has its own longhand property. Each longhand also accepts two
              values — horizontal and vertical radii separated by a space:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Longhand individual corner properties */
border-top-left-radius:     16px;        /* circular */
border-top-right-radius:    16px 32px;   /* elliptical */
border-bottom-right-radius: 4px;
border-bottom-left-radius:  4px;

/* Equivalent shorthand */
border-radius: 16px 16px 4px 4px / 32px 32px 4px 4px;

/* Useful pattern: sharp bottom corners, rounded top */
.card-header {
  border-top-left-radius:  16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}`}
            </pre>
          </motion.div>

          {/* Section 3 — 12 Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              3. 12 Creative Shape Examples
            </h2>

            {/* Shape Grid */}
            <div className="grid gap-6">

              {/* 1. Circle */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-24 h-24 bg-indigo-500"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Circle</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      50% on a square element. The classic avatar shape.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 2. Pill */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 flex items-center">
                    <div
                      className="px-6 py-3 bg-indigo-500 text-white text-sm font-semibold"
                      style={{ borderRadius: '9999px' }}
                    >
                      Pill Button
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Pill / Capsule</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      A very large radius that always exceeds the element's height — creating
                      a fully rounded "pill". Used for tags and badge buttons.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.pill {
  border-radius: 9999px; /* or 999em */
  padding: 0.5rem 1.5rem;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. Squircle */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-24 h-24 bg-violet-500"
                      style={{ borderRadius: '30%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Squircle (App Icon Shape)</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      The shape used by iOS app icons — between a square and a circle.
                      CSS can approximate it with a large percentage radius.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.squircle {
  width: 96px;
  height: 96px;
  border-radius: 30%;
  /* For a truer squircle, use clip-path with SVG */
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. Organic Blob */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-24 h-24 bg-pink-400"
                      style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">4. Organic Blob</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Achieved with the slash syntax. Four different horizontal radii
                      and four different vertical radii create an asymmetric, fluid shape.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.blob {
  border-radius: 60% 40% 30% 70%
               / 60% 30% 70% 40%;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 5. Asymmetric Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-20 bg-teal-400"
                      style={{ borderRadius: '24px 4px 24px 4px' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">5. Asymmetric Card</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Diagonal corners rounded, giving cards a dynamic, playful feel.
                      Great for feature highlights or pricing cards.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.asymmetric-card {
  border-radius: 24px 4px 24px 4px;
  /* top-left=24, top-right=4,
     bottom-right=24, bottom-left=4 */
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 6. Leaf Shape */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-24 h-24 bg-green-400"
                      style={{ borderRadius: '0% 100% 100% 0% / 50% 50% 50% 50%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">6. Leaf Shape</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      A single pointed corner and a rounded side creates a botanical leaf.
                      Use for eco-brands, nature-themed UIs, or decorative elements.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.leaf {
  width: 96px;
  height: 96px;
  border-radius: 0% 100% 100% 0%
               / 50% 50% 50% 50%;
  transform: rotate(45deg); /* optional */
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 7. Speech Bubble */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div
                        className="w-32 h-16 bg-blue-400 flex items-center justify-center text-white text-xs font-medium"
                        style={{ borderRadius: '16px 16px 16px 4px' }}
                      >
                        Hello!
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">7. Speech Bubble Shape</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      A chat bubble effect by setting one corner to near-zero. The
                      "tail" corner is bottom-left (4px) while all others are rounded.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.speech-bubble {
  border-radius: 16px 16px 16px 4px;
  /* Add a ::after for the tail triangle */
}
.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -8px; left: 0;
  border: 8px solid transparent;
  border-top-color: currentColor;
  border-right: 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 8. Wave Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-20 bg-cyan-400"
                      style={{ borderRadius: '100% 0% 100% 0% / 0% 100% 0% 100%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">8. Wave / Wavy Card</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Alternating 100%/0% creates a wavy, abstract shape. Use as
                      decorative dividers or background accent blobs.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.wave {
  border-radius: 100% 0% 100% 0%
               / 0% 100% 0% 100%;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 9. Teardrop */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-20 h-24 bg-rose-400"
                      style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">9. Teardrop</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Using an elliptical top (taller than wide) with matching radii
                      on all sides but different horizontal/vertical ratios. Great for
                      map pin icons.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.teardrop {
  width: 80px;
  height: 96px;
  border-radius: 50% 50% 50% 50%
               / 60% 60% 40% 40%;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 10. Badge */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 flex items-center">
                    <div
                      className="px-3 py-1 bg-amber-400 text-white text-xs font-bold uppercase tracking-wider"
                      style={{ borderRadius: '4px 12px 4px 12px' }}
                    >
                      New
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">10. Badge Shape</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Diagonal pattern with small/large alternating corners — creates a
                      "folded label" feel. Works well for version badges and status tags.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.badge {
  border-radius: 4px 12px 4px 12px;
  padding: 2px 10px;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 11. Skewed Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div
                      className="w-32 h-20 bg-purple-400"
                      style={{ borderRadius: '0 32px 0 32px' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">11. Skewed Card</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Sharp on two diagonal corners, rounded on the other two.
                      Creates a stylized, editorial card shape.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.skewed-card {
  border-radius: 0 32px 0 32px;
  /* or: top-right and bottom-left rounded */
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 12. Lozenge */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <div
                      className="w-24 h-24 bg-orange-400"
                      style={{ borderRadius: '50%', transform: 'rotate(45deg) scaleX(0.6)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">12. Lozenge / Diamond</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      A circle rotated 45°, or stretched with <code>scaleX()</code>.
                      Use as decorative bullet points or icon backgrounds.
                    </p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-xl text-xs font-mono overflow-x-auto">
{`.lozenge {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transform: rotate(45deg) scaleX(0.6);
}
/* Or a true diamond: */
.diamond {
  width: 60px;
  height: 60px;
  transform: rotate(45deg);
  border-radius: 4px; /* softened corners */
}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              4. Using Percentage Values
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you use <strong>percentage values</strong>, the horizontal radius is
              calculated relative to the element's <em>width</em>, and the vertical
              radius relative to its <em>height</em>. This means a 50% border-radius on
              a <strong>square</strong> produces a circle, but on a <strong>rectangle</strong>{' '}
              it produces an ellipse.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Square 200×200 → perfect circle */
.circle { width: 200px; height: 200px; border-radius: 50%; }

/* Rectangle 400×100 → ellipse (wider than tall) */
.ellipse { width: 400px; height: 100px; border-radius: 50%; }

/* Percentage pairs with the slash syntax */
.organic {
  width: 300px; height: 200px;
  /* Horizontal: % of width, Vertical: % of height */
  border-radius: 60% 40% / 40% 60%;
}`}
            </pre>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              5. Animating Border Radius
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <code>border-radius</code> is fully animatable with CSS transitions and
              keyframe animations. This is the technique behind "morphing blob"
              animations common in modern SaaS landing pages.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`/* Morphing blob animation */
@keyframes morph {
  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%  { border-radius: 50% 40% 60% 30% / 30% 70% 40% 60%; }
  75%  { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}

.animated-blob {
  animation: morph 8s ease-in-out infinite;
}

/* Simple hover transition */
.card {
  border-radius: 16px;
  transition: border-radius 0.3s ease;
}
.card:hover {
  border-radius: 24px 8px 24px 8px;
}`}
            </pre>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                6. Common Mistakes to Avoid
              </h2>
              <div className="space-y-4">
                {[
                  {
                    mistake: "Using border-radius on inline elements",
                    fix: "Inline elements (span, a) must have display: inline-block or display: block for border-radius to render visibly.",
                  },
                  {
                    mistake: "Forgetting overflow: hidden on rounded containers",
                    fix: "Child elements can bleed outside rounded corners unless you add overflow: hidden to the parent.",
                  },
                  {
                    mistake: "Expecting 50% to always create a circle",
                    fix: "50% creates a circle only on square elements. On rectangles it creates an ellipse. Use a fixed equal width and height for a true circle.",
                  },
                  {
                    mistake: "Using border-radius on elements with outline",
                    fix: "CSS outline doesn't follow border-radius. Use box-shadow: 0 0 0 3px color instead for a rounded focus ring.",
                  },
                  {
                    mistake: "Over-animating border-radius on paint-heavy pages",
                    fix: "Animating border-radius triggers layout recalculation. For complex pages, consider using clip-path instead, which the browser can GPU-composite.",
                  },
                ].map(({ mistake, fix }) => (
                  <div key={mistake} className="flex gap-3">
                    <span className="flex-shrink-0 text-red-500 font-bold text-lg">✗</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{mistake}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{fix}</p>
                    </div>
                  </div>
                ))}
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
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Generate Border Radius Visually
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use ColorPeek's interactive Border Radius tool to drag corners, preview
              shapes in real time, and copy production-ready CSS — no guesswork required.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/border-radius"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Open Border Radius Tool →
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

export default CSSBorderRadiusExamples;
