import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { IconType } from 'react-icons';
import Navbar from '../components/Navbar';
import { FaFilter, FaHeart, FaCopy, FaSearch, FaClock, FaEye, FaBars, FaTimes } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { oklch } from 'culori';
import toast from 'react-hot-toast';

interface IconProps {
  icon: IconType;
  className?: string;
}

interface Gradient {
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

const Icon = ({ icon: IconComponent, className }: IconProps) => {
  return <IconComponent className={className} />;
};

// Categories with their descriptions
const categories = {
  'linear': 'Smooth linear color transitions',
  'radial': 'Circular gradient patterns',
  'angular': 'Rotating color transitions',
  'diagonal': 'Diagonal color flows',
  'mesh': 'Complex multi-point gradients',
  'vibrant': 'Bold and energetic transitions',
  'subtle': 'Soft and gentle color shifts',
  'dark': 'Deep and moody gradients',
  'light': 'Bright and airy transitions',
  'rainbow': 'Multi-color spectrum gradients'
};

// Gradient name generation
const adjectives = [
  'Cosmic', 'Ethereal', 'Mystic', 'Aurora', 'Nebula', 'Solar', 'Lunar', 'Ocean',
  'Forest', 'Desert', 'Arctic', 'Tropical', 'Crystal', 'Prism', 'Plasma', 'Neon',
  'Velvet', 'Silk', 'Vapor', 'Storm', 'Dawn', 'Dusk', 'Twilight', 'Horizon'
];

const themes = [
  'Flow', 'Wave', 'Stream', 'Pulse', 'Glow', 'Drift', 'Shift', 'Blend',
  'Fusion', 'Aura', 'Haze', 'Mist', 'Beam', 'Ray', 'Flux', 'Tide',
  'Wisp', 'Cloud', 'Breeze', 'Current', 'Ripple', 'Surge', 'Swirl', 'Vortex'
];

const generateGradientName = (index: number, category: string): { name: string, description: string } => {
  const adjIndex = Math.floor(index / themes.length) % adjectives.length;
  const themeIndex = index % themes.length;
  const adj = adjectives[adjIndex];
  const theme = themes[themeIndex];
  
  let description = '';
  switch (category) {
    case 'linear':
      description = 'A smooth linear gradient transition perfect for modern interfaces';
      break;
    case 'radial':
      description = 'Circular gradient pattern radiating from the center';
      break;
    case 'angular':
      description = 'Dynamic rotating gradient creating a unique visual effect';
      break;
    case 'diagonal':
      description = 'Diagonal flowing gradient for dynamic layouts';
      break;
    case 'mesh':
      description = 'Complex multi-point gradient creating a mesh-like effect';
      break;
    case 'vibrant':
      description = 'Bold and energetic gradient transitions';
      break;
    case 'subtle':
      description = 'Soft and gentle gradient shifts for elegant designs';
      break;
    case 'dark':
      description = 'Deep and moody gradient perfect for dark themes';
      break;
    case 'light':
      description = 'Bright and airy gradient transitions';
      break;
    case 'rainbow':
      description = 'Multi-color spectrum gradient inspired by rainbows';
      break;
  }

  return {
    name: `${adj} ${theme}`,
    description
  };
};

// Function to generate OkLCH gradient colors
const generateOkLCHGradient = (baseHue: number, category: string): string[] => {
  const colors: string[] = [];
  
  const generateColor = (l: number, c: number, h: number) => {
    return `oklch(${l}% ${c} ${h})`;
  };

  switch(category) {
    case 'linear':
    case 'diagonal':
      // Smooth transitions
      colors.push(generateColor(60, 0.15, baseHue));
      colors.push(generateColor(70, 0.2, (baseHue + 30) % 360));
      break;
      
    case 'radial':
    case 'angular':
      // More contrasting transitions
      colors.push(generateColor(50, 0.25, baseHue));
      colors.push(generateColor(80, 0.15, (baseHue + 60) % 360));
      break;
      
    case 'mesh':
      // Complex transitions
      colors.push(generateColor(55, 0.2, baseHue));
      colors.push(generateColor(65, 0.25, (baseHue + 45) % 360));
      colors.push(generateColor(75, 0.15, (baseHue + 90) % 360));
      break;
      
    case 'vibrant':
      // Bold colors
      colors.push(generateColor(65, 0.3, baseHue));
      colors.push(generateColor(60, 0.35, (baseHue + 40) % 360));
      break;
      
    case 'subtle':
      // Soft colors
      colors.push(generateColor(75, 0.1, baseHue));
      colors.push(generateColor(80, 0.08, (baseHue + 20) % 360));
      break;
      
    case 'dark':
      // Deep colors
      colors.push(generateColor(30, 0.15, baseHue));
      colors.push(generateColor(40, 0.2, (baseHue + 30) % 360));
      break;
      
    case 'light':
      // Bright colors
      colors.push(generateColor(85, 0.1, baseHue));
      colors.push(generateColor(90, 0.08, (baseHue + 25) % 360));
      break;
      
    case 'rainbow':
      // Multiple colors
      colors.push(generateColor(65, 0.25, baseHue));
      colors.push(generateColor(70, 0.3, (baseHue + 60) % 360));
      colors.push(generateColor(75, 0.25, (baseHue + 120) % 360));
      break;
      
    default:
      colors.push(generateColor(60, 0.2, baseHue));
      colors.push(generateColor(70, 0.15, (baseHue + 30) % 360));
  }
  
  return colors;
};

// Generate all gradients
const generateAllGradients = (): Gradient[] => {
  const gradients: Gradient[] = [];
  const categoryNames = Object.keys(categories);
  const now = new Date();
  
  for(let i = 0; i < 5000; i++) {
    const category = categoryNames[i % categoryNames.length];
    const baseHue = (i * 37) % 360; // Use golden ratio to distribute hues
    const { name, description } = generateGradientName(i, category);
    
    // Generate random but realistic stats
    const daysOld = Math.floor(Math.random() * 365);
    const createdAt = new Date(now.getTime() - (daysOld * 24 * 60 * 60 * 1000));
    const views = Math.floor(Math.random() * 10000) + 100;
    const likes = Math.floor(views * (Math.random() * 0.4 + 0.1)); // 10-50% of views are likes
    
    gradients.push({
      id: `gradient-${i}`,
      name,
      colors: generateOkLCHGradient(baseHue, category),
      category,
      tags: [category, i % 2 === 0 ? 'trending' : 'new'],
      description,
      likes,
      views,
      createdAt
    });
  }
  
  return gradients;
};

const Gradients = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [allGradients] = useState<Gradient[]>(generateAllGradients());
  const [displayedGradients, setDisplayedGradients] = useState<Gradient[]>([]);
  const [filteredGradients, setFilteredGradients] = useState<Gradient[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'mostLiked' | 'mostViewed'>('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  const ITEMS_PER_PAGE = 30;

  const loadMoreGradients = useCallback(() => {
    if (loading) return;
    setLoading(true);
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const newGradients = filteredGradients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    
    setDisplayedGradients(prev => [...prev, ...newGradients]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, filteredGradients, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && displayedGradients.length < filteredGradients.length) {
          loadMoreGradients();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMoreGradients]);

  useEffect(() => {
    let filtered = allGradients;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
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
    
    setFilteredGradients(filtered);
    setDisplayedGradients(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(2);
  }, [selectedCategory, searchTerm, allGradients, sortBy]);

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

  const copyGradient = (colors: string[]) => {
    const gradientString = `linear-gradient(to right, ${colors.join(', ')})`;
    copyToClipboard(gradientString, 'Gradient CSS copied to clipboard!');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) ? 
        prev.filter(fid => fid !== id) : 
        [...prev, id];
      
      setDisplayedGradients(prevGradients => 
        prevGradients.map(p => {
          if (p.id === id) {
            return {
              ...p,
              likes: p.likes + (newFavorites.includes(id) ? 1 : -1)
            };
          }
          return p;
        })
      );
      
      setFilteredGradients(prevGradients => 
        prevGradients.map(p => {
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

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: FaClock },
    { value: 'mostLiked', label: 'Most Liked', icon: FaHeart },
    { value: 'mostViewed', label: 'Most Viewed', icon: FaEye }
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <Navbar onColorSelect={() => {}} />
      
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
                  placeholder="Search gradients..."
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
                                  {allGradients.length}
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
                                    {allGradients.filter(p => p.category === key).length}
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
                              <span className="text-gray-600 dark:text-gray-400">Total Gradients:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{allGradients.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <span className="text-gray-600 dark:text-gray-400">Filtered Gradients:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">{filteredGradients.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gradients Grid */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedGradients.map((gradient) => (
                  <motion.div
                    key={gradient.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="overflow-hidden shadow-lg rounded-2xl aspect-[1.6/1] relative"
                  >
                    {/* Background Gradient */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to right, ${gradient.colors.join(', ')})`
                      }}
                    />

                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] border border-white/20" />

                    {/* Content */}
                    <div className="relative w-full h-full">
                      {/* Content Overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top Section */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">
                              {gradient.name}
                            </h3>
                            <p className="text-sm text-white/90 drop-shadow-md max-w-[80%]">
                              {gradient.description}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleFavorite(gradient.id)}
                              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 
                                border border-white/20 shadow-lg hover:shadow-xl
                                ${favorites.includes(gradient.id)
                                  ? 'bg-white/30 text-red-500 hover:bg-white/40'
                                  : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                            >
                              <Icon icon={FaHeart} className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => copyGradient(gradient.colors)}
                              className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white 
                                       hover:bg-white/20 transition-all duration-300
                                       border border-white/20 shadow-lg hover:shadow-xl"
                            >
                              <Icon icon={FaCopy} className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1 text-white/90 
                                          bg-white/10 backdrop-blur-md px-3 py-1 rounded-full
                                          border border-white/20">
                                <Icon icon={FaHeart} className="w-4 h-4" />
                                <span>{gradient.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-white/90
                                          bg-white/10 backdrop-blur-md px-3 py-1 rounded-full
                                          border border-white/20">
                                <Icon icon={FaEye} className="w-4 h-4" />
                                <span>{gradient.views}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-xs font-medium rounded-full 
                                         bg-white/20 backdrop-blur-md text-white
                                         border border-white/20 shadow-sm">
                              {gradient.category}
                            </span>
                            {gradient.tags.map(tag => (
                              <span
                                key={`${gradient.id}-${tag}`}
                                className="px-3 py-1 text-xs font-medium rounded-full 
                                         bg-white/10 backdrop-blur-md text-white
                                         border border-white/20 shadow-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Loading indicator and observer target */}
              <div ref={observerTarget} className="w-full py-8 flex justify-center">
                {loading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                ) : displayedGradients.length < filteredGradients.length ? (
                  <div className="text-gray-500 dark:text-gray-400">Scroll for more</div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">No more gradients</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gradients; 