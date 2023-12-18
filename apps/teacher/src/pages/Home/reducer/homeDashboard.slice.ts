import { IClassAndSubjectSelected } from '@geneo2-web/shared-ui';
import { createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'
interface InfoToast {
  label: string | React.ReactElement;
  variant: 'success' | 'error' | 'info';
  open: boolean;
}
export interface IHomeDashboardState {
  class_subject_info?: IClassAndSubjectSelected | undefined;
  teacher_profile?: unknown;
  // "TeacherLoginResponseType"
  // -> it will contain a "TeachClassSubjects" array which will have class id list and corresponding subjects lists
  school_course_id?: string;
  //selected subject -> it "should be" subject_id from "TeachSubjects" list
  lesson_list?: unknown;
  // LessonInfo[]
  banners?: unknown;
  //Banner[]
  toastInfo: InfoToast;
}

const initialState: IHomeDashboardState = {
  class_subject_info: undefined,
  toastInfo: { label: '', variant: 'success', open: false },
};

export const homeDashboardSlice = createSlice({
  name: 'homeDashboard',
  initialState,
  reducers: {
    //setSchoolCourseId
    setToastInfo: (state, action) => {
      state.toastInfo = action.payload;
    },
    setClassAndSubjectInfo: (state, action) => {
      state.class_subject_info = action.payload;
    },
    resetHomeDashboardState: (state) => {
      return initialState;
    },
    toggleToastOpen: (state, action) => {
      state.toastInfo.open = action.payload;
    },
  },
});

export const {
  setToastInfo,
  setClassAndSubjectInfo,
  resetHomeDashboardState,
  toggleToastOpen,
} = homeDashboardSlice.actions;
export default homeDashboardSlice.reducer;
