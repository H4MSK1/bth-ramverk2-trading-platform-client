import { useEffect } from 'react';
import useSocket from 'use-socket.io-client';
import { populateGlobalUserState } from 'actions/user';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const useStockWatchEvent = (options = {}) => {
  const { dispatch } = getStateWithDispatcher();
  const [socket] = useSocket(process.env.REACT_APP_BACKEND_URL, {
    autoConnect: false,
    ...options,
  });

  useEffect(() => {
    socket.connect();
    socket.on('stocks', stocks => {
      dispatch({
        type: 'storeMarketStocks',
        payload: stocks,
      });
      populateGlobalUserState(dispatch);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return [socket];
};

export default useStockWatchEvent;
