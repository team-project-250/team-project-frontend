import { About } from '../../components/About';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const AboutPage = () => {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Головна', path: '/' }, { label: 'Про нас' }]} />
      <About />
    </>
  );
};
