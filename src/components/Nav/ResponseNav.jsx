import { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';

export default function ResponsiveNavbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileNavbar /> : <Navbar />;
}
