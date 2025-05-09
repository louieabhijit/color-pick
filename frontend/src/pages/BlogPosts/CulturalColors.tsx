import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowUp, FaGlobeAmericas, FaHeart, FaSun, FaMoon, FaPray, FaCrown, FaDove, FaLandmark, FaHome } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

interface ColorCard {
  color: string;
  title: string;
  cultures: {
    region: string;
    meaning: string;
    icon?: JSX.Element;
  }[];
}

const CulturalColors = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  const images = {
    hero: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=60',
    importance: 'https://images.unsplash.com/photo-1461344577544-4e5dc9487184?w=800&auto=format&fit=crop&q=60',
    design: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&auto=format&fit=crop&q=60',
    conclusion: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=800&auto=format&fit=crop&q=60'
  };

  const metadata = {
    title: 'Cultural Significance of Colors Around the World | Color-Peek',
    description: 'Explore the rich cultural meanings of colors across different countries and traditions. Discover how red, blue, white, and more are interpreted around the world.',
    ogDescription: 'From red in China to white in India, uncover how different cultures assign deep meaning to colors. A guide for designers, marketers, and global thinkers.',
    twitterDescription: 'Understand how color symbolism changes by culture and region. This global perspective helps in design, marketing, and cross-cultural communication.',
    url: 'https://color-peek.com/blog/cultural-significance-of-colors',
    image: images.hero
  };

  const colorCards: ColorCard[] = [
    {
      color: '#FF4D4D',
      title: 'Red',
      cultures: [
        { region: 'Western', meaning: 'Love, passion, energy, danger', icon: <FaHeart className="text-red-500" /> },
        { region: 'China', meaning: 'Luck, prosperity, celebration', icon: <FaLandmark className="text-red-600" /> },
        { region: 'India', meaning: 'Purity, marital bliss, fertility', icon: <FaHome className="text-red-700" /> }
      ]
    },
    {
      color: '#4D79FF',
      title: 'Blue',
      cultures: [
        { region: 'Western', meaning: 'Trust, calm, stability', icon: <FaGlobeAmericas className="text-blue-500" /> },
        { region: 'Middle East', meaning: 'Protection, ward off evil', icon: <FaPray className="text-blue-600" /> },
        { region: 'India', meaning: 'Divine love, Krishna', icon: <FaCrown className="text-blue-700" /> }
      ]
    },
    // ... Add more color cards for other colors
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:image" content={metadata.image} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.twitterDescription} />
        <meta name="twitter:image" content={metadata.image} />

        {/* Additional SEO Tags */}
        <meta name="keywords" content="cultural meaning of colors, color symbolism across cultures, color psychology by country, global branding color tips" />
        <meta name="author" content="Color-Peek" />
        <link rel="canonical" href={metadata.url} />

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
            Cultural Significance of Colors Around the World
          </motion.h1>
        </div>
      </motion.div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-16">
            <p className="mb-4 text-lg leading-relaxed">
              Color plays a universal role in how we perceive, express, and connect with the world. While color is often viewed as a design or aesthetic element, its meanings run deeper than most realize. Across cultures, colors convey powerful messages, symbolize beliefs, and reflect values passed down through generations.
            </p>
          </section>

          {/* Why Color Meanings Matter */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <FaGlobeAmericas className="mr-3 text-blue-500" />
              Why Color Meanings Matter
            </h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.importance} 
                alt="Global Color Meanings" 
                className="w-full h-[300px] object-cover"
              />
            </div>
            <p className="mb-4">
              Color symbolism is deeply tied to cultural context. What is considered sacred in one culture might represent mourning in another. In today's globalized world, color sensitivity is essential for:
            </p>
            <ul className="list-none space-y-3">
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-center text-gray-800 dark:text-gray-200"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                International branding
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-center text-gray-800 dark:text-gray-200"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                UI/UX design
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-center text-gray-800 dark:text-gray-200"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Marketing campaigns
              </motion.li>
            </ul>
          </section>

          {/* Interactive Color Cards */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Colors Across Cultures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colorCards.map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div 
                    className="h-20" 
                    style={{ backgroundColor: card.color }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                    <div className="space-y-4">
                      {card.cultures.map((culture, idx) => (
                        <div key={idx} className="flex items-start">
                          {culture.icon && (
                            <div className="mt-1 mr-3">
                              {culture.icon}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold">{culture.region}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{culture.meaning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Global Design Implications */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
              <FaGlobeAmericas className="mr-3 text-blue-500" />
              Global Design Implications
            </h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.design} 
                alt="Global Design Considerations" 
                className="w-full h-[300px] object-cover"
              />
            </div>
            <p className="mb-4">
              When designing for an international audience, color choices can make a significant difference in how your content is perceived. For example:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 space-y-4">
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-start"
              >
                <FaHeart className="text-red-500 mt-1 mr-3" />
                <p>A health app using green in Western countries may signal nature and wellness, but may need reconsideration in China.</p>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-start"
              >
                <FaCrown className="text-purple-500 mt-1 mr-3" />
                <p>Using red for a wedding brand would resonate positively in China and India, but may appear aggressive in Western Europe.</p>
              </motion.div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Final Thoughts</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.conclusion} 
                alt="Global Color Understanding" 
                className="w-full h-[300px] object-cover"
              />
            </div>
            <p className="mb-4">
              Color is more than a visual element—it's a cultural language. When understood and respected, it can enhance communication, deepen connections, and ensure global relevance.
            </p>
            <p className="mb-4">
              For designers and marketers alike, a color is never just a color—it's a message. And with tools like <a href="https://color-peek.com" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">Color-Peek</a>, you can explore and apply these meanings with both creativity and cultural sensitivity.
            </p>
          </section>
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
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CulturalColors; 