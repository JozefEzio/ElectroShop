import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001/ventes'
})

export const fetchVentesApi = () => api.get('/');
export const fetchVenteByIdApi = (id) => api.get(`/${id}`);
export const ajouterVentesApi = (data) => api.post('/', data);
export const editVentesApi = (id, data) => api.put(`/${id}`, data);
export const deleteVentesApi = (id) => api.delete(`/${id}`);