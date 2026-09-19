import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { EquipmentDetailsPage } from './pages/EquipmentDetailsPage';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { BookingPage } from './pages/BookingPage';

export const Root = () => (
  <Router>
    <MantineProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>

          <Route path="catalog" element={<CatalogPage />}></Route>

          <Route path="catalog/:id" element={<EquipmentDetailsPage />} />

          <Route path="booking/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  </Router>
);
