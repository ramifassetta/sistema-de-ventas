import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productoSlice';
import categoryReducer from './slices/categoriaSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;