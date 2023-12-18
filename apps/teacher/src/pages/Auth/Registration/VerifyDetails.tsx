import {
  IStyles,
  PrimaryButton,
  UserDetailField,
  pxToRem, pxTovW
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
const styles: IStyles = {
  root: {
    height: { md: '100%' },
    paddingX: { xs: 0, md: pxTovW(60) },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: { md: 'center' }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(26) },
  },
  Heading: {
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'center' },
    gap: { xs: pxToRem(10), md: pxTovW(15) },
  },
  MiddleContainer: {
    // height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(40), md: pxTovW(26) },
    justifyContent: 'space-between'
  },
  DetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(25) },
  },
  BottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(16) },
  },
  bottomText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: { xs: 'center', md: 'center' },
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },

};
//teacher_1
//teacher@1
export const VerifyDetails = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <Box sx={styles.Heading}>
          <Typography variant='h1'>Verify Your</Typography>
          <Typography variant='h1' color={'primary.main'}>Profile</Typography>
        </Box>
        <Box sx={styles.MiddleContainer}>
          <Box sx={styles.DetailsContainer}>
            <Box sx={styles.Texts}>
              <Typography variant='h2' paddingBottom={1} >
                Personal Details
              </Typography>
              <Box>
                <UserDetailField label='Name' value='Deepali Joshi' />
                <UserDetailField label='Email' value='Deepika7@gmail.com' />
              </Box>
            </Box>
            <Box sx={styles.Texts}>
              <Typography variant='h2' paddingBottom={1}>
                School Details
              </Typography>
              <UserDetailField label='School Name' value='Ryan International' />
              <UserDetailField label='Your Board' value='Pune Unversity' />
              <UserDetailField label='Your Medium' value='English' />
              <UserDetailField label='Class & Section' value='8A , 8B , 5C , 5D' />
              <UserDetailField label='Subjects' value='Science, Maths , Hindi ,Marathi' />
            </Box>
          </Box>

          <Box sx={styles.BottomContainer}>
            <PrimaryButton fullWidth>Verify</PrimaryButton>
            <Box sx={styles.bottomText}>
              <Typography variant='bodyText' fontWeight={600}>Feel you need to change any Details?</Typography>
              <Typography variant='bodyText' fontWeight={600} color={'primary.main'}>Contact School Admin</Typography>
            </Box>
          </Box>
        </Box>
      </Box >
    </Box>
  );
}
