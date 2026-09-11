import { cities } from '../../data/cities';
import { equipmentCategories } from '../../data/equipmentCategories';
import './CatalogFilter.scss';

type CatalogFilterProps = {
  selectedCategories: string[];
  selectedCity: string;
  selectedAvailability: string[];
  onCategoryChange: (category: string) => void;
  onCityChange: (city: string) => void;
  onAvailabilityChange: (availability: string) => void;
  onReset: () => void;
};

export const CatalogFilter = ({
  selectedCategories,
  selectedCity,
  selectedAvailability,
  onCategoryChange,
  onCityChange,
  onAvailabilityChange,
  onReset,
}: CatalogFilterProps) => {
  return (
    <aside className="catalog-filter">
      <div className="catalog-filter__group">
        <h2 className="catalog-filter__title text__title text__title-how-to-rent">
          Категорії
        </h2>

        <div className="catalog-filter__options">
          {equipmentCategories.map((category) => (
            <label className="catalog-filter__option" key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
              />

              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="catalog-filter__group">
        <h2 className="catalog-filter__title text__title text__title-how-to-rent">
          Місто
        </h2>

        <div className="catalog-filter__options">
          {cities.map((city) => (
            <label className="catalog-filter__option" key={city}>
              <input
                type="radio"
                name="city"
                checked={selectedCity === city}
                onChange={() => onCityChange(city)}
              />

              <span>{city}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="catalog-filter__group">
        <h2 className="catalog-filter__title text__title text__title-how-to-rent">
          Наявність
        </h2>

        <div className="catalog-filter__options">
          <label className="catalog-filter__option">
            <input
              type="checkbox"
              checked={selectedAvailability.includes('available')}
              onChange={() => onAvailabilityChange('available')}
            />

            <span>Доступно</span>
          </label>

          <label className="catalog-filter__option">
            <input
              type="checkbox"
              checked={selectedAvailability.includes('booked')}
              onChange={() => onAvailabilityChange('booked')}
            />

            <span>Заброньовано</span>
          </label>
        </div>
      </div>

      <button type="button" className="text catalog-filter__reset" onClick={onReset}>
        Скинути фільтри
      </button>
    </aside>
  );
};
