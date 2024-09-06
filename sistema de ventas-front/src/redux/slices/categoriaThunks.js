import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunk asincrónico para obtener categorías
export const fetchCategorias = createAsyncThunk(
    'categorias/fetchCategorias',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            console.log('Response from backend:', response.data);
            return response.data;
        } catch (error) {
            console.log('Error fetching categories:', error); // Agrega este log
            return rejectWithValue(error.response.data);
        }
    }
);