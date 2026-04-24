import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

type FlexDir = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
type AlignContent = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
type AlignSelf = 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';

interface FlexItem { id: number; grow: number; shrink: number; basis: string; alignSelf: AlignSelf; order: number; }

let _id = 0;
const uid = () => ++_id;

const ITEM_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f97316','#10b981','#0ea5e9','#f59e0b','#ef4444','#14b8a6','#84cc16'];

const PRESETS = [
  { name: 'Centered', dir: 'row' as FlexDir, wrap: 'nowrap' as FlexWrap, justify: 'center' as JustifyContent, align: 'center' as AlignItems, gap: 16, items: [{ id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto' as AlignSelf, order: 0 }] },
  { name: 'Navbar', dir: 'row' as FlexDir, wrap: 'nowrap' as FlexWrap, justify: 'space-between' as JustifyContent, align: 'center' as AlignItems, gap: 16, items: [{ id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto' as AlignSelf, order: 0 }, { id: uid(), grow: 1, shrink: 1, basis: 'auto', alignSelf: 'auto' as AlignSelf, order: 0 }, { id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto' as AlignSelf, order: 0 }] },
  { name: 'Card Grid', dir: 'row' as FlexDir, wrap: 'wrap' as FlexWrap, justify: 'flex-start' as JustifyContent, align: 'stretch' as AlignItems, gap: 12, items: Array.from({length:6},()=>({ id: uid(), grow: 0, shrink: 0, basis: 'calc(33% - 8px)', alignSelf: 'auto' as AlignSelf, order: 0 })) },
  { name: 'Sidebar', dir: 'row' as FlexDir, wrap: 'nowrap' as FlexWrap, justify: 'flex-start' as JustifyContent, align: 'stretch' as AlignItems, gap: 16, items: [{ id: uid(), grow: 0, shrink: 0, basis: '250px', alignSelf: 'auto' as AlignSelf, order: 0 }, { id: uid(), grow: 1, shrink: 1, basis: 'auto', alignSelf: 'auto' as AlignSelf, order: 0 }] },
];

const ToggleGroup = ({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex flex-wrap gap-1">
    {options.map(o => (
      <button key={o} onClick={() => onChange(o)}
        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${value === o ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
        {o}
      </button>
    ))}
  </div>
);

const FlexboxGenerator = () => {
  const [dir, setDir] = useState<FlexDir>('row');
  const [wrap, setWrap] = useState<FlexWrap>('wrap');
  const [justify, setJustify] = useState<JustifyContent>('flex-start');
  const [align, setAlign] = useState<AlignItems>('stretch');
  const [alignContent, setAlignContent] = useState<AlignContent>('stretch');
  const [gap, setGap] = useState(10);
  const [items, setItems] = useState<FlexItem[]>([
    { id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
    { id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
    { id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 },
  ]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [copied, setCopied] = useState<'css'|'html'|''>('');
  const [activeTab, setActiveTab] = useState<'css'|'html'>('css');

  const addItem = () => { setItems(p => [...p, { id: uid(), grow: 0, shrink: 1, basis: 'auto', alignSelf: 'auto', order: 0 }]); };
  const removeItem = (id: number) => setItems(p => p.filter(i => i.id !== id));
  const updateItem = (id: number, patch: Partial<FlexItem>) => setItems(p => p.map(i => i.id === id ? { ...i, ...patch } : i));

  const containerCSS = `.container {\n  display: flex;\n  flex-direction: ${dir};\n  flex-wrap: ${wrap};\n  justify-content: ${justify};\n  align-items: ${align};\n${wrap !== 'nowrap' ? `  align-content: ${alignContent};\n` : ''}  gap: ${gap}px;\n}`;

  const hasCustomItems = items.some(i => i.grow !== 0 || i.shrink !== 1 || i.basis !== 'auto' || i.alignSelf !== 'auto' || i.order !== 0);
  const itemsCSS = hasCustomItems ? items.map((item, idx) => {
    const props = [];
    if (item.grow !== 0) props.push(`  flex-grow: ${item.grow};`);
    if (item.shrink !== 1) props.push(`  flex-shrink: ${item.shrink};`);
    if (item.basis !== 'auto') props.push(`  flex-basis: ${item.basis};`);
    if (item.alignSelf !== 'auto') props.push(`  align-self: ${item.alignSelf};`);
    if (item.order !== 0) props.push(`  order: ${item.order};`);
    return props.length ? `.item-${idx + 1} {\n${props.join('\n')}\n}` : '';
  }).filter(Boolean).join('\n\n') : '.item { /* default */ }';

  const fullCSS = containerCSS + '\n\n' + itemsCSS;

  const htmlCode = `<div class="container">\n${items.map((_, i) => `  <div class="item item-${i+1}">Item ${i+1}</div>`).join('\n')}\n</div>`;

  const copy = (type: 'css'|'html') => {
    navigator.clipboard.writeText(type === 'css' ? fullCSS : htmlCode);
    setCopied(type);
    setTimeout(() => setCopied(''), 1800);
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setDir(p.dir); setWrap(p.wrap); setJustify(p.justify); setAlign(p.align); setGap(p.gap);
    setItems(p.items.map(i => ({ ...i }))); setSelectedItem(null);
  };

  const selected = items.find(i => i.id === selectedItem);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Flexbox Generator — Visual Layout Builder"
        description="Build CSS Flexbox layouts visually. Set direction, alignment, wrapping, and gap. Add items, adjust flex-grow/shrink/basis. Copy clean CSS code."
        path="/flexbox"
        keywords="css flexbox generator, flexbox layout builder, flexbox visual editor, flex container generator, css flex code"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'CSS Flexbox Generator | ColorPeek', description: 'Build CSS Flexbox layouts visually.', url: 'https://color-peek.com/flexbox', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Layout Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            CSS Flexbox <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Build flexbox layouts visually and copy production-ready CSS and HTML.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => loadPreset(p)}
              className="px-3 py-1.5 glass-card text-xs font-medium rounded-xl border border-white/30 hover:border-indigo-300/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all">
              {p.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Container Controls */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4">
            <div className="glass-card p-5 rounded-2xl space-y-4">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">Container</p>

              <div><p className="text-xs text-[var(--text-muted)] mb-1.5">flex-direction</p><ToggleGroup options={['row','row-reverse','column','column-reverse']} value={dir} onChange={v => setDir(v as FlexDir)}/></div>
              <div><p className="text-xs text-[var(--text-muted)] mb-1.5">flex-wrap</p><ToggleGroup options={['nowrap','wrap','wrap-reverse']} value={wrap} onChange={v => setWrap(v as FlexWrap)}/></div>
              <div><p className="text-xs text-[var(--text-muted)] mb-1.5">justify-content</p><ToggleGroup options={['flex-start','center','flex-end','space-between','space-around','space-evenly']} value={justify} onChange={v => setJustify(v as JustifyContent)}/></div>
              <div><p className="text-xs text-[var(--text-muted)] mb-1.5">align-items</p><ToggleGroup options={['stretch','flex-start','center','flex-end','baseline']} value={align} onChange={v => setAlign(v as AlignItems)}/></div>
              {wrap !== 'nowrap' && <div><p className="text-xs text-[var(--text-muted)] mb-1.5">align-content</p><ToggleGroup options={['stretch','flex-start','center','flex-end','space-between','space-around']} value={alignContent} onChange={v => setAlignContent(v as AlignContent)}/></div>}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-muted)] w-10">gap</span>
                <input type="range" min={0} max={50} value={gap}
                  onInput={e => setGap(+(e.target as HTMLInputElement).value)}
                  onChange={e => setGap(+e.target.value)}
                  className="flex-1 accent-indigo-500"/>
                <span className="text-xs font-mono text-[var(--text-muted)] w-12">{gap}px</span>
              </div>
            </div>

            {/* Item controls */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Items ({items.length})</p>
                <div className="flex gap-2">
                  <button onClick={addItem} className="glass-button-primary px-3 py-1.5 text-xs font-semibold">+ Add</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {items.map((item, i) => (
                  <button key={item.id} onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${selectedItem === item.id ? 'border-indigo-400/50 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' : 'border-white/20 glass-button text-[var(--text-muted)]'}`}>
                    Item {i+1}
                  </button>
                ))}
              </div>
              {selected && (
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <p className="text-xs font-semibold text-[var(--text-muted)]">Item {items.findIndex(i=>i.id===selectedItem)+1} settings</p>
                  {[
                    { label: 'flex-grow', key: 'grow' as const, type: 'number', min: 0, max: 10 },
                    { label: 'flex-shrink', key: 'shrink' as const, type: 'number', min: 0, max: 10 },
                    { label: 'order', key: 'order' as const, type: 'number', min: -10, max: 10 },
                  ].map(({ label, key, min, max }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-xs text-[var(--text-muted)] w-20">{label}</span>
                      <input type="range" min={min} max={max} value={selected[key]}
                        onInput={e => updateItem(selected.id, { [key]: +(e.target as HTMLInputElement).value })}
                        onChange={e => updateItem(selected.id, { [key]: +e.target.value })}
                        className="flex-1 accent-indigo-500"/>
                      <span className="text-xs font-mono text-[var(--text-muted)] w-6">{selected[key]}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] w-20">flex-basis</span>
                    <input type="text" value={selected.basis} onChange={e => updateItem(selected.id, { basis: e.target.value })} className="glass-input flex-1 text-xs font-mono"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] w-20">align-self</span>
                    <select value={selected.alignSelf} onChange={e => updateItem(selected.id, { alignSelf: e.target.value as AlignSelf })} className="glass-input flex-1 text-xs">
                      {['auto','flex-start','center','flex-end','stretch'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <button onClick={() => removeItem(selected.id)} className="text-xs text-red-400 hover:text-red-500 transition-colors">Remove item</button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preview + Code */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-3 space-y-4">
            {/* Preview */}
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Live Preview</p>
              <div className="rounded-xl border-2 border-dashed border-indigo-300/30 bg-indigo-50/5 overflow-hidden"
                style={{ minHeight: dir.startsWith('column') ? 360 : 160 }}>
                <div style={{ display: 'flex', flexDirection: dir, flexWrap: wrap, justifyContent: justify, alignItems: align, alignContent: wrap !== 'nowrap' ? alignContent : undefined, gap: `${gap}px`, padding: '12px', minHeight: dir.startsWith('column') ? '320px' : '100%' }}>
                  {items.map((item, i) => (
                    <div key={item.id}
                      onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                      style={{ flexGrow: item.grow, flexShrink: item.shrink, flexBasis: item.basis, alignSelf: item.alignSelf !== 'auto' ? item.alignSelf : undefined, order: item.order, backgroundColor: ITEM_COLORS[i % ITEM_COLORS.length], minWidth: 40, minHeight: 48, borderRadius: 8, cursor: 'pointer', border: selectedItem === item.id ? '2px solid white' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code output */}
            <div className="glass-card p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1.5">
                  {(['css','html'] as const).map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === t ? 'bg-indigo-500 text-white' : 'glass-button text-[var(--text-muted)]'}`}>
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => copy(activeTab)}
                  className="glass-button-primary px-3 py-1.5 text-xs font-semibold">
                  {copied === activeTab ? '✓ Copied!' : 'Copy'}
                </motion.button>
              </div>
              <pre className="text-xs font-mono text-[var(--text-secondary)] overflow-x-auto max-h-48 overflow-y-auto whitespace-pre">
                {activeTab === 'css' ? fullCSS : htmlCode}
              </pre>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <RelatedTools tools={['/box-shadow', '/border-radius', '/glass-generator']} />
        </div>
      </main>
    </div>
  );
};

export default FlexboxGenerator;
