import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaPalette, FaLightbulb, FaEye, FaChartPie } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorHarmonyGuide = () => {
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
    title: "What is Color Harmony? A Beginner's Guide for Designers",
    description: "Discover the fundamental principles of color harmony and learn how to create visually pleasing color combinations. Perfect for beginners in web design, graphic design, and UI/UX design.",
    author: "Design Expert",
    date: "March 30, 2024",
    readTime: "15 min read",
    tags: ["Color Harmony", "Design Basics", "Color Theory", "Web Design", "UI/UX", "Visual Design"],
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2070"
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

  const harmonies = [
    {
      id: 'complementary',
      title: 'Complementary Harmony',
      description: 'Colors that sit opposite each other on the color wheel, creating maximum contrast and stability.',
      examples: [
        { colors: ['#FF0000', '#00FF00'], name: 'Red & Green' },
        { colors: ['#0000FF', '#FFB300'], name: 'Blue & Orange' },
        { colors: ['#9400D3', '#FFFF00'], name: 'Purple & Yellow' }
      ],
      image: 'https://images.unsplash.com/photo-1528459801416-a9241982fc8d?q=80&w=1000',
      tips: [
        'Use one color as dominant',
        'Consider using tints and shades',
        'Great for creating focal points',
        'Perfect for call-to-action elements'
      ]
    },
    {
      id: 'analogous',
      title: 'Analogous Harmony',
      description: 'Three colors that are next to each other on the color wheel, creating a harmonious and comfortable design.',
      examples: [
        { colors: ['#FF0000', '#FF6600', '#FFCC00'], name: 'Red to Yellow' },
        { colors: ['#0000FF', '#0066FF', '#00CCFF'], name: 'Blues' },
        { colors: ['#00FF00', '#66FF00', '#CCFF00'], name: 'Greens' }
      ],
      image: 'https://images.unsplash.com/photo-1507908708918-778587c9e563?q=80&w=1000',
      tips: [
        'Choose one dominant color',
        'Use for natural, comfortable designs',
        'Perfect for backgrounds',
        'Creates a serene atmosphere'
      ]
    },
    {
      id: 'triadic',
      title: 'Triadic Harmony',
      description: 'Three colors equally spaced around the color wheel, offering vibrant and balanced color combinations.',
      examples: [
        { colors: ['#FF0000', '#0000FF', '#FFFF00'], name: 'Primary Colors' },
        { colors: ['#FF6600', '#00FF00', '#9933FF'], name: 'Secondary Mix' },
        { colors: ['#FF3366', '#33FF66', '#6633FF'], name: 'Vibrant Mix' }
      ],
      image: 'https://images.unsplash.com/photo-1535673774336-ef95d2851cf3?q=80&w=1000',
      tips: [
        "Balance the colors carefully",
        "Use for playful designs",
        "Great for children's websites",
        "Works well for creative brands"
      ]
    },
    {
      id: 'split-complementary',
      title: 'Split-Complementary Harmony',
      description: 'A base color and the two colors adjacent to its complement, offering high contrast while being more versatile than complementary harmony.',
      examples: [
        { colors: ['#FF0000', '#00FF66', '#0066FF'], name: 'Red Base' },
        { colors: ['#0000FF', '#FFCC00', '#FF6600'], name: 'Blue Base' },
        { colors: ['#FFFF00', '#FF00CC', '#0033FF'], name: 'Yellow Base' }
      ],
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000',
      tips: [
        'Use one color as dominant',
        'Great for beginners',
        'Provides visual interest',
        'More balanced than complementary'
      ]
    }
  ];

  const principles = [
    {
      title: 'Balance',
      description: 'Create equilibrium by distributing colors evenly throughout your design.',
      icon: FaChartPie,
      tips: ['Use the 60-30-10 rule', 'Consider visual weight', 'Balance warm and cool colors']
    },
    {
      title: 'Contrast',
      description: 'Use color differences to create visual interest and improve readability.',
      icon: FaEye,
      tips: ['Ensure text readability', 'Create focal points', 'Use for hierarchy']
    },
    {
      title: 'Unity',
      description: 'Ensure all colors work together to create a cohesive design.',
      icon: FaPalette,
      tips: ['Use a consistent palette', 'Repeat colors intentionally', 'Consider context']
    },
    {
      title: 'Emphasis',
      description: 'Use color to draw attention to important elements.',
      icon: FaLightbulb,
      tips: ['Highlight key elements', 'Use accent colors sparingly', 'Create visual hierarchy']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>{metadata.title} | Color Pick Blog</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="color harmony, color theory, design principles, web design, UI design, visual design, color combinations, color schemes, complementary colors, analogous colors, triadic colors, color balance" />
      </Helmet>

      <Navbar onColorSelect={() => {}} />

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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold">Understanding Color Harmony</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Color harmony is the foundation of effective design. It's the art of combining colors in a way 
              that creates visual interest while maintaining balance and order. Whether you're designing a 
              website, creating a brand identity, or working on any visual project, understanding color 
              harmony is essential for creating professional and appealing designs.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ Different types of color harmonies</li>
                <li>✓ How to create balanced color combinations</li>
                <li>✓ Principles of effective color usage</li>
                <li>✓ Practical applications in design</li>
                <li>✓ Tips for choosing harmonious colors</li>
              </ul>
            </div>
          </motion.section>

          {/* Color Harmonies */}
          {harmonies.map((harmony, index) => (
            <motion.section
              key={harmony.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="my-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-48 md:h-64">
                  <img
                    src={harmony.image}
                    alt={harmony.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{harmony.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {harmony.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-4">Color Examples:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {harmony.examples.map((example, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex h-12 rounded-lg overflow-hidden">
                              {example.colors.map((color, j) => (
                                <div
                                  key={j}
                                  className="flex-1"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                              {example.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Usage Tips:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {harmony.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-600 dark:text-gray-300"
                          >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Design Principles */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Key Principles of Color Harmony</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <principle.icon className="w-6 h-6 text-indigo-500 mr-3" />
                    <h3 className="text-xl font-semibold">{principle.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {principle.description}
                  </p>
                  <ul className="space-y-2">
                    {principle.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 dark:text-gray-300 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Putting Theory into Practice</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Understanding color harmony is just the beginning. The real magic happens when you start 
              applying these principles to your designs. Remember that while these rules provide a solid 
              foundation, they're meant to be guidelines rather than strict rules. As you gain experience, 
              you'll develop an intuitive sense of when to follow the rules and when to break them 
              creatively.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Start with basic color harmonies and experiment</li>
                <li>• Consider your audience and project context</li>
                <li>• Use color to support your design's message</li>
                <li>• Test your color combinations in different contexts</li>
                <li>• Don't be afraid to break the rules when appropriate</li>
              </ul>
            </div>
          </motion.section>

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

export default ColorHarmonyGuide; 