import { createContext, useContext } from 'react';

export interface City {
  id: number;
  name: string;
  slug: string;
  is_default: boolean;
  pickup_address: string;
  pickup_phone: string;
  working_hours: string;
}

interface CityContextType {
  cities: City[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const CityContext = createContext<CityContextType | undefined>(undefined);

export const useCity = () => {
  const context = useContext(CityContext);

  if (!context) {
    throw new Error('useCity must be used within CityProvider');
  }

  return context;
};
