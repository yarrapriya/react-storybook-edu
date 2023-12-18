import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ActionPopUpSingleButton,
  ActionsPopup,
  IStyles,
  InputField,
  PrimaryButton,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { LOGIN } from '../../../routeHandling/RoutesNomenclature';
import { resetAuthState, setToastInfo } from '../reducer/auth.slice';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { FetchOverAllAnalysisStatsResponse } from '@protos/analysis_management/analysis.student.apis_pb';

const styles: IStyles = {
  root: {
    p: {
      xs: `${pxToRem(30)} ${pxToRem(20)}`,
      md: `${pxTovW(50)} ${pxTovW(90)}`,
    },
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  inputContainer: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
  },
  forgotAndOtpBox: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: { xs: pxToRem(30), md: pxTovW(20) },
    mb: { xs: pxToRem(50), md: pxTovW(50) },
  },
  secondaryButtonBox: {
    width: { xs: '70%', md: '60%' },
    margin: 'auto',
  },

  registerBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    mt: { xs: pxToRem(50), md: pxTovW(50) },
    mb: { xs: pxToRem(50), md: pxTovW(50) },
  },

  supportBox: {
    border: '1px solid red',
    borderColor: 'secondary.main',
    borderRadius: { xs: pxToRem(25), md: pxTovW(25) },
    p: {
      xs: `${pxToRem(15)} ${pxToRem(10)}`,
      md: `${pxTovW(20)} ${pxTovW(10)}`,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    bgcolor: 'neutral.lightBlue',
    cursor: 'pointer',
    mt: { xs: pxToRem(50), md: pxTovW(50) },
  },
  logo: {
    cursor: 'pointer',
    width: { xs: pxToRem(75), md: pxTovW(100) },
    height: { xs: pxToRem(42), md: pxTovW(56) },
  },
  helperText: {
    bgcolor: '#FFDFDF',
    color: 'error.main',
    mt: pxToRem(4),
    padding: { xs: pxToRem(10), md: `${pxTovW(12)} ${pxTovW(30)}` },
  },
  helperText2: {
    height: { xs: pxToRem(32), md: pxTovW(52) },
  },
};

export const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [restPasswordPopup, setResetPasswordPopup] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { selectedFunction, setSelectedFunction } = useGlobalContext();
  const { user_info, password_verification } = deserify(
    useAppSelector((state) => state.auth)
  );
  const [infoPopup, setInfoPopup] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
  const confirmClickHandler = async () => {
    if (confirmPassword !== password) {
      setPasswordError(true);
      return;
    }
    try {
      const response = await UMSLoginAPIServiceV1Client.resetPasswordFinal({
        password: password,
        userName: user_info?.userName,
        verificationCode: password_verification,
      });
      if (response.status === 200) {
        setInfoPopup(true);
        dispatch(resetAuthState());
        // navigate(LOGIN);
      } else {
        dispatch(
          setToastInfo({
            label: 'invalid email id',
            variant: 'error',
            open: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToastInfo({
          label: 'password reset failed',
          variant: 'error',
          open: true,
        })
      );
    }
  };
  return (
    <>
      <Box sx={styles.root}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: { xs: pxToRem(20), md: pxTovW(50) },
          }}
        >
          <Box sx={{ ...styles.heading }}>
            <Typography variant="h1" fontWeight="medium">
              Forgot Password.
            </Typography>
            <Typography variant="h1" color="primary" fontWeight="bold">
              Reset here
            </Typography>
          </Box>
          <Box sx={{ ...styles.inputContainer }}>
            <Typography variant="bodyText" fontWeight="bold">
              New Password
            </Typography>

            <InputField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              boldtext
              nonCircular
              type={'text'}
              sx={{
                // backgroundColor: 'red',
                alignItems: 'center',
                gap: pxTovW(10),
                '& > div': { backgroundColor: '#F5FAFF' },
                '& .MuiFormHelperText-root': {
                  width: '100%',
                },
              }}
            />
            {!password ? (
              <Typography variant="h4" sx={styles.helperText}>
                {'password should not be empty'}
              </Typography>
            ) : (
              <Typography sx={styles.helperText2}></Typography>
            )}
          </Box>
          <Box sx={{ ...styles.inputContainer }}>
            <Typography variant="bodyText" fontWeight="bold">
              Confirm Password
            </Typography>
            <Box>
              <InputField
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                fullWidth
                boldtext
                nonCircular
                type={showPassword ? 'text' : 'password'}
                sx={{
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  gap: pxTovW(10),
                  '& > div': { backgroundColor: '#F5FAFF' },
                  '& .MuiFormHelperText-root': {
                    width: '100%',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff
                            sx={{
                              margin: pxToRem(13),
                            }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              margin: pxToRem(13),
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passwordError ? (
                <Typography variant="h4" sx={styles.helperText}>
                  {'password should be same as confirm password'}
                </Typography>
              ) : (
                <Typography sx={styles.helperText2}></Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ ...styles.secondaryButtonBox }}>
        <PrimaryButton
          fullWidth
          onClick={confirmClickHandler}
          disabled={!password ? true : false}
        >
          <Typography variant="h3" color="success.light">
            RESET PASSWORD
          </Typography>
        </PrimaryButton>
      </Box>
      <ActionsPopup
        open={restPasswordPopup}
        handleClose={() => setResetPasswordPopup(false)}
        iconName="reset-password"
        popupText="Are you sure  you want to reset your password"
        yesClickHandler={() => setResetPasswordPopup(false)}
        noClickHandler={() => setResetPasswordPopup(false)}
      />
      <ActionPopUpSingleButton
        fontSmall
        open={infoPopup}
        iconName="reset-password"
        popupText="Your Password has been Successfully Reset"
        buttontext="Go to login"
        ctaHandler={() => {
          navigate(LOGIN);
          setInfoPopup(false);
        }}
        background="#0AA34F"
        textcolor="white"
      />
    </>
  );
};
