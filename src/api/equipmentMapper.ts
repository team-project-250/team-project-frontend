import type { EquipmentType } from '../types/EquipmentType';
import type { EquipmentApiItem } from './equipment';

export const getLastBookedDay = (availableFrom: string | null): string | undefined => {
  if (!availableFrom) {
    return undefined;
  }

  const [year, month, day] = availableFrom.split('-').map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  const date = new Date(Date.UTC(year, month - 1, day - 1));

  const formattedYear = date.getUTCFullYear();
  const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
  const formattedDay = String(date.getUTCDate()).padStart(2, '0');

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

export const mapEquipment = (item: EquipmentApiItem): EquipmentType => ({
  id: item.id,
  equipmentId: item.id,
  slug: item.slug,
  name: item.name,
  model: item.name,
  image: item.main_image ?? '',
  pricePerDay: Number(item.price_per_day),
  description: '',
  category: item.category.name,
  rating: Number(item.rating),
  availableUntil:
    item.availability.status === 'booked'
      ? getLastBookedDay(item.availability.available_from)
      : undefined,
});
