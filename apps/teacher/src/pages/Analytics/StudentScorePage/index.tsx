import { TeacherAnalysisAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  NoContentCard,
  deserify,
  firstLetterImage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { setStudentSubjectStats } from '../reducer/analytics.slice';
import { ChapterScoreSection } from './components/ChapterScoreSection';
import { StudentScoreCard } from './components/StudentScoreHeader';
import { Shimmer } from './shimmer';

const styles: IStyles = {
  root: {
    width: '100vw',
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    flexDirection: { xs: 'column', md: 'row' },
    display: 'flex',
    // justifyContent: 'space-around',
    gap: { md: pxTovW(229) },
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: { xs: '100%', md: pxTovW(414) },
    display: 'flex',
    // flexDirection: 'column',
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    //
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
    alignItems: 'center',
    // backgroundColor: 'red',
  },
};
export const StudentChapterScorePage = () => {
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const dispatch = useDispatch();
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    fetchClassChapterAnalytics();
  }, []);
  const { selected_class_info, selected_student_info, student_subject_stats } =
    deserify(useAppSelector((state) => state.analytics));
  async function fetchClassChapterAnalytics() {
    try {
      setLoading(true);
      const response =
        await TeacherAnalysisAPIServiceV1Client.fetchStudentSubjectPerformanceStats(
          {
            teacherId: user_info?.teacherProfileId,
            studentId: selected_student_info?.studentId,
            subjectId: selected_class_info?.subjectId,
          }
        );
      // console.log(response.data);
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(setStudentSubjectStats(response.data));
        }
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }
  return loading === true ? (
    <Shimmer />
  ) : error === true ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <StudentScoreCard
          path={
            getMediaBasePath(
              selected_student_info?.profileImageUrl,
              'processedMediaBucket'
            ) || firstLetterImage(selected_student_info?.name)
          }
          score={Number(selected_student_info?.scorePercent.toFixed(2)) || 0}
          studentName={selected_student_info?.name || ''}
          className={`${selected_class_info?.classname}${selected_class_info?.section}  ${selected_class_info?.subject}`}
        />
      </Box>

      <ChapterScoreSection />
    </Box>
  );
};
