import TokenService from '../TokenService';
import { onlyAuth, onlyGuest } from '../utils';
import AuthService from '../AuthService';

describe('api/utils', () => {
  afterEach(() => {
    TokenService.removeTokens();
  });

  it('should only return value if authenticated', () => {
    jest.spyOn(AuthService, 'isAuth').mockImplementationOnce(() => true);

    const expected = 1;
    const result = onlyAuth(() => expected);
    expect(result).toBe(expected);
  });

  it('should return null if not authenticated', () => {
    jest.spyOn(AuthService, 'isAuth').mockImplementationOnce(() => false);

    const result = onlyAuth(() => 1);
    expect(result).toBeNull();
  });

  it('should only return value if unauthenticated', () => {
    jest.spyOn(AuthService, 'isAuth').mockImplementationOnce(() => false);

    const expected = 1;
    const result = onlyGuest(() => expected);
    expect(result).toBe(expected);
  });

  it('should return null if authenticated', () => {
    jest.spyOn(AuthService, 'isAuth').mockImplementationOnce(() => true);

    const result = onlyGuest(() => 1);
    expect(result).toBeNull();
  });
});
