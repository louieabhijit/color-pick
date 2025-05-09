import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useClipboard } from '../context/ClipboardContext';

interface ColorVariationsProps {
  selectedColor: string | null;
}

const ColorVariationsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-6 h-6 text-primary"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v8" />
    <path d="M12 22v-8" />
    <path d="M2 12h8" />
    <path d="M22 12h-8" />
    <path d="M20 20L16 16" />
    <path d="M20 4l-4 4" />
    <path d="M4 20l4-4" />
    <path d="M4 4l4 4" />
  </svg>
);

const ColorVariations = ({ selectedColor }: ColorVariationsProps) => {
  const { copyToClipboard } = useClipboard();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Helper function to determine text color based on background
  const getContrastText = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return 'text-gray-900';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? 'text-gray-900' : 'text-white';
  };

  // Function to calculate shades (darker variations)
  const calculateShades = (hex: string): string[] => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];
    
    return Array.from({ length: 10 }, (_, i) => {
      const darkness = 1 - (i + 1) * 0.1;
      const r = Math.round(rgb.r * darkness);
      const g = Math.round(rgb.g * darkness);
      const b = Math.round(rgb.b * darkness);
      return rgbToHex(r, g, b);
    });
  };

  // Function to calculate tints (lighter variations)
  const calculateTints = (hex: string): string[] => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];
    
    return Array.from({ length: 10 }, (_, i) => {
      const whiteness = (i + 1) * 0.1;
      const r = Math.round(rgb.r + (255 - rgb.r) * whiteness);
      const g = Math.round(rgb.g + (255 - rgb.g) * whiteness);
      const b = Math.round(rgb.b + (255 - rgb.b) * whiteness);
      return rgbToHex(r, g, b);
    });
  };

  // Function to calculate tones (mixed with gray)
  const calculateTones = (hex: string): string[] => {
    const rgb = hexToRgb(hex);
    if (!rgb) return [];
    
    return Array.from({ length: 10 }, (_, i) => {
      const grayMix = (i + 1) * 0.1;
      const r = Math.round(rgb.r * (1 - grayMix) + 128 * grayMix);
      const g = Math.round(rgb.g * (1 - grayMix) + 128 * grayMix);
      const b = Math.round(rgb.b * (1 - grayMix) + 128 * grayMix);
      return rgbToHex(r, g, b);
    });
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Helper function to convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Function to handle color copying
  const handleColorClick = async (color: string) => {
    await copyToClipboard(color);
  };

  if (!selectedColor) {
    return (
      <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg
                    border border-gray-100 dark:border-gray-700/50 shadow-lg">
        <div className="flex items-center gap-2">
          <ColorVariationsIcon />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary 
                       bg-clip-text text-transparent">
            Color Variations
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Select a color to see its variations
        </p>
      </div>
    );
  }

  const shades = calculateShades(selectedColor);
  const tints = calculateTints(selectedColor);
  const tones = calculateTones(selectedColor);

  const renderColorSection = (title: string, colors: string[], description: string) => (
    <motion.div 
      className="mb-8 last:mb-0"
      onHoverStart={() => setHoveredSection(title)}
      onHoverEnd={() => setHoveredSection(null)}
    >
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {description}
        </span>
      </div>
      <motion.div 
        className="relative overflow-hidden rounded-xl"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex">
          {colors.map((color, index) => (
            <motion.div
              key={`${title.toLowerCase()}-${color}-${index}`}
              className="group relative flex-1 cursor-pointer"
              whileHover={{ scale: 1.15, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleColorClick(color)}
            >
              <div
                className="relative h-16 transition-all duration-200 group-hover:shadow-lg 
                         flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: color }}
              >
                {/* Hover overlay with hex code */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-200 backdrop-blur-sm
                              flex items-center justify-center
                              ${getContrastText(color)}`}
                >
                  <div className="px-2 py-1 rounded text-xs font-medium
                               bg-black/10 backdrop-blur-sm">
                    {color}
                  </div>
                </div>
              </div>

              {/* Copied notification */}
              <AnimatePresence>
                {copiedColor === color && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2
                             bg-black/75 text-white text-[10px] py-1 px-2 rounded-full
                             whitespace-nowrap"
                  >
                    Copied {color}!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg
                border border-gray-100 dark:border-gray-700/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ColorVariationsIcon />
          <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary 
                       bg-clip-text text-transparent">
            Color Variations
          </h2>
        </div>
        <div 
          className="w-8 h-8 rounded-lg"
          style={{ backgroundColor: selectedColor }}
        />
      </div>

      {renderColorSection("Shades", shades, "Darker variations")}
      {renderColorSection("Tints", tints, "Lighter variations")}
      {renderColorSection("Tones", tones, "Gray mixed variations")}

      {/* SEO Description */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Explore color variations with our advanced color manipulation tools. Generate shades (darker variations), 
          tints (lighter variations), and tones (gray-mixed variations) of any color. Perfect for creating 
          cohesive color palettes, designing UI elements, and ensuring accessible color combinations. 
          Each variation can be easily copied with a single click for seamless integration into your design workflow.
        </p>
      </div>

      {/* Information Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Color Variations Guide
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore the full spectrum of your selected color with our advanced color variations tool. Generate tints, shades, and tones to create 
              perfect color palettes. Ideal for UI design, branding, and creating cohesive color schemes.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Tints & Shades',
                'One-click copying',
                'Interactive preview',
                'Real-time generation',
                'Professional calculations',
                'Hover interactions'
              ].map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 
                           text-indigo-600 dark:text-indigo-300 font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorVariations; 