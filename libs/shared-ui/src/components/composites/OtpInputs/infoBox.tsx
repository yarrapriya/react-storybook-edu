import { Box, SxProps, Typography } from '@mui/material';

import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';

interface IProps {
  message: string;
  error?: boolean;
  rootStyle?: SxProps;
}
export const InfoBox = ({ message, error, rootStyle }: IProps) => {
  const styles: IStyles = {
    root: {
      boxSizing: 'border-box',
      p: { xs: `0 ${pxToRem(10)}`, md: `0 ${pxTovW(30)}` },
      bgcolor: error ? 'error.light' : 'neutral.springGreen',
      height: { xs: pxToRem(38), md: pxTovW(52) },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      mt: { xs: pxToRem(5), md: pxTovW(5) },
    },
  };

  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box sx={rootSx}>
      <Typography
        variant="bodyText"
        color={error ? 'error.main' : 'secondary.main'}
      >
        {message}
      </Typography>
    </Box>
  );
};
