import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  InfoPopup,
  InputFieldContainer,
  Loader,
  PrimaryButton,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  deserify,
  isValidEmail,
  isValidMobileNumber,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { LoginTypeEnum } from '@protos/user_management/ums.login.apis_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME, LOGIN_NEW } from '../../../routeHandling/RoutesNomenclature';
import { useAuthentication } from '../../../utils/customHooks';
import {
  SetUserValidationInfo,
  setLoginEmail,
  setLoginPhone,
  setLoginUID,
} from '../reducer/auth.slice';

const styles: IStyles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
  },
  containerTop: {
    flexBasis: { xs: pxToRem(300) },
    // flexGrow: { md: 1 },
    display: 'flex',
    flexDirection: 'column',
    gap: { md: pxTovW(41) },
    // backgroundColor: 'red',
  },
  containerBotton: {
    marginTop: { xs: pxToRem(60), md: pxTovW(65) },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(60), md: pxTovW(65) },
  },
  supportBox: {
    position: { xs: 'absolute', md: 'relative' },
    bottom: { xs: 0, md: 'none' },
    width: '95%',
    bgcolor: 'neutral.turquoise',
    border: '1px solid',
    borderColor: 'secondary.main',
    borderRadius: { xs: pxToRem(25), md: pxTovW(25) },
    p: {
      xs: `${pxToRem(15)} ${pxToRem(10)}`,
      md: `${pxTovW(20)} ${pxTovW(10)}`,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(5), md: pxTovW(5) },
  },
};
export default function EnterUserIdentification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credential, setCredential] = useState('');
  const [credentialError, setCredentialError] = useState<string>('');
  const { login_Type, login_email, login_phone, login_uid } = deserify(
    useAppSelector((state) => state.auth)
  );
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const [actionPopupState, setActionPopupState] = useState(false);
  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate('/');
  };

  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);
  const isAuthenticated = useAuthentication();
  useEffect(() => {
    if (isAuthenticated) navigate(HOME);
    if (login_Type) {
      switch (login_Type) {
        case LoginTypeEnum.LOGIN_TYPE_EMAIL:
          setCredential(login_email || '');
          break;
        case LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER:
          setCredential(login_phone || '');
          break;
        case LoginTypeEnum.LOGIN_TYPE_USERNAME:
          setCredential(login_uid || '');
          break;

        default:
          break;
      }
    }
  }, []);

  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredential(event.target.value);
    setCredentialError('');
  };

  const validateInputs = (): boolean => {
    if (!credential.trim()) {
      setCredentialError(
        'Please enter a valid username, phone number, or email.'
      );
      return false;
    }

    setCredentialError('');
    return true;
  };

  async function validationRequest() {
    try {
      setLoading('loading');
      let loginType;
      if (isValidMobileNumber(credential)) {
        loginType = LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER;
      } else if (isValidEmail(credential)) {
        loginType = LoginTypeEnum.LOGIN_TYPE_EMAIL;
      } else {
        loginType = LoginTypeEnum.LOGIN_TYPE_USERNAME;
      }

      const response = await UMSLoginAPIServiceV1Client.validateUser({
        loginType,
        userLoginInput: credential,
        role: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
      });
      if (response.status === 200 && response.data.length > 0) {
        if (loginType === LoginTypeEnum.LOGIN_TYPE_USERNAME) {
          dispatch(setLoginUID(credential));
          dispatch(SetUserValidationInfo(response.data[0]));
        } else if (loginType === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER) {
          dispatch(setLoginPhone(credential));
          if (response.data.length === 1) {
            dispatch(SetUserValidationInfo(response.data[0]));
          }
        } else if (loginType === LoginTypeEnum.LOGIN_TYPE_EMAIL) {
          dispatch(setLoginEmail(credential));
          if (response.data.length === 1) {
            dispatch(SetUserValidationInfo(response.data[0]));
          }
        }
        setLoading('completed');
        navigate(LOGIN_NEW);
      } else {
        setLoading('error');
        loginType === LoginTypeEnum.LOGIN_TYPE_PHONE_NUMBER
          ? setCredentialError('Invalid Phone Number')
          : loginType === LoginTypeEnum.LOGIN_TYPE_EMAIL
          ? setCredentialError('Invalid Email Id')
          : setCredentialError('Invalid Username');
      }
    } catch (err) {
      setLoading('error');
      console.log(err);
    }
  }
  const nextClickHandler = () => {
    if (validateInputs()) {
      validationRequest();
    }
  };

  return loading === 'loading' ? (
    <Loader />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.containerTop}>
        <Box sx={{ textAlign: { md: 'center' } }}>
          <Typography variant="h1">Start Your</Typography>
          <Typography variant="h1" color="primary.main">
            Teaching Journey
          </Typography>
        </Box>
        <Box>
          <InputFieldContainer
            helperTextvariant="error"
            topLabel="Enter Username / Phone / Email"
            value={credential}
            onChange={handleCredentialChange}
            helperText={credentialError}
            // nonEditable={true}
          />
        </Box>

        <Box sx={styles.containerBotton}>
          <PrimaryButton onClick={() => nextClickHandler()}>Next</PrimaryButton>
          {/* <Box sx={{ display: 'flex', gap: '5px' }}>
          <Typography variant="h3">First Time User? </Typography>
          <Button sx={{ p: 0 }}>
            <Typography variant="h3" color="primary.main">
              Register Here
            </Typography>
          </Button>
        </Box> */}
        </Box>
      </Box>
      <Box sx={styles.supportBox} onClick={() => setActionPopupState(true)}>
        <ImageWrapper
          name="loginSupport"
          parentFolder="icons"
          type="png"
          styles={{
            height: { xs: pxToRem(20), md: pxTovW(25) },
            width: { xs: pxToRem(16), md: pxTovW(20) },
          }}
        />
        <Typography variant="linkText">Help & Support</Typography>
      </Box>

      <InfoPopup
        iconName="support2"
        popupText={[
          <Typography variant="h2" fontWeight="bold">
            Help & Support
          </Typography>,
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: pxToRem(20), md: pxTovW(31) },
              paddingTop: { xs: pxToRem(21), md: pxTovW(47) },
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid ',
                borderColor: '#D4D4D4',
                paddingBottom: { xs: pxToRem(20), md: pxTovW(31) },
                gap: { xs: pxToRem(9.5), md: pxTovW(7) },
              }}
            >
              {' '}
              <IconWrapper
                name="call2"
                type="png"
                parentFolder="icons"
                customSx={{
                  height: { xs: pxToRem(16.5), md: pxTovW(26.12) },
                  width: { xs: pxToRem(16.5), md: pxTovW(26.12) },
                }}
              />
              <Typography variant="h2" fontWeight="regular">
                Call: {SUPPORT_PHONE}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: pxToRem(9.5), md: pxTovW(7) },
              }}
            >
              <IconWrapper
                name="email"
                type="png"
                parentFolder="icons"
                customSx={{
                  height: { xs: pxToRem(13.75), md: pxTovW(21) },
                  width: { xs: pxToRem(19.63), md: pxTovW(31) },
                }}
              />
              <Typography variant="h2" fontWeight="regular">
                Email:
              </Typography>
            </Box>
            <Typography variant="h2" fontWeight="regular">
              {SUPPORT_EMAIL}
            </Typography>
          </Box>,
        ]}
        background="#007CDC"
        handleClose={() => setActionPopupState(false)}
        open={actionPopupState}
      />
    </Box>
  );
}
