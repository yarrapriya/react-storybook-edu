import { Box } from '@mui/material';
import LoaderImage from '../../../assets/images/geneo-loader.gif';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {
  loader: {
    backgroundRepeat: 'no-repeat',
    width: { xs: pxToRem(100), md: pxTovW(100) },
    height: { xs: pxToRem(100), md: pxTovW(100) },
    backgroundSize: { xs: `${pxToRem(95)} auto`, md: `${pxTovW(95)} auto` },
    backgroundPosition: 'center',
  },
  pageLoader: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0px',
    textAlign: 'center',
    left: '0',
    top: '0',
    display: 'flex',
    // display: '-ms-flexbox',
    // display: '-webkit-flex',
    zIndex: '9999',
  },
};
export const Loader = () => {
  return (
    <Box sx={styles.pageLoader}>
      <Box
        sx={styles.loader}
        style={{ backgroundImage: `url(${LoaderImage})` }}
      ></Box>
    </Box>
  );
};
