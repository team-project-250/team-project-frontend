import { Outlet } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from './components/Header';
import './App.scss';
import { CityProvider } from "./context/CityProvider";

export const App = () => {
  return (
    <CityProvider>
      <div className="app text page">
        <Header />

        <main className="app__main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </CityProvider>
  )
}
