import { createContext, useContext } from 'react';

interface CityContextType {
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
