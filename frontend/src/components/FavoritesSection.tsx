
interface FavoritesSectionProps {
  favorites: string[]
  onColorSelect: (color: string) => void
  onColorRemove: (color: string) => void
}

const FavoritesSection = ({ favorites, onColorSelect, onColorRemove }: FavoritesSectionProps) => {
  return (
    <div
      className="glass-card p-4"
    >
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Favorites
        </span><span className="ml-2 text-sm font-normal text-[var(--text-muted)]">Click color to see details</span>
        <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">
          ({favorites.length}/10)
        </span>
      </h2>

      <div className="grid grid-cols-10 gap-1.5">
        
          {favorites.map((color) => (
            <div
              key={color}
              className="relative group cursor-pointer"
              onClick={() => onColorSelect(color)}
            >
              <div 
                className="w-full pt-[100%] rounded-md shadow-sm transition-transform duration-200"
                style={{ backgroundColor: color }}
              />
              
              {/* Color code overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-mono">
                  {color}
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onColorRemove(color)
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 
                         transition-all duration-200 p-1 rounded-full
                         bg-gray-500/20 hover:bg-red-500"
              >
                <svg 
                  className="w-2 h-2 text-[var(--text-muted)] group-hover:text-white transition-colors duration-200"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 10 - favorites.length) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-full pt-[100%] rounded-md bg-white/40 dark:bg-white/8"
            />
          ))}
        
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-6 text-[var(--text-muted)]">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="font-medium">No favorites yet</p>
          <p className="text-sm mt-1">Click the heart icon on colors to add them here</p>
        </div>
      )}
    </div>
  )
}

export default FavoritesSection 