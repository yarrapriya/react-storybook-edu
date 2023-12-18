import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  ImageWrapper,
  Loader,
  PrimaryButton,
  ScoreProgressBar,
  deserify,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOMEWORK_MANAGE,
  HOMEWORK_PERFORMANCE,
  HOMEWORK_VIEW,
} from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import { setCurrentHomeworkClassStats } from '../reducer/manageHomework.slice';
import { StudentSection } from './components/StudentSection';
import { HwDetails } from './components/hwDetails';

const styles: IStyles = {
  root: {
    width: '100vw',
    padding: { md: `${pxTovW(15)} ${pxTovW(240)}` },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    padding: { xs: `${pxToRem(23)} ${pxToRem(20)}`, md: `${pxTovW(25)} 0` },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    alignItems: 'center',
  },
  headImage: {
    width: { xs: pxToRem(74), md: pxTovW(124) },
    height: { xs: pxToRem(74), md: pxTovW(124) },
    borderRadius: { xs: pxToRem(6), md: pxTovW(15) },
  },
};
export const OngoingHomework = () => {
  // const { homework_id } = useParams();
  const navigate = useNavigate();
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { homework_list_data, current_homework_classStats, selected_hw_id } =
    deserify(useAppSelector((state) => state.manageHomework));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const dispatch = useAppDispatch();
  const [currentHomwork, setCurrentHomwork] = useState<HomeworkTask>();

  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate(HOMEWORK_MANAGE);
  };
  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  useEffect(() => {
    if (selected_hw_id) {
      getHomeworkDetails(selected_hw_id);
      const hw = homework_list_data?.assigned.find(
        (e) => e.homeworkId === selected_hw_id
      );
      setCurrentHomwork(hw);
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
        dispatch(setCurrentHomeworkClassStats(response.data));
        setLoading(false);
      }
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
      <Box sx={styles.header}>
        <ImageWrapper
          name="chapterImage"
          type="png"
          parentFolder="tempAssets"
          path={current_homework_classStats?.homework?.homeworkPosterImgUrl}
          styles={styles.headImage}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // height: { xs: pxToRem(74), md: pxTovW(120) },
            boxSizing: 'border-box',
            gap: { xs: pxToRem(14), md: pxTovW(16) },
            // justifyContent: 'space-between',
            width: '100%',
            // backgroundColor: 'red',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h1">
              {current_homework_classStats?.homework?.homeworkTitle || 'title'}
            </Typography>
            <Typography
              variant="button"
              color="primary"
              fontWeight="regular"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                width: '90%',
              }}
            >
              {current_homework_classStats?.homework?.class}
              {current_homework_classStats?.homework?.section}{' '}
              {current_homework_classStats?.homework?.subject} |{' '}
              {current_homework_classStats?.homework?.moduleName}
            </Typography>
          </Box>
          <Box sx={{ width: { xs: pxToRem(178), md: pxTovW(300) } }}>
            <ScoreProgressBar
              variant={largeScreen ? 'lg' : 'md'}
              score={
                Number(
                  current_homework_classStats?.homework?.classScore?.toFixed(2)
                ) || 0
              }
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: { md: 'max-content' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          <PrimaryButton onClick={() => navigate(`${HOMEWORK_VIEW}`)}>
            <Typography
              variant={largeScreen ? 'h3' : 'smallText'}
              color="#FFFFFF"
              fontWeight={600}
            >
              VIEW HOMEWORK
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100vw', md: '100%' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <HwDetails
          currentHomework={current_homework_classStats?.homework}
          assigendInfo={current_homework_classStats?.assignedStudentsCount}
          submissonCount={current_homework_classStats?.studentsSubmissionCount}
        />
        <StudentSection
          Class={`${current_homework_classStats?.homework?.class}${current_homework_classStats?.homework?.section}`}
          studentPerformanceInfo={
            current_homework_classStats?.studentPerformanceInfo
          }
          cardOnClickHandler={cardOnClick}
        />
      </Box>
    </Box>
  );
};
