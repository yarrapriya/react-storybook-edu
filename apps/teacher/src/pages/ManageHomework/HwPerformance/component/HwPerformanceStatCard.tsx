import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  ScoreProgressBar,
  firstLetterImage,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { TeacherStudentResponseFetch } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { useState } from 'react';

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
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    mt: { xs: pxToRem(16), md: pxTovW(22) },
  },
  userImage: {
    width: { xs: pxToRem(60), md: pxTovW(87) },
    height: { xs: pxToRem(60), md: pxTovW(87) },
    borderRadius: '50%',
  },
  userNameBox: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(35) },
  },
  marksBox: {
    mt: { xs: pxToRem(21), md: pxTovW(32) },
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: `0px 0px ${pxTovW(10)} #0000001F`,
    borderRadius: pxTovW(15),
    p: {
      xs: `${pxToRem(20)} ${pxToRem(20)}`,
      md: `${pxTovW(25)} ${pxTovW(30)}`,
    },
  },
};
interface IProps {
  studentResponse?: TeacherStudentResponseFetch;
}
export const HwPerformanceStatCard = (props: IProps) => {
  const { studentResponse } = props;
  const [modalState, setModalState] = useState(false);

  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const percentageScore =
    ((studentResponse?.responseScore || 0) /
      (studentResponse?.maxScore || 100)) *
    100;

  const roundedPercentage = Math.round(percentageScore);
  return (
    <Box sx={styles.root}>
      <Typography variant="h1">Performance</Typography>

      <Box sx={styles.userDetailBox}>
        {studentResponse && (
          <ImageWrapper
            name="student1"
            type="png"
            parentFolder="tempAssets"
            styles={styles.userImage}
            path={
              studentResponse.profileImageUrl ||
              firstLetterImage(studentResponse?.studentName)
            }
          />
        )}

        <Box sx={styles.userNameBox}>
          <Typography variant="h3">
            {studentResponse?.studentName || ''}
          </Typography>

          <Box sx={{ width: { xs: pxToRem(218), md: pxTovW(300) } }}>
            <ScoreProgressBar
              score={roundedPercentage}
              variant={largeScreen ? 'lg' : 'md'}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={styles.marksBox}>
        <MarksComp
          icon="clipboard-blue"
          boldText={`${studentResponse?.metrics?.responseScore || 0}`}
          text={`${studentResponse?.metrics?.maxScore || 0}`}
          label="Marks"
        />
        <MarksComp
          icon="green-circle-check"
          boldText={`${studentResponse?.metrics?.correctCount || 0}`}
          text={`${studentResponse?.metrics?.totalQuestions || 0}`}
          label="Correct"
        />
        <MarksComp
          icon="clock"
          boldText={`${(
            (studentResponse?.metrics?.timeSpentInSec || 0) / 60
          ).toFixed(1)}`}
          label="Minutes"
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
  },

  iconTextBox: {
    display: 'flex',
    alignItems: 'center',
    gap: { md: pxTovW(8) },
  },

  textBox: {
    display: 'flex',
    alignItems: 'center',
  },
};

interface IMarksComp {
  icon: string;
  boldText: string;
  text?: string;
  label: string;
}
const MarksComp = ({ icon, boldText, text, label }: IMarksComp) => {
  return (
    <Box sx={markStyles.root}>
      <Box sx={markStyles.iconTextBox}>
        <IconWrapper name={icon} size="md" parentFolder="icons" type="png" />

        <Box sx={markStyles.textBox}>
          <Typography variant="h2" fontWeight="bold">
            {boldText}
          </Typography>
          {text && (
            <Typography variant="h3" color="text.disabled">
              /{text}
            </Typography>
          )}
        </Box>
      </Box>

      <Typography variant="h3" color="text.disabled">
        {label}
      </Typography>
    </Box>
  );
};
