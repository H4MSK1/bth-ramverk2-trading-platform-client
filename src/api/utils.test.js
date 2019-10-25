import TokenService from './TokenService';
import { onlyAuth, onlyGuest } from './utils';

describe('api/utils', () => {
  afterEach(() => {
    TokenService.removeTokens();
  });

  it('should only return value if authenticated', () => {
    TokenService.setAccessToken('token');

    const expected = 1;
    const result = onlyAuth(() => expected);
    expect(result).toBe(expected);
  });

  it('should return null if not authenticated', () => {
    const result = onlyAuth(() => 1);
    expect(result).toBeNull();
  });

  it('should only return value if unauthenticated', () => {
    const expected = 1;
    const result = onlyGuest(() => expected);
    expect(result).toBe(expected);
  });

  it('should return null if authenticated', () => {
    TokenService.setAccessToken('token');

    const result = onlyGuest(() => 1);
    expect(result).toBeNull();
  });
});
