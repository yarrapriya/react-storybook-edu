import { getLocalStorage } from '@geneo2-web/shared-ui';
import { useMemo } from 'react';

export const useAuthentication = () => {
  const isAuthenticated = useMemo(() => {
    //check token in localStorage
    const auth = getLocalStorage('auth');
    return auth;
  }, []);
  // const [isAuthenticated, setAuth] = useState<'true' | 'false'>('false');
  // useEffect(() => {
  //   const auth = getLocalStorage('auth');
  //   setAuth(auth);
  // });
  // useEffect(() => {
  //   const handleStorageChange = (e: StorageEvent) => {
  //     if (e.key === 'auth') {
  //       setAuth(e.newValue ? 'true' : 'false');
  //     }
  //   };
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

  return isAuthenticated;
};
