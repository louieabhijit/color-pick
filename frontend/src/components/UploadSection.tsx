import { useState, useCallback, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadSectionProps {
  onImageSelect: (imageUrl: string) => void
}

const UploadSection = ({ onImageSelect }: UploadSectionProps) => {
  const [urlInput, setUrlInput] = useState('')
  const [activeTab, setActiveTab] = useState<'device' | 'url' | 'clipboard'>('device')
  const [isDragReady, setIsDragReady] = useState(false)
  const [pasteError, setPasteError] = useState<string | null>(null)
  const [isPasting, setIsPasting] = useState(false)
  const [showPasteButton, setShowPasteButton] = useState(false)
  const pasteTimeoutRef = useRef<number>()

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageSelect(imageUrl)
      setIsDragReady(false)
    }
  }, [onImageSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    multiple: false,
    onDragEnter: () => setIsDragReady(true),
    onDragLeave: () => setIsDragReady(false)
  })

  // Handle URL input
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      onImageSelect(urlInput)
      setUrlInput('')
    }
  }

  // Handle clipboard paste
  const handlePaste = async (e?: ClipboardEvent) => {
    try {
      if (isPasting) return; // Prevent multiple simultaneous paste operations
      setIsPasting(true);
      setPasteError(null);
      
      // If we have a paste event, try that first
      if (e?.clipboardData) {
        const items = Array.from(e.clipboardData.items);
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const blob = item.getAsFile();
            if (blob) {
              const imageUrl = URL.createObjectURL(blob);
              onImageSelect(imageUrl);
              setIsPasting(false);
              return;
            }
          }
        }
      }

      // Try the clipboard.read() API as fallback
      try {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          const imageTypes = item.types.filter(type => type.startsWith('image/'));
          if (imageTypes.length > 0) {
            const blob = await item.getType(imageTypes[0]);
            const imageUrl = URL.createObjectURL(blob);
            onImageSelect(imageUrl);
            setIsPasting(false);
            return;
          }
        }
      } catch (err) {
        console.log('Clipboard.read() failed:', err);
      }

      setPasteError('No image found in clipboard. Please copy an image first.');
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      setPasteError('Failed to read clipboard. Please try copying the image again.');
    } finally {
      setIsPasting(false);
    }
  };

  // Handle manual paste button click
  const handleManualPaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      await handlePaste();
    } catch (err) {
      // If clipboard permission is denied, show the system paste dialog
      document.execCommand('paste');
    }
  };

  // Handle box click
  const handleBoxClick = () => {
    setShowPasteButton(true);
    // Hide the button after 3 seconds
    if (pasteTimeoutRef.current) {
      clearTimeout(pasteTimeoutRef.current);
    }
    pasteTimeoutRef.current = setTimeout(() => {
      setShowPasteButton(false);
    }, 3000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pasteTimeoutRef.current) {
        clearTimeout(pasteTimeoutRef.current);
      }
    };
  }, []);

  // Handle keyboard shortcuts and paste events
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (activeTab === 'clipboard' && (e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        await handlePaste();
      }
    };

    const handleGlobalPaste = async (e: ClipboardEvent) => {
      if (activeTab === 'clipboard') {
        e.preventDefault();
        await handlePaste(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handleGlobalPaste);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handleGlobalPaste);
    };
  }, [activeTab]);

  return (
    <div
      className="glass-card p-6 relative overflow-hidden"
    >
      {/* Subtle inner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
          </div>
          <h2 className="text-base font-semibold gradient-text">Upload Image</h2>
        </div>

        {/* Upload method tabs */}
        <div className="glass-tab-strip flex gap-1.5 mb-5 p-1">
          {(['device', 'url', 'clipboard'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab
                  ? 'glass-tab-active'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
            >
              {tab === 'device' && (
                <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {tab === 'url' && (
                <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              )}
              {tab === 'clipboard' && (
                <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Upload sections */}
        
          <div
            key={activeTab}
            className="space-y-4"
          >
            {/* Device upload */}
            {activeTab === 'device' && (
              <div
                {...getRootProps()}
                className={`relative rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
                  ${isDragActive || isDragReady
                    ? 'border-2 border-indigo-400/60 scale-[1.01]'
                    : 'border-2 border-dashed hover:border-indigo-400/50'
                  }`}
                style={{
                  background: isDragActive || isDragReady
                    ? 'rgba(99,102,241,0.08)'
                    : 'rgba(255,255,255,0.25)',
                  borderColor: isDragActive || isDragReady ? 'rgba(99,102,241,0.5)' : 'rgba(148,163,184,0.4)',
                }}
              >
                <input {...getInputProps()} aria-label="Upload image for color extraction" />
                <div
                  className="pointer-events-none"
                >
                  <svg 
                    className={`w-16 h-16 mx-auto mb-4 transition-colors duration-200
                      ${isDragActive || isDragReady ? 'text-indigo-500' : 'text-gray-400'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                    />
                  </svg>
                  <p className={`text-base font-semibold mb-1.5 transition-colors duration-200
                    ${isDragActive || isDragReady ? 'text-indigo-500' : 'text-[var(--text-primary)]'}`}>
                    {isDragActive ? 'Drop your image here' : 'Drag & drop an image here'}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">or click to select from your device</p>
                </div>
              </div>
            )}

            {/* URL upload */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste image URL here"
                    className="w-full px-4 py-3 rounded-xl glass-input pl-10 text-sm"
                  />
                  <svg 
                    className="w-5 h-5 absolute left-3 top-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl glass-button-primary flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Load Image</span>
                </button>
              </form>
            )}

            {/* Clipboard upload */}
            {activeTab === 'clipboard' && (
              <div
                onClick={handleBoxClick}
                className="w-full rounded-2xl border-2 border-dashed transition-all duration-300
                         group relative overflow-hidden cursor-pointer flex flex-col items-center justify-center min-h-[200px] py-10"
                style={{ background: 'rgba(255,255,255,0.25)', borderColor: 'rgba(148,163,184,0.4)' }}
              >
                <button
                  id="clipboard-button"
                  className="w-full h-full absolute inset-0 cursor-pointer focus:outline-none"
                  onPaste={(e: React.ClipboardEvent) => handlePaste(e.nativeEvent)}
                  aria-label="Paste image from clipboard"
                />
                
                {/* Popup Paste Button */}
                
                  {showPasteButton && !isPasting && !pasteError && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleManualPaste(); }}
                      className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                               glass-button-primary px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl"
                    >
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                        />
                      </svg>
                      <span>Paste Image</span>
                    </button>
                  )}
                

                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon and Text Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <svg 
                    className={`w-16 h-16 mb-4 transition-all duration-300
                              ${isPasting 
                                ? 'text-indigo-500 scale-110' 
                                : 'text-gray-400 group-hover:text-indigo-500 group-hover:scale-110'
                              }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                    />
                  </svg>
                  
                  <div
                    className="text-center"
                  >
                    <p className="text-base font-semibold mb-1.5 text-[var(--text-primary)] group-hover:text-indigo-500 transition-colors duration-300">
                      {isPasting ? 'Processing...' : 'Paste from Clipboard'}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      Click here, then press Ctrl+V (Cmd+V on Mac)
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                
                  {pasteError && (
                    <div 
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                      <p className="text-sm text-red-500 bg-red-100 dark:bg-red-900/20 
                                px-4 py-2 rounded-full flex items-center shadow-lg">
                        <svg 
                          className="w-4 h-4 mr-2 flex-shrink-0" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                        {pasteError}
                      </p>
                    </div>
                  )}
                

                {/* Processing Indicator */}
                
                  {isPasting && !pasteError && (
                    <div
                      className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                               flex items-center justify-center"
                    >
                      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 
                                    rounded-full px-4 py-2 shadow-lg">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 
                                      border-t-transparent" />
                        <p className="text-sm text-[var(--text-secondary)]">
                          Processing image...
                        </p>
                      </div>
                    </div>
                  )}
                
              </div>
            )}
          </div>
        
      </div>
    </div>
  )
}

export default UploadSection 