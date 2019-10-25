import React from 'react';
import { StateProvider } from './StateManagerProvider';
import {
  baseCurrency,
  getCurrencySymbol,
  convertUserBalance,
  convertUserStocksValue,
  convertMarketStocks,
  convertUserStocks,
} from 'api/currency';

const initialState = {
  marketStocks: [],
  userBalance: 0,
  userProfit: 0,
  userStocks: [],
  userStocksValue: 0,
  currency: baseCurrency,
  currencySymbol: getCurrencySymbol(baseCurrency),
};

function reducer(state, action) {
  const { type, payload, fromCurrency = baseCurrency } = action;

  switch (type) {
    case 'storeUserBalance':
      return {
        ...state,
        userBalance: convertUserBalance(
          payload || state.userBalance,
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeMarketStocks':
      return {
        ...state,
        marketStocks: convertMarketStocks(
          payload || state.marketStocks,
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeUserStocks':
      return {
        ...state,
        userStocks: convertUserStocks(
          payload || state.userStocks,
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeUserStocksValue':
      return {
        ...state,
        userStocksValue: convertUserStocksValue(
          payload || state.userStocksValue,
          fromCurrency,
          state.currency,
        ),
      };

    case 'storeUserProfit':
      return {
        ...state,
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
