import TokenService from './TokenService';
import jwt_decode from 'jwt-decode';

const AuthService = {
  isAuth: () =>
    TokenService.getAccessToken() &&
    TokenService.getAccessToken().length &&
    !TokenService.isTokenExpired(),
  logout: () => TokenService.removeTokens(),
  login: token => {
    const _t = new Date();
    _t.setHours(_t.getHours() + 1);
    TokenService.setTokenExpiration(_t.getTime());
    TokenService.setAccessToken(token);
  },
  user: () => {
    try {
      return jwt_decode(TokenService.getAccessToken());
    } catch {
      return null;
    }
  },
};

export default AuthService;
