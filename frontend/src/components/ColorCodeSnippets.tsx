import { motion } from 'framer-motion'
import { useState } from 'react'
import { useClipboard } from '../context/ClipboardContext'

interface ColorCodeSnippetsProps {
  selectedColor: string | null
}

interface CodeSnippet {
  language: string
  icon: string
  fileExtension: string
  snippets: {
    title: string
    code: string
  }[]
}

const ColorCodeSnippets = ({ selectedColor }: ColorCodeSnippetsProps) => {
  const { copyToClipboard } = useClipboard()
  const [activeLanguage, setActiveLanguage] = useState<string>('CSS')
  const [copiedSnippet, setCopiedSnippet] = useState<string>('')
  const [lineNumbers, setLineNumbers] = useState<boolean>(true)

  const handleCopy = async (code: string) => {
    await copyToClipboard(code)
    setCopiedSnippet(code)
    setTimeout(() => setCopiedSnippet(''), 2000)
  }

  const getCodeSnippets = (color: string): CodeSnippet[] => [
    {
      language: 'CSS',
      fileExtension: '.css',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
      </svg>`,
      snippets: [
        {
          title: 'Background Color',
          code: `background-color: ${color};`
        },
        {
          title: 'Text Color',
          code: `color: ${color};`
        },
        {
          title: 'Border Color',
          code: `border-color: ${color};`
        },
        {
          title: 'Box Shadow',
          code: `box-shadow: 0 4px 6px -1px ${color}40, 0 2px 4px -1px ${color}20;`
        }
      ]
    },
    {
      language: 'SCSS',
      fileExtension: '.scss',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM9.615 15.998c.175.645.156 1.248-.024 1.792l-.065.18c-.024.061-.052.12-.078.176-.14.29-.326.56-.555.81-.698.759-1.672 1.047-2.09.805-.45-.262-.226-1.335.584-2.19.871-.918 2.12-1.509 2.12-1.509v-.003l.108-.061zm9.911-10.861c-.542-2.133-4.077-2.834-7.422-1.645-1.989.707-4.144 1.818-5.693 3.267C4.568 8.48 4.275 9.98 4.396 10.607c.427 2.211 3.457 3.657 4.703 4.73v.006c-.367.18-3.056 1.529-3.686 2.925-.675 1.47.105 2.521.615 2.655 1.575.436 3.195-.36 4.065-1.649.84-1.261.766-2.881.404-3.676.496-.135 1.08-.195 1.83-.104 2.101.24 2.521 1.56 2.43 2.1-.09.539-.523.854-.674.944-.15.091-.195.12-.181.181.015.09.091.09.21.075.165-.03 1.096-.45 1.141-1.471.045-1.29-1.186-2.729-3.375-2.7-.9.016-1.471.091-1.875.256-.03-.045-.061-.075-.105-.105-1.35-1.455-3.855-2.475-3.75-4.41.03-.705.285-2.564 4.8-4.814 3.705-1.846 6.661-1.335 7.171-.21.733 1.604-1.576 4.59-5.431 5.024-1.47.165-2.235-.404-2.431-.615-.209-.225-.239-.24-.314-.194-.12.06-.045.255 0 .375.12.3.585.825 1.396 1.095.704.225 2.43.359 4.5-.45 2.324-.899 4.139-3.405 3.614-5.505l.073.067z"/>
      </svg>`,
      snippets: [
        {
          title: 'Variable',
          code: `$color: ${color};`
        },
        {
          title: 'Mix with Black',
          code: `$darker: mix(black, ${color}, 20%);`
        },
        {
          title: 'Mix with White',
          code: `$lighter: mix(white, ${color}, 20%);`
        }
      ]
    },
    {
      language: 'TailwindCSS',
      fileExtension: '.jsx',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>`,
      snippets: [
        {
          title: 'Background',
          code: `className="bg-[${color}]"`
        },
        {
          title: 'Text',
          code: `className="text-[${color}]"`
        },
        {
          title: 'Border',
          code: `className="border-[${color}]"`
        }
      ]
    },
    {
      language: 'JavaScript',
      fileExtension: '.js',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>`,
      snippets: [
        {
          title: 'Object',
          code: `const color = '${color}';`
        },
        {
          title: 'Style Object',
          code: `const styles = {
  backgroundColor: '${color}',
  color: '${color}',
};`
        }
      ]
    },
    {
      language: 'React',
      fileExtension: '.tsx',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zM6.008 16.255l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zM17.992 16.255l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046z"/>
      </svg>`,
      snippets: [
        {
          title: 'Inline Style',
          code: `style={{ backgroundColor: '${color}' }}`
        },
        {
          title: 'Styled Component',
          code: `const StyledDiv = styled.div\`
  background-color: ${color};
  color: ${color};
\`;`
        }
      ]
    },
    {
      language: 'Swift',
      fileExtension: '.swift',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.984 16.348c.056-.112.056-.224.112-.336 1.346-5.272-1.851-11.44-7.347-14.693 2.412 3.253 3.365 7.122 2.524 10.599-.056.28-.168.617-.28.897a5.173 5.173 0 0 1-.45-.28S11.104 9.17 5.273 3.282c-.169-.168 3.14 4.71 6.841 8.58-1.738-1.01-6.673-4.542-9.758-7.403.337.617.842 1.234 1.346 1.851 2.58 3.309 5.945 7.346 9.983 10.43-2.86 1.74-6.842 1.851-10.88 0-1.01-.448-1.85-1.009-2.804-1.682 1.682 2.636 4.318 5.048 7.459 6.337 3.757 1.627 7.57 1.515 10.318 0h.057c.112-.056.224-.112.336-.224 1.346-.673 3.982-1.402 5.44 1.402.392.785 1.121-2.86-1.626-6.225z"/>
      </svg>`,
      snippets: [
        {
          title: 'UIColor',
          code: `let color = UIColor(hex: "${color}")`
        },
        {
          title: 'SwiftUI Color',
          code: `Color(hex: "${color}")`
        },
        {
          title: 'Color Extension',
          code: `extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}`
        }
      ]
    },
    {
      language: 'Python',
      fileExtension: '.py',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08-.33.23z"/>
      </svg>`,
      snippets: [
        {
          title: 'RGB Color',
          code: `color = "${color}"`
        },
        {
          title: 'Tkinter Color',
          code: `bg_color = "${color}"`
        },
        {
          title: 'PIL Color',
          code: `from PIL import ImageColor
rgb_color = ImageColor.getcolor("${color}", "RGB")`
        }
      ]
    },
    {
      language: 'Flutter',
      fileExtension: '.dart',
      icon: `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-7.37-7.373 7.37-7.37h-7.37z"/>
      </svg>`,
      snippets: [
        {
          title: 'Color',
          code: `Color(0xFF${color.substring(1)})`
        },
        {
          title: 'Material Color',
          code: `MaterialColor color = MaterialColor(0xFF${color.substring(1)}, {
  50: Color(0xFF${color.substring(1)}),
  100: Color(0xFF${color.substring(1)}),
  200: Color(0xFF${color.substring(1)}),
  300: Color(0xFF${color.substring(1)}),
  400: Color(0xFF${color.substring(1)}),
  500: Color(0xFF${color.substring(1)}),
  600: Color(0xFF${color.substring(1)}),
  700: Color(0xFF${color.substring(1)}),
  800: Color(0xFF${color.substring(1)}),
  900: Color(0xFF${color.substring(1)}),
});`
        }
      ]
    }
  ]

  if (!selectedColor) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-4"
      >
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Code Snippets
            </span>
          </h2>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <p className="font-medium">No color selected</p>
          <p className="text-sm mt-1">Select a color to view code snippets</p>
        </div>
      </motion.div>
    )
  }

  const codeSnippets = getCodeSnippets(selectedColor)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mt-4"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Code Snippets
          </span>
        </h2>
      </div>

      {/* IDE Controls */}
      <div className="flex items-center justify-between mb-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLineNumbers(!lineNumbers)}
            className={`p-2 rounded ${
              lineNumbers 
                ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {activeLanguage}{codeSnippets.find(s => s.language === activeLanguage)?.fileExtension}
        </div>
      </div>

      {/* Language Tabs - Now with file icons */}
      <div className="flex space-x-1 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
                    bg-gray-100 dark:bg-gray-900/50 rounded-lg p-1">
        {codeSnippets.map((lang) => (
          <motion.button
            key={lang.language}
            onClick={() => setActiveLanguage(lang.language)}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-2 transition-all duration-200 text-sm
                      ${activeLanguage === lang.language
                        ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                      }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span dangerouslySetInnerHTML={{ __html: lang.icon }} />
            <span className="font-medium">{lang.language}</span>
          </motion.button>
        ))}
      </div>

      {/* Code Snippets - Now with line numbers and enhanced IDE styling */}
      <div className="space-y-4">
        {codeSnippets
          .find(lang => lang.language === activeLanguage)
          ?.snippets.map((snippet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 
                            dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl -m-2 p-2 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-200" />
              
              <div className="relative">
                {/* File tab-like header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/80
                              border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <span dangerouslySetInnerHTML={{ 
                      __html: codeSnippets.find(s => s.language === activeLanguage)?.icon || ''
                    }} />
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {snippet.title}
                    </h3>
                  </div>
                  <motion.button
                    onClick={() => handleCopy(snippet.code)}
                    className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400
                             transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copiedSnippet === snippet.code ? (
                      <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </motion.button>
                </div>
                
                <div className="relative rounded-b-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50">
                  <div className="absolute inset-0 bg-white/40 dark:bg-black/40" />
                  <div className="relative flex">
                    {lineNumbers && (
                      <div className="py-4 pr-4 pl-3 text-xs font-mono text-gray-400 select-none
                                   border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                        {snippet.code.split('\n').map((_, i) => (
                          <div key={i} className="text-right min-w-[2ch] leading-6">{i + 1}</div>
                        ))}
                      </div>
                    )}
                    <pre className="relative p-4 text-sm font-mono overflow-x-auto flex-1
                                 text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-black/20">
                      <code className="language-javascript">
                        {snippet.code.split('\n').map((line, i) => (
                          <div key={i} className="syntax-line leading-6 hover:bg-gray-100/50 dark:hover:bg-gray-800/30 -mx-4 px-4">
                            {line.split(/([{}$:;'"`]|\b(const|let|var|function|return|import|export|from|default|class|extends|new|this|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|typeof|instanceof|in|of|null|undefined|true|false)\b)/).map((part, j) => {
                              if (part === undefined) return null;
                              let className = '';
                              if (/^(const|let|var|function|return|import|export|from|default|class|extends|new|this|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|typeof|instanceof|in|of|null|undefined|true|false)$/.test(part)) {
                                className = 'text-purple-600 dark:text-purple-400 font-medium'; // Keywords
                              } else if (/^[{}]$/.test(part)) {
                                className = 'text-yellow-600 dark:text-yellow-400'; // Braces
                              } else if (/^[$]/.test(part)) {
                                className = 'text-green-600 dark:text-green-400'; // Variables
                              } else if (/^[:;]$/.test(part)) {
                                className = 'text-gray-500 dark:text-gray-400'; // Punctuation
                              } else if (/^['"`]/.test(part)) {
                                className = 'text-green-600 dark:text-green-400'; // Strings
                              } else if (/^#[0-9a-fA-F]{3,8}$/.test(part)) {
                                className = 'text-blue-600 dark:text-blue-400'; // Color values
                              } else if (/^[0-9]+$/.test(part)) {
                                className = 'text-orange-600 dark:text-orange-400'; // Numbers
                              } else if (/^(background-color|color|border-color|box-shadow|mix)$/.test(part)) {
                                className = 'text-cyan-600 dark:text-cyan-400'; // CSS properties
                              }
                              return <span key={j} className={className}>{part}</span>;
                            })}
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        }
      </div>

      {/* Information Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Snippets Guide
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Access ready-to-use color code snippets for popular programming languages and frameworks. Copy and paste color values in various formats including CSS, SCSS, TailwindCSS, JavaScript, and React. Perfect for developers looking to implement consistent color schemes across their projects.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Features:</span>
              {[
                'Multiple languages',
                'Framework support',
                'One-click copying',
                'IDE-style interface',
                'Syntax highlighting',
                'Real-time preview'
              ].map((feature) => (
                <span
                  key={feature}
                  className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 
                           text-indigo-600 dark:text-indigo-300 font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ColorCodeSnippets 