import classNames from 'classnames';
import { howToRentSteps } from '../../data/howToSteps';
import './HowToRent.scss';

export const HowToRent = () => {
  return (
    <section className="how-to-rent">
      <h2 className="how-to-rent__title text__title text__title--basic">
        Як орендувати техніку
      </h2>

      <div className="how-to-rent__steps">
        {howToRentSteps.map((step) => (
          <article className="how-to-rent__step" key={step.id}>
            <div className="how-to-rent__icon-wrapper">
              <span className={classNames(`icon ${step.icon}`)}></span>

              <span className="how-to-rent__number">{step.id}</span>
            </div>

            <h3 className="how-to-rent__step-title text__title--how-to-rent">
              {step.title}
            </h3>

            <p className="how-to-rent__description text__body--how-to-rent">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
