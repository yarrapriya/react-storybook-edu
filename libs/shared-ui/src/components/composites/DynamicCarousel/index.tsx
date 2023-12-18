import { Box, SxProps } from '@mui/material';
import Slide from '@mui/material/Slide';
import React, { useState } from 'react';

interface IProps {
  items: React.ReactNode[];
  itemsToShow: number;
  containerWidth: string;
  containerStyles?: SxProps;
}
export const DynamicCarousel = ({
  items,
  itemsToShow,
  containerWidth,
  containerStyles,
}: IProps) => {
  const containerRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="carousel-container">
      <Box className="carousel" sx={containerStyles} ref={containerRef}>
        <div style={{ display: 'flex' }}>
          {items.map((item, index) => {
            const isVisible =
              index >= currentIndex && index < currentIndex + itemsToShow;
            return (
              <Slide
                key={index}
                direction={isVisible ? 'left' : 'right'}
                // direction={ch}
                in={isVisible}
                mountOnEnter
                unmountOnExit
                container={containerRef.current}
                // timeout={{ enter: 200, exit: 200 }}
              >
                <div
                  className="carousel-item"
                  style={{
                    flexShrink: 0,
                    width: '200px',
                    height: '100px',
                    background: 'grey',
                  }}
                >
                  {/* Render your item content here */}
                  {item}
                </div>
              </Slide>
            );
          })}
        </div>
      </Box>
      <br />
      <button className="carousel-button prev" onClick={handleClickPrev}>
        Previous
      </button>
      <button className="carousel-button next" onClick={handleClickNext}>
        Next
      </button>
    </div>
  );
};
