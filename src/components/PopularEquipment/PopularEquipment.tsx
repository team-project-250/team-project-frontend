import { Link } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { equipmentData } from '../../data/equipmentData';
import { EquipmentCarousel } from '../EquipmentCarousel';
import './PopularEquipment.scss';

export const PopularEquipment = () => {
  const { selectedCity } = useCity();

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

        <EquipmentCarousel equipment={equipment} />
      </div>
    </section>
  );
};
