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
import CSSBoxShadowExamples from './pages/BlogPosts/CSSBoxShadowExamples'
import GlassmorphismTutorial from './pages/BlogPosts/GlassmorphismTutorial'
import GoogleFontPairings from './pages/BlogPosts/GoogleFontPairings'
import CSSGradientIdeas from './pages/BlogPosts/CSSGradientIdeas'
import TailwindColorPaletteGuide from './pages/BlogPosts/TailwindColorPaletteGuide'
import HexToRGBGuide from './pages/BlogPosts/HexToRGBGuide'
import CSSBorderRadiusExamples from './pages/BlogPosts/CSSBorderRadiusExamples'
import WebTypographyGuide from './pages/BlogPosts/WebTypographyGuide'
import DarkModeColorPalette from './pages/BlogPosts/DarkModeColorPalette'
import ColorPaletteFromPhoto from './pages/BlogPosts/ColorPaletteFromPhoto'
import UIColorTrends2025 from './pages/BlogPosts/UIColorTrends2025'
import ColorContrastGuide from './pages/BlogPosts/ColorContrastGuide'
import PastelColorPalettes from './pages/BlogPosts/PastelColorPalettes'
import DesignTokenColorSystem from './pages/BlogPosts/DesignTokenColorSystem'
import GradientGenerator from './pages/GradientGenerator'
import TintShadeGenerator from './pages/TintShadeGenerator'
import ColorBlindnessSimulator from './pages/ColorBlindnessSimulator'
import ColorConverter from './pages/ColorConverter'
import BorderRadiusBuilder from './pages/BorderRadiusBuilder'
import BoxShadowGenerator from './pages/BoxShadowGenerator'
import GlassEffectGenerator from './pages/GlassEffectGenerator'
import TypeScaleGenerator from './pages/TypeScaleGenerator'
import FontPairing from './pages/FontPairing'
import PaletteFromURL from './pages/PaletteFromURL'
import PaletteExporter from './pages/PaletteExporter'
import Tools from './pages/Tools'
import ToolsSidebar from './components/ToolsSidebar'
import { ClipboardProvider } from './context/ClipboardContext'
import { Toaster as HotToaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
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

const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const FEATURES = [
  { label: 'Palette Extraction',  path: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343' },
  { label: 'Harmony Generator',   path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { label: 'Contrast Checker',    path: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { label: 'Color Variations',    path: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { label: 'Code Snippets',       path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
  { label: '6 Color Formats',     path: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
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
    {/* ── 3-column layout: left upload | center analysis | right sidebar ── */}
    <main className="pt-16 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row w-full gap-4 items-start">

          {/* Left Column — image & upload (35%) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="w-full lg:w-[35%]"
          >
            <div className="space-y-4">
              <ImageSection selectedImage={selectedImage} onColorSelect={handleColorSelect} />
              <UploadSection onImageSelect={setSelectedImage} />
              <FavoritesSection
                favorites={favorites}
                onColorSelect={handleColorSelect}
                onColorRemove={(color: string) => setFavorites(prev => prev.filter(c => c !== color))}
              />
            </div>
          </motion.div>

          {/* Center Column — analysis panels (43%) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[43%]"
          >
            <div className="space-y-4">
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

          {/* Right Sidebar — tools (22%) — sticky */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:block w-full lg:w-[22%] lg:sticky lg:top-20"
          >
            <ToolsSidebar />
          </motion.div>

        </div>
      </div>
    </main>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 my-4" />

    {/* ── SEO H1 + Intro ── */}
    <section className="py-10 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
          Free Online Color &amp; CSS Design Tools
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          ColorPeek is a free suite of design tools for designers and developers. Generate color palettes,
          build CSS gradients and shadows, test for color blindness accessibility, calculate type scales,
          and export everything in production-ready code — no sign-up required.
        </p>
      </div>
    </section>

    {/* ── Tools Directory ── */}
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {[
          {
            category: 'Color Tools',
            tools: [
              { path: '/palettes',        name: 'Color Palettes',            desc: 'Browse & copy curated color palettes',       icon: '🎨' },
              { path: '/tint-shade',       name: 'Tint & Shade Generator',    desc: 'Generate full 50–900 color scales',          icon: '🎭' },
              { path: '/color-blindness',  name: 'Color Blindness Simulator', desc: 'Test accessibility for 7 vision types',      icon: '👁️' },
              { path: '/color-converter',  name: 'Color Converter',           desc: 'Convert HEX, RGB, HSL, OKLCH & more',        icon: '🔄' },
              { path: '/palette-url',      name: 'Extract Colors from Image', desc: 'Pull palettes from any photo or URL',        icon: '📸' },
              { path: '/palette-exporter', name: 'Palette Exporter',          desc: 'Export to CSS, Tailwind, SCSS & JSON',       icon: '📦' },
            ],
          },
          {
            category: 'CSS Generators',
            tools: [
              { path: '/gradient-generator', name: 'Gradient Generator',      desc: 'Build custom linear & radial gradients',     icon: '✨' },
              { path: '/box-shadow',          name: 'Box Shadow Generator',    desc: 'Build multi-layer CSS shadows',              icon: '🌑' },
              { path: '/border-radius',       name: 'Border Radius Builder',   desc: 'Visually design CSS rounded corners',        icon: '⬜' },
              { path: '/glass-generator',     name: 'Glassmorphism Generator', desc: 'Create frosted glass CSS effects',           icon: '🪟' },
            ],
          },
          {
            category: 'Typography',
            tools: [
              { path: '/type-scale',   name: 'Type Scale Calculator', desc: 'Calculate modular typography scales', icon: '🔤' },
              { path: '/font-pairing', name: 'Font Pairing Tool',      desc: 'Find Google Fonts that work together', icon: '🖋️' },
            ],
          },
          {
            category: 'Explore',
            tools: [
              { path: '/gradients', name: 'Gradient Library', desc: 'Browse hundreds of CSS gradient examples', icon: '🌈' },
            ],
          },
        ].map(({ category, tools }) => (
          <div key={category} className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3 px-1">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {tools.map(tool => (
                <a key={tool.path} href={tool.path}
                  className="glass-card p-4 rounded-2xl flex flex-col gap-1.5 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 no-underline group">
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors leading-tight">{tool.name}</span>
                  <span className="text-xs text-[var(--text-muted)] leading-snug">{tool.desc}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 my-2" />

    {/* ── Compact Hero / About band ── */}
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Left: headline */}
          <div className="lg:w-1/2">
            <span className="section-label mb-4 inline-block">What is ColorPeek?</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4 text-[var(--text-primary)] leading-snug">
              Extract <span className="gradient-text">any color</span> from<br/>any image — instantly
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Upload an image or paste a URL and ColorPeek extracts the dominant palette,
              generates harmonies, checks WCAG contrast, and produces copy-ready code snippets —
              all running locally in your browser, no sign-up required.
            </p>
          </div>

          {/* Right: feature list */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-3">
            {FEATURES.map(({ label, path }) => (
              <motion.div
                key={label}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center gap-2.5 glass-card px-3 py-2.5 rounded-xl border border-white/30 dark:border-white/8"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/15 to-violet-500/15
                                flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path}/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── gradient divider ── */}
    <div className="gradient-divider mx-4 sm:mx-8 my-2" />

    {/* Blog Carousel */}
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

    {/* How to Use */}
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <HowToUse />
    </motion.div>

    {/* Toast */}
    <Toast message="Favorites limit reached (max 10 colors)" type="warning" isVisible={showToast} />
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
        <ScrollToTop />
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
              <Route path="/blog/css-box-shadow-examples" element={<CSSBoxShadowExamples />} />
              <Route path="/blog/glassmorphism-ui-design-tutorial" element={<GlassmorphismTutorial />} />
              <Route path="/blog/best-google-font-pairings-2025" element={<GoogleFontPairings />} />
              <Route path="/blog/css-gradient-background-ideas" element={<CSSGradientIdeas />} />
              <Route path="/blog/tailwind-css-color-palette-guide" element={<TailwindColorPaletteGuide />} />
              <Route path="/blog/hex-to-rgb-color-conversion-guide" element={<HexToRGBGuide />} />
              <Route path="/blog/css-border-radius-examples" element={<CSSBorderRadiusExamples />} />
              <Route path="/blog/web-typography-type-scale-guide" element={<WebTypographyGuide />} />
              <Route path="/blog/dark-mode-color-palette-design" element={<DarkModeColorPalette />} />
              <Route path="/blog/color-palette-from-photo-guide" element={<ColorPaletteFromPhoto />} />
              <Route path="/blog/ui-color-trends-2025" element={<UIColorTrends2025 />} />
              <Route path="/blog/color-contrast-accessibility-guide" element={<ColorContrastGuide />} />
              <Route path="/blog/pastel-color-palettes-web-design" element={<PastelColorPalettes />} />
              <Route path="/blog/design-token-color-system" element={<DesignTokenColorSystem />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/gradient-generator" element={<GradientGenerator />} />
              <Route path="/tint-shade" element={<TintShadeGenerator />} />
              <Route path="/color-blindness" element={<ColorBlindnessSimulator />} />
              <Route path="/color-converter" element={<ColorConverter />} />
              <Route path="/border-radius" element={<BorderRadiusBuilder />} />
              <Route path="/box-shadow" element={<BoxShadowGenerator />} />
              <Route path="/glass-generator" element={<GlassEffectGenerator />} />
              <Route path="/type-scale" element={<TypeScaleGenerator />} />
              <Route path="/font-pairing" element={<FontPairing />} />
              <Route path="/palette-url" element={<PaletteFromURL />} />
              <Route path="/palette-exporter" element={<PaletteExporter />} />
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
