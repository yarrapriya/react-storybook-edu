import { Box, Typography } from '@mui/material';

import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  ScoreProgressBar,
  getDifficultyLevelString,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';

import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';

const styles: IStyles = {
  root: {
    // border: '1px solid red',
    mb: { xs: pxToRem(20), md: pxTovW(20) },
    p: {
      xs: `${pxToRem(20)} ${pxToRem(20)} 0 ${pxToRem(20)}`,
      md: `${pxTovW(0)}`,
    },
  },

  userDetailBox: {
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
    mt: { xs: pxToRem(16), md: pxTovW(22) },
  },
  userImage: {
    width: { xs: pxToRem(62), md: pxTovW(124) },
    height: { xs: pxToRem(62), md: pxTovW(124) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
  },
  userNameBox: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(5), md: pxTovW(3) },
  },
  scoreProgressBarBox: {
    width: '70%',
    mt: { xs: pxToRem(10), md: pxTovW(20) },
    display: { xs: 'none', md: 'inline' },
  },

  marksBox: {
    mt: { xs: pxToRem(21), md: pxTovW(32) },
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: {
      xs: `0px 0px ${pxTovW(30)} #0000001F`,
      md: `0px 0px ${pxTovW(10)} #0000001F`,
    },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    p: {
      xs: `${pxToRem(15)} ${pxToRem(20)}`,
      md: `${pxTovW(25)} ${pxTovW(30)}`,
    },
  },
};

interface IProps {
  homework?: HomeworkTask;
}
export const ViewHwStatCard = (props: IProps) => {
  const { homework } = props;
  return (
    <Box sx={styles.root}>
      <Typography variant="h1" fontWeight="bold">
        View Homework
      </Typography>

      <Box sx={styles.userDetailBox}>
        <ImageWrapper
          name="lessonImage1"
          type="png"
          parentFolder="tempAssets"
          // onClick={flagClickHandler}
          styles={styles.userImage}
        />

        <Box sx={styles.userNameBox}>
          <Typography variant="h2" fontWeight="bold">
            {homework?.homeworkTitle}
          </Typography>

          <Typography
            variant="button"
            color="primary"
            fontWeight="regular"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {`${homework?.class}${homework?.section} ${homework?.subject} | ${homework?.moduleName}`}
          </Typography>

          <Box sx={styles.scoreProgressBarBox}>
            <ScoreProgressBar
              score={Number(homework?.classScore?.toFixed(2)) || 0}
              variant="lg"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.marksBox}>
        <MarksComp
          icon="clock"
          label={`${homework?.estimatedTimeInMin} Minutes`}
        />
        <MarksComp
          icon="questions"
          label={`${homework?.homeworkContentInfo?.numberOfQuestions} Questions`}
        />
        <MarksComp
          icon="bar-graph"
          label={`${getDifficultyLevelString(homework?.difficultyLevel)}`}
        />
      </Box>
    </Box>
  );
};

//^ Local component

const markStyles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(15), md: pxTovW(15) },
  },

  icon: {
    width: { xs: pxToRem(31), md: pxTovW(31) },
    height: { xs: pxToRem(31), md: pxTovW(31) },
  },
};

interface IMarksComp {
  icon: string;
  label: string;
}
const MarksComp = ({ icon, label }: IMarksComp) => {
  return (
    <Box sx={markStyles.root}>
      <IconWrapper
        name={icon}
        parentFolder="icons"
        type="png"
        customSx={markStyles.icon}
      />

      <Typography variant="h3" color="text.primary" fontWeight="bold">
        {label}
      </Typography>
    </Box>
  );
};
