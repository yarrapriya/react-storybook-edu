import {
  LmsHomewokStudentAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  HomeworkPagination,
  IQuestionStatus,
  IStyles,
  LinkButton,
  Loader,
  NoContentCard,
  QuestionContainerWithSolution,
  deserify,
  pxToRem,
  pxTovW,
  roundNumberTo2Decimal,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Question } from '@protos/content_management/content.db_pb';
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb';
import { HWStudentResponse } from '@protos/learning_management/lms.hw.student.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_VIEW_RECOMMENDATION } from '../../../routeHandling/RoutesNomenclature';
import { getLastAttemptedResponse } from '../../../utils/homework';
import {
  setActiveHomeworkContent,
  setActiveHomeworkStudentResponse,
} from '../reducer/homework.slice';

const styles: IStyles = {
  root: {
    width: '100vw',
    boxSizing: 'border-box',
    p: {
      xs: `${pxToRem(15)} ${pxToRem(9)}`,
      md: `${pxTovW(60)} ${pxTovW(200)}`,
    },
    display: 'flex',
    justifyContent: 'space-between',
    m: 0,
  },

  heading: {
    mb: { xs: pxToRem(20), md: pxTovW(20) },
  },

  subHeadingBox: {
    padding: {
      xs: `${pxToRem(14)} ${pxToRem(41)}`,
      md: `${pxTovW(36)} ${pxTovW(0)}`,
    },
    display: 'flex',
    gap: { md: pxTovW(17) },
    justifyContent: { xs: 'space-between', md: 'flex-start' },
    alignItems: 'center',
  },
  subHeading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  questionBox: {
    margin: 'auto',
    width: '100%',
    padding: {
      xs: `${pxToRem(20)} ${pxToRem(10)}`,
      md: `${pxTovW(20)} ${pxTovW(40)}`,
    },
    boxSizing: 'border-box',
  },
};

export const CompletedHw = () => {
  //^ HwPagination
  const location = useLocation();
  const homework_id =
    new URLSearchParams(location.search).get('homeworkId') || undefined;
  const { active_homework_content, active_homework_student_response } =
    deserify(useAppSelector((state) => state.homework));
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const activeHomeworkContent =
    active_homework_content && homework_id
      ? active_homework_content[homework_id]
      : undefined;
  const activeHomeworkStudentResponse =
    active_homework_student_response && homework_id
      ? active_homework_student_response[homework_id]
      : undefined;
  const sortedQuestionIds = (
    activeHomeworkContent?.questionsSequenceInfo?.taskQuestionInfo || []
  )
    .sort((a, b) => a.sequence - b.sequence)
    .map((val) => val.questionId)
    .filter((val) => val !== undefined) as string[];

  const [activeQuestionId, setActiveQuestionId] = useState(
    sortedQuestionIds[0]
  );

  const selectedHomeworkContent = activeHomeworkContent?.homeworkContent.find(
    (hw) => hw.questionId === activeQuestionId
  );
  const activeQuestionIndex = sortedQuestionIds.indexOf(activeQuestionId);
  const totalQuestions = sortedQuestionIds.length;
  const studentResponseForCurrentQuestion = new HWStudentResponse(
    activeHomeworkStudentResponse
  ).responses.find((resp) => resp.questionId === activeQuestionId);
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const dispatch = useDispatch();
  const scorePercent = roundNumberTo2Decimal(
    ((activeHomeworkStudentResponse?.metrics?.responseScore || 0) * 100) /
    (activeHomeworkStudentResponse?.metrics?.maxScore || 0) || 0
  );
  useEffect(() => {
    fetchHomeworkData();
  }, []);

  const fetchHomeworkData = useCallback(async () => {
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
      const ids =
        homeworkContent?.data?.questionsSequenceInfo?.questionIds || [];
      setActiveQuestionId(ids[0]);
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
      console.error(err);
    }
  }, [studentId, homework_id, setLoading, dispatch]);

  const navigate = useNavigate();

  const handlePageChange = (page: number | null) => {
    if (page) {
      setActiveQuestionId(sortedQuestionIds[page - 1]);
    }
  };

  const getAnswerAttemptResult = (qId: string) => {
    const studentResponse = new HWStudentResponse(
      activeHomeworkStudentResponse
    ).responses.find((resp) => resp.questionId === qId);
    if (studentResponse && studentResponse.responses.length === 0) {
      return QAttemptResultEnum.RESPONSE_UNDEFINED;
    }
    return studentResponse?.isCorrect || QAttemptResultEnum.RESPONSE_UNDEFINED;
    // const homeworkQuestion = new HomeworkContent(activeHomeworkContent).homeworkContent.find(hw=>hw.questionId=== qId)?.question?.model.value;
  };

  const questionStatusArray = sortedQuestionIds.map((qId, index) => {
    const attempt = getAnswerAttemptResult(qId);
    switch (attempt) {
      case QAttemptResultEnum.RESPONSE_CORRECT:
        return {
          index,
          statusInfo: IQuestionStatus.Correct,
        };
      case QAttemptResultEnum.RESPONSE_INCORRECT:
        return {
          index,
          statusInfo: IQuestionStatus.Incorrect,
        };
      case QAttemptResultEnum.RESPONSE_PARTIALLY_CORRECT:
        return {
          index,
          statusInfo: IQuestionStatus.Incorrect,
        };
      case QAttemptResultEnum.RESPONSE_UNDEFINED:
        return {
          index,
          statusInfo: IQuestionStatus.NotAttempted,
        };
    }
  });

  //^
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return loading === 'loading' ? (
    <Loader />
  ) : loading === 'error' ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : (
    <Grid container spacing={2} sx={styles.root}>
      <Grid item xs={12} md={4.5} sx={styles.heading}>
        <Typography variant="h1">Your Homework</Typography>
        <Box sx={styles.subHeadingBox}>
          <Box sx={styles.subHeading}>
            <Typography variant="g2" color="warning.main">
              {Math.round(scorePercent * 100) / 100}%
            </Typography>
            <Typography variant="cardText" color="text.disabled">
              Score
            </Typography>
          </Box>
          <Box sx={styles.subHeading}>
            <Typography variant="h3">Learn better with this</Typography>
            <LinkButton
              onClick={() => {
                navigate(
                  `${HOMEWORK_VIEW_RECOMMENDATION}/${activeHomeworkContent?.homework?.subjectId}/${activeHomeworkContent?.homework?.chapterId}/${activeHomeworkContent?.homework?.moduleId}`
                );
              }}
            >
              View Recommendations
            </LinkButton>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={7.5} sx={{}}>
        <Box sx={{ mb: { xs: pxToRem(20), md: pxTovW(20) } }}>
          <Typography variant="h2" fontWeight="bold">
            Answer & Explanations
          </Typography>
        </Box>
        <Box
          sx={{
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <HomeworkPagination
            currentPage={activeQuestionIndex + 1}
            totalPages={totalQuestions}
            showPreviousNextButtons={true}
            questionStatusArray={questionStatusArray}
            onPageChange={handlePageChange}
            maxButtonsToDisplay={10}
          />
        </Box>

        {/* Question Renderer */}
        <Box sx={styles.questionBox}>
          <QuestionContainerWithSolution
            disableInput
            isSubmitted
            showAnswer
            questionNumber={activeQuestionIndex + 1}
            question={new Question(selectedHomeworkContent)}
            userAttemptedAnswer={
              getLastAttemptedResponse(
                studentResponseForCurrentQuestion?.responses
              )?.answer
            }
          />
        </Box>
      </Grid>
    </Grid>
  );
};
