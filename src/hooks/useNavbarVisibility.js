import { useState, useEffect } from 'react';

export const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Update at top state
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        // Scroll Threshold to prevent flickering
        if (Math.abs(currentScrollY - lastScrollY) > 20) {
          // Scrolling down
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } 
          // Scrolling up
          else {
            setIsVisible(true);
          }
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return { isVisible, isAtTop };
};
