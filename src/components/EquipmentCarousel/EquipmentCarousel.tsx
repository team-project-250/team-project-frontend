import type React from 'react';
import type { EquipmentType } from '../../types/EquipmentType';
import { EquipmentCard } from '../EquipmentCard';
import { useCarousel } from './useCarousel';
import './EquipmentCarousel.scss';

type Props = {
  equipment: EquipmentType[];
};

export const EquipmentCarousel: React.FC<Props> = ({ equipment }) => {
  const {
    contentRef,
    canScrollLeft,
    canScrollRight,
    currentSlide,
    totalSlides,
    scrollContent,
    scrollToSlide,
  } = useCarousel(equipment.length);

  return (
    <div className="equipment-carousel">
      <div className="equipment-carousel__content" ref={contentRef}>
        {equipment.map((item) => (
          <div className="equipment-carousel__card" key={item.id}>
            <EquipmentCard equipment={item} />
          </div>
        ))}
      </div>

      <div className="equipment-carousel__arrows">
        <button
          type="button"
          className="equipment-carousel__arrow equipment-carousel__arrow--prev icon icon--arrow-left"
          onClick={() => scrollContent('left')}
          disabled={!canScrollLeft}
        />

        <button
          type="button"
          className="equipment-carousel__arrow equipment-carousel__arrow--next icon icon--arrow-left"
          onClick={() => scrollContent('right')}
          disabled={!canScrollRight}
        />
      </div>

      <div className="equipment-carousel__dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={`equipment-carousel__dots-dot ${
              index === currentSlide ? 'equipment-carousel__dots-dot--active' : ''
            }`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
