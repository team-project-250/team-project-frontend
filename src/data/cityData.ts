export type CityData = {
  address: string;
  phone: string;
};

export const cityData: Record<string, CityData> = {
  Луцьк: {
    address: 'вул. Соборна 34а/2',
    phone: '+380 (50) 123-45-67',
  },

  Львів: {
    address: 'вул. ...',
    phone: '+380 (00) ...',
  },

  Київ: {
    address: 'вул. ...',
    phone: '+380 (00) ...',
  },

  Одеса: {
    address: 'вул. ...',
    phone: '+380 (00) ...',
  },
};
