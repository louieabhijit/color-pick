import { motion, AnimatePresence } from 'framer-motion'
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import ColorThief from 'colorthief'
import { getColorName } from '../utils/colorNames'
import { useClipboard } from '../context/ClipboardContext'

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

interface ColorPaletteProps {
  image: string
  favorites: string[]
  onToggleFavorite: (color: string) => void
  onColorSelect: (color: string) => void
}

export interface ColorPaletteRef {
  handleColorSelect: (color: string) => void
}

const MAX_COLORS = 6

const ColorPalette = forwardRef<ColorPaletteRef, ColorPaletteProps>(({ image, favorites, onToggleFavorite, onColorSelect }, ref) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const { copyToClipboard } = useClipboard();
  const [isGenerating, setIsGenerating] = useState(false)
  const [colorNames, setColorNames] = useState<Record<string, string>>({})

  // Generate color palette from image
  const generatePalette = async (imageUrl: string) => {
    setIsGenerating(true)
    try {
      // Create a new image element
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = imageUrl
      })

      // Use ColorThief to extract the palette
      const colorThief = new ColorThief()
      const palette = colorThief.getPalette(img, MAX_COLORS)
      
      if (palette) {
        // Convert RGB arrays to hex colors
        const hexColors = palette.map(([r, g, b]) => 
          `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        ).map(color => color.toUpperCase())
        
        setSelectedColors(hexColors)

        // Select a random color from the palette (excluding black and white)
        const validColors = hexColors.filter(color => {
          const rgb = hexToRgb(color);
          if (!rgb) return false;
          // Check if the color is not too close to black or white
          const isBlack = rgb.r < 30 && rgb.g < 30 && rgb.b < 30;
          const isWhite = rgb.r > 225 && rgb.g > 225 && rgb.b > 225;
          return !isBlack && !isWhite;
        });

        if (validColors.length > 0) {
          const randomIndex = Math.floor(Math.random() * validColors.length);
          onColorSelect(validColors[randomIndex]);
        }
      }
    } catch (error) {
      console.error('Failed to generate palette:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Generate palette when image changes
  useEffect(() => {
    generatePalette(image)
  }, [image])

  // Update color names when selected colors change
  useEffect(() => {
    const newColorNames = selectedColors.reduce((acc, color) => {
      acc[color] = getColorName(color);
      return acc;
    }, {} as Record<string, string>);
    setColorNames(newColorNames);
  }, [selectedColors]);

  // Expose handleColorSelect through ref
  useImperativeHandle(ref, () => ({
    handleColorSelect: (color: string) => {
      if (!selectedColors.includes(color)) {
        setSelectedColors(prev => {
          if (prev.length >= MAX_COLORS) {
            // Remove the first color and add the new one at the end
            return [...prev.slice(1), color]
          }
          return [...prev, color]
        })
      }
    }
  }))

  // Handle color copy
  const handleColorCopy = async (color: string) => {
    await copyToClipboard(color);
  }

  // Handle color removal
  const handleColorRemove = (colorToRemove: string) => {
    setSelectedColors(prev => prev.filter(color => color !== colorToRemove))
  }

  // Handle regenerate palette
  const handleRegenerate = () => {
    generatePalette(image)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Color Palette
          </span><span className="ml-2 text-sm font-normal text-gray-500">(click palette to see color details)</span>
        </h2>
        <button
          onClick={handleRegenerate}
          disabled={isGenerating}
          className="w-10 h-10 flex items-center justify-center rounded-full 
                   bg-gradient-to-r from-indigo-500 to-purple-500 
                   hover:from-indigo-600 hover:to-purple-600
                   text-white shadow-lg transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed group
                   hover:scale-105 active:scale-95"
          title="Regenerate palette"
        >
          <span className={`transform inline-block transition-transform duration-300 ${isGenerating ? 'animate-spin' : 'group-hover:rotate-180'}`}>
            ↻
          </span>
        </button>
      </div>
      
      <div className="h-[300px] flex gap-0 rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="sync">
          {selectedColors.map((color, index) => (
            <motion.div
              key={color}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: `${100 / MAX_COLORS}%`,
                opacity: 1
              }}
              exit={{ 
                width: 0,
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
                delay: index * 0.05
              }}
              className="relative h-full group cursor-pointer
                       transition-all duration-300 ease-out
                       hover:z-10 hover:shadow-2xl
                       after:absolute after:inset-0 after:opacity-0 after:transition-opacity
                       after:duration-500 after:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]
                       hover:after:opacity-100"
              onClick={() => {
                handleColorCopy(color)
                onColorSelect(color)
              }}
              style={{
                backgroundColor: color,
                transformOrigin: 'center',
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <motion.div
                className="absolute inset-0 w-full h-full transition-transform duration-500
                         group-hover:[transform:translateZ(20px)]"
                style={{ backgroundColor: color }}
              >
                {/* Subtle gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
              </motion.div>
              
              {/* Color info */}
              <div className="absolute inset-0 flex items-center justify-center
                          transition-transform duration-500
                          group-hover:[transform:translateZ(30px)]">
                <motion.div
                  initial={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex flex-col items-center relative"
                >
                  {/* Color name - always visible, slides up on hover */}
                  <div className="absolute inset-0 flex items-center justify-center 
                               transform transition-transform duration-300 ease-out
                               group-hover:translate-y-[calc(-50%+2rem)]">
                    <div className="relative px-2 py-1 max-w-[85%] mt-2">
                      <p className="text-white text-sm font-medium tracking-wider
                                text-center whitespace-normal break-words
                                leading-tight"
                                style={{
                                  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                                }}
                      >
                        {colorNames[color] || 'Loading...'}
                      </p>
                    </div>
                  </div>

                  {/* Hex code and buttons - appear on hover */}
                  <div className="absolute bottom-0 w-full space-y-3 px-4 pb-3
                               opacity-0 group-hover:opacity-100 
                               transform translate-y-4 group-hover:translate-y-0
                               transition-all duration-300 ease-out">
                    <p className="text-white text-base font-mono font-bold tracking-wider
                              text-center"
                              style={{
                                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                              }}
                    >
                      {color}
                    </p>
                  
                    <div className="flex items-center justify-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                        className="px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm
                             border border-white/20 hover:border-white/40
                               flex items-center justify-center gap-2
                             shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorCopy(color);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-200" 
                         fill="none" 
                         viewBox="0 0 24 24" 
                         stroke="currentColor"
                    >
                      <path strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                      />
                    </svg>
                    <span className="text-white/70 text-sm font-medium tracking-wide
                                 group-hover:text-white transition-colors duration-200">
                          Copy
                    </span>
                  </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm
                               border border-white/20 hover:border-white/40
                               shadow-lg hover:shadow-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(color);
                        }}
                      >
                        <svg 
                          className={`h-5 w-5 transition-colors duration-200 ${
                            favorites.includes(color) 
                              ? 'text-red-500 fill-current' 
                              : 'text-white/70 group-hover:text-white'
                          }`}
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          fill="none"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Copy feedback */}
              <AnimatePresence>
                  <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                  >
                  {/* No need for copiedColor check since the toast will handle it */}
                  </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Information Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Color Palette Guide
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Extract beautiful color palettes from any image. Discover exact color names, copy HEX codes, and save your favorite colors. 
              Perfect for designers, developers, and digital artists seeking color inspiration.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Image color extraction',
                'Precise color naming',
                'One-click copying',
                'Favorites collection',
                'Real-time preview',
                'Color management'
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
  )
})

ColorPalette.displayName = 'ColorPalette'

export default ColorPalette 