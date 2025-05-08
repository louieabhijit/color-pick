import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import type { FC, ReactNode } from 'react'
import Navbar from '../frontend/src/components/Navbar'
import ImageSection from '../frontend/src/components/ImageSection'
import UploadSection from '../frontend/src/components/UploadSection'
import ColorPalette, { ColorPaletteRef } from '../frontend/src/components/ColorPalette'
import FavoritesSection from '../frontend/src/components/FavoritesSection'
import ColorDetails from '../frontend/src/components/ColorDetails'
import Toast from '../frontend/src/components/Toast'
import ColorHarmony from '../frontend/src/components/ColorHarmony'
import ColorVariations from '../frontend/src/components/ColorVariations'
import ContrastChecker from '../frontend/src/components/ContrastChecker'
import ColorCodeSnippets from '../frontend/src/components/ColorCodeSnippets'
import HowToUse from '../frontend/src/components/HowToUse'
import BlogCarousel from '../frontend/src/components/BlogCarousel'
import ToolsSection from '../frontend/src/components/ToolsSection'
import Footer from '../frontend/src/components/Footer'
import About from '../frontend/src/pages/About'
import Contact from '../frontend/src/pages/Contact'
import Privacy from '../frontend/src/pages/Privacy'
import FAQ from '../frontend/src/pages/FAQ'
import ColorPalettes from '../frontend/src/pages/ColorPalettes'
import Gradients from '../frontend/src/pages/Gradients'
import Blog from '../frontend/src/pages/Blog'
import ColorTheory from '../frontend/src/pages/BlogPosts/ColorTheory'
import ColorPaletteTools from '../frontend/src/pages/BlogPosts/ColorPaletteTools'
import ImageColorExtraction from '../frontend/src/pages/BlogPosts/ImageColorExtraction'
import WCAGColorContrast from '../frontend/src/pages/BlogPosts/WCAGColorContrast'
import ColorPsychology from '../frontend/src/pages/BlogPosts/ColorPsychology'
import BrandColorPalette from '../frontend/src/pages/BlogPosts/BrandColorPalette'
import Sitemap from '../frontend/src/components/Sitemap'
import SEO from '../frontend/src/components/SEO'

const App: FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showToast, setShowToast] = useState<boolean>(false)
  const colorPaletteRef = useRef<ColorPaletteRef | null>(null)

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleToggleFavorite = (color: string) => {
    if (favorites.includes(color)) {
      setFavorites(favorites.filter((c) => c !== color))
    } else {
      setFavorites([...favorites, color])
    }
  }

  return (
    <Router>
      <HelmetProvider>
        <div className="flex flex-col h-screen">
          <SEO />
          <Navbar />
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<HomePage selectedImage={selectedImage} selectedColor={selectedColor} favorites={favorites} showToast={showToast} colorPaletteRef={colorPaletteRef} handleColorSelect={handleColorSelect} handleToggleFavorite={handleToggleFavorite} setSelectedImage={setSelectedImage} setFavorites={setFavorites} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/palettes" element={<ColorPalettes />} />
              <Route path="/gradients" element={<Gradients />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/complete-guide-color-theory-designers" element={<ColorTheory />} />
              <Route path="/blog/top-5-free-color-palette-tools-2025" element={<ColorPaletteTools />} />
              <Route path="/blog/how-to-extract-colors-from-image" element={<ImageColorExtraction />} />
              <Route path="/blog/wcag-color-contrast-guidelines" element={<WCAGColorContrast />} />
              <Route path="/blog/color-psychology-customer-behavior" element={<ColorPsychology />} />
              <Route path="/blog/how-to-choose-brand-color-palette" element={<BrandColorPalette />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </HelmetProvider>
    </Router>
  )
}

export default App 