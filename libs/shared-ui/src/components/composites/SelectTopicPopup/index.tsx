import {
  IStyles,
  ImageWrapper,
  TopicScoreCard,
  getMediaBasePath,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Modal, Typography, useMediaQuery } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex' },
    alignItems: 'flex-end',
  },

  root: {
    backgroundColor: 'common.white',
    // backgroundColor: 'yellow',
    // overflow: 'hidden',
    // overflowY: 'scroll',
    margin: { md: 'auto' },
    width: { xs: '100vw', md: pxTovW(742) },
    height: { xs: pxToRem(364), md: pxTovW(528) },
    // maxHeight: { md: pxTovW(528) },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    padding: {
      xs: `${pxToRem(10)} ${pxToRem(0)} ${pxToRem(20)} ${pxToRem(0)}`,
    },
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: `${pxTovW(0)} ${pxTovW(4)} ${pxTovW(18)} #3608918F ,${pxTovW(
      0
    )} ${pxTovW(-3)} ${pxTovW(10)}#292CE696 inset`,
    // mt: { md: '30vh' },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  headingBox: {
    width: '100%',
    height: 'max-content',
    position: 'sticky',
    borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    // gap: { xs: pxToRem(15) },
    padding: {
      xs: `${pxToRem(8)} ${pxToRem(4)}`,
      md: `${pxToRem(0)} ${pxToRem(8)} ${pxToRem(12)} ${pxToRem(8)}`,
    },
    // backgroundColor: 'red',
  },
  cardBox: {
    width: '100%',
    // borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    justifyContent: 'space-between',
    padding: {
      xs: `${pxToRem(18)} ${pxToRem(0)}`,
      md: `${pxToRem(16)} ${pxToRem(8)}`,
    },
    // backgroundColor: 'red',
  },
  contentBox: {
    width: '100%',
    height: '85%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    boxSizing: 'border-box',
    // backgroundColor: 'blue',
  },
  //   closeBox: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     justifyContent: 'center',
  //   },
  close: {
    width: { xs: pxToRem(13) },
    height: { xs: pxToRem(13) },
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: { xs: pxToRem(24), md: pxTovW(19) },
    marginTop: { xs: pxToRem(10), md: pxTovW(10) },
  },
  grid: {
    display: 'grid',
    width: '100%',
    marginLeft: { xs: pxToRem(8), md: pxTovW(10) },
    boxSizing: 'border-box',
    // backgroundColor: 'green',
    gridTemplateColumns: { xs: 'auto', md: 'auto auto  ' },

    '& > div': {
      //   paddingBottom: '10px',
      //   paddingTop: '10px',
      borderBottom: '1px solid #E0DFDE',
      // backgroundColor: 'green',
    },
    '&  > :nth-last-of-type(-n+2) ': {
      borderBottom: { md: 'none' },
    },
    '&  > :nth-last-of-type(-n+1) ': {
      borderBottom: 'none',
    },
  },
};

//* Interface

interface ICardData {
  topicName: string;
  topicImage: string;
  score: number;
}
interface IProps {
  chapterName: string;
  chapterImage?: string;
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  cardData?: ICardData[];
  //   displayData: { subject: string; icon: string; class?: string }[];
}
export const SelectTopicPopup = ({
  chapterName,
  chapterImage,
  modalState,
  setModalState,
  cardData,
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
          <Box
            sx={{
              maxWidth: '90%',
              //   backgroundColor: 'red',
              width: { xs: '70%', md: '50%' },
              display: 'flex',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              //   alignItems: 'center',
              boxSizing: 'border-box',
              paddingLeft: { xs: pxToRem(10), md: pxTovW(10) },
            }}
          >
            <ImageWrapper
              name="chapter1"
              path={getMediaBasePath(chapterImage, 'processedMediaBucket')}
              type="png"
              parentFolder="tempAssets"
              styles={{
                width: { xs: pxToRem(47), md: pxTovW(81) },
                height: { xs: pxToRem(47), md: pxTovW(81) },
                borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
              }}
            />
            <Typography
              sx={{ marginTop: { md: pxTovW(5) } }}
              variant="bodyText"
              fontWeight="medium"
            >
              {chapterName}
            </Typography>
          </Box>

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
              marginLeft: { xs: pxToRem(8), md: pxTovW(20) },
              marginTop: { xs: pxToRem(8), md: pxTovW(20) },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="medium"
              sx={{ color: '#333333' }}
            >
              Topic Score
            </Typography>
          </Box>
          <Box component={Grid} sx={styles.grid}>
            {cardData?.map((elem, index) => (
              <Box key={index} sx={styles.cardBox}>
                <TopicScoreCard
                  path={elem.topicImage}
                  score={Number(elem.score.toFixed(2))}
                  topicName={elem.topicName}
                  withoutArrow
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
