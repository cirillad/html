import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [sellerEmail, setSellerEmail] = useState('');

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    const selectedCar = savedCars.find((car) => car.id === parseInt(id, 10));
    setCar(selectedCar);

    if (selectedCar) {
      // Отримуємо всіх користувачів
      const users = JSON.parse(localStorage.getItem('users')) || [];
      // Знаходимо продавця за username
      const seller = users.find((user) => user.username === selectedCar.seller);
      if (seller) {
        setSellerEmail(seller.email);
      }
    }
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details-container">
      <div className="details-car-image">
        <img src={car.image} alt={car.name} />
      </div>

      <div className="car-info">
        <div className="info-column">
          <p><strong>Назва:</strong> {car.name}</p>
          <p><strong>Виробник:</strong> {car.manufacturer}</p>
          <p><strong>Рік випуску:</strong> {car.year}</p>
          <p><strong>Ціна:</strong> ${car.price}</p>
          <p>🚗🚗🚗🚗🚗🚗</p>
        </div>

        <div className="info-column">
          <p><strong>Колір:</strong> {car.color}</p>
          <p><strong>Двигун:</strong> {car.engine} л</p>
          <p><strong>Опис:</strong> {car.description}</p>
          <p><strong>Продавець:</strong> {car.seller}</p>
          <p><strong>Email продавця:</strong> {sellerEmail || 'Не знайдено'}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
