import {
  baseCurrency,
  currencies,
  getCurrencySymbol,
  convert,
} from '../currency';

describe('api/currency', () => {
  it('getCurrencySymbol()', () => {
    Object.keys(currencies).forEach(key => {
      expect(getCurrencySymbol(key)).toEqual(currencies[key]);
    });

    expect(getCurrencySymbol('I_dont_exist')).toEqual(
      getCurrencySymbol(baseCurrency),
    );
  });

  it('convert()', () => {
    const value = 1500.57;
    const newValue = convert(value, baseCurrency, 'USD');
    const convertedBack = convert(newValue, 'USD', baseCurrency);

    expect(value).not.toEqual(newValue);
    expect(value).toEqual(convertedBack);
  });
});
