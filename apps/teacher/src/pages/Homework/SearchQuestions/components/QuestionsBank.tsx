import {
  IStyles,
  QuantityButton,
  QuestionContainerWithSolution,
  deserify,
  pxToRem,
  pxTovW,
  theme
} from '@geneo2-web/shared-ui';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { Question } from '@protos/content_management/content.db_pb';
import { ModuleFilteredQuestions } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../reduxStore/reduxHooks';
import { setQuestionsCount } from '../../reducer/homework.slice';

const styles: IStyles = {
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: { md: '1px solid grey' },
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
  questionWrapper: {
    margin: pxTovW(20),
    // width: { md: pxTovW(944) },
    position: 'relative',
    border: '1px solid #CED2FC',
    borderRadius: {
      xs: pxToRem(15),
      md: pxTovW(15),
    },
    marginBottom: { xs: pxToRem(20), md: pxTovW(20) },
    overflow: 'hidden',
  },
  questionPart: {
    padding: {
      xs: `${pxToRem(24)} ${pxToRem(11)}`,
      md: `${pxTovW(24)} ${pxTovW(50)}`,
    },
  },
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
  },

  modalRoot: {
    display: { xs: 'flex' },
    flexDirection: 'column',
    backgroundColor: 'common.white',
    margin: { md: 'auto' },
    width: { xs: '100%', md: pxTovW(300) },
    height: { xs: pxToRem(407), md: 'max-content' },
    maxHeight: { xs: pxToRem(407), md: '25.156vw' },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    paddingY: pxToRem(22),
    paddingX: { md: pxToRem(22) },
    justifyContent: 'center',
    mt: { md: '30vh' },
    // alignItems: 'center',
  },
  headingBox: {
    borderBottom: '1px solid #E8E8E8',
    display: 'flex',
    justifyContent: 'space-between',

    padding: pxToRem(22),
    paddingTop: pxToRem(10),
    '&:hover': {
      backgroundColor: { md: '#ECFFF5' },
    },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

interface IProps {
  questionList?: ModuleFilteredQuestions;
  handleAddNewQuestion: (questionId: string, question: Question) => void;
  setQuestionBankDisplayFlag: Dispatch<SetStateAction<boolean>>;
}
export default function QuestionsBank(props: IProps) {
  const { questionList, handleAddNewQuestion, setQuestionBankDisplayFlag } =
    props;
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { module_id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { module_filtered_questions, questions_count } = deserify(
    useAppSelector((state) => state.homework)
  );
  const addQuestions = (questionId: string, question: Question) => {
    handleAddNewQuestion(questionId, question);
    dispatch(setQuestionsCount());
  };
  let questionIdSet: Set<string> | undefined;
  if (module_filtered_questions) {
    questionIdSet = new Set<string>(
      module_filtered_questions.questions.map((obj: any) => obj.questionId)
    );
  }
  const checkQuestions = (questionID: string | undefined) => {
    if (questionID) {
      if (questionIdSet && questionIdSet.has(questionID)) {
        return true;
      }
    }
    return false;
  };

  return (
    <Box sx={styles.root}>
      <Box>
        <Box sx={styles.questionsContainer}>
          {questionList ? (
            questionList?.questions.map((ques, index: number) => (
              <Box
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px',
                  position: 'relative',
                }}
              >
                <QuestionContainerWithSolution
                  hideMarks
                  headerRightElement={
                    !checkQuestions(ques.questionId) ? (
                      <Button
                        sx={{ marginLeft: 'auto' }}
                        onClick={() =>
                          addQuestions(
                            ques.questionId || index.toString(),
                            ques
                          )
                        }
                      >
                        <QuantityButton quantity={0} maxQuantity={1} />
                      </Button>
                    ) : (
                      <Typography
                        variant="h4"
                        color="secondary"
                        sx={{ marginLeft: 'auto' }}
                      >
                        Question already added
                      </Typography>
                    )
                  }
                  question={ques}
                />
              </Box>
            ))
          ) : (
            <Typography variant="h2">Loading...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
