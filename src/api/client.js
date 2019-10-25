import axios from 'axios';
import AuthService from './AuthService';
import TokenService from './TokenService';

const ApiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

ApiClient.interceptors.request.use(
  request => {
    const token = TokenService.getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  error => Promise.reject(error),
);

ApiClient.interceptors.response.use(undefined, async error => {
  const response = error.response;
  const token = TokenService.getAccessToken();
  if (
    token &&
    response &&
    response.status === 401 &&
    error.config &&
    !error.config.__isRetryRequest
  ) {
    AuthService.logout();
    return window.location.reload();
  }

  if (response && response.data && response.data.message) {
    return Promise.reject(response.data.message);
  }

  return Promise.reject(error);
});

export default ApiClient;
