import { Box, Typography } from '@mui/material';
import {
  Question,
  QuestionContentModel,
} from '@protos/content_management/content.db_pb';
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb';
import { useEffect, useState } from 'react';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import { getDifficultyLevelString } from '../../../../commonUtils/utilFunctions';
import { IconWrapper } from '../../../elements/IconWrapper/Index';
import ImageWrapper from '../../../elements/ImageWrapper';
import ElementRenderer from '../../ElementRenderer';
import { FlagHintBox } from '../FlagHintBox';
import { HintPopup } from '../FlagHintBox/HintPopup';
import { QuestionAnswerAccordion } from '../QuestionAnswerAccordion';
import QuestionContainer, {
  QuestionContainerProps,
} from '../QuestionContainer';
import { GeneoLottie } from '../QuestionContainer/lottie/GeneoLottie';
import { correctTick } from '../QuestionContainer/lottie/correctTick';
import { wrongTick } from '../QuestionContainer/lottie/wrongTick';
import TypographyHtml from '../TypographyHtml';
import { getSolutionText, isCorrectAnswer } from '../question-utils';
import {
  changeBgColor,
  changeBgColorReverse,
  easeIn,
  hidebox,
  moveForward,
  showBox,
} from './animationKeyframes';

interface QuestionContainerWithSolutionProps
  extends Omit<QuestionContainerProps, 'questionContent'> {
  question?: Question;
  accordionPosition?: 'inside' | 'outside';
  showHintIcon?: boolean;
  showAnswerAnimation?: boolean;
  showQuestionStats?: boolean;
}

const quesWrapper = {
  width: 'auto',
  border: `1px solid #CED2FC`,
  borderRadius: {
    xs: pxToRem(15),
    md: pxTovW(15),
  },
  backgroundColor: 'common.white',
};

const quesBox = {
  padding: {
    xs: `${pxToRem(20)} ${pxToRem(10)}`,
    md: `${pxTovW(20)} ${pxTovW(50)}`,
  },
  minHeight: '200px',
};

const answerStatus = {
  backgroundColor: '#E3FEEF',
  borderTopLeftRadius: {
    xs: pxToRem(15),
    md: pxTovW(15),
  },
  borderTopRightRadius: {
    xs: pxToRem(15),
    md: pxTovW(15),
  },
  paddingX: {
    xs: pxToRem(10),
    md: pxTovW(50),
  },
  paddingY: {
    xs: pxToRem(10),
    md: pxTovW(8),
  },
  display: 'flex',
  alignItems: 'center',
};

const styles: IStyles = {
  questionWrapper: quesWrapper,
  questionWrapperAnimate: {
    ...quesWrapper,
    animation: `${changeBgColor} 1s linear`,
    animationFillMode: 'forwards',
    position: 'relative',
  },
  questionWrapperAnimateOut: {
    ...quesWrapper,
    animation: `${changeBgColorReverse} 1s linear`,
    animationFillMode: 'forwards',
    position: 'relative',
  },
  outerAccordionBox: {
    width: 'auto',
    border: `1px solid #CED2FC`,
    borderRadius: {
      xs: pxToRem(15),
      md: pxTovW(15),
    },
    marginTop: {
      xs: pxToRem(10),
      md: pxTovW(10),
    },
    overflow: 'hidden',
  },
  questionBox: quesBox,
  hiddenQuestionBox: {
    ...quesBox,
    animation: `${hidebox} 1s linear`,
    pointerEvents: 'none',
    animationFillMode: 'forwards',
  },
  showQuestionBox: {
    ...quesBox,
    animation: `${showBox} 1s linear`,
    pointerEvents: 'none',
    animationFillMode: 'forwards',
  },
  lottiePosition: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '160px',
    textAlign: 'center',
  },
  lottiePositionEaseOut: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animationName: `${moveForward}`,
    animationDuration: '1s',
    animationFillMode: 'forwards',
    height: '160px',
    textAlign: 'center',
  },
  accordionEaseIn: {
    animationName: `${easeIn}`,
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
  textAppear: {
    animation: `${showBox} 4s linear`,
    animationFillMode: 'forwards',
    paddingBottom: '10px',
    fontWeight: 'bold',
  },
  answerStatusWrapper: {
    ...answerStatus,
  },
  answerStatusEaseIn: {
    ...answerStatus,
    animationName: `${easeIn}`,
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
  correctIcon: {
    height: {
      xs: pxToRem(25),
      md: pxTovW(40),
    },
    width: {
      xs: pxToRem(25),
      md: pxTovW(40),
    },
  },
  questionStatsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: { xs: pxToRem(20), md: pxTovW(30) },
  },
  questionStats: {
    display: 'flex',
    alignItems: 'center',
  },
};

