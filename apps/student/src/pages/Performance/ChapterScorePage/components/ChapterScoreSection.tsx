import {
  IStyles,
  NoContentCard,
  SelectTopicPopup,
  TopicScoreCard,
  deserify,
  getMediaBasePath,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../../utils/icons';
const styles: IStyles = {
  header: {
    width: { xs: '95%', md: '95%' },
    display: 'flex',
    // flexDirection: 'column',

    paddingTop: { xs: pxToRem(20), md: pxTovW(0) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(20) },

    gap: { xs: pxToRem(10), md: pxTovW(22) },
    justifyContent: 'space-between',
    paddingLeft: { xs: pxToRem(10), md: pxTovW(0) },
    //
    // alignItems: 'center',
  },

  chapterScoreCard: {
    width: { xs: '100vw', md: '100%' },
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'blue',
    margin: { xs: 'auto', md: '0' },
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    // marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    paddingLeft: { md: pxTovW(20) },
    paddingRight: { md: pxTovW(20) },
    paddingTop: { xs: pxToRem(10), md: pxTovW(20) },
    paddingBottom: { xs: pxToRem(10), md: pxTovW(39) },
    // marginLeft: { md: pxTovW(95) },
  },
  grid: {
    display: 'grid',
    // backgroundColor: 'green',
    gridTemplateColumns: { xs: 'auto', md: 'auto auto  ' },
    '& .MuiGrid-container': { columnRule: '10px solid red' },

    '& > div': {
      paddingBottom: '10px',
      paddingTop: '10px',
      borderBottom: '1px solid #E0DFDE',
      // backgroundColor: 'green',
    },
    '&  >  :nth-last-of-type(-n+2) ': {
      borderBottom: { md: 'none' },
    },
    '&  >  :nth-last-of-type(-n+1) ': {
      borderBottom: 'none',
    },
  },
  cardBox: {
    // padding: { xs: pxToRem(0), md: pxTovW(0) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(20) },
    paddingBottom: { xs: pxToRem(10), md: pxTovW(0) },
    cursor: 'pointer',
    // marginRight: { md: pxTovW(70) },
  },
  // gridBox: {
  //   // backgroundColor: 'red',
  //   width: { xs: '90%', md: '100%' },
  //   boxSizing: 'border-box',
  // },
};
export const ChapterScoreSection = () => {
  const [modalState, setModalState] = useState(false);
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [chapterIndex, setChapterIndex] = useState(-1);
  const SubjectData = deserify(
    useAppSelector((state) => state.performance.subject_stats)
  );
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const handleChapterClick = (index: number) => {
    setChapterIndex(index);
    setModalState(true);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        width: { xs: '100%', md: pxTovW(794) },
        boxSizing: 'border-box',
        // backgroundColor: 'red',
        paddingLeft: { xs: pxToRem(0), md: pxTovW(20) },
        // gap: '2vw',
      }}
    >
      <Box sx={styles.header}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: {
              xs: `${pxToRem(0)} ${pxToRem(20)} ${pxToRem(0)} ${pxToRem(20)}`,
              md: `${pxTovW(0)} ${pxTovW(0)}`,
            },
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Chapter Score
          </Typography>
        </Box>
      </Box>
      {SubjectData?.chaptersPerformance.length !== 0 ? (
        <Box sx={styles.chapterScoreCard}>
          <Box container component={Grid} sx={styles.grid}>
            {SubjectData?.chaptersPerformance
              .sort((a, b) => a.chapterId - b.chapterId)
              .map((elem, i) => (
                <Box key={i}>
                  <Box
                    sx={styles.cardBox}
                    onClick={() => handleChapterClick(i)}
                  >
                    <TopicScoreCard
                      path={getMediaBasePath(
                        elem.posterImageUrl,
                        'processedMediaBucket'
                      )}
                      parentFolder="tempAssets"
                      topicName={elem.chapterTitle}
                      score={elem.scorePercent}
                    />
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      ) : (
        <NoContentCard variant="info" icon="cards" text="No data available" />
      )}
      <SelectTopicPopup
        cardData={SubjectData?.chaptersPerformance[
          chapterIndex
        ]?.topicsPerformance
          .sort((a, b) => a.topicId - b.topicId)
          .map((e) => {
            return {
              topicName: e.topicTitle,
              topicImage: getMediaBasePath(
                e.posterImageUrl,
                'processedMediaBucket'
              ),
              score: e.scorePercent,
            };
          })}
        chapterName={
          SubjectData?.chaptersPerformance[chapterIndex]?.chapterTitle || ''
        }
        chapterImage={
          getMediaBasePath(
            SubjectData?.chaptersPerformance[chapterIndex]?.posterImageUrl,
            'processedMediaBucket'
          ) || ''
        }
        modalState={modalState}
        setModalState={setModalState}
      />
    </Box>
  );
};

const displayData = [
  {
    imageName: 'chapter1',
    topicName: 'Fluid Friction',
    score: 10,
    parentFolder: 'tempAssets',
  },
  {
    imageName: 'chapter2',
    topicName: 'Sound Wave',
    score: 50,
    parentFolder: 'tempAssets',
  },
  {
    imageName: 'chapter3',
    topicName: 'Ratio & Proportion',
    score: 30,
    parentFolder: 'tempAssets',
  },
  {
    imageName: 'chapter4',
    topicName: 'Fluid Friction',
    score: 60,
    parentFolder: 'tempAssets',
  },
  {
    imageName: 'chapter1',
    topicName: 'Ratio & Proportion',
    score: 45,
    parentFolder: 'tempAssets',
  },
  {
    imageName: 'chapter2',
    topicName: 'Sound Wave',
    score: 85,
    parentFolder: 'tempAssets',
  },
];
