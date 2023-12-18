import { createPromiseClient } from '@bufbuild/connect';
import { StudentAnalysisAPIServiceV1 } from '@protos/analysis_management/analysis.student.apis_connect';
import { lmsTransport } from './transports';

export const StudentAnalysisAPIServiceV1Client = createPromiseClient(
  StudentAnalysisAPIServiceV1,
  lmsTransport
);
//StudentAnalysisAPIServiceV1
