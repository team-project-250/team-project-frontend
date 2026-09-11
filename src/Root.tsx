import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

export const Root = () => (
  <Router>
    <ScrollToTop />

    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>

        <Route path="catalog" element={<CatalogPage />}></Route>
      </Route>
    </Routes>
  </Router>
);
