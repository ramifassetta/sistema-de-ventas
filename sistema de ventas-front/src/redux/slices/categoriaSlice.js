// src/redux/slices/categoriaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial para las categorías
const initialState = {
  categorias: [],
  loading: false,
  error: null,
};

// Thunk asincrónico para obtener categorías
export const fetchCategorias = createAsyncThunk(
  'categorias/fetchCategorias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/categorias');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice de categorías
const categoriaSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    // Puedes agregar más acciones si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.loading = false;
        state.categorias = action.payload;
      })
      .addCase(fetchCategorias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriaSlice.reducer;
