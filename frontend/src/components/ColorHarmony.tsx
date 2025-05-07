import { motion } from 'framer-motion'
import { useState } from 'react'
import { useClipboard } from '../context/ClipboardContext'

interface ColorHarmonyProps {
  selectedColor: string | null
}

interface CopyState {
  [key: string]: boolean
}

const calculateColorHarmony = (hex: string) => {
  // Convert hex to HSL
  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
  }

  const hsl = hexToHSL(hex)
  const { h, s, l } = hsl

  // Calculate harmony colors
  const harmonies = {
    complementary: [
      hex,
      hslToHex((h + 180) % 360, s, l)
    ],
    analogous: [
      hslToHex((h - 30 + 360) % 360, s, l),
      hex,
      hslToHex((h + 30) % 360, s, l)
    ],
    triadic: [
      hex,
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l)
    ],
    splitComplementary: [
      hex,
      hslToHex((h + 150) % 360, s, l),
      hslToHex((h + 210) % 360, s, l)
    ],
    tetradic: [
      hex,
      hslToHex((h + 90) % 360, s, l),
      hslToHex((h + 180) % 360, s, l),
      hslToHex((h + 270) % 360, s, l)
    ],
    square: [
      hex,
      hslToHex((h + 90) % 360, s, l),
      hslToHex((h + 180) % 360, s, l),
      hslToHex((h + 270) % 360, s, l)
    ]
  }

  return harmonies
}

const ColorHarmony = ({ selectedColor }: ColorHarmonyProps) => {
  const { copyToClipboard } = useClipboard();
  const [copyState, setCopyState] = useState<CopyState>({})

  const handleCopy = async (color: string) => {
    await copyToClipboard(color);
  }

  if (!selectedColor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-4"
      >
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Color Harmony
            </span>
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-medium">No color selected</p>
          <p className="text-sm mt-1">Select a color to view its harmonies</p>
        </div>
      </motion.div>
    )
  }

  const harmonies = calculateColorHarmony(selectedColor)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Color Harmony
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Complementary */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Complementary</h4>
          <div className="flex">
            {harmonies.complementary.map((color, index) => (
              <motion.div
                key={`complementary-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.complementary.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analogous */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Analogous</h4>
          <div className="flex">
            {harmonies.analogous.map((color, index) => (
              <motion.div
                key={`analogous-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.analogous.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Triadic */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Triadic</h4>
          <div className="flex">
            {harmonies.triadic.map((color, index) => (
              <motion.div
                key={`triadic-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.triadic.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Split Complementary */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Split Complementary</h4>
          <div className="flex">
            {harmonies.splitComplementary.map((color, index) => (
              <motion.div
                key={`split-complementary-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.splitComplementary.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tetradic */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Tetradic</h4>
          <div className="flex">
            {harmonies.tetradic.map((color, index) => (
              <motion.div
                key={`tetradic-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.tetradic.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Square */}
        <motion.div 
          className="bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                    border border-gray-100 dark:border-gray-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-3">Square</h4>
          <div className="flex">
            {harmonies.square.map((color, index) => (
              <motion.div
                key={`square-${color}-${index}`}
                className="flex-1 h-12 relative group cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCopy(color)}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-center justify-center bg-black/40">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    animate={copyState[color] ? { scale: [0.8, 1.2, 0.9] } : { scale: 0.8 }}
                    transition={copyState[color] ? { duration: 0.3 } : { duration: 0.2 }}
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg relative"
                  >
                    <p className="text-sm font-mono font-medium text-white tracking-wider">
                      {copyState[color] ? 'Copied!' : color}
                    </p>
                  </motion.div>
                </div>
                {index < harmonies.square.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Information Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Color Harmony Guide
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover perfect color combinations with our comprehensive color harmony tool. Generate complementary, analogous, triadic, and more color schemes instantly.
              Ideal for designers, artists, and developers seeking balanced and aesthetically pleasing color combinations.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Six harmony types',
                'One-click color copying',
                'Interactive previews',
                'Real-time updates',
                'Professional-grade calculations',
                'Dark mode support'
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
}

export default ColorHarmony 