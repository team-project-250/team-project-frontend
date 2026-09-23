import './Questions.scss';

export const Questions = () => {
  return (
    <div className="questions text">
      <h2 className="questions__title text__title">Питання та відповіді</h2>

      <ul className="questions__list">
        <li className="questions__item">
          <strong>Чи потрібна застава?</strong>

          <p className="text text__body">
            Так, для більшості моделей передбачена застава. Її розмір залежить від типу
            обладнання та повертається після перевірки техніки.
          </p>
        </li>

        <li className="questions__item">
          <strong>На який мінімальний термін можна орендувати техніку?</strong>

          <p className="text text__body">
            Мінімальний термін оренди — 1 доба. За потреби ви можете продовжити оренду,
            попередньо повідомивши нашого менеджера.
          </p>
        </li>

        <li className="questions__item">
          <strong>Що входить у комплект?</strong>

          <p className="text text__body">
            Кожна одиниця техніки видається з усіма необхідними насадками, шлангами та
            аксесуарами для повноцінної роботи. Комплектація вказана в описі товару.
          </p>
        </li>

        <li className="questions__item">
          <strong>Чи перевіряється техніка перед видачею?</strong>

          <p className="text text__body">
            Так. Усе обладнання проходить очищення, технічний огляд та перевірку
            працездатності перед кожною орендою.
          </p>
        </li>

        <li className="questions__item">
          <strong>У яких містах працює Easyrent?</strong>

          <p className="text text__body">
            Ми надаємо послуги оренди у Луцьку, Києві, Львові та Одесі. Ви можете
            забронювати техніку в одному з наших пунктів видачі.
          </p>
        </li>

        <li className="questions__item">
          <strong>Я не знаю, яку техніку обрати. Що робити?</strong>

          <p className="text text__body">
            Просто опишіть, що саме потрібно прибрати: диван, килим, салон авто, плитку чи
            фасад. Ми безкоштовно підберемо оптимальну модель під ваше завдання.
          </p>
        </li>
      </ul>
    </div>
  );
};
