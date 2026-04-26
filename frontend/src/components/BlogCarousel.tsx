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
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=75&w=800&fm=webp&auto=format&fit=crop',
    path: '/blog/complete-guide-color-theory-designers',
    date: 'April 29, 2024'
  },
  {
    title: 'Top 5 Free Color Palette Tools for Designers in 2025',
    description: 'Discover the best free color palette generators and tools that will revolutionize your design workflow.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=75&w=800&fm=webp&auto=format&fit=crop',
    path: '/blog/top-5-free-color-palette-tools-2025',
    date: 'May 1, 2024'
  },
  {
    title: 'How to Extract Colors from an Image for Web Design',
    description: 'Learn professional techniques for extracting beautiful color palettes from images.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=75&w=800&fm=webp&auto=format&fit=crop',
    path: '/blog/how-to-extract-colors-from-image',
    date: 'May 3, 2024'
  },
  {
    title: 'WCAG 2.1 Color Contrast Guidelines Explained',
    description: 'Master WCAG 2.1 color contrast requirements for web accessibility.',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=75&w=800&fm=webp&auto=format&fit=crop',
    path: '/blog/wcag-color-contrast-guidelines',
    date: 'May 5, 2024'
  },
  {
    title: 'How Color Psychology Influences Customer Behavior',
    description: 'Discover how color psychology impacts consumer decisions and brand perception.',
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=75&w=800&fm=webp&auto=format&fit=crop',
    path: '/blog/color-psychology-customer-behavior',
    date: 'May 7, 2024'
  }
];

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex(i => (i + 1) % blogPosts.length);
  const prevSlide = () => setCurrentIndex(i => (i - 1 + blogPosts.length) % blogPosts.length);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label mb-3 inline-block">From the Blog</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[var(--text-primary)]">
            Latest <span className="gradient-text">Articles</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2.5 rounded-full
                       glass-card border border-white/40 shadow-lg
                       hover:border-indigo-300/60 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2.5 rounded-full
                       glass-card border border-white/40 shadow-lg
                       hover:border-indigo-300/60 transition-colors duration-200"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--text-secondary)]"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
                    className="group glass-card card-shine overflow-hidden hover:border-indigo-300/50
                               dark:hover:border-indigo-500/30 border border-white/40 dark:border-white/10
                               transition-all duration-300 rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width="800"
                        height="534"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                                      group-hover:from-black/60 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                        {post.date}
                      </p>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2 line-clamp-2
                                     group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 h-2.5 bg-indigo-500'
                    : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-indigo-300 dark:hover:bg-indigo-700'
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
