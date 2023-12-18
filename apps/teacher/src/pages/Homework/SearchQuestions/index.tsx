import {
  ChipBadge,
  HwProceedButton,
  IStyles,
  InputField,
  MobilePopup,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';

import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  Question,
  Question_QuestionEnum,
} from '@protos/content_management/content.db_pb';
import { ModuleFilteredQuestions } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  calculateMinMaxTime,
  difficultyValuesArray,
  questionValuesArray,
  toDifficultyEnum,
  toQuestionEnum,
  totalNoQuestions,
} from '../../../utils/functions';
import QuestionsList from '../ReviewHomework/components/QuestionsList';
import { rearrangeTaskInfoArrayAfterAddition } from '../ReviewHomework/functions';
import {
  addModuleFilteredQuestion,
  setFilteredQuestions,
  setSelectedTasksInfo,
} from '../reducer/homework.slice';
import QuestionsBank from './components/QuestionsBank';

const styles: IStyles = {
  root: {
    bgcolor: 'neutral.paleGrey',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: pxToRem(20), md: pxTovW(40) },
    padding: {
      xs: pxToRem(11),
      md: `${pxTovW(15)} ${pxTovW(240)} ${pxTovW(15)} ${pxTovW(200)}`,
    },
    boxSizing: 'border-box',
    maxHeight: {
      xs: `calc(100vh - ${pxToRem(60)})`,
      md: `calc(100vh - ${pxTovW(100)})`,
    },
    overflow: { md: 'hidden', xs: 'auto' },
  },
  leftPanel: {
    flexBasis: { md: pxTovW(615) },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    padding: {
      md: `${pxTovW(30)} ${pxTovW(40)}`,
    },
    bgcolor: 'common.white',
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottom: { md: '1px solid grey' },
    paddingBottom: pxTovW(20),
  },
  textBox: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: { xs: pxToRem(10), md: pxTovW(0) },
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    '& > * ': { display: 'inline' },
  },
  questionBank: {
    bgcolor: 'common.white',
    padding: { md: pxTovW(30) },
    paddingBottom: { xs: pxToRem(70), md: 0 },
    borderRadius: { xs: pxToRem(30), md: pxTovW(30) },
    // border: '1px solid red',
    overflowY: 'scroll',
  },
  rightPanel: {
    display: { xs: 'none', md: 'block' },
    flexBasis: { md: pxTovW(822) },
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    overflowY: 'scroll',
  },
};

const questionTypes = Object.values(Question_QuestionEnum).filter(
  (value) => typeof value === 'string'
);
interface IProps {
  setQuestionBankDisplayFlag: Dispatch<SetStateAction<boolean>>;
}
export default function SearchQuestions(props: IProps) {
  const { setQuestionBankDisplayFlag } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { module_id } = useParams();
  const teacher_id = getLocalStorage('userId');
  const [quesLoading, setQuesLoading] = useState(false);
  const [quesError, setQuesError] = useState(false);
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    questions_count,
    filtered_questions,
    module_filtered_questions,
    selected_tasks_info,
  } = deserify(useAppSelector((state) => state.homework));
  const { setSelectedFunction } = useGlobalContext();

  const [filteredQuestionsList, setFilteredQuestionsList] = useState<
    ModuleFilteredQuestions | undefined
  >(filtered_questions);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedQuestionType, setSelectedQuestionType] = useState<
    string | null
  >(null);
  const handleback = () => {
    setQuestionBankDisplayFlag(false);
  };
  useEffect(() => {
    setSelectedFunction(() => handleback);
    return () => {
      setSelectedFunction(null);
    };
  }, []);
  useEffect(() => {
    if (module_id) {
      getModuleQuestions(module_id);
    }
  }, []);
  const handleDifficultyChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setSelectedDifficulty(newValue);
    updateFilteredList(newValue, selectedQuestionType);
  };

  const handleQuestionTypeChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ) => {
    setSelectedQuestionType(newValue);
    updateFilteredList(selectedDifficulty, newValue);
  };

  const updateFilteredList = (
    difficulty: string | null,
    questionType: string | null
  ) => {
    if (difficulty === null && questionType === null) {
      // Both fields are cleared, show all questions
      setFilteredQuestionsList(filtered_questions);
      return;
    }

    if (filtered_questions) {
      const updatedList = filtered_questions.questions.filter((e: Question) => {
        const matchesDifficulty =
          difficulty === null ||
          e.questionMeta?.difficultyLevel === toDifficultyEnum(difficulty);
        const matchesQuestionType =
          questionType === null ||
          e.questionType === toQuestionEnum(questionType);
        return matchesDifficulty && matchesQuestionType;
      });

      const newFilteredQuestionsList = structuredClone(filtered_questions);
      if (newFilteredQuestionsList) {
        newFilteredQuestionsList.questions = structuredClone(updatedList);
        setFilteredQuestionsList(newFilteredQuestionsList);
      } else {
        setFilteredQuestionsList(filtered_questions);
      }
    }
  };
  const getModuleQuestions = async (moduleId: string) => {
    try {
      setQuesLoading(true);
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getModuleQuestionsWithFilters(
          {
            teacherId: teacher_id,
            subjectId: class_subject_info?.subjectId,
            moduleId: Number(moduleId),
            // requiredDifficultyTypes: [toDifficultyEnum(selectedDifficulty)],
            // requiredQuestionTypes: [toQuestionEnum(selectedQuestionType)],
          }
        );
      if (response.data) {
        const data = response.data;
        dispatch(setFilteredQuestions(data));
        setFilteredQuestionsList(data);
      }
      setQuesLoading(false);
    } catch (err) {
      console.log(err);
      setQuesLoading(false);
      setQuesError(true);
    }
  };
  const handleAddNewQuestion = (newQuestionId: string, question: Question) => {
    const list = structuredClone(module_filtered_questions);
    if (list?.questions?.some((q) => q.questionId === newQuestionId)) {
      // if question is already present
      return;
    }
    dispatch(addModuleFilteredQuestion(question));
    // rearranging the task info array
    const updatedTaskInfoModels = rearrangeTaskInfoArrayAfterAddition(
      newQuestionId,
      selected_tasks_info
    );
    dispatch(setSelectedTasksInfo(updatedTaskInfoModels));
  };
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [difficultyModalState, setDifficultyModalState] = useState(false);
  const [quesTypeModalState, setQuesTypeModalState] = useState(false);
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
  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftPanel}>
        <Box sx={styles.header}>
          <Box sx={styles.heading}>
            {/* <Typography variant="h1">My Homework</Typography> */}
            <Box sx={styles.textBox}>
              <Typography variant="h2">Question Bank </Typography>
              <Typography variant="h3">
                <ChipBadge
                  label={filteredQuestionsList?.questions.length}
                  color="primary"
                  size="small"
                />
              </Typography>
            </Box>
            {mediumScreen ? (
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: '16px' }}
                onClick={() =>
                  // navigate(`${HOMEWORK_REVIEW}/${module_id}`)
                  setQuestionBankDisplayFlag(false)
                }
              >
                Back to HW
              </Button>
            ) : (
              <Box
                sx={{
                  display: { xs: 'block', md: 'none' },
                  position: 'fixed',
                  bottom: { xs: 5, md: 15 },
                  margin: 'auto',
                  zIndex: '100',
                }}
              >
                <HwProceedButton
                  clickHandler={() =>
                    // navigate(`${HOMEWORK_REVIEW}/${module_id}`)
                    setQuestionBankDisplayFlag(false)
                  }
                  buttonTitle="Back to HW"
                  tabs={[
                    {
                      quantity: `${totalNoQuestions(questions_count)}`,
                      title: 'Qs',
                    },
                    {
                      quantity: `${calculateMinMaxTime(questions_count).max}`,
                      title: 'Mins',
                    },
                    {
                      quantity: `${totalMarks(
                        module_filtered_questions?.questions
                      )}`,
                      title: 'Marks',
                    },
                  ]}
                />
              </Box>
            )}
          </Box>
          <Box>
            <InputField
              variant="outlined"
              fullWidth
              boldtext={true}
              sx={{
                borderRadius: { xs: pxToRem(30), md: pxTovW(40) },
                border: '1px solid #CCE6FE',
              }}
              placeholder="Search concepts or subtopics"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="large" color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: { xs: '95vw', md: 'unset' },
              gap: { xs: pxToRem(5), md: pxTovW(15) },
              // paddingRight: { xs: pxToRem(5), md: pxToRem(0) },
              // paddingLeft: { xs: pxToRem(5), md: pxToRem(0) },
              boxSizing: 'border-box',
              // margin: 'auto',
              justifyContent: 'space-around',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
          >
            <Box
              sx={
                mobile
                  ? {
                    flexBasis: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }
                  : { flexBasis: '50%' }
              }
            >
              {mediumScreen ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  popupIcon={
                    <KeyboardArrowDownRoundedIcon
                      fontSize={mediumScreen ? 'large' : 'small'}
                      sx={{ color: 'text.disabled' }}
                    />
                  }
                  options={difficultyValuesArray}
                  value={selectedDifficulty}
                  onChange={handleDifficultyChange}
                  // disableClearable
                  sx={{
                    border: '1px solid #38FF92',
                    borderRadius: '7px',
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      {...params}
                      label="Difficulty Level"
                    />
                  )}
                />
              ) : (
                <Box
                  sx={{
                    padding: pxToRem(5),
                    display: 'flex',
                    width: pxToRem(155),
                    height: pxToRem(45),
                    border: '1px solid #38FF92',
                    borderRadius: '7px',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                  onClick={() => setDifficultyModalState(true)}
                >
                  <Typography
                    // {...params}
                    variant="h4"
                    sx={{
                      padding: pxToRem(5),
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'horizontal',
                      overflow: 'hidden',
                    }}
                  >
                    {selectedDifficulty !== null
                      ? selectedDifficulty
                      : ' Difficulty Level'}
                  </Typography>
                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      color: 'text.disabled',
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box
              sx={
                mobile
                  ? {
                    flexBasis: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }
                  : { flexBasis: '50%' }
              }
            >
              {mediumScreen ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  popupIcon={
                    <KeyboardArrowDownRoundedIcon
                      fontSize="large"
                      sx={{ color: 'text.disabled' }}
                    />
                  }
                  options={questionValuesArray}
                  value={selectedQuestionType}
                  onChange={handleQuestionTypeChange}
                  // disableClearable
                  sx={{
                    border: '1px solid #38FF92',
                    borderRadius: '7px',
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      {...params}
                      label="Question Type"
                    />
                  )}
                />
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    width: pxToRem(155),
                    height: pxToRem(45),
                    border: '1px solid #38FF92',
                    borderRadius: '7px',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                  onClick={() => setQuesTypeModalState(true)}
                >
                  <Typography
                    // {...params}
                    variant="h4"
                    sx={{
                      padding: pxToRem(5),
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {selectedQuestionType !== null
                      ? selectedQuestionType
                      : 'Question Type'}
                  </Typography>
                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      color: 'text.disabled',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={styles.questionBank}>
          <QuestionsBank
            questionList={filteredQuestionsList}
            handleAddNewQuestion={handleAddNewQuestion}
            setQuestionBankDisplayFlag={setQuestionBankDisplayFlag}
          />
        </Box>
      </Box>
      <Box sx={styles.rightPanel}>
        <QuestionsList
          title={
            <Typography
              variant="h2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: pxToRem(10), md: pxTovW(10) },
              }}
            >
              My Homework
              <Typography variant="h3" sx={{ display: 'inline' }}>
                <ChipBadge
                  label={module_filtered_questions?.questions.length}
                  color="primary"
                />
              </Typography>
            </Typography>
          }
        />
      </Box>
      <MobilePopup
        options={difficultyValuesArray}
        title="DifficultyLevel"
        modalState={difficultyModalState}
        setModalState={setDifficultyModalState}
        onChange={handleDifficultyChange}
        clearall
      />
      <MobilePopup
        options={questionValuesArray}
        title="Question Type"
        modalState={quesTypeModalState}
        setModalState={setQuesTypeModalState}
        onChange={handleQuestionTypeChange}
        clearall
      />
    </Box>
  );
}
