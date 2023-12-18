import { Box, Checkbox, Grid, SxProps, Typography } from '@mui/material';
import {
  ImageOption,
  McqMultipleContentModel,
  McqSingleContentModel,
  QuestionContentModel,
  TextOption,
  TfContentModel_AnswerEnum,
} from '@protos/content_management/content.db_pb';
import { getMediaBasePath } from '../../../../commonUtils/images';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ImageWrapper from '../../../elements/ImageWrapper';
import ElementRenderer from '../../ElementRenderer';
import TypographyHtml from '../TypographyHtml';

interface QuestionProps {
  questionContent?: QuestionContentModel;
  disableInput?: boolean;
  userAttemptedAnswer?: string[];
  onDisableButtonClick?: () => void;
  handleAnswerChange?: (value: string, index?: number) => void;
  questionStyles?: IStyles;
}

const tfOption: SxProps = {
  cursor: 'pointer',
  width: '100%',
  flexGrow: 1,
  padding: {
    xs: pxToRem(17),
    md: pxTovW(17),
  },
  borderRadius: '5px',
  textAlign: 'center',
};

const optionStyles: SxProps = {
  cursor: 'pointer',
  border: '1.5px solid #1023F280',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  padding: {
    xs: pxToRem(16),
    md: pxTovW(16),
  },
  width: '100%',
};

const styles: IStyles = {
  optionWrapper: optionStyles,
  selectedOptionWrapper: {
    ...optionStyles,
    backgroundColor: '#D9EDFD',
    border: '1.5px solid #1023F2',
  },
  checkbox: {
    padding: 0,
    '& .MuiSvgIcon-root': {
      fontSize: pxToRem(20),
    },
    marginRight: {
      xs: pxToRem(30),
      md: pxTovW(45),
    },
    color: '#007CDC',
    '&.Mui-checked': {
      color: '#007CDC',
    },
  },
  trueFalseWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginY: {
      xs: pxToRem(10),
      md: pxTovW(10),
    },
  },
  true: {
    ...tfOption,
    marginRight: {
      xs: pxToRem(7.5),
      md: pxTovW(7.5),
    },
    border: '0.8px solid #0af274',
    backgroundColor: '#c1f8da',
  },
  false: {
    ...tfOption,
    marginLeft: {
      xs: pxToRem(7.5),
      md: pxTovW(7.5),
    },
    border: '0.8px solid #FFA8A8',
    backgroundColor: '#FFEEEE',
  },
  selectedTrue: {
    ...tfOption,
    marginRight: {
      xs: pxToRem(7.5),
      md: pxTovW(7.5),
    },
    border: '2px solid #03D563',
    backgroundColor: '#60F9A6',
    '&>span': {
      fontWeight: 'bold',
    },
  },
  selectedFalse: {
    ...tfOption,
    marginLeft: {
      xs: pxToRem(7.5),
      md: pxTovW(7.5),
    },
    border: '2px solid #F88A8A',
    backgroundColor: '#FDCFCF',
    '&>span': {
      fontWeight: 'bold',
    },
  },
};

