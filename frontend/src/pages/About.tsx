import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import Footer from '../components/Footer';

const About = () => (
  <div className="min-h-screen w-full">
    <PageSEO
      title="About ColorPeek - Free Design Tools for Designers & Developers"
      description="ColorPeek is a free collection of color, CSS, and typography tools built for web designers and developers by Abhijit Chapke. No sign-up, no paywalls, everything runs in your browser."
      path="/about"
      keywords="about colorpeek, free design tools, color tools for developers, css generators, who made colorpeek"
    />
    <Navbar onColorSelect={() => {}} />

    <main className="pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="section-label mb-3 inline-block">About</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 text-[var(--text-primary)]">
            About <span className="gradient-text">ColorPeek</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
            A free, open collection of color and CSS design tools built for web designers and developers.
          </p>
        </div>

        {/* What is ColorPeek */}
        <section className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What is ColorPeek?</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            ColorPeek is a free browser-based toolkit for designers and developers who work with color and CSS.
            It brings together 23+ tools in one place - from color palette generators and CSS shadow builders
            to contrast checkers, type scale calculators, and font pairing previews.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Every tool runs entirely in your browser. There are no accounts, no sign-ups, no paywalls, and no data
            collected from what you create. Your palettes, gradients, and CSS code stay on your machine.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The site is free to use for personal and commercial projects. No attribution required.
          </p>
        </section>

        {/* Why I Built This */}
        <section className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Why I Built This</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Hi - I'm Abhijit Chapke, a developer based in India. I built ColorPeek because I kept
            switching between a dozen different websites whenever I needed a color converter, a shadow
            generator, or a quick type scale. Each site had one tool, required sign-up for exports,
            or was cluttered with ads. It was frustrating.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            I started building the tools I actually needed - a gradient generator that copies clean CSS,
            a tint/shade generator that outputs Tailwind-compatible scales, a font pairing tool that
            loads Google Fonts live. One by one, ColorPeek grew into a full toolkit.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The philosophy is simple: design tools should load instantly, work without accounts, and
            never get in the way. If a tool doesn't solve a real problem faster than opening a code editor,
            it doesn't belong here.
          </p>
        </section>

        {/* Tools available */}
        <section className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What You Can Do</h2>

          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">Color Tools</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Generate color palettes, create tint and shade scales (like Tailwind's 50-950), convert colors
                between HEX, RGB, HSL, HSV, CMYK, and OKLCH, extract palettes from any image or URL, simulate
                how colors appear to people with color blindness (7 vision types), mix and blend two colors,
                generate harmonies (complementary, triadic, analogous), find color names, and export palettes
                as CSS variables, SCSS, Tailwind config, JSON, or SVG.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">CSS Generators</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Build CSS gradients (linear, radial, conic) with a live visual editor. Generate multi-layer
                box shadows, create glassmorphism panels with backdrop-filter controls, design border-radius
                shapes, generate CSS text shadows with presets like Neon and Embossed, apply CSS filters
                (blur, contrast, sepia) with before/after preview, and build flexbox and CSS grid layouts
                visually with copy-ready CSS and HTML.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">Typography</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Calculate modular type scales with 8 musical ratios (Minor Third through Golden Ratio),
                preview Google Font pairings with live text samples, and generate design system spacing
                scales in px, rem, or em - with export to CSS, SCSS, Tailwind, or JSON.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">Accessibility</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                Check WCAG 2.1 color contrast ratios with AA and AAA pass/fail badges, live text preview,
                and automatic suggestion of a passing alternative color.
              </p>
            </div>
          </div>
        </section>

        {/* Stack / tech */}
        <section className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">How It's Built</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            ColorPeek is built with React, TypeScript, Vite, and Tailwind CSS. It's hosted on Netlify
            with static prerendering so every page loads with real HTML and metadata - no JavaScript
            required to see the content.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            All color math (OKLCH conversions, WCAG contrast formulas, tint/shade generation) is
            implemented directly in the browser - no external color API, no server calls. The only
            external requests are Google Fonts for font previews and Google Analytics for anonymous
            traffic stats.
          </p>
        </section>

        {/* Get in touch */}
        <section className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Get in Touch</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            Bug reports, feature requests, and feedback are all welcome. If a tool is behaving
            unexpectedly, or if you have an idea for something that would be genuinely useful,
            I'd like to hear about it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 glass-button-primary px-5 py-2.5 text-sm font-semibold rounded-xl"
          >
            Send a message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>

      </div>
    </main>

    <Footer />
  </div>
);

export default About;
