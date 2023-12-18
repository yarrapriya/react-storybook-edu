import { createPromiseClient } from '@bufbuild/connect';
import { LmsHomeworkCommonAPIServiceV1 } from '@protos/learning_management/lms.hw.common.apis_connect';
import { lmsTransport } from './transports';

export const LmsHomeworkCommonAPIServiceV1Client = createPromiseClient(
  LmsHomeworkCommonAPIServiceV1,
  lmsTransport
);
//LmsHomeworkCommonAPIServiceV1
