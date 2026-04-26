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
  FaFont,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface FontPairing {
  heading: string;
  body: string;
  useCase: string;
  description: string;
  headingWeight: string;
}

const GoogleFontPairings = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: '15 Best Google Font Pairings for Websites in 2025',
    description:
      'Discover 15 expertly curated Google Font pairings for editorial, tech, and humanist styles - complete with implementation code and pairing principles.',
    author: 'Sarah Chen',
    date: 'April 22, 2026',
    readTime: '12 min read',
    tags: ['Typography', 'Google Fonts', 'Web Design', 'Font Pairing', 'UI Design'],
    image:
      'https://images.unsplash.com/photo-1467189741621-5973f25b9ced?q=80&w=2070&auto=format&fit=crop',
  };

  const editorialPairings: FontPairing[] = [
    {
      heading: 'Playfair Display',
      body: 'Source Sans 3',
      useCase: 'Magazines, blogs, editorial sites',
      description: 'Classic serif elegance meets clean modern legibility. The high-contrast strokes of Playfair Display command attention while Source Sans 3 keeps long-form reading effortless.',
      headingWeight: '700',
    },
    {
      heading: 'Cormorant Garamond',
      body: 'Proza Libre',
      useCase: 'Luxury brands, fashion, culture',
      description: "Cormorant's ultra-thin serifs evoke fine-press typography. Proza Libre provides a warm, readable body at any size without competing for attention.",
      headingWeight: '600',
    },
    {
      heading: 'Libre Baskerville',
      body: 'Libre Franklin',
      useCase: 'Publishing, journalism, news sites',
      description: 'A curated family pairing from Google - both faces were designed as a system. Baskerville headings with Franklin body text feel authoritative and journalistic.',
      headingWeight: '700',
    },
    {
      heading: 'Merriweather',
      body: 'Open Sans',
      useCase: 'Content-heavy blogs, documentation',
      description: 'One of the most popular pairings on the web. Merriweather was specifically designed for screen reading at small sizes, and Open Sans is among the most legible sans-serifs available.',
      headingWeight: '700',
    },
    {
      heading: 'Abril Fatface',
      body: 'Lato',
      useCase: 'Landing pages, promotions, posters',
      description: 'Abril Fatface is pure headline drama - ultra-heavy display with ink-trap details. Lato provides a neutral, friendly counterpoint for supporting copy.',
      headingWeight: '400',
    },
  ];

  const techPairings: FontPairing[] = [
    {
      heading: 'Space Grotesk',
      body: 'Inter',
      useCase: 'SaaS apps, developer tools, tech startups',
      description: "Space Grotesk's quirky geometric letterforms add personality to interfaces while Inter's extensive hinting makes it the definitive UI body font of the decade.",
      headingWeight: '600',
    },
    {
      heading: 'DM Sans',
      body: 'DM Mono',
      useCase: 'Developer documentation, code-heavy products',
      description: 'The DM family was made to work together. Sans for prose and headings, Mono for code snippets - consistent weight and optical sizing make this an effortless pairing.',
      headingWeight: '700',
    },
    {
      heading: 'Syne',
      body: 'Manrope',
      useCase: 'Creative agencies, portfolios, digital studios',
      description: "Syne's irregular stroke width gives headings a distinctive tech-art feel. Manrope is a geometric grotesque with excellent screen rendering at small sizes.",
      headingWeight: '700',
    },
    {
      heading: 'Plus Jakarta Sans',
      body: 'Figtree',
      useCase: 'B2B SaaS, product landing pages',
      description: 'Both faces are clean, contemporary, and built for UI. Jakarta Sans headings carry authority; Figtree has rounded terminals that add approachability to body copy.',
      headingWeight: '600',
    },
    {
      heading: 'Outfit',
      body: 'Nunito',
      useCase: 'Mobile apps, fintech, health tech',
      description: "Outfit's narrow width saves horizontal space in constrained UIs. Nunito's rounded forms create a friendly, accessible reading experience in supporting text.",
      headingWeight: '700',
    },
  ];

  const humanistPairings: FontPairing[] = [
    {
      heading: 'Lora',
      body: 'Mulish',
      useCase: 'Personal blogs, non-profits, community sites',
      description: "Lora's calligraphic brushwork feels warm and personal. Mulish is a geometric sans with a light, open quality that pairs beautifully without competing.",
      headingWeight: '700',
    },
    {
      heading: 'Spectral',
      body: 'Karla',
      useCase: 'Literary websites, essays, online books',
      description: "Spectral was designed specifically for digital reading - it performs beautifully at both display and text sizes. Karla's narrow-grotesque character adds a contemporary feel.",
      headingWeight: '600',
    },
    {
      heading: 'Josefin Sans',
      body: 'Raleway',
      useCase: 'Portfolios, minimal lifestyle brands',
      description: "Josefin Sans draws from 1920s geometric lettering. Raleway's thin strokes and art-deco influence make them a coherent, stylish pairing for minimal aesthetics.",
      headingWeight: '700',
    },
    {
      heading: 'Fraunces',
      body: 'Jost',
      useCase: 'Food, wellness, artisan brands',
      description: "Fraunces is an optical-size variable serif with expressive warmth. Jost is an elegant geometric grotesque that balances Fraunces's personality without overwhelming it.",
      headingWeight: '600',
    },
    {
      heading: 'Crimson Pro',
      body: 'Work Sans',
      useCase: 'Academic, legal, finance, long-form content',
      description: "Crimson Pro's classical serifs convey trust and scholarship. Work Sans was fine-tuned for usage in headings and paragraphs - both faces have complementary x-heights.",
      headingWeight: '700',
    },
  ];

  const PairingCard = ({ pairing, delay }: { pairing: FontPairing; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-6"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
              {pairing.useCase}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] dark:text-gray-400">
            <FaFont className="text-xs" />
            <span>{pairing.heading}</span>
            <span className="text-gray-300">+</span>
            <span>{pairing.body}</span>
          </div>
        </div>
        {/* Visual sample */}
        <div className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 mb-4 bg-gray-50 dark:bg-gray-900/30">
          <p
            className="text-2xl md:text-3xl text-[var(--text-primary)] dark:text-white mb-2"
            style={{ fontFamily: `'${pairing.heading}', serif`, fontWeight: parseInt(pairing.headingWeight) }}
          >
            The quick brown fox
          </p>
          <p
            className="text-base text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed"
            style={{ fontFamily: `'${pairing.body}', sans-serif` }}
          >
            Good typography is invisible - it communicates ideas without drawing attention
            to itself. This pairing excels at guiding the reader effortlessly from
            headline to body copy.
          </p>
        </div>
        <p className="text-[var(--text-secondary)] dark:text-gray-300 text-sm">{pairing.description}</p>
      </div>
    </motion.div>
  );

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
          href="https://color-peek.com/blog/best-google-font-pairings-2025"
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
          content="google font pairings, best font combinations, google fonts for websites, font pairing guide, typography web design, heading body font combinations"
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
              <li>Why font pairing is one of the highest-ROI design decisions</li>
              <li>The three pairing rules that make combinations feel inevitable</li>
              <li>5 editorial pairings for magazines, blogs, and publishing</li>
              <li>5 tech / modern pairings for SaaS, apps, and startups</li>
              <li>5 humanist / warm pairings for lifestyle, non-profit, and personal brands</li>
              <li>How to load Google Fonts correctly for performance</li>
            </ul>
          </motion.div>

          {/* Why pairing matters */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Why Font Pairing Matters</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Typography accounts for roughly 95% of web design. The fonts you choose
                communicate personality before the user reads a single word - and poor
                pairing creates cognitive friction that drives visitors away.
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                A well-matched heading and body font creates visual hierarchy, reinforces
                brand identity, and makes content effortless to consume. The goal is not
                to choose fonts you love in isolation, but to find combinations that work
                as a system.
              </p>
              <p className="text-[var(--text-secondary)] dark:text-gray-300">
                Google Fonts offers over 1,500 free font families - making high-quality
                pairing accessible to every project regardless of budget. The challenge
                is not scarcity but discernment: knowing which combinations elevate your
                work.
              </p>
            </div>
          </motion.section>

          {/* Pairing rules */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">The Three Pairing Rules</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">1. Contrast, Not Conflict</h3>
                  <p className="text-[var(--text-secondary)] dark:text-gray-300">
                    Pair type families that look different enough to create clear
                    hierarchy - typically a serif heading with a sans-serif body, or
                    a decorative display face with a neutral workhorse. Avoid two fonts
                    that are similar but not identical; they create visual tension without
                    purpose.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">2. Shared Mood</h3>
                  <p className="text-[var(--text-secondary)] dark:text-gray-300">
                    Even contrasting faces need to share a tonal register - both classic,
                    both playful, both technical. Pairing a whimsical script headline
                    with a heavy industrial grotesque creates incoherence. Look for shared
                    proportions, historical period, or design intent.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400 mb-2">3. Respect Hierarchy</h3>
                  <p className="text-[var(--text-secondary)] dark:text-gray-300">
                    The display or heading font earns its moment in headings and hero
                    sections. The body font does the real reading work - never use your
                    expressive heading font for body text. Consistent scale ratios
                    (use a type scale of 1.25× or 1.333×) reinforce the hierarchy you
                    create.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Editorial pairings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Editorial Pairings</h2>
            {editorialPairings.map((p, i) => (
              <PairingCard key={p.heading} pairing={p} delay={0.62 + i * 0.04} />
            ))}
          </motion.section>

          {/* Tech pairings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6 mt-4">Tech / Modern Pairings</h2>
            {techPairings.map((p, i) => (
              <PairingCard key={p.heading} pairing={p} delay={0.82 + i * 0.04} />
            ))}
          </motion.section>

          {/* Humanist pairings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-6 mt-4">Humanist / Warm Pairings</h2>
            {humanistPairings.map((p, i) => (
              <PairingCard key={p.heading} pairing={p} delay={1.02 + i * 0.04} />
            ))}
          </motion.section>

          {/* Implementation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mt-8 mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">How to Implement Google Fonts</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                The fastest way is the <code>&lt;link&gt;</code> tag in your HTML
                <code>&lt;head&gt;</code>. Request only the weights you need to keep
                page load times low.
              </p>
              <h3 className="font-bold mb-2">HTML - link tag (recommended)</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`<!-- Example: Playfair Display + Source Sans 3 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?
    family=Playfair+Display:wght@700&
    family=Source+Sans+3:wght@400;500;600&
    display=swap"
  rel="stylesheet"
>`}
              </pre>
              <h3 className="font-bold mb-2">CSS - apply the fonts</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`/* Heading font */
h1, h2, h3, h4 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
}

/* Body font */
body, p, li, blockquote {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.7;
}`}
              </pre>
              <h3 className="font-bold mb-2">CSS @import (alternative)</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* In your main CSS file */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=swap');`}
              </pre>
              <p className="text-sm text-[var(--text-muted)] dark:text-gray-400 mt-4">
                Pro tip: <code>display=swap</code> ensures text remains visible during
                font load, preventing invisible text flashes (FOIT). Always include it.
              </p>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8"
          >
            <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">Key Takeaways</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
              <li>Contrast in classification (serif + sans) is the safest starting point</li>
              <li>Both fonts must share mood, era, or design intent to feel cohesive</li>
              <li>Load only the weights you use - every unused variant costs performance</li>
              <li>Always include <code>display=swap</code> in your Google Fonts URL</li>
              <li>Use a consistent type scale (1.25× or 1.333×) to reinforce hierarchy</li>
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
              Try Font Pairings Interactively
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              ColorPeek's typography tools let you preview hundreds of Google Font
              combinations live - and fine-tune your type scale visually before writing
              a single line of CSS.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/font-pairing"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Font Pairing Tool
              </a>
              <a
                href="/type-scale"
                className="inline-flex items-center px-6 py-3 border border-indigo-400 text-indigo-600 dark:text-indigo-300 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Type Scale Generator
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

export default GoogleFontPairings;
