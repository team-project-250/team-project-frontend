import { Button } from '../Button';
import './CallToAction.scss';

export const CallToAction = () => {
  return (
    <section className="call-to-action">
      <div className="call-to-action__inner">
        <div className="call-to-action__content">
          <div className="call-to-action__text">
            <h2 className="call-to-action__text-title text__title text__title--basic">
              Готові для генерального прибирання?
            </h2>

            <p className="call-to-action__text-description text__title text__title--utility">
              Отримайте знижку -10% за відгук у сторіс!
            </p>
          </div>

          <Button className='call-to-action__button'/>
        </div>
      </div>
    </section>
  );
};