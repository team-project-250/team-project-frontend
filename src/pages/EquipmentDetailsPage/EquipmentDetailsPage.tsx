import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EquipmentDetails } from '../../components/EquipmentDetails';
import { useState } from 'react';

export const EquipmentDetailsPage = () => {
  const { slug } = useParams();
  const [model, setModel] = useState('');

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Головна', path: '/' },
          { label: 'Каталог', path: '/catalog' },
          { label: model ?? '' },
        ]}
      />

      <EquipmentDetails key={slug} onModelLoad={setModel} />
    </>
  );
};
