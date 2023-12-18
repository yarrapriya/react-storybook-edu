import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  InputFieldContainer,
  LinkButton,
  OtpInputs,
  PrimaryButton,
  deserify,
  pxToRem,
  pxTovW,
  setLocalStorage,
} from '@geneo2-web/shared-ui';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LoginTypeEnum } from '@protos/user_management/ums.login.apis_pb';
import { useAppSelector } from '../../../reduxStore/reduxHooks';

import { OTPEnum, ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import {
  CHOOSE_PROFILE,
  LOGIN,
  RESET_PASSWORD,
} from '../../../routeHandling/RoutesNomenclature';
import {
  resetAuthState,
  setMultipleProfiles,
  setOtpInfo,
  setPasswordVerificationToken,
  setToastInfo,
  setUserInfo,
} from '../reducer/auth.slice';

const styles: IStyles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(5),
    textAlign: { xs: 'left', md: 'center' },
    flexGrow: 1,
  },
  inputContainer: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
  },
  secondaryButtonBox: {
    width: { xs: '100%', md: pxTovW(517) },
    margin: 'auto',
    mt: { xs: pxToRem(127), md: pxTovW(129) },
  },
};
export const ResetPasswordOtp = () => {
  const [otp, setotp] = useState('');
  const [seconds, setSeconds] = useState(30);
  const {
    login_Type,
    login_uid,
    login_email,
    login_phone,
    otp_info,
    user_validation_info,
  } = deserify(useAppSelector((state) => state.auth));

  const { selectedFunction, setSelectedFunction } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OTP_Length = 5;
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
  const ResetPassword = async () => {
    try {
      const check =
        login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL
          ? login_email
          : login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
          ? login_phone
          : user_validation_info?.phoneVerify === 1 &&
            user_validation_info?.emailVerify === 1
          ? user_validation_info.email
          : user_validation_info?.phoneVerify === 1 ||
            user_validation_info?.emailVerify === 1
          ? user_validation_info?.phoneVerify === 1
            ? user_validation_info.phoneNumber
            : user_validation_info.email
          : undefined;

      if (otp_info && check) {
        const response = await UMSLoginAPIServiceV1Client.verifyOTP({
          otp: otp,
          verificationCode: otp_info.verification_code,
          check: check,
        });

        if (response.data) {
          if (response.data && response.data.studentProfiles.length > 0) {
            if (response.data.studentProfiles.length === 1) {
              dispatch(setUserInfo(response.data.studentProfiles[0]));
              setLocalStorage(
                'userId',
                response.data.studentProfiles[0].studentProfileId.toString()
              );

              navigate(RESET_PASSWORD);
            } else {
              //can be changed in future if the api response changes

              if (login_Type === LoginTypeEnum.LOGIN_TYPE_USERNAME) {
                dispatch(
                  setUserInfo(
                    response.data.teacherProfiles.find(
                      (elem) => elem.userName === login_uid
                    )
                  )
                );
                navigate(RESET_PASSWORD);
              } else {
                dispatch(setMultipleProfiles(response.data.teacherProfiles));
                navigate(CHOOSE_PROFILE);
              }
            }
            dispatch(setPasswordVerificationToken(response.data.token));
          }
        }
      }
    } catch (error: any) {
      if (error.rawMessage) {
        const str: string = error.rawMessage;
        dispatch(
          setToastInfo({
            label: str,
            variant: 'error',
            open: true,
          })
        );
      }
      console.log(error);
    }
  };
  const ResendOtp = async () => {
    setotp('');
    setSeconds(30);
    try {
      const resetRequestData = {
        loginType: login_Type,
        otpType: OTPEnum.STUDENT_RESET_PASSWORD,
        role: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
        userLoginInput: login_phone,
      };

      if (
        login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL ||
        login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
      ) {
        resetRequestData.userLoginInput = login_phone || login_email;
      } else if (
        user_validation_info?.phoneVerify ||
        user_validation_info?.emailVerify
      ) {
        resetRequestData.userLoginInput = login_uid;
      } else {
        navigate(LOGIN);
        return;
      }

      const response = await UMSLoginAPIServiceV1Client.resetPasswordInit(
        resetRequestData
      );

      if (response.verificationCode) {
        dispatch(
          setOtpInfo({
            verification_code: response.verificationCode,
            otp_type: OTPEnum.STUDENT_LOGIN,
          })
        );
        dispatch(
          setToastInfo({
            label: 'OTP resent successfully',
            variant: 'success',
            open: true,
          })
        );
      } else {
        dispatch(
          setToastInfo({
            label: 'OTP Resent failed',
            variant: 'error',
            open: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToastInfo({
          label: 'OTP Resent failed',
          variant: 'error',
          open: true,
        })
      );
    }
  };
  return (
    <Box sx={styles.root}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            // backgroundColor: 'red',
            alignItems: 'flex-end',
            justifyContent: { xs: 'space-between', md: 'center' },
          }}
        >
          <Box sx={styles.heading}>
            <Typography variant="h1" fontWeight="bold">
              OTP for
            </Typography>
            <Typography variant="h1" color="primary" fontWeight="bold">
              Reset Password
            </Typography>
          </Box>
        </Box>
        <Box>
          <InputFieldContainer
            helperTextvariant="success"
            topLabel=""
            value={`${login_email || login_phone || login_uid || ''}`}
            nonEditable={true}
          />
        </Box>

        <Box>
          <OtpInputs
            enteredOtp={otp}
            otpWrong={false}
            setEnteredOtp={setotp}
            otpLength={OTP_Length}
          />

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              mt: {
                xs: pxToRem(40),
                md: pxTovW(45),
              },
              gap: { xs: pxToRem(4), md: pxTovW(4) },
            }}
          >
            {seconds === 0 ? (
              <LinkButton onClick={ResendOtp}>Resend otp</LinkButton>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: pxToRem(4), md: pxTovW(4) },
                }}
              >
                <Typography variant="cardText" sx={{ color: '#007CDC' }}>
                  Resend otp in {'  '}
                </Typography>
                <Typography
                  sx={{ color: '#0AA34F' }}
                  variant="bodyText"
                  fontWeight="bold"
                >
                  <Timer seconds={seconds} setSeconds={setSeconds} />
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={styles.secondaryButtonBox}>
          <PrimaryButton
            fullWidth
            disabled={otp.length !== OTP_Length}
            onClick={ResetPassword}
          >
            <Typography variant="h1" color="success.light">
              Next
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};
interface TimerProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
}
const Timer = (props: TimerProps) => {
  const { seconds, setSeconds } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <Typography sx={{ color: '#0AA34F' }} variant="bodyText" fontWeight="bold">
      {seconds}
    </Typography>
  );
};
