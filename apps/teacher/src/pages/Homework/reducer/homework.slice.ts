import {
  ChapterResources,
  ChapterTopicInfo,
  FetchSubjectChapterInfo,
} from '@protos/content_management/content.common.apis_pb';
import { TaskCreationStatusEnum } from '@protos/learning_management/lms.db_pb';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import {
  ModuleFilteredQuestions,
  QuestionStatsList,
  TaskInfoModel,
} from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { createSlice } from '@reduxjs/toolkit';
import { calculateQuestionsCount } from '../ReviewHomework/functions';
export interface IRequiredQuestionCountInfoForDifficultyLevel {
  noOfLowQuestions: number;
  noOfMediumQuestions: number;
  noOfHighQuestions: number;
}
interface ICreatedHW {
  taskName: string;
  endTimeIsoString: string;
}
export interface IHomeworkState {
  // selected_module_id: string;
  questions_count: IRequiredQuestionCountInfoForDifficultyLevel;
  module_filtered_questions: ModuleFilteredQuestions | undefined;
  selected_tasks_info?: TaskInfoModel[] | undefined;
  filtered_questions: ModuleFilteredQuestions | undefined;
  subjectwise_chapters_info?: FetchSubjectChapterInfo;
  chapterwise_topic?: ChapterTopicInfo;
  chapter_resources?: ChapterResources;
  submitted_hw_id?: number;
  created_hw_details?: HomeworkTask;
  createdHomeworkStatus?: TaskCreationStatusEnum;
  fetched_hw_details?: HomeworkTask;
  questions_stats?: QuestionStatsList;
}

const initialState: IHomeworkState = {
  // selected_module_id: 'abcd',
  subjectwise_chapters_info: undefined,
  chapterwise_topic: undefined,
  chapter_resources: undefined,
  filtered_questions: undefined,
  questions_count: {
    noOfLowQuestions: 0,
    noOfMediumQuestions: 0,
    noOfHighQuestions: 0,
  },
  module_filtered_questions: undefined,
};

export const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    setLowQuestionsCount: (state, action) => {
      if (state.questions_count) {
        const type = action.payload.type;
        if (type === 'inc') {
          state.questions_count.noOfLowQuestions += 1;
        } else if (
          type === 'dec' &&
          state.questions_count.noOfLowQuestions > 0
        ) {
          state.questions_count.noOfLowQuestions -= 1;
        }
      }
    },
    setMediumQuestionsCount: (state, action) => {
      if (state.questions_count) {
        const type = action.payload.type;
        if (type === 'inc') {
          state.questions_count.noOfMediumQuestions += 1;
        } else if (
          type === 'dec' &&
          state.questions_count.noOfMediumQuestions > 0
        ) {
          state.questions_count.noOfMediumQuestions -= 1;
        }
      }
    },
    setHighQuestionsCount: (state, action) => {
      if (state.questions_count) {
        const type = action.payload.type;
        if (type === 'inc') {
          state.questions_count.noOfHighQuestions += 1;
        } else if (
          type === 'dec' &&
          state.questions_count.noOfHighQuestions > 0
        ) {
          state.questions_count.noOfHighQuestions -= 1;
        }
      }
    },
    setQuestionsCount: (state) => {
      const question_list = JSON.parse(
        JSON.stringify(state.module_filtered_questions)
      );
      const newCount = calculateQuestionsCount(question_list);
      state.questions_count = newCount;
    },
    setModuleFilteredQuestions: (state, action) => {
      state.module_filtered_questions = action.payload;
    },
    deleteModuleFilteredQuestionsById: (state, action) => {
      const questionIdToDelete = action.payload;
      if (state.module_filtered_questions?.questions) {
        state.module_filtered_questions.questions =
          state.module_filtered_questions.questions.filter(
            (q) => q.questionId !== questionIdToDelete
          );
      }
    },
    addModuleFilteredQuestion: (state, action) => {
      if (state.module_filtered_questions) {
        state.module_filtered_questions.questions.push(action.payload);
      }
    },
    setSubjectWiseChaptersInfo: (state, action) => {
      // console.log('payload', action.payload);
      state.subjectwise_chapters_info = action.payload;
    },

    setChapterWiseTopicInfo: (state, action) => {
      state.chapterwise_topic = action.payload;
    },

    setChapterResources: (state, action) => {
      state.chapter_resources = action.payload;
    },
    setFilteredQuestions: (state, action) => {
      state.filtered_questions = action.payload;
    },
    setSelectedTasksInfo: (state, action) => {
      state.selected_tasks_info = action.payload;
    },
    setSubmittedHWId: (state, action) => {
      state.submitted_hw_id = action.payload;
    },
    setCreatedHWDetails: (state, action) => {
      state.created_hw_details = action.payload;
    },
    setCreatedHomeworkStatus: (state, action) => {
      state.createdHomeworkStatus = action.payload;
    },
    resetCreatedHomeworkStatus: (state) => {
      state.createdHomeworkStatus = initialState.createdHomeworkStatus;
    },
    setFetchedHwDetails: (state, action) => {
      state.fetched_hw_details = action.payload;
    },
    setQuestionStats: (state, action) => {
      state.questions_stats = action.payload;
    },
    resetFetchedHwDetails: (state) => {
      state.fetched_hw_details = initialState.fetched_hw_details;
    },
    resetSelectedTasksInfo: (state) => {
      state.questions_count = initialState.questions_count;
    },
    resetHomeworkState: (state) => {
      return initialState;
    },
  },
});

export const {
  setLowQuestionsCount,
  setMediumQuestionsCount,
  setHighQuestionsCount,
  setModuleFilteredQuestions,
  setSubjectWiseChaptersInfo,
  setChapterWiseTopicInfo,
  setChapterResources,
  setFilteredQuestions,
  setSelectedTasksInfo,
  setSubmittedHWId,
  setCreatedHWDetails,
  deleteModuleFilteredQuestionsById,
  addModuleFilteredQuestion,
  resetHomeworkState,
  resetSelectedTasksInfo,
  setCreatedHomeworkStatus,
  setFetchedHwDetails,
  setQuestionStats,
  resetCreatedHomeworkStatus,
  resetFetchedHwDetails,
  setQuestionsCount,
} = homeworkSlice.actions;
export default homeworkSlice.reducer;
