import { ReactNode } from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import rightArrow from '../../../assets/icons/rightArrow.png';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  card: {
    cursor: 'pointer',
    width: { xs: '100%', md: pxTovW(425) },
    height: { xs: pxToRem(80), md: pxTovW(140) },
    padding: { md: pxTovW(10) },
    boxSizing: 'border-box',
    // backgroundColor: 'red',
    // margin: {
    //   xs: '1.5rem 1.5rem 1.5rem 1.5rem',
    //   //   md: '1.098vw 1.098vw 1.098vw 1.098vw',
    // },
    justifyContent: 'center',
    display: 'flex',
    border: 'none',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: { md: `0px 0px ${pxToRem(11)} #E7E7E7D9` },
    },
  },

  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    alignItems: 'center',
  },
};

interface IconDetails {
  iconName: string;
  text: string;
}
interface IProps {
  variant: 'normal' | 'ongoing';
  cardClickHandler?: () => void;
  image?: string;
  mainHeading: string;
  blueSubText?: string;
  withArrow?: boolean;
  rootStyle?: SxProps;
  status?: ReactNode;
  iconDetails?: IconDetails[];
  defaultImage?: string;
}

export const ChapterCard = (props: IProps) => {
  const {
    variant,
    cardClickHandler,
    image,
    mainHeading,
    blueSubText,
    withArrow,
    rootStyle,
    status,
    iconDetails,
    defaultImage,
  } = props;
  let rootSx = { ...styles.card };
  if (variant === 'ongoing')
    rootSx = { ...rootSx, border: '1px solid #38FF92' };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };
  return (
    <Box onClick={cardClickHandler} sx={rootSx}>
      <Box
        sx={{
          display: 'flex',
          gap: pxToRem(10),
          marginLeft: { xs: pxToRem(20) },
        }}
      >
        {/* <img
          alt="chapter"
          src={TopicImage1}
          style={{ height: '6rem', width: '6rem' }}
        /> */}
        <ImageWrapper
          name={defaultImage ? defaultImage : 'chapterImage'}
          type="png"
          parentFolder={defaultImage ? 'icons' : 'tempAssets'}
          styles={{
            height: { xs: pxToRem(68), md: pxTovW(121) },
            width: { xs: pxToRem(68), md: pxTovW(121) },
            objectFit: 'cover',
            borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
          }}
          path={image}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // backgroundColor: 'blue',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              gap: pxToRem(7.5),
              flexDirection: 'column',
              // backgroundColor: 'red',
              // justifyContent: 'flex-start',
              // justifyContent: 'space-between',
              justifyContent: status || iconDetails ? 'space-around' : 'center',
              alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {mainHeading}
            </Typography>

            {blueSubText && (
              <Typography variant="h5" color="#007CDC">
                {blueSubText}
              </Typography>
            )}

            {status ? (
              status
            ) : (
              <Box>
                {iconDetails && (
                  <Box sx={styles.iconTextBoxContainer}>
                    {iconDetails.map((elem, index) => (
                      <IconTextBox
                        key={index}
                        iconName={elem.iconName}
                        text={elem.text}
                        index={index}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {withArrow && (
            <img
              alt="chapter"
              src={rightArrow}
              style={{
                height: pxToRem(12.5),
                width: pxToRem(7),
                marginRight: pxToRem(12.5),
              }}
            />
          )}
          {/* <ImageWrapper
            name="rightArrow"
            type="png"
            parentFolder="icons"
            styles={{ height: '1rem', width: '0.5rem', marginRight: '1.25rem' }}
          ></ImageWrapper> */}
        </Box>
      </Box>
    </Box>
  );
};

interface IBox {
  iconName: string;
  text?: string;
  index?: number;
}
const IconTextBox = ({ iconName, text, index }: IBox) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(4), md: pxTovW(4) } }}>
      <IconWrapper
        name={iconName}
        size="small"
        parentFolder="icons"
        type="png"
      />
      {text && (
        <Typography
          variant="smallText"
          fontWeight={'bold'}
          color={index === 0 ? 'primary' : 'initial'}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};
