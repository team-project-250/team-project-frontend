import { useState } from 'react';
import { Link } from 'react-router-dom';
import { equipmentCategories } from '../../data/equipmentCategories';
import classNames from 'classnames';
import { equipmentData } from '../../data/equipmentData';
import { useCity } from '../../context/CityContext';
import './MegaMenu.scss';

type Props = {
  onClose: () => void;
};

export const MegaMenu: React.FC<Props> = ({ onClose }) => {
  const { selectedCity } = useCity();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const equipment = equipmentData[selectedCity] ?? [];

  const categoryEquipment = equipment.filter(
    (item) => item.category === selectedCategory,
  );

  const handleCategoryClick = () => {
    setSelectedCategory(null);
    onClose();
  };

  return (
    <div className="mega-menu">
      <ul className="mega-menu__list">
        {equipmentCategories.map((category) => (
          <li
            key={category}
            className="mega-menu__item text__body text_body--label"
            onMouseEnter={() => setSelectedCategory(category)}
          >
            <Link
              to={`catalog?category=${encodeURIComponent(category)}`}
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
                        to={`/catalog/${item.equipmentId}`}
                        className="mega-menu__models-link text"
                        onClick={onClose}
                      >
                        <span>{item.name}</span>
                        <span>{item.model}</span>
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
