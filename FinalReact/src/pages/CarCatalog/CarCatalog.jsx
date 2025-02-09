import React, { useState, useEffect } from 'react';
import './CarCatalog.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

const CarCatalog = () => {
  const [cars, setCars] = useState([]);  // State to store the cars list
  const [showModal, setShowModal] = useState(false);  // State to show/hide the modal
  const [editingCar, setEditingCar] = useState(null); 
  const [newCar, setNewCar] = useState({  // State to handle the form inputs for the new car
    name: '',
    manufacturer: '',
    year: '',
    engine: '',
    price: '',
    color: '',
    description: '',
    image: '',
    seller: '',  // Automatically set the seller to current user
  });

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.username || '');  // Replace with logic to get the current user's name or ID

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    
    // Якщо користувач - адміністратор, відображаємо всі машини
    if (user?.isAdmin) {
      setCars(savedCars);
    } else {
      // Фільтруємо машини для поточного користувача
      const userCars = savedCars.filter(car => car.seller === username);
      setCars(userCars);
    }
  }, [username, user?.isAdmin]); // Залежності, щоб при зміні користувача/ролі перегрузити список машин

  // Зберігаємо машини в localStorage при зміні списку
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
  
    if (savedCars.length > 0) {
      if (user?.isAdmin) {
        // Якщо користувач є адміністратором, відображаємо всі машини
        setCars(savedCars);
      } else {
        // Якщо не адміністратор, фільтруємо машини для поточного користувача
        const userCars = savedCars.filter(car => car.seller === username);
        setCars(userCars);  // Встановлюємо тільки машини поточного користувача
      }
    }
  }, [username, user?.isAdmin]);
  
  // Save cars to localStorage whenever the cars list changes
  useEffect(() => {
    if (cars.length > 0) {
      // Get the existing cars from localStorage
      const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
      
      // Ensure there are no duplicates
      const uniqueCars = [
        ...savedCars.filter(car => !cars.some(newCar => newCar.id === car.id)),
        ...cars
      ];
  
      localStorage.setItem('cars', JSON.stringify(uniqueCars));
    }
  }, [cars]); // This effect will run every time the 'cars' state changes
  
  

  // Handler to open the modal
  const handleAddCarClick = () => {
    setShowModal(true);
  };

  const handleEditCarClick = (car) => {
    console.log("editingCar before update:", editingCar);
    
    setEditingCar(car);
    setNewCar({  
      id: car.id,  
      name: car.name,
      manufacturer: car.manufacturer,
      year: car.year,
      engine: car.engine,
      price: car.price,
      color: car.color,
      description: car.description,
      image: car.image,
      seller: car.seller,
    });
  
    setShowModal(true);
  };
  
  

  // Handler to edit an existing car
  const handleEditCarSubmit = () => {
    if (!newCar.name || !newCar.manufacturer || !newCar.year || !newCar.price) {
      alert('Please fill in all required fields');
      return;
    }
  
    const updatedCars = cars.map(car => 
      car.id === newCar.id ? { ...car, ...newCar } : car
    );
  
    setCars(updatedCars);
    setShowModal(false);  // Close the modal
    setEditingCar(null);  // Reset editingCar state
    resetNewCar();       // Reset the form after submission
  };
  
//sdasasd

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);   // Close the modal
    resetNewCar();         // Clear the form when modal is closed
    setEditingCar(null);   // Reset the editingCar state
  };

  // Handler for input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // Reset the form
  const resetNewCar = () => {
    setNewCar({ 
      name: '', 
      manufacturer: '', 
      year: '', 
      engine: '', 
      price: '', 
      color: '', 
      description: '', 
      image: '',
      seller: '',  // Automatically set the seller to current user
    });
  };

  // Handler to add a new car to the catalog
  const handleAddCarSubmit = () => {
    if (!newCar.name || !newCar.manufacturer || !newCar.year || !newCar.price) {
      alert('Please fill in all required fields');
      return;
    }
  
    const carToAdd = {
      id: Date.now(),
      name: newCar.name,
      manufacturer: newCar.manufacturer,
      year: newCar.year,
      engine: newCar.engine,
      price: newCar.price,
      color: newCar.color,
      description: newCar.description,
      image: newCar.image || 'https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png',  // Default placeholder if no image URL
      seller: username,  // Add the seller field
    };
  
    const updatedCars = [...cars, carToAdd];
    setCars(updatedCars);  // Add new car to the catalog
    setShowModal(false);  // Close the modal
    resetNewCar();       // Reset the form after submission
  };

  // Handler to delete a car from the catalog
  const handleDeleteCar = (carId) => {
    console.log(carId);
  
    let cars = JSON.parse(localStorage.getItem('cars')) || []; // Отримуємо всі машини
  
    for (let i = 0; i < cars.length; i++) {
      if (cars[i].id === carId) {
        cars.splice(i, 1); // Видаляємо машину з масиву
        break;
      }
    }
  
    localStorage.setItem('cars', JSON.stringify(cars)); // Оновлюємо локальне сховище
  
    window.location.reload(); // Перезавантажуємо сторінку
  };
  
  
  
  
  
  
  return (
    <div className="container">
      <h2>Car Catalog</h2>

      {/* Add Car Button */}
      <button onClick={handleAddCarClick} className="add-car-button">
        Add Car
      </button>

      {/* Modal for adding a new car */}
      {showModal && (
        <div className="modal show" style={{
          display: 'block',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1050,
        }} aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Car</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newCar.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                  <input
                    type="text"
                    className="form-control"
                    id="manufacturer"
                    name="manufacturer"
                    value={newCar.manufacturer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={newCar.year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="engine" className="form-label">Engine Volume</label>
                  <input
                    type="text"
                    className="form-control"
                    id="engine"
                    name="engine"
                    value={newCar.engine}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={newCar.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="color" className="form-label">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    id="color"
                    name="color"
                    value={newCar.color}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={newCar.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    value={newCar.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
              <button 
  type="button" 
  className="btn btn-primary" 
  onClick={editingCar ? handleEditCarSubmit : handleAddCarSubmit}
>
  {editingCar ? 'Save Changes' : 'Add Car'}
</button>

                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Car Catalog Display */}
      <div className="car-catalog">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <img src={car.image} alt={car.name} className="car-image" />
            <h5>{car.name}</h5>
            <p>Year: {car.year}</p>
            <p>${car.price}</p>
            <p>Seller: {car.seller}</p>
            <button className="btn btn-warning btn-sm btn-rounded me-2" onClick={() => handleEditCarClick(car)}>Edit</button>
            <button className="btn btn-warning btn-sm btn-rounded" onClick={() => handleDeleteCar(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCatalog;