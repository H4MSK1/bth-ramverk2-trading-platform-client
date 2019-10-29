import { useEffect } from 'react';
import { checkTokenExpiration } from 'api/utils';
import { populateGlobalUserState } from 'actions/user';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

export const BaseLayout = ({ children }) => {
  const { dispatch } = getStateWithDispatcher();

  useEffect(checkTokenExpiration);
  useEffect(() => {
    populateGlobalUserState(dispatch);
  }, []);

  return children;
};
