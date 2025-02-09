import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // імпортуємо useNavigate
import { useSelector, useDispatch } from 'react-redux';  // імпортуємо useSelector та useDispatch
import { logout } from '../redux/slices/authSlice';  // імпортуємо logout action

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);  // отримуємо стан авторизації та користувача з Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();  // ініціалізуємо useNavigate

  const handleLogout = () => {
    dispatch(logout());  // Виходимо з системи
    navigate('/');   // Переходимо на сторінку логіну після логауту
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <Link className="navbar-brand" to="/">Car Catalog</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (  // Якщо користувач не авторизований
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-light me-3" to="/" style={{ color: '#343a40' }}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-light me-3" to="/register" style={{ color: '#343a40' }}>Register</Link>
                </li>
              </>
            ) : (  // Якщо користувач авторизований
              <>
                <li className="nav-item">
                  <Link className="nav-link me-3" to="/car-store">Store</Link>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link me-3" to="/car-catalog">My cars</Link>
                </li>
                {user && user.isAdmin && (  // Якщо користувач є адміністратором
                  <li className="nav-item">
                    <Link className="nav-link me-3" to="/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link me-3" to="/profile">
                    <img 
                      src={user.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'} 
                      alt="User Avatar" 
                      style={{
                        width: '30px', 
                        height: '30px', 
                        borderRadius: '50%', 
                        objectFit: 'cover', 
                        marginRight: '10px'
                      }} 
                    />
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-light me-3" style={{ color: '#343a40' }}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
