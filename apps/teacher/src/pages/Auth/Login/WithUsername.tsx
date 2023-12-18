import { useNavigate } from 'react-router-dom';

import {
  IStyles,
  ImageWrapper,
  InputField,
  PrimaryButton,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { VERIFY_PASSWORD } from '../../../routeHandling/RoutesNomenclature';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: { xs: pxToRem(50), md: pxTovW(50) },
    // p: {
    //   xs: `${pxToRem(30)} ${pxToRem(20)}`,
    //   md: `${pxTovW(17)} ${pxTovW(570)}`,
    // },
    width: '100%',
    border: '2px solid red',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: { xs: 'start', md: 'center' },
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    // backgroundColor: 'red',
    // margin: { xs: `${pxToRem(20)} ${pxToRem(0)}`, md: pxTovW(40) },
  },
  inputContainer: {
    // mt: { xs: pxToRem(50), md: pxTovW(60) },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    // backgroundColor: 'red',
  },
  forgotAndOtpBox: {
    display: 'flex',
    justifyContent: 'space-between',
    // mt: { xs: pxToRem(30), md: pxTovW(20) },
    // mb: { xs: pxToRem(50), md: pxTovW(50) },
  },
  secondaryButtonBox: {
    width: { xs: '100%', md: '60%' },
    margin: 'auto',
  },

  registerBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    // mt: { xs: pxToRem(50), md: pxTovW(50) },
    // mb: { xs: pxToRem(50), md: pxTovW(50) },
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
  header: {
    width: '100%',
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    padding: { md: pxTovW(23) },
  },
  logo: {
    cursor: 'pointer',
    width: { xs: pxToRem(75), md: pxTovW(100) },
    height: { xs: pxToRem(42), md: pxTovW(56) },
  },
};

export const LoginWithUsername = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const loginClickHandler = () => {
    // loginRequest();
    navigate(VERIFY_PASSWORD);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={{ ...styles.header }}>
        <ImageWrapper
          name="geneo-logo"
          type="png"
          parentFolder="images"
          styles={styles.logo}
        />
      </Box>
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
            Start Your
          </Typography>
          <Typography variant="h1" color="primary" fontWeight="bold">
            Teaching Journey
          </Typography>
        </Box>
        <Box sx={{ ...styles.inputContainer }}>
          <Typography variant="bodyText" fontWeight="bold">
            Enter Username / Phone / Email
          </Typography>

          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            helperText={
              <Box>
                {input === '*' && (
                  <Box
                    sx={{
                      backgroundColor: '#FFEAEA',
                      display: 'flex',
                      alignItems: 'center',
                      padding: {
                        xs: pxToRem(10),
                        md: `${pxTovW(12)} ${pxTovW(30)}`,
                      },

                      // width: '100%',
                      borderRadius: '1.5px',
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ color: '#F54040' }}
                    >
                      Invalid Username
                    </Typography>
                  </Box>
                )}
              </Box>
            }
          />
        </Box>
      </Box>
      <Box sx={{ ...styles.secondaryButtonBox }}>
        <PrimaryButton
          fullWidth
          onClick={loginClickHandler}
          disabled={input === '' ? true : false}
        >
          <Typography variant="h1" color="success.light">
            NEXT
          </Typography>
        </PrimaryButton>
      </Box>

      <Box sx={{ ...styles.registerBox }}>
        <Typography variant="bodyText">First Time User?</Typography>
        <Typography variant="linkText" color="primary" fontWeight="bold">
          Register Here
        </Typography>
      </Box>

      <Box sx={{ ...styles.supportBox }}>
        <SupportAgentIcon fontSize="small" color="secondary" />
        <Typography variant="linkText">Help & Support</Typography>
      </Box>
    </Box>
  );
};
