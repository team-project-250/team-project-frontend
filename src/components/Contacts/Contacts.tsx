import { useCity } from '../../context/CityContext';
import { cityData } from '../../data/cityData';
import './Contacts.scss';

export const Contacts = () => {
  const { selectedCity } = useCity();
  const currentCity = cityData[selectedCity];

  if (!currentCity) {
    return null;
  }

  return (
    <div className="contacts">
      <h2 className="contacts__title text__title">Контакти</h2>

      <div className="contacts__content">
        <p className="contacts__content-description text__body">
          Маєте запитання щодо оренди техніки або потрібна допомога з вибором обладнання?
          Команда Easyrent завжди готова допомогти. Ми підкажемо, яка техніка найкраще
          підійде саме для ваших задач, розповімо про умови оренди та допоможемо швидко
          оформити бронювання.
        </p>

        <div className="contacts__content-inner">
          <div className="contacts__content-main">
            <h3 className="contacts__content-title text__title text__title--secondary">
              Як з нами зв'язатися?
            </h3>

            <ul className="contacts__content-list text__body text__body-label">
              <li className="contacts__content-item">
                <strong>Телефон:</strong>

                <a href={`tel:${currentCity.phone}`} className="contacts__content-link">
                  {currentCity.phone}
                </a>
              </li>

              <li className="contacts__content-item">
                <strong>Email:</strong>

                <a href="mailto:info@easyrent.ua" className="contacts__content-link">
                  info@easyrent.ua
                </a>
              </li>

              <li className="contacts__content-item">
                <strong>Графік роботи:</strong>

                <p className="contacts__content-description">Пн-Нд: Цілодобово 24/7</p>
              </li>
            </ul>
          </div>

          <div className="contacts__content-main">
            <h3 className="contacts__content-title text__body text__title text__title--secondary">
              Наші міста
            </h3>

            <p className="contacts__content-description text__body text__body--small">
              Ми працюємо у чотирьох містах України:
            </p>

            <ul className="contacts__content-list text__body text__body-small">
              <li className="contacts__content-item contacts__content-cities">Луцьк</li>
              <li className="contacts__content-item contacts__content-cities">Києв</li>
              <li className="contacts__content-item contacts__content-cities">Львів</li>
              <li className="contacts__content-item contacts__content-cities">Одеса</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
