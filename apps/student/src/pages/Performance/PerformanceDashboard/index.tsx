import { StudentAnalysisAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ClassScoreCard,
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
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { SubjectPerformanceOverAllStats } from '@protos/analysis_management/analysis.student.apis_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  PERFORMANCE_STUDENT_CHAPTERWISE,
} from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import {
  setOverallAnalysis,
  setPerformanceSubjectId,
} from '../reducer/performance.slice';
import { SuggestedLearning } from './components/SuggestedLearning';
import { Shimmer } from './shimmer';
const styles: IStyles = {
  root: {
    width: { xs: '100vw', md: '100%' },
    // backgroundColor: 'red',
    // overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    // overflowX: 'hidden',
    justifyContent: 'center',
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
  dropDownButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px 20px 16px 20px',
    border: '1px solid #0AA34FAB',
    width: pxTovW(552),
    height: pxTovW(56),
    borderRadius: pxTovW(15),
    marginTop: pxTovW(18),
    marginBottom: pxTovW(20),
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
    minHeight: { md: pxTovW(100) },
    minWidth: { md: pxTovW(100) },
    width: { xs: '100vw', md: pxTovW(794) },
    backgroundColor: 'common.white',
    // margin: { xs: 'auto', md: 'none' },
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    paddingLeft: { md: pxTovW(20) },
    paddingRight: { md: pxTovW(20) },
    paddingTop: { xs: pxToRem(10), md: pxTovW(39) },
    paddingBottom: { md: pxTovW(39) },
    marginLeft: { md: pxTovW(95) },
  },
  grid: {
    width: '100%',
    // backgroundColor: 'red',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: { xs: 'auto', md: 'auto auto  ' },

    '& > div': {
      paddingBottom: '13px',
      paddingTop: '13px',
      borderBottom: '1px solid #E0DFDE',
    },
    '&  >  :nth-last-of-type(-n+2) ': {
      borderBottom: { md: 'none' },
    },
    '&  >  :nth-last-of-type(-n+1) ': {
      borderBottom: 'none',
    },
  },
  cardBox: {
    // backgroundColor: 'blue',

    // padding: { xs: pxToRem(10), md: pxTovW(0) },
    width: { md: pxTovW(339) },
    boxSizing: 'border-box',
    paddingTop: { md: pxTovW(20) },
    paddingLeft: { xs: pxToRem(20), md: pxTovW(0) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(0) },
    // paddingBottom: { md: pxTovW(10) },
    // marginRight: { md: pxTovW(70) },
    cursor: 'pointer',
  },
};
export const PerformanceDashboard = () => {
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { overall_stats } = deserify(
    useAppSelector((state) => state.performance)
  );
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];

  const subMap = getSubjectsMap(learnSubjects);
  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate(HOME);
  };

  useEffect(() => {
    fetchStudentOverallPerformance();
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  async function fetchStudentOverallPerformance() {
    try {
      setLoading(true);
      const response =
        await StudentAnalysisAPIServiceV1Client.fetchOverAllAnalysisStats({
          studentId: studentId,
        });
      // console.log(response.data);
      setLoading(false);
      if (response.data) {
        dispatch(setOverallAnalysis(response.data));
        return;
      }
      dispatch(setOverallAnalysis(undefined));
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  return loading === true ? (
    <Shimmer />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant={largeScreen ? 'g1' : 'h1'}>Performance</Typography>
      </Box>
      {error === true ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : overall_stats ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: pxToRem(20), md: pxTovW(40) },
            justifyContent: { xs: 'center', md: 'normal' },
            alignItems: { xs: 'center', md: 'normal' },

            marginBottom: { md: pxTovW(120), lg: pxTovW(80) },
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
              position: 'relative',
              zIndex: 1000,
              // backgroundColor: 'red',
            }}
          >
            {largeScreen ? (
              <Button
                sx={styles.dropDownButton}
                onClick={() => setModalState(true)}
              >
                <Typography variant="h5" fontWeight="medium">
                  All Subjects
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
                <Typography>All Subjects</Typography>
              </SecondaryButton>
            )}
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
                      {overall_stats?.scorePercent}
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
                      {overall_stats?.submittedHwCount}
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
                      {overall_stats?.timeSpentInMin}
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

            {largeScreen && <SuggestedLearning />}
          </Box>
          <Box>
            {overall_stats.subjectsPerformance.length !== 0 ? (
              <Box sx={styles.chapterScoreCard}>
                <Box container component={Grid} sx={styles.grid}>
                  {overall_stats?.subjectsPerformance.map(
                    (elem: SubjectPerformanceOverAllStats, i) => (
                      <Box
                        key={i}
                        sx={styles.cardBox}
                        onClick={() => {
                          dispatch(setPerformanceSubjectId(elem.subjectId));
                          navigate(PERFORMANCE_STUDENT_CHAPTERWISE);
                        }}
                      >
                        <ClassScoreCard
                          iconName={subMap[elem.subjectId]?.subjectName}
                          path={subMap[elem.subjectId]?.iconUrl}
                          className={subMap[elem.subjectId]?.subjectName}
                          score={elem.scorePercent}
                        />
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  marginLeft: { md: pxTovW(95) },
                  width: { xs: '100vw', md: pxTovW(794) },
                  backgroundColor: 'red',
                }}
              >
                <NoContentCard
                  variant="info"
                  icon="cards"
                  text="No data available"
                />
              </Box>
            )}
          </Box>
          {!largeScreen && <SuggestedLearning />}
        </Box>
      ) : (
        <Box
          sx={{
            marginLeft: { md: pxTovW(95) },
            width: { xs: '100vw', md: pxTovW(794) },
            backgroundColor: 'red',
          }}
        >
          <NoContentCard variant="info" icon="cards" text="No data available" />
        </Box>
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
            navigate(PERFORMANCE_STUDENT_CHAPTERWISE);
            setModalState(false);
          },
        }))}
        title="Choose Subject"
      />
    </Box>
  );
};

const displayData = [
  {
    iconName: 'science',
    className: 'Science',
    score: 10,
  },
  {
    iconName: 'maths',
    className: 'Maths',
    score: 50,
  },
  {
    iconName: 'english',
    className: 'English',
    score: 30,
  },
  {
    iconName: 'vocab-victory',
    className: 'Vocab-Victory',
    score: 60,
  },
  {
    iconName: 'marathi',
    className: 'Marathi',
    score: 45,
  },
  {
    iconName: 'social-science',
    className: 'Social Science',
    score: 85,
  },
];
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
