import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { getEquipment } from '../../api/equipment';
import { mapEquipment } from '../../api/equipmentMapper';
import { EquipmentCarousel } from '../EquipmentCarousel';
import type { EquipmentType } from '../../types/EquipmentType';
import './PopularEquipment.scss';

export const PopularEquipment = () => {
  const { cities, selectedCity } = useCity();

  const [equipment, setEquipment] = useState<EquipmentType[]>([]);

  useEffect(() => {
    const city = cities.find((item) => item.name === selectedCity);

    if (!city) {
      return;
    }

    getEquipment(city.slug)
      .then((data) => {
        const popularEquipment = data.filter((item) => item.is_popular);

        setEquipment(popularEquipment.map(mapEquipment));
      })
      .catch(() => {
        setEquipment([]);
      });
  }, [cities, selectedCity]);

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
