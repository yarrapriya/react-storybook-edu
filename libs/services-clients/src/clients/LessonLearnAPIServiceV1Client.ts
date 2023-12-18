import { createPromiseClient } from '@bufbuild/connect';
import { LessonLearnAPIServiceV1 } from '@protos/learning_management/lms.lesson.learn.apis_connect';
import { lmsTransport } from './transports';

export const LessonLearnAPIServiceV1Client = createPromiseClient(
  LessonLearnAPIServiceV1,
  lmsTransport
);
