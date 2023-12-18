import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  ChapterResources,
  ChapterTopicInfo,
  ChapterTopicMiniInfo,
  FetchSubjectChapterInfo,
  ResourceContent as RawResourceContent,
  TopicResourceInfo,
} from '@protos/content_management/content.common.apis_pb';
import { ResourceContent } from '@protos/content_management/content.db_pb';
import { VisitedResourceContentInfoList } from '@protos/learning_management/lms.db_pb';
import {
  LessonContent,
  LessonInfo,
  LessonsByModule,
} from '@protos/learning_management/lms.lesson.common.apis_pb';

export interface ITeachState {
  subject_chapter_info?: FetchSubjectChapterInfo;
  subject_topic_info?: ChapterTopicInfo;
  chapter_resources?: ChapterResources;
  selected_topic_info?: ChapterTopicMiniInfo;
  topic_resources?: TopicResourceInfo;
  lessons_by_module?: LessonsByModule;
  lessons_content?: LessonContent;
  selected_lessons_info?: LessonInfo;
  selected_resource_content?: {
    rawData: RawResourceContent;
    parsedData: ResourceContent;
  };
  selected_resource_session_id?: number;
  lesson_plan_redirection_path?: string;
  lesson_session_visited_resource_info?: {
    [lessonSessionId: string]: VisitedResourceContentInfoList[];
  };
  resource_redirection_path?: string;
}

const initialState: ITeachState = {
  subject_chapter_info: undefined,
  subject_topic_info: undefined,
  chapter_resources: undefined,
  selected_topic_info: undefined,
  topic_resources: undefined,
  lessons_by_module: undefined,
  lessons_content: undefined,
  selected_lessons_info: undefined,
  selected_resource_content: undefined,
  selected_resource_session_id: undefined,
  lesson_plan_redirection_path: undefined,
  resource_redirection_path: undefined,
};

export const teachSlice = createSlice({
  name: 'teach',
  initialState,
  reducers: {
    setChapterSubjectInfo: (state, action) => {
      // console.log('payload', action.payload);
      state.subject_chapter_info = action.payload;
    },

    setChapterTopicInfo: (state, action) => {
      // console.log('payload', action.payload);
      state.subject_topic_info = action.payload;
    },

    setChapterResources: (state, action) => {
      // console.log('payload', action.payload);
      state.chapter_resources = action.payload;
    },

    setSelectedTopic: (state, action) => {
      // console.log('payload', action.payload);
      state.selected_topic_info = action.payload;
    },

    setTopicResources: (state, action) => {
      // console.log('payload', action.payload);
      state.topic_resources = action.payload;
    },

    setLessonsByModule: (state, action) => {
      // console.log('payload', action.payload);
      state.lessons_by_module = action.payload;
    },

    setLessonContent: (state, action) => {
      // console.log('payload', action.payload);
      state.lessons_content = action.payload;
    },

    setSelectedLessonInfo: (state, action) => {
      // console.log('payload', action.payload);
      state.selected_lessons_info = action.payload;
    },

    setSelectedResourceContent: (state, action) => {
      // console.log('payload', action.payload);
      state.selected_resource_content = action.payload;
    },

    setSelectedResourceSessionId: (state, action) => {
      // console.log('payload', action.payload);
      state.selected_resource_session_id = action.payload;
    },
    setLessonPlanRedirectionPath: (state, action) => {
      // console.log('payload', action.payload);
      state.lesson_plan_redirection_path = action.payload;
    },
    setUpdatedLessonSessionVisitedResourceInfo: (
      state,
      action: PayloadAction<{
        [lessonSessionId: string]: VisitedResourceContentInfoList[];
      }>
    ) => {
      state.lesson_session_visited_resource_info = action.payload;
    },
    setResourceRedirectionPath: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.resource_redirection_path = action.payload;
    },
    resetTeachState: (state) => {
      return initialState;
    },
  },
});

export const {
  setChapterSubjectInfo,
  setChapterTopicInfo,
  setChapterResources,
  setSelectedTopic,
  setTopicResources,
  setLessonsByModule,
  setLessonContent,
  setSelectedLessonInfo,
  resetTeachState,
  setSelectedResourceContent,
  setSelectedResourceSessionId,
  setLessonPlanRedirectionPath,
  setUpdatedLessonSessionVisitedResourceInfo,
  setResourceRedirectionPath,
} = teachSlice.actions;
export default teachSlice.reducer;
