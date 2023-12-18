import { Timestamp } from '@bufbuild/protobuf';
import { LmsHomewokStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  HomeworkPagination,
  IQuestionStatus,
  IQuestionStatusObject,
  IStyles,
  QuestionContainerWithSolution,
  deserify,
  isCorrectAnswer,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  Question,
  Question_QuestionEnum,
} from '@protos/content_management/content.db_pb';
import {
  ContentAttempt,
  StudentTaskResponse,
  TaskStudentAttemptStatusEnum,
} from '@protos/learning_management/lms.db_pb';
import { HWStudentResponse } from '@protos/learning_management/lms.hw.student.apis_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_SUBMITTED } from '../../../routeHandling/RoutesNomenclature';
import { onHomeworkCardClick } from '../../../utils/homework';
import {
  setActiveHomeworSessionId,
  setActiveHomeworkAttemptResult,
  setActiveHomeworkStudentResponse,
} from '../reducer/homework.slice';
import ActiveProgressbar from './component/ActiveProgressbar';
import { HwMemePage } from './component/HwMemePage';

const styles: IStyles = {
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    p: {
      xs: `${pxToRem(15)} 0`,
      md: `${pxTovW(40)} ${pxTovW(240)}`,
    },
    display: 'flex',
    justifyContent: 'space-between',
    m: 0,
  },
  heading: {
    mb: { xs: pxToRem(20), md: pxTovW(20) },
    px: { xs: pxToRem(8), md: 0 },
  },

  questionBox: {
    margin: 'auto',
    // width: 'max-content',
    // mt: { xs: pxToRem(20), md: pxTovW(30) },
    padding: {
      xs: `${pxToRem(20)} ${pxToRem(20)}`,
      md: `${pxTovW(20)} ${pxTovW(40)}`,
    },
    boxSizing: 'border-box',
  },
};

