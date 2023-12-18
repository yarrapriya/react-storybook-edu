import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';

const styles: IStyles = {
  root: {
    display: 'flex',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    p: { md: `${pxTovW(27)} ${pxTovW(242)} ${pxTovW(17)}` },
  },
  headImage: {
    width: { xs: pxToRem(100), md: pxTovW(124) },
    height: { xs: pxToRem(100), md: pxTovW(126) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
  },
  textHeading: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },
  iconTextBox: {
    display: 'flex',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
};

export const ResourceHeading = () => {
  return (
    <Box sx={styles.root}>
      <ImageWrapper
        name="textBook"
        type="png"
        parentFolder="tempAssets"
        styles={styles.headImage}
      />

      <Box sx={styles.textHeading}>
        <Typography variant="h1">Fluid Friction - Drop Test</Typography>

        <Box sx={styles.iconTextBox}>
          <Box>
            <IconWrapper
              name="clock"
              size="small"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="bodyText" color="primary">
              20 Min
            </Typography>
          </Box>

          <Box>
            <IconWrapper
              name="questions"
              size="small"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="bodyText" color="secondary">
              Activity
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
