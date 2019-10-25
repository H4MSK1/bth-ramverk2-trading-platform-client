/** global: localStorage */

const TokenService = {
  setAccessToken: token => localStorage.setItem('access_token', token),
  setTokenExpiration: timestamp => {
    localStorage.setItem('access_token_expiration', timestamp);
  },
  getAccessToken: () => localStorage.getItem('access_token'),
  getTokenExpiration: () => localStorage.getItem('access_token_expiration'),
  removeTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expiration');
  },
  isTokenExpired: () => {
    const exp = TokenService.getTokenExpiration();
    return Date.now() >= exp;
  },
};

export default TokenService;
