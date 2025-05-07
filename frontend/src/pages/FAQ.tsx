import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Getting Started",
    question: "What is Color Peek and how does it work?",
    answer: "Color Peek is a powerful color extraction and palette generation tool designed for designers and developers. Simply upload an image or provide a URL, and our tool will automatically extract the dominant colors and generate harmonious color palettes. You can then copy color codes in various formats (HEX, RGB, HSL) and use them in your projects."
  },
  {
    category: "Getting Started",
    question: "Is Color Peek free to use?",
    answer: "Yes! Color Peek is completely free to use for basic features including color extraction, palette generation, and code copying. We may introduce premium features in the future, but our core functionality will always remain free."
  },
  {
    category: "Features",
    question: "What image formats are supported?",
    answer: "Color Peek supports all major image formats including JPG, PNG, GIF, WebP, and SVG. For best results, we recommend using high-quality images with clear, distinct colors."
  },
  {
    category: "Features",
    question: "How many colors can be extracted from an image?",
    answer: "Our tool automatically extracts up to 10 dominant colors from your image. You can also customize the number of colors you want to extract, ranging from 1 to 10 colors."
  },
  {
    category: "Technical",
    question: "What color formats are supported?",
    answer: "Color Peek supports all major color formats including HEX (#RRGGBB), RGB (rgb(r,g,b)), RGBA (rgba(r,g,b,a)), HSL (hsl(h,s,l)), and HSLA (hsla(h,s,l,a)). You can easily copy colors in any of these formats."
  },
  {
    category: "Technical",
    question: "Does Color Peek check for color accessibility?",
    answer: "Yes! We provide WCAG 2.1 contrast ratio calculations for text colors against background colors. This helps ensure your color choices meet accessibility standards for web content."
  },
  {
    category: "Usage",
    question: "Can I save my favorite colors?",
    answer: "Yes! You can save up to 10 favorite colors that persist across sessions. These colors are stored locally in your browser for easy access."
  },
  {
    category: "Usage",
    question: "How can I generate color variations?",
    answer: "Select any color to view its variations, including lighter and darker shades, complementary colors, and analogous colors. This helps you create cohesive color schemes for your designs."
  },
  {
    category: "Integration",
    question: "Can I use Color Peek with design tools?",
    answer: "While we don't have direct plugins for design tools yet, you can easily copy color codes and use them in any design software like Figma, Sketch, Adobe XD, or code editors."
  },
  {
    category: "Integration",
    question: "Is there an API available?",
    answer: "We're currently working on a public API that will allow developers to integrate Color Peek's functionality into their own applications. Stay tuned for updates!"
  }
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const toggleItem = (question: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(question)) {
      newExpandedItems.delete(question);
    } else {
      newExpandedItems.add(question);
    }
    setExpandedItems(newExpandedItems);
  };

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>FAQ - Color Peek | Color Extraction & Palette Generation Tool</title>
        <meta name="description" content="Frequently asked questions about Color Peek - Learn how to extract colors from images, generate palettes, and use our color tools effectively." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about Color Peek
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.question)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: expandedItems.has(faq.question) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedItems.has(faq.question) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FAQ; 