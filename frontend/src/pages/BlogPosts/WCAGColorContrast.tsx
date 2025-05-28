import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaUniversalAccess, FaMobileAlt, FaDesktop, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const WCAGColorContrast = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contrastExample, setContrastExample] = useState({
    foreground: '#000000',
    background: '#FFFFFF',
  });
  const [contrastRatio, setContrastRatio] = useState('21:1');

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
    title: 'WCAG 2.1 Color Contrast Guidelines Explained',
    description: 'Master WCAG 2.1 color contrast requirements for web accessibility. Learn how to create accessible designs that comply with AA and AAA standards. Essential guide for web designers and developers.',
    author: 'Accessibility Expert',
    date: 'May 5, 2024',
    readTime: '12 min read',
    tags: ['WCAG 2.1', 'Accessibility', 'Color Contrast', 'Web Design', 'UI/UX', 'A11y', 'Web Standards'],
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2070'
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

  const contrastLevels = [
    {
      id: 'level-aa',
      title: 'WCAG 2.1 Level AA Requirements',
      requirements: [
        { type: 'Normal Text', ratio: '4.5:1', size: '< 18pt' },
        { type: 'Large Text', ratio: '3:1', size: '≥ 18pt' },
        { type: 'UI Components', ratio: '3:1', description: 'For active interface components' }
      ],
      examples: [
        { background: '#FFFFFF', foreground: '#747474', passes: true },
        { background: '#000000', foreground: '#787878', passes: false }
      ]
    },
    {
      id: 'level-aaa',
      title: 'WCAG 2.1 Level AAA Requirements',
      requirements: [
        { type: 'Normal Text', ratio: '7:1', size: '< 18pt' },
        { type: 'Large Text', ratio: '4.5:1', size: '≥ 18pt' }
      ],
      examples: [
        { background: '#FFFFFF', foreground: '#595959', passes: true },
        { background: '#000000', foreground: '#A6A6A6', passes: false }
      ]
    }
  ];

  const interactiveTools = [
    {
      title: 'Contrast Checker',
      description: 'Test color combinations against WCAG standards',
      icon: FaUniversalAccess
    },
    {
      title: 'Mobile View',
      description: 'Check contrast on mobile devices',
      icon: FaMobileAlt
    },
    {
      title: 'Desktop View',
      description: 'Verify contrast on larger screens',
      icon: FaDesktop
    }
  ];

  const bestPractices = [
    {
      title: 'Text Readability',
      tips: [
        'Use sufficient contrast for all text elements',
        'Consider different viewing conditions',
        'Test with various font sizes',
        'Account for different screen types'
      ]
    },
    {
      title: 'UI Components',
      tips: [
        'Ensure interactive elements are distinguishable',
        'Maintain contrast in hover/focus states',
        'Test contrast in different states',
        'Consider color blindness'
      ]
    },
    {
      title: 'Implementation',
      tips: [
        'Use CSS custom properties for consistency',
        'Implement dark mode properly',
        'Test with accessibility tools',
        'Document color contrast decisions'
      ]
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
        <meta name="keywords" content="WCAG 2.1, web accessibility, color contrast, accessibility guidelines, web design, UI design, a11y, contrast ratio, AA compliance, AAA compliance, accessible design" />
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
            <h2 className="text-2xl md:text-3xl font-bold">Understanding WCAG Color Contrast</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Color contrast is a fundamental aspect of web accessibility that ensures content is readable 
              by all users, including those with visual impairments. WCAG 2.1 provides specific guidelines 
              for contrast ratios that help create accessible and inclusive designs.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ WCAG 2.1 contrast requirements for AA and AAA levels</li>
                <li>✓ How to measure and test color contrast</li>
                <li>✓ Best practices for implementing accessible colors</li>
                <li>✓ Tools and techniques for contrast checking</li>
                <li>✓ Common pitfalls and how to avoid them</li>
              </ul>
            </div>
          </motion.section>

          {/* Interactive Contrast Demo */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="my-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Interactive Contrast Checker</h3>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Foreground Color</label>
                  <input
                    type="color"
                    value={contrastExample.foreground}
                    onChange={(e) => setContrastExample(prev => ({
                      ...prev,
                      foreground: e.target.value
                    }))}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <input
                    type="color"
                    value={contrastExample.background}
                    onChange={(e) => setContrastExample(prev => ({
                      ...prev,
                      background: e.target.value
                    }))}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              <div
                className="p-8 rounded-lg text-center text-xl font-semibold"
                style={{
                  backgroundColor: contrastExample.background,
                  color: contrastExample.foreground
                }}
              >
                Sample Text
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">Contrast Ratio: {contrastRatio}</p>
                <div className="mt-2 space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <FaCheck className="w-4 h-4 mr-1" /> AA Pass
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    AAA Review Needed
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* WCAG Requirements */}
          {contrastLevels.map((level, index) => (
            <motion.section
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="my-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-6">{level.title}</h3>
                  <div className="space-y-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b dark:border-gray-700">
                            <th className="px-4 py-3 text-left">Content Type</th>
                            <th className="px-4 py-3 text-left">Minimum Ratio</th>
                            <th className="px-4 py-3 text-left">Size</th>
                          </tr>
                        </thead>
                        <tbody>
                          {level.requirements.map((req, i) => (
                            <tr key={i} className="border-b dark:border-gray-700">
                              <td className="px-4 py-3">{req.type}</td>
                              <td className="px-4 py-3">{req.ratio}</td>
                              <td className="px-4 py-3">{req.size}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4">Example Combinations:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {level.examples.map((example, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-lg"
                            style={{
                              backgroundColor: example.background,
                              color: example.foreground
                            }}
                          >
                            <p className="text-center">
                              Sample Text
                              <span className="block text-sm mt-2">
                                {example.passes ? '✓ Passes' : '× Fails'} {level.id.toUpperCase()}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Best Practices */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Best Practices for Implementation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bestPractices.map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">{practice.title}</h3>
                  <ul className="space-y-2">
                    {practice.tips.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tools Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Essential Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {interactiveTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
                >
                  <tool.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ad placement in middle of content */}
          <BannerAd variant="content" />

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Final Thoughts</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Implementing proper color contrast isn't just about following guidelines—it's about creating 
              an inclusive web that everyone can access and enjoy. By understanding and applying WCAG 2.1 
              contrast requirements, you're not only improving accessibility but also enhancing the overall 
              user experience of your designs.
            </p>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Always test contrast ratios during design</li>
                <li>• Consider both AA and AAA compliance levels</li>
                <li>• Use appropriate tools for verification</li>
                <li>• Test in various lighting conditions</li>
                <li>• Document your accessibility decisions</li>
              </ul>
            </div>
          </motion.section>

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

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

          {/* Ad placement before social sharing */}
          <BannerAd variant="footer" />

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
            className="fixed bottom-8 right-8 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WCAGColorContrast; 