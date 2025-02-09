import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem('user')) || null,  // Завантажуємо користувача з localStorage при ініціалізації
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));  // Зберігаємо користувача в localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');  // Очищаємо localStorage при виході
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
