import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import { clearLocalStorageKeys, getLocalStorage } from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { resetAnalyticsState } from '../../pages/Analytics/reducer/analytics.slice';
import { resetAuthState } from '../../pages/Auth/reducer/auth.slice';
import { resetHomeDashboardState } from '../../pages/Home/reducer/homeDashboard.slice';
import { resetHomeworkState } from '../../pages/Homework/reducer/homework.slice';
import { resetManageHWState } from '../../pages/ManageHomework/reducer/manageHomework.slice';
import { resetTeachState } from '../../pages/Teach/reducer/teach.slice';
import { useAppDispatch } from '../../reduxStore/reduxHooks';
import { useAuthentication } from '../../utils/customHooks';
import { LOGIN } from '../RoutesNomenclature';

// const PrivateRouterWrapper = () => {
//   const isAuthenticated = useAuthentication();
//   console.log('isAuthenticated', isAuthenticated);
//   return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRouterWrapper;

const PrivateRouterWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();
  // console.log('isAuthenticated', isAuthenticated);
  // const { isAuthenticated2 } = useGlobalContext();
  // console.log('isAuthenticated2', isAuthenticated2);
  // Function to handle logout and state reset
  const handleLogout = async () => {
    try {
      const response = await UMSLoginAPIServiceV1Client.logout({
        profileId: getLocalStorage('userId'),
        role: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(resetAuthState());
      dispatch(resetHomeDashboardState());
      dispatch(resetHomeworkState());
      dispatch(resetManageHWState());
      dispatch(resetTeachState());
      dispatch(resetAnalyticsState());
      // localStorage.clear();
      clearLocalStorageKeys();
      navigate(LOGIN);
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
