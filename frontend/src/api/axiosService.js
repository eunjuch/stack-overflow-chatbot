import axios from 'axios';

const accessToken = window.localStorage.getItem('accessToken');

const axiosService = (url, options) => {
  const instance = axios.create({ ...options });
  return instance;
};

export const api = axiosService('http://127.0.0.1:8000', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
