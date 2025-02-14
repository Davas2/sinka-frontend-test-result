import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getClients = async () => {
  return api.get('/client');
};

export const getClientById = async (id: string) => {
  return api.get(`/client/${id}`);
};

export const createClient = async (data: { name: string; email: string; status: 'active' | 'inactive' }) => {
  return api.post('/client', data);
};

export const updateClient = async (id: string, data: { name: string; email: string; status: 'active' | 'inactive' }) => {
  return api.patch(`/client/${id}`, data);
};

export const deleteClient = async (id: string) => {
  return api.delete(`/client/${id}`);
};

export default api;