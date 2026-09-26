import { useParams } from 'react-router-dom';
import { BookingUnavailable } from '../../components/BookingUnavailable';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { EquipmentDetails } from '../../components/EquipmentDetails';
import { useCity } from '../../context/CityContext';
import { equipmentData } from '../../data/equipmentData';

export const EquipmentDetailsPage = () => {
  const { selectedCity } = useCity();
  const { id } = useParams();

  const equipment = equipmentData[selectedCity]?.find(
    (item) => item.equipmentId === Number(id),
  );

  if (!equipment) {
    return <BookingUnavailable />;
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Головна', path: '/' },
          { label: 'Каталог', path: '/catalog' },
          { label: equipment.model },
        ]}
      />

      <EquipmentDetails key={id} />
    </>
  );
};
