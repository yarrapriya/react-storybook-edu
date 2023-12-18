import { StudentAnalysisAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  IconWrapper,
  NoContentCard,
  SecondaryButton,
  StudentSubjectPopup,
  deserify,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../utils/icons';
import { ChapterScoreSection } from '../ChapterScorePage/components/ChapterScoreSection';
import {
  setPerformanceSubjectId,
  setSubjectAnalysis,
} from '../reducer/performance.slice';
import { ClassScore } from './components/classScoreCard';
import { Shimmer } from './shimmer';
const styles: IStyles = {
  root: {
    width: '100vw',
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  classHeader: {
    width: { xs: '100%', md: '95%' },
    display: 'flex',
    // flexDirection: 'column',

    // paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    justifyContent: 'space-between',
    //
    // alignItems: 'center',
  },
  header: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'column',
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    //
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  iconCard: {
    width: { xs: '90vw', md: pxTovW(554) },
    height: { xs: pxToRem(81), md: pxTovW(121) },
    borderRadius: pxToRem(10),
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },
  classScore: {
    width: { xs: '100vw', md: pxTovW(554) },
    height: { xs: pxToRem(86), md: pxTovW(121) },
    borderRadius: { md: pxToRem(10) },
    padding: {
      xs: `${pxToRem(20)} ${pxToRem(20)} ${pxToRem(20)} ${pxToRem(20)}`,
      md: `${pxTovW(29)} ${pxTovW(19)}`,
    },
    alignItems: 'center',
    border: { md: '1px solid #E0DFDE' },
    display: 'flex',
    boxSizing: 'border-box',
    boxShadow: {
      xs: `0px 0px ${pxToRem(6)} #00000017`,
      md: `0px 0px ${pxToRem(10)} #0000001F`,
    },
    backgroundColor: 'white',
  },
  dropDownButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px 20px 16px 20px',
    border: '1px solid #0AA34FAB',
    width: pxTovW(554),
    height: pxTovW(69),
    borderRadius: pxTovW(15),
    marginTop: pxTovW(18),
    marginBottom: { xs: pxTovW(20), md: 0 },
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(4), md: pxTovW(8) },
    flexDirection: 'column',
  },
  iconInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
  },
  chapterScoreCard: {
    width: { xs: '100vw', md: 'max-content' },
    backgroundColor: '#FFFFFF',
    // backgroundColor: 'blue',
    margin: { xs: 'auto', md: 'none' },
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    paddingLeft: { xs: pxToRem(20), md: pxTovW(20) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(20) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(39) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(39) },
    // marginLeft: { md: pxTovW(95) },
  },
  cardBox: {
    // backgroundColor: 'red',

    padding: { xs: pxToRem(10), md: pxTovW(0) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(20) },
    // paddingBottom: { md: pxTovW(10) },
    marginRight: { md: pxTovW(70) },
  },
};
export const ChapterScorePage = () => {
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const subjectId = deserify(
    useAppSelector((state) => state.performance.performance_subject_id)
  );
  const SubjectData = deserify(
    useAppSelector((state) => state.performance.subject_stats)
  );
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  // console.log(
  //   // subMap[OverallData?.subjectsPerformance[0].subjectId || 0]?.subjectName
  //   SubjectData
  // );
  // console.log(subjectId);
  useEffect(() => {
    fetchStudentSubjectPerformance();
  }, [subjectId]);

  async function fetchStudentSubjectPerformance() {
    try {
      setLoading(true);
      const response =
        await StudentAnalysisAPIServiceV1Client.fetchSubjectAnalysisStats({
          studentId: studentId,
          subjectId: subjectId,
        });
      setLoading(false);
      if (response) {
        if (response.data) {
          dispatch(setSubjectAnalysis(response.data));
          return;
        }
      }
      dispatch(setSubjectAnalysis(undefined));
    } catch (err) {
      setLoading(true);
      setError(false);
      dispatch(setSubjectAnalysis(undefined));
      console.log(err);
    }
  }
  return loading === true ? (
    <Shimmer />
  ) : (
    <Box sx={styles.root}>
      {
        <Box sx={styles.header}>
          <Typography variant={mediumScreen ? 'g1' : 'h1'}>
            Performance
          </Typography>
        </Box>
      }
      {error === true ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : SubjectData ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: pxToRem(0), md: pxTovW(40) },
            justifyContent: { xs: 'center', md: 'normal' },
            alignItems: { xs: 'center', md: 'normal' },
            // backgroundColor: 'red',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: pxToRem(20), md: pxTovW(20) },
              justifyContent: { xs: 'center', md: 'normal' },
              alignItems: { xs: 'center', md: 'normal' },
              width: { xs: '100%', md: '35%' },
              // backgroundColor: 'red',
            }}
          >
            {mediumScreen ? (
              <Button
                sx={styles.dropDownButton}
                onClick={() => setModalState(true)}
              >
                <Typography variant="h4" fontWeight="medium">
                  {subMap[Number(subjectId)]?.subjectName}
                </Typography>
                <Box>
                  <ArrowForwardIosIcon
                    sx={{
                      height: { xs: pxToRem(12.55), md: pxTovW(15) },
                      width: { xs: pxToRem(7.18), md: pxTovW(15) },
                      color: '#828282',
                    }}
                  />
                </Box>
              </Button>
            ) : (
              <SecondaryButton
                styles={{ height: { xs: pxToRem(45) }, width: '90%' }}
                witharrow
                onClick={() => setModalState(true)}
              >
                <Typography>
                  {subMap[Number(subjectId)]?.subjectName}
                </Typography>
              </SecondaryButton>
            )}

            {
              <Box sx={styles.iconCard}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={styles.iconBox}>
                    <Box sx={styles.iconInfo}>
                      <IconWrapper
                        name="percentage"
                        size="md"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="h2" fontWeight="bold">
                        {SubjectData?.scorePercent}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      Score
                    </Typography>
                  </Box>

                  <Box sx={styles.iconBox}>
                    <Box sx={styles.iconInfo}>
                      <IconWrapper
                        name="reading"
                        size="md"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="h2" fontWeight="bold">
                        {SubjectData?.submittedHwCount}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      Homeworks
                    </Typography>
                  </Box>
                  <Box sx={styles.iconBox}>
                    <Box sx={styles.iconInfo}>
                      <IconWrapper
                        name="clock"
                        size="md"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="h2" fontWeight="bold">
                        {SubjectData?.timeSpentInMin.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="button"
                        color="#828282"
                        fontWeight="regular"
                      >
                        min
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      Time
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
            <Box sx={styles.classScore}>
              <ClassScore
                path={subMap[Number(subjectId)]?.iconUrl}
                className={`${subMap[Number(subjectId)]?.subjectName}`}
                score={SubjectData?.scorePercent || 0}
              />
            </Box>
          </Box>
          <ChapterScoreSection />
        </Box>
      ) : (
        <NoContentCard variant="info" icon="cards" text="No data available" />
      )}
      <StudentSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={Object.values(subMap).map((sub) => ({
          subject: sub.subjectName,
          icon: sub.iconUrl,
          color: sub.textColor,
          onClick: () => {
            dispatch(setPerformanceSubjectId(sub.subjectId));
            setModalState(false);
          },
        }))}
        title="Choose Subject"
      />
    </Box>
  );
};
const subjectsWithClass = [
  { subject: 'English', icon: 'english', class: '1A' },
  { subject: 'English', icon: 'english', class: '2C' },
  { subject: 'Maths', icon: 'maths', class: '3A' },
  { subject: 'Maths', icon: 'maths', class: '3B' },
  { subject: 'Marathi', icon: 'marathi', class: '3C' },
  { subject: 'Marathi', icon: 'marathi', class: '3D' },
  { subject: 'Science', icon: 'science', class: '8A' },
  { subject: 'Science', icon: 'science', class: '8B' },
];
