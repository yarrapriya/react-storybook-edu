import {
  ChapterSelectedCard,
  IStyles,
  deserify,
  getMediaBasePath,
  pxToRem,
  pxTovW
} from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { LEARN_DASHBOARD } from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import SelectedChapterResources from './components/ChapterResources';
import ChooseTopic from './components/ChooseTopic';

const styles: IStyles = {
  root: {
    backgroundColor: 'neutral.paleGrey',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: pxTovW(25),
    paddingTop: { md: pxTovW(40) },
    width: {
      xs: '100%',
      md: '80%',
    },
    margin: '0 auto',
  },
  topicContainer: {
    paddingBottom: { xs: pxToRem(20), md: pxTovW(46) },
    width: {
      xs: '100%',
      md: '40%',
    },
  },
  chapterBox: {
    padding: { xs: pxToRem(20), md: 0 },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(46) },
  },
  resourceContainer: {
    width: {
      xs: '100%',
      md: `calc(60% - ${pxTovW(25)})`,
    },
  },
  chooseTopicBox: {
    display: 'flex',
    gap: { xs: pxToRem(7), md: pxTovW(18) },
    flexDirection: 'column',
  }
};
export default function LearnTopicSelection() {
  const { subject_id, chapter_id } = useParams();
  const selectedSubjectId = Number(subject_id);
  const selectedChapterId = Number(chapter_id);
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const user = deserify(useAppSelector(state => state.auth.userInfo))

  const chapterTopic = deserify(
    useAppSelector((state) => state.learn.selected_chapter_topic_info)
  );
  const navigate = useNavigate();
  const { setSelectedFunction } = useGlobalContext();

  useEffect(() => {
    const redirectToLearnDashboard = async () => {
      navigate(`${LEARN_DASHBOARD}/${selectedSubjectId}`);
    };
    setSelectedFunction(() => redirectToLearnDashboard);
    return () => {
      setSelectedFunction(null);
    };
  }, [])

  const getSubjectName = () => {
    if (typeof selectedSubjectId == 'number') {
      return subMap[selectedSubjectId].subjectName;
    } else {
      return "Invalid Subject"
    }
  }

  const getClassDetails = () => {
    if (user?.classSectionDetails?.className) {
      return user?.classSectionDetails?.className + (user?.classSectionDetails?.sectionName || "")
    }
    return ''
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.topicContainer}>
        <Box sx={styles.chapterBox}>
          <ChapterSelectedCard
            chapterName={chapterTopic?.chapterInfo?.chapterTitle || "Invalid Chapter"}
            image={getMediaBasePath(chapterTopic?.chapterInfo?.posterImagesUrl, 'processedMediaBucket')}
            className={getClassDetails()}
            subject={getSubjectName()}
          />
        </Box>
        <Box sx={styles.chooseTopicBox}>
          <ChooseTopic />
        </Box>
      </Box>
      <Box sx={styles.resourceContainer}>
        <SelectedChapterResources />
      </Box>
    </Box>
  );
}
