import React, { useRef, useState } from 'react';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Slide, Typography, useMediaQuery } from '@mui/material';

import { theme } from '@geneo2-web/shared-ui';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { ChipBadge } from '../../elements/ChipBadge';
import { NoContentCard } from '../NoContent.tsx';

const styles: IStyles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: { md: 'space-between' },
    // gap: { md: pxTovW(25) },
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { md: 'center' },
    p: { xs: `${pxToRem(10)} ${pxToRem(0)}`, md: `${pxTovW(0)}` },
  },

  leftPanel: {
    // border: '1px solid red',
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    gap: { xs: pxToRem(10), md: pxTovW(43) },
    justifyContent: { xs: 'space-between', md: 'flex-end' },
    alignItems: 'center',
    flexShrink: 0,
    p: { xs: `0 ${pxToRem(22)}`, md: '0' },
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },

  rightPanel: {
    // flexBasis: { md: pxTovW(1144) },
    overflow: 'hidden',
    height: { xs: '100%', md: 'max-content' },
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    // gap: { xs: pxToRem(16), md: pxTovW(10) },
    alignItems: 'center',
    overflowX: { xs: 'auto', md: 'hidden' },
    p: {
      xs: `${pxToRem(20)} ${pxToRem(0)} ${pxToRem(10)}`,
      md: `${pxTovW(10)} ${pxTovW(10)} ${pxTovW(20)}`,
    },

    width: {
      // xs: `calc(100% - ${pxToRem(44)})`,
      xs: '100%',
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
    display: { xs: 'none', md: 'flex' },
    width: { md: pxTovW(49) },
    height: { md: pxTovW(73) },
    borderRadius: { md: pxTovW(8) },
    background: 'white',
    color: 'text.primary',
    flexShrink: 0,
    '&:hover': {
      background: 'white',
    },
  },
  itemMapper: {
    display: 'flex',
    overflowX: 'auto',
    // justifyContent: 'flex-start',
    gap: { xs: pxToRem(16), md: pxTovW(18) },
    // boxSizing: 'border-box',
    '&>div': { flexShrink: 0 },
    '&::-webkit-scrollbar': { display: 'none' },
    flexGrow: '1',
    p: { xs: `${pxToRem(10)} ${pxToRem(20)}`, md: pxTovW(10) },
  },
};

