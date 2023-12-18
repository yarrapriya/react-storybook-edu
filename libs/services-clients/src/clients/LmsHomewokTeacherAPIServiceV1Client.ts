import { createPromiseClient } from '@bufbuild/connect';
import { LmsHomewokTeacherAPIServiceV1 } from '@protos/learning_management/lms.hw.teacher.apis_connect';
import { lmsTransport } from './transports';

export const LmsHomewokTeacherAPIServiceV1Client = createPromiseClient(
  LmsHomewokTeacherAPIServiceV1,
  lmsTransport
);

//LmsHomewokTeacherAPIServiceV1
