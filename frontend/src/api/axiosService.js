import axios from 'axios';

const axiosService = (url, options) => {
  const instance = axios.create({ ...options });
  return instance;
};

export const api = axiosService('http://127.0.0.1:8000', {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyODg1ODI5LCJpYXQiOjE3MDI4ODQwMjksImp0aSI6ImZjOGNiNmQxZGExODRkZGJhMGRiMjAwY2Q4NWQ4OWQxIiwidXNlcl9pZCI6MX0.kmRwPrB6tfe-K1brpoaF0EuyJB9vD46DOrvUtXnAG8U',
  },
});
