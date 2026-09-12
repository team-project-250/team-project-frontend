export type CityData = {
  address: string;
  phone: string;
};

export const cityData: Record<string, CityData> = {
  Луцьк: {
    address: 'вул. Соборна, 34а/2',
    phone: '+380 (50) 123-45-67',
  },
  Львів: {
    address: 'вул. Городоцька, 112',
    phone: '+380 (67) 234-56-78',
  },
  Київ: {
    address: 'вул. Велика Васильківська, 72',
    phone: '+380 (93) 345-67-89',
  },
  Одеса: {
    address: 'вул. Пантелеймонівська, 25',
    phone: '+380 (66) 456-78-90',
  },
};
