import type { EquipmentType } from '../../types/EquipmentType';
import './EquipmentCard.scss';

type Props = {
  equipment: EquipmentType;
}

export const EquipmentCard: React.FC<Props> = ({ equipment }) => {
  return (
    <article className="equipment-card">
      <span className="equipment-card__badge text__body text__body--uppercase">
        Доступно
      </span>

      <div className="equipment-card__image-wrapper">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="equipment-card__image"
        />
      </div>

      <div className="equipment-card__content">
        <p className="equipment-card__name text__body text__body--small">
          {equipment.name}
        </p>

        <p className="equipment-card__model">
          {equipment.model}
        </p>

      </div>

      <p className="equipment-card__price text__title text__title--utility">
        {equipment.pricePerDay} грн/<span className='text__body text__body--small'>доба</span>
      </p>

      <button className="equipment-card__button text__body text__body--buttons">
        <span className="icon icon--calendar"></span>
        Забронювати
      </button>
    </article>
  );
};