export const ActiveHw = () => {
  const location = useLocation();
  const homework_id =
    new URLSearchParams(location.search).get('homeworkId') || undefined;
  const {
    active_homework_content,
    active_homework_student_response,
    active_homework_session_id,
  } = deserify(useAppSelector((state) => state.homework));
  const userInfo = deserify(useAppSelector((state) => state.auth.userInfo));
  const activeHomeworkContent =
    active_homework_content && homework_id
      ? active_homework_content[homework_id]
      : undefined;
  const activeHomeworkStudentResponse =
    active_homework_student_response && homework_id
      ? active_homework_student_response[homework_id]
      : undefined;
  const taskQuestionInfo =
    activeHomeworkContent?.questionsSequenceInfo?.taskQuestionInfo || [];
  const sortedQuestionIds = taskQuestionInfo
    .sort((a, b) => a.sequence - b.sequence)
    .map((val) => val.questionId)
    .filter((val) => val !== undefined) as string[];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(
    sortedQuestionIds[0]
  );

  const selectedHomeworkContent = activeHomeworkContent?.homeworkContent.find(
    (hw) => hw.questionId === activeQuestionId
  );
  const activeQuestionIndex = sortedQuestionIds.indexOf(activeQuestionId);
  const totalQuestions = sortedQuestionIds.length;
  const [answers, setAnswers] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(Timestamp.fromDate(new Date()));
  const homework_end_path = useAppSelector(
    (state) => state.homework.homework_end_path
  );
  const [showExitPopup, setShowExitPopup] = useState(false);

  const [showMeme, setShowMeme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setSelectedFunction } = useGlobalContext();

  // const backClick = async () => {
  //   setShowExitPopup(true);
  // };

  // const handleExit = (response: 'yes' | 'no') => {
  //   if (response === 'yes') {
  //     navigate(homework_end_path ? homework_end_path : HOME);
  //     dispatch(setHomeworkEndPath(undefined));
  //   } else {
  //     setSelectedFunction(() => backClick);
  //     setShowExitPopup(false);
  //   }
  // };

  const onBackClick = () => {
    const studId = userInfo?.studentProfileId;
    if (studId) {
      onHomeworkCardClick(
        dispatch,
        navigate,
        Number(homework_id),
        studId,
        undefined,
        homework_end_path
      );
    }
  };
  useEffect(() => {
    if (
      activeHomeworkStudentResponse?.responses &&
      activeHomeworkStudentResponse?.responses.length !==
        activeHomeworkContent?.homeworkContent.length
    ) {
      const lastQuestionAttempted =
        activeHomeworkStudentResponse.responses.length;
      activeHomeworkStudentResponse.responses.forEach((ans, i) => {
        questionStatusArray[i].statusInfo = IQuestionStatus.Attempted;
      });
      setActiveQuestionId(sortedQuestionIds[lastQuestionAttempted]);
    }
    setSelectedFunction(() => onBackClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  useEffect(() => {
    setShowMeme(false);
    setAnswers([]);
    setStartTime(Timestamp.fromDate(new Date()));
    // Disabled so that we don't show previous ans
    // const quesResponse = activeHomeworkStudentResponse?.responses.find(resp => resp.questionId == activeQuestionId);
    // setAnswers(new ContentAttempt(getLastAttemptedResponse(quesResponse?.responses)).answer);
  }, [activeQuestionId]);

  useEffect(() => {
    if (isSubmitting) {
      handleNext();
      setIsSubmitting(false); // Resetting isSubmitting after calling handleNext
    }
  }, [isSubmitting]);

  const [questionStatusArray, setQuestionStatusArray] = useState<
    IQuestionStatusObject[]
  >(
    sortedQuestionIds.map((qId, index) => {
      return {
        index,
        statusInfo: IQuestionStatus.NotAttempted,
      };
    })
  );

  const handleNext = async () => {
    if (activeQuestionIndex < 0 || !homework_id || isNaN(Number(homework_id))) {
      return;
    }
    if (!active_homework_session_id) {
      throw new Error('Invalid or missing session id');
    }
    const isLastQuestion = activeQuestionIndex === totalQuestions - 1;
    const quesAttempt = new ContentAttempt({
      startTime: startTime,
      endTime: Timestamp.fromDate(new Date()),
      answer: answers,
    });

    const questionTaskId = taskQuestionInfo.find(
      (val) => val.questionId === activeQuestionId
    )?.questionTaskId;

    const responseToSubmit = new StudentTaskResponse({
      // homeworkId: Number(homework_id),
      questionId: activeQuestionId,
      questionTaskId: questionTaskId,
      responses: [quesAttempt],
    });

    const activeHomeworkStudentResp = new HWStudentResponse(
      activeHomeworkStudentResponse
    );
    const quesResponseIndex = activeHomeworkStudentResp.responses.findIndex(
      (resp) => resp.questionId === activeQuestionId
    );
    if (quesResponseIndex >= 0) {
      activeHomeworkStudentResp.responses[quesResponseIndex].responses.push(
        quesAttempt
      );
    } else {
      activeHomeworkStudentResp.responses.push(responseToSubmit);
    }

    const hwSubmitResponse =
      await LmsHomewokStudentAPIServiceV1Client.submitStudentHWResponse({
        studentId: userInfo?.studentProfileId,
        homeworkId: Number(homework_id),
        homeworkAttemptStatus: isLastQuestion
          ? TaskStudentAttemptStatusEnum.TASK_STUDENT_STATUS_COMPLETED
          : TaskStudentAttemptStatusEnum.TASK_STUDENT_STATUS_IN_PROGRESS,
        responses: activeHomeworkStudentResp.responses,
        timestamp: Timestamp.fromDate(new Date()),
        sessionId: active_homework_session_id,
      });
    if (hwSubmitResponse.status === 200) {
      dispatch(
        setActiveHomeworkStudentResponse({
          homeworkId: Number(homework_id),
          response: activeHomeworkStudentResp,
        })
      );
      questionStatusArray[activeQuestionIndex].statusInfo =
        IQuestionStatus.Attempted;
      setQuestionStatusArray(questionStatusArray);
      if (!isLastQuestion) {
        setShowMeme(true);
      } else if (isLastQuestion) {
        const activeHomeworkAttemptResult = hwSubmitResponse.attemptResult;
        dispatch(
          setActiveHomeworkAttemptResult({
            homeworkId: Number(homework_id),
            result: activeHomeworkAttemptResult,
          })
        );
        dispatch(setActiveHomeworSessionId(undefined));
        navigate(`${HOMEWORK_SUBMITTED}?homeworkId=${homework_id}`);
      }
    }
  };

  const handleAnswerChange = (val: string, ind?: number) => {
    let answersCopy = answers.slice();
    switch (selectedHomeworkContent?.questionType) {
      case Question_QuestionEnum.QUESTION_TYPE_MCQM:
        if (!answersCopy.includes(val)) {
          answersCopy.push(val);
        } else {
          answersCopy = answersCopy.filter((v) => v !== val);
        }
        break;
      case Question_QuestionEnum.QUESTION_TYPE_FIB:
        if (typeof ind == 'number') {
          if (ind >= 1) {
            for (let i = 0; i < ind; i++) {
              if (!answersCopy[i]) {
                answersCopy[i] = '';
              }
            }
          }
          answersCopy[ind] = val;
        }
        break;
      case Question_QuestionEnum.QUESTION_TYPE_MCQS:
      case Question_QuestionEnum.QUESTION_TYPE_TF:
        answersCopy = [val];
        break;
    }
    setAnswers(answersCopy);
    // Move to next question if tf or mcq-s
    switch (selectedHomeworkContent?.questionType) {
      case Question_QuestionEnum.QUESTION_TYPE_MCQS:
      case Question_QuestionEnum.QUESTION_TYPE_TF:
        setIsSubmitting(true);
        break;
      default:
        break;
    }
  };

  const memeEndHandler = () => {
    setActiveQuestionId(sortedQuestionIds[activeQuestionIndex + 1]);
  };

  const studentResponseForCurrentQuestion = new HWStudentResponse(
    activeHomeworkStudentResponse
  ).responses.find((resp) => resp.questionId === activeQuestionId);
  //^
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (showMeme)
    return (
      <HwMemePage
        isCorrectAnswer={isCorrectAnswer(
          new Question(selectedHomeworkContent),
          answers
        )}
        timeTaken={(new Date().getTime() - startTime.toDate().getTime()) / 1000}
        actualQuestionTime={
          selectedHomeworkContent?.question?.model.value?.commonQuestionContent
            ?.time
        }
        memeEndHandler={memeEndHandler}
      />
    );

  return (
    <Grid container spacing={0} sx={styles.root}>
      <ActiveProgressbar
        percentage={((activeQuestionIndex + 1) * 100) / totalQuestions}
      />
      <Grid item xs={12} md={4.5} sx={styles.heading}>
        <Typography variant="h2">Homework</Typography>
      </Grid>
      <Grid item xs={12} md={7.5} sx={{ paddingX: 0 }}>
        <Box
          sx={{
            mb: { xs: pxToRem(20), md: pxTovW(20) },
            px: { xs: pxToRem(8) },
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            {activeHomeworkContent?.homework?.homeworkTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            overflowX: 'scroll',
            px: { xs: pxToRem(8) },
            overflowY: 'clip',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <HomeworkPagination
            currentPage={activeQuestionIndex + 1}
            totalPages={totalQuestions}
            showPreviousNextButtons={false}
            questionStatusArray={questionStatusArray}
            // onPageChange={(page) => setIndex(page - 1)}
            maxButtonsToDisplay={10}
          />
        </Box>
        {/* Question Renderer */}
        {/* add Next button for Fill in the blanks */}
        {selectedHomeworkContent && (
          <Box sx={styles.questionBox}>
            <QuestionContainerWithSolution
              userAttemptedAnswer={answers}
              questionNumber={activeQuestionIndex + 1}
              question={new Question(selectedHomeworkContent)}
              handleAnswerChange={handleAnswerChange}
              handleNext={handleNext}
              showNextButton
              showHintIcon
            />
          </Box>
        )}
        {/* - - - - - - - - - - - - - - - - - - - - - - - - */}
      </Grid>
      {/* <ActionsPopup
        open={showExitPopup}
        iconName="homework"
        popupText="Exiting now will erase all your current homework progress. Confirm?"
        handleClose={() => handleExit('no')}
        noClickHandler={() => handleExit('no')}
        yesClickHandler={() => handleExit('yes')}
        fontSmall
      /> */}
    </Grid>
  );
};
