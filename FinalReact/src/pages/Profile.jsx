import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // Створюємо стани для редагування профілю
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || ''); // Додаємо аватарку
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Перевірка на валідність
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email || !username) {
      setError('Email and Username are required');
      return;
    }

    // Якщо паролі не були змінені, залишаємо старий пароль
    const updatedPassword = password ? password : user.password;

    // Оновлюємо дані користувача
    const updatedUser = { ...user, email, username, avatar, password: updatedPassword };

    // Оновлюємо користувача в localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? updatedUser : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Оновлюємо Redux стан
    dispatch(setUser(updatedUser));

    // Очищаємо поля
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ position: 'relative' }}>
      {/* Фон з блюром */}
      <div 
        style={{
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundImage: 'url("https://via.placeholder.com/1500")', 
          backgroundSize: 'cover',
          filter: 'blur(10px)', 
          zIndex: -1 
        }} 
      ></div>

      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Edit Profile</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Аватарка */}
            <div className="mb-3 text-center">
              <img
                src={avatar || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="rounded-circle"
                style={{ width: '150px', height: '150px' }}
              />
              <div className="mt-2">
                <label htmlFor="avatar" className="form-label">Avatar URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)} // Зберігаємо URL
                  placeholder="Enter avatar URL"
                />
              </div>
            </div>

            {/* Нікнейм */}
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

            {/* Email */}
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

            {/* Пароль */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Підтвердження паролю */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
