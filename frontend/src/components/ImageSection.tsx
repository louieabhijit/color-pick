import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import ColorThief from 'colorthief'

interface ImageSectionProps {
  selectedImage: string
  onColorSelect?: (color: string) => void
}

const ImageSection = ({ selectedImage, onColorSelect }: ImageSectionProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [hoverColor, setHoverColor] = useState<string>('#FFFFFF')
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const magnifierSize = 150 // Increased size for better visibility
  const zoomLevel = 4 // Increased zoom level

  // Handle mouse move for magnifier and color detection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })

    // Get color at cursor position
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = imageRef.current.naturalWidth
    canvas.height = imageRef.current.naturalHeight

    ctx.drawImage(imageRef.current, 0, 0)

    const scaleX = imageRef.current.naturalWidth / imageRef.current.clientWidth
    const scaleY = imageRef.current.naturalHeight / imageRef.current.clientHeight
    const pixel = ctx.getImageData(x * scaleX, y * scaleY, 1, 1).data

    const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`
    setHoverColor(hex.toUpperCase())
  }

  // Calculate magnifier position to keep it within bounds
  const getMagnifierPosition = () => {
    if (!containerRef.current) return { left: 0, top: 0 }

    const rect = containerRef.current.getBoundingClientRect()
    const maxX = rect.width - magnifierSize
    const maxY = rect.height - magnifierSize

    // Position the magnifier to the bottom-right of the cursor
    let left = mousePosition.x + 20 // 20px offset from cursor
    let top = mousePosition.y + 20

    // Keep the magnifier within the container bounds
    left = Math.min(Math.max(0, left), maxX)
    top = Math.min(Math.max(0, top), maxY)

    return { left, top }
  }

  // Calculate background position for the magnifier
  const getMagnifierBackground = () => {
    if (!containerRef.current || !imageRef.current) return {}

    const rect = containerRef.current.getBoundingClientRect()
    const imgRect = imageRef.current.getBoundingClientRect()

    // Calculate the actual image dimensions within the container
    const imgWidth = imgRect.width
    const imgHeight = imgRect.height

    // Calculate the position relative to the actual image
    const imgX = (mousePosition.x - (rect.width - imgWidth) / 2)
    const imgY = (mousePosition.y - (rect.height - imgHeight) / 2)

    // Calculate the center point for the zoom
    const centerX = imgX * zoomLevel - magnifierSize / 2
    const centerY = imgY * zoomLevel - magnifierSize / 2

    return {
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `-${centerX}px -${centerY}px`,
      backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
      backgroundRepeat: 'no-repeat',
    }
  }

  // Handle color picking
  const handleClick = () => {
    if (onColorSelect) {
      onColorSelect(hoverColor)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Select Color from Image
          </span>
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onClick={handleClick}
      >
        <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Selected image for color analysis"
            className="absolute inset-0 w-full h-full object-contain"
            crossOrigin="anonymous"
          />
        </div>

        {/* Magnifier */}
        {showMagnifier && (
          <>
            {/* Color hex display */}
            <div 
              className="absolute px-3 py-1.5 rounded-lg shadow-lg font-mono text-sm transition-all duration-200"
              style={{
                backgroundColor: hoverColor,
                color: isColorLight(hoverColor) ? '#000000' : '#FFFFFF',
                left: getMagnifierPosition().left + magnifierSize/2 - 36,
                top: getMagnifierPosition().top + magnifierSize + 12,
              }}
            >
              {hoverColor}
            </div>

            {/* Magnifier circle */}
            <div
              className="absolute rounded-full overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
              style={{
                width: magnifierSize,
                height: magnifierSize,
                ...getMagnifierPosition(),
                ...getMagnifierBackground(),
                border: `2px solid ${hoverColor}`,
              }}
            >
              {/* Crosshair */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Vertical line */}
                <div 
                  className="absolute left-1/2 h-full w-[1px] transform -translate-x-1/2"
                  style={{ backgroundColor: isColorLight(hoverColor) ? '#000000' : '#FFFFFF', opacity: 0.6 }}
                />
                {/* Horizontal line */}
                <div 
                  className="absolute top-1/2 w-full h-[1px] transform -translate-y-1/2"
                  style={{ backgroundColor: isColorLight(hoverColor) ? '#000000' : '#FFFFFF', opacity: 0.6 }}
                />
                {/* Center dot */}
                <div 
                  className="absolute top-1/2 left-1/2 w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ 
                    backgroundColor: isColorLight(hoverColor) ? '#000000' : '#FFFFFF',
                    boxShadow: `0 0 0 1px ${isColorLight(hoverColor) ? '#FFFFFF' : '#000000'}`
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Helper function to determine if a color is light or dark
const isColorLight = (color: string): boolean => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return brightness > 128
}

export default ImageSection 