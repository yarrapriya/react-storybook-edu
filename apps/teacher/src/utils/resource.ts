import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import {
  NavigateFunction,
  URLSearchParamsInit,
  createSearchParams,
} from 'react-router-dom';
import { RESOURCE_PAGE } from '../routeHandling/RoutesNomenclature';

interface ResourceParams {
  resourceId: string;
  lessonId?: string;
  lessonSessionId?: number;
  subjectId?: number;
  chapterId?: number;
  topicId?: number;
  resourceIndex?: number;
  classId?: number;
  section?: string;
}

export type ResourceViewMode = "add" | "replace" | "view" | undefined

export const onResourceClick = (
  navigate: NavigateFunction,
  resourceParams: ResourceParams,
  sessionMode: SessionModeEnum,
  viewMode?: ResourceViewMode
) => {
  const {
    resourceId,
    lessonId,
    lessonSessionId,
    subjectId,
    chapterId,
    topicId,
    resourceIndex,
    classId,
    section
  } = resourceParams;
  const params: URLSearchParamsInit = {};
  if (resourceId) {
    params.resourceId = resourceId;
  }
  if (lessonId) {
    params.lessonId = lessonId;
  }
  if (typeof lessonSessionId == 'number') {
    params.lessonSessionId = lessonSessionId.toString();
  }
  if (typeof subjectId == 'number') {
    params.subjectId = subjectId.toString();
  }
  if (typeof chapterId == 'number') {
    params.chapterId = chapterId.toString();
  }
  if (typeof topicId == 'number') {
    params.topicId = topicId.toString();
  }
  if (typeof classId == 'number') {
    params.classId = classId.toString();
  }
  if (viewMode) {
    params.viewMode = viewMode
  }
  if (sessionMode) {
    params.sessionMode = sessionMode.toString();
  }
  if (section) {
    params.section = section;
  }
  if (typeof resourceIndex == 'number') {
    params.resourceIndex = resourceIndex.toString();
  }
  navigate({
    pathname: RESOURCE_PAGE,
    search: resourceId ? `?${createSearchParams(params)}` : undefined,
  });
};
