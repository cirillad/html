import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const CarStore = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [paginatedCars, setPaginatedCars] = useState([]);
  const [filters, setFilters] = useState({
    manufacturer: '',
    year: '',
    color: '',
    volume: '',
    priceMin: '',
    priceMax: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(4); // Змінено на 4 автомобілі на сторінку

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    setCars(savedCars);
    setFilteredCars(savedCars);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filterCars = () => {
    const hasFilters = Object.values(filters).some((filter) => filter);

    if (!hasFilters) {
      setFilteredCars(cars);
      return;
    }

    let filtered = cars;

    if (filters.manufacturer) {
      filtered = filtered.filter((car) =>
        car.manufacturer.toLowerCase().includes(filters.manufacturer.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter((car) => car.year.toString() === filters.year);
    }

    if (filters.color) {
      filtered = filtered.filter((car) =>
        car.color.toLowerCase().includes(filters.color.toLowerCase())
      );
    }

    if (filters.volume) {
      filtered = filtered.filter((car) => car.volume === parseFloat(filters.volume));
    }

    if (filters.priceMin) {
      filtered = filtered.filter((car) => car.price >= parseFloat(filters.priceMin));
    }

    if (filters.priceMax) {
      filtered = filtered.filter((car) => car.price <= parseFloat(filters.priceMax));
    }

    setFilteredCars(filtered);
  };

  useEffect(() => {
    filterCars();
  }, [filters, cars]);

  const paginateCars = () => {
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setPaginatedCars(filteredCars.slice(indexOfFirstCar, indexOfLastCar));
  };

  useEffect(() => {
    paginateCars();
  }, [filteredCars, currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCars.length / carsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h2>Car Store</h2>

      {/* Фільтри */}
      <div className="filters">
        <div className="filter-row">
          <label>
            Manufacturer:
            <input
              type="text"
              name="manufacturer"
              value={filters.manufacturer}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Year:
            <input
              type="number"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div className="filter-row">
          <label>
            Volume:
            <input
              type="number"
              name="volume"
              value={filters.volume}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Min Price:
            <input
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>

      {/* Відображення автомобілів */}
      <div className="car-catalog">
  {paginatedCars.map((car) => (
    <div className="car-card" key={car.id}>
      <Link to={`/car-details/${car.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={car.image} alt={car.name} className="car-image" />
        <h5>{car.name}</h5>
        <p>Year: {car.year}</p>
        <p>${car.price}</p>
        <p>Color: {car.color}</p>
        <p>Volume: {car.volume}L</p>
        <p>{car.description}</p>
      </Link>
    </div>
  ))}
</div>

      {/* Пагінація */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredCars.length / carsPerPage)}>Next</button>
      </div>

      {/* Стилі */}
      <style jsx>{`
  .filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .filter-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .filter-row label {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .filter-row input {
    padding: 5px;
    font-size: 14px;
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .pagination button {
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
  }
`}</style>

    </div>
  );
};

export default CarStore;
