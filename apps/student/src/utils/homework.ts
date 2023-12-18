import { Timestamp } from '@bufbuild/protobuf';
import { ContentAttempt } from '@protos/learning_management/lms.db_pb';
import { NavigateFunction } from 'react-router-dom';
import { setHomeworkEndPath } from '../pages/Homework/reducer/homework.slice';
import { AppDispatch } from '../reduxStore/store';
import { HOMEWORK_COMPLETED, HOMEWORK_START_COVER } from '../routeHandling/RoutesNomenclature';

export const onHomeworkCardClick = async (dispatch: AppDispatch, navigate: NavigateFunction, homeworkId: number, studentId: bigint, homeworkStatus: 'active' | 'ended' = 'active', pathName?: string) => {
  if (homeworkStatus === 'active') {
    if (pathName) {
      dispatch(setHomeworkEndPath(pathName))
    }
    navigate(`${HOMEWORK_START_COVER}?homeworkId=${homeworkId}`);
  } else {
    navigate(`${HOMEWORK_COMPLETED}?homeworkId=${homeworkId}`);
  }
  // try {
  //   const homeworkContent = await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
  //     personId: studentId,
  //     personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
  //     homeworkId: homeworkId
  //   })
  //   const homeworkStudentResponse = await LmsHomewokStudentAPIServiceV1Client.fetchStudentHWResponse({
  //     studentId: studentId,
  //     homeworkId: homeworkId
  //   })
  //   dispatch(setActiveHomeworkId(homeworkId));
  //   dispatch(setActiveHomeworkContent(homeworkContent.data));
  //   dispatch(setActiveHomeworkStudentResponse(homeworkStudentResponse.data));
  //   if (homeworkStatus === 'active') {
  //     navigate(`${HOMEWORK_START_COVER}/${homeworkId}`);
  //   } else {
  //     navigate(`${HOMEWORK_COMPLETED}/${homeworkId}`);
  //   }
  // } catch (err) {
  //   dispatch(setActiveHomeworkId(undefined));
  //   dispatch(setActiveHomeworkContent(undefined));
  //   dispatch(setActiveHomeworkStudentResponse(undefined));
  // }
}


export const getLastAttemptedResponse = (attempts?: ContentAttempt[]) => {
  if (!attempts) {
    return undefined
  }
  attempts.sort((a, b) => new Timestamp(b.endTime).toDate().getTime() - new Timestamp(a.endTime).toDate().getTime());
  return attempts[0]
}
