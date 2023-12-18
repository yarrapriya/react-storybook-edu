import { IClassAndSubjectSelected } from '@geneo2-web/shared-ui';
import {
  ClassSubjectChapter,
  StudentPerformance,
  StudentSubjectPerformanceStats,
  TeacherAnalysis,
  TeacherAnalysisClassSubject,
} from '@protos/analysis_management/analysis.teacher.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'

export interface IAnalyticsState {
  overall_analysis?: TeacherAnalysis;
  selected_class_info?: IClassAndSubjectSelected;
  class_subject_analysis?: TeacherAnalysisClassSubject;
  class_subject_chapter_analysis?: ClassSubjectChapter;
  selected_student_info?: StudentPerformance;
  student_subject_stats?: StudentSubjectPerformanceStats;
  //TeacherAnalysis
}

const initialState: IAnalyticsState = {
  overall_analysis: undefined,
  selected_class_info: undefined,
  class_subject_analysis: undefined,
  class_subject_chapter_analysis: undefined,
  selected_student_info: undefined,
  student_subject_stats: undefined,
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    //setHomeworkListsData
    setOverallAnalysis: (state, action) => {
      state.overall_analysis = action.payload;
    },
    setSelectedClassInfo: (state, action) => {
      state.selected_class_info = action.payload;
    },
    setClassSubjectAnalysis: (state, action) => {
      state.class_subject_analysis = action.payload;
    },
    setClassSubChapAnalysis: (state, action) => {
      state.class_subject_chapter_analysis = action.payload;
    },
    setSelectedStudentInfo: (state, action) => {
      state.selected_student_info = action.payload;
    },
    setStudentSubjectStats: (state, action) => {
      state.student_subject_stats = action.payload;
    },
    resetAnalyticsState: (state) => {
      return initialState;
    },
  },
});

export const {
  setOverallAnalysis,
  setSelectedClassInfo,
  setClassSubjectAnalysis,
  setClassSubChapAnalysis,
  setSelectedStudentInfo,
  setStudentSubjectStats,
  resetAnalyticsState,
} = analyticsSlice.actions;
export default analyticsSlice.reducer;
