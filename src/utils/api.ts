import axios from 'axios';

// TODO: create a better api wrapper to encapsulate all of this

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const setTokenAuth = (token: string) => {
  localStorage.setItem('token', token);
  apiInstance.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    setTokenAuth(token);
    return true;
  }
  return false;
};

export const removeTokenAuth = () => {
  localStorage.removeItem('token');
  apiInstance.defaults.headers.common.Authorization = undefined;
};

const token = localStorage.getItem('token') as string;
if (token) {
  setTokenAuth(token);
}

export default apiInstance;
