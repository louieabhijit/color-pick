import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaBrain, FaShoppingCart, FaChartLine, FaHeart, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorPsychology = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

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
    title: 'How Color Psychology Influences Customer Behavior',
    description: 'Discover how color psychology impacts consumer decisions and brand perception. Learn to leverage color theory for increased conversions and better customer engagement in marketing and web design.',
    author: 'Marketing Psychology Expert',
    date: 'May 7, 2024',
    readTime: '15 min read',
    tags: ['Color Psychology', 'Marketing', 'Consumer Behavior', 'Brand Design', 'Conversion Rate', 'UX Design', 'E-commerce'],
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070'
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

  const colorEmotions = [
    {
      color: '#FF0000',
      name: 'Red',
      emotions: ['Excitement', 'Passion', 'Urgency'],
      marketing: 'Creates urgency, often used for clearance sales',
      examples: ['Sale banners', 'Buy now buttons', 'Food industry'],
      conversion: '+21% in CTA clicks'
    },
    {
      color: '#0000FF',
      name: 'Blue',
      emotions: ['Trust', 'Security', 'Professionalism'],
      marketing: 'Builds trust, popular in corporate and tech sectors',
      examples: ['Banking websites', 'Healthcare', 'Social media'],
      conversion: '+15% in form submissions'
    },
    {
      color: '#008000',
      name: 'Green',
      emotions: ['Growth', 'Health', 'Wealth'],
      marketing: 'Promotes environmental and health aspects',
      examples: ['Eco-friendly products', 'Health foods', 'Financial services'],
      conversion: '+12% in eco-product sales'
    },
    {
      color: '#FFD700',
      name: 'Yellow',
      emotions: ['Optimism', 'Youth', 'Clarity'],
      marketing: 'Grabs attention, creates positive feelings',
      examples: ['Window displays', 'Children\'s products', 'Fast food'],
      conversion: '+18% in youth market engagement'
    },
    {
      color: '#800080',
      name: 'Purple',
      emotions: ['Luxury', 'Royalty', 'Creativity'],
      marketing: 'Appeals to premium market segments',
      examples: ['Beauty products', 'Luxury goods', 'Anti-aging items'],
      conversion: '+25% in luxury product sales'
    }
  ];

  const industryExamples = [
    {
      industry: 'E-commerce',
      title: 'Online Shopping',
      description: 'How colors influence purchase decisions',
      icon: FaShoppingCart,
      insights: [
        'Orange CTAs increase add-to-cart rates',
        'Blue builds trust during checkout',
        'Green for environmental products',
        'Red for sales and urgency'
      ]
    },
    {
      industry: 'Finance',
      title: 'Banking & Finance',
      description: 'Building trust through color',
      icon: FaChartLine,
      insights: [
        'Blue dominates banking websites',
        'Green for wealth management',
        'Black for premium cards',
        'White for transparency'
      ]
    },
    {
      industry: 'Healthcare',
      title: 'Healthcare & Wellness',
      description: 'Colors that heal and comfort',
      icon: FaHeart,
      insights: [
        'Blue for medical expertise',
        'Green for natural healing',
        'White for cleanliness',
        'Purple for alternative medicine'
      ]
    }
  ];

  const conversionTips = [
    {
      title: 'Call-to-Action Buttons',
      tips: [
        'Use contrasting colors for buttons',
        'Test different color combinations',
        'Consider cultural color meanings',
        'Maintain brand consistency'
      ]
    },
    {
      title: 'Landing Pages',
      tips: [
        'Match colors to target emotions',
        'Use color to guide attention',
        'Create visual hierarchy',
        'A/B test color schemes'
      ]
    },
    {
      title: 'Brand Identity',
      tips: [
        'Choose colors that reflect brand values',
        'Consider competitor color schemes',
        'Plan for digital and print use',
        'Test colors across devices'
      ]
    }
  ];

  const researchStats = [
    {
      stat: '85%',
      description: 'of consumers cite color as primary reason for buying a product',
      icon: FaShoppingCart
    },
    {
      stat: '90%',
      description: 'make snap judgments about products based on color alone',
      icon: FaBrain
    },
    {
      stat: '+42%',
      description: 'increase in conversion when using the right color combination',
      icon: FaChartLine
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
        <meta name="keywords" content="color psychology, consumer behavior, marketing psychology, conversion rate optimization, brand design, customer experience, emotional design, visual marketing, color theory, marketing strategy" />
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
            <h2 className="text-2xl md:text-3xl font-bold">The Power of Color in Marketing</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Color psychology in marketing is more than just aesthetic appeal—it's a powerful tool that 
              can influence consumer behavior, drive conversions, and build brand recognition. Understanding 
              how different colors affect customer decisions is crucial for creating effective marketing 
              strategies and designing compelling user experiences.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ How colors trigger emotional responses</li>
                <li>✓ Color psychology principles in marketing</li>
                <li>✓ Industry-specific color strategies</li>
                <li>✓ Conversion optimization through color</li>
                <li>✓ Research-backed color insights</li>
              </ul>
            </div>
          </motion.section>

          {/* Key Statistics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Research-Backed Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
                >
                  <stat.icon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {stat.stat}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ad placement in middle of content */}
          <BannerAd variant="content" />

          {/* Color Emotions Interactive Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Color Emotions & Marketing Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorEmotions.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  onHoverStart={() => setSelectedEmotion(color.name)}
                  onHoverEnd={() => setSelectedEmotion(null)}
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: color.color }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{color.name}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Emotions:</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {color.emotions.map((emotion, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700"
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Marketing Use:</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {color.marketing}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Impact:</h4>
                        <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                          {color.conversion}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Industry Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Industry Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industryExamples.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <industry.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{industry.description}</p>
                  <ul className="space-y-2">
                    {industry.insights.map((insight, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Conversion Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Conversion Optimization Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {conversionTips.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                      >
                        <FaCheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="my-12 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaExclamationCircle className="text-red-500 mr-3" />
              Common Color Psychology Mistakes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <p className="text-gray-700 dark:text-gray-300">
                  Using too many colors that compete for attention
                </p>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <p className="text-gray-700 dark:text-gray-300">
                  Ignoring cultural color associations in global markets
                </p>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <p className="text-gray-700 dark:text-gray-300">
                  Not testing color combinations with target audience
                </p>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></span>
                <p className="text-gray-700 dark:text-gray-300">
                  Failing to maintain consistent brand colors across platforms
                </p>
              </div>
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Final Thoughts</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Color psychology is a powerful tool in marketing and design that can significantly impact 
              consumer behavior and business success. By understanding and properly implementing color 
              psychology principles, businesses can create more effective marketing strategies, improve 
              user experience, and ultimately drive better results.
            </p>

            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Research your target audience's color preferences</li>
                <li>• Test different color combinations for optimal results</li>
                <li>• Consider cultural context in color choices</li>
                <li>• Maintain consistency across all platforms</li>
                <li>• Monitor and measure color impact on conversions</li>
              </ul>
            </div>
          </motion.section>

          {/* Ad placement before social sharing */}
          <BannerAd variant="footer" />

          {/* Social Sharing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
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
            className="fixed bottom-8 right-8 p-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPsychology; 