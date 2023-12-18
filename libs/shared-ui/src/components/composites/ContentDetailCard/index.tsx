import { Box, Chip, SxProps, Typography } from '@mui/material';

import { ReactNode } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  root: {
    // border: '1px solid green',
    bgcolor: 'common.white',
    boxSizing: 'border-box',
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    boxShadow: `0 0 ${pxTovW(39)} #E7E7E7D9`,
    '&:hover': { boxShadow: `0 0 ${pxTovW(20)} grey` },
    p: { xs: pxToRem(13), md: pxTovW(9) },
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
  },

  mainGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    // maxHeight: { md: pxTovW(139) },
    objectFit: 'cover',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
  },
  textIconGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  headingChipBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(6), md: pxTovW(13) },
  },
  chip: {
    height: { xs: pxToRem(22), md: pxTovW(22) },
    width: 'max-content',
    backgroundColor: 'warning.main',
    fontSize: { xs: pxToRem(10), md: pxTovW(10) },
  },

  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  completedRibbon: {
    position: 'absolute',
    right: { xs: pxToRem(-20), md: pxTovW(-30) },
    top: { xs: pxToRem(20), md: pxTovW(30) },
    paddingLeft: { xs: pxToRem(20), md: pxTovW(30) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(30) },
    backgroundColor: '#007CDC',
    transform: 'rotate(45deg)',
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingLeft: '10px',
  },
};
const variantWidth = {
  xs: { small: pxToRem(283), medium: pxToRem(283), large: pxToRem(319) },
  md: { small: pxTovW(244), medium: pxTovW(330), large: pxTovW(457) },
};
const variantHeight = {
  xs: { small: pxToRem(102), medium: pxToRem(102), large: pxToRem(127) },
  md: { small: pxTovW(88), medium: pxTovW(120), large: pxTovW(165) },
};

interface IconDetails {
  iconName: string;
  text: string;
}
interface IVariants {
  small: string;
  medium: string;
  large: string;
}
interface IProps {
  variant: keyof IVariants;
  image?: string;
  tagName?: string;
  heading: string;
  iconDetails: IconDetails[];
  status?: ReactNode;
  rootStyle?: SxProps;
  showCompletedRibbon?: boolean;
  onClick?: () => void;
}
export const ContentDetailCard = ({
  variant,
  image,
  tagName,
  heading,
  iconDetails,
  status,
  rootStyle,
  showCompletedRibbon,
  onClick,
}: IProps) => {
  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box
      onClick={onClick}
      sx={{
        width: {
          xs: variantWidth.xs[variant],
          md: variantWidth.md[variant],
        },
        height: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },
        ...rootSx,
      }}
    >
      <Box
        sx={{
          height: '100%',
          // paddingBottom: '100%' /* 1:1 Aspect Ratio */,
          // position: 'relative',
          // width: 'max-content',
          flexGrow: 1,
          aspectRatio: 1 / 1,
          position: 'relative',
        }}
      >
        <ImageWrapper
          name="lessonImage1"
          type="png"
          parentFolder="tempAssets"
          styles={styles.image}
          path={image}
        />
      </Box>
      <Box sx={styles.rightWrapper}>
        <Box sx={styles.headingChipBox}>
          {tagName && (
            <Typography variant="cardText">
              <Chip label={tagName} sx={styles.chip} />
            </Typography>
          )}

          <Typography
            variant="cardText"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {heading}
          </Typography>
        </Box>

        {status ? (
          status
        ) : (
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
      {showCompletedRibbon && (
        <Box sx={styles.completedRibbon}>
          <Typography variant="h4" color="common.white">
            Completed
          </Typography>
        </Box>
      )}
    </Box>
  );
};

interface IBox {
  iconName: string;
  text: string;
  index: number;
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
      <Typography
        variant="subText"
        fontWeight={'bold'}
        color={index % 2 === 0 ? 'primary' : 'secondary'}
      >
        {text}
      </Typography>
    </Box>
  );
};
