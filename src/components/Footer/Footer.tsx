import { Link, useNavigate } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { cityData } from '../../data/cityData';
import './Footer.scss';

type Props = {
  onClose?: () => void;
};

export const Footer: React.FC<Props> = ({ onClose }) => {
  const { selectedCity } = useCity();
  const currentCity = cityData[selectedCity];

  const navigate = useNavigate();

  if (!currentCity) {
    return null;
  }

  const scrollToSection = (id: string) => {
    onClose?.();

    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
      });

      return;
    }

    navigate(`/#${id}`);
  };

  return (
    <footer className="footer" id="contacts">
      <div className="footer__inner">
        <div className="footer__content">
          <div className="footer__brand">
            <Link
              to="/"
              className="icon icon--logo-footer footer__logo"
              aria-label="Logo"
            />

            <div className="footer__address">
              <div className="footer__address-wrapper">
                <a href="#" className="footer__address-icon icon icon--instagram" />
              </div>

              <p className="footer__address-description text__body text__body--how-to-rent">
                © 2026 Easyrent.
                <br />
                Всі права захищені
              </p>
            </div>
          </div>

          <nav className="footer__nav text__body text__body--how-to-rent">
            <Link to="/catalog">Каталог</Link>

            <a
              href="#contacts"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('contacts');
              }}
            >
              Контакти
            </a>

            <a
              href="#rental-terms"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('rental-terms');
              }}
            >
              Умови бронювання
            </a>
          </nav>

          <nav className="footer__nav text__body text__body--how-to-rent">
            <a
              href="#about"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('about');
              }}
            >
              Про нас
            </a>

            <Link to="/faq">Питання та відповіді</Link>
            <Link to="/delivery">Доставка і оплата</Link>
          </nav>

          <div className="footer__contacts">
            <div className="footer__contacts-block">
              <span className="icon icon--phone-yellow"></span>

              <div className="footer__contacts-wrapper">
                <a
                  href={`tel:${currentCity.phone.replace(/\D/g, '')}`}
                  className="footer__contacts-phone text__title text__title--secondary"
                >
                  {currentCity.phone}
                </a>

                <p className="footer__contacts-description">Пн-Нд: Цілодобово 24/7</p>
              </div>
            </div>

            <div className="footer__contacts-block">
              <span className="icon icon--location-yellow"></span>

              <div className="footer__contacts-wrapper">
                <p className="footer__contacts-description text__title text__title--secondary">
                  м. {selectedCity}
                </p>

                <p className="footer__contacts-description">{currentCity.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
