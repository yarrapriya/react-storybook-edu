import { LessonLearnAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ImageWrapper,
  InfoDisplayPanel,
  NewSectionList,
  deserify,
  firstLetterImage,
  getHumanReadableTimestampString,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../../utils/icons';
import { onLessonCardClick } from '../../../../utils/learn';
import { setHomeOngoingLessonList } from '../../reducer/homeDashboard.slice';
import SectionListSckeleton, { ShimmerOngoingLsCard } from '../../shimmer';

export default function OngoingLessonList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const sectionId = deserify(
    useAppSelector(
      (state) => state.auth.userInfo?.classSectionDetails?.sectionId
    )
  );
  const { ongoing_lesson_list } = deserify(
    useAppSelector((state) => state.home)
  );
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );

  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getStudentOngoingLessonList();
  }, [selectedSubjectId]);

  async function getStudentOngoingLessonList() {
    try {
      if (!studentId) {
        return;
      }
      setLoading(true);
      const response =
        await LessonLearnAPIServiceV1Client.getStudentOngoingLessonList({
          studentId: studentId,
          subjectId: selectedSubjectId,
          sectionId: sectionId,
        });
      if (response) {
        setLoading(false);
        if (response.data) {
          const lpList = response.data.lessons.sort(
            (a, b) =>
              (b.lastSessionTime?.toDate().getTime() ?? 0) -
              (a.lastSessionTime?.toDate().getTime() ?? 0)
          );
          dispatch(setHomeOngoingLessonList(lpList));
          return;
        }
      }
      dispatch(setHomeOngoingLessonList([]));
    } catch (err) {
      dispatch(setHomeOngoingLessonList([]));
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }

  const getOngoingLessonItems = () => {
    if (!ongoing_lesson_list) {
      return [];
    }
    return ongoing_lesson_list.map((val, index) => (
      <InfoDisplayPanel
        defaultImage="lessonplan-v1"
        key={'home_ongoing_lesson_' + index}
        variant="small"
        blueSubText={subMap[val.subjectId.toString()]?.subjectName} // full subject name and grade missing
        lastSessionTime={
          val.lastSessionTime
            ? 'Taught ' + getHumanReadableTimestampString(val.lastSessionTime)
            : ''
        }
        mainHeading={val.title}
        iconDetails={[
          {
            iconName: 'clock',
            text: `${val.estimatedTimeInMin || 0} Min`,
          },
          {
            iconName: 'questions',
            text: `${val.resourceIds.length} resources`,
          },
        ]}
        rootStyle={{
          backgroundColor: 'common.white',
          width: { xs: pxToRem(199), md: pxTovW(227) },
        }}
        image={getMediaBasePath(val.posterImageUrl, 'processedMediaBucket')}
        cardClickHandler={() => {
          onLessonCardClick(
            dispatch,
            navigate,
            {
              subjectId: val.subjectId,
              lessonId: val.lessonId,
              topicId: val.moduleId,
            },
            location.pathname
          );
        }}
        status={<LessonPlanInfoPanelStatus lesson={val} />}
      />
    ));
  };

  return loading === true ? (
    <SectionListSckeleton children={OngoingLsShimmerArray} />
  ) : (
    <NewSectionList
      noContentMessage="No Lessons Available"
      isError={error}
      itemsPerPage={4}
      sectionTitle="Ongoing Lessons"
      items={getOngoingLessonItems()}
    />
    // <SectionListSckeleton children={OngoingLsShimmerArray} />
  );
}

const OngoingLsShimmerArray = [
  <ShimmerOngoingLsCard key={1} />,
  <ShimmerOngoingLsCard key={2} />,
  <ShimmerOngoingLsCard key={3} />,
  <ShimmerOngoingLsCard key={4} />,
];

interface InfoDisplayPanelStatus {
  lesson: LessonInfo;
}
const LessonPlanInfoPanelStatus = ({ lesson }: InfoDisplayPanelStatus) => {
  const taughtTime = getHumanReadableTimestampString(
    lesson.lastSessionTime
  )?.split(' ');

  if (!lesson.teacherName) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `${pxTovW(2)} solid #E7E7E7D9`,
        pt: { xs: pxToRem(5), md: pxTovW(5) },
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: pxToRem(5), md: pxTovW(5) },
        }}
      >
        <ImageWrapper
          name={lesson.teacherName || 'Geneo'}
          type="png"
          parentFolder="icons"
          styles={{
            width: { xs: pxToRem(18), md: pxTovW(28) },
            height: { xs: pxToRem(18), md: pxTovW(28) },
            borderRadius: '50%',
          }}
          path={
            lesson.teacherProfileImageUrl ||
            firstLetterImage(lesson.teacherName) ||
            firstLetterImage('Geneo')
          }
        />

        <Typography variant="smallText" fontWeight="bold">
          {lesson.teacherName || 'Geneo'}
        </Typography>
      </Box>

      {taughtTime && lesson.teacherName && (
        <Typography variant="subText" color="text.disabled">
          {Number(taughtTime[0]) < 2
            ? 'Taught Today'
            : 'Taught ' + taughtTime?.join(' ')}
        </Typography>
      )}
    </Box>
  );
};
