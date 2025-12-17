import { useEffect } from 'react';

interface PopunderAdProps {
  className?: string;
}

// const PopunderAd = ({ className = '' }: PopunderAdProps) => {
//   useEffect(() => {
//     // Check if popunder has already been loaded in this session
//     const popunderLoaded = sessionStorage.getItem('popunderAdLoaded');
    
//     // Only load if not already loaded in this session
//     if (!popunderLoaded) {
//       // Check if script is already present
//       const existingScript = document.querySelector('script[src*="pl26778301.profitableratecpm.com"]');
      
//       if (!existingScript) {
//         const script = document.createElement('script');
//         script.type = 'text/javascript';
//         script.src = '//pl26778301.profitableratecpm.com/4e/ee/17/4eee172923f5427cf3a550a3f49db9c4.js';
//         script.async = true;
        
//         // Add error handling
//         script.onerror = () => {
//           console.warn('Popunder ad script failed to load');
//         };
        
//         script.onload = () => {
//           // Mark as loaded for this session
//           sessionStorage.setItem('popunderAdLoaded', 'true');
//         };
        
//         // Append to head
//         document.head.appendChild(script);
//       } else {
//         // Script exists, mark as loaded
//         sessionStorage.setItem('popunderAdLoaded', 'true');
//       }
//     }
//   }, []);

//   // This component doesn't render anything visible
//   return null;
// };

export default PopunderAd; 