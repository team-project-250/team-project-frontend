import { useEffect, useRef, useState } from 'react';
import { reviews } from '../../data/reviews';
import './Reviews.scss';

export const Reviews = () => {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(1);

  const getSlidesCount = () => {
    if (window.innerWidth < 640) {
      return reviews.length;
    }

    return Math.ceil(reviews.length / 2);
  };

  const updateCarousel = () => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const slidesCount = getSlidesCount();
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

    const slideWidth = viewport.clientWidth;

    const currentIndex =
      slideWidth > 0 ? Math.round(viewport.scrollLeft / slideWidth) : 0;

    setTotalSlides(slidesCount);

    setCurrentSlide(Math.min(currentIndex, slidesCount - 1));

    if (maxScrollLeft <= 0) {
      setCurrentSlide(0);
    }
  };

  const scrollToSlide = (index: number) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      left: index * viewport.clientWidth,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    scrollToSlide(Math.max(currentSlide - 1, 0));
  };

  const handleNext = () => {
    scrollToSlide(Math.min(currentSlide + 1, totalSlides - 1));
  };

  useEffect(() => {
    updateCarousel();

    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    viewport.addEventListener('scroll', updateCarousel);
    window.addEventListener('resize', updateCarousel);

    return () => {
      viewport.removeEventListener('scroll', updateCarousel);

      window.removeEventListener('resize', updateCarousel);
    };
  }, []);

  return (
    <section className="reviews">
      <div className="reviews__top">
        <h2 className="reviews__title text__title text__title--basic">
          Відгуки клієнтів
        </h2>
      </div>

      <div className="reviews__carousel">
        <div className="reviews__viewport" ref={viewportRef}>
          <div className="reviews__track">
            {reviews.map((review) => (
              <article className="reviews__item" key={review.id}>
                <div className="reviews__quotes"></div>

                <div className="reviews__item-top">
                  <div className="reviews__author">
                    <div className="reviews__avatar">
                      {review.avatar && <img src={review.avatar} alt={review.name} />}
                    </div>

                    <div>
                      <h3 className="reviews__name text__title text__title--secondary">
                        {review.name}
                      </h3>

                      <div className="reviews__rating">
                        <div className="reviews__rating-star">
                          {Array.from({
                            length: review.rating,
                          }).map((_, index) => (
                            <span key={index}>★</span>
                          ))}
                        </div>

                        <time className="reviews__rating-date text__body">
                          {review.date}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="reviews__text text__body">{review.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="reviews__arrows">
          <button
            type="button"
            className="reviews__arrow reviews__arrow--prev icon icon--arrow-left"
            onClick={handlePrev}
            disabled={currentSlide === 0}
          />

          <button
            type="button"
            className="reviews__arrow reviews__arrow--next icon icon--arrow-left"
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
          />
        </div>
      </div>

      <div className="reviews__dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`reviews__dot ${
              currentSlide === index ? 'reviews__dot--active' : ''
            }`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};
