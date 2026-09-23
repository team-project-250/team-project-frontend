import { useEffect, useRef, useState } from 'react';
import { useCity } from '../../context/CityContext';
import { cityData } from '../../data/cityData';
import { Button } from '../Button';
import './Header.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MobileMenu } from '../MobileMenu';
import { MegaMenu } from '../MegaMenu';

export const Header = () => {
  const { selectedCity } = useCity();
  const currentCity = cityData[selectedCity];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!currentCity) {
    return null;
  }

  return (
    <header className="header">
      <div className="header__main">
        <div className="header__phone">
          <span className="icon icon--phone"></span>

          <a
            href={`tel:${currentCity.phone.replace(/\D/g, '')}`}
            className="header__phone-link text__body text__body--small"
          >
            {currentCity.phone}
          </a>
        </div>
        <div className="header__main-content">
          <Link to="/" className="icon--logo header__main-logo" aria-label="Logo" />

          <div className="header__main-wrapper" ref={megaMenuRef}>
            <button
              type="button"
              className={classNames('header__main-catalog', {
                'header__main-catalog--active': isMegaMenuOpen,
              })}
              onClick={() => setIsMegaMenuOpen((prev) => !prev)}
            >
              <span
                className={classNames('header__main-menu icon', {
                  'icon--burger-white': isMegaMenuOpen,
                  'icon--burger': !isMegaMenuOpen,
                })}
              ></span>
              <span className="header__main-button text__body text__body--buttons">
                Каталог
              </span>
            </button>

            {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
          </div>

          <button
            type="button"
            className="header__main-catalog-mobile text"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="header__main-menu icon icon--burger"></span>
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

      <div className={classNames('page__menu', { 'page__menu--target': isMenuOpen })}>
        <button
          type="button"
          className="header__menu-close"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="icon icon--close"></span>
        </button>

        <MobileMenu onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};
