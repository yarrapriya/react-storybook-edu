import { Question, QuestionContentModel, Question_QuestionEnum } from '@protos/content_management/content.db_pb'
import { QAttemptResultEnum } from '@protos/learning_management/lms.db_pb'
import { isQuestionTypeModel, isTextType, roundTo2Decimal, stringify2DAnswer } from './utils'


export const BlankTextRegExp = /_{3,}/g

export interface FibContentModel extends QuestionContentModel {
  correct: string[][]
}

interface FibBestMatchingAnswer {
  closestAnswerGroup: string[]
  //response index which were correct as per the closestAnswerGroup
  correctResponseIndices: number[]
}

export type FibModel = Question
export const isFibModel = (val?: Question): val is FibModel => isQuestionTypeModel(val, Question_QuestionEnum.QUESTION_TYPE_FIB)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Fib extends FibModel { }
export class Fib extends Question {
  numBlanks(): number {
    const commonQuestContent = this.question?.model.value?.commonQuestionContent;
    return commonQuestContent?.elements.map(c => {
      const value = c?.model?.value;
      if (isTextType(value)) {
        const match = value.text.match(BlankTextRegExp) //Matching with global scope because that's how it finds out all the blanks
        if (match) return match.length
      }
      return 0
    }).reduce((x, y) => x + y, 0) || 0
  }

  private static cleanString(val: string): string {
    const specialChars = ["-", "/", ":", "+", "=", " "]
    if (!val) return val
    val = val.trim()
    specialChars.forEach(char => {
      const index = val.indexOf(char)
      if (index != -1) {
        const parts = val.split(char)
        val = parts.map(part => part.trim()).filter(part => part).join(char)
      }
    })
    return val
  }

  //Response may be optional because the person may go next without entering the value
  private static isResponseCorrect({ correct, response }: { correct: string, response?: string }): boolean {
    if (response) {
      correct = Fib.cleanString(correct)
      response = Fib.cleanString(response)
      return correct.toLocaleLowerCase() == response.toLocaleLowerCase()
    }
    return false
  }

  canComputeMarks(): boolean { return true }

  canComputeCorrect(): boolean { return true }

  //Responses as string array
  //It has to match at least one of the set answers
  computeMarks(response: string[]): number {
    const { correctResponseIndices } = this.getBestMatch(response)
    if (correctResponseIndices.length == 0) { return 0 }
    const marksDist = this.distributeMarks();
    const marks = correctResponseIndices.map(i => marksDist[i]).reduce((acc, v) => acc + v, 0)
    return roundTo2Decimal(marks)
  }

  isCorrect(response: string[]): QAttemptResultEnum {
    const { closestAnswerGroup, correctResponseIndices } = this.getBestMatch(response)
    if (correctResponseIndices.length === closestAnswerGroup.length) {
      return QAttemptResultEnum.RESPONSE_CORRECT
    } else if (correctResponseIndices.length > 0) {
      return QAttemptResultEnum.RESPONSE_PARTIALLY_CORRECT
    }
    return QAttemptResultEnum.RESPONSE_INCORRECT
  }

  correctAnsStr(firstAnswer = false): string {
    if (this.question?.model.case == 'fibContentModel') {
      const correctAnswerInfo = this.question.model.value.correctAnswerInfo
      const fibAnsweArr = correctAnswerInfo.map(a => a.correct)

      return stringify2DAnswer(fibAnsweArr, firstAnswer)
    }
    return ''
  }

  stringifyAnswer(): string {
    if (this.question?.model.case == 'fibContentModel') {
      const correctAnswerInfo = this.question.model.value.correctAnswerInfo
      const fibAnsweArr = correctAnswerInfo.map(a => a.correct)
      return stringify2DAnswer(fibAnsweArr, false)
    }
    return ''
  }

  maxMarks(): number {
    return this.question?.model.value?.commonQuestionContent?.marks.reduce((x, y) => x + y, 0) || 0
  }

  //Function which compares the response with all the provided answers and then returns the one with the max marks
  private getBestMatch(response: string[]): FibBestMatchingAnswer {
    if (this.question?.model.case == 'fibContentModel') {

      const correct = this.question.model.value.correctAnswerInfo;
      const arr: string[][] = [];
      correct.forEach(corr => arr[corr.blankPosition] = corr.correct);

      // Find the maximum length among the inner arrays
      const maxLength = Math.max(...arr.map(subArr => subArr.length));

      // Initialize the correctAnswerInfo array
      const correctAnswerInfo: (string)[][] = Array(maxLength).fill(0).map(() => Array(arr.length).fill(''));

      // Fill the correctAnswerInfo array by switching the indices (transpose)
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < maxLength; j++) {
          correctAnswerInfo[j][i] = arr[i][j];
        }
      }

      const firstAnswer = correctAnswerInfo[0]

      const result: FibBestMatchingAnswer = {
        closestAnswerGroup: firstAnswer,
        correctResponseIndices: []
      }

      correctAnswerInfo.forEach(answerGroup => {
        const correctResponseIndices = answerGroup
          .map((ans, i) => Fib.isResponseCorrect({ correct: ans, response: response[i] }) ? i : -1)
          .filter(v => v !== -1)

        if (correctResponseIndices.length > result.correctResponseIndices.length) {
          result.closestAnswerGroup = answerGroup
          result.correctResponseIndices = correctResponseIndices
        }
      })

      return result
    }
    return {
      closestAnswerGroup: [],
      correctResponseIndices: []
    }
  }

  private distributeMarks(): number[] {
    const numBlanks = this.numBlanks()
    let marksDist: number[] = []
    if (numBlanks == this.question?.model.value?.commonQuestionContent?.marks.length) {
      marksDist = this.question.model.value.commonQuestionContent.marks
    } else if (this.question?.model.value?.commonQuestionContent?.marks.length == 1) {
      //Equal distribution of marks
      marksDist = Array(numBlanks).fill(this.question?.model.value?.commonQuestionContent?.marks[0] / numBlanks)
    } else {
      throw new Error("Marks can be specified for each option/blank or as total marks to be equally distributed for the options/blanks")
    }
    return marksDist
  }
}
