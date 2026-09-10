import { About } from '../About';
import { HowToRent } from '../HowToRent';
import { PopularEquipment } from '../PopularEquipment';
import './MainContent.scss';

export const MainContent = () => {
  return (
    <div className="main-content">
      <div className="main-content__inner">
        <About />

        <PopularEquipment />

        <HowToRent />
      </div>
    </div>
  );
};
