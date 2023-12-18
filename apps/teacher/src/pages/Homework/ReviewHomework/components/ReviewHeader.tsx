import { IStyles, PrimaryButton, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';

const styles: IStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: { xs: 'common.white', md: 'inherit' },
    padding: { xs: pxToRem(20), md: `${pxTovW(20)} ${pxTovW(240)}` },
  },
};
interface IProps {
  proceedClickhandler?: () => void;
}
export default function ReviewHeader(props: IProps) {
  const { proceedClickhandler } = props;

  return (
    <Box sx={styles.root}>
      <Typography variant="h1">My Homework</Typography>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <PrimaryButton onClick={proceedClickhandler}>Proceed</PrimaryButton>
      </Box>
    </Box>
  );
}
