import TokenService from '../TokenService';
import AuthService from '../AuthService';

jest.mock('../TokenService');

describe('api/AuthService', () => {
  it('should return true on isAuth() when token is not expired or empty', () => {
    jest.spyOn(TokenService, 'getAccessToken').mockReturnValue('token');
    jest.spyOn(TokenService, 'isTokenExpired').mockReturnValue(false);

    expect(AuthService.isAuth()).toBe(true);
  });

  it('should return false on isAuth() when token is empty', () => {
    jest.spyOn(TokenService, 'getAccessToken').mockReturnValue(null);
    jest.spyOn(TokenService, 'isTokenExpired').mockReturnValue(false);

    expect(AuthService.isAuth()).toBe(false);
  });

  it('should return false on isAuth() when token is not empty but has expired', () => {
    jest.spyOn(TokenService, 'getAccessToken').mockReturnValue('token');
    jest.spyOn(TokenService, 'isTokenExpired').mockReturnValue(true);

    expect(AuthService.isAuth()).toBe(false);
  });

  it('logout()', () => {
    const expected = { removed: true };
    jest.spyOn(TokenService, 'removeTokens').mockReturnValue(expected);

    expect(AuthService.logout()).toEqual(expected);
  });
});
