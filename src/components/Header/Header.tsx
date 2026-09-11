import { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { cityData } from '../../data/cityData';
import { Button } from '../Button';
import { NavBar } from '../NavBar';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { selectedCity } = useCity();
  const currentCity = cityData[selectedCity];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!currentCity) {
    return null;
  }

  return (
    <header className="header">
      <div className="header__nav">
        <NavBar />
      </div>

      <div className="header__main">
        <div className="header__main-content">
          <Link to="/" className="icon--logo header__main-logo" aria-label="Logo" />

          <button
            type="button"
            className="header__main-catalog text"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="header__main-menu icon icon--burger"></span>
            <span className="header__main-button text__body text__body--buttons">
              Каталог
            </span>
          </button>

          <div className="header__main-city">
            <p className="text__title text__title--secondary">{selectedCity}</p>

            <p className="header__main-text text__body text__body--small">
              {currentCity.address}
            </p>
          </div>

          <div className="header__main-contact">
            <a
              href="tel:+30501234567"
              className="header__main-phone text__title text__title--secondary"
            >
              {currentCity.phone}
            </a>

            <p className="header__main-text text__body text__body--small">
              Пн-Нд: Цілодобово 24/7
            </p>
          </div>

          <Button className="header__main-button text__body text__body--buttons" />
        </div>
      </div>

      <div className={`page__menu ${isMenuOpen ? 'page__menu--target' : ''}`}>
        <button
          type="button"
          className="header__menu-close"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="icon icon--close"></span>
        </button>

        <NavBar onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};
