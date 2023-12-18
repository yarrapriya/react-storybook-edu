import { ProfileComponent, deserify } from '@geneo2-web/shared-ui'
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb'
import { useAppSelector } from '../../../reduxStore/reduxHooks'

interface IProps {
}

export const Profile = (props: IProps) => {
  const { user_info } = deserify(useAppSelector(state => state.auth))
  if (!user_info) {
    return null;
  }
  return <ProfileComponent
    id={user_info.teacherProfileId}
    role={ProfileRolesEnum.PROFILE_ROLE_TEACHER}
    profilePics={user_info.profilePics}
    name={(user_info.firstName || "") + (user_info.lastName ? " " + user_info.lastName : "")}
    phone={`${user_info.phoneCountry ? '+' + user_info.phoneCountry + ' ' : ''}${user_info.phoneNumber}`}
    email={user_info.email}
    schoolBoardMediumInfo={user_info.schoolDetails || []}
    teachClassSubjects={user_info.teachClassSubjects}
  />
}
