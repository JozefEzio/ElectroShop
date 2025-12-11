import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ajouterVentesApi, deleteVentesApi, editVentesApi, fetchVentesApi, fetchVenteByIdApi } from "./ventesApi";


export const fetchVentes = createAsyncThunk('ventes/fetch', async () => {
    const response = await fetchVentesApi();
    return response.data
})
export const fetchVenteById = createAsyncThunk('ventes/fetchById', async (id) => {
    const response = await fetchVenteByIdApi(id);
    return response.data
})
export const ajouterVentes = createAsyncThunk('ventes/ajouter', async (vente) => {
    const response = await ajouterVentesApi(vente);
    return response.data
})
export const editVentes = createAsyncThunk('ventes/edit', async ({ id, vente }) => {
    const response = await editVentesApi(id, vente);
    return response.data
})
export const removeVentes = createAsyncThunk('ventes/remove', async (id) => {
    await deleteVentesApi(id);
    return id
})

const ventesSlice = createSlice({
    name: 'ventes',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVentes.pending, (state) => {
            state.loading = true
        }).addCase(fetchVentes.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
        }).addCase(fetchVenteById.fulfilled, (state, action) => {
            const newVente = action.payload;
            if (!state.data.find((v) => v.id === newVente.id)) {
                state.data.push(newVente);
            }
            state.loading = false;
        }).addCase(ajouterVentes.fulfilled, (state, action) => {
            state.data.push(action.payload);
        }).addCase(editVentes.fulfilled, (state, action) => {
            state.data = state.data.map((sale) =>
                sale.id === action.payload.id ? action.payload : sale
            );
        }).addCase(removeVentes.fulfilled, (state, action) => {
            state.data = state.data.filter((sale) => sale.id !== action.payload);
        });
    }

})
export default ventesSlice.reducer;