import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getColorName } from '../utils/colorNames'
import { useClipboard } from '../context/ClipboardContext'

interface ColorDetailsProps {
  selectedColor: string | null
}

interface CopyState {
  hex: boolean;
  rgb: boolean;
  cmyk: boolean;
  hsl: boolean;
  hsv: boolean;
  xyz: boolean;
  yxy: boolean;
  hunterLab: boolean;
  cieLab: boolean;
}

// Convert RGB to XYZ
const rgbToXYZ = (r: number, g: number, b: number) => {
  // Convert RGB values to 0-1 range
  let rr = r / 255
  let gg = g / 255
  let bb = b / 255

  // Convert to sRGB
  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92

  // Convert to XYZ using sRGB D65 matrix
  const x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) * 100
  const y = (rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750) * 100
  const z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) * 100

  return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100, z: Math.round(z * 100) / 100 }
}

// Convert XYZ to Yxy
const xyzToYxy = (x: number, y: number, z: number) => {
  const sum = x + y + z
  const xx = sum !== 0 ? x / sum : 0
  const yy = sum !== 0 ? y / sum : 0

  return {
    Y: Math.round(y * 100) / 100,
    x: Math.round(xx * 1000) / 1000,
    y: Math.round(yy * 1000) / 1000
  }
}

// Convert XYZ to Hunter Lab
const xyzToHunterLab = (x: number, y: number, z: number) => {
  // Hunter Lab uses different scaling factors
  const Ka = 175 / 198.04 // (100 * sqrt(X/98.04))
  const Kb = 70 / 218.11  // (100 * sqrt(Y/218.11))

  const L = 10 * Math.sqrt(y)
  const a = Ka * (((x / 98.04) - (y / 100)) / Math.sqrt(y / 100))
  const b = Kb * ((y / 100) - (z / 118.11)) / Math.sqrt(y / 100)

  return {
    L: Math.round(L * 100) / 100,
    a: Math.round(a * 100) / 100,
    b: Math.round(b * 100) / 100
  }
}

// Convert XYZ to CIE-Lab
const xyzToCIELab = (x: number, y: number, z: number) => {
  // D65 reference white
  const xn = 95.047
  const yn = 100.0
  const zn = 108.883

  // Helper function
  const f = (t: number) => t > Math.pow(6/29, 3) 
    ? Math.pow(t, 1/3) 
    : (1/3) * Math.pow(29/6, 2) * t + 4/29

  const fx = f(x/xn)
  const fy = f(y/yn)
  const fz = f(z/zn)

  const L = 116 * fy - 16
  const a = 500 * (fx - fy)
  const b = 200 * (fy - fz)

  return {
    L: Math.round(L * 100) / 100,
    a: Math.round(a * 100) / 100,
    b: Math.round(b * 100) / 100
  }
}

