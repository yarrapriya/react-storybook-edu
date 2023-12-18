import { SessionModeEnum } from '@protos/learning_management/lms.db_pb'
import { NavigateFunction, URLSearchParamsInit, createSearchParams } from 'react-router-dom'
import { setLessonPlanRedirectionPath } from '../pages/Learn/reducer/learn.slice'
import { AppDispatch } from '../reduxStore/store'
import { LESSON_VIEW, RESOURCE_VIEW } from '../routeHandling/RoutesNomenclature'

interface LessonParams {
  subjectId: number
  lessonId: string
  topicId: number
  lessonSessionId?: number
}

export const onLessonCardClick = (dispatch: AppDispatch, navigate: NavigateFunction, params: LessonParams, redirectionPath?: string) => {
  if (redirectionPath) {
    dispatch(setLessonPlanRedirectionPath(redirectionPath))
  }
  const { subjectId, topicId, lessonId, lessonSessionId } = params;
  navigate(`${LESSON_VIEW}/${subjectId}/${topicId}/${lessonId}${lessonSessionId ? `?lessonSessionId=${lessonSessionId}` : ``}`)
}

interface ResourceParams {
  resourceId: string,
  lessonId?: string,
  lessonSessionId?: number,
  subjectId?: number,
  chapterId?: number,
  topicId?: number
}

export const onResourceClick = (navigate: NavigateFunction, resourceParams: ResourceParams, sessionMode: SessionModeEnum) => {
  const { resourceId, lessonId, lessonSessionId, subjectId, chapterId, topicId } = resourceParams;
  const params: URLSearchParamsInit = {};
  if (resourceId) {
    params.resourceId = resourceId;
  }
  if (lessonId) {
    params.lessonId = lessonId;
  }
  if (lessonSessionId) {
    params.lessonSessionId = lessonSessionId.toString();
  }
  if (subjectId) {
    params.subjectId = subjectId.toString();
  }
  if (chapterId) {
    params.chapterId = chapterId.toString();
  }
  if (topicId) {
    params.topicId = topicId.toString();
  }
  if (sessionMode) {
    params.sessionMode = sessionMode.toString();
  }
  navigate({
    pathname: RESOURCE_VIEW,
    search: resourceId ? `?${createSearchParams(params)}`
      : undefined
  })
}
