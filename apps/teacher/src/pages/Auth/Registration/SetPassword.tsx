import { IStyles, PasswordInputField, PrimaryButton, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
const styles: IStyles = {
  root: {
    height: { md: '100%' },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(40) },
    justifyContent: { md: 'center' }
  },
  heading: {
    textAlign: { xs: 'start', md: 'center' },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(31), md: pxTovW(82) }
  },
  Passwordcontainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(30) }
  },

}
export const SetPassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(newPassword, confirmPassword)

  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant='h1' paddingTop={1}>Forgot Password.</Typography>
        <Typography variant='h1' fontWeight={'bold'} color={'primary.main'} paddingTop={2}> Reset here</Typography>
      </Box>
      <Box sx={styles.body}>
        <Box sx={styles.Passwordcontainer}>
          <PasswordInputField
            topLabel='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type='password'
          />
          <PasswordInputField
            topLabel='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
          />
        </Box>
        <Box>
          <PrimaryButton fullWidth>CONFIRM PASSWORD</PrimaryButton>
        </Box>
      </Box>
    </Box>
  )

}
