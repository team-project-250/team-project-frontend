import { Button } from '../Button';
import './Hero.scss';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__image"></div>

      <div className="hero__content">
        <h1 className="hero__title text__title">
          Оренда професійної
          <br />
          техніки для прибирання
        </h1>

        <p className="hero__description text__title text__title--utility">
          Професійні мийні пилососи, пароочисники та апарати високого тиску без купівлі
          дорогого обладнання
        </p>

        <div className="hero__features text__body text__body--label">
          <span className="hero__features-desc">Від 200 грн/добу</span>

          <span className="hero__features-desc">Хімія Kärcher включена</span>

          <span className="hero__features-desc">Доставка в межах міста</span>
        </div>

        <Button className="hero__button text__body--buttons" />
      </div>
    </section>
  );
};
