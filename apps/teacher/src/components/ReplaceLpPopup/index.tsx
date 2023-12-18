import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  SecondaryButton,
  pxToRem,
  pxTovW,
  theme
} from '@geneo2-web/shared-ui';
import { Box, Button, Modal, Typography, useMediaQuery } from '@mui/material';
import { ContentCard } from './components/contentCard';
const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
  },

  root: {
    backgroundColor: 'common.white',
    overflowY: 'auto',
    margin: { md: 'auto' },
    width: { xs: '100%', md: '27.500vw' },
    height: { xs: pxToRem(565), md: 'max-content' },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    padding: { xs: pxToRem(22) },
    // boxSizing: 'border-box',
    overflowX: 'hidden',
    mt: { md: '30vh' },
  },

  headingBox: {
    width: '100%',
    borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    padding: { xs: `${pxToRem(14)} ${pxToRem(0)}`, md: pxTovW(16) },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    width: { xs: pxToRem(13) },
    height: { xs: pxToRem(13) },
    alignItems: 'center',
    cursor: 'pointer',
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: { xs: pxToRem(18), md: pxTovW(20.5) },
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(31), md: pxTovW(31) },
  },
};

//* Interface
interface IProps {
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  yesClickHandler?: () => void;
  noClickHandler?: () => void;
}
export const ReplaceLpPopup = ({
  modalState,
  setModalState,
  noClickHandler,
  yesClickHandler,
}: //   displayData,
  IProps) => {
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box sx={styles.headingBox}>
          <Typography variant="h2" fontWeight="medium">
            Replace
          </Typography>

          <Box onClick={(e) => setModalState(false)} sx={styles.closeBox}>
            <ImageWrapper
              name="close"
              type="png"
              parentFolder="icons"
              styles={styles.close}
            />
          </Box>
        </Box>
        <Box sx={styles.contentBox}>
          <Box
            sx={{
              display: 'flex',
              width: { xs: pxToRem(252), md: pxTovW(377) },
              height: { xs: pxToRem(46), md: pxTovW(61) },
              textAlign: 'center',
            }}
          >
            <Typography variant="bodyText" fontWeight="bold">
              Would You Like to Replace Your card with{' '}
              <Typography
                variant="bodyText"
                fontWeight="bold"
                sx={{ color: '#007CDC' }}
              >
                Ratio & Proporation?
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: { xs: pxToRem(20), md: pxTovW(40) },
            }}
          >
            <ContentCard image="chapter1" contentName="Ratio & Proporation" />
            <IconWrapper
              name="refresh"
              parentFolder="icons"
              size="md"
              type="png"
              customSx={{
                width: { xs: pxToRem(25), md: pxTovW(30) },
                height: { xs: pxToRem(33), md: pxTovW(39) },
              }}
            />
            <ContentCard image="chapter2" contentName="Ratio & Proporation" />
          </Box>
          <Box sx={{ width: '100%' }}>
            {largeScreen ? (
              <Box
                sx={{
                  display: 'flex',
                  //   backgroundColor: 'red',
                  width: '100%',
                  justifyContent: 'space-around',
                  marginTop: pxTovW(12),
                  //   marginBottom: '29px',
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
            ) : (
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { xs: pxToRem(20), md: pxTovW(20) },
                    marginTop: { xs: pxToRem(20), md: pxTovW(17) },
                  }}
                >
                  <SecondaryButton
                    styles={{
                      backgroundColor: '#E4FFF0',
                      height: { xs: pxToRem(55) },
                      width: { xs: '100%' },
                      border: '1px solid #0AA34F75',
                      color: '#0AA34F',
                    }}
                    onClick={noClickHandler}
                  >
                    NO
                  </SecondaryButton>
                  <SecondaryButton
                    styles={{
                      height: { xs: pxToRem(55) },
                      width: { xs: '100%' },
                    }}
                    onClick={yesClickHandler}
                  >
                    YES
                  </SecondaryButton>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
