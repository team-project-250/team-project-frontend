import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './App.scss';
import { CityProvider } from './context/CityProvider';
import { NavBar } from './components/NavBar';
import { ScrollToTopButton } from './components/ScrollToTopButton/ScrollToTopButton';

export const App = () => {
  return (
    <CityProvider>
      <div className="app text page">
        <div className="app__nav">
          <NavBar />
        </div>

        <Header />

        <main className="app__main">
          <Outlet />
        </main>

        <Footer />

        <ScrollToTopButton />
      </div>
    </CityProvider>
  );
};
