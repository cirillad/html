import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    manufacturer: '',
    year: '',
    color: '',
    volume: '',
    priceRange: [0, 100000], // Встановлюємо стартові значення для діапазону цін
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;

// Експортуємо редуктор за замовчуванням
export default filterSlice.reducer;
