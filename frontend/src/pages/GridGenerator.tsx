import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageSEO from '../components/PageSEO';
import RelatedTools from '../components/RelatedTools';

const ITEM_COLORS = ['#6366f1','#8b5cf6','#ec4899','#f97316','#10b981','#0ea5e9','#f59e0b','#ef4444','#14b8a6','#84cc16','#a855f7','#06b6d4'];

interface GridItem { id: number; colStart: number; colEnd: number; rowStart: number; rowEnd: number; label: string; }
let _id = 0; const uid = () => ++_id;

const PRESETS = [
  { name: 'Blog', cols: '1fr 3fr', rows: 'auto auto', gap: 16, items: [
    { id: uid(), colStart:1, colEnd:3, rowStart:1, rowEnd:2, label:'Header' },
    { id: uid(), colStart:1, colEnd:2, rowStart:2, rowEnd:3, label:'Sidebar' },
    { id: uid(), colStart:2, colEnd:3, rowStart:2, rowEnd:3, label:'Content' },
  ]},
  { name: '3-Col', cols: '1fr 1fr 1fr', rows: 'auto', gap: 16, items: [
    { id: uid(), colStart:1, colEnd:2, rowStart:1, rowEnd:2, label:'1' },
    { id: uid(), colStart:2, colEnd:3, rowStart:1, rowEnd:2, label:'2' },
    { id: uid(), colStart:3, colEnd:4, rowStart:1, rowEnd:2, label:'3' },
  ]},
  { name: 'Dashboard', cols: '1fr 1fr 1fr', rows: 'auto auto', gap: 12, items: [
    { id: uid(), colStart:1, colEnd:3, rowStart:1, rowEnd:2, label:'Main Card' },
    { id: uid(), colStart:3, colEnd:4, rowStart:1, rowEnd:3, label:'Sidebar' },
    { id: uid(), colStart:1, colEnd:2, rowStart:2, rowEnd:3, label:'Stat 1' },
    { id: uid(), colStart:2, colEnd:3, rowStart:2, rowEnd:3, label:'Stat 2' },
  ]},
  { name: 'Gallery', cols: 'repeat(3, 1fr)', rows: 'repeat(2, 160px)', gap: 8, items: Array.from({length:6},(_,i)=>({ id: uid(), colStart:((i%3)+1), colEnd:((i%3)+2), rowStart:(Math.floor(i/3)+1), rowEnd:(Math.floor(i/3)+2), label:`Photo ${i+1}` })) },
];

const parseTracks = (template: string): string[] => {
  if (!template.trim()) return ['1fr'];
  return template.trim().split(/\s+/).filter(Boolean);
};

