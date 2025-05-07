import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  title: string;
  description: string;
  image: string;
  path: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'The Complete Guide to Color Theory for Designers',
    description: 'Master the fundamentals of color theory, from basic principles to practical applications in modern design.',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=2070&auto=format&fit=crop',
    path: '/blog/complete-guide-color-theory-designers',
    date: 'April 29, 2024'
  },
  {
    title: 'Top 5 Free Color Palette Tools for Designers in 2025',
    description: 'Discover the best free color palette generators and tools that will revolutionize your design workflow.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2070&auto=format&fit=crop',
    path: '/blog/top-5-free-color-palette-tools-2025',
    date: 'May 1, 2024'
  },
  {
    title: 'How to Extract Colors from an Image for Web Design',
    description: 'Learn professional techniques for extracting beautiful color palettes from images.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070',
    path: '/blog/how-to-extract-colors-from-image',
    date: 'May 3, 2024'
  },
  {
    title: 'WCAG 2.1 Color Contrast Guidelines Explained',
    description: 'Master WCAG 2.1 color contrast requirements for web accessibility.',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2070',
    path: '/blog/wcag-color-contrast-guidelines',
    date: 'May 5, 2024'
  },
  {
    title: 'How Color Psychology Influences Customer Behavior',
    description: 'Discover how color psychology impacts consumer decisions and brand perception.',
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070',
    path: '/blog/color-psychology-customer-behavior',
    date: 'May 7, 2024'
  }
];

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogPosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + blogPosts.length) % blogPosts.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Latest from Our Blog
        </h2>
        
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  blogPosts[currentIndex],
                  blogPosts[(currentIndex + 1) % blogPosts.length],
                  blogPosts[(currentIndex + 2) % blogPosts.length]
                ].map((post, index) => (
                  <a
                    key={index}
                    href={post.path}
                    className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">{post.date}</p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-indigo-600 dark:bg-indigo-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel; 