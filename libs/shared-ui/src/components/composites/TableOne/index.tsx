import { Box, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    paddingTop: { xs: pxToRem(0), md: pxTovW(0) },
  },
};

export const TableOne = () => {
  return (
    <Box sx={styles.root}>
      <Box>
        <Typography variant="bodyText">will create a Table</Typography>
      </Box>
    </Box>
  );
};
