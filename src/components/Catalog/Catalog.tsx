import { useEffect, useMemo, useRef, useState } from 'react';
import { useCity } from '../../context/CityContext';
import type { EquipmentType } from '../../types/EquipmentType';
import { CatalogFilter } from '../CatalogFilter';
import { EquipmentCard } from '../EquipmentCard';
import './Catalog.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getEquipment } from '../../api/equipment';
import { mapEquipment } from '../../api/equipmentMapper';

type SortOption = 'rating' | 'priceAsc' | 'priceDesc' | 'name';

const orderingMap = {
  rating: '-rating',
  priceAsc: 'price_per_day',
  priceDesc: '-price_per_day',
  name: 'name',
} as const;

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { cities, selectedCity, setSelectedCity } = useCity();

  const categoryFromUrl = searchParams.get('category');

  const selectedCategories = useMemo(
    () => (categoryFromUrl ? categoryFromUrl.split(',') : []),
    [categoryFromUrl],
  );

  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [equipment, setEquipment] = useState<EquipmentType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const catalogListRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const city = cities.find((item) => item.slug === selectedCity);

    if (!city) {
      return;
    }

    getEquipment({
      city: city.slug,
      category: selectedCategories,
      availability: selectedAvailability[0] as 'available' | 'booked' | undefined,
      ordering: orderingMap[sortOption],
      page: currentPage,
      page_size: 6,
    })
      .then((data) => {
        setEquipment(data.results.map(mapEquipment));
        setTotalCount(data.count);
      })
      .catch(() => {
        setError('Не вдалося завантажити обладнання');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    cities,
    selectedCity,
    selectedCategories,
    selectedAvailability,
    sortOption,
    currentPage,
  ]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    catalogListRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [currentPage]);

  const itemsPerPage = 6;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setCurrentPage(1);

    const params = new URLSearchParams(searchParams);

    if (updatedCategories.length > 0) {
      params.set('category', updatedCategories.join(','));
    } else {
      params.delete('category');
    }

    setSearchParams(params);
  };

  const handleCityChange = (city: string) => {
    setCurrentPage(1);
    setSelectedCity(city);
  };

  const handleAvailabilityChange = (availability: string) => {
    setCurrentPage(1);
    setSelectedAvailability((prev) =>
      prev.includes(availability) ? [] : [availability],
    );
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSelectedAvailability([]);

    const params = new URLSearchParams(searchParams);

    params.delete('category');
    setSearchParams(params);
  };

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="catalog text" ref={catalogListRef}>
      <div className="catalog__content">
        <h1 className="catalog__title text__title">Каталог</h1>

        <div className="catalog__body">
          <CatalogFilter
            selectedCategories={selectedCategories}
            selectedCity={selectedCity}
            selectedAvailability={selectedAvailability}
            onCategoryChange={handleCategoryChange}
            onCityChange={handleCityChange}
            onAvailabilityChange={handleAvailabilityChange}
            isOpen={isFilterOpen}
            onReset={handleReset}
          />

          <div className="text catalog__list">
            <div className="catalog__sort">
              <button
                type="button"
                className="catalog__filter-button text text__body"
                onClick={() => setIsFilterOpen((prev) => !prev)}
              >
                <span
                  className={classNames(
                    'icon',
                    isFilterOpen ? 'icon--close' : 'icon--filter',
                  )}
                ></span>
              </button>

              <button
                type="button"
                className={`text catalog__sort-button ${
                  isSortOpen ? 'catalog__sort-button--open' : ''
                }`}
                onClick={() => setIsSortOpen((prev) => !prev)}
              >
                <span>
                  {sortOption === 'rating' && 'По рейтингу'}
                  {sortOption === 'priceAsc' && 'Від дешевих до дорогих'}
                  {sortOption === 'priceDesc' && 'Від дорогих до дешевих'}
                  {sortOption === 'name' && 'За назвою'}
                </span>

                <span className="icon icon--arrow"></span>
              </button>

              {isSortOpen && (
                <div className="catalog__sort-menu">
                  <button
                    className="catalog__sort-button--dropdown text"
                    type="button"
                    onClick={() => {
                      setSortOption('rating');
                      setIsSortOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    По рейтингу
                  </button>

                  <button
                    className="text catalog__sort-button--dropdown"
                    type="button"
                    onClick={() => {
                      setSortOption('priceAsc');
                      setIsSortOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Від дешевих до дорогих
                  </button>

                  <button
                    className="text catalog__sort-button--dropdown"
                    type="button"
                    onClick={() => {
                      setSortOption('priceDesc');
                      setIsSortOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Від дорогих до дешевих
                  </button>

                  <button
                    className="text catalog__sort-button--dropdown"
                    type="button"
                    onClick={() => {
                      setSortOption('name');
                      setIsSortOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    За назвою
                  </button>
                </div>
              )}
            </div>

            {equipment.length > 0 ? (
              equipment.map((item) => <EquipmentCard key={item.id} equipment={item} />)
            ) : (
              <p className="text__body">На жаль, товарів за вашим запитом не знайдено.</p>
            )}

            {totalPages > 1 && (
              <div className="catalog__pagination">
                <button
                  type="button"
                  className="catalog__pagination-arrows"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  <span className="catalog__pagination-arrows--left icon icon--arrow"></span>
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      className={classNames('text catalog__pagination-button', {
                        'catalog__pagination-button--active': currentPage === page,
                      })}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  className="catalog__pagination-arrows"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span className="catalog__pagination-arrows--right icon icon--arrow"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
