import { createPromiseClient } from '@bufbuild/connect';
import { UmsUtilityApiServiceV1 } from '@protos/user_management/ums.common.apis_connect';
import { umsTransport } from './transports';

export const UmsUtilityAPIServiceV1Client = createPromiseClient(
  UmsUtilityApiServiceV1,
  umsTransport
);
