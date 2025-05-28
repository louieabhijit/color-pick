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
import Terms from './pages/Terms'
import Cookies from './pages/Cookies'
import FAQ from './pages/FAQ'
import ColorPalettes from './pages/ColorPalettes'
import Gradients from './pages/Gradients'
import Blog from './pages/Blog'
import ColorTheory from './pages/BlogPosts/ColorTheory'
import ColorPaletteTools from './pages/BlogPosts/ColorPaletteTools'
import ImageColorExtraction from './pages/BlogPosts/ImageColorExtraction'
import WCAGColorContrast from './pages/BlogPosts/WCAGColorContrast'
import ColorPsychology from './pages/BlogPosts/ColorPsychology'
import BrandColorPalette from './pages/BlogPosts/BrandColorPalette'
import ColorAccessibility from './pages/BlogPosts/ColorAccessibility'
import DIYColorPalettes from './pages/BlogPosts/DIYColorPalettes'
import CulturalColors from './pages/BlogPosts/CulturalColors'
import ColorPerception from './pages/BlogPosts/ColorPerception'
import { ClipboardProvider } from './context/ClipboardContext'
import { Toaster as HotToaster } from 'react-hot-toast'
import defaultImage from './assets/default1.jpg'

interface HomePageProps {
  selectedImage: string;
  selectedColor: string | null;
  favorites: string[];
  showToast: boolean;
  colorPaletteRef: React.RefObject<ColorPaletteRef>;
  handleColorSelect: (color: string) => void;
  handleToggleFavorite: (color: string) => void;
  setSelectedImage: (image: string) => void;
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomePage = ({ 
  selectedImage, 
  selectedColor, 
  favorites, 
  showToast, 
  colorPaletteRef, 
  handleColorSelect, 
  handleToggleFavorite, 
  setSelectedImage, 
  setFavorites 
}: HomePageProps) => (
  <>
    <main className="pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Column */}
          <div className="w-full lg:w-[40%]">
            <div className="lg:pr-4 space-y-4">
              <ImageSection 
                selectedImage={selectedImage}
                onColorSelect={handleColorSelect}
              />
              <UploadSection onImageSelect={setSelectedImage} />
              <FavoritesSection 
                favorites={favorites}
                onColorSelect={handleColorSelect}
                onColorRemove={(color: string) => setFavorites(prev => prev.filter(c => c !== color))}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[60%] mt-4 lg:mt-0">
            <div className="lg:pl-4 space-y-4">
              <ColorPalette 
                image={selectedImage}
                ref={colorPaletteRef}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onColorSelect={handleColorSelect}
              />
              <ColorDetails selectedColor={selectedColor} />
              <ColorHarmony selectedColor={selectedColor} />
              <ColorVariations selectedColor={selectedColor} />
              <ContrastChecker selectedColor={selectedColor} />
              <ColorCodeSnippets selectedColor={selectedColor} />
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* Blog Carousel Section */}
    <BlogCarousel />

    {/* How to Use Section */}
    <HowToUse />

    {/* Toast notification */}
    <Toast
      message="Favorites limit reached (max 10 colors)"
      type="warning"
      isVisible={showToast}
    />
  </>
);

// Add Adsterra Ad Component
const AdsterraAd = () => {
  useEffect(() => {
    // Load the Adsterra script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26778179.profitableratecpm.com/c9e179680766f6937ee0983f8fd40dee/invoke.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="//pl26778179.profitableratecpm.com/c9e179680766f6937ee0983f8fd40dee/invoke.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 py-2">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 flex justify-center">
        <div id="container-c9e179680766f6937ee0983f8fd40dee"></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('colorFavorites')
    return saved ? JSON.parse(saved) : []
  })
  const [showToast, setShowToast] = useState(false)
  const colorPaletteRef = useRef<ColorPaletteRef>(null)

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('colorFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Handle toggling favorites
  const handleToggleFavorite = (color: string) => {
    setFavorites(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color)
      }
      if (prev.length >= 10) {
        // Show toast when favorites are full
        setShowToast(true)
        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000)
        return prev
      }
      return [...prev, color]
    })
  }

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    colorPaletteRef.current?.handleColorSelect(color)
  }

  return (
    <HelmetProvider>
      <Router>
        <HotToaster />
        <ClipboardProvider>
          <div className="min-h-screen w-full bg-white dark:bg-gray-900">
            <Navbar onColorSelect={handleColorSelect} />
            <AdsterraAd />
            
            <Routes>
              <Route path="/" element={<HomePage selectedImage={selectedImage} selectedColor={selectedColor} favorites={favorites} showToast={showToast} colorPaletteRef={colorPaletteRef} handleColorSelect={handleColorSelect} handleToggleFavorite={handleToggleFavorite} setSelectedImage={setSelectedImage} setFavorites={setFavorites} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
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
              <Route path="/blog/color-accessibility-designing-for-color-blind-users" element={<ColorAccessibility />} />
              <Route path="/blog/diy-creating-color-palettes-using-color-peek" element={<DIYColorPalettes />} />
              <Route path="/blog/cultural-significance-of-colors" element={<CulturalColors />} />
              <Route path="/blog/science-behind-color-perception" element={<ColorPerception />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <ToolsSection />
            <Footer />
          </div>
        </ClipboardProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
