import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import AppInfo from './components/AppInfo/AppInfo';
import Banner from './components/Banner/Banner';
import Testimonials from './components/Testimonials/Testimonials';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import OrderCab from './components/OrderCab/OrderCab';
import UserDetails from './components/UserDetails/UserDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar/> <Banner/> <AppInfo/> <Testimonials/> <Footer/> </>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
        <Route path="/order-cab" element={<> <Navbar/> <OrderCab/> <Footer/></>}></Route>
        <Route path="/driver-company/:id" element={<> <Navbar/> <UserDetails/> <Footer/></>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
