import React from 'react';
import { StateProvider } from './StateManagerProvider';
import {
  getCurrency,
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
  currency: getCurrency(),
  currencySymbol: getCurrencySymbol(),
};

function reducer(state, action) {
  const { type, payload, fromCurrency } = action;

  switch (type) {
    case 'storeUserBalance':
      return {
        ...state,
        userBalance: convertUserBalance(
          payload || state.userBalance,
          fromCurrency,
        ),
      };

    case 'storeMarketStocks':
      return {
        ...state,
        marketStocks: convertMarketStocks(
          payload || state.marketStocks,
          fromCurrency,
        ),
      };

    case 'storeUserStocks':
      return {
        ...state,
        userStocks: convertUserStocks(
          payload || state.userStocks,
          fromCurrency,
        ),
      };

    case 'storeUserStocksValue':
      return {
        ...state,
        userStocksValue: convertUserStocksValue(
          payload || state.userStocksValue,
          fromCurrency,
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
