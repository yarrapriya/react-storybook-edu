import {
  FullSectionListSckeleton,
  IStyles,
  ShimmerActiveHwCard,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { ShimmerSkeletonCard } from '../../Home/shimmer';

const styles: IStyles = {
  titleBox: {
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(10), alignItems: 'center' },
    pl: { xs: pxToRem(20), md: pxTovW(0) },
  },
  contentBox: {
    boxSizing: 'border-box',
    p: { xs: pxToRem(20), md: pxTovW(20) },
    background: {
      xs: 'linear-gradient(to bottom, white 33%,#EAF4FC 33% 100%)',
      md: 'linear-gradient(to bottom, white 20%,#EAF4FC 20% 80%,white 80% 100%)',
    },
    width: { xs: '100vw', md: pxTovW(741) },
    height: { xs: 'max-content', md: pxTovW(660) },
    overflow: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    // border: '1px solid red',
  },
  grid: {
    height: '100%',
    width: { xs: 'max-content', md: '100%' },
    // overflowX: 'scroll',
    justifyContent: 'center',
    pt: { xs: pxToRem(10), md: pxTovW(10) },
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
  gridItem: {
    justifyContent: 'center',
  },
};

export const ReadylessonShimmer = () => {
  return (
    <Box sx={styles.contentBox}>
      <Grid container sx={styles.grid} rowGap={pxTovW(20)}>
        {new Array(4).fill(0).map((item, index) => (
          <Grid key={index} item xs="auto" md={5}>
            <ShimmerSkeletonCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export const ResourceShimmer = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {new Array(4).fill(0).map((item, index) => (
        <FullSectionListSckeleton fullWidth children={ResourceShimmerArray} />
      ))}
    </Box>
  );
};

const ResourceShimmerArray = [
  <ShimmerActiveHwCard key={1} variant="small" />,
  <ShimmerActiveHwCard key={2} variant="small" />,
  <ShimmerActiveHwCard key={3} variant="small" />,
];
