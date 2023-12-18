import { createPromiseClient } from '@bufbuild/connect';
import { ContentParserAPIServiceV1 } from '@protos/content_management/cms.content.apis_connect';
import { cmsTransport } from './transports';

export const ContentParserAPIServiceV1Client = createPromiseClient(
  ContentParserAPIServiceV1,
  cmsTransport
);
