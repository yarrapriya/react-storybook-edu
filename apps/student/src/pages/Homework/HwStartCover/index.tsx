import { Box, Typography } from '@mui/material';

import { Timestamp } from '@bufbuild/protobuf';
import {
  LmsHomewokStudentAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  IStyles,
  ImageWrapper,
  Loader,
  NoContentCard,
  PrimaryButton,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { HomeworkSessionModeEnum, TaskStudentAttemptStatusEnum } from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useGlobalContext } from 'apps/student/src/app/Context/GlobalContextProvider';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME, HOMEWORK_ACTIVE } from '../../../routeHandling/RoutesNomenclature';
import { getLastAttemptedResponse } from '../../../utils/homework';
import {
  setActiveHomeworSessionId,
  setActiveHomeworkContent,
  setActiveHomeworkStudentResponse,
  setHomeworkEndPath,
} from '../reducer/homework.slice';

const styles: IStyles = {
  root: {
    // border: '1px solid black',
    boxSizing: 'border-box',
    p: {
      xs: `${pxToRem(20)} ${pxToRem(0)}`,
      md: `${pxTovW(27)} ${pxTovW(240)} ${pxTovW(92)} ${pxTovW(240)}`,
    },
    bgcolor: 'neutral.lightOrange',
    minHeight: '90vh',
  },

  headingTimeBox: {
    textAlign: { xs: 'center', md: 'unset' },
  },

  iconTextBox: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    justifyContent: { xs: 'center', md: 'unset' },
  },
  timeClock: {
    width: { xs: pxToRem(10), md: pxTovW(33) },
    height: { xs: pxToRem(10), md: pxTovW(33) },
  },

  bottomContainer: {
    // textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(51) },
  },
  startInfoBox: {
    // textAlign: 'center',
    mb: { xs: pxToRem(10), md: pxTovW(20) },
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: pxToRem(7), md: pxTovW(7) },
  },
  dino: {
    width: { xs: '100vw', md: pxTovW(623) },
    height: { xs: '100vw', md: pxTovW(491) },
    objectFit: { xs: 'cover', md: 'contain' },
  },

  startInfoIcon: {
    width: { xs: pxToRem(10), md: pxTovW(20) },
    height: { xs: pxToRem(10), md: pxTovW(20) },
  },
};

