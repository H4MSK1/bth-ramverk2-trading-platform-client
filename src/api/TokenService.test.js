/** global: jest */

import TokenService from './TokenService';

jest.mock('./TokenService');

describe('api/TokenService', () => {
  it('getAccessToken', () => {
    TokenService.getAccessToken();
    expect(TokenService.getAccessToken.mock.calls.length).toBe(1);
  });

  it('setAccessToken', () => {
    TokenService.setAccessToken('token');
    expect(TokenService.setAccessToken).toBeCalledWith('token');
  });

  it('removeAccessToken', () => {
    TokenService.removeTokens();
    expect(TokenService.removeTokens.mock.calls.length).toBe(1);
  });
});
