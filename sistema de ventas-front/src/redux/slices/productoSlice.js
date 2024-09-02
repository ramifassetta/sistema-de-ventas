// src/redux/slices/productoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial para los productos
const initialState = {
  productos: [],
  loading: false,
  error: null,
};

// Thunk asincrónico para obtener productos
export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/productos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice de productos
const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    // Puedes agregar más acciones si es necesario, como addProduct, deleteProduct, etc.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductos.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = action.payload;
      })
      .addCase(fetchProductos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productoSlice.reducer;
