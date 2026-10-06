import { useCity } from '../../context/CityContext';
import './Contacts.scss';

export const Contacts = () => {
  const { cities, selectedCity } = useCity();
  const currentCity = cities.find((city) => city.name === selectedCity);

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

                <a
                  href={`tel:${currentCity.pickup_phone}`}
                  className="contacts__content-link"
                >
                  {currentCity.pickup_phone}
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

                <p className="contacts__content-description">
                  {currentCity.working_hours}
                </p>
              </li>
            </ul>
          </div>

          <div className="contacts__content-main">
            <h3 className="contacts__content-title text__body text__title text__title--secondary">
              Наші міста
            </h3>

            <p className="contacts__content-description text__body text__body--small">
              Ми працюємо у містах України:
            </p>

            <ul className="contacts__content-list text__body text__body-small">
              {cities.map((city) => (
                <li
                  key={city.id}
                  className="contacts__content-item contacts__content-cities"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
