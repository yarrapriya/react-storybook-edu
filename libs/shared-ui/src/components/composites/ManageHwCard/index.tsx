import { Box, Typography } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { remainingTimeInHoursAndMins } from '../../../commonUtils/homework';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { formatDateAsDayMonth } from '../../../commonUtils/utilFunctions';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';
import { ScoreProgressBar } from '../ScoreProgressBar';
const styles: IStyles = {
  root: {
    height: { xs: pxToRem(120), md: pxTovW(132) },
    width: { xs: '100%', md: pxTovW(341) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    padding: { xs: pxToRem(12), md: pxTovW(12) },
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(14) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
  },
  imageBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: { xs: pxToRem(103), md: pxTovW(107) },
    // width: { xs: pxToRem(110), md: pxTovW(107) },
    width: { xs: pxToRem(103), md: pxTovW(107) },
    minWidth: { xs: pxToRem(103), md: pxTovW(107) },

    // boxSizing: 'content-box',
    boxSizing: 'border-box',
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#E0DFDE',
    position: 'relative',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
  },

  progressContainer: {
    // border: '1px solid green',
    boxSizing: 'border-box',
    position: 'absolute',
    bgcolor: '#FFFFFFE6',
    width: '100%',
    height: { xs: pxToRem(37), md: pxTovW(37) },
    bottom: 0,
    opacity: '90%',
    borderRadius: {
      xs: `0 0 ${pxToRem(10)} ${pxToRem(10)}`,
      md: `0 0 ${pxTovW(10)} ${pxTovW(10)}`,
    },
    p: { xs: pxToRem(5), md: pxTovW(5) },

    display: 'flex',
    gap: { xs: pxToRem(2), md: pxTovW(2) },
    flexDirection: 'column',
  },

  iconBox: {
    display: 'flex',
    // flexDirection: 'column',
    gap: { xs: pxToRem(2), md: pxTovW(2) },
    // justifyContent: 'space-around',
    // backgroundColor: 'red',
    // wordWrap: 'break-word',
    alignItems: 'center',
    width: 'max-content',
  },
};
interface IProps {
  clickHandler?: () => void;
  hwAssigned?: HomeworkTask;
  hwDraft?: HomeworkTask;
  hwType?: 'Draft' | 'Assigned' | 'Ended';
  subjectName: string;
}

