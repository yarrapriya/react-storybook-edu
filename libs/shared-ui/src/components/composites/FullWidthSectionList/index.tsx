import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { NoContentCard } from '../NoContent.tsx';

interface FullWidthSectionListProps {
  sectionTitle?: string;
  items?: React.ReactNode[];
  hideListCount?: boolean;
  background?: string;
  isError?: boolean;
  errorMessage?: string;
  noContentMessage?: string;
}

const styles: IStyles = {
  root: {},
  sectionListWrapper: {
    paddingTop: pxToRem(10),
    paddingBottom: pxToRem(10),
    display: 'flex',
    flexDirection: 'column',
  },
  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    flexDirection: 'row',
    paddingLeft: {
      xs: pxToRem(22),
      md: 0,
    },
    paddingRight: {
      xs: pxToRem(22),
      md: 0,
    },
  },
  capsuleTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  capsule: {
    backgroundColor: 'primary.main',
    borderRadius: pxToRem(19),
    padding: '5px 22px',
    color: 'common.white',
    marginLeft: pxToRem(10),
  },
  seeAll: {
    textDecoration: 'underline',
    marginLeft: 'auto',
    color: 'primary.main',
    cursor: 'pointer',
  },

  itemWrapper: {
    boxSizing: 'border-box',
    background:
      'linear-gradient(to bottom, white 33%,#FCF1C7 33% 66%,white 66% 100%)',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: { xs: pxToRem(16), md: pxTovW(18) },
    overflowX: 'auto',
    paddingTop: {
      xs: pxToRem(20),
      md: pxTovW(20),
    },
    paddingBottom: {
      xs: 0,
      md: pxTovW(20),
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    paddingLeft: {
      xs: pxToRem(22),
      md: pxTovW(22),
    },
    paddingRight: {
      xs: pxToRem(22),
      md: 0,
    },
    width: {
      xs: '100%',
      md: `100%`,
    },
    '&>div': {
      flexShrink: 0,
    },
  },
};

export default function FullWidthSectionList(props: FullWidthSectionListProps) {
  const {
    sectionTitle,
    items = [],
    hideListCount,
    background,
    isError,
    errorMessage,
    noContentMessage,
  } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={styles.root}>
      <Box sx={styles.sectionListWrapper}>
        <Box sx={styles.sectionTitleWrapper}>
          <Box sx={styles.capsuleTitleWrapper}>
            <Typography variant={mobile ? 'h3' : 'h2'}>
              {sectionTitle}
            </Typography>
            {!hideListCount && <Box sx={styles.capsule}>{items?.length}</Box>}
          </Box>
          {/* <Typography variant='smallText' sx={styles.seeAll}>See All</Typography> */}
        </Box>

        {isError ? (
          <Box sx={{ paddingTop: { xs: pxToRem(20), md: pxTovW(40) } }}>
            {' '}
            <NoContentCard
              variant="error"
              icon="error"
              text={errorMessage || 'Error Occured'}
            />
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ paddingTop: { xs: pxToRem(20), md: pxTovW(40) } }}>
            <NoContentCard
              variant="info"
              icon="cards"
              text={noContentMessage || 'No cards to show'}
            />
          </Box>
        ) : (
          <Box
            sx={{
              ...styles.itemWrapper,
              background: background
                ? background
                : 'linear-gradient(to bottom, white 33%,#FCF1C7 33% 66%,white 66% 100%)',
            }}
          >
            {items?.map((item, index) => (
              <React.Fragment key={sectionTitle + '_' + index}>
                {item}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
