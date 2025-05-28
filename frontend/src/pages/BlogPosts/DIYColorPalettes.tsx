import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import AdsterraAd from '../../components/AdsterraAd';
import BannerAd from '../../components/BannerAd';
import PopunderAd from '../../components/PopunderAd';

const DIYColorPalettes = () => {
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
    hero: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=60',
    whatIs: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&fit=crop&q=60',
    customPalette: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&auto=format&fit=crop&q=60',
    stepByStep: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60',
    tips: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60',
    applications: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop&q=60'
  };

  const metadata = {
    title: 'DIY: Creating Your Own Color Palettes Using Color-Peek',
    description: 'Learn how to create stunning, accessible, and personalized color palettes using Color-Peek. A perfect guide for designers, developers, and creatives.',
    ogDescription: 'Step-by-step guide to building your own color palette with Color-Peek. Ideal for branding, web design, art, fashion, and more.',
    twitterDescription: 'Learn how to extract, build, and customize your own color palette with this user-friendly tutorial using Color-Peek.',
    url: 'https://color-peek.com/blog/diy-creating-color-palettes-using-color-peek',
    image: images.hero
  };

  const tools = [
    {
      name: "Color Extractor",
      url: "https://color-peek.com",
      description: "Extract colors from any image automatically"
    },
    {
      name: "Contrast Checker",
      url: "https://color-peek.com",
      description: "Ensure your color combinations meet accessibility standards"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>{metadata.title} | Color Pick Blog</title>
        <link rel="canonical" href={metadata.url} />
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
        <meta name="keywords" content="DIY color palette creator, color palette generator, extract colors from image, custom branding palette, color wheel design, Color-Peek tutorial" />
        <meta name="author" content="Color-Peek" />

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
            DIY: Creating Your Own Color Palettes Using Color-Peek
          </motion.h1>
        </div>
      </motion.div>

      {/* Ad placement after hero */}
      <AdsterraAd variant="content" />
      <BannerAd variant="content" />

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-16">
            <p className="mb-4">
              Whether you're designing a website, building a brand, decorating your home, or curating your next art project, choosing the right color palette can make or break your outcome. But finding the perfect combination of colors isn't always easy—especially if you're not a trained designer.
            </p>
            <p className="mb-4">
              That's where Color-Peek comes in.
            </p>
            <p className="mb-4">
              In this comprehensive guide, we'll walk you through how to create stunning, personalized color palettes using Color-Peek—your free, user-friendly online tool. Plus, we'll share pro tips, SEO insights, and best practices to make your DIY palette creation both creative and effective.
            </p>
          </section>

          {/* What Is Color-Peek */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🎨 What Is Color-Peek?</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.whatIs} 
                alt="Color-Peek Interface" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Color-Peek's intuitive interface makes color palette creation easy</p>
            </div>
            <p className="mb-4">
              Color-Peek is an intuitive tool designed to help creatives, designers, marketers, and everyday users extract, analyze, and organize colors. From pulling palettes out of uploaded images to tweaking shades manually, it's a one-stop solution for anyone interested in working with color.
            </p>
            <p className="mb-4">
              Whether you're a beginner looking to pick colors for a passion project or a UX designer refining a brand's aesthetic, Color-Peek makes it seamless.
            </p>
          </section>

          {/* Why Use a Custom Color Palette */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🧠 Why Use a Custom Color Palette?</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.customPalette} 
                alt="Custom Color Palette Benefits" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">A thoughtfully curated palette enhances visual communication</p>
            </div>
            <p className="mb-4">A thoughtfully curated palette:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Sets a mood</li>
              <li>Defines brand identity</li>
              <li>Improves visual harmony</li>
              <li>Helps with accessibility</li>
            </ul>
            <p className="mb-4">
              When you build a palette yourself, you're crafting a visual language that speaks uniquely to your goals.
            </p>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🔧 Step-by-Step: Creating Your Own Color Palette</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.stepByStep} 
                alt="Step-by-Step Color Palette Creation" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Follow these steps to create your perfect palette</p>
            </div>

            <h3 className="text-xl font-bold mb-4">1. Start with an Image or a Vision</h3>
            <p className="mb-4">
              If you have an image that inspires you—a photo from your travels, a piece of artwork, or even a screenshot—you can upload it directly into Color-Peek. This lets you extract natural, harmonious colors already balanced by real-life lighting and composition.
            </p>
            <p className="mb-4 italic">
              Tip: Images with natural lighting and a consistent color theme yield the best results.
            </p>

            <h3 className="text-xl font-bold mb-4">2. Use the Color Extractor Tool</h3>
            <p className="mb-4">
              Once uploaded, Color-Peek automatically generates a palette from your image. You'll get:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>HEX codes</li>
              <li>RGB values</li>
              <li>Color names</li>
              <li>Variations (tints, shades, tones)</li>
            </ul>

            <h3 className="text-xl font-bold mb-4">3. Adjust and Fine-Tune Your Colors</h3>
            <p className="mb-4">Now comes the fun part: personalization.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modify color values manually</li>
              <li>Replace one or two colors to better suit your style</li>
              <li>Use the interactive color wheel for real-time experimentation</li>
            </ul>

            <h3 className="text-xl font-bold mb-4">4. Use the Contrast Checker</h3>
            <p className="mb-4">
              Accessibility is essential. Color-Peek's built-in contrast checker helps you ensure your color combinations meet WCAG standards for text visibility.
            </p>
            <p className="mb-4 italic">
              Pro Tip: Aim for a contrast ratio of at least 4.5:1 for normal text.
            </p>

            <h3 className="text-xl font-bold mb-4">5. Download or Save Your Palette</h3>
            <p className="mb-4">Once you're happy with your palette, you can:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Save the palette to your favorites (if logged in)</li>
              <li>Download a palette file (JSON, HEX, PNG, or CSS snippets)</li>
              <li>Copy HEX codes to clipboard for fast implementation</li>
            </ul>
          </section>

          {/* Tips Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">💡 Tips for Creating the Perfect Palette</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.tips} 
                alt="Color Palette Tips" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Expert tips for creating harmonious color combinations</p>
            </div>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Start with a Base Color:</strong> Choose a dominant shade that sets the tone.</li>
              <li><strong>Balance with Neutrals:</strong> Use whites, grays, or blacks to create breathing space.</li>
              <li><strong>Use Analogous or Complementary Colors:</strong> Refer to the color wheel for harmonious or vibrant combinations.</li>
              <li><strong>Test in Context:</strong> Apply your palette to a mockup to see how it performs in real-world scenarios.</li>
            </ul>
          </section>

          {/* Tools Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🛠️ Essential Color-Peek Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Real-Life Applications */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🌐 Real-Life Applications</h2>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.applications} 
                alt="Real-Life Color Palette Applications" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Color palettes in action across different design fields</p>
            </div>
            <ol className="list-decimal pl-6 mb-4">
              <li><strong>Web Design:</strong> Designers use Color-Peek palettes to ensure their site colors are consistent and accessible.</li>
              <li><strong>Branding & Logos:</strong> Entrepreneurs build custom color schemes to reflect brand emotion and voice.</li>
              <li><strong>Interior Design:</strong> DIY decorators visualize how wall, floor, and accent colors play together.</li>
              <li><strong>Fashion & Textiles:</strong> Tailors and creators pull hues from nature or fashion photos to guide their fabric choices.</li>
              <li><strong>Art & Illustration:</strong> Artists develop palettes to express a mood, scene, or era with accuracy.</li>
            </ol>
          </section>

          {/* Ad placement in middle of content */}
          <BannerAd variant="content" />

          {/* Conclusion */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">🧾 Conclusion</h2>
            <p className="mb-4">
              Design isn't about rules—it's about resonance. With Color-Peek, creating your own palette is more than a design task; it's a creative exploration. By using real-world inspiration, accessibility tools, and personal flair, your custom color palette can elevate any project you touch.
            </p>
            <p className="mb-4">
              Whether you're branding a business or decorating your studio apartment, your color choices matter—and Color-Peek is here to help you make them count.
            </p>
            <p className="mb-4">
              Ready to create your first palette? <a href="https://color-peek.com/palettes" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">Head to Color-Peek</a> and start experimenting. Your colors, your rules.
            </p>
          </section>

          {/* Ad placement between sections */}
          <AdsterraAd variant="content" />

          {/* Ad placement before social sharing */}
          <BannerAd variant="footer" />

          {/* Social Sharing */}
          {/* ... existing social sharing ... */}

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
            className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DIYColorPalettes; 