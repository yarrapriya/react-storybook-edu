import { TeacherAnalysisAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ClassAndSubjectPopup,
  IClassAndSubjectSelected,
  IStyles,
  IconWrapper,
  NoContentCard,
  deserify,
  getMediaBasePath,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { ChapterScoreSection } from '../ChapterScorePage/components/ChapterScoreSection';
import { ClassScore } from '../ClassScorePage/components/classScoreCard';
import {
  setClassSubChapAnalysis,
  setSelectedClassInfo,
} from '../reducer/analytics.slice';
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
    boxShadow: { md: `0px 0px ${pxToRem(10)} #0000001F` },
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
export const ClassChapterScorePage = () => {
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const { selected_class_info } = deserify(
    useAppSelector((state) => state.analytics)
  );
  useEffect(() => {
    fetchClassChapterAnalytics();
  }, []);
  const { class_subject_analysis, class_subject_chapter_analysis } = deserify(
    useAppSelector((state) => state.analytics)
  );
  async function fetchClassChapterAnalytics() {
    try {
      setLoading(true);
      const response =
        await TeacherAnalysisAPIServiceV1Client.getClassSubjectChapterAnalysis({
          teacherId: user_info?.teacherProfileId,
          sectionId: selected_class_info?.sectionId,
          subjectId: selected_class_info?.subjectId,
        });
      // console.log(response.data);
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(setClassSubChapAnalysis(response.data));
        }
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }
  const classAndsubjectClickHandler = (
    inputClassInfo: IClassAndSubjectSelected
  ) => {
    dispatch(setSelectedClassInfo(inputClassInfo));
    fetchClassChapterAnalytics();
    setModalState(false);
  };
  return loading === true ? (
    <Shimmer />
  ) : (
    <Box sx={styles.root}>
      {mediumScreen && (
        <Box sx={styles.header}>
          <Typography variant="h1">Analysis</Typography>
        </Box>
      )}
      {error === true ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: pxToRem(20), md: pxTovW(40) },
            justifyContent: { xs: 'center', md: 'normal' },
            alignItems: { xs: 'center', md: 'normal' },
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
            }}
          >
            {mediumScreen && (
              <Button
                sx={styles.dropDownButton}
                onClick={() => setModalState(true)}
              >
                <Typography variant="h5" fontWeight="medium">
                  {`${selected_class_info?.classname}${selected_class_info?.section}  ${selected_class_info?.subject}`}
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
            )}

            {mediumScreen && (
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
                        name="user"
                        size="md"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="h2" fontWeight="bold">
                        {class_subject_analysis?.lessonTaughts}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      Lesson Taughts
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
                        {class_subject_analysis?.assignedHwCount}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      HW Assigned
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
                        {class_subject_analysis?.timeSpentInMinutes}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      fontWeight="regular"
                      sx={{ color: '#828282' }}
                    >
                      Minutes
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            <Box sx={styles.classScore}>
              <ClassScore
                path={getMediaBasePath(
                  class_subject_chapter_analysis?.subjectIconImageUrl,
                  'processedMediaBucket'
                )}
                iconName={
                  selected_class_info?.subject.toLocaleLowerCase() || ''
                }
                className={`${selected_class_info?.classname}${selected_class_info?.section}  ${selected_class_info?.subject}`}
                score={
                  Number(
                    class_subject_chapter_analysis?.scorePercent.toFixed(2)
                  ) || 0
                }
              />
            </Box>
          </Box>
          <ChapterScoreSection />
        </Box>
      )}
      <ClassAndSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={subjectsWithClass}
        classSubjectsList={user_info?.teachClassSubjects}
        classAndsubjectClickHandler={classAndsubjectClickHandler}
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
