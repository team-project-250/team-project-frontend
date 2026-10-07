import type { EquipmentType } from '../types/EquipmentType';
import type { EquipmentApiItem } from './equipment';

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
      ? item.availability.available_from ?? undefined
      : undefined,
});
