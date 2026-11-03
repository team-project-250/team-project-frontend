import { useEffect, useState } from 'react';
import { getCategories, type CategoryApiItem } from '../../api/categories';
import { getEquipment, type EquipmentApiItem } from '../../api/equipment';
import { useCity } from '../../context/CityContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './MegaMenu.scss';

type Props = {
  onClose: () => void;
};

export const MegaMenu: React.FC<Props> = ({ onClose }) => {
  const { cities, selectedCity } = useCity();

  const [categories, setCategories] = useState<CategoryApiItem[]>([]);
  const [equipment, setEquipment] = useState<EquipmentApiItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    const city = cities.find((item) => item.slug === selectedCity);

    if (!city || !selectedCategory) {
      return;
    }
    getEquipment({
      city: city.slug,
      category: [selectedCategory],
      page_size: 50,
    })
      .then((data) => {
        setEquipment(data.results);
      })
      .catch(() => {
        setEquipment([]);
      });
  }, [cities, selectedCity, selectedCategory]);

  const handleCategoryClick = () => {
    setSelectedCategory(null);
    onClose();
  };

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {categories.map((category) => (
          <li
            key={category.id}
            className="mega-menu__item text__body text_body--label"
            onMouseEnter={() => setSelectedCategory(category.slug)}
          >
            <Link
              to={`/catalog?category=${encodeURIComponent(category.slug)}`}
              className={classNames('mega-menu__link', 'text')}
              onClick={handleCategoryClick}
            >
              {category.name}
            </Link>

            <span className="mega-menu__arrow icon icon--arrow"></span>

            {selectedCategory === category.slug && (
              <div className="mega-menu__models">
                <ul className="mega-menu__models-list">
                  {equipment.map((item) => (
                    <li key={item.id} className="mega-menu__models-item">
                      <Link
                        to={`/catalog/${item.slug}`}
                        className="mega-menu__models-link text"
                        onClick={onClose}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
