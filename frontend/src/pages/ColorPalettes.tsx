import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { IconType } from 'react-icons';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';
import { FaFilter, FaHeart, FaCopy, FaSearch, FaClock, FaEye, FaBars, FaTimes, FaPlus } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { oklch, formatRgb } from 'culori';
import toast from 'react-hot-toast';

interface IconProps {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: string;
  tags: string[];
  likes: number;
  views: number;
  description: string;
  createdAt: Date;
}

const Icon: React.FC<IconProps> = ({ icon: IconComponent, className }) => {
  return <IconComponent className={className} />;
};

// Categories with their descriptions
const categories = {
  'material': 'Material Design inspired palettes with vibrant, bold colors',
  'pastel': 'Soft, light, and soothing color combinations',
  'vintage': 'Retro and classic color schemes',
  'neon': 'Bright, vibrant, and energetic color combinations',
  'earth': 'Natural, earthy tones inspired by nature',
  'monochromatic': 'Variations of a single color',
  'gradient': 'Smooth transitioning color combinations',
  'dark': 'Deep, rich, and sophisticated color schemes',
  'light': 'Bright, airy, and minimalist palettes',
  'corporate': 'Professional and business-friendly combinations'
};

// Palette name generation
const adjectives = [
  'Serene', 'Vibrant', 'Mystic', 'Elegant', 'Bold', 'Dreamy', 'Cosmic', 'Rustic',
  'Modern', 'Classic', 'Urban', 'Natural', 'Royal', 'Sunset', 'Ocean', 'Forest',
  'Desert', 'Nordic', 'Tropical', 'Autumn', 'Spring', 'Winter', 'Summer', 'Dawn',
  'Dusk', 'Midnight', 'Vintage', 'Retro', 'Minimal', 'Luxe', 'Earthy', 'Pastel'
];

const themes = [
  'Harmony', 'Fusion', 'Blend', 'Palette', 'Spectrum', 'Tones', 'Shades', 'Hues',
  'Collection', 'Scheme', 'Gradient', 'Mood', 'Vision', 'Dream', 'Story', 'Journey',
  'Essence', 'Spirit', 'Vibes', 'Rhythm', 'Flow', 'Wave', 'Path', 'Whisper'
];

const generatePaletteName = (index: number, category: string): { name: string, description: string } => {
  const adjIndex = Math.floor(index / themes.length) % adjectives.length;
  const themeIndex = index % themes.length;
  const adj = adjectives[adjIndex];
  const theme = themes[themeIndex];
  
  let description = '';
  switch (category) {
    case 'material':
      description = 'A modern material design palette perfect for digital interfaces';
      break;
    case 'pastel':
      description = 'Soft and soothing color combinations for gentle visual experiences';
      break;
    case 'vintage':
      description = 'Classic color schemes that evoke nostalgia and timeless appeal';
      break;
    case 'neon':
      description = 'Bold and energetic colors that make a striking statement';
      break;
    case 'earth':
      description = 'Natural earth tones inspired by organic elements and landscapes';
      break;
    case 'monochromatic':
      description = 'Sophisticated variations of a single color for elegant designs';
      break;
    case 'gradient':
      description = 'Smooth color transitions for modern and dynamic interfaces';
      break;
    case 'dark':
      description = 'Rich and deep colors for sophisticated dark themes';
      break;
    case 'light':
      description = 'Bright and airy combinations for clean, minimalist designs';
      break;
    case 'corporate':
      description = 'Professional color schemes for business and corporate applications';
      break;
  }

  return {
    name: `${adj} ${theme}`,
    description
  };
};

