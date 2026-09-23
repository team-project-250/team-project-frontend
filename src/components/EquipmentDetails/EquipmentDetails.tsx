import './EquipmentDetails.scss';

import { Link, useParams } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { equipmentData } from '../../data/equipmentData';
import { equipmentDetails } from '../../data/equipmentDetails';
import { useState } from 'react';
import { rentalTerms } from '../../data/rentalTerms';
import classNames from 'classnames';
import { EquipmentCarousel } from '../EquipmentCarousel';
import { BookingUnavailable } from '../BookingUnavailable';
import { QuickBooking } from '../QuickBooking';
import { useBooking } from '../../context/useBooking';
import dayjs from 'dayjs';

export const EquipmentDetails = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);

  const tabs = [
    { id: 'description', label: 'Опис' },
    { id: 'equipment', label: 'Комплектація' },
    { id: 'specifications', label: 'Характеристика' },
    { id: 'rental-terms', label: 'Умови оренди' },
    { id: 'delivery', label: 'Доставка і оплата' },
  ];

  const { id } = useParams();
  const { selectedCity } = useCity();
  const { bookings } = useBooking();

  const equipment = equipmentData[selectedCity]?.find(
    (item) => item.equipmentId === Number(id),
  );

  if (!equipment) {
    return <BookingUnavailable />;
  }

  const relatedEquipment =
    equipmentData[selectedCity]?.filter(
      (item) => item.equipmentId !== equipment.equipmentId,
    ) ?? [];

  const details = equipmentDetails[equipment.model];

  const availableCities = Object.entries(equipmentData)
    .filter(([, cityEquipment]) =>
      cityEquipment.some((item) => item.equipmentId === equipment.equipmentId),
    )
    .map(([city]) => city);

  const images = [equipment.image, ...(details?.images ?? [])];

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const booking = bookings.find(
    (item) => item.equipmentId === equipment.equipmentId && item.city === selectedCity,
  );

  const bookedUntil = booking?.dates[1];

  const bookingEndDate = bookedUntil ?? equipment.availableUntil;
  const isBooked = bookingEndDate && !dayjs(bookingEndDate).isBefore(dayjs(), 'day');

  const bookingLabel = isBooked
    ? `Заброньовано до ${dayjs(bookingEndDate).format('DD.MM')}`
    : 'Доступно';

  return (
    <section className="equipment-details">
      <div className="equipment-details__content">
        <h1 className="equipment-details__title-mobile text__title text__title--basic">
          {equipment.name} {equipment.model}
        </h1>

        <div className="equipment-details__gallery">
          <span className="equipment-details__badge-karcher text__body text__body--uppercase">
            оригінал karcher
          </span>

          <span
            className={classNames(
              'equipment-details__badge',
              'text',
              'text__body',
              'text__body--uppercase',
              {
                'equipment-details__badge--booked': isBooked,
              },
            )}
          >
            {bookingLabel}
          </span>

          <img
            src={images[activeImage]}
            alt={equipment.name}
            className="equipment-details__image"
          />

          <div className="equipment-details__thumbnails">
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="equipment-details__thumbnail-arrow"
                aria-label="prev-image"
              >
                <span className="icon icon--arrow-left"></span>
              </button>
            )}

            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setActiveImage(index)}
                className={classNames('equipment-details__thumbnail', {
                  'equipment-details__thumbnail--active': activeImage === index,
                })}
              >
                <img
                  className="equipment-details__thumbnail-img"
                  src={image}
                  alt={`${equipment.name} ${index + 1}`}
                />
              </button>
            ))}

            <button
              type="button"
              onClick={handleNextImage}
              className="equipment-details__thumbnail-arrow equipment-details__thumbnail-arrow--right"
              aria-label="next-image"
            >
              <span className="icon icon--arrow-left"></span>
            </button>
          </div>
        </div>

        <div className="equipment-details__info">
          <h1 className="equipment-details__title text__title text__title--basic">
            {equipment.name} {equipment.model}
          </h1>

          <p className="equipment-details__model text__body">
            Артикул: {equipment.model}
          </p>

          <ul className="equipment-details__list">
            <li className="equipment-details__availability">
              <span>В наявності: </span>

              {availableCities.length > 0 ? (
                <span>{availableCities.join(', ')}</span>
              ) : (
                <span>Наразі недоступно</span>
              )}
            </li>

            <li className="equipment-details__list-description">
              {equipment.description}
            </li>
          </ul>

          <p className="equipment-details__price text__title text__title--card">
            {equipment.pricePerDay} грн /{' '}
            <span className="text__body text__body--small">доба</span>
          </p>

          <div className="equipment-details__buttons text__body text__body--buttons">
            <Link
              to={`/booking/${equipment.equipmentId}`}
              className="text equipment-details__buttons-button"
            >
              Забронювати
            </Link>

            <button
              type="button"
              className="text equipment-details__buttons-button equipment-details__buttons-button--booking-for-one"
              onClick={() => setIsQuickBookingOpen(true)}
            >
              Забронювати в 1 клік
            </button>
          </div>
        </div>

        <div className="equipment-details__tabs text__body text__body--label">
          <button
            type="button"
            className="equipment-details__tabs-select"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>{tabs.find((tab) => tab.id === activeTab)?.label}</span>

            <span
              className={`equipment-details__tabs-arrow ${
                isDropdownOpen ? 'equipment-details__tabs-arrow--open' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="equipment-details__tabs-dropdown">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  className={`equipment-details__tabs-option ${
                    activeTab === tab.id ? 'equipment-details__tabs-option--active' : ''
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="equipment-details__tabs-list">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                className={`equipment-details__tab text ${
                  activeTab === tab.id ? 'equipment-details__tab--active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="equipment-details__tab-content text__body">
          {activeTab === 'description' && (
            <div className="equipment-details__description">
              <p className="equipment-details__description-desc">
                {equipment.description}
              </p>

              <section className="equipment-details__suitable">
                <h3 className="equipment-details__suitable-title text__body">
                  Для чого підходить
                </h3>

                <ul className="equipment-details__suitable-list">
                  {details?.suitableFor.map((item) => (
                    <li className="equipment-details__suitable-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {activeTab === 'equipment' && (
            <ul className="equipment-details__suitable-list">
              {details?.equipment.map((item) => (
                <li className="equipment-details__suitable-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specifications' && (
            <ul className="equipment-details__suitable-list">
              {details?.specifications.map((item) => (
                <li className="equipment-details__suitable-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'rental-terms' && (
            <ul className="equipment-details__suitable-list">
              {rentalTerms.map((term) => (
                <li key={term.number} className="equipment-details__suitable-item">
                  <strong>{term.title}</strong>
                  <p>{term.description}</p>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'delivery' && (
            <ul className="equipment-details__suitable-list">
              {rentalTerms
                .filter(
                  (term) =>
                    term.title === 'Оплата при отриманні' ||
                    term.title === 'Самовивіз або доставка',
                )
                .map((term) => (
                  <li key={term.number} className="equipment-details__suitable-item">
                    <strong>{term.title}</strong>
                    <p>{term.description}</p>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="equipment-details__carousel">
          <h2 className="equipment-details__carousel-title text__title text__title--basic">
            Інша техніка
          </h2>
          <a href="#/catalog" className="equipment-details__carousel-button">
            Перейти в каталог
          </a>
        </div>

        <EquipmentCarousel equipment={relatedEquipment} />
      </div>

      {isQuickBookingOpen && (
        <QuickBooking onClose={() => setIsQuickBookingOpen(false)} />
      )}
    </section>
  );
};
