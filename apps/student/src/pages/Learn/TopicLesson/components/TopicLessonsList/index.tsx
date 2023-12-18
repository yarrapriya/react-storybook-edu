import { LessonCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChipBadge,
  ImageWrapper,
  InfoDisplayPanel,
  NoContentCard,
  deserify,
  firstLetterImage,
  getHumanReadableTimestampString,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../reduxStore/reduxHooks';
import { onLessonCardClick } from '../../../../../utils/learn';
import { setSelectedModuleLessons } from '../../../reducer/learn.slice';
import { ReadylessonShimmer } from '../../Shimmer';

export const TopicLessonList = () => {
  const { topic_id, subject_id } = useParams();
  const topicId = Number(topic_id);
  const subjectId = Number(subject_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moduleLessons = deserify(
    useAppSelector((state) => state.learn.selected_module_lessons)
  );
  const location = useLocation();
  const lessons = moduleLessons?.lessons || [];
  // console.log('selected_module_lesson_list', lessons);
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );

  useEffect(() => {
    fetchLessonsByModule();
  }, []);

  const fetchLessonsByModule = async () => {
    try {
      setLoading('loading');
      const response =
        await LessonCommonAPIServiceV1Client.fetchLessonsByModule({
          personId: user?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          moduleId: topicId,
          sectionId: user?.classSectionDetails?.sectionId
        });
      // console.log(response.data);
      setLoading('completed');
      if (response) {
        if (response?.data) {
          // const data = response.data;
          response.data?.lessons.sort(
            (a, b) =>
              (b.lastSessionTime?.toDate().getTime() ?? 0) -
              (a.lastSessionTime?.toDate().getTime() ?? 0)
          );
          // response.data.lessons = sortedData;
          dispatch(setSelectedModuleLessons(response.data));
          return;
        }
      }
      dispatch(setSelectedModuleLessons(undefined));
    } catch (err) {
      console.log(err);
      setLoading('error');
      dispatch(setSelectedModuleLessons(undefined));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(10), md: pxTovW(10), alignItems: 'center' },
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ paddingLeft: { xs: pxToRem(20), md: 0 } }}
        >
          Lessons
        </Typography>
        <ChipBadge label={lessons?.length || 0} color="primary" size="small" />
      </Box>
      {loading === 'loading' ? (
        <ReadylessonShimmer />
      ) : loading === 'error' ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : (
        <Box
          sx={{
            paddingLeft: { xs: pxToRem(20), md: pxTovW(0) },
            paddingRight: { xs: pxToRem(20), md: 0 },
            paddingTop: { xs: pxToRem(10), md: pxTovW(10) },
            paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
            marginTop: { xs: pxToRem(10), md: pxTovW(10) },
            // backgroundColor: 'red',
            background: {
              xs: 'linear-gradient(to bottom, white 33%,#EAF4FC 33% 100%)',
              md: 'linear-gradient(to bottom, white 20%,#EAF4FC 20% 80%,white 66% 100%)',
            },
            overflowX: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {lessons?.length === 0 ? (
            <Box>
              <NoContentCard
                variant="white"
                icon="coming-soon-yellow"
                text="No Lessons to show"
              />
            </Box>
          ) : (
            <Grid
              container
              columns={{ xs: 12, md: 2 }}
              sx={{
                width: { xs: 'max-content', md: '100%' },
                display: 'flex',
                justifyContent: 'flex-start',
                overflowX: 'scroll',
              }}
              // sx={{ backgroundColor: 'red' }}
              rowGap={4}
              columnGap={{ xs: 3, md: 0 }}
            >
              {lessons?.map((lesson, index) => (
                <Grid
                  item
                  xs="auto"
                  md={1}
                  key={`lesson_${index}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                  }}
                >
                  <InfoDisplayPanel
                    defaultImage="lessonplan-v1"
                    variant="small"
                    mainHeading={lesson.title}
                    iconDetails={[
                      {
                        iconName: 'clock',
                        text: (lesson.estimatedTimeInMin || 0) + ' Min',
                      },
                      {
                        iconName: 'questions',
                        text: lesson.resourceIds.length + ' resources',
                      },
                    ]}
                    rootStyle={{
                      backgroundColor: 'common.white',
                    }}
                    image={getMediaBasePath(
                      lesson.posterImageUrl,
                      'processedMediaBucket'
                    )}
                    lastSessionTime={
                      lesson.lastSessionTime
                        ? 'Taught ' +
                        getHumanReadableTimestampString(
                          lesson.lastSessionTime
                        )
                        : ''
                    }
                    cardClickHandler={() =>
                      onLessonCardClick(
                        dispatch,
                        navigate,
                        {
                          lessonId: lesson.lessonId,
                          subjectId,
                          topicId,
                        },
                        location.pathname
                      )
                    }
                    userName={lesson.teacherName}
                    userImage={lesson.teacherProfileImageUrl}
                    status={<InfoDisplayPanelStatus lesson={lesson} />}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

interface InfoDisplayPanelStatus {
  lesson: LessonInfo;
}
const InfoDisplayPanelStatus = ({ lesson }: InfoDisplayPanelStatus) => {
  const taughtTime = getHumanReadableTimestampString(
    lesson.lastSessionTime
  )?.split(' ');
  const editTime = getHumanReadableTimestampString(lesson.modifiedOn)?.split(
    ' '
  );

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
          name="geneo-blue"
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

      {lesson.teacherName && (
        <Typography variant="subText" color="text.disabled">
          {taughtTime
            ? 'Taught ' + taughtTime
            : editTime && Number(editTime[0]) < 2
              ? 'Recently Edited'
              : 'Edited ' + editTime?.join(' ')}
        </Typography>
      )}
    </Box>
  );
};
