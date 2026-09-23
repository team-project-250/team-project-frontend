import { About } from '../../components/About';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalog } from '../../components/Catalog';

export const CatalogPage = () => {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Головна', path: '/' }, { label: 'Каталог' }]} />

      <Catalog />

      <About />
    </>
  );
};
