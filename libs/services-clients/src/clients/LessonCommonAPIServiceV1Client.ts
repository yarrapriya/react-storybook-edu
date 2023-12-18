import { createPromiseClient } from '@bufbuild/connect';
import { LessonCommonAPIServiceV1 } from '@protos/learning_management/lms.lesson.common.apis_connect';
import { lmsTransport } from './transports';

export const LessonCommonAPIServiceV1Client = createPromiseClient(
  LessonCommonAPIServiceV1,
  lmsTransport
);

//LessonCommonAPIServiceV1
