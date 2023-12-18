import { Timestamp } from '@bufbuild/protobuf';
import {
  IStyles,
  IconWrapper,
  SecondaryButton,
  formatSecondsToDateTimeString,
  getDifficultyLevelString,
  pxToRem,
  pxTovW,
  remainingTimeInHours,
  remainingTimeInHoursAndMins,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { useNavigate, useParams } from 'react-router-dom';
import { HOMEWORK_VIEW } from '../../../../routeHandling/RoutesNomenclature';
const styles: IStyles = {
  iconBox: {
    width: { xs: '90vw', md: pxTovW(552) },
    height: { xs: pxToRem(70), md: pxTovW(121) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
  },
  infoBox: {
    width: { xs: '100vw', md: pxTovW(552) },
    height: { md: 'max-content' },
    borderRadius: { md: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: { md: '1px solid #E0DFDE' },
    // borderTop: '1px solid #E0DFDE',
    // borderBottom: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: { xs: pxToRem(24), md: pxTovW(35) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    paddingLeft: { xs: pxToRem(35), md: pxTovW(62) },
    paddingTop: { xs: pxToRem(21), md: pxTovW(32) },
    paddingBottom: { xs: pxToRem(21), md: pxTovW(32) },
    paddingRight: { xs: pxToRem(40), md: pxTovW(62) },
  },
  deadlineBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
interface IProps {
  currentHomework: HomeworkTask | undefined;
  assigendInfo?: number;
  submissonCount?: number;
}
export const HwDetails = (props: IProps) => {
  const { homework_id } = useParams();
  const navigate = useNavigate();
  const { currentHomework, assigendInfo, submissonCount } = props;
  const nonSumbissionCount = currentHomework
    ? currentHomework.assignedStudentsCount !== undefined &&
      currentHomework.studentsSubmissionCount !== undefined
      ? currentHomework.assignedStudentsCount -
        currentHomework.studentsSubmissionCount
      : 0
    : 0;

  const dailyReminderTime = currentHomework?.dailyReminderTime
    ? new Timestamp(currentHomework?.dailyReminderTime).toDate()
    : undefined;
  let hours = dailyReminderTime?.getHours() || 0;
  const timeFormat = hours >= 12 ? 'PM' : 'AM';
  hours = hours > 12 ? hours - 12 : hours;
  const mins = dailyReminderTime?.getMinutes() || 0;

  // console.log('assigendInfo', assigendInfo, submissonCount);
  return (
    <Box
      sx={{
        display: 'flex',

        gap: { xs: pxToRem(13), md: pxTovW(27) },
        flexDirection: 'column',
      }}
    >
      <Box sx={styles.iconBox}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Box>
              <IconWrapper
                name="clock"
                size="md"
                parentFolder="icons"
                type="png"
              />
            </Box>
            <Typography variant="cardText" fontWeight="bold">
              {currentHomework?.homeworkContentInfo?.timeDurationInMin} Mins
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Box>
              <IconWrapper
                name="questions"
                size="md"
                parentFolder="icons"
                type="png"
              />
            </Box>
            <Typography variant="cardText" fontWeight="bold">
              {currentHomework?.homeworkContentInfo?.numberOfQuestions} Qs
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Box>
              <IconWrapper
                name="level"
                size="md"
                parentFolder="icons"
                type="png"
              />
            </Box>
            <Typography variant="cardText" fontWeight="bold">
              {getDifficultyLevelString(currentHomework?.difficultyLevel)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: { md: 'none' },
            }}
          >
            <SecondaryButton onClick={() => navigate(HOMEWORK_VIEW)}>
              <Typography variant="button">View Homework</Typography>
            </SecondaryButton>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.infoBox}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
              }}
            >
              <IconWrapper
                name="user"
                size="md"
                parentFolder="icons"
                type="png"
              />
              <Typography variant="h2" fontWeight="bold">
                {submissonCount}/{assigendInfo}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              Submissions
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h3"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              {nonSumbissionCount
                ? `${nonSumbissionCount} Students not Submitted`
                : ''}
            </Typography>
            {/* <LinkButton>Send Reminder</LinkButton> */}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: { xs: pxToRem(25), md: pxTovW(55) },
            borderBottom: '1px dashed #828282',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
              }}
            >
              <IconWrapper
                name="reminder"
                size="md"
                parentFolder="icons"
                type="png"
              />
              <Typography variant="h2" fontWeight="bold">
                {hours}:{mins < 10 ? '0' + mins : mins}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="regular"
                sx={{ color: '#828282' }}
              >
                {timeFormat}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              Daily Reminder
            </Typography>
          </Box>
          {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              gap: { xs: pxToRem(4), md: pxTovW(8) },
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h3"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              To set a new Reminder
            </Typography>
            <LinkButton>Change Reminder</LinkButton>
          </Box> */}
        </Box>
        <Box sx={styles.deadlineBox}>
          <Box
            sx={{
              width: '50%',
              borderRight: '1px solid #c7c7c7',
              padding: { xs: pxToRem(4), md: pxTovW(8) },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#333333' }}
            >
              Remaining Time
            </Typography>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#333333' }}
            >
              <Typography
                variant="bodyText"
                fontWeight="bold"
                sx={{ color: '#333333' }}
              >
                {remainingTimeInHoursAndMins(
                  currentHomework?.homeworkTargetDate
                )}
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: '50%',
              borderLeft: '1px solid #c7c7c7',
              padding: { xs: pxToRem(4), md: pxTovW(8) },
              paddingLeft: { xs: pxToRem(25), md: pxTovW(32) },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#333333' }}
            >
              Deadline
            </Typography>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#333333' }}
            >
              <Typography
                variant="bodyText"
                fontWeight="bold"
                sx={{ color: '#333333' }}
              >
                {formatSecondsToDateTimeString(
                  currentHomework?.homeworkTargetDate?.seconds
                )}
              </Typography>
            </Typography>
          </Box>
        </Box>
        {/* <LinkButton>Extend Deadline</LinkButton> */}
      </Box>
    </Box>
  );
};
