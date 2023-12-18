import { createPromiseClient } from '@bufbuild/connect';
import { UMSLoginAPIServiceV1 } from '@protos/user_management/ums.login.apis_connect';
import { umsTransport } from './transports';

export const UMSLoginAPIServiceV1Client = createPromiseClient(
  UMSLoginAPIServiceV1,
  umsTransport
);
