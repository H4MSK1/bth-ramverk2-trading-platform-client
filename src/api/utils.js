import { DateTime } from 'luxon';
import TokenService from './TokenService';
import AuthService from './AuthService';

const resolveArgument = arg => (typeof arg === 'function' ? arg() : arg);
export const roundNumber = num => Math.round(num * 1e2) / 1e2;
export const numberDiffPercentage = (a, b) =>
  100 * Math.abs((a - b) / ((a + b) / 2));

export const onlyAuth = (next, fallback = null) =>
  AuthService.isAuth() ? resolveArgument(next) : fallback;

export const onlyGuest = (next, fallback = null) =>
  !AuthService.isAuth() ? resolveArgument(next) : fallback;

export const checkTokenExpiration = () => {
  if (TokenService.getAccessToken() && TokenService.isTokenExpired()) {
    AuthService.logout();
    window.location.reload();
  }
};

export const formatDateTime = (iso, format = 'y-LL-dd HH:mm:ss') =>
  DateTime.fromISO(iso).toFormat(format);

export const adjustNumberWithinRange = (range, num) => {
  if (num > range.max) {
    return range.max;
  } else if (num < range.min) {
    return range.min;
  }

  return num;
};
