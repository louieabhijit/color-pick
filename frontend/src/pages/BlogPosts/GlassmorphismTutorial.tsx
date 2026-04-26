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
  FaLightbulb,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

const GlassmorphismTutorial = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: 'Glassmorphism CSS Tutorial: Build Stunning Frosted Glass UI',
    description:
      'Learn glassmorphism step-by-step - from backdrop-filter basics to full frosted glass cards with browser support notes and common pitfalls to avoid.',
    author: 'Maya Patel',
    date: 'April 22, 2026',
    readTime: '10 min read',
    tags: ['CSS', 'Glassmorphism', 'UI Design', 'Frontend', 'Web Design'],
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2070&auto=format&fit=crop',
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

  const browserSupport = [
    { browser: 'Chrome', version: '76+', support: true },
    { browser: 'Firefox', version: '103+', support: true },
    { browser: 'Safari', version: '9+', support: true, note: '-webkit- prefix' },
    { browser: 'Edge', version: '79+', support: true },
    { browser: 'Opera', version: '63+', support: true },
    { browser: 'IE 11', version: 'All', support: false },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link
          rel="canonical"
          href="https://color-peek.com/blog/glassmorphism-ui-design-tutorial"
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
          content="glassmorphism css, glassmorphism tutorial, frosted glass ui, backdrop-filter css, glass effect design, glassmorphism 2025"
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
              <li>What glassmorphism is and why it became a dominant UI trend</li>
              <li>The four CSS properties that power every glass effect</li>
              <li>Browser compatibility table with percentage support data</li>
              <li>A complete step-by-step frosted glass card with full code</li>
              <li>Light vs dark mode glassmorphism differences</li>
              <li>Common mistakes and exactly how to avoid them</li>
              <li>When glassmorphism enhances UX - and when it hurts it</li>
            </ul>
          </motion.div>

          {/* Section 1 - What is glassmorphism */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">What Is Glassmorphism?</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Glassmorphism is a UI design style that mimics frosted glass surfaces.
                Elements appear semi-transparent with a blurred view of whatever sits
                behind them, creating the illusion of depth without heavy shadows. The
                trend surged in popularity when Apple introduced it in macOS Big Sur
                (2020) and it has remained a staple of premium digital products ever
                since.
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                The look is defined by four characteristics: a translucent
                background, a blur applied to content behind the element, a subtle
                border that catches light, and a soft drop shadow to lift the card off
                the surface.
              </p>
              <div
                className="relative h-40 rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                }}
              >
                <div
                  className="absolute inset-4 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                >
                  <span className="text-white font-semibold text-lg">Frosted Glass Card</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2 - Core CSS properties */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Core CSS Properties</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
                Four properties do the heavy lifting. Understanding each one is essential
                before combining them.
              </p>

              <h3 className="font-bold text-lg mb-2">1. <code>backdrop-filter: blur()</code></h3>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-3">
                This is the star of the show. It blurs everything rendered behind the
                element - not the element's own content. Values between <code>8px</code>
                and <code>20px</code> produce the most realistic frosted-glass look.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px); /* Safari */`}
              </pre>

              <h3 className="font-bold text-lg mb-2">2. Semi-transparent <code>rgba</code> Background</h3>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-3">
                The element must be translucent so the blurred background shows through.
                Light glass uses white at 10–25% opacity; dark glass uses black or dark
                hues at similar opacity.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`/* Light glassmorphism */
background: rgba(255, 255, 255, 0.18);

/* Dark glassmorphism */
background: rgba(15, 15, 25, 0.35);`}
              </pre>

              <h3 className="font-bold text-lg mb-2">3. Subtle Border</h3>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-3">
                A 1px semi-transparent white border simulates the light catching the
                edge of a glass surface.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`border: 1px solid rgba(255, 255, 255, 0.3);`}
              </pre>

              <h3 className="font-bold text-lg mb-2">4. Soft Box Shadow</h3>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-3">
                A diffuse shadow beneath the card grounds it in space without fighting
                the translucent look.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);`}
              </pre>
            </div>
          </motion.section>

          {/* Section 3 - Browser support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Browser Support</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
                <code>backdrop-filter</code> has strong modern browser support
                (covering over 96% of global users as of 2026), but still needs the
                <code> -webkit-</code> prefix for Safari.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="text-left p-3 rounded-tl-lg">Browser</th>
                      <th className="text-left p-3">Version</th>
                      <th className="text-left p-3">Support</th>
                      <th className="text-left p-3 rounded-tr-lg">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {browserSupport.map((row, i) => (
                      <tr
                        key={row.browser}
                        className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}
                      >
                        <td className="p-3 font-medium">{row.browser}</td>
                        <td className="p-3 text-[var(--text-muted)] dark:text-gray-400">{row.version}</td>
                        <td className="p-3">
                          {row.support ? (
                            <span className="flex items-center text-green-600 dark:text-green-400">
                              <FaCheckCircle className="mr-1" /> Yes
                            </span>
                          ) : (
                            <span className="flex items-center text-red-500">
                              <FaTimesCircle className="mr-1" /> No
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-[var(--text-muted)] dark:text-gray-400">{row.note ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[var(--text-muted)] dark:text-gray-400 text-sm mt-4">
                Always include both <code>backdrop-filter</code> and
                <code> -webkit-backdrop-filter</code> for maximum compatibility.
              </p>
            </div>
          </motion.section>

          {/* Section 4 - Full example */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Step-by-Step: Building a Glass Card</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
                A glass element only works when placed on top of a colorful or
                photographic background. The wrapper element creates that background.
              </p>

              <h3 className="font-bold text-lg mb-2">HTML Structure</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`<div class="glass-wrapper">
  <div class="glass-card">
    <h2>Welcome back</h2>
    <p>Your dashboard is ready.</p>
    <button class="glass-btn">Get Started</button>
  </div>
</div>`}
              </pre>

              <h3 className="font-bold text-lg mb-2">Full CSS</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`/* 1. Colorful background wrapper - glass needs something to blur */
.glass-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* 2. The glass card */
.glass-card {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  max-width: 400px;
  width: 100%;
  color: #fff;
}

/* 3. Glass button */
.glass-btn {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  color: #fff;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}`}
              </pre>
            </div>
          </motion.section>

          {/* Section 5 - Light vs Dark */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Light vs Dark Glassmorphism</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
                The same blur technique produces distinct personalities depending on
                whether you use white or dark glass.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold mb-3">Light Glass</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.glass-light {
  background:
    rgba(255, 255, 255, 0.18);
  border:
    1px solid
    rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter:
    blur(12px);
}`}
                  </pre>
                  <p className="text-sm text-[var(--text-muted)] dark:text-gray-400 mt-2">
                    Airy and modern. Best on colourful or photographic backgrounds.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-3">Dark Glass</h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`.glass-dark {
  background:
    rgba(10, 10, 20, 0.4);
  border:
    1px solid
    rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter:
    blur(16px);
  color: #e2e8f0;
}`}
                  </pre>
                  <p className="text-sm text-[var(--text-muted)] dark:text-gray-400 mt-2">
                    Sophisticated and dramatic. Suits dark-mode dashboards and overlays.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 6 - Common mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
              <div className="space-y-4">
                {[
                  {
                    mistake: 'Applying glass to a plain white/black background',
                    fix: 'Glassmorphism only works when there is visual content behind the element to blur. Always wrap it in a gradient or image background.',
                  },
                  {
                    mistake: 'Forgetting the -webkit- prefix',
                    fix: 'Safari requires -webkit-backdrop-filter. Always include both declarations.',
                  },
                  {
                    mistake: 'Text contrast too low',
                    fix: 'Semi-transparent elements reduce text contrast. Use font-weight: 600+ and add a subtle text-shadow: 0 1px 3px rgba(0,0,0,0.3) for legibility.',
                  },
                  {
                    mistake: 'Too many glass layers stacked',
                    fix: 'Each blur layer has a rendering cost. Limit nesting - one or two glass layers per viewport is usually the maximum before performance degrades on mobile.',
                  },
                  {
                    mistake: 'Opacity set on the element not the background color',
                    fix: 'Set opacity on the rgba() background value, not on the element itself. Element opacity also fades child content and breaks the effect.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] dark:text-gray-100">{item.mistake}</p>
                      <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm mt-1">{item.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 7 - When to use */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">When to Use (and Avoid) Glassmorphism</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center">
                    <FaCheckCircle className="mr-2" /> Good use cases
                  </h3>
                  <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300 text-sm">
                    <li>Hero overlays on rich photography</li>
                    <li>Login / signup modals</li>
                    <li>Dashboard widgets on gradient backgrounds</li>
                    <li>Notification toasts and tooltips</li>
                    <li>Navigation drawers and sidebars</li>
                    <li>macOS / iOS-style app UIs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-red-500 mb-3 flex items-center">
                    <FaTimesCircle className="mr-2" /> Avoid glassmorphism for
                  </h3>
                  <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300 text-sm">
                    <li>Dense text-heavy content pages</li>
                    <li>Data tables with many rows</li>
                    <li>Plain white or black backgrounds</li>
                    <li>Users who prefer reduced motion/transparency (respect prefers-reduced-transparency)</li>
                    <li>Mobile apps where GPU performance is limited</li>
                  </ul>
                </div>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mt-6">
{`/* Respect user accessibility preferences */
@media (prefers-reduced-transparency: reduce) {
  .glass-card {
    background: rgba(30, 30, 50, 0.92);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
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
              <li>Four properties: <code>backdrop-filter</code>, rgba background, border, and box-shadow</li>
              <li>Always place glass elements on colourful backgrounds - they need content to blur</li>
              <li>Include <code>-webkit-backdrop-filter</code> for full Safari support</li>
              <li>Limit to 1–2 glass layers per viewport to maintain performance</li>
              <li>Add <code>prefers-reduced-transparency</code> fallback for accessibility</li>
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
              Build Glass Effects Visually
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Dial in your blur, opacity, border, and background with real-time preview -
              then copy the production-ready CSS with one click.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/glass-generator"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Glass Effect Generator
              </a>
              <a
                href="/box-shadow"
                className="inline-flex items-center px-6 py-3 border border-indigo-400 text-indigo-600 dark:text-indigo-300 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Box Shadow Generator
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

export default GlassmorphismTutorial;
