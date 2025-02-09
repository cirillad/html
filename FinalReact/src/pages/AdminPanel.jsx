import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const { user } = useSelector(state => state.auth);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false); // Додано для модалки додавання користувача

  useEffect(() => {
    if (user && user.isAdmin) {
      const usersFromStorage = localStorage.getItem('users');
      if (usersFromStorage) {
        setUsers(JSON.parse(usersFromStorage));
      }
    }
  }, [user]);

  const handleEdit = (username) => {
    const userToEdit = users.find(u => u.username === username);
    setSelectedUser({ ...userToEdit, originalUsername: username }); // Додаємо оригінальний username
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsAddingUser(false); // Закрити форму додавання користувача
  };

  const handleSaveChanges = () => {
    const updatedUsers = users.map(u =>
      u.username === selectedUser.originalUsername ? { ...selectedUser, originalUsername: undefined } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStatusChange = () => {
    setSelectedUser(prevState => ({
      ...prevState,
      isAdmin: !prevState.isAdmin
    }));
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter(u => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleAddUser = () => {
    const newUser = {
      username: '',
      email: '',
      avatar: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
      password: '',
      isAdmin: false
    };
    setSelectedUser(newUser);
    setIsAddingUser(true);
    setIsModalOpen(true);
  };

  const handleSaveNewUser = () => {
    const newUsersList = [...users, selectedUser];
    setUsers(newUsersList);
    localStorage.setItem('users', JSON.stringify(newUsersList));
    handleCloseModal();
  };

  if (!user || !user.isAdmin) {
    return <div>You do not have permission to access the Admin Panel.</div>;
  }

  return (
    <div className="container mt-0" style={{ marginTop: '0' }}>
<div className="container mt-0" style={{ marginTop: '0' }}>
  <div className="d-flex flex-column align-items-center mb-3">
    <h3>User List</h3>
  </div>
  <button
    type="button"
    className="btn btn-success"
    onClick={handleAddUser}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
    }}
  >
    Add New User
  </button>
  {/* Далі йде ваш код для таблиці користувачів */}
</div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th className="text-center align-middle">Name</th>
              <th className="text-center align-middle">Title</th>
              <th className="text-center align-middle">Status</th>
              <th className="text-center align-middle">Position</th>
              <th className="text-center align-middle">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td className="text-center align-middle">
                  <div className="d-flex align-items-center justify-content-left" style={{ marginLeft: '40px' }}>
                    <img
                      src={user.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'}
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1 text-dark">{user.username}</p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center align-middle">
                  <p className="fw-normal mb-1 text-dark">{user.title || 'N/A'}</p>
                  <p className="text-muted mb-0">{user.department || 'N/A'}</p>
                </td>
                <td className="text-center align-middle">
                  <span className="badge rounded-pill d-inline text-dark">
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="text-center align-middle">
                  <p className="text-dark">{user.position || 'N/A'}</p>
                </td>
                <td className="text-center align-middle">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm btn-rounded"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => handleEdit(user.username)} // Використовуємо username
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm btn-rounded ms-2"
                    style={{ fontWeight: 'bold' }}
                    onClick={() => handleDelete(user.username)} // Видалити користувача
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

{isModalOpen && (
  <div className="modal show" tabIndex="-1" style={{
    display: 'block',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050
  }} aria-modal="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{isAddingUser ? 'Add New User' : 'Edit User'}</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={selectedUser.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={selectedUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">Avatar URL</label>
            <input
              type="text"
              className="form-control"
              id="avatar"
              name="avatar"
              value={selectedUser.avatar}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={selectedUser.password || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              className="form-select"
              value={selectedUser.isAdmin ? 'Admin' : 'User'}
              onChange={handleStatusChange}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={isAddingUser ? handleSaveNewUser : handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminPanel;
