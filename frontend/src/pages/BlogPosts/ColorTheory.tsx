import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import PopunderAd from '../../components/PopunderAd';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorTheory = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const metadata = {
    title: 'The Complete Guide to Color Theory for Designers',
    description: 'Master the fundamentals of color theory, from basic principles to practical applications in modern design. Learn how to create harmonious color schemes and evoke emotions through strategic color choices.',
    author: 'Design Expert',
    date: 'April 29, 2024',
    readTime: '12 min read',
    tags: ['Color Theory', 'Design Principles', 'UI/UX', 'Web Design', 'Color Psychology'],
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=2070&auto=format&fit=crop'
  };

  const shareUrl = window.location.href;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>{metadata.title} | Color Pick Blog</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="color theory, design principles, color psychology, color schemes, color harmony, UI design, web design, visual design, color meanings, color combinations" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GSMXWF15GP"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GSMXWF15GP');
          `}
        </script>
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8219399801950643"
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <Navbar onColorSelect={() => {}} />

      {/* Add PopunderAd component */}
      <PopunderAd />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] md:h-[50vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {metadata.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-gray-300 text-sm md:text-base"
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
              <span className="md:hidden">{metadata.tags.length} tags</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ad placement after hero */}
      <AdsterraAd variant="content" />
      <BannerAd variant="content" />

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold">Understanding Color Theory: The Foundation of Design</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Color theory is more than just understanding the color wheel—it's about mastering the art of visual communication. 
              In this comprehensive guide, we'll explore how colors interact, influence emotions, and create meaningful designs 
              that resonate with your audience.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ Fundamentals of color theory and the color wheel</li>
                <li>✓ How to create harmonious color combinations</li>
                <li>✓ Understanding color psychology and emotional impact</li>
                <li>✓ Practical applications in modern design</li>
                <li>✓ Tips for accessibility and user experience</li>
              </ul>
            </div>

            {/* Table of Contents */}
            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#basics" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    1. The Basics of Color Theory
                  </a>
                </li>
                <li>
                  <a href="#psychology" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    2. Color Psychology and Emotional Impact
                  </a>
                </li>
                <li>
                  <a href="#schemes" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    3. Color Schemes and Harmonies
                  </a>
                </li>
                <li>
                  <a href="#application" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    4. Practical Applications in Design
                  </a>
                </li>
                <li>
                  <a href="#accessibility" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    5. Color Accessibility and Best Practices
                  </a>
                </li>
                <li>
                  <a href="#tools" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    6. Essential Color Tools and Resources
                  </a>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Main Content Sections */}
          <motion.section
            id="basics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">1. The Basics of Color Theory</h2>
            <img
              src="https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070"
              alt="Color wheel illustration"
              className="rounded-2xl my-8 w-full"
            />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At its core, color theory provides a framework for understanding how colors work together. 
              The color wheel, first developed by Sir Isaac Newton in 1666, remains a fundamental tool for designers. 
              It showcases the relationships between:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Primary Colors</h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  The foundation of all colors: Red, Blue, and Yellow
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Secondary Colors</h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Created by mixing primary colors
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Tertiary Colors</h3>
                <div className="flex space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-green-500"></div>
                  <div className="w-8 h-8 rounded-full bg-red-orange-500"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mixed from primary and secondary colors
                </p>
              </div>
            </div>
          </motion.section>

          {/* Ad placement in middle of content */}
          <BannerAd variant="content" />

          <motion.section
            id="psychology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">2. Color Psychology and Emotional Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Cool Colors</h3>
                <p className="text-gray-700 dark:text-gray-300">Evoke calmness, trust, and professionalism</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-500 mr-3"></div>
                    <span>Blue: Trust, Stability, Depth</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 mr-3"></div>
                    <span>Green: Growth, Harmony, Nature</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-500 mr-3"></div>
                    <span>Purple: Royalty, Luxury, Mystery</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-3">Warm Colors</h3>
                <p className="text-gray-700 dark:text-gray-300">Create energy, excitement, and passion</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red-500 mr-3"></div>
                    <span>Red: Energy, Passion, Action</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-orange-500 mr-3"></div>
                    <span>Orange: Creativity, Adventure, Confidence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 mr-3"></div>
                    <span>Yellow: Optimism, Happiness, Intellect</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl my-8">
              <h3 className="text-xl font-semibold mb-4">Color Psychology in Action</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Understanding color psychology is crucial for:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Brand Identity Development</li>
                <li>• Marketing and Advertising</li>
                <li>• User Interface Design</li>
                <li>• Environmental Design</li>
                <li>• Product Packaging</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            id="schemes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">3. Color Schemes and Harmonies</h2>
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2069"
              alt="Color harmony examples"
              className="rounded-2xl my-8 w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">Monochromatic</h3>
                  <div className="flex space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-300"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-700"></div>
                  </div>
                  <p className="text-sm">Various shades and tints of a single color</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">Complementary</h3>
                  <div className="flex space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                  </div>
                  <p className="text-sm">Colors opposite each other on the wheel</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">Analogous</h3>
                  <div className="flex space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-cyan-500"></div>
                    <div className="w-8 h-8 rounded-full bg-teal-500"></div>
                  </div>
                  <p className="text-sm">Colors adjacent on the wheel</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-3">Triadic</h3>
                  <div className="flex space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
                  </div>
                  <p className="text-sm">Three colors equally spaced on the wheel</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

          <motion.section
            id="application"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">4. Practical Applications in Design</h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-2xl my-8">
              <h3 className="text-xl font-semibold mb-6">Essential Color Design Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">For Web Design</h4>
                  <ul className="space-y-2">
                    <li>• Use consistent color schemes throughout</li>
                    <li>• Ensure sufficient contrast for readability</li>
                    <li>• Consider color blindness accessibility</li>
                    <li>• Test colors across different devices</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">For Branding</h4>
                  <ul className="space-y-2">
                    <li>• Choose colors that reflect brand values</li>
                    <li>• Consider cultural color associations</li>
                    <li>• Maintain consistency across platforms</li>
                    <li>• Plan for various applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="accessibility"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">5. Color Accessibility and Best Practices</h2>
            <div className="my-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">WCAG Guidelines</h3>
                <p className="mb-4">
                  The Web Content Accessibility Guidelines (WCAG) provide standards for making web content 
                  accessible to people with various forms of color blindness and visual impairments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Minimum Contrast Ratio</h4>
                    <p className="text-sm">4.5:1 for normal text</p>
                    <p className="text-sm">3:1 for large text</p>
                  </div>
                  <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Color Independence</h4>
                    <p className="text-sm">Don't rely on color alone to convey information</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            id="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="scroll-mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold">6. Essential Color Tools and Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Online Tools</h3>
                <ul className="space-y-2">
                  <li>• Adobe Color Wheel</li>
                  <li>• Coolors.co</li>
                  <li>• ColorPeek (Our Tool)</li>
                  <li>• Paletton</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Design Software</h3>
                <ul className="space-y-2">
                  <li>• Adobe Creative Suite</li>
                  <li>• Sketch</li>
                  <li>• Figma</li>
                  <li>• Affinity Designer</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Ad placement before social sharing */}
          <BannerAd variant="footer" />

          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
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

          {/* Final ad placement */}
          <AdsterraAd variant="footer" />
        </div>
      </article>

      {/* Scroll to Top Button */}
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

export default ColorTheory; 