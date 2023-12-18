import { Box, SxProps, Typography } from '@mui/material';

import { ReactNode } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';

const styles: IStyles = {
  root: {
    // border: '1px solid red',
    boxSizing: 'border-box',
    borderRadius: { md: pxTovW(15) },
    p: { xs: pxToRem(0), md: pxTovW(0) },
    bgcolor: 'white',

    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(25) },
  },

  mainGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
  },

  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },

  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    mt: { xs: pxToRem(9), md: pxTovW(9) },
  },
};
const variantWidth = {
  // xs: { small: pxToRem(313), medium: pxToRem(313), large: pxToRem(313) },
  // md: { small: pxTovW(284), medium: pxTovW(307), large: pxTovW(380) },
  // xs: { small: 'max-content', medium: 'max-content', large:'max-content' },
  // md: { small: 'max-content', medium: 'max-content', large: 'max-content' },
  xs: { small: pxToRem(59), medium: pxToRem(59), large: pxToRem(59) },
  md: { small: pxTovW(105), medium: pxTovW(124), large: pxTovW(151) },
};
const variantHeight = {
  xs: { small: pxToRem(59), medium: pxToRem(59), large: pxToRem(59) },
  md: { small: pxTovW(105), medium: pxTovW(124), large: pxTovW(151) },
};

interface IVariants {
  small: string;
  medium: string;
  large: string;
}
interface IconDetails {
  iconName: string;
  text: string;
}
interface IProps {
  variant: keyof IVariants;
  image: string;
  heading: string;
  secondaryHeading?: string;
  iconDetails?: IconDetails[];
  status?: ReactNode;
  rootStyle?: SxProps;
}

export const HeadingCard = ({
  variant,
  image,
  heading,
  secondaryHeading,
  iconDetails,
  status,
  rootStyle,
}: IProps) => {
  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box
      sx={{
        // width: {
        //   xs: variantWidth.xs[variant],
        //   md: variantWidth.md[variant],
        // },
        height: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },
        ...rootSx,
      }}
    >
      {/* <Grid container sx={styles.mainGrid}>
        <Grid item md={4.8}>
          <Box component={'img'} src={image} alt="subject" sx={styles.image} />
        </Grid>

        <Grid item md={6.8} sx={styles.rightBox}>
          <Typography variant="h1">{heading}</Typography>

          {secondaryHeading && (
            <Typography variant="bodyText" color="primary">
              {secondaryHeading}
            </Typography>
          )}

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
        </Grid>
      </Grid> */}

      {/* <Box
        component={'img'}
        src={image}
        alt="subject"
        sx={{
          ...styles.image,
          width: {
            xs: variantWidth.xs[variant],
            md: variantWidth.md[variant],
          },
          height: {
            xs: variantHeight.xs[variant],
            md: variantHeight.md[variant],
          },
        }}
      /> */}

      {image && (
        <Box
          component={'img'}
          src={image}
          alt="subject"
          sx={{
            ...styles.image,
            width: {
              xs: variantWidth.xs[variant],
              md: variantWidth.md[variant],
            },
            height: {
              xs: variantHeight.xs[variant],
              md: variantHeight.md[variant],
            },
          }}
        />
      )}

      <Box>
        <Typography variant="h1">{heading}</Typography>

        {secondaryHeading && (
          <Typography variant="bodyText" color="primary">
            {secondaryHeading}
          </Typography>
        )}

        {/*//todo:  ref will be required */}
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
      <IconWrapper name={iconName} size="md" parentFolder="icons" type="png" />
      <Typography
        variant="bodyText"
        fontWeight={'bold'}
        color={index % 2 === 0 ? 'primary' : 'secondary'}
      >
        {text}
      </Typography>
    </Box>
  );
};
