import { CallToAction } from '../../components/CallToAction';
import { Hero } from '../../components/Hero';
import { MainContent } from '../../components/MainContent/MainContent';
import { RentalTerms } from '../../components/RentalTerms/RentalTerms';
import { Reviews } from '../../components/Reviews';

export const HomePage = () => {
  return (
    <>
      <Hero />

      <MainContent />

      <RentalTerms />

      <Reviews />

      <CallToAction />
    </>
  );
};
