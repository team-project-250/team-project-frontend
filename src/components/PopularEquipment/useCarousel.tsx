import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarousel = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);

  const getItems = useCallback(() => {
    const content = contentRef.current;

    if (!content) {
      return [];
    }

    return Array.from(content.querySelectorAll<HTMLElement>('.popular__card'));
  }, []);

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

    const items = getItems();

    if (items.length === 0) {
      return;
    }

    const visibleItems = getVisibleItemsCount();
    const slidesCount = Math.max(items.length - visibleItems + 1, 1);

    const currentIndex =
      scrollLeft >= maxScrollLeft - 1
        ? slidesCount - 1
        : items.reduce((closestIndex, item, index) => {
            const closestItem = items[closestIndex];

            if (!closestItem) {
              return index;
            }

            const closestDistance = Math.abs(closestItem.offsetLeft - scrollLeft);
            const currentDistance = Math.abs(item.offsetLeft - scrollLeft);

            return currentDistance < closestDistance ? index : closestIndex;
          }, 0);

    setTotalSlides(slidesCount);
    setCurrentSlide(Math.min(currentIndex, slidesCount - 1));
  }, [getItems, getVisibleItemsCount]);

  const scrollContent = (direction: 'left' | 'right') => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const items = getItems();

    if (items.length === 0) {
      return;
    }

    const targetIndex =
      direction === 'right'
        ? Math.min(currentSlide + 1, totalSlides - 1)
        : Math.max(currentSlide - 1, 0);

    const targetItem = items[targetIndex];

    if (!targetItem) {
      return;
    }

    content.scrollTo({
      left: targetItem.offsetLeft,
      behavior: 'smooth',
    });
  };

  const scrollToSlide = (index: number) => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const items = getItems();
    const targetItem = items[index];

    if (!targetItem) {
      return;
    }

    content.scrollTo({
      left: targetItem.offsetLeft,
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
