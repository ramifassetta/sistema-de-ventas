import { createSlice } from '@reduxjs/toolkit';
import { fetchCategorias } from './categoriaThunks';

const initialState = {
  categorias: [],
  loading: false,
  error: null,
};


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
