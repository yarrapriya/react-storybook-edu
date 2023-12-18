import { createPromiseClient } from '@bufbuild/connect';
import { TeacherAnalysisAPIServiceV1 } from '@protos/analysis_management/analysis.teacher.apis_connect';
import { lmsTransport } from './transports';

export const TeacherAnalysisAPIServiceV1Client = createPromiseClient(
  TeacherAnalysisAPIServiceV1,
  lmsTransport
);

//TeacherAnalysisAPIServiceV1
