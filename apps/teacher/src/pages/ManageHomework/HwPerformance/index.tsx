import { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import {
  HomeworkPagination,
  IQuestionStatus,
  IQuestionStatusObject,
  IStyles,
  Loader,
  QuestionContainerWithSolution,
  getLastAttemptedResponse,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';

import {
  LmsHomewokTeacherAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb';
import { HomeworkContent } from '@protos/learning_management/lms.hw.common.apis_pb';
import { TeacherStudentResponseFetch } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HwPerformanceStatCard } from './component/HwPerformanceStatCard';

const styles: IStyles = {
  root: {
    boxSizing: 'border-box',
    p: { xs: `0`, md: `${pxTovW(60)} ${pxTovW(200)}` },
    display: 'flex',
    justifyContent: 'space-between',
  },

  secondaryHeadingBox: {
    mb: { xs: pxToRem(20), md: pxTovW(20) },
    pl: { xs: pxToRem(20), md: '0' },
  },

  userImage: {
    width: { xs: pxToRem(60), md: pxTovW(87) },
    height: { xs: pxToRem(60), md: pxTovW(87) },
  },

  questionBox: {
    margin: 'auto',
    // width: {xs: 'max-content', md: '100%'},
    mt: { xs: pxToRem(20), md: pxTovW(20) },
  },
};

export const HwPerformance = () => {
  const { student_id } = useParams();
  const { selected_hw_id } = useAppSelector((state) => state.manageHomework);
  const [questionStatusArray, setQuestionStatusArray] = useState<
    IQuestionStatusObject[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [hwContent, setHwContent] = useState<HomeworkContent | undefined>();
  const [studentResponse, setStudentResponse] = useState<
    TeacherStudentResponseFetch | undefined
  >();
  //^ HwPagination
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const content = hwContent?.homeworkContent || [];
  const selectedQuestion = hwContent?.homeworkContent[index];
  const selectedPage = index + 1;
  const teacher_id = getLocalStorage('userId');

  useEffect(() => {
    //creating initial question status array
    const res =
      hwContent?.homeworkContent.map((e, i) => {
        const attempt =
          studentResponse?.responses.find(
            (res) => res.questionId === e.questionId
          )?.isCorrect || QAttemptResultEnum.RESPONSE_UNDEFINED;
        switch (attempt) {
          case QAttemptResultEnum.RESPONSE_CORRECT:
            return {
              index: i,
              statusInfo: IQuestionStatus.Correct,
            };
          case QAttemptResultEnum.RESPONSE_INCORRECT:
            return {
              index: i,
              statusInfo: IQuestionStatus.Incorrect,
            };
          case QAttemptResultEnum.RESPONSE_PARTIALLY_CORRECT:
            return {
              index: i,
              statusInfo: IQuestionStatus.Incorrect,
            };
          case QAttemptResultEnum.RESPONSE_UNDEFINED:
          default:
            return {
              index: i,
              statusInfo: IQuestionStatus.NotAttempted,
            };
        }
      }) || [];
    setQuestionStatusArray(res);
  }, [hwContent]);

  useEffect(() => {
    if (student_id && selected_hw_id && teacher_id) {
      fetchData();
    }
  }, []);

  const handlePageChange = (page: number | null) => {
    // console.log('page:', page);
    if (page) setIndex(page - 1);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [studentResponse, hwContent] = await Promise.all([
        LmsHomewokTeacherAPIServiceV1Client.getStudentHWResponse({
          teacherId: teacher_id,
          studentId: BigInt(Number(student_id)),
          homeworkId: selected_hw_id,
        }),
        LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
          personId: teacher_id,
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          homeworkId: selected_hw_id,
        }),
      ]);
      // console.log(studentResponse.data);
      setStudentResponse(studentResponse.data);
      setHwContent(hwContent.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error(err);
    }
  };
  return loading === true ? (
    <Loader />
  ) : error === true ? (
    <Typography>Error Occured</Typography>
  ) : (
    <Grid container spacing={2} sx={styles.root}>
      <Grid item xs={12} md={4}>
        <HwPerformanceStatCard studentResponse={studentResponse} />
      </Grid>

      {hwContent?.homeworkContent.length !== 0 && (
        <Grid item xs={12} md={7.5}>
          <Box sx={styles.secondaryHeadingBox}>
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
              px: { xs: pxToRem(16), md: 0 },
            }}
          >
            <HomeworkPagination
              currentPage={selectedPage}
              totalPages={content.length}
              showPreviousNextButtons={content.length >= 10 ? true : false}
              questionStatusArray={questionStatusArray}
              onPageChange={handlePageChange}
              maxButtonsToDisplay={10}
            />
            {/* <HwPaginationButtons
            totalPages={content.length}
            currentPage={selectedPage}
            displayButtons={content.length}
            onPageChange={handlePageChange}
            colored
          /> */}
          </Box>

          {/* Question Renderer */}
          {/* <Box
          sx={{
            width: 'auto',
            // height: {xs: pxToRem(420), md: pxTovW(400)},
            // bgcolor: 'neutral.turquoise',
            border: `1px solid #CED2FC`,
            borderRadius: {
              xs: pxToRem(15),
              md: pxTovW(15),
            },
            backgroundColor: 'common.white',
            marginTop: {
              xs: pxToRem(15),
              md: pxTovW(15),
            },
          }}
        >
          <Box
            sx={{
              padding: {
                xs: `${pxToRem(20)} ${pxToRem(10)}`,
                md: `${pxTovW(20)} ${pxTovW(50)}`,
              },
            }}
          >
            {selectedQuestion && (
              <QuestionContainer
                questionNumber={index + 1}
                questionContent={selectedQuestion.question}
                userAttemptedAnswer={answers[index]}
              />
            )}
          </Box>
          <Box
            sx={{
              borderTop: '1px solid #CED2FC',
              padding: {
                xs: `${pxToRem(15)} ${pxToRem(13)}`,
                md: `${pxTovW(24)} ${pxTovW(30)}`,
              },
              backgroundColor: '#F3F9FE',
            }}
          >
            <TypographyHtml variant="bodyText">
              {selectedQuestion &&
                'Correct Answer: ' + getSolutionText(selectedQuestion)}
            </TypographyHtml>
          </Box>
        </Box> */}
          <Box
            sx={{
              marginTop: {
                xs: pxToRem(15),
                md: pxTovW(15),
              },
              px: { xs: pxToRem(16), md: 0 },
            }}
          >
            {selectedQuestion && (
              <QuestionContainerWithSolution
                questionNumber={index + 1}
                question={selectedQuestion}
                showAnswer
                isSubmitted
                userAttemptedAnswer={
                  getLastAttemptedResponse(
                    studentResponse?.responses.find(
                      (res) => res.questionId === selectedQuestion.questionId
                    )?.responses
                  )?.answer || []
                }
              />
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
