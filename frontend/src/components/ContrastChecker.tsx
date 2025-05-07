import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ContrastCheckerProps {
  selectedColor: string | null
}

// Calculate relative luminance
const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

// Convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

// Calculate contrast ratio
const getContrastRatio = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// Get WCAG score
const getWCAGScore = (ratio: number) => {
  return {
    smallAA: ratio >= 4.5,
    smallAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  }
}

const ContrastChecker = ({ selectedColor }: ContrastCheckerProps) => {
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [contrastRatio, setContrastRatio] = useState(0)
  const [wcagScores, setWcagScores] = useState({
    smallAA: false,
    smallAAA: false,
    largeAA: false,
    largeAAA: false
  })

  useEffect(() => {
    if (selectedColor) {
      // Calculate contrast ratio
      const bgRgb = hexToRgb(selectedColor)
      const textRgb = hexToRgb(textColor)
      
      const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b)
      const textLuminance = getLuminance(textRgb.r, textRgb.g, textRgb.b)
      
      const ratio = getContrastRatio(bgLuminance, textLuminance)
      setContrastRatio(ratio)
      setWcagScores(getWCAGScore(ratio))

      // Auto-adjust text color based on background luminance
      setTextColor(bgLuminance > 0.5 ? '#000000' : '#FFFFFF')
    }
  }, [selectedColor, textColor])

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
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Contrast Checker
            </span>
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <p className="font-medium">No color selected</p>
          <p className="text-sm mt-1">Select a color to check contrast ratios</p>
        </div>
      </motion.div>
    )
  }

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
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Contrast Checker
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Preview */}
        <div className="space-y-6">
          {/* Preview Section */}
          <div className="h-full">
            <div 
              className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg relative"
              style={{ backgroundColor: selectedColor }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8">
                <div className="space-y-4 w-full">
                  <p 
                    className="text-4xl font-bold tracking-tight text-center"
                    style={{ color: textColor }}
                  >
                    Large Text
                  </p>
                  <p 
                    className="text-2xl font-medium tracking-tight text-center"
                    style={{ color: textColor }}
                  >
                    24px Heading
                  </p>
                </div>

                <div className="w-full max-w-md space-y-4">
                  <p 
                    className="text-base text-center leading-relaxed"
                    style={{ color: textColor }}
                  >
                    Small text (16px) for testing contrast ratio. 
                    The quick brown fox jumps over the lazy dog.
                  </p>
                  <p 
                    className="text-sm text-center leading-relaxed"
                    style={{ color: textColor }}
                  >
                    Even smaller text (14px) to ensure readability 
                    at different font sizes.
                  </p>
                </div>

                {/* Color Information */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between gap-4 bg-black/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <code className="text-sm font-mono px-2 py-1 rounded bg-black/20 text-white">
                        {selectedColor}
                      </code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg shadow-inner"
                        style={{ backgroundColor: textColor }}
                      />
                      <code className="text-sm font-mono px-2 py-1 rounded bg-black/20 text-white">
                        {textColor}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Scores */}
        <div className="space-y-8">
          {/* Main Score */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6 text-center">
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
              Contrast Ratio
            </h3>
            <div className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {contrastRatio.toFixed(2)}:1
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${
                    contrastRatio >= 4.5 ? 'text-indigo-500' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* WCAG Scores Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Small Text Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Small Text (under 18pt)
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className={`p-4 rounded-xl ${wcagScores.smallAA ? 'bg-green-500/10' : 'bg-gray-100 dark:bg-gray-700/50'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AA Level</span>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${wcagScores.smallAA ? 'text-green-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Minimum ratio: 4.5:1
                  </p>
                </motion.div>

                <motion.div 
                  className={`p-4 rounded-xl ${wcagScores.smallAAA ? 'bg-green-500/10' : 'bg-gray-100 dark:bg-gray-700/50'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AAA Level</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${wcagScores.smallAAA ? 'text-green-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enhanced ratio: 7:1
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Large Text Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Large Text (18pt+)
              </h3>
              <div className="space-y-3">
                <motion.div 
                  className={`p-4 rounded-xl ${wcagScores.largeAA ? 'bg-green-500/10' : 'bg-gray-100 dark:bg-gray-700/50'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AA Level</span>
                    <div className="flex">
                      {[1, 2, 3].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${wcagScores.largeAA ? 'text-green-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Minimum ratio: 3:1
                  </p>
                </motion.div>

                <motion.div 
                  className={`p-4 rounded-xl ${wcagScores.largeAAA ? 'bg-green-500/10' : 'bg-gray-100 dark:bg-gray-700/50'}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">AAA Level</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${wcagScores.largeAAA ? 'text-green-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enhanced ratio: 4.5:1
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WCAG Guidelines Info - Now outside the grid */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            WCAG Guidelines
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Check color contrast according to WCAG Guidelines. Ensure your text is readable for all users by meeting accessibility standards.
              AA level is the minimum requirement for most websites, while AAA provides enhanced accessibility.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Real-time contrast calculation',
                'WCAG compliance checking',
                'Interactive preview',
                'Accessibility scoring',
                'Auto text color adjustment'
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

export default ContrastChecker 