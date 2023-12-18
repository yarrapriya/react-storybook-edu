import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { Book } from '@protos/learning_management/lms.book.apis_pb';
import { StudentHomeworkTask } from '@protos/learning_management/lms.hw.student.apis_pb';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'
export interface IHomeDashboardState {
  student_profile_id: string;
  student_profile?: unknown;
  school_course_id?: string;
  ongoing_lesson_list?: LessonInfo[];
  active_homework_list?: StudentHomeworkTask[]
  recommended_resources_list?: ResourceInfo[];
  text_book_list?: Book[];
  selected_subject_id?: number
}

const initialState: IHomeDashboardState = {
  student_profile_id: 'abcd',
  active_homework_list: [],
  ongoing_lesson_list: [],
  recommended_resources_list: [],
  text_book_list: [],
  selected_subject_id: undefined
};

export const homeDashboardSlice = createSlice({
  name: 'homeDashboard',
  initialState,
  reducers: {
    setHomeActiveHomeworkList: (state, action) => {
      state.active_homework_list = action.payload;
    },
    setHomeOngoingLessonList: (state, action) => {
      state.ongoing_lesson_list = action.payload;
    },
    setHomeRecommendedResourceList: (state, action) => {
      state.recommended_resources_list = action.payload;
    },
    setHomeTextBookList: (state, action) => {
      state.text_book_list = action.payload;
    },
    setHomeSelectedSubjectId: (state, action) => {
      state.selected_subject_id = action.payload;
    },
    resetHomeState: (state) => {
      return initialState;
    },
  },
});

export const { setHomeActiveHomeworkList, setHomeOngoingLessonList, setHomeRecommendedResourceList, setHomeTextBookList, setHomeSelectedSubjectId, resetHomeState } = homeDashboardSlice.actions;
export default homeDashboardSlice.reducer;
