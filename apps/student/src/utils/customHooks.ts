import { getLocalStorage } from '@geneo2-web/shared-ui';
import { useMemo } from 'react';

export const useAuthentication = () => {
  const isAuthenticated = useMemo(() => {
    //check token in localStorage
    const auth = getLocalStorage('auth');
    return auth;
  }, []);

  return isAuthenticated;
};
