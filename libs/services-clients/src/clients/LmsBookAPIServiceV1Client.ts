import { createPromiseClient } from '@bufbuild/connect';
import { LmsBookAPIServiceV1 } from '@protos/learning_management/lms.book.apis_connect';
import { lmsTransport } from './transports';

export const LmsBookAPIServiceV1Client = createPromiseClient(
  LmsBookAPIServiceV1,
  lmsTransport
);
