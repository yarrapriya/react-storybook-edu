import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
const styles: IStyles = {
  root: {
    width: '100vw',
    // display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    height: { xs: pxToRem(30), md: pxTovW(80) },
    marginBottom: { xs: pxToRem(20), md: pxTovW(40) },
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
  },

  iconCard: {
    width: { xs: '90vw', md: pxTovW(554) },
    height: { xs: pxToRem(81), md: pxTovW(121) },
    borderRadius: pxToRem(10),

    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },
  suggested: {
    width: { xs: '90vw', md: pxTovW(554) },
    height: { xs: pxToRem(81), md: pxTovW(180) },
    borderRadius: pxToRem(10),

    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },
  chapterScoreCard: {
    width: { xs: '100%', md: '100%' },
    height: '70vh',
    margin: { xs: 'auto', md: 'none' },
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    marginLeft: { md: pxTovW(95) },
  },
  dropDownButton: {
    width: pxTovW(552),
    height: pxTovW(56),
    borderRadius: pxTovW(15),
    marginTop: pxTovW(18),
    marginBottom: pxTovW(20),
  },
};
export const Shimmer = () => {
  return (
    <Box sx={styles.root}>
      <Skeleton variant="rectangular" sx={styles.header}></Skeleton>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: pxToRem(20), md: pxTovW(40) },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '100%' },
            backgroundColor: '#FFFFFF',
            gap: pxToRem(30),
          }}
        >
          <Skeleton variant="rectangular" sx={styles.dropDownButton} />
          <Skeleton variant="rectangular" sx={styles.iconCard} />
          <Skeleton variant="rectangular" sx={styles.suggested} />
        </Box>

        <Skeleton variant="rectangular" sx={styles.chapterScoreCard}></Skeleton>
      </Box>
    </Box>
  );
};
