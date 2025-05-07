import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import type { FC, ReactNode } from 'react'
import Navbar from './components/Navbar'
import ImageSection from './components/ImageSection'
import UploadSection from './components/UploadSection'
import ColorPalette, { ColorPaletteRef } from './components/ColorPalette'
import FavoritesSection from './components/FavoritesSection'
import ColorDetails from './components/ColorDetails'
import Toast from './components/Toast'
import ColorHarmony from './components/ColorHarmony'
import ColorVariations from './components/ColorVariations'
import ContrastChecker from './components/ContrastChecker'
import ColorCodeSnippets from './components/ColorCodeSnippets'
import HowToUse from './components/HowToUse'
import BlogCarousel from './components/BlogCarousel'
import ToolsSection from './components/ToolsSection'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import FAQ from './pages/FAQ'
import ColorPalettes from './pages/ColorPalettes'
import Gradients from './pages/Gradients'
import Blog from './pages/Blog'
import ColorTheory from './pages/BlogPosts/ColorTheory'
import ColorPaletteTools from './pages/BlogPosts/ColorPaletteTools'
import ImageColorExtraction from './pages/BlogPosts/ImageColorExtraction'
import WCAGColorContrast from './pages/BlogPosts/WCAGColorContrast'
import ColorPsychology from './pages/BlogPosts/ColorPsychology'
import Sitemap from './components/Sitemap'
import SEO from './components/SEO'

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