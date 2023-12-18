import {
  HomeworkList,
  TeacherHWClassStats,
} from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'
export interface IManageHomeworkState {
  homework_list_data: HomeworkList | undefined;
  current_homework_classStats?: TeacherHWClassStats;
  selected_hw_id?: number;

  // hw_class_stats: TeacherHWClassStats | undefined;
  //TeacherHWList[]
}

const initialState: IManageHomeworkState = {
  homework_list_data: undefined,
};

export const manageHomeworkSlice = createSlice({
  name: 'manageHomework',
  initialState,
  reducers: {
    setHomeworkListsData: (state, action) => {
      state.homework_list_data = action.payload;
    },
    setCurrentHomeworkClassStats: (state, action) => {
      state.current_homework_classStats = action.payload;
    },
    setSelectedHwId: (state, action) => {
      state.selected_hw_id = action.payload;
    },
    resetManageHWState: (state) => {
      return initialState;
    },
  },
});

export const {
  setHomeworkListsData,
  setSelectedHwId,
  resetManageHWState,
  setCurrentHomeworkClassStats,
} = manageHomeworkSlice.actions;
export default manageHomeworkSlice.reducer;
