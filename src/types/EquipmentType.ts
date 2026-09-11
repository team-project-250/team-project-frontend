export interface EquipmentType {
  id: number;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
  description: string;
  category: string;
  rating: number;
  availableUntil?: string;
}
