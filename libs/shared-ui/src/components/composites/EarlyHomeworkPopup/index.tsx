
import { Timestamp } from '@bufbuild/protobuf';
import { Box, Modal, Typography } from '@mui/material';
import { remainingTimeInHours } from '../../../commonUtils/homework';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';


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
  startTime?: Timestamp
  open: boolean;
  okHandler: () => void;
}
export const EarlyHomeworkPopup = ({
  startTime,
  open,
  okHandler
}: IProps) => {
  return (
    <Modal
      open={open}
      onClose={okHandler}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box sx={styles.lightBulbRow}>
          <Box sx={styles.lightbulbWrapper}>
            <ImageWrapper
              name="timer"
              type="png"
              parentFolder="icons"
              styles={styles.lightbulb}
            />
          </Box>
        </Box>
        <Box sx={styles.textStyles}>
          <Typography variant='bodyText'>
            The homework has not started yet
            <br />
            <br />
            You can attempt the homework in <b>{remainingTimeInHours(startTime, true)}</b>
          </Typography>
        </Box>
        <Box sx={styles.okButton} onClick={okHandler}>
          <Typography variant='bodyText'>
            OK
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
