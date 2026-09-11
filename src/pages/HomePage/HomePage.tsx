import { About } from '../../components/About';
import { CallToAction } from '../../components/CallToAction';
import { Hero } from '../../components/Hero';
import { HowToRent } from '../../components/HowToRent';
import { PopularEquipment } from '../../components/PopularEquipment';
import { RentalTerms } from '../../components/RentalTerms/RentalTerms';
import { Reviews } from '../../components/Reviews';

export const HomePage = () => {
  return (
    <>
      <Hero />

      <About />

      <PopularEquipment />

      <HowToRent />

      <RentalTerms />

      <Reviews />

      <CallToAction />
    </>
  );
};
