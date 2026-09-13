import { useEffect, useState } from 'react';
import './ScrollToTopButton.scss';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button type="button" className="scroll-to-top text" onClick={scrollToTop}>
      <span className="scroll-to-top__icon icon icon--arrow-up"></span>
    </button>
  );
};
