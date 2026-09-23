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
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { RentalTermsPage } from './pages/RentalTermPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

export const Root = () => (
  <Router>
    <MantineProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="rental-terms" element={<RentalTermsPage />} />

          <Route path="contacts" element={<ContactsPage />} />

          <Route path="about" element={<AboutPage />} />

          <Route path="questions" element={<QuestionsPage />} />

          <Route path="delivery" element={<DeliveryPage />} />

          <Route path="catalog" element={<CatalogPage />} />

          <Route path="catalog/:id" element={<EquipmentDetailsPage />} />

          <Route path="booking/:id" element={<BookingPage />} />

          <Route path="booking-success" element={<BookingSuccessPage />} />
        </Route>
      </Routes>
    </MantineProvider>
  </Router>
);
