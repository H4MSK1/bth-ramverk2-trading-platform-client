/** global: jest */

import TokenService from '../TokenService';

jest.mock('../TokenService');

describe('api/TokenService', () => {
  it('getAccessToken', () => {
    TokenService.getAccessToken();
    expect(TokenService.getAccessToken.mock.calls.length).toBe(1);
  });

  it('setAccessToken', () => {
    TokenService.setAccessToken('token');
    expect(TokenService.setAccessToken).toBeCalledWith('token');
  });

  it('removeTokens', () => {
    TokenService.removeTokens();
    expect(TokenService.removeTokens.mock.calls.length).toBe(1);
  });

  it('setTokenExpiration', () => {
    TokenService.setTokenExpiration('timestamp');
    expect(TokenService.setTokenExpiration).toBeCalledWith('timestamp');
  });

  it('getTokenExpiration', () => {
    TokenService.getTokenExpiration();
    expect(TokenService.getTokenExpiration.mock.calls.length).toBe(1);
  });

  it('isTokenExpired', () => {
    TokenService.isTokenExpired();
    expect(TokenService.isTokenExpired.mock.calls.length).toBe(1);
  });
});
