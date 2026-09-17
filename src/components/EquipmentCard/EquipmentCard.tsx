import classNames from 'classnames';
import type { EquipmentType } from '../../types/EquipmentType';
import './EquipmentCard.scss';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { useBooking } from '../../context/useBooking';

type Props = {
  equipment: EquipmentType;
};

export const EquipmentCard: React.FC<Props> = ({ equipment }) => {
  const navigate = useNavigate();

  const { selectedCity } = useCity();
  const { bookings } = useBooking();

  const booking = bookings.find(
    (item) => item.equipmentId === equipment.id && item.city === selectedCity,
  );

  const bookedUntil = booking?.dates[1];

  const handleBookingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    navigate(`/catalog/${equipment.id}?booking=true`);
  };

  return (
    <article
      className="equipment-card"
      onClick={() => navigate(`/catalog/${equipment.id}`)}
    >
      <span
        className={classNames(
          'equipment-card__badge',
          'text',
          'text__body',
          'text__body--uppercase',
          {
            'equipment-card__badge--booked': equipment.availableUntil || booking,
          },
        )}
      >
        {equipment.availableUntil
          ? `Заброньовано до ${equipment.availableUntil}`
          : booking
            ? `Заброньовано до ${bookedUntil}`
            : 'Доступно'}
      </span>

      <div className="equipment-card__image-wrapper">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="equipment-card__image"
        />
      </div>

      <div className="equipment-card__content">
        <p className="equipment-card__name text__body">{equipment.name}</p>

        <p className="equipment-card__model text__body">{equipment.model}</p>
      </div>

      <p className="equipment-card__price text__title text__title--utility">
        {equipment.pricePerDay} грн/
        <span className="text__body text__body--small">доба</span>
      </p>

      <button
        className="equipment-card__button text text__body text__body--buttons"
        onClick={handleBookingClick}
      >
        Забронювати
      </button>
    </article>
  );
};
