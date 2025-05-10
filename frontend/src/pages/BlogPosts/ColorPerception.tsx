import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaArrowUp, FaExternalLinkAlt, FaEye, FaBrain, FaPalette, FaFlask, FaDna, FaGlobe, FaLaptop, FaChartBar } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const ColorPerception = () => {
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
    hero: 'https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?w=800&auto=format&fit=crop&q=60',
    physics: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60',
    anatomy: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60',
    brain: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=60',
    differences: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=800&auto=format&fit=crop&q=60',
    animals: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop&q=60',
    culture: 'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?w=800&auto=format&fit=crop&q=60',
    technology: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60'
  };

  const metadata = {
    title: 'The Science Behind Color Perception and Vision | Color-Peek',
    description: 'Explore how humans perceive color through the science of light, the anatomy of the eye, brain processing, and cultural psychology. A complete guide to color vision.',
    ogDescription: 'Dive deep into the physics, biology, and psychology of color perception. Understand how our eyes and brains process color, and how this impacts design, tech, and daily life.',
    twitterDescription: 'Discover how light, the human eye, and the brain work together to create our experience of color. A guide for designers, developers, and curious minds.',
    url: 'https://color-peek.com/blog/science-behind-color-perception',
    image: images.hero
  };

  const resources = [
    {
      name: "Color Vision Testing",
      url: "https://color-peek.com/tools/color-vision-test",
      description: "Test your color vision and understand your perception"
    },
    {
      name: "Contrast Checker",
      url: "https://color-peek.com/tools/contrast",
      description: "Ensure your color choices are accessible to all users"
    },
    {
      name: "Color Blindness Simulator",
      url: "https://color-peek.com/tools/colorblind-simulator",
      description: "Simulate different types of color vision deficiencies"
    }
  ];

  const handleColorSelect = () => {
    // Implementation of handleColorSelect function
  };

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
        <meta name="keywords" content="color perception, vision science, color psychology, eye anatomy, brain processing, color theory, visual perception" />
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

      <Navbar onColorSelect={handleColorSelect} />

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
          
          {/* Introduction */}
          <section className="mb-16">
            <p className="lead text-xl text-gray-600 dark:text-gray-300">
              Color is not a property of objects themselves but rather a perceptual phenomenon created by our brains. When we say something is "blue," we're describing how our eyes and brain interpret a specific wavelength of light. Understanding the science behind color perception and vision isn't just fascinating—it's essential for fields ranging from digital design to neuroscience, photography, ophthalmology, and artificial intelligence.
            </p>
          </section>

          {/* Physics of Light and Color */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FaFlask className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">The Physics of Light and Color</h2>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.physics} 
                alt="Physics of Light and Color" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">The visible spectrum of light ranges from violet to red</p>
            </div>
            <p className="mb-4">
              Color begins with light. Light is a form of electromagnetic radiation that travels in waves. These waves vary in length, and the visible spectrum—what humans can see—ranges from about 380 to 740 nanometers (nm).
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-6">
              <ul className="list-none space-y-3">
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                  <span>Short wavelengths (380–450 nm): Violet/Blue</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span>Medium wavelengths (495–570 nm): Green/Yellow</span>
                </li>
                <li className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span>Long wavelengths (620–740 nm): Orange/Red</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Anatomy of the Human Eye */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FaEye className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">The Anatomy of the Human Eye</h2>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.anatomy} 
                alt="Human Eye Anatomy" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">The complex structure of the human eye enables color vision</p>
            </div>
            <p className="mb-4">
              Our ability to see color starts in the retina, a layer at the back of the eye that contains two types of photoreceptor cells: rods and cones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Rods</h3>
                <p>Highly sensitive to light but do not detect color. They're responsible for night vision and peripheral vision.</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Cones</h3>
                <p>Responsible for color vision. Humans typically have three types: S-cones (blue), M-cones (green), and L-cones (red).</p>
              </div>
            </div>
          </section>

          {/* Brain Processing */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FaBrain className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">How the Brain Processes Color</h2>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.brain} 
                alt="Brain Processing Color" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">The visual cortex processes color information from the eyes</p>
            </div>
            <p className="mb-4">
              Once light stimulates the cones in the retina, signals travel through the optic nerve to the visual cortex in the brain. Here, the signals are processed and interpreted.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-6">
              <h3 className="text-xl font-semibold mb-3">The Opponent Process Theory</h3>
              <ul className="list-none space-y-3">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full mr-3"></span>
                  <span>Red vs. Green</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full mr-3"></span>
                  <span>Blue vs. Yellow</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-gradient-to-r from-black to-white rounded-full mr-3"></span>
                  <span>Black vs. White</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Applications Section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FaLaptop className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">Applications in Design and Technology</h2>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={images.technology} 
                alt="Color in Technology" 
                className="w-full h-[300px] object-cover"
              />
              <p className="text-sm text-gray-500 mt-2 italic text-center">Modern displays and devices rely on understanding color perception</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Digital Design</h3>
                <ul className="list-disc pl-5">
                  <li>Color contrast for accessibility</li>
                  <li>Harmonious color palettes</li>
                  <li>Dark mode considerations</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Display Technology</h3>
                <ul className="list-disc pl-5">
                  <li>RGB color mixing</li>
                  <li>Color calibration</li>
                  <li>Device optimization</li>
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">AI & Machine Vision</h3>
                <ul className="list-disc pl-5">
                  <li>Color recognition</li>
                  <li>Pattern detection</li>
                  <li>Visual processing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Useful Color Vision Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <motion.a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    {resource.name}
                    <FaExternalLinkAlt className="ml-2 w-4 h-4" />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{resource.description}</p>
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

export default ColorPerception; 