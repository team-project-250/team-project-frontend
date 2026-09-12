import { useState } from 'react';
import './About.scss';

export const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="about" id="about">
      <div className="about__inner">
        <h2 className="about__title text__title text__title--basic">
          Про сервіс EasyRent
        </h2>

        <div className="about__content">
          <p className="about__description text__body text__body--how-to-rent">
            EasyRent — сервіс оренди професійної техніки для прибирання, який допомагає
            швидко та якісно впоратися з прибиранням квартир, будинків, офісів,
            комерційних і виробничих приміщень. У нас можна орендувати професійне
            обладнання для миття підлоги, чищення килимів, м'яких меблів та інших
            поверхонь без необхідності купувати дорогу техніку.
            <br />
            <br />
            Ми пропонуємо техніку для прибирання в оренду у Луцьку, Києві, Львові та
            Одесі. Обирайте необхідне обладнання під конкретне завдання та орендуйте його
            на потрібний термін. Професійна техніка дозволяє отримати результат, якого
            складно досягти звичайними побутовими засобами, а оренда допомагає заощадити
            кошти та місце для зберігання.
          </p>

          <div className="about__list-wrapper">
            <p className="about__list-title text__title text__title--secondary">
              Техніка підходить для:
            </p>

            <ul className="about__list text__body">
              <li className="about__item">Плит та витяжок</li>
              <li className="about__item">Важкодоступних місць та кутів</li>
              <li className="about__item">
                Підлоги будь-якого типу (плитка, ламінат, лінолеум){' '}
              </li>
              <li className="about__item">
                Вікон, дзеркал, скляних поверхнь, душових кабін та сантехнік
              </li>
              <li className="about__item">Дитячих іграшок (дезінфекція)</li>
              <li className="about__item">Плитки та міжплиткових швів</li>
            </ul>
          </div>
        </div>

        {isExpanded && (
          <div className="about__details">
            <p className="about__details-text text__body">
              EasyRent допомагає орендувати професійне обладнання без зайвих витрат та
              складнощів. Ми підбираємо техніку під конкретні потреби клієнта, щоб кожне
              прибирання було максимально ефективним.
              <br />
              <br />
              Перед отриманням обладнання ви можете отримати консультацію щодо вибору
              техніки та дізнатися про особливості її використання. Усе обладнання
              проходить перевірку перед передачею в оренду, тому ви можете бути впевнені у
              його справності та готовності до роботи.
              <br />
              <br />
              Орендуйте лише те, що потрібно саме зараз, без необхідності купувати,
              обслуговувати та зберігати професійну техніку. EasyRent — простий спосіб
              отримати професійний результат тоді, коли він вам потрібен.
            </p>
          </div>
        )}

        <button
          type="button"
          className="about__button text text__body text__body--buttons"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Сховати' : 'Детальніше'}
        </button>
      </div>
    </section>
  );
};