interface IProps {
  sectionTitle?: string;
  items?: React.ReactNode[];
  background?: string;
  itemsPerPage?: number;
  rightPanelWidth?: string;
  isError?: boolean;
  errorMessage?: string;
  noContentMessage?: string;
}
export const NewSectionList = ({
  sectionTitle,
  items = [],
  background,
  itemsPerPage = 2,
  rightPanelWidth,
  isError,
  errorMessage,
  noContentMessage,
}: IProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const handleClickNext = () => {
    if (currentIndex < items.length - itemsPerPage) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          ...styles.leftPanel,
          maxWidth: {
            md: rightPanelWidth
              ? `calc(${pxTovW(1440)} - ${pxTovW(+rightPanelWidth)} - ${pxTovW(
                10
              )})`
              : `calc(${pxTovW(1440)} - ${pxTovW(1144)} - ${pxTovW(10)})`,
          },
        }}
      >
        <Box sx={styles.titleWrapper}>
          <Typography variant="h3">{sectionTitle}</Typography>

          <Typography variant="h4">
            <ChipBadge label={items?.length} color="primary" size="small" />
          </Typography>
        </Box>

        {/* {items.length !== 0 && (
          <Button
            variant={!isMobile ? 'contained' : 'outlined'}
            color="primary"
          >
            See All
          </Button>
        )} */}
      </Box>

      {isError ? (
        <Box
          width={{ xs: undefined, md: '100%' }}
          marginY={{ xs: pxToRem(20), md: pxTovW(40) }}
          marginLeft={{ xs: 0, md: pxTovW(40) }}
        >
          <NoContentCard
            variant="error"
            icon="error"
            text={errorMessage || 'Error Occured'}
          />
        </Box>
      ) : items.length === 0 ? (
        <Box
          width={{ xs: undefined, md: '100%' }}
          marginY={{ xs: pxToRem(20), md: pxTovW(40) }}
          marginLeft={{ xs: 0, md: pxTovW(40) }}
        >
          <NoContentCard
            variant="error"
            icon="cards"
            text={noContentMessage || 'No Data Found'}
          />
        </Box>
      ) : (
        <Box
          sx={{
            ...styles.rightPanel,
            background: background
              ? {
                xs: `linear-gradient(to bottom, white 33%,${background} 33% 66%,white 66% 100%)`,
                md: `linear-gradient(to bottom, white 20%,${background} 20% 80%)`,
              }
              : {
                xs: 'linear-gradient(to bottom, white 33%,#EAF4FC 33% 66%,white 66% 100%)',
                md: 'linear-gradient(to bottom, white 20%,#EAF4FC 20% 80%)',
              },

            flexBasis: {
              md: rightPanelWidth ? pxTovW(+rightPanelWidth) : pxTovW(1144),
            },
            minWidth: {
              md: rightPanelWidth ? pxTovW(+rightPanelWidth) : pxTovW(1144),
            },
          }}
        >
          <Button sx={styles.carouselButton} onClick={handleClickPrev}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </Button>

          <Box
            sx={{
              ...styles.itemMapper,

              justifyContent: {
                md:
                  currentIndex + itemsPerPage > items.length
                    ? 'flex-start'
                    : 'space-around',
              },
            }}
            ref={containerRef}
          >
            {items.map((item, index) => {
              const isVisible =
                index >= currentIndex && index < currentIndex + itemsPerPage;
              return (
                <Slide
                  key={index}
                  direction={isVisible ? 'left' : 'right'}
                  in={isMobile ? true : isVisible}
                  mountOnEnter
                  unmountOnExit
                  container={containerRef.current}
                // timeout={{ enter: 200, exit: 200 }}
                >
                  {/* Render your item content here */}
                  <div>{item}</div>
                </Slide>
              );
            })}
          </Box>

          <Button sx={styles.carouselButton} onClick={handleClickNext}>
            <KeyboardArrowRightIcon fontSize="large" />
          </Button>
        </Box>
      )}
    </Box>
  );
};

/*
  // display: 'flex',
  // gap: { xs: pxToRem(16), md: pxTovW(18) },
  // // width: 'max-content',
  // overflow: { xs: 'auto', md: 'unset' },
  // p: { xs: pxToRem(10), md: pxTovW(10) },
  // borderRadius: { xs: pxToRem(10), md: pxTovW(10) },

  const handlePreviousClick = () => {
    let previousIndex = startIndex - itemsPerPage;
    if (previousIndex === 1) previousIndex--;
    // Make sure the previous index is not negative
    if (previousIndex >= 0) {
      setStartIndex(previousIndex);
    }
  };
  const handleNextClick = () => {
    let nextIndex = startIndex + itemsPerPage;
    if (nextIndex === items.length - 1) nextIndex - (itemsPerPage - 1);
    // Make sure the next index doesn't go beyond the length of the items array
    if (nextIndex < items.length) {
      setStartIndex(nextIndex);
    }
  };

{
  isMobile ? (
    <Box sx={styles.itemMapper}>
      {items?.map((item, index) => (
        <React.Fragment key={sectionTitle + '_' + index}>{item}</React.Fragment>
      ))}
    </Box>
  ) : (
    <Box sx={styles.itemMapper}>
      {items
        .slice(startIndex, startIndex + itemsPerPage)
        ?.map((item, index) => (
          <React.Fragment key={sectionTitle + '_' + (startIndex + index)}>
            {item}
          </React.Fragment>
        ))}
    </Box>
  );
}
*/
