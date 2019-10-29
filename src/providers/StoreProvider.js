import React from 'react';
import { StateProvider } from './StateManagerProvider';
import {
  convert,
  baseCurrency,
  getCurrencySymbol,
  convertMarketStocks,
  convertUserStocks,
} from 'api/currency';

const initialState = {
  marketStocks: [],
  userBalance: 0,
  userStocks: [],
  userStocksValue: 0,
  currency: baseCurrency,
  currencySymbol: getCurrencySymbol(baseCurrency),
};

function reducer(state, action) {
  const { type, payload, fromCurrency = baseCurrency } = action;
  const payloadOrDefault = store =>
    payload !== undefined ? payload : state[store];

  switch (type) {
    case 'storeUserBalance':
      return {
        ...state,
        userBalance: convert(
          payloadOrDefault('userBalance'),
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeMarketStocks':
      return {
        ...state,
        marketStocks: convertMarketStocks(
          payloadOrDefault('marketStocks'),
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeUserStocks':
      return {
        ...state,
        userStocks: convertUserStocks(
          payloadOrDefault('userStocks'),
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeUserStocksValue':
      return {
        ...state,
        userStocksValue: convert(
          payloadOrDefault('userStocksValue'),
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeSelectedCurrency':
      return {
        ...state,
        currency: payload.currency,
        currencySymbol: payload.symbol,
      };

    default:
      return state;
  }
}

const StoreProvider = ({ children }) => (
  <StateProvider initialState={initialState} reducer={reducer}>
    {children}
  </StateProvider>
);

export default StoreProvider;
