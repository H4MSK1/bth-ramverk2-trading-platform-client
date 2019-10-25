import ApiClient from 'api/client';
import AuthService from 'api/AuthService';
import { populateGlobalUserState } from './user';

export const login = (dispatch, { username, password }) =>
  ApiClient.post('auth/login', { username, password }).then(res => {
    const token = res.data.data;
    AuthService.login(token);
    return populateGlobalUserState(dispatch);
  });

export const logout = () => {
  AuthService.logout();
  window.location.reload();
};

export const register = payload =>
  ApiClient.post('auth/register', { ...payload });
