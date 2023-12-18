import { createPromiseClient } from '@bufbuild/connect';
import { LmsHomewokStudentAPIServiceV1 } from '@protos/learning_management/lms.hw.student.apis_connect';
import { lmsTransport } from './transports';

export const LmsHomewokStudentAPIServiceV1Client = createPromiseClient(
  LmsHomewokStudentAPIServiceV1,
  lmsTransport
);

//LmsHomewokStudentAPIServiceV1
