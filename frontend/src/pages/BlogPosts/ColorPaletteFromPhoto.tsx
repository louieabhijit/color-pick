import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import { FaCalendar, FaClock, FaTags, FaShare, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ColorPaletteFromPhoto = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const metadata = {
    title: "How to Extract a Color Palette from Any Photo (Step-by-Step)",
    description: "Learn how to pull beautiful color palettes from photographs and real-world images. Covers multiple methods, how dominant color extraction works, and how to apply extracted colors to your design projects.",
    author: "Sofia Martínez",
    date: "April 22, 2026",
    readTime: "9 min read",
    tags: ["Color Palette", "Photo", "Color Extraction", "Design", "Tools"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
  };
  const shareUrl = window.location.href;
  const shareOnTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${metadata.title}`, '_blank');
  const shareOnFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareOnLinkedIn = () => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${metadata.title}`, '_blank');

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{metadata.title} | ColorPeek Blog</title>
        <link rel="canonical" href="https://color-peek.com/blog/color-palette-from-photo-guide" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="keywords" content="extract color palette from photo, color palette from image, dominant colors, image color extraction, color picker from photo, palette generator from image" />
      </Helmet>
      <Navbar onColorSelect={() => {}} />

      {/* Hero */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={metadata.image} alt={metadata.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {metadata.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-gray-300 text-sm"
          >
            <div className="flex items-center"><FaCalendar className="w-4 h-4 mr-2" /><span>{metadata.date}</span></div>
            <div className="flex items-center"><FaClock className="w-4 h-4 mr-2" /><span>{metadata.readTime}</span></div>
            <div className="flex items-center"><FaTags className="w-4 h-4 mr-2" /><span className="hidden md:inline">{metadata.tags.join(', ')}</span></div>
          </motion.div>
        </div>
      </motion.div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">

          {/* Summary box */}
          <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-3 mt-0">What You'll Learn</h2>
            <ul className="space-y-2 text-[var(--text-secondary)] dark:text-gray-300 mb-0">
              <li>Why photos produce more natural and harmonious palettes than generated ones</li>
              <li>The science behind k-means clustering and dominant color algorithms</li>
              <li>How to use ColorPeek's image palette extractor step-by-step</li>
              <li>How to choose the right photo for the mood you want</li>
              <li>How many colors to extract (4 vs 8 vs 16) and when each is appropriate</li>
              <li>How to map extracted colors to design roles in your project</li>
              <li>Export formats: CSS variables, Tailwind config, and JSON</li>
            </ul>
          </div>

          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              1. Why Photos Are the Best Source of Natural Color Palettes
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Human color perception evolved in a world of natural light, earth, sky, and living things. Our eyes find color relationships from the real world inherently harmonious because nature itself is a master colorist - every sunset, ocean scene, or forest landscape contains colors that coexist in perfect, context-aware balance.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Algorithmically generated color palettes, while useful, often feel slightly artificial because they follow mathematical models of harmony (complementary, triadic, analogous) that approximate but don't fully replicate the complexity of real-world color interaction. A photograph of the Atacama Desert at golden hour contains warm ochres, cool shadow purples, and dusty mid-tones that no color wheel algorithm would spontaneously combine - yet together they feel completely natural.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              This is why so many of the most beloved design systems - from Airbnb's "Bélo" to Notion's warm neutrals to Spotify's dark mode - have photographic and real-world sources at the heart of their color inspiration. Even when the final palette is highly abstracted and digitally refined, the origin story usually begins with a photograph.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-3">Why Photo-Derived Palettes Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[var(--text-secondary)] dark:text-gray-300">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Perceptual Harmony</p>
                  <p>Colors from the same photograph share real-world lighting conditions, producing naturally pleasing relationships.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Emotional Anchoring</p>
                  <p>A beach photo's palette evokes calm and openness. A forest's palette evokes depth and growth. Emotion is built in.</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Unique Identity</p>
                  <p>Photo-derived palettes are specific and distinctive - far less likely to look like "every other design tool default."</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              2. How Dominant Color Extraction Works
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Modern color extraction tools - including ColorPeek's palette extractor - use a technique called <strong>k-means clustering</strong> applied to the color space of an image. Here's what that actually means in plain terms.
            </p>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Every pixel in an image has an RGB color value - essentially a point in 3D color space where the axes are Red, Green, and Blue. A 1000×800 photograph has 800,000 such points. K-means clustering groups these points into <em>k</em> clusters by finding the <em>k</em> centroids (center points) that minimize the total distance from every point to its nearest centroid. Each centroid becomes one of your extracted colors.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">The Extraction Pipeline</h3>
              <ol className="space-y-4 text-[var(--text-secondary)] dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200">Image Downsampling</p>
                    <p className="text-sm">The image is resized to ~150×150px to reduce the number of pixels to analyze. This makes clustering fast without affecting color accuracy.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200">Color Space Conversion</p>
                    <p className="text-sm">Pixels are converted to LAB or HSL color space, which is perceptually uniform - meaning distances between colors correspond more closely to how different humans perceive them.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200">K-Means Clustering</p>
                    <p className="text-sm">The algorithm randomly initializes k centroids, assigns every pixel to its nearest centroid, recomputes centroid positions, and repeats until convergence. The result is k color clusters.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-gray-200">Centroid-to-Hex Conversion</p>
                    <p className="text-sm">Each cluster centroid is converted back to an RGB hex value and sorted by cluster size (number of pixels in each cluster = dominance ranking).</p>
                  </div>
                </li>
              </ol>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The <strong>ColorThief</strong> JavaScript library popularized this approach and is widely used in the browser. It runs entirely client-side, meaning your images never leave your device during extraction. ColorPeek uses an enhanced version of this pipeline with additional steps: near-white and near-black suppression (so you don't end up with a palette of sky blues and paper whites drowning out the interesting colors), and post-extraction contrast adjustment to ensure all palette colors meet minimum contrast thresholds.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              3. Step-by-Step: Using ColorPeek's Palette Extractor
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              ColorPeek's palette extractor is designed to be the fastest, most intuitive image-to-palette tool available. Here's the full workflow:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <ol className="space-y-5 text-[var(--text-secondary)] dark:text-gray-300">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Navigate to the Palette Extractor</p>
                    <p className="text-sm mt-1">Visit <a href="/palette-url" className="text-indigo-500 hover:text-indigo-600 underline">/palette-url</a> on ColorPeek. The tool opens with a drag-and-drop upload zone and a URL input field.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Upload or Paste Your Image</p>
                    <p className="text-sm mt-1">Drag a JPG, PNG, or WebP image onto the upload zone, or paste a public image URL directly. ColorPeek supports images up to 10MB and any common web image format.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Choose How Many Colors to Extract</p>
                    <p className="text-sm mt-1">Set the extraction count using the slider (4–16 colors). The default is 6, which works well for most brand and UI use cases. See Section 5 for guidance on choosing the right count.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Review and Adjust the Results</p>
                    <p className="text-sm mt-1">The extracted palette is displayed as swatches with hex codes. Click any swatch to open a color picker and fine-tune its value. You can drag swatches to reorder them by role.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Assign Semantic Roles (Optional)</p>
                    <p className="text-sm mt-1">Label each color with a role - primary, secondary, accent, background, surface, text - so the export reflects your design system's token structure.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">6</span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">Export in Your Preferred Format</p>
                    <p className="text-sm mt-1">Choose from CSS variables, Tailwind config, JSON tokens, or a simple hex list. See Section 7 for details on each format.</p>
                  </div>
                </li>
              </ol>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              The entire process from image upload to exported CSS variables takes under 60 seconds. Try it now at <a href="/palette-url" className="text-indigo-500 hover:text-indigo-600 underline">ColorPeek's Palette Extractor</a>.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              4. Choosing the Right Image
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Not every image makes an equally useful palette source. The best images for color extraction share a few key characteristics: <strong>distinct color zones</strong> (not heavily blurred or uniformly toned), <strong>moderate saturation</strong> (overly vivid images produce a palette that works only in highly energetic contexts), and <strong>emotional resonance</strong> with your project's intended mood.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Image Selection Guide by Mood</h3>
              <div className="space-y-5">
                {[
                  {
                    mood: 'Calm / Trust / Professional',
                    image: 'Ocean horizon at dusk, misty mountain, or Nordic forest',
                    what: 'Cool desaturated blues, slate grays, soft teals',
                    avoid: 'High-saturation tropical images or busy cityscapes',
                  },
                  {
                    mood: 'Warm / Inviting / Artisanal',
                    image: 'Golden-hour landscape, terracotta pottery, bread or coffee',
                    what: 'Warm ochres, burnt oranges, cream, brown',
                    avoid: 'Cool-toned images, industrial settings',
                  },
                  {
                    mood: 'Energetic / Bold / Youth',
                    image: 'Street art, colorful market, festival, neon cityscape',
                    what: 'Saturated primaries, high contrast, electric accents',
                    avoid: 'Muted or desaturated landscape photography',
                  },
                  {
                    mood: 'Minimal / Luxury / Editorial',
                    image: 'White marble, concrete texture, architectural photography',
                    what: 'Near-whites, cool grays, one subtle accent tone',
                    avoid: 'Busy multi-color scenes with no clear hierarchy',
                  },
                ].map((item) => (
                  <div key={item.mood} className="border-l-4 border-indigo-400 pl-4">
                    <p className="font-semibold text-[var(--text-primary)] dark:text-white">{item.mood}</p>
                    <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mt-1"><span className="font-medium">Best source:</span> {item.image}</p>
                    <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400"><span className="font-medium">Yields:</span> {item.what}</p>
                    <p className="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)]"><span className="font-medium">Avoid:</span> {item.avoid}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              The single most important factor: <strong>contrast within the image</strong>. An image with multiple distinct color regions - e.g., a landscape with a golden sky, green hills, and a blue river - will produce a rich, varied palette. A photo that's mostly one color (an extreme close-up of red fabric, for example) will produce a palette of nearly identical shades.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              5. How Many Colors to Extract: 4 vs 8 vs 16
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              The number of colors you extract dramatically affects the palette's usability. Extracting too few means you miss important nuances; extracting too many gives you a sprawling, unmanageable set. Here's a practical guide:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">4</div>
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Core Palette</p>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-3">Best for: Brand identity, minimal design systems, logo color extraction, thumbnail generation.</p>
                  <p className="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted)] italic">Yields the most dominant colors only. Ideal when you want one primary, one secondary, one accent, and one neutral.</p>
                </div>
                <div className="text-center border-x border-gray-100 dark:border-gray-700 px-4">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">8</div>
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Standard Palette</p>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-3">Best for: Most web design projects, component libraries, design system foundations.</p>
                  <p className="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted)] italic">The sweet spot for most use cases. Enough variety for a full UI without overwhelming designers.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">16</div>
                  <p className="font-semibold text-[var(--text-primary)] dark:text-white mb-2">Extended Palette</p>
                  <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-3">Best for: Illustration, data visualization, generative art, rich editorial layouts.</p>
                  <p className="text-xs text-[var(--text-muted)] dark:text-[var(--text-muted)] italic">Returns a full spectrum including subtle midtones. Requires careful curation before use in a UI context.</p>
                </div>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed">
              A practical workflow: extract 8–10 colors, then manually curate down to the 4–6 you'll actually use. The extras serve as a reference for edge cases - hover states, disabled states, subtle backgrounds - without cluttering your primary design token set.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              6. Applying Extracted Colors: Mapping to Design Roles
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              Having a beautiful extracted palette is only half the job. The other half is mapping those colors to specific roles in your design system. Here's a reliable framework for making that mapping:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg my-8">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-4">Design Role Mapping Framework</h3>
              <div className="space-y-4">
                {[
                  { role: 'Primary', criteria: 'The most visually dominant or emotionally resonant color from the palette. Use for CTAs, key buttons, links, and brand moments.', tip: 'Should have enough saturation to feel intentional and branded.' },
                  { role: 'Secondary', criteria: 'The second-most prominent color. Use for section headings, supporting UI elements, and secondary buttons.', tip: 'Should contrast with or complement the primary without competing.' },
                  { role: 'Accent', criteria: 'A high-energy or unexpected color from the palette - often the most saturated. Use sparingly for notifications, badges, highlights.', tip: 'Less than 5% of the visual area. Its power comes from rarity.' },
                  { role: 'Background', criteria: 'The lightest or most neutral color. In light mode, near-white; in dark mode, near-dark-gray.', tip: 'Often the least interesting color from the palette - that\'s intentional.' },
                  { role: 'Surface', criteria: 'A slightly deeper shade than background, for cards, panels, and containers.', tip: 'Just 5–10% darker/lighter than background to create quiet separation.' },
                  { role: 'Text', criteria: 'Near-black (light mode) or near-white (dark mode). Rarely comes from the photo itself - usually a neutral near the photo\'s shadow tones.', tip: 'Ensure 4.5:1 contrast against your background color.' },
                ].map((item) => (
                  <div key={item.role} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold">{item.role}</div>
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">{item.criteria}</p>
                      <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 italic">{item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              7. Export Formats: CSS Variables, Tailwind Config, and JSON
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-4">
              ColorPeek's <a href="/palette-exporter" className="text-indigo-500 hover:text-indigo-600 underline">Palette Exporter</a> lets you download your extracted palette in whichever format your project needs. Here's what each format looks like and when to use it:
            </p>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white mb-3 mt-6">CSS Custom Properties</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-3">
              Best for: vanilla CSS projects, any framework that accepts global CSS, dark mode implementation with class toggling.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`:root {
  --color-primary:    #7C6A54;  /* warm oak */
  --color-secondary:  #A8B5A2;  /* sage green */
  --color-accent:     #D4722A;  /* terracotta */
  --color-background: #FAF7F2;  /* cream */
  --color-surface:    #F0EBE3;  /* warm white */
  --color-text:       #2C1F14;  /* dark espresso */
}`}
            </pre>

            <h3 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white mb-3 mt-6">Tailwind CSS Config</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-3">
              Best for: Tailwind-based projects. Paste directly into your <code>tailwind.config.js</code> to get utilities like <code>bg-primary</code>, <code>text-accent</code>, etc.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary:    '#7C6A54',
        secondary:  '#A8B5A2',
        accent:     '#D4722A',
        background: '#FAF7F2',
        surface:    '#F0EBE3',
        ink:        '#2C1F14',
      }
    }
  }
}`}
            </pre>

            <h3 className="text-xl font-semibold text-[var(--text-primary)] dark:text-white mb-3 mt-6">JSON Design Tokens</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-3">
              Best for: design systems using Style Dictionary, Figma Tokens plugin, or any custom token pipeline.
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
{`{
  "color": {
    "primary":    { "value": "#7C6A54", "type": "color" },
    "secondary":  { "value": "#A8B5A2", "type": "color" },
    "accent":     { "value": "#D4722A", "type": "color" },
    "background": { "value": "#FAF7F2", "type": "color" },
    "surface":    { "value": "#F0EBE3", "type": "color" },
    "text":       { "value": "#2C1F14", "type": "color" }
  }
}`}
            </pre>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mt-4">
              Export your palette now at <a href="/palette-exporter" className="text-indigo-500 hover:text-indigo-600 underline">ColorPeek's Palette Exporter</a>.
            </p>
          </motion.section>

          {/* Section 8 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] dark:text-white mb-4">
              8. Inspiration: Real-World Extraction Examples
            </h2>
            <p className="text-[var(--text-secondary)] dark:text-gray-300 leading-relaxed mb-6">
              Let's walk through three real-world photo types and the palettes they yield - along with how to apply each one in a UI context.
            </p>
            <div className="space-y-8">

              {/* Nature photo */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-2">Nature Photo → Earthy Palette</h3>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-4">Source: a sunlit forest floor with mushrooms, moss, and golden dappled light.</p>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['#2D3B2A', '#5C7A4E', '#A0874C', '#D4B483', '#EDE0CB'].map((hex) => (
                    <div key={hex}>
                      <div style={{ backgroundColor: hex }} className="w-full h-12 rounded-lg" />
                      <p className="text-xs text-center text-[var(--text-muted)] dark:text-gray-400 mt-1 font-mono">{hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">
                  <strong>Application:</strong> Perfect for wellness, sustainability, food, or outdoor brand sites. Use the darkest green as a heading color, the warm tan as a background, and terracotta as the accent/CTA color.
                </p>
              </div>

              {/* Cityscape */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-2">Cityscape → Urban Palette</h3>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-4">Source: a nighttime city skyline with neon signs reflecting in wet pavement.</p>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['#12131A', '#1E2B4A', '#3B5998', '#7CB3E8', '#F0A500'].map((hex) => (
                    <div key={hex}>
                      <div style={{ backgroundColor: hex }} className="w-full h-12 rounded-lg" />
                      <p className="text-xs text-center text-[var(--text-muted)] dark:text-gray-400 mt-1 font-mono">{hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">
                  <strong>Application:</strong> Ideal for fintech, SaaS dashboards, developer tools. The deep navy is the perfect dark mode base, the amber creates high-contrast CTAs, and the light blue works beautifully for data visualization.
                </p>
              </div>

              {/* Food */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white mb-2">Food Photography → Warm Palette</h3>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-400 mb-4">Source: a flat-lay of spiced chai, cinnamon sticks, and cardamom pods on linen.</p>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['#3D1F0D', '#7A3B1E', '#C4713A', '#E8B97A', '#F7EDDE'].map((hex) => (
                    <div key={hex}>
                      <div style={{ backgroundColor: hex }} className="w-full h-12 rounded-lg" />
                      <p className="text-xs text-center text-[var(--text-muted)] dark:text-gray-400 mt-1 font-mono">{hex}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] dark:text-gray-300">
                  <strong>Application:</strong> Perfect for food & beverage, hospitality, recipe platforms. The creamy background evokes warmth and appetite, while the deep espresso brown as a text color feels premium and rich.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <h3 className="flex items-center text-lg font-semibold mb-4"><FaShare className="mr-2" />Share this article</h3>
            <div className="flex space-x-4">
              <button onClick={shareOnTwitter} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"><FaTwitter className="w-5 h-5" /></button>
              <button onClick={shareOnFacebook} className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"><FaFacebook className="w-5 h-5" /></button>
              <button onClick={shareOnLinkedIn} className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"><FaLinkedin className="w-5 h-5" /></button>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl p-8 border border-indigo-200/40 dark:border-indigo-500/20"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-white mb-2">Extract Your First Photo Palette Now</h3>
            <p className="text-[var(--text-secondary)] dark:text-gray-400 mb-6">
              Upload any image and get a beautiful, export-ready color palette in seconds - free, no signup required.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/palette-url" className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
                Extract Palette from Photo
              </a>
              <a href="/palette-exporter" className="inline-flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-[var(--text-primary)] dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
                Export Your Palette
              </a>
            </div>
          </motion.div>
        </div>
      </article>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPaletteFromPhoto;