export const ManageHomeworkCard = (props: IProps) => {
  const { clickHandler, hwAssigned, hwDraft, hwType, subjectName } = props;

  return (
    <Box sx={styles.root} onClick={clickHandler}>
      <Box sx={styles.imageBox}>
        <ImageWrapper
          name="chapter1"
          type="png"
          parentFolder="tempAssets"
          styles={{
            ...styles.image,
            // height: hwType !== 'Draft' ? '60%' : '100%',
            height: '100%',
          }}
          path={
            hwAssigned?.homeworkPosterImgUrl || hwDraft?.homeworkPosterImgUrl
          }
        />
        {/* {hwType !== 'Draft' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '90%',
              margin: { xs: pxToRem(5), md: pxTovW(4) },
              // backgroundColor: 'red',
              boxSizing: 'content-box',
              gap: pxToRem(2),
            }}
          > */}

        {/* {hwType !== 'Draft' && (
          <ScoreProgressBar
            variant="small"
            score={hwAssigned?.classScore || 0}
          />
        )}
        {hwType !== 'Draft' && (
          <Typography variant="smallestText" sx={{ marginLeft: pxToRem(5) }}>
            Class Score
          </Typography>
        )} */}

        {hwType !== 'Draft' && (
          <Box sx={styles.progressContainer}>
            <ScoreProgressBar
              variant="small"
              score={hwAssigned?.classScore || 0}
            />

            <Typography variant="smallestText" sx={{ marginLeft: pxToRem(5) }}>
              Class Score
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography variant="smallText" color="primary.main">
            {hwAssigned?.class || hwDraft?.class}
            {hwAssigned?.section || hwDraft?.section} -{' '}
            {hwAssigned?.subject || hwDraft?.subject}
          </Typography>

          <Typography
            variant="cardText"
            fontWeight="bold"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              maxHeight: pxToRem(20),
              maxWidth: { xs: pxToRem(220), md: pxTovW(190) },
            }}
          >
            {hwAssigned?.moduleName || hwDraft?.moduleName}
          </Typography>

          <Typography variant="smallText" fontWeight="regular">
            {hwAssigned?.homeworkTitle || hwDraft?.homeworkTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              // gap: { xs: pxToRem(12), md: pxTovW(12) },
              //   border: '1px solid red',
              justifyContent: 'space-around',
              alignItems: 'center',
              boxSizing: 'border-box',
            }}
          >
            {hwType === 'Draft' ? (
              <>
                {' '}
                <Box sx={styles.iconBox}>
                  <IconWrapper
                    name="clock"
                    size="small"
                    parentFolder="icons"
                    type="png"
                  />

                  <Typography variant="smallText">
                    {`${
                      hwAssigned?.homeworkContentInfo?.timeDurationInMin ||
                      hwDraft?.homeworkContentInfo?.timeDurationInMin
                    } mins`}
                  </Typography>
                </Box>
                <Box sx={styles.iconBox}>
                  <IconWrapper
                    name="questions"
                    size="small"
                    parentFolder="icons"
                    type="png"
                  />
                  <Typography variant="smallText">
                    {hwAssigned?.homeworkContentInfo?.numberOfQuestions ||
                      hwDraft?.homeworkContentInfo?.numberOfQuestions}
                  </Typography>
                </Box>
                <Box sx={styles.iconBox}>
                  <IconWrapper
                    name="level"
                    size="small"
                    parentFolder="icons"
                    type="png"
                  />
                  <Typography variant="smallText">
                    {difficultyLevelToString(
                      hwAssigned?.difficultyLevel ||
                        hwDraft?.difficultyLevel ||
                        0
                    )}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  // backgroundColor: 'blue',
                }}
              >
                {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={styles.iconBox}>
                    <IconWrapper
                      name="profile"
                      size="small"
                      parentFolder="icons"
                      type="png"
                    />
                    <Typography variant="smallText">{`${
                      hwAssigned?.studentsSubmissionCount || 0
                    }/${hwAssigned?.assignedStudentsCount || 0}`}</Typography>
                  </Box>
                  <Typography variant="smallText" fontWeight="regular">
                    Submissions
                  </Typography>
                </Box> */}
                {hwType === 'Assigned' ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: 'auto',
                    }}
                  >
                    <Box sx={styles.iconBox}>
                      <IconWrapper
                        name="clock"
                        size="small"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="smallText">
                        {remainingTimeInHoursAndMins(
                          hwAssigned?.homeworkTargetDate ||
                            hwDraft?.homeworkTargetDate
                        )}
                      </Typography>
                    </Box>
                    <Typography variant="smallText" fontWeight="regular">
                      Remaining
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={styles.iconBox}>
                      <IconWrapper
                        name="calender"
                        size="small"
                        parentFolder="icons"
                        type="png"
                      />
                      <Typography variant="smallText">
                        {formatDateAsDayMonth(
                          hwAssigned?.homeworkTargetDate ||
                            hwDraft?.homeworkTargetDate
                        )}
                      </Typography>
                    </Box>
                    <Typography variant="smallText" fontWeight="regular">
                      Deadline
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
// function formatSecondsToDateString(seconds) {
//   const date = new Date(seconds * 1000);
//   const day = date.getDate();
//   const month = date.toLocaleString('default', { month: 'short' });

//   return `${day} ${month}`;
// }
function formatTimestampToDateString(
  seconds: bigint | undefined
): string | undefined {
  if (seconds === undefined) {
    return undefined;
  }
  const date = new Date(Number(seconds) * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`;
}

const difficultyLevelToString = (value: number) => {
  switch (value) {
    case 0:
      return 'Undefined';
      break;
    case 1:
      return 'High';
      break;
    case 2:
      return 'Medium';
      break;
    case 3:
      return 'Low';
      break;

    default:
      break;
  }
};
