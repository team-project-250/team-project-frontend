import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingUnavailable.scss';

export const BookingUnavailable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-unavailable">
      <h1 className="booking-unavailable__title">Обладнання недоступне</h1>

      <p className="booking-unavailable__text">
        Це обладнання відсутнє у вибраному місті. Оберіть інше обладнання або змініть
        місто.
      </p>

      <button
        type="button"
        className="booking-unavailable__button text text__body text__body--buttons"
        onClick={() => navigate('/catalog')}
      >
        Перейти до каталогу
      </button>
    </div>
  );
};
