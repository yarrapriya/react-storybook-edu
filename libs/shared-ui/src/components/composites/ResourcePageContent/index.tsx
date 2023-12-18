import { Box } from '@mui/material';
import { Content, ContentVideoContentModel, ExperimentContentModel, ImplementedContentModel, PageContentInfo, PassageContentModel, Question, Question_QuestionEnum, ResourceTeacherInstruction } from '@protos/content_management/content.db_pb';
import React, { useEffect, useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { QuestionContainerWithSolution } from '../Question/QuestionContainerWithSolution';
import { deepClone } from '../Question/question-utils';
import { ContentVideoContent } from './ContentVideoContent';
import { ExperimentContent } from './ExperimentContent';
import { PassageElement } from './PassageElement';
import { ResourceTeacherInstructionElement } from './ResourceTeacherInstructionElement';
import { ContentIdAttempt, getLastAttemptedResponse } from './interfaces';

const styles: IStyles = {
  elementsWrapper: {
    paddingX: {
      xs: pxToRem(15),
      md: pxTovW(427)
    },
    marginTop: {
      xs: pxToRem(20),
      md: pxTovW(15)
    }
  },
};

interface IProps {
  pageNumber: number
  pageContents?: PageContentInfo[]
  contentIdAttempt?: ContentIdAttempt
  handleAnswerSubmit: (contentId: string, answer: string[]) => void
}

const getAttemptedAnswerForContentId = (contents: ImplementedContentModel[], contentIdAttempt?: ContentIdAttempt) => {
  const contentAttempt = contentIdAttempt || {};
  const val: {
    [contentId: string]: string[]
  } = contents.reduce((obj, item) => {
    const contentValue = item.model.value;
    const contentId = contentValue instanceof Content ? contentValue.contentId : contentValue instanceof Question ? contentValue.questionId : contentValue instanceof ResourceTeacherInstruction ? contentValue.resourceId : undefined;
    if (contentId) {
      const responses = contentAttempt[contentId]?.responses
      return {
        ...obj,
        [contentId]: getLastAttemptedResponse(responses)?.answer || []
      }
    }
    return obj
  }, {})
  return val;
}

export const ResourcePageContent = (props: IProps) => {
  const { pageContents, pageNumber, contentIdAttempt, handleAnswerSubmit } = props;
  const pageContent = pageContents ? pageContents[pageNumber] : undefined;
  const contents = pageContent?.contents || [];
  const [answers, setAnswers] = useState<{
    [contentId: string]: string[]
  }>({})

  const questionIds = pageContents?.reduce((acc, item) => acc.concat(item.questionIds), [] as string[]);

  useEffect(() => {
    setAnswers(getAttemptedAnswerForContentId(contents, contentIdAttempt))
  }, [pageNumber])

  const renderContentType = (content: Content) => {
    const con = content.content;
    if (!con) {
      return null
    }
    const contentCase = con.model.case;
    const value = con.model.value;
    switch (contentCase) {
      case 'passage': if (value instanceof PassageContentModel) {
        return <PassageElement passage={value} />
      }
        return null
      case 'contentVideo': if (value instanceof ContentVideoContentModel) {
        return <ContentVideoContent contentVideo={value} />
      }
        return null
      case 'experiment': if (value instanceof ExperimentContentModel) {
        return <ExperimentContent experiment={value} />
      }
        return null;
      case 'flashCard':
      case 'mindMap':
      default: return null
    }
    return null;
  }

  const getQuestionNumber = (questionId: string) => {
    const questionIndex = questionIds?.findIndex(qId => qId === questionId);
    if (questionIndex === undefined) {
      return ''
    }
    return questionIndex + 1;
  }

  const renderPageContent = (content: ImplementedContentModel, contentIndex: number) => {
    const contentType = content.model.case;
    const contentValue = content.model.value;
    const contentId = contentValue instanceof Content ? contentValue.contentId : contentValue instanceof Question ? contentValue.questionId : contentValue instanceof ResourceTeacherInstruction ? contentValue.resourceId : undefined;
    if (contentId == undefined) {
      return null;
    }
    const studentResponse = contentIdAttempt ? contentIdAttempt[contentId] : undefined;
    const lastResponse = getLastAttemptedResponse(studentResponse?.responses);
    const isSubmitted = !!(lastResponse && Object.keys(lastResponse).includes("answer"));
    switch (contentType) {
      case 'question': if (contentValue instanceof Question) {
        return <Box sx={styles.elementsWrapper}>
          <QuestionContainerWithSolution
            showHintIcon
            showAnswerAnimation
            question={contentValue}
            showSubmitButton={true}
            isSubmitted={isSubmitted}
            disableInput={isSubmitted}
            showAnswer={isSubmitted}
            handleNext={() => handleAnswerSubmit && handleAnswerSubmit(contentId, answers[contentId] || [])}
            questionNumber={getQuestionNumber(contentId)}
            handleAnswerChange={(val: string, ind?: number) => {
              let answersCopy = (answers[contentId] || []).slice();
              switch (contentValue.questionType) {
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
                          answersCopy[i] = ""
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
              const answerObjectClone = deepClone(answers);
              answerObjectClone[contentId] = answersCopy
              setAnswers(answerObjectClone);
            }}
            userAttemptedAnswer={answers[contentId] || []}
          />
        </Box>
      }
        return null;
      case 'instruction': if (contentValue instanceof ResourceTeacherInstruction) {
        return <Box sx={styles.elementsWrapper}>
          <ResourceTeacherInstructionElement teacherInstruction={contentValue} />
        </Box>
      }
        return null;
      case 'content': if (contentValue instanceof Content) {
        return <Box sx={styles.elementsWrapper}>
          {renderContentType(contentValue)}
        </Box>
      }
        return null
      default: return null;
    }
  }

  const renderContents = (contents?: ImplementedContentModel[]) => {
    if (!contents) {
      return null
    }
    return contents.map((content, index) => <React.Fragment key={"page_" + pageNumber + "_content_" + index}>
      {renderPageContent(new ImplementedContentModel(content), index)}
    </React.Fragment>)
  }

  return <>
    {renderContents(contents)}
  </>
};


export default ResourcePageContent;
