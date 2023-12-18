import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import { clearLocalStorageKeys, getLocalStorage } from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { resetAuthState } from '../../pages/Auth/reducer/auth.slice';
import { resetHomeState } from '../../pages/Home/reducer/homeDashboard.slice';
import { resetHomeworkState } from '../../pages/Homework/reducer/homework.slice';
import { resetLearnState } from '../../pages/Learn/reducer/learn.slice';
import { resetPerformanceState } from '../../pages/Performance/reducer/performance.slice';
import { useAppDispatch } from '../../reduxStore/reduxHooks';
import { useAuthentication } from '../../utils/customHooks';

// const PrivateRouterWrapper = () => {
//   const isAuthenticated = useAuthentication();
//   console.log('isAuthenticated', isAuthenticated);
//   return isAuthenticated === true ? <Outlet /> : <Navigate to={LOGIN} />;
// };

// export default PrivateRouterWrapper;

const PrivateRouterWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();
  // console.log('isAuthenticated', isAuthenticated);
  // Function to handle logout and state reset
  const handleLogout = async () => {
    try {
      const response = await UMSLoginAPIServiceV1Client.logout({
        profileId: getLocalStorage('userId'),
        role: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(resetAuthState());
      dispatch(resetHomeState());
      dispatch(resetLearnState());
      dispatch(resetPerformanceState());
      dispatch(resetHomeworkState());
      // localStorage.clear();
      clearLocalStorageKeys();
    }
  };
  // Check if the user is authenticated, and render accordingly
  if (isAuthenticated === 'true') {
    return <Outlet />;
  } else {
    // If not authenticated, call handleLogout function and then navigate to login
    handleLogout();
    return <Navigate to="/login" />;
  }
};

export default PrivateRouterWrapper;
