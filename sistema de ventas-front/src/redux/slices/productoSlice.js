import { createSlice } from '@reduxjs/toolkit';
import { fetchProductos, addProducto, updateProducto, deleteProducto } from './productoThunks';

const initialState = {
  productos: [],
  loading: false,
  error: null,
};

const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    // Aquí irían los reducers síncronos si los tuvieras
  },
  extraReducers: (builder) => {
    builder
      // Casos para fetchProductos
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
      })
      // Casos para addProducto
      .addCase(addProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productos.push(action.payload); // Agrega el nuevo producto a la lista
      })
      .addCase(addProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para updateProducto
      .addCase(updateProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProducto.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.productos.findIndex(producto => producto.id === action.payload.id);
        if (index !== -1) {
          state.productos[index] = action.payload; // Actualiza el producto
        }
      })
      .addCase(updateProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Casos para deleteProducto
      .addCase(deleteProducto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProducto.fulfilled, (state, action) => {
        state.loading = false;
        state.productos = state.productos.filter(producto => producto.id !== action.payload.id); // Elimina el producto
      })
      .addCase(deleteProducto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productoSlice.reducer;
