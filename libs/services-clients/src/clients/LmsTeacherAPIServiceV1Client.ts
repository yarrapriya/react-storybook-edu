import { createPromiseClient } from '@bufbuild/connect';
import { LmsTeacherAPIServiceV1 } from '@protos/learning_management/lms.teacher.apis_connect';
import { lmsTransport } from './transports';

export const LmsTeacherAPIServiceV1Client = createPromiseClient(
  LmsTeacherAPIServiceV1,
  lmsTransport
);
