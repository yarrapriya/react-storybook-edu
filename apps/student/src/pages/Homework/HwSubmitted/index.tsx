import { Box, Typography } from '@mui/material';

import {
  FullWidthSectionList,
  IStyles,
  InfoDisplayCard,
  PrimaryButton,
  deserify,
  pxToRem,
  pxTovW,
  remainingTimeInHours,
  roundNumberTo2Decimal,
} from '@geneo2-web/shared-ui';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME } from '../../../routeHandling/RoutesNomenclature';
import { onHomeworkCardClick } from '../../../utils/homework';
import { setHomeworkEndPath } from '../reducer/homework.slice';
import { HomeworkRecommendations } from './component/HomeworkRecommendations';
import { HwSubmittedHeadings } from './component/HwSubmittedHeadings';

const styles: IStyles = {
  root: {
    // boxSizing: 'border-box',
  },

  headingAndButtonBox: {
    width: { md: pxTovW(400) },
    margin: 'auto',
  },

  buttonBox: {
    width: { xs: pxToRem(294), md: 'max-content' },
    margin: 'auto',
    mb: { xs: pxToRem(20), md: pxTovW(20) },
  },

  sectionListBox: {
    p: { xs: `0`, md: `0 ${pxTovW(210)}` },
  },
};

export const HwSubmitted = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const homework_id =
    new URLSearchParams(location.search).get('homeworkId') || undefined;
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const active_homework_content = deserify(
    useAppSelector((state) => state.homework.active_homework_content)
  );
  const activeHomeworkContent =
    active_homework_content && homework_id
      ? active_homework_content[homework_id]
      : undefined;
  const homeworkAttemptResult = deserify(
    useAppSelector((state) => state.homework.active_homework_attempt_result)
  );
  const { homework_end_path } = useAppSelector((state) => state.homework);
  const homeHomeworkList = deserify(
    useAppSelector((state) => state.home.active_homework_list)
  );
  const homeworkDashboardList = deserify(
    useAppSelector((state) => state.homework.active_homework_list)
  );
  const activeHomeworkList =
    homework_end_path === HOME ? homeHomeworkList : homeworkDashboardList;
  const currentResult =
    homework_id && homeworkAttemptResult
      ? homeworkAttemptResult[homework_id]
      : undefined;
  const { maxScore, responseScore } = currentResult || {};
  const scorePercent = roundNumberTo2Decimal(
    maxScore && responseScore ? (responseScore * 100) / maxScore : 0
  );
  const { setSelectedFunction } = useGlobalContext();

  useEffect(() => {
    const redirectToHomeworkDashboard = async () => {
      navigate(homework_end_path ? homework_end_path : HOME);
      dispatch(setHomeworkEndPath(undefined));
    };
    setSelectedFunction(() => redirectToHomeworkDashboard);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const nextHomeworks = activeHomeworkList
    ?.filter((val) => val.homeworkId !== Number(homework_id))
    .map((val, index) => (
      <InfoDisplayCard
        key={'Next_homework_' + index}
        image={val.homeworkPosterImgUrl}
        variant="small"
        homeworkItem={{
          subject: val.subject,
          chapter: val.homeworkTitle,
          hwName: val.moduleName,
          teacherName: val.teacherName,
          teacherProfileImageUrl: val.teacherProfileImageUrl,
          completed: val.scorePercent.toString(),
        }}
        iconDetails={[
          {
            iconName: 'questions',
            text: val.noOfQuestions.toString(),
            label: 'Questions',
          },
          {
            iconName: 'clock',
            text: remainingTimeInHours(val.endDate),
            label: 'Remaining',
          },
        ]}
        rootStyle={{
          width: { xs: '100%', md: pxTovW(347) },
          height: { xs: pxToRem(165), md: pxTovW(170) },
          maxWidth: { xs: '100%', md: pxTovW(347) },
        }}
        onCardClick={() => {
          if (!studentId) {
            return;
          }
          onHomeworkCardClick(
            dispatch,
            navigate,
            val.homeworkId,
            studentId,
            'active'
          );
        }}
      />
    ));

  const fractionClickHandler = () => {
    //
  };

  const reattemptClickHandler = () => {
    //
    if (!studentId || !homework_id) {
      return;
    }
    onHomeworkCardClick(dispatch, navigate, Number(homework_id), studentId);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.headingAndButtonBox}>
        <Box>
          <HwSubmittedHeadings
            scorePercent={scorePercent}
            fractionClickHandler={fractionClickHandler}
            topicName={activeHomeworkContent?.homework?.moduleName}
          />
        </Box>

        <Box sx={styles.buttonBox} onClick={reattemptClickHandler}>
          <PrimaryButton>
            <Typography variant="h3" color="common.white" fontWeight="bold">
              REATTEMPT
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>

      <Box sx={styles.sectionListBox}>
        <FullWidthSectionList
          hideListCount
          sectionTitle="Next Homeworks"
          items={nextHomeworks}
        />
        <HomeworkRecommendations
          subjectId={
            Number(activeHomeworkContent?.homework?.subjectId) || undefined
          }
          chapterId={
            Number(activeHomeworkContent?.homework?.chapterId) || undefined
          }
          topicId={
            Number(activeHomeworkContent?.homework?.moduleId) || undefined
          }
        />
        {/* <FullWidthSectionList
          hideListCount
          sectionTitle="_Recommended Resources"
          items={hwData.active.map((elem, index) => (
            <ContentDetailCard
              variant="medium"
              image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
              heading={"ChapterSummary"}
              iconDetails={[
                {
                  iconName: 'clock',
                  text: '15 Min',
                },
                {
                  iconName: 'questions',
                  text: 'Reading',
                },
              ]}
              rootStyle={{
                backgroundColor: 'common.white'
              }}
            />
          ))}
        /> */}
      </Box>
    </Box>
  );
};

const hwData = {
  active: [
    {
      subject: 'Science',
      chapter: 'Friction',
      hwName: 'My Homework',
      totalQuestion: '20',
      timeLeft: '10 hrs',
      name: 'Deepali',
      completed: '0',
    },
    {
      subject: 'Science',
      chapter: 'Friction',
      hwName: 'My Homework',
      totalQuestion: '20',
      timeLeft: '10 hrs',
      name: 'Deepali',
      completed: '45',
    },
    {
      subject: 'Science',
      chapter: 'Friction',
      hwName: 'My Homework',
      totalQuestion: '20',
      timeLeft: '10 hrs',
      name: 'Deepali',
      completed: '100',
    },
    {
      subject: 'Science',
      chapter: 'Friction',
      hwName: 'My Homework',
      totalQuestion: '20',
      timeLeft: '10 hrs',
      name: 'Deepali',
      completed: '0',
    },
  ],
};
