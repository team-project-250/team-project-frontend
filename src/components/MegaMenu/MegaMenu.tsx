import { useEffect, useState } from 'react';
import { getCategories } from '../../api/categories';
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

  const [categories, setCategories] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<EquipmentApiItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.map((category) => category.name));
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    const city = cities.find((item) => item.name === selectedCity);

    if (!city) {
      return;
    }

    getEquipment(city.slug)
      .then((data) => {
        setEquipment(data);
      })
      .catch(() => {
        setEquipment([]);
      });
  }, [cities, selectedCity]);

  const categoryEquipment = equipment.filter(
    (item) => item.category.name === selectedCategory,
  );

  const handleCategoryClick = () => {
    setSelectedCategory(null);
    onClose();
  };

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {categories.map((category) => (
          <li
            key={category}
            className="mega-menu__item text__body text_body--label"
            onMouseEnter={() => setSelectedCategory(category)}
          >
            <Link
              to={`/catalog?category=${encodeURIComponent(category)}`}
              className={classNames('mega-menu__link', 'text')}
              onClick={handleCategoryClick}
            >
              {category}
            </Link>

            <span className="mega-menu__arrow icon icon--arrow"></span>

            {selectedCategory === category && (
              <div className="mega-menu__models">
                <ul className="mega-menu__models-list">
                  {categoryEquipment.map((item) => (
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
