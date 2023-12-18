import { CategoryResourceMap, ChapterResources, ChapterTopicInfo, FetchSubjectChapterInfo, ResourceContent as RawResourceContent } from '@protos/content_management/content.common.apis_pb';
import { ResourceContent } from '@protos/content_management/content.db_pb';
import { VisitedResourceContentInfoList } from '@protos/learning_management/lms.db_pb';
import { LessonContent, LessonsByModule } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { StudentPreviousLessonSession } from '@protos/learning_management/lms.lesson.learn.apis_pb';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface ILearnState {
  subject_chapter_info?: FetchSubjectChapterInfo
  selected_chapter_topic_info?: ChapterTopicInfo
  selected_chapter_resources?: ChapterResources
  selected_module_lessons?: LessonsByModule
  selected_topic_resources?: CategoryResourceMap[]
  selected_lesson_content?: LessonContent
  previous_lesson_session_info?: StudentPreviousLessonSession
  selected_resource_content?: {
    rawData: RawResourceContent,
    parsedData: ResourceContent
  },
  selected_resource_session_id?: number,
  active: {
    chapterId?: number,
    topicId?: number,
    lessonId?: string
  }
  lesson_plan_redirection_path?: string;
  resource_redirection_path?: string;
  lesson_session_visited_resource_info?: {
    [lessonSessionId: string]: VisitedResourceContentInfoList[]
  }
  //StudentAnalysis
}

const initialState: ILearnState = {
  subject_chapter_info: undefined,
  selected_chapter_topic_info: undefined,
  selected_chapter_resources: undefined,
  selected_module_lessons: undefined,
  selected_topic_resources: undefined,
  selected_lesson_content: undefined,
  previous_lesson_session_info: undefined,
  selected_resource_content: undefined,
  selected_resource_session_id: undefined,
  active: {
    chapterId: undefined,
    topicId: undefined,
    lessonId: undefined
  },
  lesson_plan_redirection_path: undefined
};

export const learnSlice = createSlice({
  name: 'learn',
  initialState,
  reducers: {
    setSubjectChapterInfo: (state, action) => {
      state.subject_chapter_info = action.payload;
    },
    setSelectedChapterTopicInfo: (state, action) => {
      state.selected_chapter_topic_info = action.payload;
    },
    setSelectedChapterResources: (state, action) => {
      state.selected_chapter_resources = action.payload;
    },
    setSelectedModuleLessons: (state, action) => {
      state.selected_module_lessons = action.payload;
    },
    setSelectedTopicResourceList: (state, action) => {
      state.selected_topic_resources = action.payload;
    },
    setSelectedLessonContent: (state, action) => {
      state.selected_lesson_content = action.payload;
    },
    setLessonPreviousSessionInfo: (state, action) => {
      state.previous_lesson_session_info = action.payload;
    },
    setSelectedResourceContent: (state, action) => {
      state.selected_resource_content = action.payload;
    },
    setSelectedResourceSessionId: (state, action) => {
      state.selected_resource_session_id = action.payload;
    },
    setActiveChapterId: (state, action) => {
      state.active = { ...state.active, chapterId: action.payload }
    },
    setActiveTopicId: (state, action) => {
      state.active = { ...state.active, topicId: action.payload }
    },
    setActiveLessionId: (state, action) => {
      state.active = { ...state.active, lessonId: action.payload }
    },
    setLessonPlanRedirectionPath: (state, action) => {
      state.lesson_plan_redirection_path = action.payload;
    },
    setResourceRedirectionPath: (state, action) => {
      state.resource_redirection_path = action.payload;
    },
    setUpdatedLessonSessionVisitedResourceInfo: (state, action: PayloadAction<{ [lessonSessionId: string]: VisitedResourceContentInfoList[] }>) => {
      state.lesson_session_visited_resource_info = action.payload;
    },
    resetLearnState: (state) => {
      return initialState
    }
  },
});

export const {
  setSubjectChapterInfo,
  setSelectedChapterTopicInfo,
  setSelectedChapterResources,
  setSelectedModuleLessons,
  setSelectedTopicResourceList,
  setSelectedLessonContent,
  setLessonPreviousSessionInfo,
  setSelectedResourceContent,
  setSelectedResourceSessionId,
  setActiveLessionId,
  setActiveTopicId,
  setActiveChapterId,
  resetLearnState,
  setLessonPlanRedirectionPath,
  setUpdatedLessonSessionVisitedResourceInfo,
  setResourceRedirectionPath
} = learnSlice.actions;
export default learnSlice.reducer;
