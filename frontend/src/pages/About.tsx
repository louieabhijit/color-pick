import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import { FaLightbulb, FaCode, FaPalette, FaRocket } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="glass-card p-6 shadow-sm hover:shadow-md 
               transition-all duration-300 border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
        <p className="text-[var(--text-muted)]">{description}</p>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-xl text-white
               transform transition-all duration-300 hover:shadow-xl"
  >
    <h3 className="text-4xl font-bold mb-2">{number}</h3>
    <p className="text-indigo-100">{label}</p>
  </motion.div>
);

const About = () => {
  const handleColorSelect = (color: string) => {
    // No-op since we don't need color selection on this page
  };

  const features = [
    {
      icon: FaLightbulb,
      title: "Smart Color Extraction",
      description: "Advanced algorithms that identify and extract the most significant colors from any image."
    },
    {
      icon: FaPalette,
      title: "Color Harmonies",
      description: "Generate perfect color combinations using color theory principles and advanced matching algorithms."
    },
    {
      icon: FaCode,
      title: "Developer Ready",
      description: "Get instant access to color codes in multiple formats, ready to use in your projects."
    },
    {
      icon: FaRocket,
      title: "Performance Focused",
      description: "Lightning-fast color processing and real-time updates for a seamless experience."
    }
  ];

  const stats = [
    { number: "1M+", label: "Colors Analyzed" },
    { number: "50K+", label: "Active Users" },
    { number: "100K+", label: "Palettes Created" },
    { number: "99%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="About ColorPeek"
        description="Learn about ColorPeek's mission to empower designers and developers with intelligent colour tools - from palette extraction and harmony generation to accessibility simulation and export."
        path="/about"
        keywords="about colorpeek, color palette tool, color extraction app, design tool, color picker online"
      />
      <Navbar onColorSelect={handleColorSelect} />
      
      
      <main className="pt-16 pb-8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                        flex items-center justify-center"
            >
              <FaPalette className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              About ColorPeek
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Empowering creators with intelligent color tools and innovative design solutions.
            </p>
          </motion.div>


          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>



          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-8 md:p-12 mb-16 border border-indigo-200/40 dark:border-indigo-500/20"
          >
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">Our Mission</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-[var(--text-muted)]">
                At ColorPeek, we believe that color is fundamental to great design. Our mission is to make 
                color exploration and palette creation intuitive and accessible for everyone. Whether you're 
                a professional designer or just someone who loves colors, our tool helps you discover, 
                analyze, and utilize colors in ways you never imagined.
              </p>
            </div>
          </motion.div>

          {/* Technology Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card rounded-2xl p-8 md:p-12 border border-white/40 dark:border-white/10"
          >
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-primary)]">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Advanced Color Analysis
                </h3>
                <p className="text-[var(--text-muted)]">
                  Our sophisticated algorithms analyze images to extract the most meaningful colors, 
                  considering both dominant hues and subtle accents that make your design unique.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  Real-time Processing
                </h3>
                <p className="text-[var(--text-muted)]">
                  Experience instant color analysis and palette generation with our optimized 
                  processing engine, designed for performance and accuracy.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default About; 