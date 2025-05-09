import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const ColorAccessibility = () => {
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
    colorBlindness: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60',
    accessibility: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=800&auto=format&fit=crop&q=60',
    contrast: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    tools: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    ui: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=60'
  };

  const metadata = {
    title: 'Color Accessibility: Designing for Color Blind Users | Color-Peek',
    description: 'Learn how to design accessible experiences for color blind users with practical tips, best practices, and tools to create inclusive, user-friendly designs.',
    ogDescription: 'Discover essential strategies and tools for creating color-blind friendly designs, ensuring your content is inclusive and accessible to all users.',
    twitterDescription: 'Ensure your designs are accessible to color blind users with actionable tips, recommended palettes, and essential accessibility tools.',
    url: 'https://color-peek.com/blog/color-accessibility-designing-for-color-blind-users',
    image: images.hero
  };

  const tools = [
    {
      name: "Color-Peek Contrast Checker",
      url: "https://color-pick.com/tools/contrast-checker",
      description: "Check color contrast ratios and ensure WCAG compliance with our easy-to-use tool"
    },
    {
      name: "Color-Peek Palette Generator",
      url: "https://color-pick.com/palettes",
      description: "Create accessible color palettes with built-in color blindness simulation"
    },
    {
      name: "Coblis Color Blindness Simulator",
      url: "https://www.color-blindness.com/coblis-color-blindness-simulator/",
      description: "Simulate how your design appears to color-blind users"
    },
    {
      name: "Color Oracle",
      url: "https://colororacle.org",
      description: "Preview color blindness conditions on your designs instantly"
    },
    {
      name: "WebAIM Contrast Checker",
      url: "https://webaim.org/resources/contrastchecker/",
      description: "Check color contrast ratios for accessibility compliance"
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
        <meta name="keywords" content="color accessibility, color blindness, accessible design, color contrast, inclusive design, web accessibility, WCAG" />
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
            Color Accessibility: Designing for Color Blind Users
          </motion.h1>
        </div>
      </motion.div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-16">
            <p className="mb-4">
              Color is integral to design—it captivates users, communicates messages, and enhances user experiences. But for millions around the globe, colors aren't perceived in the same way. Approximately 8% of men and 0.5% of women worldwide are color blind, highlighting the essential need for color accessibility in design.
            </p>
            <p className="mb-4">
              In this comprehensive guide, we'll explore how to design effectively for color-blind users, ensuring inclusivity and optimal usability.
            </p>
          </section>

          {/* Understanding Color Blindness */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Understanding Color Blindness</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.colorBlindness} 
                alt="Understanding Color Blindness" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Different types of color blindness affect how people perceive colors</p>
            </div>
            <p className="mb-4">
              Color blindness, or color vision deficiency, isn't a complete inability to see color; rather, it's difficulty distinguishing between specific colors. The most common forms are:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Deuteranopia and Deuteranomaly: Green deficiencies</li>
              <li>Protanopia and Protanomaly: Red deficiencies</li>
              <li>Tritanopia and Tritanomaly: Blue deficiencies</li>
            </ul>
            <p className="mb-4">
              The most frequent type is red-green color blindness, affecting how individuals perceive these two colors and their variations.
            </p>
          </section>

          {/* Why is Color Accessibility Important */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why is Color Accessibility Important?</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.accessibility} 
                alt="Importance of Color Accessibility" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Accessible design benefits all users, not just those with color blindness</p>
            </div>
            <p className="mb-4">
              Ensuring designs are accessible to color-blind individuals enhances usability, compliance with regulations, and broadens your potential audience.
            </p>
            <p className="mb-4">
              Accessibility isn't just ethical—it's practical. Inclusive designs improve the user experience for everyone, often resulting in clearer and more intuitive designs overall.
            </p>
          </section>

          {/* Principles of Accessible Color Design */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Principles of Accessible Color Design</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.contrast} 
                alt="Color Design Principles" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">High contrast and clear visual hierarchy are essential for accessible design</p>
            </div>
            
            <h3 className="text-xl font-bold mb-4">1. Never Rely Solely on Color</h3>
            <p className="mb-4">
              Always accompany color-coded information with textual descriptions, patterns, or icons. For example:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Instead of indicating an error with red text alone, include an error icon and descriptive text</li>
              <li>For graphs or charts, use texture or pattern fills alongside color differences</li>
            </ul>

            <h3 className="text-xl font-bold mb-4">2. Use High-Contrast Colors</h3>
            <p className="mb-4">
              High contrast ensures readability and distinction between foreground and background colors. Tools like the Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text.
            </p>

            <h3 className="text-xl font-bold mb-4">3. Choose Color-Blind Friendly Palettes</h3>
            <p className="mb-4">
              Selecting colors that are distinguishable to most people, including those with color blindness, can dramatically improve accessibility. Effective palettes typically avoid problematic pairings like red-green or blue-purple.
            </p>
            <p className="mb-4">Popular color-blind friendly palettes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Blue & Orange</li>
              <li>Blue & Brown</li>
              <li>Yellow & Purple</li>
            </ul>
          </section>

          {/* Tools and Resources */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tools to Ensure Color Accessibility</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.tools} 
                alt="Accessibility Tools" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Various tools are available to help test and ensure color accessibility</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <a
                  key={index}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    {tool.name}
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Designing Accessible UIs */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Designing Accessible User Interfaces (UIs)</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.ui} 
                alt="Accessible UI Design" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Accessible UI design considers all users' needs</p>
            </div>
            <h3 className="text-xl font-bold mb-4">Clear Navigation</h3>
            <p className="mb-4">
              Buttons, links, and interactive elements should be easily distinguishable without relying solely on color differences. Consider underlines, shapes, or icons to highlight active or selected states.
            </p>

            <h3 className="text-xl font-bold mb-4">Form Validation</h3>
            <p className="mb-4">
              Provide explicit text explanations for errors or form status rather than relying solely on color indicators.
            </p>

            <h3 className="text-xl font-bold mb-4">Icons and Labels</h3>
            <p className="mb-4">
              Icons should always be paired with textual labels to reinforce their meaning, removing ambiguity and enhancing clarity.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Conclusion</h2>
            <p className="mb-4">
              Designing with color accessibility in mind isn't just a niche consideration—it's a universal necessity. By adhering to accessible design principles, selecting effective color palettes, and using robust verification tools, designers can create inclusive experiences that are effective for everyone, regardless of color vision ability.
            </p>
            <p className="mb-4">
              Start incorporating these principles today to build designs that resonate with and include everyone.
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

export default ColorAccessibility; 