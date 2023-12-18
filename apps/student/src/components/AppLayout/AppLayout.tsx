import { Outlet } from 'react-router-dom';

import {
  ContactPopup,
  Sidebar,
  Toast,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setContactPopupOpen,
  setToastInfo,
} from '../../pages/Auth/reducer/auth.slice';
import { useAppSelector } from '../../reduxStore/reduxHooks';
import { useSideBarOptions } from '../../utils/sidebarOptions';
import Header from '../Header';

interface AppLayoutProps {
  hideHeader?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { hideHeader } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarDisplay, setSidebarDisplay] = useState(false);
  const options = useSideBarOptions();
  const { contactPopupOpen, toast_info } = deserify(
    useAppSelector((state) => state.auth)
  );
  const dispatch = useDispatch();
  const closeToastHandler = () => {
    dispatch(setToastInfo({ label: '', variant: 'success', open: false }));
  };
  return (
    <>
      <Toast
        variant={toast_info?.variant}
        open={toast_info?.open}
        label={toast_info?.label}
        onClose={closeToastHandler}
      />
      {isMobile && (
        <Sidebar
          open={sidebarDisplay}
          handleClose={() => setSidebarDisplay(false)}
          options={options}
        />
      )}
      {!hideHeader && (
        <Header
          sidebarDisplay={sidebarDisplay}
          setSidebarDisplay={setSidebarDisplay}
        />
      )}
      <ContactPopup
        open={contactPopupOpen}
        setOpen={(val: boolean) => {
          dispatch(setContactPopupOpen(val));
        }}
      />
      {/* {!hideHeader && <Header />} */}
      <Box
        sx={{
          paddingTop: { xs: pxToRem(60), md: pxTovW(100) },
          height: {
            xs: `calc(100% - ${pxToRem(60)})`,
            md: `calc(100% - ${pxTovW(100)})`,
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;
