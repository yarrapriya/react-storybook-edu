
import { Box, Modal, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ImageWrapper from '../../../elements/ImageWrapper';
import TypographyHtml from '../TypographyHtml';

const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex' },
    alignItems: 'flex-end',
  },

  root: {
    backgroundColor: 'common.white',
    margin: 'auto',
    width: { xs: '80%', md: pxTovW(500) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    '&:focus-visible': {
      outline: 'none'
    }
  },
  lightBulbRow: {
    marginTop: {
      xs: pxToRem(-34),
      md: pxTovW(-34)
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightbulbWrapper: {
    backgroundColor: 'common.white',
    display: 'inline-block',
    padding: {
      xs: pxToRem(24),
      md: pxTovW(24)
    },
    borderRadius: '50%'
  },
  lightbulb: {
    height: {
      xs: pxToRem(66),
      md: pxTovW(66)
    },
    width: {
      xs: pxToRem(66),
      md: pxTovW(66)
    },
  },
  textStyles: {
    px: {
      xs: pxToRem(66),
      md: pxTovW(66)
    },
    textAlign: 'center'
  },
  okButton: {
    border: '1px solid #0AF274',
    backgroundColor: 'neutral.turquoise',
    marginX: 'auto',
    marginY: {
      xs: pxToRem(16),
      md: pxTovW(16)
    },
    width: {
      xs: pxToRem(120),
      md: pxTovW(120)
    },
    p: {
      xs: pxToRem(16),
      md: pxTovW(16)
    },
    textAlign: 'center',
    cursor: 'pointer'
  }
};

//* Interface
interface IProps {
  text?: string
  modalState: boolean;
  setModalState: (arg: boolean) => void;
}
export const HintPopup = ({
  text,
  modalState,
  setModalState
}: IProps) => {
  if (!text) {
    return null
  }
  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box sx={styles.lightBulbRow}>
          <Box sx={styles.lightbulbWrapper}>
            <ImageWrapper
              name="lightbulb"
              type="png"
              parentFolder="icons"
              styles={styles.lightbulb}
            />
          </Box>
        </Box>
        <Box sx={styles.textStyles}>
          <TypographyHtml variant='bodyText'>
            {text}
          </TypographyHtml>
        </Box>
        <Box sx={styles.okButton} onClick={() => setModalState(false)}>
          <Typography variant='bodyText'>
            OK
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
