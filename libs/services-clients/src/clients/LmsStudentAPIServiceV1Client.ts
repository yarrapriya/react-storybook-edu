import { createPromiseClient } from '@bufbuild/connect';
import { LmsStudentAPIServiceV1 } from '@protos/learning_management/lms.student.apis_connect';
import { lmsTransport } from './transports';

export const LmsStudentAPIServiceV1Client = createPromiseClient(
  LmsStudentAPIServiceV1,
  lmsTransport
);
