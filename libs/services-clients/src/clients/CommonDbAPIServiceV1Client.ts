import { createPromiseClient } from '@bufbuild/connect';
import { CommonDbAPIServiceV1 } from '@protos/common/common.db.apis_connect';
import { lmsTransport } from './transports';

export const CommonDbAPIServiceV1Client = createPromiseClient(
  CommonDbAPIServiceV1,
  lmsTransport
);

//CommonDbAPIServiceV1
