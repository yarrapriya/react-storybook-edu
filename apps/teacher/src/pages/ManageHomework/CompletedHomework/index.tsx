import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  Loader,
  ScoreProgressBar,
  deserify,
  formatDateAsDayMonth,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { TeacherHWClassStats } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_PERFORMANCE } from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import { StudentSection } from '../OngoingHomework/components/StudentSection';
const styles: IStyles = {
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    // paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    // paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { md: pxTovW(30) },
    padding: { md: `${pxTovW(15)} ${pxTovW(240)}` },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
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
  },
  headImage: {
    width: { xs: pxToRem(74), md: pxTovW(124) },
    height: { xs: pxToRem(74), md: pxTovW(124) },
    borderRadius: { xs: pxToRem(6), md: pxTovW(15) },
  },
  iconBox: {
    width: { xs: '100vw', md: pxTovW(552) },
    height: { xs: pxToRem(70), md: pxTovW(121) },
    borderRadius: { xs: '0px', md: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: { md: '1px solid #E0DFDE' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },
};
export const CompletedHomework = () => {
  // const { homework_id } = useParams();
  const navigate = useNavigate();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { homework_list_data, selected_hw_id } = deserify(
    useAppSelector((state) => state.manageHomework)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [hwClassStats, setHwClassStats] = useState<
    TeacherHWClassStats | undefined
  >();
  const dispatch = useAppDispatch();
  const [currentHomwork, setCurrentHomwork] = useState<HomeworkTask>();

  useEffect(() => {
    if (selected_hw_id) {
      const hw = homework_list_data?.ended.find(
        (e) => e.homeworkId === selected_hw_id
      );
      setCurrentHomwork(hw);
      getHomeworkDetails(selected_hw_id);
    }
  }, []);
  const getHomeworkDetails = async (homeworkId: number) => {
    try {
      setLoading(true);
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getHWClassStats({
          homeworkId: homeworkId,
        });
      if (response.data) {
        // console.log(response.data);
        setHwClassStats(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };
  const cardOnClick = (studentId: string) => {
    navigate(`${HOMEWORK_PERFORMANCE}/${studentId}`);
  };
  const subMap = getSubjectsMap();
  return loading === true ? (
    <Loader />
  ) : error === true ? (
    <Typography>Error Occured</Typography>
  ) : (
    <Box sx={styles.root}>
      <Box sx={{ width: { xs: '100%', md: '35%' } }}>
        <Box sx={styles.header}>
          <ImageWrapper
            name="chapterImage"
            type="png"
            parentFolder="tempAssets"
            path={hwClassStats?.homework?.homeworkPosterImgUrl}
            styles={styles.headImage}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: pxToRem(14), md: pxTovW(21) },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h1">
                {currentHomwork?.homeworkTitle || 'title'}
              </Typography>
              <Typography variant="cardText" sx={{ color: '#007CDC' }}>
                Class {hwClassStats?.homework?.class}
                {hwClassStats?.homework?.section} |{' '}
                {hwClassStats?.homework?.subject}
              </Typography>
            </Box>
            <Box sx={{ width: { xs: pxToRem(178), md: pxTovW(300) } }}>
              <ScoreProgressBar
                variant={largeScreen ? 'lg' : 'md'}
                score={
                  Number(hwClassStats?.homework?.classScore?.toFixed(2)) || 0
                }
              />
            </Box>
          </Box>
        </Box>

        <Box sx={styles.iconBox}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: pxToRem(4), md: pxTovW(8) },
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
                }}
              >
                <IconWrapper
                  name="user"
                  size="md"
                  parentFolder="icons"
                  type="png"
                />
                <Typography variant="h2" fontWeight="bold">
                  {hwClassStats?.studentsSubmissionCount}/
                  {hwClassStats?.assignedStudentsCount}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight="regular"
                sx={{ color: '#828282' }}
              >
                Submissions
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: pxToRem(4), md: pxTovW(8) },
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
                }}
              >
                <IconWrapper
                  name="calender"
                  size="md"
                  parentFolder="icons"
                  type="png"
                />
                <Typography variant="h2" fontWeight="bold">
                  {formatDateAsDayMonth(currentHomwork?.homeworkTargetDate)}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                fontWeight="regular"
                sx={{ color: '#828282' }}
              >
                Deadline
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <StudentSection
        Class={`${currentHomwork?.class} ${currentHomwork?.section}`}
        studentPerformanceInfo={hwClassStats?.studentPerformanceInfo}
        cardOnClickHandler={cardOnClick}
      />
    </Box>
  );
};
