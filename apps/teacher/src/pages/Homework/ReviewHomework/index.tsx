import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  HwProceedButton,
  IStyles,
  InputField,
  PrimaryButton,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, Typography } from '@mui/material';
import { Question } from '@protos/content_management/content.db_pb';
import { TaskCreationStatusEnum } from '@protos/learning_management/lms.db_pb';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_ASSIGN } from '../../../routeHandling/RoutesNomenclature';
import {
  calculateMinMaxTime,
  totalNoQuestions,
} from '../../../utils/functions';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import {
  resetSelectedTasksInfo,
  setModuleFilteredQuestions,
  setSelectedTasksInfo,
  setSubmittedHWId,
} from '../reducer/homework.slice';
import DifficultyNos from './components/DifficultyNos';
import InfoBar from './components/InfoBar';
import QuestionsList from './components/QuestionsList';
import ReviewHeader from './components/ReviewHeader';
import { createTaskInfoModel, updateApiResponse } from './functions';

const styles: IStyles = {
  root: {
    backgroundColor: 'neutral.paleGrey',
    // height: '100vh',
    marginBottom: pxTovW(10),
    maxHeight: {
      xs: `calc(100vh - ${pxToRem(60)})`,
      md: `calc(100vh - ${pxTovW(100)})`,
    },
    display: 'flex',
    flexDirection: 'column',
    overflow: { md: 'hidden', xs: 'auto' },
  },
  mainContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { md: pxTovW(40) },
    padding: { md: `${pxTovW(15)} ${pxTovW(240)}` },
    overflow: 'scroll',
    height: '100%',
  },
  leftPanel: {
    flexBasis: { md: pxTovW(400) },
    display: 'flex',
    flexDirection: 'column',
    gap: { md: pxTovW(30) },
  },
  rightPanel: {
    flexBasis: { md: pxTovW(1000) },
    paddingBottom: { xs: pxToRem(70), md: 0 },
    overflow: { xs: 'initial', md: 'scroll' },
  },
};
interface IProps {
  setQuestionBankDisplayFlag: Dispatch<SetStateAction<boolean>>;
}
export default function ReviewHomeowork(props: IProps) {
  const { setQuestionBankDisplayFlag } = props;
  const navigate = useNavigate();
  const { setSelectedFunction } = useGlobalContext();
  const dispatch = useAppDispatch();
  const { module_id } = useParams();
  const teacher_id = getLocalStorage('userId');
  const [quesLoading, setQuesLoading] = useState(false);
  const [quesError, setQuesError] = useState(false);
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const {
    questions_count,
    module_filtered_questions,
    chapterwise_topic,
    selected_tasks_info,
    fetched_hw_details,
  } = deserify(useAppSelector((state) => state.homework));
  const handleInputFocus = () => {
    // navigate(`${HOMEWORK_QUESTIONBANK}/${module_id}`);
    setQuestionBankDisplayFlag(true);
  };
  const handleback = () => {
    dispatch(resetSelectedTasksInfo());
    // navigate(`${HOMEWORK_CREATE}/${module_id}`);
    navigate(-1);
  };
  useEffect(() => {
    setSelectedFunction(() => handleback);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const getModuleQuestions = async (moduleId: string) => {
    try {
      setQuesLoading(true);
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getModuleQuestionsWithFilters(
          {
            teacherId: teacher_id,
            subjectId: class_subject_info?.subjectId,
            moduleId: Number(moduleId),
            requiredDifficultyLevelsCountInfo: questions_count,
          }
        );
      if (response.data) {
        const data = response.data;
        if (module_filtered_questions) {
          const updatedResponse = updateApiResponse(
            data,
            module_filtered_questions,
            questions_count
          );
          dispatch(
            setModuleFilteredQuestions({ questions: updatedResponse.questions })
          );
          const tasksInfo = createTaskInfoModel(updatedResponse.questions);
          dispatch(setSelectedTasksInfo(tasksInfo));
        } else {
          dispatch(setModuleFilteredQuestions(data));
        }
      }
      setQuesLoading(false);
    } catch (err) {
      console.log(err);
      setQuesLoading(false);
      setQuesError(true);
      console.error(err);
    }
  };
  // const handlingQuestionsOrder = () => {};

  const updateClickHandler = () => {
    if (module_id) {
      getModuleQuestions(module_id);
    }
  };
  const proceedClickhandler = () => {
    if (
      questions_count.noOfHighQuestions === 0 &&
      questions_count.noOfMediumQuestions === 0 &&
      questions_count.noOfLowQuestions === 0
    ) {
      dispatch(
        setToastInfo({
          variant: 'error',
          label: 'Add atleast one question ',
          open: true,
        })
      );
    } else {
      submitHomework(TaskCreationStatusEnum.TASK_CREATION_STATUS_APPROVED);
    }
  };
  const canEdit = () => {
    if (fetched_hw_details) {
      if (fetched_hw_details.teacherId === BigInt(teacher_id)) {
        return true;
      }
      return false;
    }
    return true;
  };
  const submitHomework = async (status: TaskCreationStatusEnum) => {
    // repeated TaskInfoModel selected_tasks_info = 7 [(google.api.field_behavior) = REQUIRED];
    try {
      const resposne =
        await LmsHomewokTeacherAPIServiceV1Client.homeworkCreationSubmit({
          teacherId: teacher_id,
          subjectId: class_subject_info?.subjectId,
          sectionId: class_subject_info?.sectionId,
          taskName: 'new Homework',
          chapterId: chapterwise_topic?.chapterInfo?.chapterId,
          topicId: Number(module_id),
          selectedTasksInfo: selected_tasks_info,
          creationStatus: status,
          // homeworkId: fetched_hw_details?.homeworkId,
        });
      if (resposne.data) {
        const hwId = resposne.data.homework?.homeworkId;
        dispatch(setSubmittedHWId(hwId));
        navigate(`${HOMEWORK_ASSIGN}`);
      }
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };
  const totalMarks = (question?: Question[]) => {
    if (!question) {
      return 0;
    }
    const marks = question.reduce(
      (acc, curr) =>
        acc +
        (curr.question?.model.value?.commonQuestionContent?.marks[0] || 0),
      0
    );
    return marks;
  };
  const timeOfQuestions = () => {
    let time = 0;
    if (module_filtered_questions) {
      time = module_filtered_questions.questions.reduce((acc, curr) => {
        const c = curr.question?.model.value;
        const currentTime = c ? c.commonQuestionContent?.time || 0 : 0;
        return acc + currentTime;
      }, 0);
      return (time / 60).toFixed(2);
    }
    return `${calculateMinMaxTime(questions_count).min}-${
      calculateMinMaxTime(questions_count).max
    }`;
  };
  return (
    <Box sx={styles.root}>
      <ReviewHeader proceedClickhandler={proceedClickhandler} />
      <Box sx={styles.mainContainer}>
        <Box sx={styles.leftPanel}>
          <Box sx={{ padding: { xs: pxToRem(20), md: 0 } }}>
            <InputField
              variant="outlined"
              fullWidth
              boldtext={true}
              sx={{
                borderRadius: { xs: pxToRem(30), md: pxTovW(40) },
                border: '1px solid #CCE6FE',
              }}
              placeholder="Add From Question Bank"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="large" color="primary" />
                  </InputAdornment>
                ),
              }}
              onFocus={handleInputFocus}
            />
          </Box>
          <Box>
            <DifficultyNos
              mobileVariant="horizontal"
              desktopVariant="vertical"
            />
            <Box
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                  width: '60%',
                  margin: 'auto',
                  marginTop: pxToRem(10),
                  marginBottom: pxToRem(10),
                },
              }}
            >
              <PrimaryButton
                onClick={updateClickHandler}
                disabled={
                  questions_count.noOfHighQuestions === 0 &&
                  questions_count.noOfLowQuestions === 0 &&
                  questions_count.noOfMediumQuestions === 0
                }
              >
                Update
              </PrimaryButton>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <InfoBar
              contentList={[
                {
                  iconName: 'questions',
                  quantity: `${totalNoQuestions(questions_count)}`,
                  label: 'Questions',
                },
                {
                  iconName: 'clock',
                  quantity: timeOfQuestions(),
                  label: 'Minutes',
                },
                {
                  iconName: 'marks',
                  quantity: `${totalMarks(
                    module_filtered_questions?.questions
                  )}`,
                  label: 'Marks',
                },
              ]}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <PrimaryButton
              onClick={updateClickHandler}
              disabled={
                questions_count.noOfHighQuestions === 0 &&
                questions_count.noOfLowQuestions === 0 &&
                questions_count.noOfMediumQuestions === 0
              }
            >
              Update
            </PrimaryButton>
          </Box>
        </Box>
        <Box sx={styles.rightPanel}>
          <QuestionsList
            title={<Typography variant="h2">Review Homeworks</Typography>}
            subtitle="Refresh, Re-order, or Remove"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 10,
          left: 12,
        }}
      >
        <HwProceedButton
          clickHandler={proceedClickhandler}
          tabs={[
            { quantity: `${totalNoQuestions(questions_count)}`, title: 'Qs' },
            {
              quantity: timeOfQuestions(),
              title: 'Mins',
            },
            {
              quantity: `${totalMarks(module_filtered_questions?.questions)}`,
              title: 'Marks',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