// Function to generate OkLCH color palettes
const generateOkLCHPalette = (baseHue: number, category: string): string[] => {
  const palette: string[] = [];
  
  switch(category) {
    case 'material':
      // Generate material-style colors with high chroma
      for(let i = 0; i < 5; i++) {
        const l = 55 + i * 10;
        const c = Math.min(0.4 - i * 0.05, 0.3);
        const h = (baseHue + i * 15) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'pastel':
      // Generate soft pastel colors with high lightness and low chroma
      for(let i = 0; i < 5; i++) {
        const l = 85 - i * 5;
        const c = 0.1;
        const h = (baseHue + i * 30) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'vintage':
      // Generate vintage colors with muted tones
      for(let i = 0; i < 5; i++) {
        const l = 60 - i * 5;
        const c = 0.1 - i * 0.01;
        const h = (baseHue + i * 45) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'neon':
      // Generate bright neon colors
      for(let i = 0; i < 5; i++) {
        const l = 65;
        const c = 0.3;
        const h = (baseHue + i * 72) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'earth':
      // Generate earthy tones
      for(let i = 0; i < 5; i++) {
        const l = 45 + i * 10;
        const c = 0.1;
        const h = (baseHue + i * 20) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'monochromatic':
      // Generate monochromatic variations
      for(let i = 0; i < 5; i++) {
        const l = 30 + i * 15;
        const c = 0.15;
        const h = baseHue;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'gradient':
      // Generate smooth gradient colors
      for(let i = 0; i < 5; i++) {
        const l = 50 + i * 10;
        const c = 0.2 - i * 0.02;
        const h = baseHue + i * 10;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'dark':
      // Generate dark sophisticated colors
      for(let i = 0; i < 5; i++) {
        const l = 20 + i * 10;
        const c = 0.1;
        const h = (baseHue + i * 60) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'light':
      // Generate light airy colors
      for(let i = 0; i < 5; i++) {
        const l = 85 + i * 3;
        const c = 0.05;
        const h = (baseHue + i * 45) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    case 'corporate':
      // Generate professional business colors
      for(let i = 0; i < 5; i++) {
        const l = 45 + i * 12;
        const c = 0.15 - i * 0.02;
        const h = (baseHue + i * 30) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
      break;
    default:
      // Default to material style
      for(let i = 0; i < 5; i++) {
        const l = 55 + i * 10;
        const c = Math.min(0.4 - i * 0.05, 0.3);
        const h = (baseHue + i * 15) % 360;
        palette.push(formatRgb({ mode: 'oklch', l: l / 100, c, h }));
      }
  }
  
  return palette;
};

// Generate all palettes
const generateAllPalettes = (): ColorPalette[] => {
  const palettes: ColorPalette[] = [];
  const categoryNames = Object.keys(categories);
  const now = new Date();
  
  for(let i = 0; i < 5500; i++) {
    const category = categoryNames[i % categoryNames.length];
    const baseHue = (i * 37) % 360; // Use golden ratio to distribute hues
    const { name, description } = generatePaletteName(i, category);
    
    // Generate random but realistic stats
    const daysOld = Math.floor(Math.random() * 365);
    const createdAt = new Date(now.getTime() - (daysOld * 24 * 60 * 60 * 1000));
    const views = Math.floor(Math.random() * 10000) + 100;
    const likes = Math.floor(views * (Math.random() * 0.4 + 0.1)); // 10-50% of views are likes
    
    palettes.push({
      id: `palette-${i}`,
      name,
      colors: generateOkLCHPalette(baseHue, category),
      category,
      tags: [category, i % 2 === 0 ? 'trending' : 'new'],
      description,
      likes,
      views,
      createdAt
    });
  }
  
  return palettes;
};

const ColorPalettes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allPalettes] = useState<ColorPalette[]>(generateAllPalettes());
  const [displayedPalettes, setDisplayedPalettes] = useState<ColorPalette[]>([]);
  const [filteredPalettes, setFilteredPalettes] = useState<ColorPalette[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'mostLiked' | 'mostViewed'>('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  const ITEMS_PER_PAGE = 30;

  const loadMorePalettes = useCallback(() => {
    if (loading) return;
    setLoading(true);
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const newPalettes = filteredPalettes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    
    setDisplayedPalettes(prev => [...prev, ...newPalettes]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, filteredPalettes, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayedPalettes.length < filteredPalettes.length) {
          loadMorePalettes();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMorePalettes]);

  const handleColorSelect = (color: string) => {
    // Handle color selection
  };

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: FaClock },
    { value: 'mostLiked', label: 'Most Liked', icon: FaHeart },
    { value: 'mostViewed', label: 'Most Viewed', icon: FaEye }
  ];

  useEffect(() => {
    let filtered = allPalettes;
    
    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'mostLiked':
          return b.likes - a.likes;
        case 'mostViewed':
          return b.views - a.views;
        default:
          return 0;
      }
    });
    
    setFilteredPalettes(filtered);
    setDisplayedPalettes(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(2);
  }, [selectedCategory, searchTerm, allPalettes, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) ? 
        prev.filter(fid => fid !== id) : 
        [...prev, id];
      
      // Update likes count in both displayed and filtered palettes
      setDisplayedPalettes(prevPalettes => 
        prevPalettes.map(p => {
          if (p.id === id) {
            return {
              ...p,
              likes: p.likes + (newFavorites.includes(id) ? 1 : -1)
            };
          }
          return p;
        })
      );
      
      setFilteredPalettes(prevPalettes => 
        prevPalettes.map(p => {
          if (p.id === id) {
            return {
              ...p,
              likes: p.likes + (newFavorites.includes(id) ? 1 : -1)
            };
          }
          return p;
        })
      );
      
      return newFavorites;
    });
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message, {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#10B981',
        color: '#FFFFFF',
        borderRadius: '8px',
      },
    });
  };

  // Function to convert RGB to Hex
  const rgbToHex = (color: string): string => {
    // If it's already a hex color, return it
    if (color.startsWith('#')) {
      return color.toUpperCase();
    }
    
    // Extract RGB values
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length !== 3) return color.toUpperCase();
    
    // Convert to hex
    const hex = rgb
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
    
    return '#' + hex.toUpperCase();
  };

  const copyPalette = (colors: string[]) => {
    const colorString = colors.join(', ');
    copyToClipboard(colorString, 'Palette copied to clipboard!');
  };

  const copyColor = (color: string) => {
    copyToClipboard(color, 'Color copied to clipboard!');
  };

  const palettesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Palette Generator | ColorPeek',
        description: 'Browse hundreds of curated color palettes for designers and developers. Filter by style, sort by popularity, and copy any palette in one click.',
        url: 'https://color-peek.com/palettes',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is a color palette?', acceptedAnswer: { '@type': 'Answer', text: 'A color palette is a curated set of colors used together in a design. Good palettes create visual harmony and convey the right mood or brand identity.' } },
          { '@type': 'Question', name: 'How many colors should a palette have?', acceptedAnswer: { '@type': 'Answer', text: 'Most design palettes have 3–6 colors: a primary, secondary, accent, and a few neutrals. Simpler is often better for maintaining visual consistency.' } },
          { '@type': 'Question', name: 'How do I copy a color from a palette?', acceptedAnswer: { '@type': 'Answer', text: 'Click any color swatch to copy its HEX code to your clipboard. You can also click the copy icon on a palette card to copy all colors at once.' } },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Palette Generator — Browse & Copy Free Palettes"
        description="Explore hundreds of curated color palettes for designers and developers. Filter by mood, sort by popularity, and copy any swatch or full palette in one click. Free at ColorPeek."
        path="/palettes"
        keywords="color palette generator, free color palettes, design color schemes, color combinations, palette for designers, hex color palettes"
        schema={palettesSchema}
      />
      <Navbar onColorSelect={handleColorSelect} />
      
      
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon icon={isSidebarOpen ? FaTimes : FaBars} className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors
                             ${sortBy === option.value
                               ? 'bg-indigo-500 text-white'
                               : 'bg-gray-100 dark:bg-gray-800 text-[var(--text-secondary)] hover:bg-gray-200 dark:hover:bg-gray-700'
                             }`}
                  >
                    <Icon icon={option.icon} className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon 
                  icon={FaSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search palettes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-12 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 
                           bg-white dark:bg-gray-800 text-[var(--text-primary)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add spacing div to prevent overlap */}
      <div className="h-24 bg-white dark:bg-gray-900" />


      <main className="relative z-0">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
          <div className="flex gap-8">
            {/* Sidebar */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="shrink-0"
                >
                  <div className="w-80 pr-6">
                    <div className="sticky top-40">
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Categories Section */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)] flex items-center">
                            <Icon icon={MdCategory} className="w-5 h-5 mr-2" />
                            Categories
                          </h3>
                          <div className="space-y-2">
                            <button
                              onClick={() => setSelectedCategory('all')}
                              className={`w-full p-3 rounded-lg text-left transition-all ${
                                selectedCategory === 'all'
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-[var(--text-primary)] hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">All Categories</span>
                                <span className="text-sm opacity-80">
                                  {allPalettes.length}
                                </span>
                              </div>
                            </button>
                            {Object.entries(categories).map(([key, description]) => (
                              <button
                                key={key}
                                onClick={() => setSelectedCategory(key === selectedCategory ? 'all' : key)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${
                                  key === selectedCategory
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-[var(--text-primary)] hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium capitalize">{key}</span>
                                  <span className="text-sm opacity-80">
                                    {allPalettes.filter(p => p.category === key).length}
                                  </span>
                                </div>
                                <p className="text-sm mt-1 opacity-80 line-clamp-2">
                                  {description}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Stats Section */}
                        <div className="p-6">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-[var(--text-muted)]">Total Palettes:</span>
                              <span className="font-medium text-[var(--text-primary)]">{allPalettes.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-[var(--text-muted)]">Filtered Palettes:</span>
                              <span className="font-medium text-[var(--text-primary)]">{filteredPalettes.length}</span>
                            </div>
                          </div>
                        </div>

                        {/* <div className="p-4"> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Palettes Grid */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPalettes.map((palette, index) => (
                  <React.Fragment key={palette.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg"
                    >
                      {/* Color Preview */}
                      <div className="h-32 flex [&>*:first-child]:rounded-none [&>*:last-child]:rounded-none">
                        {palette.colors.map((color, idx) => (
                          <button
                            key={`${palette.id}-${idx}`}
                            onClick={() => copyColor(rgbToHex(color))}
                            className="flex-1 group relative transition-transform hover:transform hover:scale-105 focus:outline-none rounded-none"
                            style={{ backgroundColor: color }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity rounded-none">
                              <span className="text-xs text-white font-medium">
                                {rgbToHex(color)}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Palette Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                              {palette.name}
                            </h3>
                            <p className="text-sm text-[var(--text-muted)]">
                              {palette.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-[var(--text-muted)]">
                              <Icon icon={FaHeart} className="w-4 h-4" />
                              <span>{palette.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-[var(--text-muted)]">
                              <Icon icon={FaEye} className="w-4 h-4" />
                              <span>{palette.views}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleFavorite(palette.id)}
                              className={`p-2 rounded-full transition-colors ${
                                favorites.includes(palette.id)
                                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Icon icon={FaHeart} />
                            </button>
                            <button
                              onClick={() => copyPalette(palette.colors)}
                              className="p-2 rounded-full text-gray-400 hover:text-indigo-500 
                                       transition-colors"
                            >
                              <Icon icon={FaCopy} />
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full 
                                       bg-indigo-100 dark:bg-indigo-900/30 
                                       text-indigo-600 dark:text-indigo-400">
                            {palette.category}
                          </span>
                          {palette.tags.map(tag => (
                            <span
                              key={`${palette.id}-${tag}`}
                              className="px-2 py-1 text-xs font-medium rounded-full 
                                       bg-gray-100 dark:bg-gray-700 
                                       text-[var(--text-muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                  </React.Fragment>
                ))}
              </div>
              
              {/* Loading indicator and observer target */}
              <div ref={observerTarget} className="w-full py-8 flex justify-center">
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                ) : displayedPalettes.length < filteredPalettes.length ? (
                  <div className="text-[var(--text-muted)]">Scroll for more</div>
                ) : (
                  <div className="text-[var(--text-muted)]">No more palettes</div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Color Palette Generator</h2>
          <ol className="space-y-3">
            <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Browse the palette gallery or use the search bar to find palettes by name or tag.</li>
            <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>Open the sidebar to filter by category — pastel, neon, earth, dark, corporate, and more.</li>
            <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Sort results by Newest, Most Liked, or Most Viewed to surface trending palettes.</li>
            <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Click any color swatch to instantly copy its HEX code to your clipboard.</li>
            <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click the copy icon on a palette card to copy all colors in the palette at once.</li>
          </ol>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is a Color Palette?</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">A color palette is a carefully selected group of colors that work harmoniously together. In design, a palette establishes the visual identity of a project — from websites and mobile apps to logos and marketing materials. A well-chosen palette typically includes a primary color (the dominant brand color), a secondary color (for accents and highlights), and one or more neutral tones (backgrounds, text, borders). Most UI design systems use 4–8 colors to keep interfaces consistent and readable. Color palettes can follow formal rules from color theory — such as complementary, analogous, or triadic schemes — or be inspired by nature, art, photography, or cultural traditions. Starting with a strong palette reduces decision fatigue and ensures every screen in your product feels cohesive.</p>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="border border-white/20 rounded-xl overflow-hidden">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How many colors should a palette have?</summary>
              <p className="px-5 pb-4 text-[var(--text-secondary)]">Most design palettes use 3–6 colors: a primary, a secondary, an accent, and 1–2 neutrals. This gives enough variety without creating visual chaos. Design systems like Tailwind extend this with a full 50–900 tint/shade scale per hue.</p>
            </details>
            <details className="border border-white/20 rounded-xl overflow-hidden">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Are these palettes free to use?</summary>
              <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes — all palettes on ColorPeek are free to use in personal and commercial projects. No attribution required.</p>
            </details>
            <details className="border border-white/20 rounded-xl overflow-hidden">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">How do I use a palette in CSS?</summary>
              <p className="px-5 pb-4 text-[var(--text-secondary)]">Copy the HEX codes and define them as CSS custom properties: <code className="text-indigo-400">--color-primary: #6366f1;</code>. Then reference them throughout your stylesheet. Or use our <a href="/palette-exporter" className="text-indigo-500 hover:underline">Palette Exporter</a> to export as a ready-to-paste CSS variables block.</p>
            </details>
            <details className="border border-white/20 rounded-xl overflow-hidden">
              <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What's the difference between a color scheme and a palette?</summary>
              <p className="px-5 pb-4 text-[var(--text-secondary)]">A color scheme describes the relationship between colors (complementary, analogous, triadic), while a palette is the actual set of specific color values chosen for a project. A palette is the implementation of a scheme.</p>
            </details>
          </div>
        </div>

        <RelatedTools tools={['/tint-shade','/color-blindness','/palette-exporter','/palette-url']} />
      </section>
    </div>
  );
};

export default ColorPalettes; 