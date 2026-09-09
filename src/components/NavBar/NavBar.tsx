import React, { useState } from 'react';
import './NavBar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import classNames from 'classnames';
import { cities } from '../../data/cities';

type Props = {
  onClose?: () => void;
};

export const NavBar: React.FC<Props> = ({ onClose }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    onClose?.();

    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
      });

      return;
    }

    navigate(`/#${id}`);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCitiesOpen(false);
    onClose?.();
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <a
            href="#contacts"
            className="nav__link text__body text__body--small"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('contacts');
            }}
          >
            Контакти
          </a>
        </li>

        <li className="nav__list-item">
          <a
            href="#rental-terms"
            className="nav__link text__body text__body--small"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('rental-terms');
            }}
          >
            Умови бронювання
          </a>
        </li>

        <li className="nav__list-item">
          <a
            href="#about"
            className="nav__link text__body text__body--small"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('about');
            }}
          >
            Про нас
          </a>
        </li>

        <li className="nav__list-item">
          <Link
            to="/faq"
            className="nav__link text__body text__body--small"
            onClick={onClose}
          >
            Питання та відповіді
          </Link>
        </li>

        <li className="nav__list-item">
          <Link
            to="/delivery"
            className="nav__link text__body text__body--small"
            onClick={onClose}
          >
            Доставка і оплата
          </Link>
        </li>
      </ul>

      <div className="nav__cities">
        <button
          type="button"
          className="nav__cities-button text__body text__body--small"
          onClick={() => setIsCitiesOpen(!isCitiesOpen)}
        >
          <span className="icon icon--location"></span>

          <span>{selectedCity}</span>

          <span className="icon icon--arrow"></span>
        </button>

        <ul
          className={classNames('nav__cities-list', {
            'nav__cities-list--open': isCitiesOpen,
          })}
        >
          {cities.map((city) => (
            <li key={city} className="nav__cities-item">
              <button
                type="button"
                className="nav__cities-button text__body text__body--small"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
