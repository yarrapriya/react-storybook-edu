export enum IQuestionStatus {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Attempted = 'attempted',
  NotAttempted = 'not_attempted',
}

export interface IQuestionStatusObject {
  index: number;
  statusInfo: IQuestionStatus;
}

export const SUPPORT_PHONE = '+918047485424';
export const SUPPORT_EMAIL = 'geneo_support@schoolnetindia.com';
