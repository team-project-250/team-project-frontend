import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';
import './BookingModal.scss';

type Props = {
  onClose: () => void;
};

export const BookingModal: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    onClose();
    navigate('/catalog');
  };

  return (
    <Modal onClose={onClose}>
      <div className="booking-modal">
        <span className="icon icon--success"></span>

        <h2 className="booking-modal__title text__title text__title--modal">
          Заявка прийнята!
        </h2>

        <p className="booking-modal__text text__body">
          Ми зв’яжемось з Вами протягом години
        </p>

        <button
          type="button"
          className="booking-modal__button text text__body text__body--buttons"
          onClick={handleCatalogClick}
        >
          Перейти в каталог
        </button>
      </div>
    </Modal>
  );
};