export const QuestionContainerWithSolution = (
  props: QuestionContainerWithSolutionProps
) => {
  const {
    question,
    accordionPosition,
    showHintIcon,
    showAnswerAnimation,
    showQuestionStats,
    ...questionContainerProps
  } = props;
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<
    'starting' | 'ending' | undefined
  >(undefined);

  const userAttemptedAnswer = questionContainerProps.userAttemptedAnswer;

  const isCorrect = isCorrectAnswer(question, userAttemptedAnswer);
  const tickImageName =
    isCorrect === QAttemptResultEnum.RESPONSE_CORRECT ? 'correct' : 'wrong';
  const correctAnswerText =
    isCorrect === QAttemptResultEnum.RESPONSE_CORRECT
      ? 'Correct'
      : isCorrect === QAttemptResultEnum.RESPONSE_INCORRECT
      ? 'Wrong'
      : isCorrect === QAttemptResultEnum.RESPONSE_PARTIALLY_CORRECT
      ? 'Partially Correct'
      : 'Not Attempted';

  useEffect(() => {
    return () => {
      setShowAnimation(undefined);
    };
  }, []);

  if (!question) {
    return null;
  }

  const solution =
    new QuestionContentModel(question.question).model.value
      ?.commonQuestionContent?.solution || [];
  const hint =
    question.question?.model.value?.commonQuestionContent?.hint || [];

  const getAccordionHeading = () => {
    return (
      <Typography variant="bodyText">
        {accordionPosition === 'outside' ? 'Answer' : 'Correct Answer'}
      </Typography>
    );
  };

  const getAccordionBody = () => {
    return (
      <>
        <TypographyHtml variant="bodyText">
          {getSolutionText(new Question(props.question))}
        </TypographyHtml>
        {solution.length > 0 && (
          <Box sx={{ marginTop: '20px' }}>
            {<ElementRenderer elements={solution} />}
          </Box>
        )}
      </>
    );
  };

  const renderAccordion = () => {
    if (showAnimation === 'starting') {
      return null;
    }
    if (showAnimation === 'ending') {
      return (
        <Box sx={styles.accordionEaseIn}>
          <QuestionAnswerAccordion
            key={'accordion_' + props.questionNumber}
            accordionHeading={getAccordionHeading()}
            accordionBody={getAccordionBody()}
          />
        </Box>
      );
    }
    return (
      <QuestionAnswerAccordion
        key={'accordion_' + props.questionNumber}
        accordionHeading={getAccordionHeading()}
        accordionBody={getAccordionBody()}
      />
    );
  };

  const renderAnswerStatus = () => {
    if (showAnimation === 'starting') {
      return null;
    }
    return (
      <Box
        sx={
          showAnimation === 'ending'
            ? styles.answerStatusEaseIn
            : styles.answerStatusWrapper
        }
      >
        <ImageWrapper
          name={tickImageName}
          type="png"
          parentFolder="icons"
          styles={styles.correctIcon}
        />
        <Typography
          variant="bodyText"
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          {correctAnswerText}
        </Typography>
      </Box>
    );
  };

  const renderQuestionStats = () => {
    return (
      <Box sx={styles.questionStatsWrapper}>
        <Box sx={styles.questionStats}>
          <IconWrapper
            name="clock"
            size="small"
            type="png"
            parentFolder="icons"
          />
          <Typography variant="h5" sx={{ marginLeft: '5px' }}>
            {Number(
              (
                (new Question(question).question?.model.value
                  ?.commonQuestionContent?.time || 0) / 60
              ).toFixed(2)
            )}{' '}
            Mins
          </Typography>
        </Box>
        <Box sx={styles.questionStats}>
          <IconWrapper
            name="level"
            size="small"
            type="png"
            parentFolder="icons"
          />
          <Typography variant="h5" sx={{ marginLeft: '5px' }}>
            {getDifficultyLevelString(
              new Question(question).questionMeta?.difficultyLevel
            )}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={
          showAnimation === 'starting'
            ? styles.questionWrapperAnimate
            : showAnimation === 'ending'
            ? styles.questionWrapperAnimateOut
            : styles.questionWrapper
        }
      >
        {questionContainerProps.showAnswer &&
          questionContainerProps.isSubmitted &&
          renderAnswerStatus()}
        {!!showAnimation && ['starting', 'ending'].includes(showAnimation) && (
          <Box
            sx={
              showAnimation === 'ending'
                ? styles.lottiePositionEaseOut
                : styles.lottiePosition
            }
          >
            <GeneoLottie
              animationData={
                tickImageName === 'correct' ? correctTick : wrongTick
              }
              loop={false}
              animationDelay={500}
              onLoopComplete={() => {
                // console.log('completed loop');
                setShowAnimation('ending');
                setTimeout(() => {
                  setShowAnimation(undefined);
                }, 600);
              }}
              style={{
                height: '100px',
              }}
            />
            <Typography variant="h2" sx={styles.textAppear}>
              {correctAnswerText}
            </Typography>
          </Box>
        )}
        <Box
          sx={
            showAnimation === 'starting'
              ? styles.hiddenQuestionBox
              : showAnimation === 'ending'
              ? styles.showQuestionBox
              : styles.questionBox
          }
        >
          <Box>
            <QuestionContainer
              questionContent={new Question(question).question}
              {...questionContainerProps}
              handleNext={async () => {
                if (questionContainerProps.handleNext) {
                  await questionContainerProps.handleNext();
                  if (showAnswerAnimation) {
                    setShowAnimation('starting');
                  }
                }
              }}
            />
          </Box>
          {showQuestionStats && renderQuestionStats()}
        </Box>
        {questionContainerProps.showAnswer &&
          accordionPosition !== 'outside' &&
          renderAccordion()}
      </Box>
      {showHintIcon && hint.length > 0 && (
        <Box>
          <FlagHintBox
            hintClickHandler={() => {
              setShowHint(true);
            }}
          />
        </Box>
      )}
      {questionContainerProps.showAnswer && accordionPosition === 'outside' && (
        <Box sx={styles.outerAccordionBox}>{renderAccordion()}</Box>
      )}
      <HintPopup
        text={hint.join(' ')}
        modalState={showHint}
        setModalState={setShowHint}
      />
    </>
  );
};
