import { theme } from '@geneo2-web/shared-ui';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Slide, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { NoContentCard } from '../NoContent.tsx';
const styles: IStyles = {
  root: {},

  heading: {
    display: 'flex',
    flexDirection: 'column',
    gap: pxTovW(8),
    padding: {
      xs: `0 ${pxToRem(20)} 0 ${pxToRem(20)}`,
      md: `${pxTovW(24)} ${pxTovW(18)} 0`,
    },
    paddingBottom: 0,
  },
  subtitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemWrapper: {
    background: {
      xs: 'linear-gradient(to bottom, white 33%,#FCF1C7 33% 66%,white 66% 100%)',
      md: 'linear-gradient(to bottom, white 40%,#EAF4FC 20% 80%)',
    },
    display: 'flex',
    overflowX: 'auto',
    justifyContent: 'flex-start',
    gap: { xs: pxToRem(16), md: pxTovW(18) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(20) },
    paddingBottom: { xs: 0, md: pxTovW(40) },
    '&::-webkit-scrollbar': { display: 'none' },
    paddingLeft: { xs: pxToRem(22), md: pxTovW(22) },
    paddingRight: { xs: pxToRem(22), md: pxTovW(22) },
    boxSizing: 'border-box',
    '&>div': { flexShrink: 0 },
  },
  carouselButton: {
    display: { xs: 'none', md: 'inline-flex' },
    padding: 0,
    minWidth: 0,
    width: pxTovW(28),
    height: pxTovW(28),
    borderRadius: pxTovW(5),
    border: '1px solid grey',
    marginLeft: pxTovW(10),
  },
};
interface IProps {
  title: string | React.ReactNode;
  subtitle?: string;
  items: React.ReactNode[];
  itemsToShow?: number;
  containerMdWidth: string;
}
export default function SectionListWithTopCarousel(props: IProps) {
  const {
    title,
    subtitle,
    items = [],
    itemsToShow = 3,
    containerMdWidth,
  } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = React.useRef(null);
  const handleClickNext = () => {
    if (currentIndex < items.length - itemsToShow) {
      setCurrentIndex((prevIndex) => prevIndex + itemsToShow);
    }
  };

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsToShow);
    }
  };
  return (
    <Box sx={{ ...styles.root, width: { xs: '100%', md: containerMdWidth } }}>
      <Box sx={styles.heading}>
        {typeof title === 'string' ? (
          <Typography variant="h3" fontWeight="medium">
            {title}
          </Typography>
        ) : (
          <>{title}</>
        )}
        <Box sx={styles.subtitleContainer}>
          {subtitle && (
            <Typography
              variant="cardText"
              color="text.disabled"
              fontWeight="regular"
            >
              {subtitle}
            </Typography>
          )}
          <Box sx={{ marginLeft: 'auto' }}>
            <Button sx={styles.carouselButton} onClick={handleClickPrev}>
              <ChevronLeftIcon />
            </Button>

            <Button sx={styles.carouselButton} onClick={handleClickNext}>
              <ChevronRightIcon />
            </Button>
          </Box>
        </Box>
      </Box>
      {items.length === 0 ? (
        <NoContentCard variant="info" icon="cards" text="No cards to show" />
      ) : (
        <Box sx={styles.itemWrapper} ref={containerRef}>
          {items.map((item, index) => {
            const isVisible =
              index >= currentIndex && index < currentIndex + itemsToShow;
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
      )}
    </Box>
  );
}
