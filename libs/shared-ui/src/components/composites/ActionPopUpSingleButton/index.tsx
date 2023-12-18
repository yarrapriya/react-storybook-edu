import { Box, Button, Dialog, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
import PrimaryButton from '../../elements/PrimaryButton';

interface IProps {
  iconName: string;
  popupText: string;
  splitText?: string;
  buttontext: string;
  textcolor?: string;
  background?: string;
  open: boolean;
  handleClose?: () => void;
  ctaHandler: () => void;
  fontSmall?: boolean;
}
const styles: IStyles = {
  root: {},
  iconBox: {
    height: { xs: pxToRem(113), md: pxTovW(143) },
    display: 'flex',
    width: { xs: pxToRem(113), md: pxTovW(143) },
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
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
      md: `${pxTovW(92)} auto 0 auto`,
    },
    textAlign: 'center',
    //   alignSelf: 'flex-end',
    height: '100%',
    width: { xs: '90%', md: pxTovW(388) },
  },
};

export const ActionPopUpSingleButton = (props: IProps) => {
  const {
    open,
    iconName,
    popupText,
    splitText,
    buttontext,
    textcolor,
    background,
    handleClose,
    ctaHandler,
    fontSmall,
  } = props;
  return (
    <Dialog open={open} onClose={handleClose && handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            height: { xs: pxToRem(235), md: pxTovW(369) },
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: { xs: pxToRem(295), md: pxTovW(467) },
            borderRadius: '10%',
            position: 'fixed',
            top: '30%',
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
            sx={
              fontSmall ? styles.actionPopupTextSmall : styles.actionPopupText
            }
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
                <Typography
                  variant={fontSmall ? 'h2' : 'h1'}
                  color="primary.main"
                >
                  {splitText}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              // marginBottom: '29px',
              marginBottom: { xs: pxToRem(34), md: pxTovW(34) },
              '& button': {
                maxWidth: '80%',
              },
            }}
          >
            {!textcolor ? (
              <Button
                variant="outlined"
                sx={{
                  height: { xs: pxToRem(48), md: pxTovW(78) },
                  width: { xs: pxToRem(120), md: pxTovW(190) },
                  maxWidth: '10%',
                  backgroundColor: { background },
                  border: '1px solid rgba(10, 242, 116, 1)',
                }}
                onClick={ctaHandler}
              >
                <Typography variant="h3">{buttontext}</Typography>
              </Button>
            ) : (
              <PrimaryButton onClick={ctaHandler}>{buttontext}</PrimaryButton>
            )}
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
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </Box>
  );
};
