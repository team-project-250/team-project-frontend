import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../../context/CityContext';
import { equipmentData } from '../../data/equipmentData';
import type { EquipmentType } from '../../types/EquipmentType';
import { CatalogFilter } from '../CatalogFilter';
import { EquipmentCard } from '../EquipmentCard';
import './Catalog.scss';
import classNames from 'classnames';

type SortOption = 'rating' | 'priceAsc' | 'priceDesc' | 'name';

export const Catalog = () => {
  const { selectedCity, setSelectedCity } = useCity();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const catalogListRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

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

  const equipment: EquipmentType[] = equipmentData[selectedCity] ?? [];

  const filteredEquipment = equipment.filter((item) => {
    const categoryMatches =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);

    const availabilityMatches =
      selectedAvailability.length === 0 ||
      (selectedAvailability.includes('available') && !item.availableUntil) ||
      (selectedAvailability.includes('booked') && Boolean(item.availableUntil));

    return categoryMatches && availabilityMatches;
  });

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        return b.rating - a.rating;

      case 'priceAsc':
        return a.pricePerDay - b.pricePerDay;

      case 'priceDesc':
        return b.pricePerDay - a.pricePerDay;

      case 'name':
        return a.name.localeCompare(b.name);

      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedEquipment.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEquipment = sortedEquipment.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setCurrentPage(1);

    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const handleCityChange = (city: string) => {
    setCurrentPage(1);
    setSelectedCity(city);
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(availability)
        ? prev.filter((item) => item !== availability)
        : [...prev, availability],
    );
  };

  const handleReset = () => {
    setCurrentPage(1);
    setSelectedCategories([]);
    setSelectedAvailability([]);
  };

  return (
    <section className="catalog text" ref={catalogListRef}>
      <div className="catalog__content">
        <div className="catalog__breadcrumbs text__body text__body--small">
          <Link className="catalog__breadcrumbs-link" to="/">
            Головна
          </Link>

          <span>/</span>

          <span>Каталог</span>
        </div>

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
                <span className="icon icon--filter"></span>
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

            {currentEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}

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
                  className="catalog__pagination-arrows "
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
