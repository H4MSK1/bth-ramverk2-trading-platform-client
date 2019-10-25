import React, { useEffect } from 'react';
import { checkTokenExpiration } from 'api/utils';
import { populateGlobalUserState } from 'actions/user';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import useSocketEvents from 'hooks/useSocketEvents';

export const BaseLayout = ({ children }) => {
  const { dispatch } = getStateWithDispatcher();
  const { socket, isSocketReady } = useSocketEvents();

  useEffect(checkTokenExpiration);
  useEffect(() => {
    populateGlobalUserState(dispatch);
  }, []);
  useEffect(() => {
    if (!isSocketReady) {
      return;
    }
    socket.on('stocks', stocks => {
      dispatch({
        type: 'storeMarketStocks',
        payload: stocks,
      });
      populateGlobalUserState(dispatch);
    });
  }, [isSocketReady]);

  return <>{children}</>;
};
