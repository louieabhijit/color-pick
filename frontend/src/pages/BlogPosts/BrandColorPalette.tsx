import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const BrandColorPalette = () => {
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

  const images = {
    hero: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    brandIdentity: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=60',
    colorPsychology: 'https://images.unsplash.com/photo-1460411794035-42aac080490a?w=800&auto=format&fit=crop&q=60',
    competitor: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60',
    primaryColor: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60',
    secondaryColors: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=800&auto=format&fit=crop&q=60',
    neutralTones: 'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=800&auto=format&fit=crop&q=60',
    testing: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&auto=format&fit=crop&q=60',
    documentation: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60'
  };

  const metadata = {
    title: 'How to Choose the Right Color Palette for Your Brand | Color-Peek',
    description: 'Discover how to select the perfect color palette for your brand. Learn color psychology, branding tips, and effective strategies for startups and businesses.',
    ogDescription: 'Explore the fundamentals of choosing brand colors, including psychology, competitor analysis, and tools to craft the perfect palette for your business.',
    twitterDescription: 'Learn how to effectively select brand colors using psychology, market insights, and essential color tools. Perfect for startups and established brands.',
    url: 'https://color-peek.com/blog/how-to-choose-brand-color-palette',
    image: images.hero
  };

  const tools = [
    {
      name: "Adobe Color",
      url: "https://color.adobe.com",
      description: "Professional color wheel and palette generation tool"
    },
    {
      name: "colorPeek",
      url: "https://color-peek.com/palettes",
      description: "Fast color scheme generator with trending palettes"
    },
    {
      name: "Canva Color Wheel",
      url: "https://www.canva.com/colors/color-wheel",
      description: "Interactive color wheel to explore color relationships"
    }
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
        <meta name="keywords" content="brand colors, color palette, color psychology, branding, brand identity, color theory, brand design" />
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
            {metadata.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Understanding Brand Identity */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Understanding Brand Identity</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.brandIdentity} 
                alt="Brand Identity Concept" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Building a strong brand identity starts with understanding your core values</p>
            </div>
            <p className="mb-4">
              Before diving into color selection, it's crucial to have a clear understanding of your brand's identity. This includes your company's values, mission, target audience, and the emotions you want to evoke. Your brand's personality should be reflected in every visual element, including your color palette.
            </p>
            <p className="mb-4">
              Consider questions like: What makes your brand unique? What emotions do you want to evoke in your audience? How do you want to be perceived in the market? The answers to these questions will guide your color selection process.
            </p>
          </section>

          {/* Color Psychology Basics */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Color Psychology Basics</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.colorPsychology} 
                alt="Color Psychology" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Colors can evoke powerful emotions and associations</p>
            </div>
            <p className="mb-4">
              Color psychology plays a vital role in brand perception. Different colors evoke different emotions and associations. For example, blue often represents trust and professionalism, while red can signify energy and excitement. Understanding these psychological impacts will help you choose colors that align with your brand message.
            </p>
            <p className="mb-4">
              Remember that color associations can vary across cultures, so consider your target market's cultural context when making color choices.
            </p>
          </section>

          {/* Competitor Analysis */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Competitor Analysis</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.competitor} 
                alt="Competitor Analysis" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Analyzing competitor brands helps identify opportunities for differentiation</p>
            </div>
            <p className="mb-4">
              Research your competitors' color choices to understand industry trends and identify opportunities for differentiation. While you don't want to blend in completely, you also don't want to stray too far from established industry conventions that your audience might expect.
            </p>
            <p className="mb-4">
              Create a mood board of competitor brands and analyze their color choices, noting both successful and unsuccessful examples.
            </p>
          </section>

          {/* Primary Color Selection */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Primary Color Selection</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.primaryColor} 
                alt="Primary Color Selection" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Your primary color sets the foundation for your brand's visual identity</p>
            </div>
            <p className="mb-4">
              Your primary color will be the most recognizable element of your brand's visual identity. Choose a color that not only reflects your brand personality but also works well across different mediums and applications. Consider factors like digital displays, print materials, and physical products.
            </p>
            <p className="mb-4">
              Test your primary color in various contexts and lighting conditions to ensure it maintains its impact and legibility.
            </p>
          </section>

          {/* Secondary Colors */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Secondary Colors</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.secondaryColors} 
                alt="Secondary Colors" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Secondary colors create harmony and visual interest in your palette</p>
            </div>
            <p className="mb-4">
              Secondary colors should complement your primary color while providing enough contrast for visual interest. Use color theory principles like complementary, analogous, or triadic color schemes to create a harmonious palette.
            </p>
            <p className="mb-4">
              Limit your secondary color palette to 2-3 colors to maintain consistency and avoid visual confusion.
            </p>
          </section>

          {/* Neutral Tones */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Neutral Tones</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.neutralTones} 
                alt="Neutral Tones" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Neutral colors provide balance and versatility to your palette</p>
            </div>
            <p className="mb-4">
              Neutral colors like whites, grays, and blacks are essential for creating balance in your color palette. They provide breathing room and help highlight your primary and secondary colors effectively.
            </p>
            <p className="mb-4">
              Choose neutrals that complement your main colors and work well in both light and dark modes.
            </p>
          </section>

          {/* Testing and Refinement */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Testing and Refinement</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.testing} 
                alt="Testing and Refinement" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Thorough testing ensures your color palette works in all contexts</p>
            </div>
            <p className="mb-4">
              Test your color palette across different platforms and materials. Consider accessibility standards and ensure sufficient contrast for readability. Get feedback from stakeholders and potential customers.
            </p>
            <p className="mb-4">
              Be prepared to make adjustments based on real-world application and user feedback.
            </p>
          </section>

          {/* Documentation Guidelines */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Documentation Guidelines</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.documentation} 
                alt="Documentation Guidelines" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Proper documentation ensures consistent brand color usage</p>
            </div>
            <p className="mb-4">
              Create comprehensive documentation for your color palette, including specific color values (HEX, RGB, CMYK), usage guidelines, and examples. This ensures consistency across all brand applications.
            </p>
            <p className="mb-4">
              Include rules for color combinations, hierarchy, and accessibility requirements in your documentation.
            </p>
          </section>

          {/* Useful Tools */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Useful Color Selection Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    {tool.name}
                    <FaExternalLinkAlt className="ml-2 w-4 h-4" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                </motion.a>
              ))}
            </div>
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
            className="fixed bottom-8 right-8 p-4 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandColorPalette; 