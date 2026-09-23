import './Delivery.scss';

export const Delivery = () => {
  return (
    <div className="delivery">
      <h2 className="delivery__title text__title">Доставка і оплата</h2>

      <ul className="delivery__list">
        <li className="delivery__item">
          <strong>Оплата при отриманні</strong>
          <p>
            Оплата здійснюється в момент отримання техніки готівкою або безготівковим
            переказом
          </p>
        </li>

        <li className="delivery__item">
          <strong>Самовивіз або доставка</strong>
          <p>
            Самовивіз з нашого пункту видачі або зручна кур’єрська доставка по місту
            всього за 100 грн.
          </p>
        </li>
      </ul>
    </div>
  );
};
