import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para obtener productos
export const fetchProductos = createAsyncThunk(
  'productos/fetchProductos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/productos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para agregar un nuevo producto
export const addProducto = createAsyncThunk(
  'productos/addProducto',
  async (nuevoProducto, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/productos', nuevoProducto);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para actualizar un producto (PUT)
export const updateProducto = createAsyncThunk(
  'productos/updateProducto',
  async (productoActualizado, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/productos/${productoActualizado.id}`, productoActualizado);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para eliminar un producto (DELETE)
export const deleteProducto = createAsyncThunk(
  'productos/deleteProducto',
  async (productoId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/productos/${productoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);