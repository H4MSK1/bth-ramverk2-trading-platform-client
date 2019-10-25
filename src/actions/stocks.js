import ApiClient from 'api/client';
import { populateGlobalUserState } from './user';

export const getMarketStocks = dispatch =>
  ApiClient.get('stock').then(res => {
    dispatch({
      type: 'storeMarketStocks',
      payload: res.data.data,
    });
  });

export const buyStocks = (dispatch, stockId, amount) =>
  ApiClient.post('stock/buy', { stockId, amount }).then(() => {
    populateGlobalUserState(dispatch);
  });

export const sellStocks = (dispatch, stockId, amount) =>
  ApiClient.post('stock/sell', { stockId, amount }).then(() => {
    populateGlobalUserState(dispatch);
  });

export const updateStocks = () => ApiClient.get('stock/update');
