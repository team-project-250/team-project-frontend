export type CityData = {
  address: string;
  phone: string;
};

export const cityData: Record<string, CityData> = {
  Луцьк: {
    address: 'вул. Соборна, 12',
    phone: '+380 (50) 123-45-67',
  },
  Львів: {
    address: 'вул. Шевченка, 8',
    phone: '+380 (67) 234-56-78',
  },
  Київ: {
    address: 'вул. Хрещатик, 24',
    phone: '+380 (93) 345-67-89',
  },
  Одеса: {
    address: 'вул. Дерибасівська, 5',
    phone: '+380 (66) 456-78-90',
  },
};
