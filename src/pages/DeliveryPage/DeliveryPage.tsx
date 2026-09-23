import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Delivery } from '../../components/Delivery';

export const DeliveryPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[{ label: 'Головна', path: '/' }, { label: 'Доставка і оплата' }]}
      />
      <Delivery />
    </>
  );
};
