import { Question_QuestionEnum, TextType } from '@protos/content_management/content.db_pb'

// eslint-disable-next-line @typescript-eslint/ban-types
export const isObjectLiteral = (obj?: unknown): obj is Object => typeof obj == 'object' && obj instanceof Object && !Array.isArray(obj)

export const isQuestionTypeModel = (val: unknown, type: Question_QuestionEnum): boolean => {
  if (!val || !isObjectLiteral(val)) return false
  const objType = (val as { type: unknown }).type
  return typeof type == "string" && type == (objType)
}

export const isTextType = (obj: any): obj is TextType => checkType<TextType>(obj, ["text"])


export const checkType = <T>(obj: any, fieldsToCheck: (keyof T)[]): boolean => {
  if (obj != null) {
    const keys = Object.keys(obj)
    return keys.length == fieldsToCheck.length && fieldsToCheck.every(field => keys.some(key => key == field))
  }
  return false
}


export const stringify1DAnswer = (answer: string[]): string => {
  if (answer.length == 1)
    return answer[0]
  answer = answer.map(v => `'${v}'`)
  return answer.slice(0, answer.length - 1).join(", ") + ` and ` + answer[answer.length - 1]
}

export const stringify2DAnswer = (answer: string[][], firstAnswer = false): string => {
  if (firstAnswer || answer.length == 1) {
    return stringify1DAnswer(answer[0])
  }
  const ansStrArr = answer.map(correctAns => correctAns.length > 1 ? `(${correctAns.join(", ")})` : `'${correctAns[0]}'`)
  return ansStrArr.slice(0, ansStrArr.length - 1).join(", ") + ` or ` + ansStrArr[ansStrArr.length - 1]
}

export const roundTo2Decimal = (num: number) => Math.round((num + 0.00001) * 100) / 100
