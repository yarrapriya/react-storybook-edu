import { useNavigate } from 'react-router-dom';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import InputField from '../../elements/InputField';
import PrimaryButton from '../../elements/PrimaryButton';

const styles: IStyles = {
  root: {
    p: {
      xs: `${pxToRem(30)} ${pxToRem(20)}`,
      md: `${pxTovW(50)} ${pxTovW(500)}`,
    },
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
  },
};

export const LoginV1 = () => {
  const navigate = useNavigate();

  const loginClickHandler = () => {
    // console.log('LoginDummy');
    navigate('/');
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant="h1">Start Your</Typography>
        <Typography variant="h1" color="primary">
          Teaching Journey
        </Typography>
      </Box>

      <InputContainer topLabel="Enter Username / Phone / Email" />
      <InputContainer topLabel="Enter Your Password" type="password" />

      <Box sx={styles.forgotAndOtpBox}>
        <Typography variant="linkText" color="primary">
          Forgot Password?
        </Typography>

        <Typography variant="linkText" color="primary" fontWeight="bold">
          SEND OTP
        </Typography>
      </Box>

      <Box sx={styles.secondaryButtonBox}>
        <PrimaryButton fullWidth onClick={loginClickHandler}>
          <Typography variant="h1" color="success.light">
            Login
          </Typography>
        </PrimaryButton>
      </Box>

      <Box sx={styles.registerBox}>
        <Typography variant="bodyText">First Time User?</Typography>
        <Typography variant="linkText" color="primary" fontWeight="bold">
          Register Here
        </Typography>
      </Box>

      <Box sx={styles.supportBox}>
        <SupportAgentIcon fontSize="small" color="secondary" />
        <Typography variant="linkText">Help & Support</Typography>
      </Box>
    </Box>
  );
};

interface InputContainerProps {
  topLabel: string;
  type?: string;
}
const InputContainer = ({ topLabel, type }: InputContainerProps) => {
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
        sx={{ bgcolor: 'success.light' }}
      />
    </Box>
  );
};