export default function Question(props: QuestionProps) {
  const {
    questionContent,
    disableInput,
    handleAnswerChange,
    userAttemptedAnswer,
    onDisableButtonClick,
    questionStyles,
  } = props;
  if (!questionContent) {
    return null;
  }
  const questionCase = questionContent.model.case;
  if (!questionCase) {
    return null;
  }
  const questionValue = questionContent.model.value;
  const content = questionValue?.commonQuestionContent;
  const elements = content?.elements || [];

  const renderElements = () => {
    return (
      <ElementRenderer
        elements={elements}
        isFibText={questionCase === 'fibContentModel'}
        handleAnswerChange={handleAnswerChange}
        userAttemptedAnswer={userAttemptedAnswer}
        disableInput={disableInput}
      />
    );
  };

  const renderOptions = () => {
    if (questionCase === 'tfContentModel') {
      const trueSelected =
        userAttemptedAnswer &&
        userAttemptedAnswer[0] ===
        TfContentModel_AnswerEnum.TF_ANSWER_T.toString();
      const falseSelected =
        userAttemptedAnswer &&
        userAttemptedAnswer[0] ===
        TfContentModel_AnswerEnum.TF_ANSWER_F.toString();
      return (
        <Box sx={styles.trueFalseWrapper}>
          <Box
            aria-disabled="true"
            sx={trueSelected ? styles.selectedTrue : styles.true}
            onClick={() => {
              if (disableInput) {
                return;
              }
              if (handleAnswerChange) {
                handleAnswerChange(
                  TfContentModel_AnswerEnum.TF_ANSWER_T.toString()
                );
              }
            }}
          >
            <Typography variant="elementBodyText">TRUE</Typography>
          </Box>
          <Box
            sx={falseSelected ? styles.selectedFalse : styles.false}
            onClick={() => {
              if (disableInput) {
                return;
              }
              if (handleAnswerChange) {
                handleAnswerChange(
                  TfContentModel_AnswerEnum.TF_ANSWER_F.toString()
                );
              }
            }}
          >
            <Typography variant="elementBodyText">FALSE</Typography>
          </Box>
        </Box>
      );
    }
    if (
      ['mcqSingleContentModel', 'mcqMultipleContentModel'].includes(
        questionCase
      )
    ) {
      const hasOptions =
        questionValue instanceof McqMultipleContentModel ||
        questionValue instanceof McqSingleContentModel;
      const options = hasOptions ? questionValue.options : [];
      return (
        <Grid sx={{ marginTop: 0 }} container spacing={2}>
          {options.map((option, index) => {
            const isChecked =
              !!userAttemptedAnswer &&
              userAttemptedAnswer?.includes((index + 1).toString());
            const optionCase = option.optionType.case;
            const optionValue = option.optionType.value;
            const optionStyles =
              questionCase === 'mcqSingleContentModel' && isChecked
                ? styles.selectedOptionWrapper
                : styles.optionWrapper;
            switch (optionCase) {
              case 'imageOption':
                return optionValue instanceof ImageOption ? (
                  <Grid
                    key={index}
                    sx={{ display: 'flex' }}
                    item
                    xs={12}
                    md={6}
                  >
                    <Box
                      sx={optionStyles}
                      onClick={() => {
                        if (disableInput) {
                          return;
                        }
                        if (handleAnswerChange) {
                          handleAnswerChange((index + 1).toString());
                        }
                      }}
                    >
                      {questionCase === 'mcqMultipleContentModel' && (
                        <Checkbox
                          sx={styles.checkbox}
                          checked={isChecked ? true : false}
                        />
                      )}
                      <ImageWrapper
                        path={getMediaBasePath(
                          optionValue.image?.imageUrl,
                          'resourceContentBucket'
                        )}
                        name={optionValue.image?.imageName || 'image'}
                        styles={{
                          width: '80%',
                          marginLeft: '5px',
                        }}
                      />
                    </Box>
                  </Grid>
                ) : null;
              case 'textOption':
                return optionValue instanceof TextOption ? (
                  <Grid
                    key={index}
                    sx={{ display: 'flex' }}
                    item
                    xs={12}
                    md={6}
                  >
                    <Box
                      sx={optionStyles}
                      onClick={() => {
                        if (disableInput) {
                          return;
                        }
                        if (handleAnswerChange) {
                          handleAnswerChange((index + 1).toString());
                        }
                      }}
                    >
                      {questionCase === 'mcqMultipleContentModel' && (
                        <Checkbox
                          sx={styles.checkbox}
                          checked={isChecked ? true : false}
                        />
                      )}
                      <TypographyHtml variant="elementBodyText">
                        {optionValue.optionText}
                      </TypographyHtml>
                    </Box>
                  </Grid>
                ) : null;
            }
          })}
        </Grid>
      );
    }
    return null;
  };

  return (
    <Box>
      {renderElements()}
      {renderOptions()}
    </Box>
  );
}
