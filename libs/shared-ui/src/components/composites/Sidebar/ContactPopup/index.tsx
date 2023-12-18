import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Modal, Typography } from '@mui/material';

import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from '../../../../commonUtils/constants';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import { copyToClipboard } from '../../../../commonUtils/utilFunctions';
import ImageWrapper from '../../../elements/ImageWrapper';
const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex' },
    alignItems: 'flex-end',
  },

  root: {
    backgroundColor: 'common.white',
    // background: 'red',
    margin: 'auto',
    width: { xs: '80%', md: pxTovW(500) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    '&:focus-visible': {
      outline: 'none',
    },
    position: 'relative',
  },
  contactRow: {
    marginTop: {
      xs: pxToRem(-45),
      md: pxTovW(-45),
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactWrapper: {
    backgroundColor: 'common.white',
    display: 'inline-block',
    padding: {
      xs: pxToRem(24),
      md: pxTovW(24),
    },
    borderRadius: '50%',
  },
  contact: {
    height: {
      xs: pxToRem(66),
      md: pxTovW(66),
    },
    width: {
      xs: pxToRem(66),
      md: pxTovW(66),
    },
  },
  textStyles: {
    px: {
      xs: pxToRem(40),
      md: pxTovW(40),
    },
    pb: {
      xs: pxToRem(40),
      md: pxTovW(40),
    },
    textAlign: 'center',
  },
  callBox: {
    py: {
      xs: pxToRem(20),
      md: pxTovW(20),
    },
    mb: {
      xs: pxToRem(20),
      md: pxTovW(20),
    },
    borderBottom: '1px solid #D2D2D2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      xs: pxToRem(10),
      md: pxTovW(10),
    },
  },
  emailBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      xs: pxToRem(10),
      md: pxTovW(10),
    },
  },
  copy: {
    fontSize: '16px',
    color: '#0AA34F',
    cursor: 'pointer',
  },
};

//* Interface
interface IProps {
  open: boolean;
  setOpen: (arg: boolean) => void;
}
export const ContactPopup = ({ open, setOpen }: IProps) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} sx={styles.modal}>
      <Box sx={styles.root}>
        <CloseIcon
          sx={{
            color: 'common.black',
            fontSize: { xs: pxToRem(14), md: pxTovW(18) },
            right: { xs: pxToRem(10), md: pxTovW(10) },
            top: { xs: pxToRem(10), md: pxTovW(10) },
            position: 'absolute',
            cursor: 'pointer',
          }}
          onClick={(ev) => {
            setOpen(false);
          }}
        />
        <Box sx={styles.contactRow}>
          <Box sx={styles.contactWrapper}>
            <ImageWrapper
              name="contact-popup"
              type="png"
              parentFolder="icons"
              styles={styles.contact}
            />
          </Box>
        </Box>
        <Box sx={styles.textStyles}>
          <Box>
            <Typography variant="h1">Contact us</Typography>
            <Box sx={styles.callBox}>
              <Typography variant="bodyText">
                Call:{' '}
                <Box
                  sx={{ color: 'inherit', textDecoration: 'inherit' }}
                  component="a"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  {SUPPORT_PHONE}
                </Box>{' '}
              </Typography>
              <ContentCopyIcon
                sx={styles.copy}
                onClick={() => copyToClipboard(SUPPORT_PHONE)}
              />
            </Box>
            <Box sx={styles.emailBox}>
              <Typography variant="bodyText">
                <Box
                  sx={{ color: 'inherit', textDecoration: 'inherit' }}
                  component="a"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  Email: {SUPPORT_EMAIL}
                </Box>{' '}
              </Typography>
              <ContentCopyIcon
                sx={styles.copy}
                onClick={() => copyToClipboard(SUPPORT_EMAIL)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
