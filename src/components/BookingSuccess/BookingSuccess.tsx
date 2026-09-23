import { useNavigate } from 'react-router-dom';
import './BookingSuccess.scss';

export const BookingSuccess = () => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  return (
    <div className="booking-success">
      <span className="icon icon--success"></span>

      <h2 className="booking-success__title text__title text__title--modal">
        Заявка прийнята!
      </h2>

      <p className="booking-success__text text__body">
        Ми зв’яжемось з Вами протягом години
      </p>

      <button
        type="button"
        className="booking-success__button text text__body text__body--buttons"
        onClick={handleCatalogClick}
      >
        Перейти в каталог
      </button>
    </div>
  );
};
