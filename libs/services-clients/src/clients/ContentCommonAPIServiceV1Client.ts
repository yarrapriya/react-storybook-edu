import { createPromiseClient } from '@bufbuild/connect';
import { ContentCommonAPIServiceV1 } from '@protos/content_management/content.common.apis_connect';
import { cmsTransport } from './transports';

export const ContentCommonAPIServiceV1Client = createPromiseClient(
  ContentCommonAPIServiceV1,
  cmsTransport
);

//ContentCommonAPIServiceV1
