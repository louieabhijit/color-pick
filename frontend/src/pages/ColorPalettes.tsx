import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { IconType } from 'react-icons';
import Navbar from '../components/Navbar';
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

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Navbar onColorSelect={handleColorSelect} />
      
      {/* Add PopunderAd component */}
      <PopunderAd />
      
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
                               : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add spacing div to prevent overlap */}
      <div className="h-24 bg-white dark:bg-gray-900" />

      {/* Ad placement after header */}
      {/* <AdsterraAd variant="content" />
      <BannerAd variant="content" /> */}

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
                          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                            <Icon icon={MdCategory} className="w-5 h-5 mr-2" />
                            Categories
                          </h3>
                          <div className="space-y-2">
                            <button
                              onClick={() => setSelectedCategory('all')}
                              className={`w-full p-3 rounded-lg text-left transition-all ${
                                selectedCategory === 'all'
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
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
                              <span className="text-gray-600 dark:text-gray-400">Total Palettes:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{allPalettes.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-gray-600 dark:text-gray-400">Filtered Palettes:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{filteredPalettes.length}</span>
                            </div>
                          </div>
                        </div>

                        {/* Banner ad in sidebar */}
                        {/* <div className="p-4"> */}
                          {/* <BannerAd variant="sidebar" /> */}
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
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {palette.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {palette.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                              <Icon icon={FaHeart} className="w-4 h-4" />
                              <span>{palette.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
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
                                       text-gray-600 dark:text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Add ad after every 9 palettes */}
                    {/* {(index + 1) % 9 === 0 && index < displayedPalettes.length - 1 && ( */}
                      {/* // <div className="md:col-span-2 lg:col-span-3 space-y-4"> */}
                        {/* <AdsterraAd variant="content" /> */}
                        {/* <BannerAd variant="content" /> */}
                      {/* </div> */}
                    {/* // )} */}
                  </React.Fragment>
                ))}
              </div>
              
              {/* Loading indicator and observer target */}
              <div ref={observerTarget} className="w-full py-8 flex justify-center">
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                ) : displayedPalettes.length < filteredPalettes.length ? (
                  <div className="text-gray-500 dark:text-gray-400">Scroll for more</div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">No more palettes</div>
                )}
              </div>

              {/* Ad at the end */}
              {/* // <AdsterraAd variant="footer" /> */}
              {/* // <BannerAd variant="footer" /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ColorPalettes; 