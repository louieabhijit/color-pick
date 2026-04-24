import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
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
  FaPalette,
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface GradientExample {
  name: string;
  css: string;
  description: string;
}

const CSSGradientIdeas = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metadata = {
    title: '30 CSS Gradient Background Ideas with Code Examples',
    description:
      'Explore 30 stunning CSS gradient backgrounds - linear, radial, conic, mesh, and animated - with ready-to-copy code for every example.',
    author: 'Jordan Lee',
    date: 'April 22, 2026',
    readTime: '10 min read',
    tags: ['CSS', 'Gradients', 'Web Design', 'Frontend', 'UI Design'],
    image:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
  };

  const linearGradients: GradientExample[] = [
    {
      name: 'Ocean Breeze',
      css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Cool blue-violet diagonal - a perennial favourite for hero sections.',
    },
    {
      name: 'Sunset Horizon',
      css: 'linear-gradient(to right, #f093fb 0%, #f5576c 100%)',
      description: 'Warm pink-to-coral - excellent for lifestyle and beauty brands.',
    },
    {
      name: 'Emerald Forest',
      css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      description: 'Fresh teal-to-mint - great for wellness, finance, and eco products.',
    },
    {
      name: 'Midnight Blue',
      css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      description: 'Deep navy multi-stop - ideal for dark-mode hero sections and app backgrounds.',
    },
    {
      name: 'Golden Hour',
      css: 'linear-gradient(to right, #f7971e 0%, #ffd200 100%)',
      description: 'Warm amber-to-gold - high energy for CTAs, pricing cards, and promotions.',
    },
    {
      name: 'Cotton Candy',
      css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      description: 'Soft pastel peach - gentle and approachable for onboarding and empty states.',
    },
    {
      name: 'Electric Violet',
      css: 'linear-gradient(to bottom right, #7928ca 0%, #ff0080 100%)',
      description: 'Bold purple-to-pink - the signature gradient of the web 3.0 aesthetic.',
    },
    {
      name: 'Arctic Dawn',
      css: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
      description: 'Sky-blue to teal - clean and corporate, excellent for SaaS dashboards.',
    },
  ];

  const radialGradients: GradientExample[] = [
    {
      name: 'Solar Flare',
      css: 'radial-gradient(circle at 30% 30%, #ffeaa7 0%, #fd79a8 50%, #6c5ce7 100%)',
      description: 'Off-center radial burst - creates a dramatic focal point.',
    },
    {
      name: 'Deep Space',
      css: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      description: 'Dark elliptical glow - perfect for space, gaming, and tech themes.',
    },
    {
      name: 'Spotlight',
      css: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.4) 0%, transparent 70%)',
      description: 'Transparent radial from top - overlay on dark backgrounds for a spotlight effect.',
    },
    {
      name: 'Sunrise Glow',
      css: 'radial-gradient(circle at 50% 100%, #ff9a9e 0%, #fecfef 40%, #ffecd2 80%, transparent 100%)',
      description: 'Radial rising from bottom - simulates warm morning light on a page.',
    },
  ];

  const conicGradients: GradientExample[] = [
    {
      name: 'Color Wheel',
      css: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
      description: 'Full spectrum conic - used for color pickers, creative portfolio backgrounds.',
    },
    {
      name: 'Pie Chart',
      css: 'conic-gradient(#6366f1 0% 30%, #ec4899 30% 60%, #f59e0b 60% 80%, #10b981 80% 100%)',
      description: 'Hard-stop conic - useful for pie chart visualizations without SVG.',
    },
    {
      name: 'Angular Sweep',
      css: 'conic-gradient(from 180deg at 50% 50%, #2563eb 0deg, #7c3aed 180deg, #2563eb 360deg)',
      description: 'Two-tone angular sweep - gives surfaces an energetic rotational feel.',
    },
  ];

  const diagonalGradients: GradientExample[] = [
    {
      name: 'Neon Diagonal',
      css: 'linear-gradient(45deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)',
      description: '45° diagonal with three vibrant stops - popular for landing page heroes.',
    },
    {
      name: 'Muted Diagonal',
      css: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      description: 'Soft 135° pastel - works beautifully as a card or modal background.',
    },
    {
      name: 'Dark Diagonal',
      css: 'linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      description: 'Dark navy 45° - moody and minimal for dark mode section backgrounds.',
    },
  ];

  const meshGradients: GradientExample[] = [
    {
      name: 'Mesh Aurora',
      css: 'radial-gradient(at 40% 20%, hsla(210,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%)',
      description: 'Six overlapping radials - produces an organic aurora-like mesh effect.',
    },
    {
      name: 'Pastel Mesh',
      css: 'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%)',
      description: 'Pastel radial blend - soft and contemporary, great for landing pages.',
    },
    {
      name: 'Warm Mesh',
      css: 'radial-gradient(at 40% 40%, hsla(28, 100%, 74%, 1) 0px, transparent 50%), radial-gradient(at 90% 10%, hsla(0, 100%, 68%, 1) 0px, transparent 50%), radial-gradient(at 10% 90%, hsla(45, 100%, 68%, 1) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(340, 100%, 76%, 1) 0px, transparent 50%)',
      description: 'Warm amber-coral mesh - ideal for food, wellness, and creative brands.',
    },
  ];

  const GradientCard = ({ gradient, delay }: { gradient: GradientExample; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md mb-6"
    >
      <div
        className="h-28 w-full"
        style={{ background: gradient.css }}
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <FaPalette className="text-indigo-500 text-sm" />
          <h4 className="font-bold text-[var(--text-primary)] dark:text-white">{gradient.name}</h4>
        </div>
        <p className="text-[var(--text-muted)] dark:text-gray-400 text-sm mb-3">{gradient.description}</p>
        <pre className="bg-gray-900 text-green-400 p-3 rounded-xl overflow-x-auto text-xs">
{`background: ${gradient.css};`}
        </pre>
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
          href="https://color-peek.com/blog/css-gradient-background-ideas"
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
          content="css gradient background, css gradient examples, linear gradient css, background gradient ideas, css gradient generator, gradient color combinations"
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
              <li>8 named linear gradients with vivid colour stories</li>
              <li>4 radial gradient techniques for focal depth</li>
              <li>3 conic gradient examples including pie charts and color wheels</li>
              <li>Diagonal gradients for dynamic layouts</li>
              <li>Mesh / multi-stop gradients that mimic Figma's mesh fill</li>
              <li>Animated gradients using @keyframes</li>
              <li>Accessibility tips for using gradients behind text</li>
            </ul>
          </motion.div>

          {/* Syntax overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">CSS Gradient Quick Reference</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                CSS provides three native gradient functions. All are values for the
                <code> background</code> or <code>background-image</code> property -
                they are images, not colors.
              </p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Linear - straight direction */
background: linear-gradient(direction, color-stop1, color-stop2, ...);

/* Radial - outward from a center point */
background: radial-gradient(shape size at position, color-stop1, color-stop2, ...);

/* Conic - rotates around a center point */
background: conic-gradient(from angle at position, color-stop1, color-stop2, ...);

/* Multiple gradients - comma-separated, first is topmost */
background:
  radial-gradient(...),
  linear-gradient(...);`}
              </pre>
            </div>
          </motion.section>

          {/* Linear gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h2 className="text-2xl font-bold mb-2">Linear Gradients</h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Linear gradients travel in a straight line between two or more color
              stops. The direction can be specified as a keyword (<code>to right</code>,
              <code>to bottom right</code>) or as an angle in degrees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {linearGradients.map((g, i) => (
                <GradientCard key={g.name} gradient={g} delay={0.57 + i * 0.04} />
              ))}
            </div>
          </motion.section>

          {/* Radial gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="text-2xl font-bold mb-2 mt-4">Radial Gradients</h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Radial gradients emit from a single point outward in an ellipse or circle.
              Shifting the center with <code>at X% Y%</code> creates off-center focal
              points that add drama and depth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {radialGradients.map((g, i) => (
                <GradientCard key={g.name} gradient={g} delay={0.92 + i * 0.04} />
              ))}
            </div>
          </motion.section>

          {/* Conic gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-2 mt-4">Conic Gradients</h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Conic gradients rotate color stops around a central point - like the
              hands of a clock sweeping through hues. They're perfect for pie charts,
              color pickers, and angular abstract backgrounds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {conicGradients.map((g, i) => (
                <GradientCard key={g.name} gradient={g} delay={1.02 + i * 0.04} />
              ))}
            </div>
          </motion.section>

          {/* Diagonal gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
          >
            <h2 className="text-2xl font-bold mb-2 mt-4">Diagonal Gradients</h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              Diagonal gradients (45° and 135°) inject energy and movement into static
              layouts. They're the go-to for hero sections that need dynamism without
              photography.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {diagonalGradients.map((g, i) => (
                <GradientCard key={g.name} gradient={g} delay={1.07 + i * 0.04} />
              ))}
            </div>
          </motion.section>

          {/* Mesh gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <h2 className="text-2xl font-bold mb-2 mt-4">Mesh / Multi-Stop Gradients</h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              CSS mesh gradients layer multiple transparent radial gradients to simulate
              Figma's mesh fill feature. The technique stacks 4–8 radials at different
              positions, each fading to transparent, to produce organic blobs of colour.
            </p>
            {meshGradients.map((g, i) => (
              <GradientCard key={g.name} gradient={g} delay={1.12 + i * 0.05} />
            ))}
          </motion.section>

          {/* Animated gradients */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.18 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Animated Gradients</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                CSS gradients themselves cannot be interpolated (browsers can't tween
                between gradient values directly), but you can animate them by
                oversizing the background and shifting its position with
                <code> background-position</code>, or by animating a hue-rotate filter.
              </p>

              <h3 className="font-bold mb-2">Method 1 - Moving background-position</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`.animated-gradient {
  background: linear-gradient(
    270deg,
    #667eea, #764ba2, #f093fb, #f5576c
  );
  background-size: 400% 400%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0%   50%; }
}`}
              </pre>

              <h3 className="font-bold mb-2">Method 2 - hue-rotate filter</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm mb-6">
{`.hue-animated {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: hue-cycle 6s linear infinite;
}

@keyframes hue-cycle {
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(360deg); }
}`}
              </pre>

              <h3 className="font-bold mb-2">Method 3 - CSS custom property + @property</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Modern approach - fully interpolatable */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.rotating-gradient {
  background: conic-gradient(
    from var(--angle),
    #667eea, #764ba2, #f093fb, #667eea
  );
  animation: rotate-hue 4s linear infinite;
}

@keyframes rotate-hue {
  to { --angle: 360deg; }
}`}
              </pre>
            </div>
          </motion.section>

          {/* Accessible gradient text */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg mb-8"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Tips for Accessible Gradient Text</h2>
              <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-4">
                Gradient backgrounds create variable contrast - the contrast ratio at
                one end may pass WCAG AA while the other end fails. Follow these
                practices to keep your gradients accessible.
              </p>
              <ul className="space-y-3 text-[var(--text-secondary)] dark:text-gray-300 mb-6">
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold flex-shrink-0">1.</span>
                  Test contrast at the lightest AND darkest gradient stop. Both must meet
                  a minimum 4.5:1 ratio for body text.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold flex-shrink-0">2.</span>
                  Add a semi-transparent overlay (<code>rgba(0,0,0,0.4)</code>) between
                  the gradient and text to lock the contrast regardless of gradient colour.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold flex-shrink-0">3.</span>
                  Use white or near-white text on dark gradients and dark text on very
                  light or pastel gradients.
                </li>
                <li className="flex gap-2">
                  <span className="text-green-500 font-bold flex-shrink-0">4.</span>
                  Avoid placing body text directly on a vibrant multi-stop gradient -
                  reserve it for decorative sections only.
                </li>
              </ul>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`/* Safe gradient + text pattern */
.hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35); /* contrast booster */
}

.hero-content {
  position: relative; /* above the ::after overlay */
  color: #fff;
}

/* Gradient text (decorative, not body copy) */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`}
              </pre>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8"
          >
            <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-200">Key Takeaways</h3>
            <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300">
              <li>CSS gradients are <code>background-image</code> values - they stack like images</li>
              <li>Layer multiple radials to create organic mesh effects without libraries</li>
              <li>Animate gradients via <code>background-position</code> or <code>@property --angle</code></li>
              <li>Always check contrast at both ends of a gradient before placing text</li>
              <li>Use <code>-webkit-background-clip: text</code> for gradient-filled display text</li>
              <li>Conic gradients can replace SVG for simple pie charts</li>
            </ul>
          </motion.div>

          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
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
              Create Your Own Gradients
            </h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 mb-6">
              ColorPeek's gradient tools let you build, tweak, and save beautiful
              gradients with live preview - then copy the CSS instantly or browse
              curated community palettes for inspiration.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/gradient-generator"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Gradient Generator
              </a>
              <a
                href="/gradients"
                className="inline-flex items-center px-6 py-3 border border-indigo-400 text-indigo-600 dark:text-indigo-300 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Browse Gradients
              </a>
              <a
                href="/palettes"
                className="inline-flex items-center px-6 py-3 border border-purple-400 text-purple-600 dark:text-purple-300 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                Color Palettes
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

export default CSSGradientIdeas;
