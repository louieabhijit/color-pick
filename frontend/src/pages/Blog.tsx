import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import AdsterraAd from '../components/AdsterraAd';
import BannerAd from '../components/BannerAd';

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
    id: '11',
    slug: 'science-behind-color-perception',
    title: 'The Science Behind Color Perception and Vision',
    description: 'Explore the fascinating world of color perception, from the physics of light to how our brains process visual information. Perfect for designers and developers.',
    date: 'April 10, 2024',
    readTime: '15 min read',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Dr. James Wilson',
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=random'
    }
  },
  {
    id: '7',
    slug: 'how-to-choose-brand-color-palette',
    title: 'How to Choose the Right Color Palette for Your Brand',
    description: 'Learn how to select the perfect color palette that aligns with your brand identity, evokes the right emotions, and resonates with your target audience.',
    date: 'March 20, 2024',
    readTime: '10 min read',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'David Miller',
      avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=random'
    }
  },
  {
    id: '1',
    slug: 'complete-guide-color-theory-designers',
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
    slug: 'top-5-free-color-palette-tools-2025',
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
    slug: 'how-to-extract-colors-from-image',
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
    id: '5',
    slug: 'wcag-color-contrast-guidelines',
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
  },
  {
    id: '8',
    slug: 'color-accessibility-designing-for-color-blind-users',
    title: 'Color Accessibility: Designing for Color Blind Users',
    description: 'Learn how to design accessible experiences for color blind users with practical tips, best practices, and tools to create inclusive, user-friendly designs.',
    date: 'March 25, 2024',
    readTime: '11 min read',
    category: 'Accessibility',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Emily Parker',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Parker&background=random'
    }
  },
  {
    id: '9',
    slug: 'diy-creating-color-palettes-using-color-peek',
    title: 'DIY: Creating Your Own Color Palettes Using Color-Peek',
    description: 'Learn how to create stunning, accessible, and personalized color palettes using Color-Peek. A perfect guide for designers, developers, and creatives.',
    date: 'March 30, 2024',
    readTime: '12 min read',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Sophie Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sophie+Chen&background=random'
    }
  },
  {
    id: '10',
    slug: 'cultural-significance-of-colors',
    title: 'Cultural Significance of Colors Around the World',
    description: 'Explore the rich cultural meanings of colors across different countries and traditions. Discover how red, blue, white, and more are interpreted around the world.',
    date: 'April 5, 2024',
    readTime: '15 min read',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&auto=format&fit=crop&q=60',
    author: {
      name: 'Maya Patel',
      avatar: 'https://ui-avatars.com/api/?name=Maya+Patel&background=random'
    }
  }
];

interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>Color Design Blog | Color Pick</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Explore the latest insights, tutorials, and best practices in color theory, design tools, and accessibility." />
        <meta name="keywords" content="color theory, color design, color tools, color accessibility, color psychology, design blog" />
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

      {/* Ad placement after hero */}
      <AdsterraAd variant="content" />

      {/* Banner ad after hero */}
      <BannerAd variant="content" />

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <motion.div
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
              
              {/* Add ad after every 6 posts */}
              {(index + 1) % 6 === 0 && index < blogPosts.length - 1 && (
                <div className="md:col-span-2 lg:col-span-3 space-y-4">
                  <AdsterraAd variant="content" />
                  <BannerAd variant="content" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Ad at the end */}
        <AdsterraAd variant="footer" />
        <BannerAd variant="footer" />
      </div>
    </div>
  );
};

export default Blog; 