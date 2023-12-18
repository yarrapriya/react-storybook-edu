import { ChipBadge, theme } from '@geneo2-web/shared-ui';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
interface SectionListProps {
  sectionTitle?: string;
  items?: React.ReactNode[];
}

const styles: IStyles = {
  sectionListWrapper: {
    width: '100%',
    paddingTop: pxToRem(10),
    paddingBottom: pxToRem(10),
    display: 'flex',
    gap: { md: pxTovW(25) },
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    // justifyContent: { md: 'center' },
    alignItems: {
      md: 'center',
    },
  },
  sectionTitleWrapper: {
    // flexBasis: { md: '25%' },
    flexGrow: '1',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(43) },
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    justifyContent: { xs: 'space-between', md: 'flex-end' },
    alignItems: 'center',
    flexShrink: 0,
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
    // maxWidth: { md: pxTovW(200) },
    alignItems: 'center',
    gap: pxTovW(10),
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
    marginLeft: {
      xs: 'auto',
      md: 'initial',
    },
    color: 'primary.main',
    cursor: 'pointer',
  },
  contentsListDisplay: {
    // flexGrow: 1,
    // boxSizing: 'border-box',
    flexBasis: { md: pxTovW(1214) },
    overflow: 'hidden',
    height: { xs: '100%', md: 'max-content' },
    background: {
      xs: 'linear-gradient(to bottom, white 33%,#EAF4FC 33% 66%,white 66% 100%)',
      md: 'linear-gradient(to bottom, white 20%,#EAF4FC 20% 80%)',
    },
    display: 'flex',

    gap: {
      xs: pxToRem(16),
      md: pxTovW(18),
    },
    alignItems: 'center',
    overflowX: { xs: 'auto', md: 'hidden' },
    paddingTop: {
      xs: pxToRem(20),
      md: pxTovW(10),
    },
    paddingBottom: {
      xs: pxToRem(10),
      md: pxTovW(20),
    },
    paddingLeft: {
      xs: pxToRem(22),
      md: pxTovW(10),
    },
    paddingRight: {
      xs: pxToRem(22),
      md: pxTovW(10),
    },
    width: {
      xs: `calc(100% - ${pxToRem(44)})`,
      md: `calc(100% - ${pxTovW(60)})`,
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  carouselButton: {
    margin: '0px',
    minWidth: 0,
    padding: '0px !important',
    display: { xs: 'none', md: 'block' },
    width: { md: pxTovW(49) },
    height: { md: pxTovW(73) },
    borderRadius: '0.417vw',
    background: 'white',
    flexShrink: 0,
  },
};

export default function SectionList(props: SectionListProps) {
  const { sectionTitle, items } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
      }}
    >
      <Box sx={styles.sectionListWrapper}>
        <Box sx={styles.sectionTitleWrapper}>
          <Box sx={styles.capsuleTitleWrapper}>
            <Typography variant="h3">{sectionTitle}</Typography>
            <Typography variant="h4">
              <ChipBadge label={items?.length} color="primary" size="small" />
            </Typography>
          </Box>

          <Box>
            <Button
              variant={largeScreen ? 'contained' : 'outlined'}
              color="primary"
            >
              See All
            </Button>
          </Box>
        </Box>

        <Box sx={styles.contentsListDisplay}>
          <Button sx={styles.carouselButton}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </Button>
          {items?.map((item, index) => (
            <React.Fragment key={sectionTitle + '_' + index}>
              {item}
            </React.Fragment>
          ))}
          <Button sx={styles.carouselButton}>
            <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
