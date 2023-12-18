import {
  IStyles,
  SecondaryButton,
  pxToRem,
  pxTovW,
  theme
} from '@geneo2-web/shared-ui';
import AddIcon from '@mui/icons-material/Add';
import { Box, Modal, Typography, useMediaQuery } from '@mui/material';
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
    height: { xs: pxToRem(407), md: 'max-content' },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    padding: { xs: pxToRem(22) },
    mt: { md: '30vh' },
  },

  headingBox: {
    width: '90%',
    borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    padding: { xs: pxToRem(14), md: pxTovW(16) },
  },
  cardBox: {
    width: '90%',
    borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    padding: { xs: pxToRem(14), md: pxTovW(16) },
  },
};

//* Interface
interface IProps {
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  //   displayData: { subject: string; icon: string; class?: string }[];
}
export const AddLpPopup = ({
  modalState,
  setModalState,
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
            Add to Lesson Plan
          </Typography>

          <SecondaryButton
            // color="secondary"
            styles={{
              width: { xs: 'max-content', md: pxTovW(136) },
              height: { xs: pxToRem(36), md: pxTovW(36) },
              borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: 'none',
              }}
            >
              <AddIcon
                sx={{
                  color: '#FFFFFFFF',
                  fontWeight: 'bold',
                  // fontSize: '14px',
                }}
              />
              <Typography
                color="#FFFFFF"
                noWrap
                variant={largeScreen ? 'smallText' : 'button'}
              >
                Create new
              </Typography>
            </Box>
          </SecondaryButton>
        </Box>

        <Box sx={styles.cardBox}>
          <ContentCard
            contentName="Production and Propagation of sound"
            image="chapter1"
            time="10 min"
            totalResources={15}
          />
        </Box>
        <Box sx={styles.cardBox}>
          <ContentCard
            contentName="Production and Propagation of sound"
            image="chapter4"
            time="10 min"
            totalResources={15}
          />
        </Box>
        <Box sx={styles.cardBox}>
          <ContentCard
            contentName="Production and Propagation of sound"
            image="chapter2"
            time="10 min"
            totalResources={15}
          />
        </Box>
        <Box sx={styles.cardBox}>
          <ContentCard
            contentName="Production and Propagation of sound"
            image="chapter3"
            time="10 min"
            totalResources={15}
          />
        </Box>
        <Box sx={{ ...styles.cardBox, border: 'none' }}>
          <ContentCard
            contentName="Production and Propagation of sound"
            image="chapter4"
            time="10 min"
            totalResources={15}
          />
        </Box>
      </Box>
    </Modal>
  );
};
