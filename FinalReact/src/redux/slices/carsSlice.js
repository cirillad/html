import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    // додайте інші редуктори тут
  },
});

export const { setCars } = carsSlice.actions;

// Експортуємо сам редуктор за замовчуванням
export default carsSlice.reducer;
