import { Box, Typography } from '@mui/material';
import { QuestionContentModel } from '@protos/content_management/content.db_pb';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import PrimaryButton from '../../../elements/PrimaryButton';
import Question from '../Question';

export interface QuestionContainerProps {
  questionContent?: QuestionContentModel,
  questionNumber?: number | string,
  disableInput?: boolean,
  userAttemptedAnswer?: string[]
  handleAnswerChange?: (answer: string, index?: number) => void
  onDisableButtonClick?: () => void
  isCorrect?: boolean
  showAnswer?: boolean
  handleNext?: () => void,
  showNextButton?: boolean
  showSubmitButton?: boolean
  headerRightElement?: JSX.Element
  isSubmitted?: boolean
  hideMarks?: boolean
}

const styles: IStyles = {
  questionDetailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: {
      xs: pxToRem(15),
      md: pxTovW(15)
    },
    '&>div:last-child': {
      marginLeft: 'auto'
    }
  },
  marksWrapper: {
    padding: {
      xs: `${pxToRem(5)} ${pxToRem(13)}`,
      md: `${pxTovW(7)} ${pxTovW(11)}`,
    },
    borderRadius: {
      xs: pxToRem(16),
      md: pxTovW(35)
    },
    border: '1px solid #CEEAFF',
    marginLeft: '10px'
  },
  marks: {
    fontWeight: 700
  },
}


export default function QuestionContainer(props: QuestionContainerProps) {
  const { questionContent, hideMarks, questionNumber, disableInput, handleAnswerChange, userAttemptedAnswer, handleNext, showNextButton, showSubmitButton, isSubmitted } = props;
  if (!questionContent) {
    return null
  }
  const questionCase = questionContent.model.case;
  if (!questionCase) {
    return null;
  }
  const marks = questionContent.model.value.commonQuestionContent?.marks[0];

  return <Box>
    <Box sx={styles.questionDetailsWrapper}>
      {!!questionNumber && (<Typography variant='h3'>Q. {questionNumber}</Typography>)}
      {!!marks && !hideMarks && (
        <Box sx={styles.marksWrapper}>
          <Typography variant='h4' sx={styles.marks}>{marks} marks</Typography>
        </Box>
      )}
      {props.headerRightElement}
    </Box>
    <Question questionContent={questionContent} disableInput={disableInput} userAttemptedAnswer={userAttemptedAnswer} handleAnswerChange={handleAnswerChange} />
    {["fibContentModel", "mcqMultipleContentModel"].includes(questionCase) && handleNext && showNextButton && (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
        <PrimaryButton onClick={handleNext} disabled={!userAttemptedAnswer || userAttemptedAnswer.length === 0}>
          Next
        </PrimaryButton>
      </Box>
    )}
    {showSubmitButton && handleNext && !isSubmitted && (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: { xs: pxToRem(20), md: pxTovW(20) } }}>
        <PrimaryButton
          sx={{
            width: {
              xs: pxToRem(120),
              md: pxTovW(170)
            },
            height: { xs: pxToRem(38), md: pxTovW(56) },
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: { xs: '16px', md: '21px' },
            boxShadow:
              'inset 0 0 8px rgba(0, 0, 0, 0.5),0 7px 13px rgba(0, 0, 0, 0.5)',
            borderRadius: '10px'
          }}
          onClick={handleNext}
          disabled={!userAttemptedAnswer || userAttemptedAnswer.length === 0}
        >
          Submit
        </PrimaryButton>
      </Box>
    )}
  </Box>
}
