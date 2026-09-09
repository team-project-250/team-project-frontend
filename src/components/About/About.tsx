import './About.scss';

export const About = () => (
  <section className="about" id='about'>
    <h2 className="about__title text__title text__title--basic">
      Про сервіс EasyRent
    </h2>

    <div className="about__content">
      <p className="about__description text__body text__body--how-to-rent">
        Easyrent — сервіс оренди професійної техніки для прибирання, який
        допомагає швидко та якісно впоратися з прибиранням квартир, будинків,
        офісів, комерційних і виробничих приміщень. У нас можна орендувати
        професійне обладнання для миття підлоги, чищення килимів, м'яких меблів
        та інших поверхонь без необхідності купувати дорогу техніку.
        <br />
        <br />
        Ми пропонуємо техніку для прибирання в оренду у Луцьку, Києві, Львові
        та Одесі. Обирайте необхідне обладнання під конкретне завдання та
        орендуйте його на потрібний термін. Професійна техніка дозволяє
        отримати результат, якого складно досягти звичайними побутовими
        засобами, а оренда допомагає заощадити кошти та місце для зберігання.
      </p>

      <div className="about__list-wrapper">
        <p className="about__list-title text__title text__title--secondary">
          Техніка підходить для:
        </p>

        <ul className="about__list">
          <li className="about__item">
            квартир та будинків
          </li>
          <li className="about__item">
            офісів
          </li>
          <li className="about__item">
            комерційних приміщень
          </li>
          <li className="about__item">
            виробничих приміщень
          </li>
        </ul>
      </div>
    </div>
  </section>
);