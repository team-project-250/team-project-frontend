import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarousel = (itemsCount: number) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);

  const getVisibleItemsCount = useCallback(() => {
    if (window.innerWidth >= 1024) {
      return 3;
    }

    return 1;
  }, []);

  const updateCarousel = useCallback(() => {
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

    const visibleItems = getVisibleItemsCount();

    const slidesCount = Math.max(itemsCount - visibleItems + 1, 1);

    const cards = Array.from(content.children) as HTMLElement[];

    if (cards.length === 0) {
      return;
    }

    const currentIndex =
      scrollLeft >= maxScrollLeft - 1
        ? slidesCount - 1
        : cards.reduce((closestIndex, card, index) => {
            const closestCard = cards[closestIndex];

            if (!closestCard) {
              return index;
            }

            const closestDistance = Math.abs(closestCard.offsetLeft - scrollLeft);

            const currentDistance = Math.abs(card.offsetLeft - scrollLeft);

            return currentDistance < closestDistance ? index : closestIndex;
          }, 0);

    setTotalSlides(slidesCount);
    setCurrentSlide(Math.min(currentIndex, slidesCount - 1));
  }, [getVisibleItemsCount, itemsCount]);

  const scrollContent = (direction: 'left' | 'right') => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const cards = Array.from(content.children) as HTMLElement[];

    if (cards.length === 0) {
      return;
    }

    const targetIndex =
      direction === 'right'
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);

    const targetCard = cards[targetIndex];

    if (!targetCard) {
      return;
    }

    content.scrollTo({
      left: targetCard.offsetLeft,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index: number) => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const cards = Array.from(content.children) as HTMLElement[];

    const targetCard = cards[index];

    if (!targetCard) {
      return;
    }

    content.scrollTo({
      left: targetCard.offsetLeft,
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
  }, [updateCarousel]);

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
