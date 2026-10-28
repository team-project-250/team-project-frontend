import React, { useState } from 'react';
import { Modal } from '../Modal';
import { createCallbackRequest } from '../../api/booking';
import './QuickBooking.scss';

type Props = {
  onClose: () => void;
  isAvailable: boolean;
  equipmentSlug: string;
};

export const QuickBooking: React.FC<Props> = ({
  onClose,
  isAvailable,
  equipmentSlug,
}) => {
  const [phone, setPhone] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAvailable || isSubmitting) {
      return;
    }

    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError('Введіть коректний номер телефону');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await createCallbackRequest({
        phone,
        equipment: equipmentSlug,
      });

      setIsSubmitted(true);
    } catch {
      setError('Не вдалося надіслати заявку. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
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
              {!isAvailable && (
                <p className="text__body">Це обладнання недоступне у вибраному місті.</p>
              )}

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
                disabled={!isAgree || !isAvailable || isSubmitting}
              >
                {isSubmitting ? 'Надсилаємо...' : 'Забронювати'}
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
