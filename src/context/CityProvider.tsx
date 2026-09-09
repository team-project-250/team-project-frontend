import { useState } from 'react';
import type { ReactNode } from 'react';
import { cities } from '../data/cities';
import { CityContext } from './CityContext';

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};