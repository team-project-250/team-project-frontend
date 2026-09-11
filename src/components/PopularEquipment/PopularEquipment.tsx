import { useCity } from '../../context/CityContext';
import { equipmentData } from '../../data/equipmentData';
import type { EquipmentType } from '../../types/EquipmentType';
import { EquipmentCard } from '../EquipmentCard';
import { useCarousel } from './useCarousel';
import './PopularEquipment.scss';
import { Link } from 'react-router-dom';

export const PopularEquipment = () => {
  const { selectedCity } = useCity();

  const {
    contentRef,
    canScrollLeft,
    canScrollRight,
    currentSlide,
    totalSlides,
    scrollContent,
    scrollToSlide,
  } = useCarousel();

  const equipment = equipmentData[selectedCity]!;

  return (
    <section className="popular">
      <div className="popular__inner">
        <div className="popular__top">
          <h2 className="popular__title text__title text__title--basic">
            Популярна техніка
          </h2>

          <Link to="/catalog">Перейти в каталог</Link>
        </div>

        <div className="popular__carousel">
          <div className="popular__content" ref={contentRef}>
            {equipment.map((item: EquipmentType) => (
              <div className="popular__card" key={item.id}>
                <EquipmentCard equipment={item} />
              </div>
            ))}
          </div>

          <div className="popular__arrows">
            <button
              type="button"
              className="popular__arrow popular__arrow--prev icon icon--arrow-left"
              onClick={() => scrollContent('left')}
              disabled={!canScrollLeft}
            />

            <button
              type="button"
              className="popular__arrow popular__arrow--next icon icon--arrow-left"
              onClick={() => scrollContent('right')}
              disabled={!canScrollRight}
            />
          </div>
        </div>

        <div className="popular__dots">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              type="button"
              key={index}
              className={`popular__dots-dot ${
                index === currentSlide ? 'popular__dots-dot--active' : ''
              }`}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
