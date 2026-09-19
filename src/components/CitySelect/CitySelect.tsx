import React, { useState } from 'react';
import classNames from 'classnames';
import { useCity } from '../../context/CityContext';
import { cities } from '../../data/cities';
import './CitySelect.scss';

type Props = {
  onSelect?: () => void;
  className?: string;
};

export const CitySelect: React.FC<Props> = ({ onSelect, className }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
    onSelect?.();
  };

  return (
    <div className={`city-select ${className}`}>
      <button
        type="button"
        className="city-select__button text text__body text__body--label"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="icon icon--location city-select__icon"></span>

        <span className="city-select__name">{selectedCity}</span>

        <span
          className={classNames('city-select__arrow icon icon--arrow', {
            'city-select__arrow--open': isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className="city-select__list">
          {cities.map((city) => (
            <li key={city} className="city-select__item">
              <button
                type="button"
                className="city-select__option text text__body text__body--label"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
