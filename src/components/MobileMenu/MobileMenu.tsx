import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { cityData } from '../../data/cityData';
import { cities } from '../../data/cities';
import { equipmentCategories } from '../../data/equipmentCategories';
import { equipmentData } from '../../data/equipmentData';
import './MobileMenu.scss';

type Props = {
  onClose: () => void;
};

export const MobileMenu: React.FC<Props> = ({ onClose }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const currentCity = cityData[selectedCity];

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);

  if (!currentCity) {
    return null;
  }

  const equipment = equipmentData[selectedCity] ?? [];

  const categoryEquipment = equipment.filter(
    (item) => item.category === selectedCategory,
  );

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCitiesOpen(false);
  };

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__catalog">
        <button
          type="button"
          className="mobile-menu__catalog-button text__body text__body--title"
          onClick={() => setIsCatalogOpen((prev) => !prev)}
        >
          <span>Каталог</span>

          <span
            className={classNames('icon icon--arrow', {
              'mobile-menu__catalog-arrow--open': isCatalogOpen,
            })}
          ></span>
        </button>

        {isCatalogOpen && (
          <ul className="mobile-menu__catalog-list">
            {equipmentCategories.map((category) => (
              <li key={category} className="mobile-menu__catalog-item">
                <button
                  type="button"
                  className="mobile-menu__catalog-link text text__body text__body--small"
                  onClick={() =>
                    setSelectedCategory((prev) => (prev === category ? null : category))
                  }
                >
                  <span>{category}</span>

                  <span
                    className={classNames('icon icon--arrow', {
                      'mobile-menu__catalog-arrow--open': selectedCategory === category,
                    })}
                  ></span>
                </button>

                {selectedCategory === category && (
                  <ul className="mobile-menu__models-list">
                    {categoryEquipment.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/catalog/${item.equipmentId}`}
                          className="mobile-menu__model text text__body text__body--small"
                          onClick={() => {
                            setIsCatalogOpen(false);
                            setSelectedCategory(null);
                            setIsCitiesOpen(false);
                            onClose();
                          }}
                        >
                          <span>{item.name}</span>
                          <span>{item.model}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="mobile-menu__navigation">
        <Link to="/contacts" className="mobile-menu__link text__body" onClick={onClose}>
          Контакти
        </Link>

        <Link
          to="/rental-terms"
          className="mobile-menu__link text__body"
          onClick={onClose}
        >
          Умови бронювання
        </Link>

        <Link to="/about" className="mobile-menu__link text__body" onClick={onClose}>
          Про нас
        </Link>

        <Link to="/questions" className="mobile-menu__link text__body" onClick={onClose}>
          Питання та відповіді
        </Link>

        <Link to="/delivery" className="mobile-menu__link text__body" onClick={onClose}>
          Доставка і оплата
        </Link>
      </nav>

      <div className="mobile-menu__cities">
        <button
          type="button"
          className="mobile-menu__city-button text text__body"
          onClick={() => setIsCitiesOpen((prev) => !prev)}
        >
          <span className="icon icon--location"></span>

          <span>{selectedCity}</span>

          <span
            className={classNames('icon icon--arrow', {
              'mobile-menu__city-arrow--open': isCitiesOpen,
            })}
          ></span>
        </button>

        {isCitiesOpen && (
          <ul className="mobile-menu__cities-list">
            {cities.map((city) => (
              <li key={city}>
                <button
                  type="button"
                  className="mobile-menu__city text text__body"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mobile-menu__address text__body text__body--buttons">
          {selectedCity} {currentCity.address}
        </p>
      </div>
    </div>
  );
};
