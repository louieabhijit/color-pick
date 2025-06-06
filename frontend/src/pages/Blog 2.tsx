import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'complete-guide-color-theory',
    title: 'The Complete Guide to Color Theory for Designers',
    description: 'Master the fundamentals of color theory, from primary colors to complex color harmonies. Learn how to create effective color schemes for your designs.',
    date: 'March 15, 2024',
    readTime: '12 min read',
    category: 'Color Theory',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Sarah Anderson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Anderson&background=random'
    }
  },
  {
    id: '2',
    slug: 'top-5-color-palette-tools-2025',
    title: 'Top 5 Free Color Palette Tools for Designers in 2025',
    description: 'Discover the best free color palette generators and tools that will revolutionize your design workflow in 2025.',
    date: 'March 10, 2024',
    readTime: '8 min read',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Michael Chen',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random'
    }
  },
  {
    id: '3',
    slug: 'extract-colors-from-image',
    title: 'How to Extract Colors from an Image for Web Design',
    description: 'Learn professional techniques for extracting beautiful color palettes from images to create cohesive web designs.',
    date: 'March 5, 2024',
    readTime: '10 min read',
    category: 'Techniques',
    image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=random'
    }
  },
  {
    id: '4',
    slug: 'color-harmony-guide',
    title: "What is Color Harmony? A Beginner's Guide for Designers",
    description: 'Understand the principles of color harmony and learn how to create visually pleasing color combinations for your designs.',
    date: 'February 28, 2024',
    readTime: '15 min read',
    category: 'Color Theory',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'David Park',
      avatar: 'https://ui-avatars.com/api/?name=David+Park&background=random'
    }
  },
  {
    id: '5',
    slug: 'wcag-color-contrast',
    title: 'WCAG 2.1 Color Contrast Guidelines Explained',
    description: 'A comprehensive guide to understanding and implementing WCAG 2.1 color contrast requirements for accessible web design.',
    date: 'February 20, 2024',
    readTime: '11 min read',
    category: 'Accessibility',
    image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Alex Martinez',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Martinez&background=random'
    }
  },
  {
    id: '6',
    slug: 'color-psychology-customer-behavior',
    title: 'How Color Psychology Influences Customer Behavior',
    description: 'Explore the psychological impact of colors on consumer behavior and learn how to use this knowledge in your design strategy.',
    date: 'February 15, 2024',
    readTime: '13 min read',
    category: 'Psychology',
    image: 'https://images.unsplash.com/photo-1501366062246-723b4d3e4eb6?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Rachel Thompson',
      avatar: 'https://ui-avatars.com/api/?name=Rachel+Thompson&background=random'
    }
  }
];

interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>Color Design Blog | Color Pick</title>
        <meta name="description" content="Explore the latest insights, tutorials, and best practices in color theory, design tools, and accessibility." />
        <meta name="keywords" content="color theory, color design, color tools, color accessibility, color psychology, design blog" />
      </Helmet>

      <Navbar onColorSelect={() => {}} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 py-24">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Color Design Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore the latest insights, tutorials, and best practices in color theory,
              design tools, and accessibility.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block group h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-sm font-medium bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-gray-100 font-medium">
                        {post.author.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {post.date} · {post.readTime}
                      </p>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.description}
                  </p>
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