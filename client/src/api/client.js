import axios from 'axios';

const api = axios.create({
    baseURL:import.meta.RENDER_URL || 'https://gcbc-server.onrender.com/api',
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('gcbc_token');

    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export const getErrorMessage = (err) => {
    err?.response?.data?.message || 'Something went wrong. Please try again. ';
}

export default api;