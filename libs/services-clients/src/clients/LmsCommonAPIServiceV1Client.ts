import { createPromiseClient } from '@bufbuild/connect';
import { LmsCommonAPIServiceV1 } from '@protos/learning_management/lms.common.apis_connect';
import { lmsTransport } from './transports';

export const LmsCommonAPIServiceV1Client = createPromiseClient(
  LmsCommonAPIServiceV1,
  lmsTransport
);

//LmsCommonAPIServiceV1
