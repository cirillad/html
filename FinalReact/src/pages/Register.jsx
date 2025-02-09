import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/slices/authSlice';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');  // Нове поле для юзернейму
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Перевірка на валідність
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (!email || !password || !username) {
      setError('Email, Username and Password are required');
      return;
    }
  
    // Перевірка, чи існує вже користувач з таким email або username в localStorage
    const users = JSON.parse(localStorage.getItem('users')) || []; // Якщо немає даних, створюємо новий масив
  
    const existingUserByEmail = users.find(user => user.email === email);
    const existingUserByUsername = users.find(user => user.username === username);
  
    if (existingUserByEmail) {
      setError('User with this email already exists');
      return;
    }
  
    if (existingUserByUsername) {
      setError('Username is already taken');
      return;
    }
  
    // Створюємо нового користувача з дефолтною аватаркою
    const newUser = {
      email,
      username,
      password,
      avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg', // Додаємо аватарку за дефолтом
      isAdmin: false, // За замовчуванням не є адміном
    };
  
    // Додаємо нового користувача до існуючого масиву користувачів
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // Зберігаємо оновлений масив користувачів
  
    // Оновлюємо Redux стан
    dispatch(setUser(newUser));
  
    // Перехід на головну сторінку після реєстрації
    navigate('/profile');
  };
  

  return (
    <div style={{
      backgroundImage: 'url("https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0
    }}>
      <div className="card" style={{
        backdropFilter: 'blur(1px)',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)' // Блідий фон для картки
      }}>
        <h2 className="text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
