import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import { clearLocalStorageKeys, getLocalStorage } from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useNavigate } from 'react-router-dom';
import {
  resetAuthState,
  setContactPopupOpen,
} from '../pages/Auth/reducer/auth.slice';
import { resetHomeState } from '../pages/Home/reducer/homeDashboard.slice';
import { resetHomeworkState } from '../pages/Homework/reducer/homework.slice';
import { resetLearnState } from '../pages/Learn/reducer/learn.slice';
import { resetPerformanceState } from '../pages/Performance/reducer/performance.slice';
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
        // console.log('contact clicked');
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
          navigate(LOGIN);
          // localStorage.clear();
          clearLocalStorageKeys();
        }
      },
    },
  ];
};
