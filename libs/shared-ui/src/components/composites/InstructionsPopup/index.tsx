import { Box, Button, Dialog, Typography, Modal } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { pxToRem, pxTovW } from 'libs/shared-ui/src/commonUtils/resizeUtils';
import { IStyles } from 'libs/shared-ui/src/commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
interface IProps {
  popupText?: string[];
  open: boolean;
  handleClose?: () => void;
}
const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  root: {
    display: { xs: 'flex' },
    flexDirection: 'column',
    backgroundColor: 'common.white',
    overflowY: 'auto',
    margin: { md: 'auto' },
    width: { xs: '100vw', md: pxTovW(528) },
    height: { xs: 'max-content', md: 'max-content' },
    // minHeight: { xs: '60vh', md: pxTovW(528) },
    maxHeight: { xs: '60vh', md: pxTovW(528) },
    borderRadius: { xs: '3rem 3rem 0 0', md: '1.5rem' },
    justifyContent: 'center',
    mt: { md: '30vh' },
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  headingBox: {
    borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: { xs: pxToRem(19), md: pxTovW(19) },
    paddingTop: { xs: pxToRem(19), md: pxTovW(0) },
    // marginTop: { xs: pxToRem(19), md: pxTovW(19) },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    width: { xs: '1rem' },
    height: { xs: '1rem' },
    alignItems: 'center',
    cursor: 'pointer',
  },
  instructionCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: { xs: pxToRem(14), md: pxTovW(17) },
    width: '90%',
    '& > div': {
      borderBottom: '1px solid #E7F4E7',
    },
    '& > :nth-last-child(-n+1) ': {
      border: 'none',
    },
    // marginTop: { xs: pxToRem(19), md: pxTovW(19) },
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    // backgroundColor: 'blue',
  },
  textBox: {
    display: 'flex',
    padding: {
      xs: `${pxToRem(17.5)} ${pxToRem(7)}`,
      md: `${pxTovW(17.5)} ${pxTovW(7)}`,
    },
    gap: { xs: pxToRem(7), md: pxTovW(7) },
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
};
export const InstructionsPopup = (props: IProps) => {
  const { open, popupText, handleClose } = props;
  return (
    <Modal sx={styles.modal} open={open} onClose={handleClose && handleClose}>
      <Box sx={styles.root}>
        <Box sx={styles.instructionCard}>
          <Box sx={styles.headingBox}>
            <Typography variant="h3" fontWeight="bold">
              Learning Outcome
            </Typography>
            <Box onClick={handleClose} sx={styles.closeBox}>
              <ImageWrapper
                name="close"
                type="png"
                parentFolder="icons"
                styles={styles.close}
              />
            </Box>
          </Box>
          {popupText?.map((elem, i) => (
            <Box key={i} sx={styles.textBox}>
              <Box sx={{ paddingTop: { xs: pxToRem(5), md: pxTovW(3) } }}>
                <CheckOutlinedIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="h4">{elem}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
