import {
  GeneoLoginCarousel,
  IStyles,
  ImageWrapper,
  Toast,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Grid } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  setSkippedFeatureScreens,
  setToastInfo,
} from '../../../pages/Auth/reducer/auth.slice';
import { useAppSelector } from '../../../reduxStore/reduxHooks';

const styles: IStyles = {
  container: {
    borderRadius: '5px',
    display: 'flex',
    width: '100vw',
    height: '100vh',
    margin: 'auto',
    position: 'relative',
  },
  logo: {
    position: { xs: 'relative', md: 'absolute' },
    display: 'block',
    width: { xs: pxToRem(84.95), md: pxTovW(140) },
    height: { xs: pxToRem(47.51), md: pxTovW(82) },
    left: { md: pxTovW(37) },
    top: { md: pxTovW(37) },
    marginTop: { xs: pxToRem(18), md: 0 },
    alignSelf: 'center',
    zIndex: 1,
  },
};

export default function HalfSplitAuthLayout() {
  const { skipped_feature_screens } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { toast_info } = deserify(useAppSelector((state) => state.auth));
  const closeToastHandler = () => {
    dispatch(setToastInfo({ label: '', variant: 'success', open: false }));
  };
  const setSkipped = (flag: boolean) => {
    dispatch(setSkippedFeatureScreens(flag));
  };
  return (
    <Grid container sx={styles.container}>
      <Toast
        variant={toast_info?.variant}
        open={toast_info?.open}
        label={toast_info?.label}
        onClose={closeToastHandler}
      />
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: '#E5E5E5',
          height: '100vh',
          display: {
            xs: skipped_feature_screens === false ? 'none' : 'block',
            md: 'block',
          },
        }}
      >
        <GeneoLoginCarousel
          skipped={skipped_feature_screens}
          setSkipped={() => setSkipped(false)}
          role={ProfileRolesEnum.PROFILE_ROLE_TEACHER}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          gap: { xs: pxToRem(34), md: 0 },
          height: { xs: '100vh', md: '100vh' },
          overflowY: 'auto',
          padding: { xs: pxToRem(20), md: `${pxTovW(74)} ${pxTovW(94)}` },
        }}
      >
        <ImageWrapper
          name="geneo-logo"
          type="png"
          parentFolder="images"
          styles={styles.logo}
        />
        <Outlet />
      </Grid>
    </Grid>
  );
}
