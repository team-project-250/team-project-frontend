import React, { useState } from 'react';
import { Modal } from '../Modal';
import './QuickBooking.scss';

type Props = {
  onClose: () => void;
};

export const QuickBooking: React.FC<Props> = ({ onClose }) => {
  const [phone, setPhone] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError('Введіть коректний номер телефону');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <Modal onClose={onClose}>
      <div className="quick-booking">
        {isSubmitted ? (
          <div className="quick-booking__success">
            <span className="icon icon--success"></span>

            <h2 className="quick-booking__title text__title text__title--modal">
              Дякуємо!
            </h2>

            <p className="quick-booking__success-text text__body">
              Менеджер зв’яжеться з вами найближчим часом.
            </p>
          </div>
        ) : (
          <>
            <h2 className="quick-booking__title text__title text__title--modal">
              Забронювати в 1 клік
            </h2>

            <form className="quick-booking__form" onSubmit={handleSubmit}>
              <label
                htmlFor="quick-booking-phone"
                className="quick-booking__label text__body text__body--label"
              >
                Телефон:
                <input
                  id="quick-booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError('');
                  }}
                  placeholder="+ 380"
                />
              </label>

              {error && (
                <span className="quick-booking__error text__body text__body--error">
                  {error}
                </span>
              )}

              <button
                type="submit"
                className="quick-booking__button text text__body text__body--buttons"
                disabled={!isAgree}
              >
                Забронювати
              </button>

              <label className="quick-booking__agreement">
                <input
                  type="checkbox"
                  checked={isAgree}
                  onChange={(event) => setIsAgree(event.target.checked)}
                />

                <span className="text__body text__body--label">
                  Відправляючи заявку, я погоджуюся з умовами обробки персональних даних
                </span>
              </label>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
};
