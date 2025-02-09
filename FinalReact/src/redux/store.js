import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import carsReducer from './slices/carsSlice';
import filterReducer from './slices/filterSlice';  

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer,
    filter: filterReducer, 
  },
});
