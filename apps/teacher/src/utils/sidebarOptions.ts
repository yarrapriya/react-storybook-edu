import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import { clearLocalStorageKeys, getLocalStorage } from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useNavigate } from 'react-router-dom';
import { resetAnalyticsState } from '../pages/Analytics/reducer/analytics.slice';
import {
  resetAuthState,
  setContactPopupOpen,
} from '../pages/Auth/reducer/auth.slice';
import { resetHomeDashboardState } from '../pages/Home/reducer/homeDashboard.slice';
import { resetHomeworkState } from '../pages/Homework/reducer/homework.slice';
import { resetManageHWState } from '../pages/ManageHomework/reducer/manageHomework.slice';
import { resetTeachState } from '../pages/Teach/reducer/teach.slice';
import { useAppDispatch } from '../reduxStore/reduxHooks';
import {
  DISCLAIMER,
  HELP,
  LOGIN,
  PROFILE,
} from '../routeHandling/RoutesNomenclature';

export const useSideBarOptions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return [
    {
      name: 'Profile',
      icon: 'profile-icon',
      onClick: () => {
        navigate(PROFILE);
      },
    },
    // {
    //   name: 'Notification',
    //   icon: 'bell',
    //   onClick: () => {
    //     navigate(NOTIFICATION)
    //   }
    // },
    {
      name: 'Contact',
      icon: 'contact',
      onClick: () => {
        dispatch(setContactPopupOpen(true));
      },
    },
    {
      name: 'Help & Support',
      icon: 'support1',
      onClick: () => {
        navigate(HELP);
      },
    },
    {
      name: 'Disclaimer & Policies',
      icon: 'tnc',
      onClick: () => {
        navigate(DISCLAIMER);
      },
    },
    {
      name: 'Sign out',
      icon: 'sign-out',
      onClick: async () => {
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
      },
    },
  ];
};
