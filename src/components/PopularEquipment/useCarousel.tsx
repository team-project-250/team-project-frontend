import { useEffect, useRef, useState } from 'react';

export const useCarousel = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);

  const updateCarousel = () => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = content;

    const maxScrollLeft = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 0);

    setCanScrollRight(scrollLeft < maxScrollLeft - 1);

    if (maxScrollLeft <= 0) {
      setCurrentSlide(0);
      setTotalSlides(1);

      return;
    }

    const slideWidth = content.clientWidth;

    const slidesCount = Math.ceil(maxScrollLeft / slideWidth) + 1;

    const currentIndex = Math.round(scrollLeft / slideWidth);

    setTotalSlides(slidesCount);

    setCurrentSlide(Math.min(currentIndex, slidesCount - 1));
  };

  const scrollContent = (direction: 'left' | 'right') => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const scrollAmount = content.clientWidth;

    content.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index: number) => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const maxScrollLeft = content.scrollWidth - content.clientWidth;

    const slideWidth = content.clientWidth;

    const targetPosition = Math.min(index * slideWidth, maxScrollLeft);

    content.scrollTo({
      left: targetPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateCarousel();

    const content = contentRef.current;

    if (!content) {
      return undefined;
    }

    content.addEventListener('scroll', updateCarousel);

    window.addEventListener('resize', updateCarousel);

    return () => {
      content.removeEventListener('scroll', updateCarousel);

      window.removeEventListener('resize', updateCarousel);
    };
  }, []);

  return {
    contentRef,
    canScrollLeft,
    canScrollRight,
    currentSlide,
    totalSlides,
    scrollContent,
    scrollToSlide,
  };
};
