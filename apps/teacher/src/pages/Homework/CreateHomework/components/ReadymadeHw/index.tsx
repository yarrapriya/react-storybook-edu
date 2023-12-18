import {
  ChipBadge,
  IStyles,
  NoContentCard,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
interface SectionListProps {
  sectionTitle?: string;
  items?: React.ReactNode[];
  isError?: boolean;
}

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

export const ReadymadeHomeworkSection = (props: SectionListProps) => {
  const { sectionTitle, items = [], isError } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box>
      <Box sx={styles.titleBox}>
        <Typography variant="h2" fontWeight="bold">
          {sectionTitle}
        </Typography>
        <ChipBadge label={items?.length} color="primary" size="small" />
      </Box>

      {isError ? (
        <Box sx={{ p: { xs: pxToRem(20), md: pxTovW(40) } }}>
          {' '}
          <NoContentCard variant="error" icon="error" text="Error Occured" />
        </Box>
      ) : items?.length === 0 ? (
        <Box sx={{ width: '100%', p: { xs: pxToRem(20), md: pxTovW(40) } }}>
          {' '}
          <NoContentCard variant="info" icon="cards" text="No cards to show" />
        </Box>
      ) : (
        <Box sx={styles.contentBox}>
          <Grid container sx={styles.grid} rowGap={pxTovW(20)}>
            {items?.map((item, index) => (
              <Grid key={index} item xs="auto" md={5}>
                <React.Fragment key={sectionTitle + '_' + index}>
                  {item}
                </React.Fragment>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