const GridGenerator = () => {
  const [cols, setCols] = useState('1fr 1fr 1fr');
  const [rows, setRows] = useState('auto auto');
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItems, setAlignItems] = useState('stretch');
  const [items, setItems] = useState<GridItem[]>([
    { id: uid(), colStart:1, colEnd:2, rowStart:1, rowEnd:2, label:'Item 1' },
    { id: uid(), colStart:2, colEnd:3, rowStart:1, rowEnd:2, label:'Item 2' },
    { id: uid(), colStart:3, colEnd:4, rowStart:1, rowEnd:2, label:'Item 3' },
    { id: uid(), colStart:1, colEnd:3, rowStart:2, rowEnd:3, label:'Item 4' },
    { id: uid(), colStart:3, colEnd:4, rowStart:2, rowEnd:3, label:'Item 5' },
  ]);
  const [selectedId, setSelectedId] = useState<number|null>(null);
  const [activeTab, setActiveTab] = useState<'css'|'html'>('css');
  const [copied, setCopied] = useState<'css'|'html'|''>('');

  const colTracks = parseTracks(cols);
  const rowTracks = parseTracks(rows);
  const numCols = colTracks.length;
  const numRows = rowTracks.length;

  const addItem = () => {
    const id = uid();
    setItems(p => [...p, { id, colStart:1, colEnd:2, rowStart:1, rowEnd:2, label:`Item ${p.length+1}` }]);
    setSelectedId(id);
  };

  const updateItem = (id: number, patch: Partial<GridItem>) => setItems(p => p.map(i => i.id === id ? { ...i, ...patch } : i));
  const removeItem = (id: number) => { setItems(p => p.filter(i => i.id !== id)); setSelectedId(null); };

  const containerCSS = `.grid-container {\n  display: grid;\n  grid-template-columns: ${cols};\n  grid-template-rows: ${rows};\n  column-gap: ${colGap}px;\n  row-gap: ${rowGap}px;\n  justify-items: ${justifyItems};\n  align-items: ${alignItems};\n}`;

  const itemsCSS = items.map((item, idx) =>
    `.item-${idx+1} {\n  grid-column: ${item.colStart} / ${item.colEnd};\n  grid-row: ${item.rowStart} / ${item.rowEnd};\n}`
  ).join('\n\n');

  const fullCSS = containerCSS + '\n\n' + itemsCSS;
  const htmlCode = `<div class="grid-container">\n${items.map((item, i) => `  <div class="item item-${i+1}">${item.label}</div>`).join('\n')}\n</div>`;

  const copy = (type: 'css'|'html') => {
    navigator.clipboard.writeText(type === 'css' ? fullCSS : htmlCode);
    setCopied(type);
    setTimeout(() => setCopied(''), 1800);
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setCols(p.cols); setRows(p.rows); setColGap(p.gap); setRowGap(p.gap);
    setItems(p.items.map(i => ({ ...i }))); setSelectedId(null);
  };

  const selected = items.find(i => i.id === selectedId);

  const gridStyle = useMemo(() => ({
    display: 'grid' as const,
    gridTemplateColumns: cols,
    gridTemplateRows: rows,
    columnGap: `${colGap}px`,
    rowGap: `${rowGap}px`,
    justifyItems: justifyItems as any,
    alignItems: alignItems as any,
    padding: 12,
    minHeight: 200,
  }), [cols, rows, colGap, rowGap, justifyItems, alignItems]);

  return (
    <div className="min-h-screen w-full">
      <PageSEO
        title="CSS Grid Generator — Visual Grid Layout Builder"
        description="Build CSS Grid layouts visually. Define rows, columns, gaps, and place items. Copy production-ready CSS and HTML code."
        path="/grid"
        keywords="css grid generator, css grid layout builder, grid template columns, grid visual editor, css grid code generator"
        schema={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'CSS Grid Generator | ColorPeek', description: 'Build CSS Grid layouts visually.', url: 'https://color-peek.com/grid', applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }}
      />
      <Navbar onColorSelect={() => {}} />
      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <span className="section-label mb-3 inline-block">CSS Layout Tool</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-3 text-[var(--text-primary)]">
            CSS Grid <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-[var(--text-muted)]">Define grid tracks, place items, and copy production-ready CSS Grid code.</p>
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
          {/* Controls */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4">
            <div className="glass-card p-5 rounded-2xl space-y-4">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">Grid Container</p>

              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1">grid-template-columns</label>
                <input type="text" value={cols} onChange={e => setCols(e.target.value)} className="glass-input w-full text-sm font-mono" placeholder="1fr 2fr 1fr"/>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {['1fr 1fr','1fr 1fr 1fr','repeat(4, 1fr)','1fr 2fr 1fr','200px 1fr'].map(v => (
                    <button key={v} onClick={() => setCols(v)} className="px-2 py-0.5 rounded text-[10px] glass-button text-[var(--text-muted)]">{v}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1">grid-template-rows</label>
                <input type="text" value={rows} onChange={e => setRows(e.target.value)} className="glass-input w-full text-sm font-mono" placeholder="auto auto"/>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {['auto','auto auto','100px auto','repeat(3, 1fr)'].map(v => (
                    <button key={v} onClick={() => setRows(v)} className="px-2 py-0.5 rounded text-[10px] glass-button text-[var(--text-muted)]">{v}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[{ label:'column-gap', val: colGap, set: setColGap }, { label:'row-gap', val: rowGap, set: setRowGap }].map(({ label, val, set }) => (
                  <div key={label}>
                    <label className="text-xs text-[var(--text-muted)] block mb-1">{label}</label>
                    <div className="flex items-center gap-2">
                      <input type="range" min={0} max={50} value={val}
                        onInput={e => set(+(e.target as HTMLInputElement).value)}
                        onChange={e => set(+e.target.value)}
                        className="flex-1 accent-indigo-500"/>
                      <span className="text-xs font-mono text-[var(--text-muted)] w-10">{val}px</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[{ label:'justify-items', val: justifyItems, set: setJustifyItems }, { label:'align-items', val: alignItems, set: setAlignItems }].map(({ label, val, set }) => (
                  <div key={label}>
                    <label className="text-xs text-[var(--text-muted)] block mb-1">{label}</label>
                    <select value={val} onChange={e => set(e.target.value)} className="glass-input w-full text-xs">
                      {['start','center','end','stretch'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Item controls */}
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Items ({items.length})</p>
                <button onClick={addItem} className="glass-button-primary px-3 py-1.5 text-xs font-semibold">+ Add</button>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {items.map((item, i) => (
                  <button key={item.id} onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all border ${selectedId === item.id ? 'border-indigo-400/50 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500' : 'border-white/20 glass-button text-[var(--text-muted)]'}`}>
                    {item.label}
                  </button>
                ))}
              </div>
              {selected && (
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <input type="text" value={selected.label} onChange={e => updateItem(selected.id, { label: e.target.value })} className="glass-input w-full text-xs mb-2" placeholder="Label"/>
                  {[
                    { label:'col-start', key:'colStart' as const, min:1, max:numCols+1 },
                    { label:'col-end', key:'colEnd' as const, min:1, max:numCols+1 },
                    { label:'row-start', key:'rowStart' as const, min:1, max:numRows+2 },
                    { label:'row-end', key:'rowEnd' as const, min:1, max:numRows+2 },
                  ].map(({ label, key, min, max }) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-xs text-[var(--text-muted)] w-16">{label}</span>
                      <input type="range" min={min} max={max} value={selected[key]}
                        onInput={e => updateItem(selected.id, { [key]: +(e.target as HTMLInputElement).value })}
                        onChange={e => updateItem(selected.id, { [key]: +e.target.value })}
                        className="flex-1 accent-indigo-500"/>
                      <span className="text-xs font-mono text-[var(--text-muted)] w-4">{selected[key]}</span>
                    </div>
                  ))}
                  <button onClick={() => removeItem(selected.id)} className="text-xs text-red-400 hover:text-red-500 mt-1">Remove item</button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preview + Code */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-3 space-y-4">
            <div className="glass-card p-4 rounded-2xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Live Preview</p>
              <div className="rounded-xl border-2 border-dashed border-indigo-300/30 bg-indigo-50/5 overflow-hidden">
                <div style={gridStyle}>
                  {items.map((item, i) => (
                    <div key={item.id}
                      onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                      style={{ gridColumn:`${item.colStart}/${item.colEnd}`, gridRow:`${item.rowStart}/${item.rowEnd}`, backgroundColor: ITEM_COLORS[i % ITEM_COLORS.length], borderRadius:8, padding:'8px 12px', cursor:'pointer', border: selectedId === item.id ? '2px solid white' : '2px solid transparent', minHeight:48, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ color:'white', fontSize:12, fontWeight:700 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
          <RelatedTools tools={['/flexbox', '/border-radius', '/box-shadow']} />
        </div>
      </main>
    </div>
  );
};

export default GridGenerator;
