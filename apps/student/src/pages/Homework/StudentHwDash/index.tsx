import { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Timestamp } from '@bufbuild/protobuf';
import { LmsHomewokStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  EarlyHomeworkPopup,
  IStyles,
  InfoDisplayCard,
  Loader,
  NoContentCard,
  StudentSubjectPopup,
  deserify,
  pxToRem,
  pxTovW,
  remainingTimeInHours,
} from '@geneo2-web/shared-ui';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME } from '../../../routeHandling/RoutesNomenclature';
import { onHomeworkCardClick } from '../../../utils/homework';
import { getSubjectsMap } from '../../../utils/icons';
import {
  setActiveHomeworkList,
  setEndedHomeworkList,
  setHomeworkSubjectId,
} from '../reducer/homework.slice';
import { HwDashSubjectFilter } from './component/HwDashSubjectFilter';
import { TabComp } from './component/TabComp';

const styles: IStyles = {
  root: {
    boxSizing: 'border-box',
  },

  mainHeadingBox: {
    p: { md: `${pxTovW(27)} ${pxTovW(241)} 0 ${pxTovW(241)}` },

    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(21), md: pxTovW(34.5) },
  },

  hwMapper: {
    boxSizing: 'border-box',
    p: {
      xs: `${pxToRem(25)} ${pxToRem(20)}`,
      md: `${pxTovW(39)} ${pxTovW(419)}`,
    },

    idcStyle: {
      border: '1px solid red',
      width: { xs: pxToRem(319), md: pxTovW(347) },
      height: { xs: pxToRem(160), md: pxTovW(153) },
    },
    margin: 'auto',
    width: { xs: '100%', md: 'auto' },
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: { xs: 'column', md: 'unset' },
    gap: { xs: pxToRem(15), md: pxTovW(20) },
  },
  title: {
    paddingTop: { xs: pxToRem(15), md: 0 },
    paddingLeft: { xs: pxToRem(15), md: 0 },
  },
};

export const StudentHwDash = () => {
  //^ TabComp
  // console.log('rerender');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setSelectedFunction } = useGlobalContext();
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );

  const selectedSubjectId = deserify(
    useAppSelector((state) => state.homework.homework_subject_id)
  );

  const [mapData, setMapData] = useState(['Active']);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [value, setValue] = useState(mapData[0]);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);

  const activeHomeworkList = deserify(
    useAppSelector((state) => state.homework.active_homework_list)
  );
  const endedHomeworkList = deserify(
    useAppSelector((state) => state.homework.ended_homework_list)
  );
  const [startTime, setStartTime] = useState<Timestamp | undefined>(undefined);

  useEffect(() => {
    if (endedHomeworkList?.length) {
      setMapData(['Active', 'Ended']);
    }
  }, [endedHomeworkList?.length]);

  const homeworkList =
    (value === 'Active' ? activeHomeworkList : endedHomeworkList) || [];

  const filteredHomeworkList = selectedSubjectId
    ? homeworkList.filter((val) => val.subjectId == selectedSubjectId)
    : homeworkList;

  const getSortedHomeworkList = (filter: string | undefined) => {
    switch (filter) {
      case 'Questions':
        return filteredHomeworkList.sort(
          (a, b) => a.noOfQuestions - b.noOfQuestions
        );
      // console.log(filteredHomeworkList);
      case 'Score':
        return filteredHomeworkList.sort(
          (a, b) => a.scorePercent - b.scorePercent
        );
      case 'Time Left':
        return filteredHomeworkList.sort(
          (a, b) => a.estimatedTimeInMin - b.estimatedTimeInMin
        );
      case undefined:
        return filteredHomeworkList;
    }
  };

  const sortedHomeworkList = getSortedHomeworkList(filter);

  //^ StudentSubjectPopup
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const redirectToHome = () => {
      navigate(HOME);
    };
    setSelectedFunction(() => redirectToHome);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  useEffect(() => {
    dispatch(setHomeworkSubjectId(undefined));
    getStudentHomeworkList();
  }, []);

  const getStudentHomeworkList = async () => {
    try {
      setLoading('loading');
      const response =
        await LmsHomewokStudentAPIServiceV1Client.getStudentHomeworkList({
          studentId: studentId,
        });
      dispatch(setActiveHomeworkList(response.data?.allHomeworks?.active));
      dispatch(setEndedHomeworkList(response.data?.allHomeworks?.ended));
      setLoading('completed');
    } catch (err) {
      console.log(err);
      setLoading('error');
      dispatch(setActiveHomeworkList([]));
      dispatch(setEndedHomeworkList([]));
    }
  };
  const sortFunction = (key?: string) => {
    setFilter(key);
  };

  const renderHomeworkList = () => {
    return sortedHomeworkList?.map((val, index) => (
      <InfoDisplayCard
        key={
          (value === 'Active' ? 'Active_Homework_' : 'Ended_Homework_') + index
        }
        currentTabValue={value}
        image={val.homeworkPosterImgUrl}
        variant="small"
        homeworkItem={{
          subject: val.subject,
          chapter: val.moduleName,
          hwName: val.homeworkTitle,
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
          width: { xs: '100%', md: '32%' },
          height: { xs: pxToRem(165), md: pxTovW(170) },
          maxWidth: { xs: '100%', md: pxTovW(347) },
        }}
        onCardClick={() => {
          if (!studentId) {
            return;
          }
          if (value === 'Active') {
            if (val.startDate) {
              if (
                new Date(new Timestamp(val.startDate).toDate()) > new Date()
              ) {
                setStartTime(val.startDate);
                return;
              }
            }
            onHomeworkCardClick(
              dispatch,
              navigate,
              val.homeworkId,
              studentId,
              'active',
              location.pathname
            );
            // navigate(HOMEWORK_START_COVER);
          } else {
            onHomeworkCardClick(
              dispatch,
              navigate,
              val.homeworkId,
              studentId,
              'ended',
              location.pathname
            );
          }
        }}
      />
    ));
  };

  return loading === 'loading' ? (
    <Loader />
  ) : loading === 'error' ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.mainHeadingBox}>
        <Typography variant="h1" sx={styles.title}>
          Your Homework
        </Typography>

        <TabComp
          handleChange={handleChange}
          mapData={mapData}
          stateValue={value}
          count={homeworkList.length}
        />
      </Box>

      <HwDashSubjectFilter
        setModalState={setModalState}
        sortFunction={sortFunction}
      />

      <Box sx={styles.hwMapper}>{renderHomeworkList()}</Box>

      <StudentSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={Object.values(subMap).map((sub) => ({
          subject: sub.subjectName,
          icon: sub.iconUrl,
          color: sub.textColor,
          onClick: () => {
            dispatch(setHomeworkSubjectId(sub.subjectId));
            setModalState(false);
          },
        }))}
        title="Choose Subject"
      />
      <EarlyHomeworkPopup
        open={!!startTime}
        okHandler={() => setStartTime(undefined)}
        startTime={startTime}
      />
    </Box>
  );
};

type HomeworkFilterType = 'ques' | 'time' | 'score';
