import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const steps = [
  {
    title: "Upload Your Image",
    description: "Upload an image from your device, paste a URL, or use your clipboard to get started.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
      </svg>
    )
  },
  {
    title: "Extract Colors",
    description: "Our AI-powered system will analyze your image and extract a beautiful color palette.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    title: "Explore Details",
    description: "Get detailed color information, including hex codes, RGB values, and color harmonies.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  },
  {
    title: "Generate Code",
    description: "Get ready-to-use code snippets in CSS, SCSS, TailwindCSS, React, and more.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
];

const features = [
  { title: "Color Harmonies", description: "Complementary, analogous, and triadic color combinations.", icon: "🎨" },
  { title: "Contrast Checker", description: "Ensure your colors meet WCAG accessibility standards.", icon: "👁️" },
  { title: "Code Snippets", description: "Get code in CSS, SCSS, TailwindCSS, React, and more.", icon: "💻" },
  { title: "Color Variations", description: "Generate tints, shades, and tones of any selected color.", icon: "🌈" }
];

const HowToUse = () => (
  <section className="py-20">
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span className="section-label mb-4 inline-block">How it works</span>
        <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)] mt-2">
          From Image to Palette in{' '}
          <span className="gradient-text">4 Simple Steps</span>
        </h2>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
          Extract beautiful color palettes from your images and get everything you need for your next project.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={item}
            className="glass-card card-shine p-7 h-full border border-white/40 dark:border-white/10
                       hover:border-indigo-300/50 dark:hover:border-indigo-500/30 transition-colors duration-300"
          >
            {/* Step number */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-full text-white text-sm font-bold
                              bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/25 flex-shrink-0">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="text-indigo-500 dark:text-indigo-400">
                {step.icon}
              </div>
            </div>
            <h3 className="text-base font-semibold mb-2 text-[var(--text-primary)]">
              {step.title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="gradient-divider mb-14" />

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-center mb-10"
      >
        <span className="section-label">Key Features</span>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={item}
            className="glass-card card-shine glow-ring p-7 h-full border border-white/40 dark:border-white/10
                       hover:border-indigo-300/50 dark:hover:border-indigo-500/30 transition-colors duration-300"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-base font-semibold mb-2 text-[var(--text-primary)]">
              {feature.title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
          Ready to Get Started?
        </h3>
        <p className="text-[var(--text-muted)] mb-7">
          Upload your first image and discover the perfect color palette for your project.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="glass-button-primary px-8 py-3 text-base"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Try ColorPeek Now
        </motion.button>
      </motion.div>

    </div>
  </section>
);

export default HowToUse;
