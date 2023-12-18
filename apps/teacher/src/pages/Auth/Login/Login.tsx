import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContactPopup,
  IStyles,
  InputField,
  Loader,
  PrimaryButton,
  deserify,
  isValidEmail,
  isValidMobileNumber,
  pxToRem,
  pxTovW,
  setLocalStorage,
} from '@geneo2-web/shared-ui';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Typography } from '@mui/material';
import {
  TeacherLoginResponse,
  TeacherLoginWithPhoneOrEmailPasswordResponse,
} from '@protos/user_management/ums.login.apis_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HalfSplitLayout from '../../../components/HalfSplitLayout';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME } from '../../../routeHandling/RoutesNomenclature';
import { useAuthentication } from '../../../utils/customHooks';
import { setContactPopupOpen, setUserInfo } from '../reducer/auth.slice';

const styles: IStyles = {
  root: {
    p: {
      xs: `${pxToRem(30)} ${pxToRem(20)}`,
      md: `${pxTovW(50)} ${pxTovW(90)}`,
    },
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
};
//teacher_1
//teacher@1
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [skipped, setSkipped] = useState(false);
  const [credentialError, setCredentialError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const contactPopupOpen = useAppSelector(
    (state) => state.auth.contact_popup_open
  );

  const isAuthenticated = useAuthentication();
  useEffect(() => {
    if (isAuthenticated) navigate(HOME);
  }, []);

  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredential(event.target.value);
    setCredentialError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const loginClickHandler = () => {
    if (validateInputs()) {
      loginRequest();
    }
  };

  const validateInputs = (): boolean => {
    if (!credential.trim()) {
      setCredentialError(
        'Please enter a valid username, phone number, or email.'
      );
      return false;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      return false;
    }
    // if (!isValidMobileNumber(credential) && !isValidEmail(credential)) {
    //   setCredentialError('Invalid phone number, or email.');
    //   return false;
    // }
    setCredentialError('');
    setPasswordError('');
    setError(null);
    return true;
  };

  async function loginRequest() {
    try {
      setLoading(true);
      setError(null);
      let response:
        | TeacherLoginWithPhoneOrEmailPasswordResponse
        | TeacherLoginResponse;
      if (isValidMobileNumber(credential)) {
        response =
          await UMSLoginAPIServiceV1Client.teacherLoginWithPhonePassword({
            phoneNumber: credential,
            password: password,
          });
      } else if (isValidEmail(credential)) {
        response =
          await UMSLoginAPIServiceV1Client.teacherLoginWithEmailPassword({
            email: credential,
            password: password,
          });
      } else {
        response = await UMSLoginAPIServiceV1Client.teacherLoginWithUsername({
          userName: credential,
          password: password,
        });
      }
      setLoading(false);
      if (response?.data) {
        const data = response.data;
        if ('token' in data) {
          // 'data' is now considered to have the type of TeacherLoginResponse
          dispatch(setUserInfo(data));
          setLocalStorage('token', data.token);
          setLocalStorage('userId', data.teacherProfileId.toString());
          setLocalStorage('role', 'teacher');
          setLocalStorage('auth', 'true');
          navigate(HOME);
        } else {
          setError(new Error('Login failed'));
        }
      } else {
        setCredentialError(response.message);
        setPasswordError(response.message);
        setError(new Error('Login failed'));
      }
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          ...styles.root,
          width: { xs: '100%', md: '50%' },
          display: { xs: !skipped ? 'none' : 'initial', md: 'flex' },
        }}
      >
        <Box>
          <Box sx={styles.heading}>
            <Typography variant="h1">Start Your</Typography>
            <Typography variant="h1" color="primary">
              Teaching Journey
            </Typography>
          </Box>
          <InputContainer
            topLabel="Enter Username / Phone / Email"
            value={credential}
            onChange={handleCredentialChange}
            helperText={credentialError}
          />
          <InputContainer
            topLabel="Enter Your Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            helperText={passwordError}
          />
          <Box sx={styles.forgotAndOtpBox}>
            {/* <Typography variant="linkText" color="primary">
          Forgot Password?
        </Typography> */}

            {/* <Typography variant="linkText" color="primary" fontWeight="bold">
          SEND OTP
        </Typography> */}
          </Box>
          <Box sx={styles.secondaryButtonBox}>
            <PrimaryButton fullWidth onClick={loginClickHandler}>
              <Typography variant="h1" color="success.light">
                Login
              </Typography>
            </PrimaryButton>
          </Box>
          {/* <Box sx={styles.registerBox}>
        <Typography variant="bodyText">First Time User?</Typography>
        <Typography variant="linkText" color="text.disabled" fontWeight="bold">
          Register Here
        </Typography>
      </Box> */}
          <Box
            sx={styles.supportBox}
            onClick={() => {
              dispatch(setContactPopupOpen(true));
            }}
          >
            <SupportAgentIcon fontSize="small" color="secondary" />
            <Typography variant="linkText" color="text.disabled">
              Help & Support
            </Typography>
          </Box>
          <ContactPopup
            open={contactPopupOpen}
            setOpen={(val: boolean) => {
              dispatch(setContactPopupOpen(val));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

interface InputContainerProps {
  topLabel: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
}
const InputContainer = ({
  topLabel,
  type,
  value,
  onChange,
  helperText,
}: InputContainerProps) => {
  return (
    <Box sx={styles.inputContainer}>
      <Typography variant="bodyText" fontWeight="bold">
        {topLabel}
      </Typography>

      <InputField
        variant="outlined"
        fullWidth
        boldtext
        nonCircular
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        sx={{ bgcolor: 'success.light' }}
        helperText={
          helperText ? (
            <Typography variant="h4" color={'red'} sx={{ width: '100%' }}>
              {helperText}*
            </Typography>
          ) : (
            <Typography></Typography>
          )
        }
      />
    </Box>
  );
};
