import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/authSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CarCatalog from './pages/CarCatalog/CarCatalog';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import CarStore from './pages/CarStore/CarStore';
import CarDetails from './pages/CarDetails/CarDetails';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Перевіряємо, чи є користувач у localStorage при запуску програми
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user)); // Якщо користувач є, оновлюємо стан
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div
  style={{
    backgroundImage: 'url("https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', // Фіксуємо фон
    minHeight: '100vh',
    margin: 0,
  }}
>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/car-catalog" element={<CarCatalog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/car-store" element={<CarStore />} />
          <Route path="/car-details/:id" element={<CarDetails />} /> {/* Додано маршрут */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
