import { roundNumber } from './utils';

export const baseCurrency = 'SEK';
const rates = {
  SEK: 1,
  USD: 0.6,
  EUR: 0.7,
  GBP: 0.4,
};

export const currencies = {
  SEK: 'kr',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const convertBackToBase = amount =>
  convert(amount, getCurrency(), baseCurrency);

export const setCurrency = (dispatch, currency) => {
  const fromCurrency = getCurrency();
  const symbol = getCurrencySymbol(currency);
  localStorage.setItem('currency', currency);
  localStorage.setItem('currency_symbol', symbol);

  dispatch({
    type: 'storeSelectedCurrency',
    payload: { currency, symbol },
  });

  dispatch({
    type: 'storeUserBalance',
    fromCurrency,
  });

  dispatch({
    type: 'storeUserStocksValue',
    fromCurrency,
  });

  dispatch({
    type: 'storeMarketStocks',
    fromCurrency,
  });

  dispatch({
    type: 'storeUserStocks',
    fromCurrency,
  });
};

export const getCurrency = () =>
  localStorage.getItem('currency') || baseCurrency;

const getRate = (from, to) => {
  if (!rates[from] || !rates[to]) {
    throw new Error('currency error');
  }

  if (from === baseCurrency) {
    return rates[to];
  }

  if (to === baseCurrency) {
    return 1 / rates[from];
  }

  return rates[to] * (1 / rates[from]);
};

export const getCurrencySymbol = (currency = getCurrency()) => {
  if (!currencies[currency]) {
    currency = baseCurrency;
  }
  return currencies[currency];
};

export const convert = (amount, from, to) =>
  roundNumber(amount * getRate(from || baseCurrency, to));

export const convertUserBalance = (
  amount,
  from = getCurrency(),
  to = getCurrency(),
) => {
  return convert(amount, from, to);
};

export const convertUserStocksValue = (
  amount,
  from = getCurrency(),
  to = getCurrency(),
) => convert(amount, from, to);

export const convertMarketStocks = (
  stocks,
  from = getCurrency(),
  to = getCurrency(),
) =>
  stocks.map(stock => {
    stock.price = convert(stock.price, from, to);

    if (stock.history) {
      stock.history = stock.history.map(item => {
        item.price_new = convert(item.price_new, from, to);
        return item;
      });
    }

    return stock;
  });

export const convertUserStocks = (
  stocks,
  from = getCurrency(),
  to = getCurrency(),
) =>
  stocks.map(stock => {
    stock.stock.price = convert(stock.stock.price, from, to);
    return stock;
  });
