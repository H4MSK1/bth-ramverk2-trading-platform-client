import ApiClient from 'api/client';
import { onlyAuth } from 'api/utils';

export const getCurrentBalance = dispatch =>
  ApiClient.get('user/balance').then(res => {
    dispatch({
      type: 'storeUserBalance',
      payload: res.data.data,
    });
  });

export const addBalance = (dispatch, balance) =>
  ApiClient.post('user/balance', { balance: balance }).then(async () => {
    await getCurrentBalance(dispatch);
  });

export const getUserStocks = dispatch =>
  ApiClient.get('user/stocks').then(res => {
    dispatch({
      type: 'storeUserStocks',
      payload: res.data.data,
    });
  });

export const getUserStocksWorth = dispatch =>
  ApiClient.get('user/stocks/value').then(res => {
    dispatch({
      type: 'storeUserStocksValue',
      payload: res.data.data,
    });
  });

export const populateGlobalUserState = dispatch =>
  onlyAuth(async () => {
    await getCurrentBalance(dispatch);
    await getUserStocks(dispatch);
    await getUserStocksWorth(dispatch);
  });
