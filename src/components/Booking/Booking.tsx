import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './Booking.scss';
import { useCity } from '../../context/CityContext';
import { useBooking } from '../../context/useBooking';
import React, { useEffect, useState } from 'react';
import { getEquipmentDetails } from '../../api/equipment';
import { BookingCalendar } from '../BookingCalendar';
import type { DateRange } from '../../types/DateRange';
import type { BookingFormData, BookingFormErrors } from '../../types/BookingForm';
import { validateBookingForm } from '../utils/bookingValidation';
import { CitySelect } from '../CitySelect';
import { BookingUnavailable } from '../BookingUnavailable';
import { createBooking } from '../../api/booking';

export const Booking = () => {
  const { id } = useParams();
  const [equipment, setEquipment] = useState<Awaited<
    ReturnType<typeof getEquipmentDetails>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!id) {
      return () => {
        isActive = false;
      };
    }

    getEquipmentDetails(id)
      .then((data) => {
        if (isActive) {
          setEquipment(data);
        }
      })
      .catch(() => {
        if (isActive) {
          setLoadError(true);
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  const { selectedCity } = useCity();
  const { bookings, addBooking } = useBooking();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<DateRange>([null, null]);
  const [delivery, setDelivery] = useState<'pickup' | 'delivery'>('pickup');
  const [payment, setPayment] = useState<'cash' | 'iban'>('cash');
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    tel: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({
    name: '',
    tel: '',
    email: '',
    address: '',
  });

  if (isLoading) {
    return <p>Завантаження обладнання...</p>;
  }

  if (loadError || !equipment) {
    return <BookingUnavailable />;
  }

  const rentalDays =
    selectedRange[0] && selectedRange[1]
      ? dayjs(selectedRange[1]).diff(dayjs(selectedRange[0]), 'day') + 1
      : 0;

  const deliveryPrice = delivery === 'delivery' ? 100 : 0;

  const totalPrice = Number(equipment.price_per_day) * rentalDays + deliveryPrice;

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

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateBookingForm(formData, delivery);

    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((error) => !error);

    if (!isValid) {
      return;
    }

    if (!selectedRange[0] || !selectedRange[1]) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingResponse = await createBooking({
        equipment: equipment.slug,
        city: selectedCity,
        customer_name: formData.name.trim(),
        customer_phone: formData.tel,
        customer_email: formData.email.trim(),
        start_date: dayjs(selectedRange[0]).format('YYYY-MM-DD'),
        end_date: dayjs(selectedRange[1]).format('YYYY-MM-DD'),
        delivery_method: delivery === 'delivery' ? 'courier' : 'pickup',
        delivery_address: delivery === 'delivery' ? formData.address.trim() : '',
        payment_method: payment === 'iban' ? 'transfer' : 'cash',
      });

      addBooking({
        equipmentId: equipment.id,
        city: selectedCity,
        dates: selectedRange,
      });

      navigate('/booking-success', {
        state: { booking: bookingResponse },
      });
    } catch (error) {
      console.error('Не вдалося створити бронювання:', error);
      alert('Не вдалося оформити бронювання. Перевірте дані та спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
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
              bookings={bookings}
              equipmentId={equipment.id}
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

            {delivery === 'delivery' && (
              <label
                className="booking__form-label booking__form-label--address"
                htmlFor="form-address"
              >
                <input
                  type="text"
                  name="address"
                  id="form-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Введіть адресу"
                  required
                />

                {errors.address && (
                  <span className="booking__form-error text__body text__body--error">
                    {errors.address}
                  </span>
                )}
              </label>
            )}
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
            <img
              src={equipment.main_image ?? undefined}
              alt={equipment.name}
              className="booking__card-image"
            />
            <p className="booking__card-name text__body text__body--label">
              {equipment.name}
            </p>
          </div>

          <div className="booking__card-ditails">
            <div className="booking__card-row">
              <p className="booking__card-text text__body text__body--label">
                Ціна за день
              </p>

              <p className="booking__card-text text__body text__body--label">
                {Number(equipment.price_per_day)} грн
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
            disabled={!isAgree || isSubmitting}
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
              Відправляючи заявку, я погоджуюсь з умовами обробки персональних даних
            </span>
          </label>
        </div>
      </div>
    </section>
  );
};
