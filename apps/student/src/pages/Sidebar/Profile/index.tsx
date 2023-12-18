import { ProfileComponent, deserify } from '@geneo2-web/shared-ui'
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb'
import { useAppSelector } from '../../../reduxStore/reduxHooks'

interface IProps {
}

export const Profile = (props: IProps) => {
  const { userInfo } = deserify(useAppSelector(state => state.auth))
  if (!userInfo) {
    return null;
  }
  return <ProfileComponent
    id={userInfo.studentProfileId}
    role={ProfileRolesEnum.PROFILE_ROLE_STUDENT}
    profilePics={userInfo.profilePics}
    className={userInfo.classSectionDetails?.className + " " + userInfo.classSectionDetails?.sectionName}
    name={(userInfo.firstName || "") + (userInfo.lastName ? " " + userInfo.lastName : "")}
    phone={`${userInfo.phoneCountry ? '+' + userInfo.phoneCountry + ' ' : ''}${userInfo.phoneNumber}`}
    email={userInfo.email}
    schoolDetails={userInfo.schoolDetails}
    boardMediumDetails={userInfo.boardMediumDetails}
    learnSubjects={userInfo.learnSubjects}
  />
}
