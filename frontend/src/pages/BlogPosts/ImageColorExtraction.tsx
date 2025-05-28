import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp, FaImage, FaCode, FaPalette, FaCheck } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ImageColorExtraction = () => {
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
    title: 'How to Extract Colors from an Image for Web Design',
    description: 'Learn professional techniques for extracting beautiful color palettes from images. Master color sampling, palette generation, and how to apply extracted colors effectively in your web designs.',
    author: 'Design Expert',
    date: 'May 3, 2024',
    readTime: '10 min read',
    tags: ['Color Extraction', 'Web Design', 'UI/UX', 'Color Palettes', 'Design Tools', 'Image Analysis'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070'
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

  const methods = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Color Extraction',
      description: 'Using machine learning algorithms to analyze images and extract the most prominent and harmonious colors.',
      steps: [
        'Upload your image to an AI-powered tool like ColorPeek',
        'Let the algorithm analyze color distribution',
        'Review and refine suggested palettes',
        'Export colors in your preferred format'
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21c1edcd845f?q=80&w=1000',
      tools: ['ColorPeek', 'Adobe Color', 'Canva Color Palette Generator']
    },
    {
      id: 'manual-extraction',
      title: 'Manual Color Picking',
      description: 'Traditional method using design software to manually select and extract colors from specific areas of an image.',
      steps: [
        'Open image in your preferred design software',
        'Use the eyedropper tool to sample colors',
        'Create swatches for selected colors',
        'Organize and save your palette'
      ],
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000',
      tools: ['Adobe Photoshop', 'Figma', 'Sketch']
    },
    {
      id: 'code-based',
      title: 'Programmatic Color Extraction',
      description: 'Using code and algorithms to analyze image data and extract dominant colors programmatically.',
      steps: [
        'Load image data using your preferred programming language',
        'Implement color quantization algorithm',
        'Process and cluster similar colors',
        'Generate color palette programmatically'
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000',
      tools: ['Python with ColorThief', 'JavaScript with node-vibrant', 'OpenCV']
    }
  ];

  const tips = [
    {
      title: 'Consider Color Harmony',
      description: 'Ensure extracted colors work well together by following color theory principles.',
      icon: FaPalette
    },
    {
      title: 'Test for Accessibility',
      description: 'Verify that extracted colors meet WCAG contrast requirements for web accessibility.',
      icon: FaCheck
    },
    {
      title: 'Maintain Consistency',
      description: 'Use extracted colors consistently throughout your design for visual coherence.',
      icon: FaImage
    },
    {
      title: 'Document Color Codes',
      description: 'Save color codes in multiple formats (HEX, RGB, HSL) for different use cases.',
      icon: FaCode
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
        <meta name="keywords" content="color extraction, image analysis, web design, color palette generator, design tools, color picking, color sampling, UI design, color theory, image colors" />
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
            <h2 className="text-2xl md:text-3xl font-bold">Mastering Color Extraction for Web Design</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Extracting colors from images is a powerful technique for creating cohesive and visually appealing web designs. 
              Whether you're working on a brand website, portfolio, or e-commerce platform, understanding how to effectively 
              extract and utilize colors from images can elevate your design to the next level.
            </p>

            {/* Quick Summary */}
            <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ Different methods of color extraction</li>
                <li>✓ Tools and techniques for accurate color sampling</li>
                <li>✓ Best practices for creating balanced palettes</li>
                <li>✓ How to apply extracted colors effectively</li>
                <li>✓ Tips for maintaining color harmony</li>
              </ul>
            </div>
          </motion.section>

          {/* Methods */}
          {methods.map((method, index) => (
            <motion.section
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="my-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-48 md:h-64">
                  <img
                    src={method.image}
                    alt={method.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {method.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">Step-by-Step Process:</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-600 dark:text-gray-300"
                          >
                            <span className="w-6 h-6 flex items-center justify-center bg-indigo-500 text-white rounded-full mr-3 text-sm">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-3">Recommended Tools:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {method.tools.map((tool, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-600 dark:text-gray-300"
                          >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}

          {/* Pro Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="my-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Pro Tips for Color Extraction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <tip.icon className="w-6 h-6 text-indigo-500 mr-3" />
                    <h3 className="text-xl font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
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
            transition={{ delay: 1.0 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Putting It All Together</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Color extraction is both an art and a science. By combining the right tools and techniques with 
              your design intuition, you can create stunning color palettes that enhance your web designs and 
              create memorable user experiences. Remember to always consider your target audience and brand 
              guidelines when selecting and applying extracted colors.
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl mt-8">
              <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Choose the extraction method that best suits your project needs</li>
                <li>• Always validate extracted colors for accessibility</li>
                <li>• Create a systematic approach to organizing extracted colors</li>
                <li>• Test your color palette across different devices and contexts</li>
                <li>• Document your color extraction process for future reference</li>
              </ul>
            </div>
          </motion.section>

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

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
            className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageColorExtraction; 