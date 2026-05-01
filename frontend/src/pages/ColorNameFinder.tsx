import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

// CSS named colors + extended set
const COLOR_NAMES: { name: string; hex: string }[] = [
  { name: 'aliceblue', hex: '#f0f8ff' }, { name: 'antiquewhite', hex: '#faebd7' }, { name: 'aqua', hex: '#00ffff' },
  { name: 'aquamarine', hex: '#7fffd4' }, { name: 'azure', hex: '#f0ffff' }, { name: 'beige', hex: '#f5f5dc' },
  { name: 'bisque', hex: '#ffe4c4' }, { name: 'black', hex: '#000000' }, { name: 'blanchedalmond', hex: '#ffebcd' },
  { name: 'blue', hex: '#0000ff' }, { name: 'blueviolet', hex: '#8a2be2' }, { name: 'brown', hex: '#a52a2a' },
  { name: 'burlywood', hex: '#deb887' }, { name: 'cadetblue', hex: '#5f9ea0' }, { name: 'chartreuse', hex: '#7fff00' },
  { name: 'chocolate', hex: '#d2691e' }, { name: 'coral', hex: '#ff7f50' }, { name: 'cornflowerblue', hex: '#6495ed' },
  { name: 'cornsilk', hex: '#fff8dc' }, { name: 'crimson', hex: '#dc143c' }, { name: 'cyan', hex: '#00ffff' },
  { name: 'darkblue', hex: '#00008b' }, { name: 'darkcyan', hex: '#008b8b' }, { name: 'darkgoldenrod', hex: '#b8860b' },
  { name: 'darkgray', hex: '#a9a9a9' }, { name: 'darkgreen', hex: '#006400' }, { name: 'darkkhaki', hex: '#bdb76b' },
  { name: 'darkmagenta', hex: '#8b008b' }, { name: 'darkolivegreen', hex: '#556b2f' }, { name: 'darkorange', hex: '#ff8c00' },
  { name: 'darkorchid', hex: '#9932cc' }, { name: 'darkred', hex: '#8b0000' }, { name: 'darksalmon', hex: '#e9967a' },
  { name: 'darkseagreen', hex: '#8fbc8f' }, { name: 'darkslateblue', hex: '#483d8b' }, { name: 'darkslategray', hex: '#2f4f4f' },
  { name: 'darkturquoise', hex: '#00ced1' }, { name: 'darkviolet', hex: '#9400d3' }, { name: 'deeppink', hex: '#ff1493' },
  { name: 'deepskyblue', hex: '#00bfff' }, { name: 'dimgray', hex: '#696969' }, { name: 'dodgerblue', hex: '#1e90ff' },
  { name: 'firebrick', hex: '#b22222' }, { name: 'floralwhite', hex: '#fffaf0' }, { name: 'forestgreen', hex: '#228b22' },
  { name: 'fuchsia', hex: '#ff00ff' }, { name: 'gainsboro', hex: '#dcdcdc' }, { name: 'ghostwhite', hex: '#f8f8ff' },
  { name: 'gold', hex: '#ffd700' }, { name: 'goldenrod', hex: '#daa520' }, { name: 'gray', hex: '#808080' },
  { name: 'green', hex: '#008000' }, { name: 'greenyellow', hex: '#adff2f' }, { name: 'honeydew', hex: '#f0fff0' },
  { name: 'hotpink', hex: '#ff69b4' }, { name: 'indianred', hex: '#cd5c5c' }, { name: 'indigo', hex: '#4b0082' },
  { name: 'ivory', hex: '#fffff0' }, { name: 'khaki', hex: '#f0e68c' }, { name: 'lavender', hex: '#e6e6fa' },
  { name: 'lavenderblush', hex: '#fff0f5' }, { name: 'lawngreen', hex: '#7cfc00' }, { name: 'lemonchiffon', hex: '#fffacd' },
  { name: 'lightblue', hex: '#add8e6' }, { name: 'lightcoral', hex: '#f08080' }, { name: 'lightcyan', hex: '#e0ffff' },
  { name: 'lightgoldenrodyellow', hex: '#fafad2' }, { name: 'lightgray', hex: '#d3d3d3' }, { name: 'lightgreen', hex: '#90ee90' },
  { name: 'lightpink', hex: '#ffb6c1' }, { name: 'lightsalmon', hex: '#ffa07a' }, { name: 'lightseagreen', hex: '#20b2aa' },
  { name: 'lightskyblue', hex: '#87cefa' }, { name: 'lightslategray', hex: '#778899' }, { name: 'lightsteelblue', hex: '#b0c4de' },
  { name: 'lightyellow', hex: '#ffffe0' }, { name: 'lime', hex: '#00ff00' }, { name: 'limegreen', hex: '#32cd32' },
  { name: 'linen', hex: '#faf0e6' }, { name: 'magenta', hex: '#ff00ff' }, { name: 'maroon', hex: '#800000' },
  { name: 'mediumaquamarine', hex: '#66cdaa' }, { name: 'mediumblue', hex: '#0000cd' }, { name: 'mediumorchid', hex: '#ba55d3' },
  { name: 'mediumpurple', hex: '#9370db' }, { name: 'mediumseagreen', hex: '#3cb371' }, { name: 'mediumslateblue', hex: '#7b68ee' },
  { name: 'mediumspringgreen', hex: '#00fa9a' }, { name: 'mediumturquoise', hex: '#48d1cc' }, { name: 'mediumvioletred', hex: '#c71585' },
  { name: 'midnightblue', hex: '#191970' }, { name: 'mintcream', hex: '#f5fffa' }, { name: 'mistyrose', hex: '#ffe4e1' },
  { name: 'moccasin', hex: '#ffe4b5' }, { name: 'navajowhite', hex: '#ffdead' }, { name: 'navy', hex: '#000080' },
  { name: 'oldlace', hex: '#fdf5e6' }, { name: 'olive', hex: '#808000' }, { name: 'olivedrab', hex: '#6b8e23' },
  { name: 'orange', hex: '#ffa500' }, { name: 'orangered', hex: '#ff4500' }, { name: 'orchid', hex: '#da70d6' },
  { name: 'palegoldenrod', hex: '#eee8aa' }, { name: 'palegreen', hex: '#98fb98' }, { name: 'paleturquoise', hex: '#afeeee' },
  { name: 'palevioletred', hex: '#db7093' }, { name: 'papayawhip', hex: '#ffefd5' }, { name: 'peachpuff', hex: '#ffdab9' },
  { name: 'peru', hex: '#cd853f' }, { name: 'pink', hex: '#ffc0cb' }, { name: 'plum', hex: '#dda0dd' },
  { name: 'powderblue', hex: '#b0e0e6' }, { name: 'purple', hex: '#800080' }, { name: 'red', hex: '#ff0000' },
  { name: 'rosybrown', hex: '#bc8f8f' }, { name: 'royalblue', hex: '#4169e1' }, { name: 'saddlebrown', hex: '#8b4513' },
  { name: 'salmon', hex: '#fa8072' }, { name: 'sandybrown', hex: '#f4a460' }, { name: 'seagreen', hex: '#2e8b57' },
  { name: 'seashell', hex: '#fff5ee' }, { name: 'sienna', hex: '#a0522d' }, { name: 'silver', hex: '#c0c0c0' },
  { name: 'skyblue', hex: '#87ceeb' }, { name: 'slateblue', hex: '#6a5acd' }, { name: 'slategray', hex: '#708090' },
  { name: 'snow', hex: '#fffafa' }, { name: 'springgreen', hex: '#00ff7f' }, { name: 'steelblue', hex: '#4682b4' },
  { name: 'tan', hex: '#d2b48c' }, { name: 'teal', hex: '#008080' }, { name: 'thistle', hex: '#d8bfd8' },
  { name: 'tomato', hex: '#ff6347' }, { name: 'turquoise', hex: '#40e0d0' }, { name: 'violet', hex: '#ee82ee' },
  { name: 'wheat', hex: '#f5deb3' }, { name: 'white', hex: '#ffffff' }, { name: 'whitesmoke', hex: '#f5f5f5' },
  { name: 'yellow', hex: '#ffff00' }, { name: 'yellowgreen', hex: '#9acd32' },
  // Extended
  { name: 'amber', hex: '#ffbf00' }, { name: 'amethyst', hex: '#9b59b6' }, { name: 'apricot', hex: '#fbceb1' },
  { name: 'aureolin', hex: '#fdee00' }, { name: 'avocado', hex: '#568203' }, { name: 'baby blue', hex: '#89cff0' },
  { name: 'battleship grey', hex: '#848482' }, { name: 'bittersweet', hex: '#fe6f5e' }, { name: 'boysenberry', hex: '#873260' },
  { name: 'brick red', hex: '#cb4154' }, { name: 'bronze', hex: '#cd7f32' }, { name: 'buff', hex: '#f0dc82' },
  { name: 'burgundy', hex: '#800020' }, { name: 'byzantium', hex: '#702963' }, { name: 'caramel', hex: '#c68642' },
  { name: 'cardinal', hex: '#c41e3a' }, { name: 'carmine', hex: '#960018' }, { name: 'carnation', hex: '#f95a61' },
  { name: 'cerulean', hex: '#007ba7' }, { name: 'champagne', hex: '#f7e7ce' }, { name: 'charcoal', hex: '#36454f' },
  { name: 'cherry', hex: '#de3163' }, { name: 'chestnut', hex: '#954535' }, { name: 'cobalt', hex: '#0047ab' },
  { name: 'copper', hex: '#b87333' }, { name: 'cream', hex: '#fffdd0' }, { name: 'denim', hex: '#1560bd' },
  { name: 'desert sand', hex: '#edc9af' }, { name: 'emerald', hex: '#50c878' }, { name: 'flamingo', hex: '#fc8eac' },
  { name: 'forest green', hex: '#014421' }, { name: 'fuchsia rose', hex: '#c74375' }, { name: 'gold (metallic)', hex: '#d4af37' },
  { name: 'hunter green', hex: '#355e3b' }, { name: 'ice blue', hex: '#99c5c4' }, { name: 'jade', hex: '#00a86b' },
  { name: 'lapis lazuli', hex: '#26619c' }, { name: 'lavender blue', hex: '#ccccff' }, { name: 'lemon', hex: '#fff44f' },
  { name: 'lilac', hex: '#c8a2c8' }, { name: 'marigold', hex: '#eaa221' }, { name: 'mauve', hex: '#e0b0ff' },
  { name: 'midnight blue', hex: '#003366' }, { name: 'mint', hex: '#3eb489' }, { name: 'mustard', hex: '#ffdb58' },
  { name: 'nude', hex: '#e3bc9a' }, { name: 'ocean blue', hex: '#4f42b5' }, { name: 'olive green', hex: '#bab86c' },
  { name: 'onyx', hex: '#353839' }, { name: 'oyster', hex: '#d6cfc7' }, { name: 'peach', hex: '#ffcba4' },
  { name: 'pear', hex: '#d1e231' }, { name: 'periwinkle', hex: '#ccccff' }, { name: 'pine green', hex: '#01796f' },
  { name: 'pistachio', hex: '#93c572' }, { name: 'powder pink', hex: '#ffb6c1' }, { name: 'prussian blue', hex: '#003153' },
  { name: 'raspberry', hex: '#e30b5d' }, { name: 'russet', hex: '#80461b' }, { name: 'rust', hex: '#b7410e' },
  { name: 'sage', hex: '#b2ac88' }, { name: 'sapphire', hex: '#0f52ba' }, { name: 'scarlet', hex: '#ff2400' },
  { name: 'seafoam', hex: '#9fe2bf' }, { name: 'slate blue', hex: '#6a5acd' }, { name: 'smoky topaz', hex: '#933d41' },
  { name: 'tangerine', hex: '#f28500' }, { name: 'taupe', hex: '#483c32' }, { name: 'terracotta', hex: '#e2725b' },
  { name: 'turquoise blue', hex: '#00ffef' }, { name: 'umber', hex: '#635147' }, { name: 'vermilion', hex: '#e34234' },
  { name: 'walnut', hex: '#773f1a' }, { name: 'wine', hex: '#722f37' }, { name: 'wisteria', hex: '#c9a0dc' },
];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}

