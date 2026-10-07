import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EquipmentDetails } from '../../components/EquipmentDetails';

export const EquipmentDetailsPage = () => {
  const { slug } = useParams();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Головна', path: '/' },
          { label: 'Каталог', path: '/catalog' },
          { label: slug ?? '' },
        ]}
      />

      <EquipmentDetails key={slug} />
    </>
  );
};
