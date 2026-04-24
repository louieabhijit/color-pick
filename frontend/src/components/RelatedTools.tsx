import { Link } from 'react-router-dom';

interface Tool {
  path: string;
  name: string;
  description: string;
  icon: string;
}

const ALL_TOOLS: Record<string, Tool> = {
  '/palettes':          { path: '/palettes',           name: 'Color Palettes',            description: 'Browse & copy curated palettes',             icon: '🎨' },
  '/gradients':         { path: '/gradients',           name: 'Gradient Library',          description: 'Explore CSS gradient examples',              icon: '🌈' },
  '/gradient-generator':{ path: '/gradient-generator',  name: 'Gradient Generator',        description: 'Build custom linear & radial gradients',     icon: '✨' },
  '/tint-shade':        { path: '/tint-shade',           name: 'Tint & Shade Generator',    description: 'Generate full 50–900 color scales',          icon: '🎭' },
  '/color-blindness':   { path: '/color-blindness',      name: 'Color Blindness Simulator', description: 'Test accessibility for 7 vision types',      icon: '👁️' },
  '/color-converter':   { path: '/color-converter',      name: 'Color Converter',           description: 'Convert HEX, RGB, HSL, OKLCH & more',        icon: '🔄' },
  '/border-radius':     { path: '/border-radius',        name: 'Border Radius Builder',     description: 'Visually design CSS rounded corners',        icon: '⬜' },
  '/box-shadow':        { path: '/box-shadow',           name: 'Box Shadow Generator',      description: 'Build multi-layer CSS shadows',              icon: '🌑' },
  '/glass-generator':   { path: '/glass-generator',      name: 'Glassmorphism Generator',   description: 'Create frosted glass CSS effects',           icon: '🪟' },
  '/type-scale':        { path: '/type-scale',           name: 'Type Scale Generator',      description: 'Calculate modular typography scales',        icon: '🔤' },
  '/font-pairing':      { path: '/font-pairing',         name: 'Font Pairing Tool',         description: 'Find Google Fonts that work together',       icon: '🖋️' },
  '/palette-url':       { path: '/palette-url',          name: 'Extract Colors from Image', description: 'Pull palettes from any photo or URL',        icon: '📸' },
  '/palette-exporter':  { path: '/palette-exporter',     name: 'Palette Exporter',          description: 'Export to CSS, Tailwind, SCSS & JSON',       icon: '📦' },
  '/contrast-checker':  { path: '/contrast-checker',     name: 'Contrast Checker',          description: 'Check WCAG AA/AAA color contrast',           icon: '⚖️' },
  '/text-shadow':       { path: '/text-shadow',          name: 'Text Shadow Generator',     description: 'Build CSS text-shadow effects visually',     icon: '💬' },
  '/color-harmonies':   { path: '/color-harmonies',      name: 'Color Harmonies',           description: 'Generate complementary & triadic schemes',   icon: '🎡' },
  '/random-color':      { path: '/random-color',         name: 'Random Color Generator',    description: 'Generate random colors instantly',           icon: '🎲' },
  '/color-mixer':       { path: '/color-mixer',          name: 'Color Mixer',               description: 'Blend two colors with adjustable ratio',     icon: '🧪' },
  '/color-name':        { path: '/color-name',           name: 'Color Name Finder',         description: 'Find the name of any color',                 icon: '🏷️' },
  '/css-filter':        { path: '/css-filter',           name: 'CSS Filter Generator',      description: 'Blur, contrast, sepia & more filters',       icon: '🔮' },
  '/spacing-scale':     { path: '/spacing-scale',        name: 'Spacing Scale Generator',   description: 'Design system spacing scale tool',           icon: '📐' },
  '/flexbox':           { path: '/flexbox',              name: 'Flexbox Generator',         description: 'Build CSS flex layouts visually',            icon: '📦' },
  '/grid':              { path: '/grid',                 name: 'CSS Grid Generator',        description: 'Build CSS grid layouts visually',            icon: '🔲' },
};

interface RelatedToolsProps {
  tools: string[];
}

const RelatedTools = ({ tools }: RelatedToolsProps) => {
  const items = tools.map(t => ALL_TOOLS[t]).filter(Boolean);
  if (!items.length) return null;

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Related Tools</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map(tool => (
          <Link
            key={tool.path}
            to={tool.path}
            className="glass-card p-5 rounded-2xl flex flex-col gap-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-200 group no-underline"
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors leading-tight">
              {tool.name}
            </span>
            <span className="text-xs text-[var(--text-muted)] leading-snug">{tool.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
