import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CityContext, type City } from './CityContext';

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cities/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не вдалося завантажити міста');
        }

        return response.json();
      })
      .then((data: City[]) => {
        setCities(data);

        const defaultCity = data.find((city) => city.is_default);

        if (defaultCity) {
          setSelectedCity(defaultCity.name);
        }
      })
      .catch((error) => {
        console.error('Помилка завантаження міст:', error);
      });
  }, []);

  if (!selectedCity) {
    return <div>Завантаження...</div>;
  }

  return (
    <CityContext.Provider value={{ cities, selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
