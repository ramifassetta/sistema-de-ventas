import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Thunk asincrónico para obtener categorías
export const fetchCategorias = createAsyncThunk(
    'categorias/fetchCategorias',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            return response.data;
        } catch (error) {
            console.log('Error fetching categories:', error); 
            return rejectWithValue(error.response.data);
        }
    }
);