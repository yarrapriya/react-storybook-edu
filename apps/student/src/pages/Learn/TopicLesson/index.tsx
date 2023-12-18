import { IStyles, deserify, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { LEARN_TOPIC_SELECTION } from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import { OngoingLessonCard } from './components/OngoingLessonCard';
import { TopicLessonList } from './components/TopicLessonsList';
import { TopicResources } from './components/TopicResources';

const styles: IStyles = {
  root: {
    width: '100vw',
    // display: 'flex',
    // flexDirection: 'column',
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    maxWidth: {
      xs: '100%',
      md: '80%',
    },
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(24), md: pxTovW(48) },
    margin: '0 auto',
    paddingX: { xs: pxToRem(20), md: 0 },
  },
  bodySection: {
    display: 'flex',
    gap: { xs: pxToRem(48), md: pxTovW(48) },
    flexDirection: { xs: 'column', md: 'row' },
    maxWidth: {
      xs: '100%',
      md: '80%',
    },
    margin: '0 auto',
  },

  twoLineClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    // width: '90%',
  },
};
export const TopicLesson = () => {
  const { subject_id, topic_id, chapter_id } = useParams();
  const selectedTopicId = Number(topic_id);
  const subjectId = Number(subject_id);
  const moduleLessons = deserify(
    useAppSelector((state) => state.learn.selected_module_lessons)
  );
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const learnSubjects = user?.learnSubjects || [];
  const subMap = getSubjectsMap(learnSubjects);
  const navigate = useNavigate();
  const { setSelectedFunction } = useGlobalContext();
  const { selected_module_lessons } = deserify(
    useAppSelector((state) => state.learn)
  );
  useEffect(() => {
    const redirectToLearnDashboard = async () => {
      navigate(`${LEARN_TOPIC_SELECTION}/${subjectId}/${chapter_id}`);
    };
    setSelectedFunction(() => redirectToLearnDashboard);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', md: '50%' },
            gap: pxToRem(10),
          }}
        >
          <Typography variant="h1" sx={styles.twoLineClamp}>
            {moduleLessons?.topicInfo?.topicTitle}
          </Typography>
          <Typography variant="cardText" sx={{ color: '#007CDC' }}>
            {subjectId ? subMap[subjectId].subjectName || '' : ''}
          </Typography>
        </Box>
        {selected_module_lessons && <OngoingLessonCard />}
      </Box>

      <Box sx={styles.bodySection}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <TopicLessonList />
        </Box>
        <Box sx={{ width: { xs: '100%', md: `calc(50% - ${pxTovW(48)})` } }}>
          <TopicResources />
        </Box>
      </Box>
    </Box>
  );
};
