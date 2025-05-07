import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaChevronRight } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '5',
    title: 'How Color Psychology Influences Customer Behavior',
    description: 'Discover how color psychology impacts consumer decisions and brand perception. Learn to leverage color theory for increased conversions and better customer engagement in marketing and web design.',
    content: '', // This will be in a separate component
    author: 'Marketing Psychology Expert',
    date: 'May 7, 2024',
    readTime: '15 min read',
    tags: ['Color Psychology', 'Marketing', 'Consumer Behavior', 'Brand Design', 'Conversion Rate', 'UX Design', 'E-commerce'],
    image: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070',
    slug: 'color-psychology-customer-behavior'
  },
  {
    id: '4',
    title: 'WCAG 2.1 Color Contrast Guidelines Explained',
    description: 'Master WCAG 2.1 color contrast requirements for web accessibility. Learn how to create accessible designs that comply with AA and AAA standards. Essential guide for web designers and developers.',
    content: '', // This will be in a separate component
    author: 'Accessibility Expert',
    date: 'May 5, 2024',
    readTime: '12 min read',
    tags: ['WCAG 2.1', 'Accessibility', 'Color Contrast', 'Web Design', 'UI/UX', 'A11y', 'Web Standards'],
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2070',
    slug: 'wcag-color-contrast-guidelines'
  },
  {
    id: '3',
    title: 'How to Extract Colors from an Image for Web Design',
    description: 'Learn professional techniques for extracting beautiful color palettes from images. Master color sampling, palette generation, and how to apply extracted colors effectively in your web designs.',
    content: '', // This will be in a separate component
    author: 'Design Expert',
    date: 'May 3, 2024',
    readTime: '10 min read',
    tags: ['Color Extraction', 'Web Design', 'UI/UX', 'Color Palettes', 'Design Tools', 'Image Analysis'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070',
    slug: 'how-to-extract-colors-from-image'
  },
  {
    id: '2',
    title: 'Top 5 Free Color Palette Tools for Designers in 2025',
    description: 'Discover the best free color palette generators and tools that will revolutionize your design workflow in 2025. Compare features, explore AI-powered options, and find the perfect tool for your next project.',
    content: '', // This will be in a separate component
    author: 'Design Expert',
    date: 'May 1, 2024',
    readTime: '8 min read',
    tags: ['Color Tools', 'Design Resources', 'Color Palettes', 'UI/UX', 'Web Design', 'Free Tools'],
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2070&auto=format&fit=crop',
    slug: 'top-5-free-color-palette-tools-2025'
  },
  {
    id: '1',
    title: 'The Complete Guide to Color Theory for Designers',
    description: 'Master the fundamentals of color theory, from basic principles to practical applications in modern design. Learn how to create harmonious color schemes and evoke emotions through strategic color choices.',
    content: '', // This will be in a separate component
    author: 'Design Expert',
    date: 'April 29, 2024',
    readTime: '12 min read',
    tags: ['Color Theory', 'Design Principles', 'UI/UX', 'Web Design', 'Color Psychology'],
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=2070&auto=format&fit=crop',
    slug: 'complete-guide-color-theory-designers'
  }
];

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[40vh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Design & Color Blog
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-200 max-w-2xl"
          >
            Explore in-depth articles about color theory, design principles, and creative inspiration
          </motion.p>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredPost(post.id)}
              onHoverEnd={() => setHoveredPost(null)}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.img
                    animate={{
                      scale: hoveredPost === post.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title and Description */}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <FaCalendar className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-6">
                    <motion.div
                      animate={{
                        x: hoveredPost === post.id ? 5 : 0
                      }}
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium"
                    >
                      Read More
                      <FaChevronRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 