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
  VERIFY_EMAIL,
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
    // backgroundColor: 'blue',
    // margin: 'auto',
  },
  inputContainer: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
  },
  skip: {
    width: { xs: pxToRem(75), md: pxTovW(140) },
    height: { xs: pxToRem(42), md: pxTovW(82) },
    // display: 'flex',
    position: 'relative',
    // left: '100%',
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
export const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = () => {
    dispatch(setVerifyPath(VERIFY_EMAIL));
    navigate(OTP_SCREEN);
  };
  const handleCredentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailId(event.target.value);
  };
  const [emailId, setEmailId] = useState('');
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
              justifyContent: { xs: 'space-between', md: 'unset' },
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Box sx={styles.heading}>
              <Typography variant="h1" fontWeight="bold">
                Verify with
              </Typography>
              <Typography variant="h1" color="primary" fontWeight="bold">
                Email ID
              </Typography>
            </Box>
            <LinkButton
              sx={{ ...styles.skip, justifySelf: 'right' }}
              onClick={() => navigate(HOME)}
            >
              Skip
            </LinkButton>
          </Box>
          <Box>
            <InputFieldContainer
              helperTextvariant="error"
              topLabel="Enter Email ID"
              value={emailId}
              onChange={handleCredentialChange}
              // helperText={'credentialError'}
              //   nonEditable={true}
              type="email"
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
