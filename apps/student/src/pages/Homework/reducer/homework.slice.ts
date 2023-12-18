import { HomeworkContent } from '@protos/learning_management/lms.hw.common.apis_pb';
import { HWStudentResponse, StudentHWAttemptResult, StudentHomeworkTask } from '@protos/learning_management/lms.hw.student.apis_pb';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import {} from '@protos/common/'
export interface IHomeworkState {
  selected_module_id: string;
  active_homework_list?: StudentHomeworkTask[]
  ended_homework_list?: StudentHomeworkTask[],
  active_homework_Id?: string,
  active_homework_content?: { [homeworkId: string]: HomeworkContent | undefined },
  active_homework_student_response?: { [homeworkId: string]: HWStudentResponse | undefined },
  active_homework_attempt_result?: { [homeworkId: string]: StudentHWAttemptResult | undefined },
  homework_subject_id?: number,
  homework_end_path?: string,
  active_homework_session_id?: number
}

const initialState: IHomeworkState = {
  selected_module_id: 'abcd',
  active_homework_list: [],
  ended_homework_list: [],
  active_homework_content: undefined,
  active_homework_student_response: undefined,
  active_homework_attempt_result: undefined,
  active_homework_Id: undefined,
  homework_subject_id: undefined,
  homework_end_path: undefined
};

export const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    setActiveHomeworkList: (state, action) => {
      state.active_homework_list = action.payload;
    },
    setEndedHomeworkList: (state, action) => {
      state.ended_homework_list = action.payload;
    },
    setActiveHomeworkId: (state, action) => {
      state.active_homework_Id = action.payload
    },
    setActiveHomeworkContent: (state, action: PayloadAction<{ homeworkId: number, homeworkContent?: HomeworkContent }>) => {
      state.active_homework_content = {
        ...state.active_homework_content,
        [action.payload.homeworkId.toString()]: action.payload.homeworkContent
      }
    },
    setActiveHomeworkStudentResponse: (state, action: PayloadAction<{ homeworkId: number, response?: HWStudentResponse }>) => {
      state.active_homework_student_response = {
        ...state.active_homework_student_response,
        [action.payload.homeworkId.toString()]: action.payload.response
      }
    },
    setActiveHomeworSessionId: (state, action) => {
      state.active_homework_session_id = action.payload
    },
    setActiveHomeworkAttemptResult: (state, action: PayloadAction<{ homeworkId: number, result?: StudentHWAttemptResult }>) => {
      state.active_homework_attempt_result = {
        ...state.active_homework_attempt_result,
        [action.payload.homeworkId.toString()]: action.payload.result
      }
    },
    setHomeworkSubjectId: (state, action: PayloadAction<number | undefined>) => {
      state.homework_subject_id = action.payload
    },
    setHomeworkEndPath: (state, action: PayloadAction<string | undefined>) => {
      state.homework_end_path = action.payload
    },
    resetHomeworkState: (state) => {
      return initialState;
    },
  },
});

export const { setActiveHomeworkList, setEndedHomeworkList, setActiveHomeworkId, setActiveHomeworkContent, setActiveHomeworkStudentResponse, setActiveHomeworkAttemptResult, setHomeworkSubjectId, resetHomeworkState, setHomeworkEndPath, setActiveHomeworSessionId } = homeworkSlice.actions;
export default homeworkSlice.reducer;
