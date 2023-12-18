import { Box } from '@mui/material';

import { IStyles, ImageWrapper, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb';
import { TimerProgressWithText } from './TimerProgressWithText';

const styles: IStyles = {
  root: {},

  imageBox: {},
};

interface IProps {
  memeEndHandler: () => void;
  actualQuestionTime?: number;
  timeTaken?: number;
  isCorrectAnswer?: QAttemptResultEnum;
}
export const HwMemePage = ({
  memeEndHandler,
  actualQuestionTime,
  timeTaken,
  isCorrectAnswer,
}: IProps) => {
  const isFast =
    !!timeTaken && !!actualQuestionTime && timeTaken < actualQuestionTime / 2;
  const isSlow =
    !!timeTaken && !!actualQuestionTime && timeTaken > actualQuestionTime;

  const correctArray = ['correct_1'];
  const incorrectArray = ['wrong_1', 'wrong_2'];
  const fastCorrectArray = ['fast_correct_1', 'fast_correct_2'];
  const fastWrongArray = ['fast_wrong_1'];
  const slowCorrectArray = ['correct_1'];
  const slowWrongArray = ['slow_wrong_1'];
  const genericArray = ['generic_1'];

  // console.log({ isCorrectAnswer })

  const arrayToChoose = isFast
    ? isCorrectAnswer === QAttemptResultEnum.RESPONSE_CORRECT
      ? fastCorrectArray
      : fastWrongArray
    : isSlow
    ? isCorrectAnswer === QAttemptResultEnum.RESPONSE_CORRECT
      ? slowCorrectArray
      : slowWrongArray
    : isCorrectAnswer === QAttemptResultEnum.RESPONSE_CORRECT
    ? correctArray
    : isCorrectAnswer === QAttemptResultEnum.RESPONSE_INCORRECT
    ? incorrectArray
    : genericArray;

  const randomChoice = Math.floor(Math.random() * arrayToChoose.length);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { md: pxTovW(44), xs: pxToRem(33) },
        }}
      >
        <ImageWrapper
          name={arrayToChoose[randomChoice]}
          type="png"
          parentFolder="memes"
          styles={{
            width: { xs: '90%', md: pxTovW(600) },
            borderRadius: { xs: pxToRem(15), md: pxTovW(20) },
          }}
        />
        <TimerProgressWithText memeEndHandler={memeEndHandler} />
      </Box>
    </Box>
  );
};
