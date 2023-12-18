import { Box, Dialog } from '@mui/material';

import Close from '@mui/icons-material/Close';
import { ReactElement } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';

interface IProps {
  iconName: string;
  popupText: ReactElement[];

  textcolor?: string;
  background: string;
  open: boolean;
  handleClose?: () => void;

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
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: '15%',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
};

export const InfoPopup = (props: IProps) => {
  const {
    open,
    iconName,
    popupText,

    textcolor,
    background,
    handleClose,

    fontSmall,
  } = props;
  return (
    <Dialog open={open} onClose={handleClose && handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Close sx={{ height: '10px' }} />
        <Box
          sx={{
            height: { xs: pxToRem(235), md: pxTovW(369) },
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            width: { xs: pxToRem(295), md: pxTovW(467) },
            padding: pxToRem(10),
            borderRadius: '2%',
            position: 'fixed',
            top: '30%',
            minWidth: 'max-content',
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
            sx={{
              display: 'flex',
              height: '5px',
              width: '98%',
              justifySelf: 'right',
              //   backgroundColor: 'blue',
              justifyContent: 'right',
            }}
          >
            <Close
              sx={{ fontSize: '13px', cursor: 'pointer' }}
              onClick={handleClose}
            />
          </Box>
          <Box sx={styles.actionPopupText}>
            {popupText.map((elem) => (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',

                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {elem}
              </Box>
            ))}
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
