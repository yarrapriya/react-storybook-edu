import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
const styles: IStyles = {
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '30%',
    display: 'flex',
    height: { xs: pxToRem(20), md: pxTovW(50) },
    marginBottom: { xs: pxToRem(20), md: pxTovW(40) },
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
  },

  iconCard: {
    width: { xs: '90vw', md: pxTovW(554) },
    height: { xs: pxToRem(81), md: pxTovW(121) },
    borderRadius: pxToRem(10),

    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },
  chapterScoreCard: {
    width: { xs: '100%', md: '100%' },
    height: '70vh',
    // margin: { xs: 'auto', md: 'none' },
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    // marginLeft: { md: pxTovW(95) },
  },
  scoreSection: {
    width: { xs: '100%', md: '100%' },
    display: 'flex',
    flexDirection: 'column',
    gap: pxToRem(10),
    // height: '70vh',
    margin: { xs: 'auto', md: 'none' },
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    marginLeft: { md: pxTovW(95) },
  },
};
export const Shimmer = () => {
  return (
    <Box sx={styles.root}>
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
            width: { xs: '100%', md: '100%' },
            backgroundColor: '#FFFFFF',
            gap: pxToRem(10),
          }}
        >
          <Skeleton variant="rectangular" sx={styles.iconCard} />
        </Box>
        <Box sx={styles.scoreSection}>
          <Skeleton variant="rectangular" sx={styles.header}></Skeleton>
          <Skeleton
            variant="rectangular"
            sx={styles.chapterScoreCard}
          ></Skeleton>
        </Box>
      </Box>
    </Box>
  );
};
