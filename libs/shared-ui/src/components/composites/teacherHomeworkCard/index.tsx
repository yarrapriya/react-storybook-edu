import { Box, Typography } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { ReactNode } from 'react';
import {
  firstLetterImage,
  getMediaBasePath,
} from '../../../commonUtils/images';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import {
  getDifficultyLevelString,
  getHumanReadableTimestampString,
} from '../../../commonUtils/utilFunctions';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';
const styles: IStyles = {
  root: {
    minHeight: { xs: pxToRem(241), md: '14.792vw' },
    maxHeight: 'max-content',
    width: { xs: pxToRem(199), md: pxTovW(253.76) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
    padding: { xs: pxToRem(16), md: pxTovW(16) },
    backgroundColor: 'common.white',
    cursor: 'pointer',
    '&:hover': { boxShadow: `0 0 ${pxTovW(20)} grey` },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(19), md: pxTovW(19) },
    paddingBottom: { xs: pxToRem(10), md: pxTovW(10) },
    borderBottom: '1px solid #E7E7E7D9',
  },
  avatarBox: {
    display: 'flex',
    gap: pxToRem(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    display: 'flex',
    gap: { xs: pxToRem(2), md: pxTovW(2) },
    // wordWrap: 'break-word',
    alignItems: 'center',
    width: 'max-content',
  },
  lowerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: { xs: pxToRem(10), md: pxTovW(10) },
  },
  userImg: {
    height: {
      xs: pxToRem(18),
      md: pxTovW(28),
    },
    width: {
      xs: pxToRem(18),
      md: pxTovW(28),
    },
    borderRadius: '50%',
  },
};
interface IProps {
  custom?: boolean;
  cardClickHandler?: () => void;
  homeworkTask?: HomeworkTask;
  status?: ReactNode;
}
export const HomeworkCard = (props: IProps) => {
  const { custom, cardClickHandler, homeworkTask, status } = props;

  const editTime = getHumanReadableTimestampString(
    homeworkTask?.lastModifiedTime
  )?.split(' ');

  return (
    <Box sx={styles.root} onClick={cardClickHandler}>
      <Box sx={styles.content}>
        <ImageWrapper
          path={getMediaBasePath(
            homeworkTask?.homeworkPosterImgUrl,
            'processedMediaBucket'
          )}
          name="homework-v1"
          type="png"
          parentFolder="icons"
          styles={{
            width: '100%',
            borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
          }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="cardText" fontWeight="bold">
            {homeworkTask?.homeworkTitle}
          </Typography>
        </Box>
        <Box
          width="100%"
          sx={{
            display: 'flex',
            gap: { xs: pxToRem(12), md: pxTovW(12) },
            // border: '1px solid red',
            justifyContent: 'space-evenly',
            boxSizing: 'border-box',
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
              {homeworkTask?.homeworkContentInfo?.timeDurationInMin.toString()}{' '}
              Mins
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
              {homeworkTask?.homeworkContentInfo?.numberOfQuestions + 'Qs'}
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
              {/* {homeworkTask?.difficultyLevel} */}
              {getDifficultyLevelString(homeworkTask?.difficultyLevel)}
            </Typography>
          </Box>
        </Box>
      </Box>

      {status ? (
        status
      ) : (
        <Box sx={styles.lowerBox}>
          <Box sx={styles.avatarBox}>
            <ImageWrapper
              path={
                homeworkTask?.teacherProfileImageUrl ||
                firstLetterImage(homeworkTask?.teacherName || 'Geneo')
              }
              name={homeworkTask?.teacherName || 'Geneo'}
              type="png"
              parentFolder="tempAssets"
              styles={styles.userImg}
            />

            <Typography variant="smallText" fontWeight="bold">
              {homeworkTask?.teacherName || 'Geneo'}
            </Typography>
          </Box>
          <Box sx={styles.iconBox}>
            <IconWrapper
              name="clock"
              size="small"
              parentFolder="icons"
              type="png"
            />
            {/* <Typography variant="smallText" color="#007CDC">
            {homeworkTask?.estimatedTimeInMin?.toString()}
          </Typography> */}
            <Typography variant="subText" color="text.disabled">
              {editTime && Number(editTime[0]) < 2
                ? 'Recently Edited'
                : 'Edited ' + editTime?.join(' ')}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
