import { roundNumber } from './utils';

export const baseCurrency = 'SEK';
const rates = {
  SEK: 1,
  USD: 0.6,
  EUR: 0.5,
  GBP: 0.4,
};

export const currencies = {
  SEK: 'kr',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const setCurrency = (fromCurrency, dispatch, currency) => {
  const symbol = getCurrencySymbol(currency);

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

export const getCurrencySymbol = currency => {
  if (!currencies[currency]) {
    currency = baseCurrency;
  }
  return currencies[currency];
};

export const convert = (amount, from, to) =>
  roundNumber(amount * getRate(from || baseCurrency, to));

export const convertMarketStocks = (stocks, from, to) =>
  stocks.map(stock => {
    stock.price = convert(stock.price, from, to);

    if (stock.history) {
      stock.history = stock.history.map(item => {
        item.price_old = convert(item.price_old, from, to);
        item.price_new = convert(item.price_new, from, to);
        return item;
      });
    }

    return stock;
  });

export const convertUserStocks = (stocks, from, to) =>
  stocks.map(stock => {
    stock.price_when_purchased = convert(stock.price_when_purchased, from, to);
    stock.stock.price = convert(stock.stock.price, from, to);
    return stock;
  });
