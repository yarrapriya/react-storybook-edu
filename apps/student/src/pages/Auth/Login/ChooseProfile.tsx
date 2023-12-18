import {
  IStyles,
  ProfileImageWrapper,
  deserify,
  pxToRem,
  pxTovW,
  setLocalStorage,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
import { StudentLoginResponseType } from '@protos/user_management/ums.login.apis_pb';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  LOGIN,
  RESET_PASSWORD,
} from '../../../routeHandling/RoutesNomenclature';
import { resetAuthState, setUserInfo } from '../reducer/auth.slice';

const styles: IStyles = {
  root: {
    height: '100vh',
    display: 'flex',
    width: '100vw',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: { xs: 'start' },
    alignItems: 'center',
    gap: { xs: pxToRem(20), md: pxTovW(58) },
    // backgroundColor: 'red',
    p: {
      xs: pxToRem(10),
      md: `${pxTovW(128)}  ${pxTovW(0)} `,
    },
  },
  heading: {
    textAlign: 'center',
  },
};
export const ChooseProfile = () => {
  const { multiple_profiles } = deserify(useAppSelector((state) => state.auth));
  const dispatch = useDispatch();
  const { password_verfication } = deserify(
    useAppSelector((state) => state.auth)
  );

  const { selectedFunction, setSelectedFunction } = useGlobalContext();
  const navigate = useNavigate();

  const backClick = () => {
    dispatch(resetAuthState());
    navigate(LOGIN);
  };
  useEffect(() => {
    setSelectedFunction(() => backClick);

    return () => {
      setSelectedFunction(null);
    };
  }, []);
  const handleProfileSelection = (elem: StudentLoginResponseType) => {
    dispatch(setUserInfo(elem));
    if (password_verfication) {
      navigate(RESET_PASSWORD);
    } else {
      setLocalStorage('userId', elem.studentProfileId.toString());
      setLocalStorage('role', 'student');
      setLocalStorage('auth', 'true');
      navigate(HOME);
    }
  };
  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant="g1">Who's Learning?</Typography>
      </Box>
      <Grid
        container
        rowSpacing={pxToRem(50)}
        columnSpacing={pxToRem(50)}
        alignItems="center"
        justifyContent="center"
      >
        {multiple_profiles?.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md="auto"
            sx={{ cursor: 'pointer' }}
            onClick={() => handleProfileSelection(elem)}
          >
            <ProfileImageWrapper
              name={elem.userName}
              size="md"
              backgroundColor={`#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
