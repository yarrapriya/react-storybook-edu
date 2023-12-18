import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ActionPopUpSingleButton,
  IStyles,
  InputField,
  InputFieldContainer,
  LinkButton,
  Loader,
  OtpInputs,
  PrimaryButton,
  deserify,
  pxToRem,
  pxTovW,
  setLocalStorage,
} from '@geneo2-web/shared-ui';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OTPEnum, ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import {
  LoginTypeEnum,
  StudentLoginResponse,
  StudentLoginWithPhoneOrEmailPasswordResponse,
} from '@protos/user_management/ums.login.apis_pb';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  CHOOSE_PROFILE,
  ENTER_UID,
  HOME,
  RESET_PASSWORD_OTP,
} from '../../../routeHandling/RoutesNomenclature';
import {
  setMultipleProfiles,
  setOtpInfo,
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
interface IPopupProps {
  iconName: string;
  popupText: string;
  splitText?: string;
  buttontext: string;
  ctaHandler: () => void;
}
export const LoginNew = () => {
  const [otp, setotp] = useState('');
  const [otpBoxDisplay, setOtpBoxDisplay] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [actionPopupState, setActionPopupState] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [popupDetails, setPopupDetails] = useState<IPopupProps>({
    iconName: '',
    buttontext: 'ok',
    popupText: '',
    ctaHandler: () => setActionPopupState(false),
  });
  const dispatch = useDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const navigate = useNavigate();
  const {
    login_Type,
    login_uid,
    login_email,
    login_phone,
    otp_info,
    user_validation_info,
  } = deserify(useAppSelector((state) => state.auth));

  const handlePasswordLogin = async () => {
    setLoading('loading');
    try {
      let response:
        | StudentLoginWithPhoneOrEmailPasswordResponse
        | StudentLoginResponse
        | undefined;
      if (login_Type === LoginTypeEnum.LOGIN_TYPE_USERNAME) {
        response = await UMSLoginAPIServiceV1Client.studentLoginWithUsername({
          userName: login_uid,
          password: password,
        });
      } else if (login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL) {
        response =
          await UMSLoginAPIServiceV1Client.studentLoginWithEmailPassword({
            email: login_email,
            password: password,
          });
      } else if (login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER) {
        response =
          await UMSLoginAPIServiceV1Client.studentLoginWithPhonePassword({
            phoneNumber: login_phone,
            password: password,
          });
      } else {
        response = undefined;
      }
      if (response) {
        if (response.data && response.status !== 0) {
          setLoading('completed');
          if (Array.isArray(response.data)) {
            if (response.data.length === 1) {
              const userInfo = response.data[0];
              dispatch(setUserInfo(userInfo));
              setLocalStorage('userId', userInfo.studentProfileId.toString());
              setLocalStorage('role', 'student');
              setLocalStorage('auth', 'true');
              navigate(HOME);
            } else {
              dispatch(setMultipleProfiles(response.data));
              navigate(CHOOSE_PROFILE);
            }
          } else {
            const userInfo = response.data;
            dispatch(setUserInfo(userInfo));
            setLocalStorage('userId', userInfo.studentProfileId.toString());
            setLocalStorage('role', 'student');
            setLocalStorage('auth', 'true');
            navigate(HOME);
          }
        } else {
          setLoading('error');
          setPasswordError('Incorrect Password');
        }
      } else {
        setLoading('error');
        console.error('Invalid request');
        return;
      }
    } catch (error) {
      setLoading('error');
      console.log(error);
    }
  };
  const handleOtpLogin = async () => {
    setLoading('loading');
    try {
      const check =
        login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL
          ? login_email
          : login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
          ? login_phone
          : undefined;
      if (otp_info && check) {
        const response = await UMSLoginAPIServiceV1Client.verifyOTP({
          otp: otp,
          verificationCode: otp_info.verification_code,
          check: check,
        });
        if (response.data && response.data.studentProfiles.length > 0) {
          setLoading('completed');
          if (response.data.studentProfiles.length === 1) {
            dispatch(setUserInfo(response.data.studentProfiles[0]));
            setLocalStorage(
              'userId',
              response.data.studentProfiles[0].studentProfileId.toString()
            );
            setLocalStorage('role', 'student');
            setLocalStorage('auth', 'true');
            navigate(HOME);
          } else {
            dispatch(setMultipleProfiles(response.data.studentProfiles));
            navigate(CHOOSE_PROFILE);
          }
        } else {
          setLoading('error');
          setOtpError(true);
        }
      }
    } catch (error: any) {
      setLoading('error');
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
  const sendOtp = async () => {
    setSeconds(30);
    try {
      if (login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL) {
        const response = await UMSLoginAPIServiceV1Client.getEmailOTP({
          email: login_email,
          otpType: OTPEnum.STUDENT_LOGIN,
        });
        if (response.status === 200) {
          dispatch(
            setToastInfo({
              label: 'otp sent to your email',
              variant: 'success',
              open: true,
            })
          );
          dispatch(
            setOtpInfo({
              verification_code: response.verificationCode,
              otp_type: OTPEnum.STUDENT_LOGIN,
            })
          );
        } else {
          dispatch(
            setToastInfo({
              label: 'invalid email id',
              variant: 'error',
              open: true,
            })
          );
        }
      } else if (login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER) {
        const response = await UMSLoginAPIServiceV1Client.getPhoneOTP({
          phoneNumber: login_phone,
          otpType: OTPEnum.STUDENT_LOGIN,
        });
        if (response.status === 200) {
          dispatch(
            setToastInfo({
              label: 'otp sent to your phone',
              variant: 'success',
              open: true,
            })
          );
          dispatch(
            setOtpInfo({
              verification_code: response.verificationCode,
              otp_type: OTPEnum.STUDENT_LOGIN,
            })
          );
        } else {
          dispatch(
            setToastInfo({
              label: 'invalid email id',
              variant: 'error',
              open: true,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgotPassword = async () => {
    try {
      setLoading('loading');
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
      } else if (login_Type === LoginTypeEnum.LOGIN_TYPE_USERNAME) {
        if (
          !user_validation_info?.phoneVerify &&
          !user_validation_info?.emailVerify
        ) {
          setLoading('completed');
          setPopupDetails({
            iconName: 'costumer-service',
            buttontext: 'ok',
            popupText: 'Please Contact Your School Admin for Registration',
            ctaHandler: () => setActionPopupState(false),
          });
          setActionPopupState(true);
          return;
        } else {
          resetRequestData.userLoginInput = login_uid;
        }
      } else {
        setLoading('completed');
        setPopupDetails({
          iconName: 'costumer-service',
          buttontext: 'ok',
          popupText: 'No login type detected.',
          ctaHandler: () => setActionPopupState(false),
        });
        setActionPopupState(true);
        return;
      }
      const response = await UMSLoginAPIServiceV1Client.resetPasswordInit(
        resetRequestData
      );
      setLoading('completed');
      let messageType: string;

      if (
        login_Type === LoginTypeEnum.LOGIN_TYPE_EMAIL ||
        login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
      ) {
        messageType =
          login_Type === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
            ? `+91 ${login_phone?.slice(0, 2)}......${login_phone?.slice(-2)}`
            : `${login_email?.slice(0, 4)}......${login_email?.slice(-8)}`;
      } else {
        if (
          user_validation_info?.phoneVerify === 1 &&
          user_validation_info.emailVerify === 1
        ) {
          messageType = `${user_validation_info.email.slice(
            0,
            4
          )}.....${user_validation_info.email?.slice(-8)}`;
        } else if (
          user_validation_info?.phoneVerify === 1 ||
          user_validation_info?.emailVerify === 1
        ) {
          messageType =
            user_validation_info.phoneVerify === 1
              ? `+91 ${user_validation_info.phoneNumber?.slice(
                  0,
                  2
                )}.......${user_validation_info.phoneNumber?.slice(-2)}`
              : `${user_validation_info.email.slice(
                  0,
                  4
                )}.....${user_validation_info.email?.slice(-8)}`;
        } else {
          messageType = '';
        }
      }

      if (response.verificationCode) {
        dispatch(
          setOtpInfo({
            verification_code: response.verificationCode,
            otp_type: OTPEnum.STUDENT_LOGIN,
          })
        );
        setPopupDetails({
          iconName: 'reset-password',
          buttontext: 'ok',
          popupText: `A verification code was just sent to `,
          splitText: messageType,
          ctaHandler: () => {
            setActionPopupState(false);
            navigate(RESET_PASSWORD_OTP);
          },
        });
        setActionPopupState(true);
      } else {
        setPopupDetails({
          iconName: 'costumer-service',
          buttontext: 'ok',
          popupText: 'Please Contact Your School Admin for Registration',
          ctaHandler: () => setActionPopupState(false),
        });
        setActionPopupState(true);
      }
    } catch (error) {
      setLoading('error');
      console.log('Invalid user');
    }
  };
  return loading === 'loading' ? (
    <Loader />
  ) : (
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
              Welcome
            </Typography>
            <Typography variant="h1" color="primary" fontWeight="bold">
              {user_validation_info
                ? user_validation_info.firstName
                : 'Student'}
            </Typography>
          </Box>
        </Box>
        <Box>
          <InputFieldContainer
            helperTextvariant="success"
            topLabel=""
            value={login_uid || login_email || login_phone || ''}
            helperText={otpBoxDisplay ? otpStatus : undefined}
            nonEditable={true}
            editFunction={() => {
              navigate(ENTER_UID);
            }}
          />
        </Box>

        <Box>
          {otpBoxDisplay === true ? (
            <OtpInputs
              enteredOtp={otp}
              otpWrong={otpError}
              setEnteredOtp={setotp}
              otpLength={5}
            />
          ) : (
            <Box>
              <Typography variant="bodyText" fontWeight="bold">
                Enter your password
              </Typography>
              <Box>
                <InputField
                  value={password}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  fullWidth
                  boldtext
                  nonCircular
                  type={showPassword ? 'text' : 'password'}
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
                    {passwordError}
                  </Typography>
                ) : (
                  <Typography sx={styles.helperText2}></Typography>
                )}
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              mt:
                otpBoxDisplay === true
                  ? {
                      xs: pxToRem(40),
                      md: pxTovW(45),
                    }
                  : '0px',
              gap: { xs: pxToRem(4), md: pxTovW(4) },
              justifyContent:
                login_Type === LoginTypeEnum.LOGIN_TYPE_USERNAME
                  ? 'center'
                  : 'space-between',
            }}
          >
            {otpBoxDisplay === true ? (
              seconds === 0 ? (
                <LinkButton onClick={sendOtp}>Resend otp</LinkButton>
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
              )
            ) : (
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="regular"
                  sx={{
                    color: '#007CDC',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleForgotPassword()}
                >
                  Forgot Password?
                </Typography>
              </Box>
            )}
            {login_Type !== LoginTypeEnum.LOGIN_TYPE_USERNAME && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  if (otpBoxDisplay === false) {
                    sendOtp();
                  }
                  setOtpBoxDisplay(!otpBoxDisplay);
                }}
              >
                {otpBoxDisplay === true ? (
                  <Typography
                    variant="cardText"
                    sx={{
                      color: '#007CDC',
                      textDecoration: { md: 'underline' },
                    }}
                  >
                    USE PASSWORD
                  </Typography>
                ) : (
                  <Typography
                    variant="cardText"
                    sx={{
                      color: '#007CDC',
                      textDecoration: { md: 'underline' },
                    }}
                  >
                    SEND OTP
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={styles.secondaryButtonBox}>
          <PrimaryButton
            fullWidth
            disabled={otpBoxDisplay ? otp.length === 0 : password.length === 0}
            onClick={otpBoxDisplay ? handleOtpLogin : handlePasswordLogin}
          >
            <Typography variant="h1" color="success.light">
              Start
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>
      <ActionPopUpSingleButton
        fontSmall={true}
        open={actionPopupState}
        iconName={popupDetails.iconName}
        popupText={popupDetails.popupText}
        handleClose={() => setActionPopupState(false)}
        splitText={popupDetails.splitText}
        ctaHandler={popupDetails.ctaHandler}
        buttontext="OK"
        background="rgba(193, 248, 218, 1)"
      />
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
