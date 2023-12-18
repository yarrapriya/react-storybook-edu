import {
  IStyles,
  InputFieldContainer,
  OtpInputs,
  PrimaryButton,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { VERIFY_EMAIL } from '../../../../routeHandling/RoutesNomenclature';
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
  },
  inputContainer: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
  },
  skip: {
    width: { xs: pxToRem(75), md: pxTovW(140) },
    height: { xs: pxToRem(42), md: pxTovW(82) },
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
    mt: { xs: pxToRem(127), md: pxTovW(129) },
  },
};
export const OtpScreen = () => {
  const [otp, setotp] = useState('1234');
  const verifyPath = useAppSelector((state) => state.auth.verify_path);
  const navigate = useNavigate();
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
              justifyContent: { xs: 'space-between', md: 'center' },
            }}
          >
            <Box sx={styles.heading}>
              <Typography variant="h1" fontWeight="bold">
                Connect Your
              </Typography>
              <Typography variant="h1" color="primary" fontWeight="bold">
                {verifyPath === VERIFY_EMAIL ? 'Email ID' : 'Phone Number'}
              </Typography>
            </Box>
          </Box>
          <Box>
            <InputFieldContainer
              helperTextvariant="success"
              topLabel={
                verifyPath === VERIFY_EMAIL
                  ? 'Enter Email ID'
                  : 'Enter 10 Digit Phone Number'
              }
              value={'1234'}
              // onChange={handleCredentialChange}
              helperText={
                verifyPath === VERIFY_EMAIL
                  ? 'Otp sent to your email'
                  : 'Otp sent to your phone number'
              }
              nonEditable={true}
              editFunction={() => navigate(verifyPath)}
            />
          </Box>

          <Box sx={styles.forgotAndOtpBox}>
            <OtpInputs
              enteredOtp={otp}
              otpWrong={false}
              setEnteredOtp={setotp}
              otpLength={5}
            />
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                mt: { xs: pxToRem(20), md: pxTovW(45) },
                gap: { xs: pxToRem(4), md: pxTovW(4) },
                justifyContent: { xs: 'center', md: 'left' },
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
                20
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.secondaryButtonBox}>
            <PrimaryButton fullWidth>
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
