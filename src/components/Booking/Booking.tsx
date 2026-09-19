import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './Booking.scss';
import { useCity } from '../../context/CityContext';
import { useBooking } from '../../context/useBooking';
import React, { useState } from 'react';
import { equipmentData } from '../../data/equipmentData';
import { BookingCalendar } from '../BookingCalendar';
import type { DateRange } from '../../types/DateRange';
import type { BookingFormData, BookingFormErrors } from '../../types/BookingForm';
import { validateBookingForm } from '../utils/bookingValidation';
import { CitySelect } from '../CitySelect';
import { BookingUnavailable } from '../BookingUnavailable';
import { BookingModal } from '../BookingModal';

export const Booking = () => {
  const { id } = useParams();
  const { selectedCity } = useCity();
  const { bookings, addBooking } = useBooking();

  const [selectedRange, setSelectedRange] = useState<DateRange>([null, null]);
  const [delivery, setDelivery] = useState<'pickup' | 'delivery'>('pickup');
  const [payment, setPayment] = useState<'cash' | 'iban'>('cash');
  const [isAgree, setIsAgree] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    tel: '',
    email: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({
    name: '',
    tel: '',
    email: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const equipment = equipmentData[selectedCity]?.find(
    (item) => item.equipmentId === Number(id),
  );

  if (!equipment) {
    return <BookingUnavailable />;
  }

  const rentalDays =
    selectedRange[0] && selectedRange[1]
      ? dayjs(selectedRange[1]).diff(dayjs(selectedRange[0]), 'day') + 1
      : 0;

  const deliveryPrice = delivery === 'delivery' ? 100 : 0;
  const totalPrice = equipment.pricePerDay * rentalDays + deliveryPrice;

  const getDaysLabel = (days: number) => {
    const lastTwoDigits = days % 100;
    const lastDigit = days % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'днів';
    }

    if (lastDigit === 1) {
      return 'день';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'дні';
    }

    return 'днів';
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateBookingForm(formData);

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((error) => !error);

    if (!isValid) {
      return;
    }

    if (!selectedRange[0] || !selectedRange[1]) {
      return;
    }

    addBooking({
      equipmentId: equipment.equipmentId,
      city: selectedCity,
      dates: selectedRange,
    });

    setIsModalOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  return (
    <section className="booking">
      <h2 className="booking__title text__title text__title--basic">Бронювання</h2>

      <div className="booking__content">
        <form className="booking__form" id="booking-form" onSubmit={handleSubmit}>
          <div className=" booking__form-content">
            <h3 className="booking__form-title text__title text__title--secondary">
              Дата бронювання
            </h3>
            <BookingCalendar
              availableUntil={equipment.availableUntil}
              bookings={bookings}
              equipmentId={equipment.equipmentId}
              city={selectedCity}
              onDateChange={setSelectedRange}
            />
          </div>

          <div className="booking__form-content booking__form-content--grid">
            <h3 className="booking__form-title text__title text__title--secondary">
              Контактні дані
            </h3>

            <label
              htmlFor="form-name"
              className="booking__form-label booking__form-label--name"
            >
              <p className="booking__form-description text__body text__body--label">
                Ім'я та прізвище
                <span className="booking__form-mark">*</span>
              </p>

              <input
                type="text"
                name="name"
                id="form-name"
                onChange={handleInputChange}
                value={formData.name}
                required
              />

              {errors.name && (
                <span className="booking__form-error text__body text__body--error">
                  {errors.name}
                </span>
              )}
            </label>

            <label
              htmlFor="form-tel"
              className="booking__form-label booking__form-label--tel"
            >
              <p className="booking__form-description text__body text__body--label">
                Номер телефону
                <span className="booking__form-mark">*</span>
              </p>

              <input
                type="tel"
                name="tel"
                id="form-tel"
                required
                value={formData.tel}
                onChange={handleInputChange}
                placeholder="+380"
              />

              {errors.tel && (
                <span className="booking__form-error text__body text__body--error">
                  {errors.tel}
                </span>
              )}
            </label>

            <div className="booking__form-label booking__form-label--city">
              <p className="booking__form-description text__body text__body--label">
                Місто
                <span className="booking__form-mark">*</span>
              </p>

              <CitySelect className="city-select--booking" />
            </div>

            <label
              htmlFor="form-email"
              className="booking__form-label booking__form-label--email"
            >
              <p className="booking__form-description text__body text__body--label">
                Пошта
                <span className="booking__form-mark">*</span>
              </p>

              <input
                type="email"
                name="email"
                id="form-email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />

              {errors.email && (
                <span className="booking__form-error text__body text__body--error">
                  {errors.email}
                </span>
              )}
            </label>
          </div>

          <div className="booking__form-content">
            <h3 className="booking__form-title text__title text__title--secondary">
              Спосіб доставки
            </h3>

            <label htmlFor="form-pickup" className="text__body text__body--label">
              <input
                type="radio"
                name="delivery"
                id="form-pickup"
                value="pickup"
                checked={delivery === 'pickup'}
                onChange={() => setDelivery('pickup')}
              />
              Самовивіз
            </label>

            <label htmlFor="form-delivery" className="text__body text__body--label">
              <input
                type="radio"
                name="delivery"
                id="form-delivery"
                value="delivery"
                checked={delivery === 'delivery'}
                onChange={() => setDelivery('delivery')}
              />
              Доставка по місту - 100грн
            </label>
          </div>

          <div className="booking__form-content">
            <h3 className="booking__form-title">Оплата</h3>

            <label htmlFor="form-cash" className="text__body text__body--label">
              <input
                type="radio"
                name="payment"
                id="form-cash"
                value="cash"
                checked={payment === 'cash'}
                onChange={() => setPayment('cash')}
              />
              Готівкою
            </label>

            <label htmlFor="form-payment" className="text__body text__body--label">
              <input
                type="radio"
                name="payment"
                id="form-payment"
                value="iban"
                checked={payment === 'iban'}
                onChange={() => setPayment('iban')}
              />
              По реквізитам IBAN
            </label>
          </div>
        </form>

        <div className="booking__card">
          <h3 className="booking__form-title text__title text__title--secondary">
            Моє замовлення
          </h3>

          <div className="booking__card-product">
            <img src={equipment.image} alt="" className="booking__card-image" />
            <p className="booking__card-name text__body text__body--label">
              {equipment.name}
              <br />
              {equipment.model}
            </p>
          </div>

          <div className="booking__card-ditails">
            <div className="booking__card-row">
              <p className="booking__card-text text__body text__body--label">
                Ціна за день
              </p>

              <p className="booking__card-text text__body text__body--label">
                {equipment.pricePerDay} грн
              </p>
            </div>

            <div className="booking__card-row">
              <p className="booking__card-text text__body text__body--label">
                Кількість днів
              </p>

              <p className="booking__card-text text__body text__body--label">
                {rentalDays} {getDaysLabel(rentalDays)}
              </p>
            </div>

            <div className="booking__card-row">
              <p className="booking__card-text text__body text__body--label">Доставка</p>

              <p className="booking__card-text text__body text__body--label">
                {deliveryPrice} грн
              </p>
            </div>

            <div className="booking__card-row">
              <p className="booking__card-text text__body text__body--label">Вартість</p>

              <p className="booking__card-text text__title text__title--secondary">
                {totalPrice} грн
              </p>
            </div>
          </div>

          <button
            type="submit"
            form="booking-form"
            className="booking__card-button text text__body text__body--buttons"
            disabled={!isAgree}
          >
            Забронювати
          </button>

          <label className="booking__card-agreement">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={(event) => setIsAgree(event.target.checked)}
              required
            />

            <span className="booking__card-checkbox text__body text__body--small">
              Відправляючи заявку, я погоджуюсь з умовами обробки персональних даніх
            </span>
          </label>
        </div>
      </div>

      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};
