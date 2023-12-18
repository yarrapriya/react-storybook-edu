import {
  IStyles,
  InputFieldContainer,
  LinkButton,
  PrimaryButton,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  HOME,
  OTP_SCREEN,
  VERIFY_PHONE,
} from '../../../../routeHandling/RoutesNomenclature';
import { setVerifyPath } from '../../reducer/auth.slice';
const styles: IStyles = {
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // backgroundColor: 'red',
    mt: { xs: pxToRem(20), md: pxTovW(20) },
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(5),
    textAlign: { xs: 'left', md: 'center' },
    flexGrow: 1,
    // margin: 'auto',
  },
  inputContainer: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
  },
  skip: {
    width: { xs: pxToRem(75), md: pxTovW(140) },
    height: { xs: pxToRem(42), md: pxTovW(82) },
    // position: 'relative',
    // right: '100%',
    '& > span': {
      fontSize: pxToRem(16),
      color: '#007CDC',
      // backgroundColor: 'blue',
      padding: '0px',
    },
  },

  secondaryButtonBox: {
    width: { xs: '100%', md: pxTovW(517) },
    margin: 'auto',
    mt: { xs: pxToRem(120), md: pxTovW(129) },
  },
};
export const VerifyPhone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = () => {
    dispatch(setVerifyPath(VERIFY_PHONE));
    navigate(OTP_SCREEN);
  };
  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          ...styles.root,
          width: { xs: '100%', md: '50%' },
          display: 'flex',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              // backgroundColor: 'red',
              alignItems: 'flex-end',
              width: '100%',
              justifyContent: { xs: 'space-between', md: 'unset' },
              textAlign: 'center',
            }}
          >
            <Box sx={styles.heading}>
              <Typography variant="h1" fontWeight="bold">
                Connect Your
              </Typography>
              <Typography variant="h1" color="primary" fontWeight="bold">
                Phone Number
              </Typography>
            </Box>
            {!phoneNumber && (
              <LinkButton
                sx={{ ...styles.skip }}
                onClick={() => navigate(HOME)}
              >
                Skip
              </LinkButton>
            )}
          </Box>
          <Box>
            <InputFieldContainer
              helperTextvariant="error"
              topLabel="Enter 10 Digit Phone Number"
              value={phoneNumber}
              onChange={handleCredentialChange}
              // helperText={'credentialError'}
              // nonEditable={true}
              type="Number"
            />
          </Box>

          <Box sx={styles.secondaryButtonBox}>
            <PrimaryButton fullWidth onClick={handleNext}>
              <Typography variant="h1" color="success.light">
                Next
              </Typography>
            </PrimaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
