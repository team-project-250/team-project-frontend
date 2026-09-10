import { rentalTerms } from '../../data/rentalTerms';
import { Button } from '../Button';
import './RentalTerms.scss';

export const RentalTerms = () => {
  return (
    <section className="rental-terms" id="rental-terms">
      <div className="rental-terms__inner">
        <div className="rental-terms__top">
          <div className="rental-terms__text">
            <p className="rental-terms__text-description text__body text__body--uppercase">
              прозорий сервіс
            </p>
            <h2 className="rental-terms__text-title text__title text__title--basic">
              Умови оренди
            </h2>
          </div>

          <Button className="text__body text__body--buttons" />
        </div>

        <div className="rental-terms__list">
          {rentalTerms.map((term) => (
            <article className="rental-terms__item" key={term.number}>
              <span className="rental-terms__number text__body text__body--number">
                {term.number}
              </span>

              <h3 className="rental-terms__item-title text__title text__title--secondary">
                {term.title}
              </h3>

              <p className="rental-terms__description text__body text__body--how-to-rent">
                {term.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
