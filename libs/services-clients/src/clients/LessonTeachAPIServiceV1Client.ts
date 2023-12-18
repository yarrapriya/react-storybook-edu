import { createPromiseClient } from '@bufbuild/connect';
import { LessonTeachAPIServiceV1 } from '@protos/learning_management/lms.lesson.teach.apis_connect';
import { lmsTransport } from './transports';

export const LessonTeachAPIServiceV1Client = createPromiseClient(
  LessonTeachAPIServiceV1,
  lmsTransport
);
