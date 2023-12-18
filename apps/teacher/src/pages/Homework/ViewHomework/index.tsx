import { Box, Typography } from '@mui/material';

import { LmsHomeworkCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  Loader,
  QuestionContainerWithSolution,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { HomeworkContent } from '@protos/learning_management/lms.hw.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { ViewHwStatCard } from './components/ViewHwStatCard';

const styles: IStyles = {
  root: {
    // border: `2px solid blue`,
    boxSizing: 'border-box',
    p: { xs: `0`, md: `${pxTovW(60)} ${pxTovW(200)}` },
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { md: pxTovW(32) },
    // maxHeight: '90vh',
    height: '100%',
  },

  leftPanel: {
    flexBasis: { md: pxTovW(613) },
  },
  rightPanel: {
    flexBasis: { md: pxTovW(793) },
    overflow: 'auto',
  },

  secondaryHeadingBox: {
    mb: { xs: pxToRem(20), md: pxTovW(20) },
    pl: { xs: pxToRem(20), md: '0' },
  },

  userImage: {
    width: { xs: pxToRem(60), md: pxTovW(87) },
    height: { xs: pxToRem(60), md: pxTovW(87) },
  },

  questionBox: {
    // margin: 'auto',
    // width: { xs: 'max-content', md: '100%' },
    // mt: { xs: pxToRem(20), md: pxTovW(20) },
    // border: `1px solid red`,

    // boxSizing: 'border-box',
    // width: 'auto',
    // height: '70vh',
    // // height: '200px',
    // padding: {
    //   xs: `${pxToRem(20)} ${pxToRem(10)}`,
    //   md: `${pxTovW(20)} ${pxTovW(50)}`,
    // },
    // border: `1px solid #CED2FC`,
    // borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    // backgroundColor: 'common.white',
    // display: 'flex',
    // flexDirection: 'column',
    // gap: { xs: pxToRem(20), md: pxTovW(20) },
    // overflowY: 'auto',

    height: '70vh',
    overflow: 'auto',
  },
};

export const ViewHomework = () => {
  const teacher_id = getLocalStorage('userId');
  // const { homework_id } = useParams();
  const [homework, setHomework] = useState<HomeworkContent | undefined>();
  const { current_homework_classStats, selected_hw_id } = deserify(
    useAppSelector((state) => state.manageHomework)
  );
  // console.log('selected_hw_id', selected_hw_id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const getHomeworkDetails = async () => {
    try {
      setLoading(true);
      const response =
        await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
          personId: teacher_id,
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          homeworkId: selected_hw_id,
        });
      if (response.data) {
        setHomework(response.data);
        setLoading(false);
        // console.log(response.data);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  };
  useEffect(() => {
    if (selected_hw_id && teacher_id) {
      getHomeworkDetails();
    }
  }, []);

  return loading === true ? (
    <Loader />
  ) : error === true ? (
    <Typography>Error Occured</Typography>
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.leftPanel}>
        <ViewHwStatCard homework={homework?.homework} />
      </Box>
      <Box sx={styles.rightPanel}>
        <Box sx={styles.secondaryHeadingBox}>
          <Typography variant="h2" fontWeight="bold">
            Homework Questions
          </Typography>
        </Box>
        {homework?.homeworkContent.map((que, quePos) => (
          <Box
            key={quePos}
            sx={{
              marginBottom: { xs: pxToRem(20), md: pxTovW(20) },
              px: { xs: pxToRem(16), md: 0 },
            }}
          >
            <QuestionContainerWithSolution
              questionNumber={quePos + 1}
              question={que}
              showAnswer={true}
              showQuestionStats
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
