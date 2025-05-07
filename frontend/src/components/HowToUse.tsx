import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md 
                 transition-all duration-300 h-full border border-gray-100 dark:border-gray-700">
    {children}
  </div>
);

const HowToUse = () => {
  const steps = [
    {
      title: "Upload Your Image",
      description: "Upload an image from your device, paste a URL, or use your clipboard to get started.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
        </svg>
      )
    },
    {
      title: "Extract Colors",
      description: "Our AI-powered system will analyze your image and extract a beautiful color palette.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Explore Details",
      description: "Get detailed color information, including hex codes, RGB values, and color harmonies.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Generate Code",
      description: "Get ready-to-use code snippets in multiple programming languages and frameworks.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  const features = [
    {
      title: "Color Harmonies",
      description: "Discover complementary, analogous, and other color combinations.",
      icon: "🎨"
    },
    {
      title: "Contrast Checker",
      description: "Ensure your color combinations meet accessibility standards.",
      icon: "👁️"
    },
    {
      title: "Code Snippets",
      description: "Get code in CSS, SCSS, TailwindCSS, React, and more.",
      icon: "💻"
    },
    {
      title: "Color Variations",
      description: "Generate tints, shades, and tones of your selected colors.",
      icon: "🌈"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            How to Use ColorPeek
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Extract beautiful color palettes from your images and get everything you need for your next project
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="text-indigo-500 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <div className="text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Upload your first image and discover the perfect color palette for your project.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 
                     rounded-lg font-medium shadow-sm transition-all duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Try ColorPeek Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUse; 