import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

import { LessonTeachAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ImageWrapper,
  InfoDisplayPanel,
  NewSectionList,
  getHumanReadableTimestampString,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { TeacherLessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { TEACHING_FLOW } from '../../../routeHandling/RoutesNomenclature';
import {
  setLessonPlanRedirectionPath,
  setSelectedLessonInfo,
} from '../../Teach/reducer/teach.slice';
import SectionListSckeleton from '../shimmer';

export default function HomeLessonPlansList() {
  const navigate = useNavigate();

  const [lessonPlanList, setLessonPlanList] = useState<TeacherLessonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useAppDispatch();
  const teacher_profile_id = getLocalStorage('userId');
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);
  const location = useLocation();

  useEffect(() => {
    getTeacherLessonList(teacher_profile_id);
  }, [class_subject_info]);

  const getTeacherLessonList = async (teacherId: string) => {
    try {
      setLoading(true);
      const response = await LessonTeachAPIServiceV1Client.getTeacherLessonList(
        {
          teacherId: BigInt(teacherId),
          subjectId: class_subject_info?.subjectId,
          sectionId: class_subject_info?.sectionId,
        }
      );
      const data = response.data;
      if (data) {
        // console.log('getTeacherLessonList:', data.lessonList);
        const lpList = data.lessonList.sort(
          (a, b) =>
            (b.lastSessionTime?.toDate().getTime() ?? 0) -
            (a.lastSessionTime?.toDate().getTime() ?? 0)
        );
        setLessonPlanList(lpList);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };

  const iconDetails = (lesson: TeacherLessonInfo) => {
    const time = `${
      lesson.estimatedTimeInMin
        ? lesson.estimatedTimeInMin
        : 8 * lesson.resourceIds.length
    } Min`;
    // ${lesson.estimatedTimeInMin > 1 ? 's' : ''};
    return [
      { iconName: 'clock', text: time },
      { iconName: 'questions', text: `${lesson.resourceIds.length} resources` },
    ];
  };

  return loading === true ? (
    <SectionListSckeleton />
  ) : (
    <Box>
      <NewSectionList
        noContentMessage="No Lesson Plans Available"
        isError={error}
        rightPanelWidth="1214"
        itemsPerPage={4}
        sectionTitle="Lesson Plans"
        items={lessonPlanList.map((lesson) => (
          <InfoDisplayPanel
            defaultImage="lessonplan-v1"
            variant="small"
            blueSubText={`${lesson.teachClassSubjects?.class}${lesson.teachClassSubjects?.section} - ${lesson.teachClassSubjects?.subject}`}
            mainHeading={`${lesson.title}`}
            image={getMediaBasePath(
              lesson.posterImageUrl,
              'processedMediaBucket'
            )}
            cardClickHandler={() => {
              dispatch(setSelectedLessonInfo(lesson));
              dispatch(setLessonPlanRedirectionPath(location.pathname));

              navigate({
                pathname: `${TEACHING_FLOW}/${lesson.teachClassSubjects?.subjectId}/${lesson.moduleId}/${lesson.lessonId}`,
                search: `?${createSearchParams({
                  classId: lesson.teachClassSubjects?.classId?.toString() || '',
                  section: lesson.teachClassSubjects?.section || '',
                })}`,
              });
            }}
            iconDetails={iconDetails(lesson)}
            status={<InfoDisplayPanelStatus lesson={lesson} />}
          />
        ))}
      />
    </Box>
  );
}

interface InfoDisplayPanelStatus {
  lesson: TeacherLessonInfo;
}
const InfoDisplayPanelStatus = ({ lesson }: InfoDisplayPanelStatus) => {
  const taughtTime = getHumanReadableTimestampString(
    lesson.lastSessionTime
  )?.split(' ');
  const editTime = getHumanReadableTimestampString(lesson.modifiedOn)?.split(
    ' '
  );

  if (!lesson.teacherName) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: pxToRem(6), md: pxTovW(6) },
        paddingTop: { xs: pxToRem(5), md: pxTovW(5) },
        borderTop: `${pxTovW(2)} solid #E7E7E7D9`,
      }}
    >
      {/* //! If Geneo created the Lesson it wont show Edited only Taught */}
      <ImageWrapper
        name={
          lesson.lastSessionTime
            ? 'book-black'
            : lesson.teacherName
            ? 'edit-pencil-black'
            : ''
        }
        type="png"
        parentFolder="icons"
        styles={{
          width: { xs: pxToRem(12), md: pxTovW(12) },
          height: { xs: pxToRem(12), md: pxTovW(12) },
        }}
      />
      {lesson.lastSessionTime ? (
        <Typography variant="smallText">
          {taughtTime && Number(taughtTime[0]) < 2
            ? 'Taught Today'
            : 'Taught ' + taughtTime?.join(' ')}
        </Typography>
      ) : (
        lesson.teacherName && (
          <Typography variant="smallText">
            {editTime && Number(editTime[0]) < 2
              ? 'Recently Edited'
              : 'Edited ' + editTime?.join(' ')}
          </Typography>
        )
      )}
    </Box>
  );
};