function colorDistance(hex1: string, hex2: string): number {
  const [r1,g1,b1] = hexToRgb(hex1);
  const [r2,g2,b2] = hexToRgb(hex2);
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
}

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

function toHSL(hex: string): string {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0;
  const l = (max+min)/2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    if (max === r) h = ((g-b)/d + (g < b ? 6 : 0))/6;
    else if (max === g) h = ((b-r)/d + 2)/6;
    else h = ((r-g)/d + 4)/6;
  }
  return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
}

const ColorNameFinder = () => {
  const [hex, setHex] = useState('#6366f1');
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState('');

  const sorted = useMemo(() => {
    const input = hex.length === 7 ? hex : '#' + hex.replace('#', '').padStart(6, '0');
    return [...COLOR_NAMES]
      .map(c => ({ ...c, dist: colorDistance(input, c.hex) }))
      .sort((a, b) => a.dist - b.dist);
  }, [hex]);

  const exact = sorted[0]?.dist === 0 ? sorted[0] : null;
  const closest = exact ? sorted[1] ?? sorted[0] : sorted[0];
  const top5 = sorted.slice(exact ? 1 : 0, exact ? 6 : 5);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return COLOR_NAMES.filter(c => c.name.includes(q)).slice(0, 20);
  }, [search]);

  const similarity = (dist: number) => Math.max(0, Math.round(100 - (dist / 441) * 100));

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 1800);
  };

  const [r, g, b] = hexToRgb(hex.length === 7 ? hex : '#6366f1');

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="Color Name Finder - Find the Name of Any Color"
        description="Enter a HEX, RGB, or HSL color and find its closest named color. Search over 200 color names including all CSS named colors and common design color names."
        path="/color-name"
        keywords="color name finder, what is this color called, css color names, find color name by hex, nearest named color"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Color Name Finder | ColorPeek', description: 'Find the name of any color by HEX value.', url: 'https://color-peek.com/color-name', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">Color Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            Color Name <span className="gradient-text">Finder</span>
          </h1>
          <p className="text-[var(--text-muted)]">Enter any color and find its name from 200+ CSS and common color names.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Enter Color</p>
              <div className="flex items-center gap-3 mb-3">
                <input type="color" value={hex.length === 7 ? hex : '#6366f1'} onChange={e => setHex(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-white/20 cursor-pointer bg-transparent p-0.5 flex-shrink-0"/>
                <input type="text" value={hex} onChange={e => setHex(e.target.value)}
                  className="glass-input flex-1 font-mono uppercase text-sm" placeholder="#6366f1"/>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setHex(randomHex())} className="glass-button px-3 py-2 text-xs font-semibold">
                  Random
                </motion.button>
              </div>
              <p className="text-xs text-[var(--text-muted)]">rgb({r}, {g}, {b}) · {toHSL(hex.length === 7 ? hex : '#6366f1')}</p>
            </div>

            {/* Closest match */}
            {closest && (
              <div className="glass-card p-5 rounded-2xl">
                <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">
                  {exact ? 'Exact Match' : 'Closest Named Color'}
                </p>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl border border-white/20 flex-shrink-0" style={{ backgroundColor: hex }}/>
                  <div className="flex-1">
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">Your color</p>
                    <p className="font-mono text-sm text-[var(--text-primary)] mb-1">{hex.toUpperCase()}</p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 mt-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  <div className="flex-1">
                    <div className="w-20 h-20 rounded-2xl border border-white/20 mb-2" style={{ backgroundColor: closest.hex }}/>
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">{similarity(closest.dist)}% match</p>
                    <p className="font-bold text-[var(--text-primary)] capitalize">{closest.name}</p>
                    <p className="font-mono text-xs text-[var(--text-muted)]">{closest.hex.toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(closest.name, 'name')} className="glass-button px-3 py-1.5 text-xs font-semibold flex-1">
                    {copied === 'name' ? '✓' : 'Copy Name'}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(closest.hex, 'hex-match')} className="glass-button px-3 py-1.5 text-xs font-semibold flex-1">
                    {copied === 'hex-match' ? '✓' : 'Copy HEX'}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Similar + Search */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">5 Closest Colors</p>
              <div className="space-y-2">
                {top5.map((c, i) => (
                  <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => copy(c.hex, `top-${i}`)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left">
                    <div className="w-8 h-8 rounded-lg border border-white/20 flex-shrink-0" style={{ backgroundColor: c.hex }}/>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{c.name}</p>
                      <p className="text-xs font-mono text-[var(--text-muted)]">{c.hex.toUpperCase()}</p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{similarity(c.dist)}%</span>
                    <span className="text-xs text-indigo-500">{copied === `top-${i}` ? '✓' : 'Copy'}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search by name */}
            <div className="glass-card p-5 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Search by Name</p>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder='e.g. "ocean", "rose", "midnight"'
                className="glass-input w-full text-sm mb-3"/>
              {searchResults.length > 0 && (
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {searchResults.map((c, i) => (
                    <button key={i} onClick={() => { setHex(c.hex); copy(c.hex, `sr-${i}`); }}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left">
                      <div className="w-6 h-6 rounded border border-white/20 flex-shrink-0" style={{ backgroundColor: c.hex }}/>
                      <span className="text-sm text-[var(--text-primary)] capitalize flex-1">{c.name}</span>
                      <span className="text-xs font-mono text-[var(--text-muted)]">{c.hex.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
              {search && searchResults.length === 0 && (
                <p className="text-sm text-[var(--text-muted)]">No colors found for "{search}"</p>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-8">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">How to Use the Color Name Finder</h2>
            <ol className="space-y-3">
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">1.</span>Enter any HEX color using the color picker or by typing the code directly in the input field.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">2.</span>The tool instantly finds the closest named color from a database of 200+ CSS and extended color names.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">3.</span>Browse the 5 closest matches with their similarity percentage — click any to copy its HEX code.</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">4.</span>Use the "Search by name" box to find colors by description — try "ocean", "rose", "midnight", or "sage".</li>
              <li className="flex gap-3 text-[var(--text-secondary)]"><span className="font-bold text-indigo-500 shrink-0">5.</span>Click "Random" to explore a random color and discover its closest named equivalent.</li>
            </ol>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What are CSS Named Colors?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">CSS defines 148 named colors — from classics like <code className="text-indigo-400">red</code>, <code className="text-indigo-400">blue</code>, and <code className="text-indigo-400">white</code>, to quirky names like <code className="text-indigo-400">rebeccapurple</code>, <code className="text-indigo-400">cornflowerblue</code>, and <code className="text-indigo-400">papayawhip</code>. These names are defined in the CSS Color Level 4 specification and are valid anywhere a color value is accepted.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">Beyond the official CSS names, designers and paint manufacturers have developed thousands of descriptive color names over centuries. Extended color databases include names like "cerulean", "vermilion", "chartreuse", and "ecru" — descriptive names that communicate color character more evocatively than a HEX code ever could. These names are especially useful in design documentation, client communication, and brand guidelines.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">The closest-name algorithm here uses Euclidean distance in RGB space — measuring the geometric distance between the input color and every named color in the database, then returning the nearest matches. The similarity percentage indicates how close the match is, with 100% meaning an exact match.</p>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Can I use CSS named colors in production?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Yes. All 148 CSS named colors are fully supported in every modern browser and are valid in any CSS property that accepts a color value. They are slightly less efficient than HEX values for tooling but perfectly valid for production use.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">What is rebeccapurple?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]"><code className="text-indigo-400">rebeccapurple</code> (#663399) was added to the CSS Color Level 4 specification in honor of Rebecca Meyer, daughter of CSS pioneer Eric Meyer, who passed away in 2014. It is the only CSS named color named after a person.</p>
              </details>
              <details className="border border-white/20 rounded-xl overflow-hidden">
                <summary className="cursor-pointer px-5 py-4 font-semibold text-[var(--text-primary)] hover:bg-white/5 transition-colors select-none">Why is my color's nearest match only 85% similar?</summary>
                <p className="px-5 pb-4 text-[var(--text-secondary)]">Most colors in the spectrum do not have an exact named equivalent — the 200+ color names cover only a fraction of the ~16 million possible RGB colors. A similarity below 100% simply means the nearest named color is close but not identical. The HEX value remains the exact representation of your color.</p>
              </details>
            </div>
          </div>

          <RelatedTools tools={['/color-converter', '/palettes', '/color-harmonies']} />
        </div>
      </main>
    </div>
  );
};

export default ColorNameFinder;
