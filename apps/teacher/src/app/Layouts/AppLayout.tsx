import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContactPopup,
  Sidebar,
  Toast,
  clearLocalStorageKeys,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { resetAnalyticsState } from '../../pages/Analytics/reducer/analytics.slice';
import {
  resetAuthState,
  setContactPopupOpen,
  setUserInfo,
} from '../../pages/Auth/reducer/auth.slice';
import {
  resetHomeDashboardState,
  toggleToastOpen,
} from '../../pages/Home/reducer/homeDashboard.slice';
import { resetHomeworkState } from '../../pages/Homework/reducer/homework.slice';
import { resetManageHWState } from '../../pages/ManageHomework/reducer/manageHomework.slice';
import { resetTeachState } from '../../pages/Teach/reducer/teach.slice';
import { useAppDispatch, useAppSelector } from '../../reduxStore/reduxHooks';
import { useSideBarOptions } from '../../utils/sidebarOptions';

export default function AppLayout() {
  // console.log('main app mounted');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user_info, contact_popup_open } = deserify(
    useAppSelector((state) => state.auth)
  );
  const { toastInfo } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useAppDispatch();
  const teacher_profile_id = deserify(getLocalStorage('userId'));
  const options = useSideBarOptions();

  useEffect(() => {
    if (!user_info) {
      getTeacherProfile(teacher_profile_id);
    }
  }, [user_info]);

  const getTeacherProfile = async (teacherId: string) => {
    try {
      setLoading(true);
      const response = await UMSLoginAPIServiceV1Client.fetchTeacherProfile({
        teacherProfileId: BigInt(teacherId),
      });
      if (response.data) {
        dispatch(setUserInfo(response.data));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
      dispatch(resetAuthState());
      dispatch(resetHomeDashboardState());
      dispatch(resetHomeworkState());
      dispatch(resetManageHWState());
      dispatch(resetTeachState());
      dispatch(resetAnalyticsState());
      // navigate('/login');
      // localStorage.clear();
      clearLocalStorageKeys();
    }
  };
  const closeToastHandler = () => {
    dispatch(toggleToastOpen(false));
  };
  return (
    <Box>
      <Toast
        variant={toastInfo?.variant}
        open={toastInfo?.open}
        label={toastInfo?.label}
        onClose={closeToastHandler}
      />
      {isMobile && (
        <Sidebar
          open={sidebarDisplay}
          handleClose={() => setSidebarDisplay(false)}
          options={options}
        />
      )}
      <Header
        sidebarDisplay={sidebarDisplay}
        setSidebarDisplay={setSidebarDisplay}
      />
      <ContactPopup
        open={contact_popup_open}
        setOpen={(val: boolean) => {
          dispatch(setContactPopupOpen(val));
        }}
      />
      <Box
        sx={{
          paddingTop: { xs: pxToRem(60), md: pxTovW(100) },
          // overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
