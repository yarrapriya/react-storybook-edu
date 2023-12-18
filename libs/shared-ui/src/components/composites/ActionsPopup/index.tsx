import { Box, Button, Dialog, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';

interface IProps {
  iconName: string;
  popupText: string;
  splitText?: string;
  open: boolean;
  handleClose?: () => void;
  yesClickHandler: () => void;
  noClickHandler: () => void;
  fontSmall?: boolean;
}
const styles: IStyles = {
  root: {

  },
  iconBox: {
    height: { xs: pxToRem(113), md: pxTovW(206) },
    display: 'flex',
    width: { xs: pxToRem(113), md: pxTovW(206) },
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '30%',
    transform: 'translateY(-50%)',
  },
  actionPopupText: {
    margin: {
      xs: '30% auto 20px auto',
      md: `auto auto ${pxTovW(20)} auto`,
    },
    textAlign: 'center',
    //   alignSelf: 'flex-end',
    height: 'max-content',
    width: { xs: '90%', md: pxTovW(388) },
  },
  actionPopupTextSmall: {
    margin: {
      xs: `${pxToRem(60)} auto 0 auto`,
      md: `${pxTovW(110)} auto 0 auto`,
    },
    textAlign: 'center',
    //   alignSelf: 'flex-end',
    height: '100%',
    width: { xs: '90%', md: pxTovW(388) },
  },
};

export const ActionsPopup = (props: IProps) => {
  const {
    open,
    iconName,
    popupText,
    splitText,
    handleClose,
    yesClickHandler,
    noClickHandler,
    fontSmall,
  } = props;
  return (
    <Dialog open={open} onClose={handleClose && handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            height: { xs: pxToRem(235), md: pxTovW(428) },
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: { xs: pxToRem(295), md: pxTovW(537) },
            borderRadius: '10%',
            position: 'fixed',
            top: '30%',
            // left: { xs: '10%', sm: '16%', md: '30%' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              top: '0px',
              left: '0%',
              height: pxTovW(8),
              width: '100%',
            }}
          >
            <IconBox iconName={iconName} />
          </Box>
          <Box
            sx={fontSmall ? styles.actionPopupTextSmall : styles.actionPopupText}
          >
            {!splitText ? (
              <Typography variant={fontSmall ? 'h2' : 'h1'}>
                {popupText}
              </Typography>
            ) : (
              <Box sx={{ width: '106%' }}>
                <Typography
                  variant={fontSmall ? 'h2' : 'h1'}
                  fontWeight={'regular'}
                >
                  {popupText}
                </Typography>
                <Typography variant={fontSmall ? 'h2' : 'h1'}>
                  {splitText}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '29px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                height: { xs: pxToRem(48), md: pxTovW(88) },
                width: { xs: pxToRem(120), md: pxTovW(218) },
                backgroundColor: 'rgba(193, 248, 218, 1)',
                border: '1px solid rgba(10, 242, 116, 1)',
              }}
              onClick={yesClickHandler}
            >
              <Typography variant="h2">Yes</Typography>
            </Button>
            <Button
              variant="outlined"
              sx={{
                height: { xs: pxToRem(48), md: pxTovW(88) },
                width: { xs: pxToRem(120), md: pxTovW(218) },
                backgroundColor: 'rgba(255, 238, 238, 1)',
                border: '1px solid rgba(255, 168, 168, 1)',
              }}
              onClick={noClickHandler}
            >
              <Typography variant="h2">No</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
interface IConProps {
  iconName: string;
}
const IconBox = (props: IConProps) => {
  const { iconName } = props;
  return (
    <Box sx={styles.iconBox}>
      <ImageWrapper
        name={iconName}
        parentFolder="icons"
        type="png"
        styles={{
          height: { xs: pxToRem(52), md: pxTovW(94) },
          width: { xs: pxToRem(52), md: pxTovW(94) },
        }}
      />
    </Box>
  );
};
