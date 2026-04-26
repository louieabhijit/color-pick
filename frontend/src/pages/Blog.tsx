import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';

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
  },
  {
    id: '12',
    slug: 'what-is-color-harmony-a-beginners-guide-for-designers',
    title: "What is Color Harmony? A Beginner's Guide for Designers",
    description: "Discover the fundamental principles of color harmony and learn how to create visually pleasing color combinations. Perfect for beginners in web design, graphic design, and UI/UX design.",
    date: 'March 30, 2024',
    readTime: '15 min read',
    category: 'Color Theory',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=75&w=800&fm=webp&auto=format&fit=crop',
    author: {
      name: 'Design Expert',
      avatar: 'https://ui-avatars.com/api/?name=Design+Expert&background=random'
    }
  },
  {
    id: '13',
    slug: 'css-box-shadow-examples',
    title: '10 CSS Box Shadow Examples Every Developer Should Know',
    description: 'Go beyond basic drop shadows. Learn to create multi-layer, colored, inset, and neumorphic box shadows with copy-paste CSS code examples.',
    date: 'April 22, 2026',
    readTime: '8 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Alex Rivera', avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366f1&color=fff' }
  },
  {
    id: '14',
    slug: 'glassmorphism-ui-design-tutorial',
    title: 'Glassmorphism CSS Tutorial: Build Stunning Frosted Glass UI',
    description: 'A complete guide to building glassmorphism UI with CSS backdrop-filter, RGBA backgrounds, and border transparency. Includes live code examples.',
    date: 'April 22, 2026',
    readTime: '10 min read',
    category: 'UI Design',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Maya Patel', avatar: 'https://ui-avatars.com/api/?name=Maya+Patel&background=8b5cf6&color=fff' }
  },
  {
    id: '15',
    slug: 'best-google-font-pairings-2025',
    title: '15 Best Google Font Pairings for Websites in 2025',
    description: 'Discover the top Google Font combinations for editorial, tech, and humanist design styles. Includes import links, pairing rules, and live previews.',
    date: 'April 22, 2026',
    readTime: '12 min read',
    category: 'Typography',
    image: 'https://images.unsplash.com/photo-1467189741621-5973f25b9ced?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=ec4899&color=fff' }
  },
  {
    id: '16',
    slug: 'css-gradient-background-ideas',
    title: '30 CSS Gradient Background Ideas with Code Examples',
    description: 'Explore linear, radial, conic, and mesh gradient backgrounds with ready-to-use CSS. From subtle fades to bold statement gradients.',
    date: 'April 22, 2026',
    readTime: '10 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Jordan Lee', avatar: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=f59e0b&color=fff' }
  },
  {
    id: '17',
    slug: 'tailwind-css-color-palette-guide',
    title: 'Tailwind CSS Color Palette: Complete Guide to Custom Colors',
    description: 'Learn how to customize Tailwind colors, generate a full 50–900 scale from one hex, and export your palette as a Tailwind config.',
    date: 'April 22, 2026',
    readTime: '11 min read',
    category: 'Tailwind CSS',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Marcus Johnson', avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=10b981&color=fff' }
  },
  {
    id: '18',
    slug: 'hex-to-rgb-color-conversion-guide',
    title: 'HEX to RGB and Beyond: The Complete Color Format Guide',
    description: 'Master every CSS color format - HEX, RGB, HSL, CMYK, and OKLCH. Learn when to use each and how to convert between them.',
    date: 'April 22, 2026',
    readTime: '9 min read',
    category: 'Developer Tools',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ef4444&color=fff' }
  },
  {
    id: '19',
    slug: 'css-border-radius-examples',
    title: 'CSS Border Radius: 12 Creative Shapes, Tricks & Examples',
    description: 'Go beyond rounded corners - create organic blobs, pills, squircles, and asymmetric shapes with CSS border-radius. Includes 12 copy-paste examples.',
    date: 'April 22, 2026',
    readTime: '8 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Alex Rivera', avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=6366f1&color=fff' }
  },
  {
    id: '20',
    slug: 'web-typography-type-scale-guide',
    title: 'Perfect Web Typography: How to Build a Modular Type Scale',
    description: 'Understand scale ratios, calculate harmonious font sizes mathematically, and implement your type scale in CSS, SCSS, and Tailwind.',
    date: 'April 22, 2026',
    readTime: '10 min read',
    category: 'Typography',
    image: 'https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=ec4899&color=fff' }
  },
  {
    id: '21',
    slug: 'dark-mode-color-palette-design',
    title: "Designing Dark Mode Color Palettes: A Complete Developer's Guide",
    description: 'Learn surface levels, elevation, semantic color tokens, and how to map brand colors to dark mode. Includes complete CSS custom property examples.',
    date: 'April 22, 2026',
    readTime: '12 min read',
    category: 'Dark Mode',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Kai Nakamura', avatar: 'https://ui-avatars.com/api/?name=Kai+Nakamura&background=1e1b4b&color=fff' }
  },
  {
    id: '22',
    slug: 'color-palette-from-photo-guide',
    title: 'How to Extract a Color Palette from Any Photo (Step-by-Step)',
    description: 'Learn how dominant color extraction works, how to pick the right image, and how to map extracted colors to design roles in your project.',
    date: 'April 22, 2026',
    readTime: '9 min read',
    category: 'Color Extraction',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Sofia Martínez', avatar: 'https://ui-avatars.com/api/?name=Sofia+Martinez&background=f97316&color=fff' }
  },
  {
    id: '23',
    slug: 'ui-color-trends-2025',
    title: "UI Color Trends 2025: What's Shaping Modern Digital Design",
    description: 'From earthy neutrals and botanical greens to AI gradients and neo-brutalism palettes - the color trends defining UI design in 2025.',
    date: 'April 22, 2026',
    readTime: '10 min read',
    category: 'Design Trends',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Zoe Williams', avatar: 'https://ui-avatars.com/api/?name=Zoe+Williams&background=a855f7&color=fff' }
  },
  {
    id: '24',
    slug: 'color-contrast-accessibility-guide',
    title: "Color Contrast & WCAG Compliance: The Developer's Accessibility Guide",
    description: 'Measure contrast ratios, meet WCAG 2.2 AA/AAA, simulate color blindness, and build accessible UIs that work for everyone.',
    date: 'April 22, 2026',
    readTime: '11 min read',
    category: 'Accessibility',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=ef4444&color=fff' }
  },
  {
    id: '25',
    slug: 'pastel-color-palettes-web-design',
    title: 'Pastel Color Palettes for Modern Web Design: 8 Beautiful Collections',
    description: '8 curated pastel palettes - Spring Blossom, Scandinavian Mist, Candy Pop, Desert Dawn, and more. Includes hex codes and usage tips.',
    date: 'April 22, 2026',
    readTime: '8 min read',
    category: 'Color Palette',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Sofia Martínez', avatar: 'https://ui-avatars.com/api/?name=Sofia+Martinez&background=f97316&color=fff' }
  },
  {
    id: '26',
    slug: 'design-token-color-system',
    title: 'How to Build a Color Design System with Tokens',
    description: 'Create a scalable color system with two-layer design tokens: primitives and semantics. Covers CSS variables, Tailwind config, dark mode, and export workflow.',
    date: 'April 22, 2026',
    readTime: '13 min read',
    category: 'Design System',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    author: { name: 'Marcus Johnson', avatar: 'https://ui-avatars.com/api/?name=Marcus+Johnson&background=10b981&color=fff' }
  }
];

interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Color Design Blog"
        description="Explore tutorials and insights on colour theory, WCAG accessibility, brand palettes, psychology of colour, and how to make the most of ColorPeek's design tools."
        path="/blog"
        keywords="color design blog, color theory tutorials, wcag accessibility, color psychology, brand color palette, design tips"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Color Design Blog | ColorPeek',
          url: 'https://color-peek.com/blog',
          publisher: { '@type': 'Organization', name: 'ColorPeek', url: 'https://color-peek.com' },
        }}
      />

      <Navbar onColorSelect={() => {}} />
      
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-violet-600 py-24">
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
                      loading="lazy"
                      width="800"
                      height="450"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-sm font-medium bg-white/90 dark:bg-gray-900/90 text-[var(--text-primary)] rounded-full">
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
                        loading="lazy"
                        width="32"
                        height="32"
                        decoding="async"
                      />
                      <div className="text-sm">
                        <p className="text-[var(--text-primary)] font-medium">
                          {post.author.name}
                        </p>
                        <p className="text-[var(--text-muted)]">
                          {post.date} · {post.readTime}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-[var(--text-secondary)] line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
              
            </React.Fragment>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Blog; 