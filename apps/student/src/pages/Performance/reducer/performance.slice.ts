import {
  FetchOverAllAnalysisStats,
  SubjectAnalysisStats,
} from '@protos/analysis_management/analysis.student.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
export interface IPerformanceState {
  overall_stats?: FetchOverAllAnalysisStats;
  subject_stats?: SubjectAnalysisStats;
  performance_subject_id?: number;
}

const initialState: IPerformanceState = {
  overall_stats: undefined,
  subject_stats: undefined,
  performance_subject_id: undefined,
};

export const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    //performanceReducers
    setOverallAnalysis: (state, action) => {
      state.overall_stats = action.payload;
    },
    setSubjectAnalysis: (state, action) => {
      state.subject_stats = action.payload;
    },
    setPerformanceSubjectId: (state, action) => {
      state.performance_subject_id = action.payload;
    },
    resetPerformanceState: (state) => {
      return initialState
    }
  },
});

export const {
  setOverallAnalysis,
  setSubjectAnalysis,
  setPerformanceSubjectId,
  resetPerformanceState
} = performanceSlice.actions;
export default performanceSlice.reducer;
