import { useEffect } from 'react';

interface AdsterraAdProps {
  variant?: 'header' | 'content' | 'footer';
  className?: string;
}

const AdsterraAd = ({ variant = 'content', className = '' }: AdsterraAdProps) => {
  useEffect(() => {
    // Load the Adsterra script dynamically if not already loaded
    const existingScript = document.querySelector('script[src*="profitableratecpm.com"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl26778179.profitableratecpm.com/c9e179680766f6937ee0983f8fd40dee/invoke.js';
      document.head.appendChild(script);
    }
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case 'header':
        return 'w-full bg-gray-50 dark:bg-gray-800 pt-20 py-4';
      case 'content':
        return 'w-full bg-gray-50/50 dark:bg-gray-800/50 py-6 my-8 rounded-lg';
      case 'footer':
        return 'w-full bg-gray-100 dark:bg-gray-700 py-4 my-6';
      default:
        return 'w-full py-4';
    }
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 flex justify-center">
        <div id="container-c9e179680766f6937ee0983f8fd40dee"></div>
      </div>
    </div>
  );
};

export default AdsterraAd; 