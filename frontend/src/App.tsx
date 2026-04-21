import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion } from 'framer-motion'
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
import ColorHarmonyGuide from './pages/BlogPosts/ColorHarmonyGuide'
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

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const STATS = [
  { value: '6', label: 'Color Formats' },
  { value: '10', label: 'Saved Favorites' },
  { value: 'WCAG', label: 'Contrast Checks' },
  { value: '∞', label: 'Palettes' },
];

const FEATURE_CHIPS = [
  '🎨 Palette Extraction',
  '🔬 Color Details',
  '🎵 Harmony Generator',
  '♿ Contrast Checker',
  '🔁 Color Variations',
  '💻 Code Snippets',
];

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
    {/* ── Hero Section ── */}
    <section className="pt-28 pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge pill */}
          <motion.div variants={fadeUp}>
            <span className="section-label">Color Extraction & Palette Tools</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            <span className="gradient-text">Extract Colors</span>
            <br />
            <span className="text-[var(--text-primary)]">from Any Image</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl"
          >
            Upload an image or paste a URL — instantly get dominant color palettes,
            harmony suggestions, contrast ratios, and copy-ready code snippets.
          </motion.p>

          {/* Feature chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mt-2">
            {FEATURE_CHIPS.map(chip => (
              <span
                key={chip}
                className="px-3 py-1.5 rounded-full text-sm font-medium glass-card border border-white/30
                           text-[var(--text-secondary)] hover:border-indigo-400/60 hover:text-indigo-600
                           dark:hover:text-indigo-300 transition-colors duration-200 cursor-default"
              >
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 w-full max-w-2xl"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="glass-card p-4 rounded-2xl text-center glow-ring">
                <p className="text-3xl font-bold gradient-text">{value}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 mb-2" />

    {/* ── Main Tool Section ── */}
    <main className="pb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="section-label">Color Studio</span>
          <div className="flex-1 h-px bg-gradient-to-r from-indigo-300/40 to-transparent" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col lg:flex-row w-full gap-0"
        >
          {/* Left Column */}
          <motion.div variants={fadeIn} className="w-full lg:w-[40%]">
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
          </motion.div>

          {/* Right Column */}
          <motion.div variants={fadeIn} className="w-full lg:w-[60%] mt-4 lg:mt-0">
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
          </motion.div>
        </motion.div>
      </div>
    </main>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 my-2" />

    {/* Blog Carousel Section */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <BlogCarousel />
    </motion.div>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 my-2" />

    {/* How to Use Section */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <HowToUse />
    </motion.div>

    {/* Toast notification */}
    <Toast
      message="Favorites limit reached (max 10 colors)"
      type="warning"
      isVisible={showToast}
    />
  </>
);

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
          <div className="page-bg min-h-screen w-full">
            {/* Floating ambient orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <div className="bg-orb w-[600px] h-[600px] top-[-200px] right-[-150px] opacity-60 animate-float"
                   style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)' }} />
              <div className="bg-orb w-[500px] h-[500px] bottom-[10%] left-[-200px] opacity-50 animate-float-slow"
                   style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
              <div className="bg-orb w-[400px] h-[400px] top-[40%] right-[20%] opacity-40 animate-float-delayed"
                   style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)' }} />
            </div>
            <div className="relative z-10">
            <Navbar onColorSelect={handleColorSelect} />
            
            
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
              <Route path="/blog/what-is-color-harmony-a-beginners-guide-for-designers" element={<ColorHarmonyGuide />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <ToolsSection />
            <Footer />
            </div>
          </div>
        </ClipboardProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