const ColorDetails = ({ selectedColor }: ColorDetailsProps) => {
  const [colorName, setColorName] = useState<string>('')
  const { copyToClipboard } = useClipboard();
  const [copyState, setCopyState] = useState<CopyState>({
    hex: false,
    rgb: false,
    cmyk: false,
    hsl: false,
    hsv: false,
    xyz: false,
    yxy: false,
    hunterLab: false,
    cieLab: false
  })
  
  useEffect(() => {
    if (selectedColor) {
      setColorName(getColorName(selectedColor))
    }
  }, [selectedColor])

  const handleCopy = async (value: string) => {
    await copyToClipboard(value);
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255)
    let m = 1 - (g / 255)
    let y = 1 - (b / 255)
    let k = Math.min(c, m, y)
    
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 1 }
    }

    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    }
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

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

  // Convert RGB to HSV
  const rgbToHsv = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    const v = max
    const d = max - min
    const s = max === 0 ? 0 : d / max

    if (max !== min) {
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
      v: Math.round(v * 100)
    }
  }

  // Get all color values
  const getColorValues = (hex: string) => {
    const rgb = hexToRgb(hex)
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    const xyz = rgbToXYZ(rgb.r, rgb.g, rgb.b)
    const yxy = xyzToYxy(xyz.x, xyz.y, xyz.z)
    const hunterLab = xyzToHunterLab(xyz.x, xyz.y, xyz.z)
    const cieLab = xyzToCIELab(xyz.x, xyz.y, xyz.z)
    
    return {
      rgb,
      cmyk,
      hsl,
      hsv,
      xyz,
      yxy,
      hunterLab,
      cieLab,
      rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      cmykString: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      hslString: `hsl(${hsl.h}deg, ${hsl.s}%, ${hsl.l}%)`,
      hsvString: `hsv(${hsv.h}deg, ${hsv.s}%, ${hsv.v}%)`,
      xyzString: `XYZ(${xyz.x}, ${xyz.y}, ${xyz.z})`,
      yxyString: `Yxy(${yxy.Y}, ${yxy.x}, ${yxy.y})`,
      hunterLabString: `Hunter Lab(${hunterLab.L}, ${hunterLab.a}, ${hunterLab.b})`,
      cieLabString: `CIE-Lab(${cieLab.L}, ${cieLab.a}, ${cieLab.b})`
    }
  }

  // Create gradient background for hue slider
  const hueGradient = `linear-gradient(to right, 
    hsl(0, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(360, 100%, 50%)
  )`

  // Create gradient for saturation slider based on current hue
  const getSaturationGradient = (h: number, l: number) => 
    `linear-gradient(to right, 
      hsl(${h}, 0%, ${l}%),
      hsl(${h}, 100%, ${l}%)
    )`

  // Create gradient for lightness slider based on current hue and saturation
  const getLightnessGradient = (h: number, s: number) => 
    `linear-gradient(to right, 
      hsl(${h}, ${s}%, 0%),
      hsl(${h}, ${s}%, 50%),
      hsl(${h}, ${s}%, 100%)
    )`

  // Create gradient for HSV value slider
  const getValueGradient = (h: number, s: number) => 
    `linear-gradient(to right, 
      hsv(${h}, ${s}%, 0%),
      hsv(${h}, ${s}%, 100%)
    )`

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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Color Details
            </span>
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p className="font-medium">No color selected</p>
          <p className="text-sm mt-1">Click on any color to view its details</p>
        </div>
      </motion.div>
    )
  }

  const colorValues = getColorValues(selectedColor)

  const SpectrumSlider = ({ 
    value, 
    gradient, 
    label, 
    unit = '%',
    max = 100 
  }: { 
    value: number, 
    gradient: string, 
    label: string,
    unit?: string,
    max?: number 
  }) => (
    <div className="flex items-center space-x-2 group">
      <div className="w-4 text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</div>
      <div className="relative flex-grow h-2">
        {/* Background gradient track */}
        <div 
          className="absolute inset-0 rounded-full shadow-inner"
          style={{ 
            background: gradient,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Slider thumb with integrated tooltip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
          style={{ left: `${(value / max) * 100}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Value tooltip */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 
                       bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10
                       ring-inset" />

          {/* Slider line */}
          <div className="h-3 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400
                        shadow-[0_0_4px_rgba(99,102,241,0.4)] dark:shadow-[0_0_4px_rgba(167,139,250,0.4)]" />
        </motion.div>
      </div>
      <div className="w-14 text-xs font-mono text-right text-gray-600 dark:text-gray-300 
                   bg-gray-100 dark:bg-gray-700/50 rounded-md px-1.5 py-0.5">
        {value}{unit}
      </div>
    </div>
  )

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
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Color Details
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {/* Left side: Color Preview, Name, and Color Values */}
        <div className="w-full md:w-48 mb-6 md:mb-0 space-y-4">
          {/* Color Preview */}
          <div className="flex justify-center md:justify-start">
            <motion.div 
              className="relative group w-32 md:w-24 h-32 md:h-24"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="w-full h-full rounded-xl shadow-lg"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 rounded-xl" />
            </motion.div>
          </div>

          {/* Color Name */}
          <div className="relative text-center md:text-left">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Color Name</h3>
            <p className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              {colorName}
            </p>
          </div>

          {/* Color Values */}
          <div className="space-y-3">
            {/* Hex Code */}
            <div className="relative group">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Hex Code</h3>
              <div className="flex items-center">
                <code className="text-sm font-mono font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 
                              rounded-md px-2 py-1 flex-grow truncate">
                  {selectedColor}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(selectedColor)}
                  className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                >
                  {copyState.hex ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 transition-colors duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Color Graphs */}
        <div className="flex-grow">
          {/* RGB and CMYK graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* RGB Graph */}
            <div className="space-y-3 bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                          border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">RGB Values</h3>
              <div className="space-y-3">
                {[
                  { label: 'R', value: colorValues.rgb.r, color: '#ef4444' },
                  { label: 'G', value: colorValues.rgb.g, color: '#22c55e' },
                  { label: 'B', value: colorValues.rgb.b, color: '#3b82f6' }
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center space-x-2 group">
                    <div className="w-4 text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</div>
                    <div className="relative flex-grow h-4">
                      <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700/50 shadow-inner" />
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(value / 255) * 100}%`,
                          backgroundColor: color,
                          boxShadow: `0 1px 2px ${color}40`
                        }}
                      />
                    </div>
                    <div className="w-14 text-xs font-mono text-right text-gray-600 dark:text-gray-300 
                                 bg-gray-100 dark:bg-gray-700/50 rounded-md px-1.5 py-0.5">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center pt-2">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 
                              rounded-md px-2 py-1 flex-grow truncate">
                  {colorValues.rgbString}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(colorValues.rgbString)}
                  className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                >
                  {copyState.rgb ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 transition-colors duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* CMYK Graph */}
            <div className="space-y-3 bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                          border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">CMYK Values</h3>
              <div className="space-y-3">
                {[
                  { label: 'C', value: colorValues.cmyk.c, color: '#06b6d4' },
                  { label: 'M', value: colorValues.cmyk.m, color: '#ec4899' },
                  { label: 'Y', value: colorValues.cmyk.y, color: '#eab308' },
                  { label: 'K', value: colorValues.cmyk.k, color: '#4b5563' }
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center space-x-2 group">
                    <div className="w-4 text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</div>
                    <div className="relative flex-grow h-4">
                      <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-700/50 shadow-inner" />
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${value}%`,
                          backgroundColor: color,
                          boxShadow: `0 1px 2px ${color}40`
                        }}
                      />
                    </div>
                    <div className="w-14 text-xs font-mono text-right text-gray-600 dark:text-gray-300 
                                 bg-gray-100 dark:bg-gray-700/50 rounded-md px-1.5 py-0.5">
                      {value}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center pt-2">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 
                              rounded-md px-2 py-1 flex-grow truncate">
                  {colorValues.cmykString}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(colorValues.cmykString)}
                  className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                >
                  {copyState.cmyk ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 transition-colors duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* HSL and HSV graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* HSL Graph */}
            <div className="space-y-3 bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                          border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">HSL Values</h3>
              <div className="space-y-3">
                <SpectrumSlider
                  value={colorValues.hsl.h}
                  gradient={hueGradient}
                  label="H"
                  unit="°"
                  max={360}
                />
                <SpectrumSlider
                  value={colorValues.hsl.s}
                  gradient={getSaturationGradient(colorValues.hsl.h, colorValues.hsl.l)}
                  label="S"
                />
                <SpectrumSlider
                  value={colorValues.hsl.l}
                  gradient={getLightnessGradient(colorValues.hsl.h, colorValues.hsl.s)}
                  label="L"
                />
              </div>
              <div className="flex items-center pt-2">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 
                              rounded-md px-2 py-1 flex-grow truncate">
                  {colorValues.hslString}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(colorValues.hslString)}
                  className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                >
                  {copyState.hsl ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 transition-colors duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>

            {/* HSV Graph */}
            <div className="space-y-3 bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-lg backdrop-blur-sm
                          border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">HSV Values</h3>
              <div className="space-y-3">
                <SpectrumSlider
                  value={colorValues.hsv.h}
                  gradient={hueGradient}
                  label="H"
                  unit="°"
                  max={360}
                />
                <SpectrumSlider
                  value={colorValues.hsv.s}
                  gradient={getSaturationGradient(colorValues.hsv.h, 50)}
                  label="S"
                />
                <SpectrumSlider
                  value={colorValues.hsv.v}
                  gradient={getValueGradient(colorValues.hsv.h, colorValues.hsv.s)}
                  label="V"
                />
              </div>
              <div className="flex items-center pt-2">
                <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 
                              rounded-md px-2 py-1 flex-grow truncate">
                  {colorValues.hsvString}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(colorValues.hsvString)}
                  className="ml-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                >
                  {copyState.hsv ? (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-purple-400 transition-colors duration-200" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Color Details Guide
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Explore comprehensive color information with our advanced color analysis tool. View and convert between multiple color spaces including RGB, CMYK, HSL, HSV, and professional color models like CIE-Lab. Perfect for designers, developers, and color scientists needing precise color data.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Multiple color spaces',
                'Professional models',
                'One-click copying',
                'Real-time conversion',
                'Interactive sliders',
                'Color visualization'
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

export default ColorDetails 