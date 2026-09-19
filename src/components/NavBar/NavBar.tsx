import React from 'react';
import './NavBar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CitySelect } from '../CitySelect';

type Props = {
  onClose?: () => void;
};

export const NavBar: React.FC<Props> = ({ onClose }) => {
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

      <CitySelect onSelect={onClose} />
    </nav>
  );
};
