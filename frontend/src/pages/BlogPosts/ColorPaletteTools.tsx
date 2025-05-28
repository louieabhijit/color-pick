import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import PopunderAd from '../../components/PopunderAd';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaStar, FaExternalLinkAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorPaletteTools = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

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
    title: 'Top 5 Free Color Palette Tools for Designers in 2025',
    description: 'Discover the best free color palette generators and tools that will revolutionize your design workflow in 2025. Compare features, explore AI-powered options, and find the perfect tool for your next project.',
    author: 'Design Expert',
    date: 'May 1, 2024',
    readTime: '8 min read',
    tags: ['Color Tools', 'Design Resources', 'Color Palettes', 'UI/UX', 'Web Design', 'Free Tools'],
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2070&auto=format&fit=crop'
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

  const tools = [
    {
      id: 'colorpeek',
      name: 'ColorPeek',
      description: 'An AI-powered color palette generator that creates harmonious color schemes from images and inspiration.',
      features: [
        'AI-powered color extraction',
        'Real-time palette generation',
        'Color harmony suggestions',
        'Accessibility checker',
        'Export to multiple formats'
      ],
      rating: 5,
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000',
      link: '/'
    },
    {
      id: 'coolors',
      name: 'Coolors',
      description: 'Generate perfect color combinations with this intuitive and powerful color scheme generator.',
      features: [
        'Random palette generation',
        'Color blindness simulator',
        'Gradient maker',
        'Color trends',
        'Community palettes'
      ],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=1000',
      link: 'https://coolors.co'
    },
    {
      id: 'adobe-color',
      name: 'Adobe Color',
      description: 'Professional-grade color tools with advanced features for creating and exploring color harmonies.',
      features: [
        'Color wheel',
        'Accessibility tools',
        'Adobe integration',
        'Color rules',
        'Community trends'
      ],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1560830889-96266c6dbe96?q=80&w=1000',
      link: 'https://color.adobe.com'
    },
    {
      id: 'colorhunt',
      name: 'Color Hunt',
      description: 'Curated collection of beautiful color palettes with daily updates and community voting.',
      features: [
        'Daily palettes',
        'Community voting',
        'Popular collections',
        'Quick copy',
        'Palette creation'
      ],
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000',
      link: 'https://colorhunt.co'
    },
    {
      id: 'paletton',
      name: 'Paletton',
      description: 'Advanced color scheme calculator for creating sophisticated and harmonious color combinations.',
      features: [
        'Advanced color wheel',
        'Color scheme modes',
        'Preview options',
        'Custom parameters',
        'Color space support'
      ],
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1000',
      link: 'https://paletton.com'
    }
  ];

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
        <meta name="keywords" content="color palette generator, color tools, design tools, color scheme generator, free design tools, color palette maker, UI design tools, web design resources, color picker, color inspiration" />
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
            <h2 className="text-2xl md:text-3xl font-bold">Finding the Perfect Color Palette Tool</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              In 2025, color palette tools have evolved beyond simple color pickers into sophisticated platforms 
              that leverage AI and advanced algorithms to help designers create stunning color combinations. 
              We've curated the top 5 free tools that stand out for their innovative features and user-friendly interfaces.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Discover</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ AI-powered color palette generators</li>
                <li>✓ Tools with accessibility checking features</li>
                <li>✓ Community-driven color inspiration platforms</li>
                <li>✓ Advanced color harmony calculators</li>
                <li>✓ Export options for different design tools</li>
              </ul>
            </div>
          </motion.section>

          {/* Ad placement in middle of content */}
          <BannerAd variant="content" />

          {/* Tool Cards */}
          {tools.map((tool, index) => (
            <motion.section
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="my-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-48 md:h-64">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(tool.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {tool.description}
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Key Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tool.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Try {tool.name}
                      <FaExternalLinkAlt className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Making the Right Choice</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Each of these tools offers unique features and capabilities that cater to different design needs. 
              Whether you're looking for AI-powered suggestions, community-driven inspiration, or advanced color 
              theory tools, there's a perfect option for your workflow. We recommend trying a few different tools 
              to find the one that best suits your design process and project requirements.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Pro Tips</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Test color combinations across different devices and screens</li>
                <li>• Consider accessibility when choosing color palettes</li>
                <li>• Save your favorite palettes for future reference</li>
                <li>• Explore community-created palettes for inspiration</li>
                <li>• Use multiple tools in combination for best results</li>
              </ul>
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

export default ColorPaletteTools; 