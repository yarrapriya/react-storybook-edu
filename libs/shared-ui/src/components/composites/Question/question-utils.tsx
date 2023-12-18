import { FibContentModel, McqMultipleContentModel, McqSingleContentModel, OptionsType, Question, Question_QuestionEnum, TfContentModel, TfContentModel_AnswerEnum } from '@protos/content_management/content.db_pb';
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb';
import { Fib } from './QuestionTypes/fib';

const isEqual = (arr1: string[], arr2: string[]) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function convertArrToLowerCase(arr: string[]) {
  return arr.map(val => val.toLowerCase());
}


export function isNumeric(obj: unknown): obj is number {
  return !Array.isArray(obj) && (Number(obj) - parseFloat(Number(obj).toString()) + 1) >= 0
}

export class BlankCounter {
  counter = -1
  next() {
    return ++this.counter
  }
}

export function deepClone<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Return non-object types as is
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T; // Clone arrays recursively
  }

  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    acc[key] = deepClone(value); // Clone object properties recursively
    return acc;
  }, {} as T);
}

const getTextFromOption = (option?: OptionsType) => {
  if (!option) {
    return ''
  }
  switch (option.optionType.case) {
    case 'textOption': return option.optionType.value.optionText;
    default: return ''
  }
}

export function getSolutionText(question?: Question) {
  if (!question) {
    return ''
  }
  const questionType = question.questionType;
  const questionContent = question.question;
  const questionValue = questionContent?.model.value;
  if (!questionValue) {
    return ''
  }
  switch (questionType) {
    case Question_QuestionEnum.QUESTION_TYPE_TF: if (questionValue instanceof TfContentModel) {
      const correct = questionValue.correct;
      switch (correct) {
        case TfContentModel_AnswerEnum.TF_ANSWER_F: return 'False';
        case TfContentModel_AnswerEnum.TF_ANSWER_T: return 'True';
        default: return ''
      }
    }
      return '';
    case Question_QuestionEnum.QUESTION_TYPE_MCQS: if (questionValue instanceof McqSingleContentModel) {
      const options = questionValue.options;
      const correct = questionValue.correct;
      const correctAnswer = correct ? getTextFromOption(options[Number(correct) - 1]) : ''
      return correctAnswer
    } else {
      return '';
    }
    case Question_QuestionEnum.QUESTION_TYPE_MCQM: if (questionValue instanceof McqMultipleContentModel) {
      const options = questionValue.options;
      const correct = questionValue.correct;
      const val = correct.map(corr => corr ? getTextFromOption(options[Number(corr) - 1]) : '').join(', ')
      return val
    } else {
      return '';
    }
    case Question_QuestionEnum.QUESTION_TYPE_FIB: if (questionValue instanceof FibContentModel) {
      const correct = questionValue.correctAnswerInfo;
      const arr: string[][] = [];
      correct.forEach(corr => arr[corr.blankPosition] = corr.correct);

      // Find the maximum length among the inner arrays
      const maxLength = Math.max(...arr.map(subArr => subArr.length));

      // Initialize the result array
      const result: (string)[][] = Array(maxLength).fill(0).map(() => Array(arr.length).fill(''));

      // Fill the result array by switching the indices (transpose)
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < maxLength; j++) {
          result[j][i] = arr[i][j];
        }
      }
      return '[' + result.join('] , [') + ']'
    } else {
      return '';
    }
    default: return ''
  }
}

export function isCorrectAnswer(question?: Question, userAttemptedAnswer?: string[]) {
  if (!question) {
    return QAttemptResultEnum.RESPONSE_UNDEFINED
  }
  if (!userAttemptedAnswer) {
    return QAttemptResultEnum.RESPONSE_UNDEFINED
  }
  const questionType = question.questionType;
  const questionContent = question.question;
  const questionValue = questionContent?.model.value;
  if (!questionValue) {
    return QAttemptResultEnum.RESPONSE_UNDEFINED
  }
  if (!userAttemptedAnswer.length) {
    return QAttemptResultEnum.RESPONSE_UNDEFINED
  }
  switch (questionType) {
    case Question_QuestionEnum.QUESTION_TYPE_TF: if (questionValue instanceof TfContentModel) {
      const correct = questionValue.correct.toString();
      const ans = userAttemptedAnswer[0];
      if (ans == correct) {
        return QAttemptResultEnum.RESPONSE_CORRECT
      }
      return QAttemptResultEnum.RESPONSE_INCORRECT
    }
      return QAttemptResultEnum.RESPONSE_UNDEFINED;
    case Question_QuestionEnum.QUESTION_TYPE_MCQS: if (questionValue instanceof McqSingleContentModel) {
      const correct = questionValue.correct;
      return correct == userAttemptedAnswer[0] ? QAttemptResultEnum.RESPONSE_CORRECT : QAttemptResultEnum.RESPONSE_INCORRECT
    }
      return QAttemptResultEnum.RESPONSE_UNDEFINED;
    case Question_QuestionEnum.QUESTION_TYPE_MCQM: if (questionValue instanceof McqMultipleContentModel) {
      const correct = questionValue.correct
      const completeCorrect = isEqual(questionValue.correct.sort(), userAttemptedAnswer.sort())

      if (completeCorrect) {
        return QAttemptResultEnum.RESPONSE_CORRECT
      } else if (userAttemptedAnswer.some((a) => correct.includes(a))) {
        return QAttemptResultEnum.RESPONSE_PARTIALLY_CORRECT
      } else return QAttemptResultEnum.RESPONSE_INCORRECT
    }
      return QAttemptResultEnum.RESPONSE_UNDEFINED;
    case Question_QuestionEnum.QUESTION_TYPE_FIB: if (questionValue instanceof FibContentModel) {
      const fibQues = new Fib(question)
      return fibQues.isCorrect(userAttemptedAnswer)
    }
      return QAttemptResultEnum.RESPONSE_UNDEFINED;
    default: return QAttemptResultEnum.RESPONSE_UNDEFINED;
  }
}

function areSetsEqual(array1: string[], array2: string[]): boolean {
  const set1 = new Set(array1.map(item => item.toLowerCase()));
  const set2 = new Set(array2.map(item => item.toLowerCase()));

  if (set1.size !== set2.size) {
    return false;
  }
  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

function does2DArrayContainArray(twoDArray: string[][], singleArray: string[]): boolean {
  for (const innerArray of twoDArray) {
    if (areArraysEqual(innerArray, singleArray)) {
      return true;
    }
  }

  return false;
}

function areArraysEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].toLowerCase() !== array2[i].toLowerCase()) {
      return false;
    }
  }

  return true;
}
