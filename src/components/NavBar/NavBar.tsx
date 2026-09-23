import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { CitySelect } from '../CitySelect';

type Props = {
  onClose?: () => void;
};

export const NavBar: React.FC<Props> = ({ onClose }) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <Link
            to="/contacts"
            className="nav__link text__body text__body--small"
            onClick={onClose}
          >
            Контакти
          </Link>
        </li>

        <li className="nav__list-item">
          <Link
            to="/rental-terms"
            className="nav__link text__body text__body--small"
            onClick={onClose}
          >
            Умови бронювання
          </Link>
        </li>

        <li className="nav__list-item">
          <Link
            to="/about"
            className="nav__link text__body text__body--small"
            onClick={onClose}
          >
            Про нас
          </Link>
        </li>

        <li className="nav__list-item">
          <Link
            to="/questions"
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
