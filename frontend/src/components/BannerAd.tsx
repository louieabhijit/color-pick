import { useEffect } from 'react';

interface BannerAdProps {
  variant?: 'content' | 'sidebar' | 'footer';
  className?: string;
}

const BannerAd = ({ variant = 'content', className = '' }: BannerAdProps) => {
  useEffect(() => {
    // Load the banner ad script dynamically if not already loaded
    const existingScript = document.querySelector('script[src*="highperformanceformat.com"]');
    if (!existingScript) {
      // Set the atOptions for the banner ad
      (window as any).atOptions = {
        'key': 'fb74ea3383d9fca516c82520125151eb',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/fb74ea3383d9fca516c82520125151eb/invoke.js';
      document.head.appendChild(script);
    }
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'content':
        return 'w-full flex justify-center py-6 my-8';
      case 'sidebar':
        return 'w-full flex justify-center py-4 my-4';
      case 'footer':
        return 'w-full flex justify-center py-4 my-6 bg-gray-50 dark:bg-gray-800 rounded-lg';
      default:
        return 'w-full flex justify-center py-4';
    }
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      <div className="w-[300px] h-[250px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        {/* The ad will be inserted here by the script */}
        <div id="banner-ad-container" className="w-full h-full">
          {/* Placeholder content while ad loads */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Ad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAd; 