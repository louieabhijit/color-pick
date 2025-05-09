import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Upload Image
          </span>
        </h2>
        
        {/* Upload method tabs */}
        <div className="flex space-x-2 mb-6 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
          {(['device', 'url', 'clipboard'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeTab === tab 
                  ? 'bg-white dark:bg-gray-800 text-indigo-500 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          ))}
        </div>

        {/* Upload sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Device upload */}
            {activeTab === 'device' && (
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                  ${isDragActive || isDragReady
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 scale-102' 
                    : 'border-gray-300 hover:border-indigo-500 dark:border-gray-600'
                  }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isDragActive || isDragReady ? 1.1 : 1,
                    y: isDragActive || isDragReady ? -10 : 0
                  }}
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
                  <p className={`text-lg font-medium mb-2 transition-colors duration-200
                    ${isDragActive || isDragReady ? 'text-indigo-500' : 'text-gray-600 dark:text-gray-300'}`}>
                    {isDragActive 
                      ? 'Drop your image here' 
                      : 'Drag & drop an image here'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    or click to select from your device
                  </p>
                </motion.div>
              </div>
            )}

            {/* URL upload */}
            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste image URL here"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             dark:bg-gray-700/50 dark:text-white focus:ring-2 focus:ring-indigo-500 
                             focus:border-transparent outline-none pl-10"
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
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-indigo-500 text-white rounded-lg 
                           hover:bg-indigo-600 transition-colors duration-200
                           flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Load Image</span>
                </motion.button>
              </form>
            )}

            {/* Clipboard upload */}
            {activeTab === 'clipboard' && (
              <motion.div
                onClick={handleBoxClick}
                className="w-full px-4 py-12 rounded-xl border-2 border-dashed border-gray-300 
                         dark:border-gray-600 hover:border-indigo-500 transition-all duration-200
                         group relative overflow-hidden focus-within:outline-none focus-within:ring-2 
                         focus-within:ring-indigo-500 focus-within:border-transparent
                         cursor-pointer flex flex-col items-center justify-center min-h-[240px]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  id="clipboard-button"
                  className="w-full h-full absolute inset-0 cursor-pointer focus:outline-none"
                  onPaste={(e: React.ClipboardEvent) => handlePaste(e.nativeEvent)}
                  aria-label="Paste image from clipboard"
                />
                
                {/* Popup Paste Button */}
                <AnimatePresence>
                  {showPasteButton && !isPasting && !pasteError && (
                    <motion.button
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleManualPaste();
                      }}
                      className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                               bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full
                               shadow-lg flex items-center space-x-2 transition-colors duration-200"
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
                    </motion.button>
                  )}
                </AnimatePresence>

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
                  
                  <motion.div
                    className="text-center"
                    animate={isPasting ? { y: -5, opacity: 0.7 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-200
                                group-hover:text-indigo-500 transition-colors duration-300">
                      {isPasting ? 'Processing...' : 'Paste from Clipboard'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click here, then press Ctrl+V (Cmd+V on Mac)
                    </p>
                  </motion.div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {pasteError && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
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
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Processing Indicator */}
                <AnimatePresence>
                  {isPasting && !pasteError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                               flex items-center justify-center"
                    >
                      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 
                                    rounded-full px-4 py-2 shadow-lg">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 
                                      border-t-transparent" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Processing image...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default UploadSection 