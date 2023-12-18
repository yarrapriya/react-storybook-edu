import { useNavigate } from 'react-router-dom';

import {
  ActionsPopup,
  IStyles,
  IconWrapper,
  InputField,
  PrimaryButton,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { RESET_PASSWORD } from '../../../routeHandling/RoutesNomenclature';

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
  logo: {
    cursor: 'pointer',
    width: { xs: pxToRem(75), md: pxTovW(100) },
    height: { xs: pxToRem(42), md: pxTovW(56) },
  },
};

export const VerifyPassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);
  const popupClickHandler = () => {
    setForgotPasswordPopup(false);
    navigate(RESET_PASSWORD);
  };
  const loginClickHandler = () => {
    // loginRequest();
    navigate('/');
  };
  const [skipped, setSkipped] = useState(false);

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.heading}>
          <Typography variant="h1" fontWeight="medium">
            Welcome
          </Typography>
          <Typography variant="h1" color="primary" fontWeight="bold">
            Deepali Joshi
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: { xs: pxToRem(20), md: pxTovW(50) },
          }}
        >
          <Box
            sx={{
              width: { md: '95%' },
              height: pxTovW(75),
              backgroundColor: '#EEEEEE',
              borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: { xs: pxToRem(14), md: `${pxTovW(4)} ${pxTovW(21)}` },
            }}
          >
            <Typography>Deepali_Joshi</Typography>
            <IconWrapper
              name="edit"
              parentFolder="icons"
              size="md"
              type="png"
              customSx={{
                height: { xs: pxToRem(29), md: pxTovW(48) },
                width: { xs: pxToRem(29), md: pxTovW(48) },
              }}
            />
          </Box>
          <Box sx={styles.inputContainer}>
            <Typography variant="bodyText" fontWeight="bold">
              Enter Your Password
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
                        Incorrect Password
                      </Typography>
                    </Box>
                  )}
                </Box>
              }
            />
          </Box>
          <Box
            sx={styles.forgotAndOtpBox}
            onClick={() => setForgotPasswordPopup(true)}
          >
            <Typography variant="linkText" color="primary">
              Forgot Password?
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.secondaryButtonBox}>
          <PrimaryButton
            fullWidth
            onClick={loginClickHandler}
            disabled={input === '' ? true : false}
          >
            <Typography variant="h1" color="success.light">
              START
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>
      <ActionsPopup
        open={forgotPasswordPopup}
        handleClose={() => setForgotPasswordPopup(false)}
        iconName="reset-password"
        popupText=""
        yesClickHandler={() => setForgotPasswordPopup(false)}
        noClickHandler={() => setForgotPasswordPopup(false)}
        fontSmall
      />
    </>
  );
};

interface PopupButtonprops {
  handleClick: () => void;
}
const PopupButton = (props: PopupButtonprops) => {
  const { handleClick } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: { md: pxTovW(29) },
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          height: { xs: pxToRem(48), md: pxTovW(77) },
          width: { xs: pxToRem(120), md: pxTovW(189) },
          backgroundColor: 'rgba(193, 248, 218, 1)',
          border: '1px solid rgba(10, 242, 116, 1)',
          alignSelf: 'flex-end',
        }}
      >
        <Typography variant="h2" fontWeight="regular">
          ok
        </Typography>
      </Button>
    </Box>
  );
};
