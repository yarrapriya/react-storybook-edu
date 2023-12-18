import { ReactNode } from 'react';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Box,
  Chip,
  Grid,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  root: {
    border: '1px solid red',
    borderColor: 'neutral.electricGreen',
    bgcolor: 'common.white',
    boxSizing: { xs: 'content-box', md: 'border-box' },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    p: { xs: pxToRem(10), md: pxTovW(19) },
    cursor: 'pointer',
  },

  mainGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },

  leftGrid: { position: 'relative', overflow: 'hidden' },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    maxWidth: '100%',
    maxHeight: '100%',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  headingChipBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(6), md: pxTovW(13) },
    alignItems: 'flex-start',
  },
  chip: {
    height: { xs: pxToRem(22), md: pxTovW(38) },
    width: 'max-content',
    backgroundColor: 'warning.main',
    fontSize: { xs: pxToRem(16), md: pxTovW(16) },
  },

  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    alignItems: 'center',
  },
};
const variantWidth = {
  xs: { small: pxToRem(320), medium: pxToRem(320), large: pxToRem(320) },
  md: { small: pxTovW(692), medium: pxTovW(692), large: '100%' },
};
const variantHeight = {
  xs: { small: pxToRem(78), medium: pxToRem(78), large: pxToRem(78) },
  md: { small: pxTovW(159), medium: pxTovW(181), large: pxTovW(159) },
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
  mainHeading: string;
  blueSubText?: string;
  iconDetails?: IconDetails[];
  withArrow?: boolean;
  status?: ReactNode;
  rootStyle?: SxProps;
  cardClickHandler?: () => void;
}
export const ChapterInfoCard = ({
  variant,
  image,
  tagName,
  blueSubText,
  mainHeading,
  iconDetails,
  withArrow,
  status,
  rootStyle,
  cardClickHandler,
}: IProps) => {
  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      onClick={cardClickHandler}
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
      <Grid container sx={styles.mainGrid}>
        <Grid item xs={2.6} md={2.6} sx={styles.leftGrid}>
          <ImageWrapper
            name="chapterImage"
            type="png"
            parentFolder="tempAssets"
            styles={styles.image}
            path={image}
          />
        </Grid>

        <Grid item xs={8.2} md={8.2} sx={styles.textIconGrid}>
          <Box sx={styles.headingChipBox}>
            {tagName && <Chip label={tagName} sx={styles.chip} />}

            <Typography variant="bodyText" fontWeight="bold">
              {mainHeading}
            </Typography>

            {blueSubText && (
              <Typography variant="cardText" color="primary">
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
                      />
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid
          item
          xs={0.4}
          md={0.4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* {withArrow && <IconTextBox iconName="rightArrow" />} */}
          {withArrow && (
            <ArrowForwardIosRoundedIcon
              fontSize={isMobile ? 'small' : 'medium'}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

interface IBox {
  iconName: string;
  text?: string;
}
const IconTextBox = ({ iconName, text }: IBox) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(4), md: pxTovW(4) } }}>
      <IconWrapper
        name={iconName}
        size="small"
        parentFolder="icons"
        type="png"
      />
      {text && (
        <Typography variant="subText" fontWeight={'bold'}>
          {text}
        </Typography>
      )}
    </Box>
  );
};