interface IProps {
  heading?: string;
  time?: string;
  startInfo?: string;
}
export const HwStartCover = ({ heading, time, startInfo }: IProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const homework_id =
    new URLSearchParams(location.search).get('homeworkId') || undefined;
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const { active_homework_content, active_homework_student_response } =
    deserify(useAppSelector((state) => state.homework));
  const activeHomeworkContent =
    active_homework_content && homework_id
      ? active_homework_content[homework_id]
      : undefined;
  const activeHomeworkStudentResponse =
    active_homework_student_response && homework_id
      ? active_homework_student_response[homework_id]
      : undefined;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const homework_end_path = useAppSelector(
    (state) => state.homework.homework_end_path
  );
  const { setSelectedFunction } = useGlobalContext();


  const totalTasks = activeHomeworkContent?.homeworkContent.length || 0;
  const completedTasks =
    activeHomeworkStudentResponse?.responses?.reduce((a, b) => {
      return (
        a +
        (b.responses && getLastAttemptedResponse(b.responses)?.answer ? 1 : 0)
      );
    }, 0) || 0;

  const startButtonHandler = async () => {
    // console.log('startButtonHandler');
    if (!homework_id || !studentId) {
      return;
    }
    const sessionMode = completedTasks == 0 || !completedTasks ? HomeworkSessionModeEnum.HOMEWORK_SESSION_MODE_FIRST_ATTEMPT : completedTasks >= totalTasks ? HomeworkSessionModeEnum.HOMEWORK_SESSION_MODE_REATTEMPT : HomeworkSessionModeEnum.HOMEWORK_SESSION_MODE_RESUME;
    const hwSession = await LmsHomewokStudentAPIServiceV1Client.createStudentHomeworkSession({
      studentId,
      homeworkId: Number(homework_id),
      sessionMode: sessionMode,
      sessionStatus: TaskStudentAttemptStatusEnum.TASK_STUDENT_STATUS_IN_PROGRESS,
      startTime: Timestamp.fromDate(new Date())
    })
    if (sessionMode === HomeworkSessionModeEnum.HOMEWORK_SESSION_MODE_REATTEMPT) {
      dispatch(
        setActiveHomeworkStudentResponse({
          homeworkId: Number(homework_id),
          response: undefined,
        })
      );
    }
    dispatch(setActiveHomeworSessionId(hwSession.sessionId))
    navigate(`${HOMEWORK_ACTIVE}?homeworkId=${homework_id}&sessionMode=${sessionMode}`);
  };


  const onBackClick = () => {
    navigate(homework_end_path ? homework_end_path : HOME);
    dispatch(setHomeworkEndPath(undefined));
  }

  useEffect(() => {
    fetchHomeworkData();
    setSelectedFunction(() => onBackClick)
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const fetchHomeworkData = async () => {
    if (!studentId || !homework_id || isNaN(Number(homework_id))) {
      return;
    }
    try {
      setLoading('loading');
      const homeworkContent =
        await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
          personId: studentId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          homeworkId: Number(homework_id),
        });
      const homeworkStudentResponse =
        await LmsHomewokStudentAPIServiceV1Client.fetchStudentHWResponse({
          studentId: studentId,
          homeworkId: Number(homework_id),
        });
      dispatch(
        setActiveHomeworkContent({
          homeworkId: Number(homework_id),
          homeworkContent: homeworkContent.data,
        })
      );
      dispatch(
        setActiveHomeworkStudentResponse({
          homeworkId: Number(homework_id),
          response: homeworkStudentResponse.data,
        })
      );
      setLoading('completed');
    } catch (err) {
      console.error(err);
      setLoading('error');
      dispatch(
        setActiveHomeworkContent({
          homeworkId: Number(homework_id),
          homeworkContent: undefined,
        })
      );
      dispatch(
        setActiveHomeworkStudentResponse({
          homeworkId: Number(homework_id),
          response: undefined,
        })
      );
    }
  };

  return loading === 'loading' ? (
    <Loader />
  ) : loading === 'error' ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.headingTimeBox}>
        <Typography variant="h1">
          {activeHomeworkContent?.homework?.homeworkTitle || ''}
        </Typography>

        <Box sx={styles.iconTextBox}>
          <ImageWrapper
            name="cover-clock"
            type="png"
            parentFolder="icons"
            styles={styles.timeClock}
          />

          <Typography variant="h3">
            {activeHomeworkContent?.homework?.estimatedTimeInMin || 0} min
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.bottomContainer}>
        <ImageWrapper
          name="illustration-dino"
          type="png"
          parentFolder="tempAssets"
          styles={styles.dino}
        />

        <Box sx={{ width: { xs: '80%', md: 'unset' } }}>
          <Box sx={styles.startInfoBox}>
            <ImageWrapper
              name="user"
              type="png"
              parentFolder="icons"
              styles={styles.startInfoIcon}
            />

            <Typography variant="cardText" fontWeight="regular">
              {completedTasks}/{totalTasks} Submitted
            </Typography>
          </Box>
          {loading == 'completed' && (
            <PrimaryButton onClick={startButtonHandler}>
              <Typography
                variant="bodyText"
                fontWeight="bold"
                color="neutral.lightGreen"
              >
                {/* {completedTasks >= totalTasks ? 'Re-attempt' : "LET'S START"} */}
                {completedTasks === 0
                  ? "LET'S START"
                  : completedTasks >= totalTasks
                    ? 'Re-attempt'
                    : 'RESUME'}
              </Typography>
            </PrimaryButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
