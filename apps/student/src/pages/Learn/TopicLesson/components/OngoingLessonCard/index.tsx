import {
  ChapterInfoCard,
  IStyles,
  deserify,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../reduxStore/reduxHooks';
import { onLessonCardClick } from '../../../../../utils/learn';

const styles: IStyles = {};

export const OngoingLessonCard = () => {
  const { subject_id } = useParams();
  const subjectId = Number(subject_id);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selected_module_lessons } = deserify(
    useAppSelector((state) => state.learn)
  );
  const lessons: LessonInfo[] = selected_module_lessons?.lessons || [];

  const ongoinglesson =
    lessons.find((lesson) => !!lesson.resourceIds.length) || lessons[0];
  // const ongoinglesson =
  //   lessons
  //     .filter((lesson) => lesson.resourceIds.length > 0) // Filter out lessons with no resourceIds
  //     .sort(
  //       (a, b) =>
  //         (b.lastSessionTime?.toDate().getTime() ?? 0) -
  //         (a.lastSessionTime?.toDate().getTime() ?? 0)
  //     )[0] || lessons[0];
  const location = useLocation();
  const dispatch = useDispatch();
  if (!ongoinglesson) {
    return null;
  }
  const lessonId = ongoinglesson.lessonId;
  const topicId = ongoinglesson.moduleId;

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ marginBottom: { xs: pxToRem(15), md: pxTovW(15) } }}
      >
        Ongoing Lesson
      </Typography>
      <ChapterInfoCard
        variant="medium"
        mainHeading={ongoinglesson.title}
        image={getMediaBasePath(
          ongoinglesson.posterImageUrl,
          'processedMediaBucket'
        )}
        iconDetails={[
          {
            iconName: 'clock',
            text: ongoinglesson.estimatedTimeInMin + ' Min',
          },
          {
            iconName: 'questions',
            text: ongoinglesson.resourceIds.length + ' Resources',
          },
        ]}
        withArrow={!isMobile}
        rootStyle={{
          cursor: 'pointer',
        }}
        tagName={isMobile ? undefined : 'Ongoing'}
        cardClickHandler={() => {
          if (lessonId) {
            onLessonCardClick(
              dispatch,
              navigate,
              {
                lessonId,
                subjectId,
                topicId,
              },
              location.pathname
            );
          }
        }}
      />
    </Box>
  );
};
