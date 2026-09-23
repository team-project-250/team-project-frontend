import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Contacts } from '../../components/Contacts';

export const ContactsPage = () => {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Головна', path: '/' }, { label: 'Контакти' }]} />
      <Contacts />
    </>
  );
};
