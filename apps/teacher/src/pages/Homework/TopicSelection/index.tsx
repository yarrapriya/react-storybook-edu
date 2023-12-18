import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';

import { Box, Typography } from '@mui/material';

import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChapterSelectedCard,
  ChipBadge,
  IStyles,
  Loader,
  NoContentCard,
  TopicCard,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import {
  HOMEWORK_CHAPTER_SELECTION,
  HOMEWORK_CREATE,
} from '../../../routeHandling/RoutesNomenclature';
import {
  resetSelectedTasksInfo,
  setChapterWiseTopicInfo,
} from '../reducer/homework.slice';
import ChapterResourcesDisplay from './components/ChapterResourcesDisplay';

const styles: IStyles = {
  root: {
    boxSizing: 'border-box',
    backgroundColor: 'neutral.paleGrey',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: pxTovW(25),
    padding: { md: `${pxTovW(14)} ${pxTovW(240)}` },
    paddingTop: { md: pxTovW(40) },
  },
  textWithBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(14), md: pxTovW(10) },
    paddingX: { xs: pxToRem(20), md: 0 },
  },
  topicContainer: {
    flexBasis: { xs: '100%', md: pxTovW(554) },
    // maxWidth: { md: pxTovW(554) },
    // paddingLeft: { md: pxTovW(246) },
    // paddingBottom: { xs: pxToRem(20), md: pxTovW(46) },
  },
  chapterBox: {
    padding: { xs: pxToRem(20), md: 0 },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(46) },
  },
  resourceContainer: {
    flexBasis: { xs: '100%', md: pxTovW(862) },
  },
  chooseTopicBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(7), md: pxTovW(18) },
  },
  topicBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    '& > div': {
      borderBottom: '1px solid lightgrey',
      padding: { xs: pxToRem(20) },
    },
  },
};
export default function TeachTopicSelection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { subject_id, chapter_id } = useParams();
  const teacher_id = getLocalStorage('userId');
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const topicNavigation = (topicId?: string) => {
    navigate(`${HOMEWORK_CREATE}/${topicId}`);
  };
  const { setSelectedFunction } = useGlobalContext();

  // Getting Data for ChapterSelectedCard
  const { subjectwise_chapters_info } = deserify(
    useAppSelector((state) => state.homework)
  );
  // Getting all the Topics in chapter
  const { chapterwise_topic } = deserify(
    useAppSelector((state) => state.homework)
  );

  useEffect(() => {
    const onBackClick = () => {
      navigate(`${HOMEWORK_CHAPTER_SELECTION}/${subject_id}`);
    };
    setSelectedFunction(() => onBackClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const findSelectedChapterData = () => {
    const selectedChapter = subjectwise_chapters_info?.response.find(
      (chapter) => chapter_id && +chapter_id === chapter.chapterId
    );
    if (selectedChapter) {
      return {
        name: selectedChapter.chapterTitle,
        image: getMediaBasePath(
          selectedChapter.posterImagesUrl,
          'processedMediaBucket'
        ),
      };
    }
    return { name: '', image: '' };
  };

  // Getting all the Chapter Resources
  const { chapter_resources } = deserify(
    useAppSelector((state) => state.homework)
  );

  // Getting current class and subject selected
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);

  async function fetchChapterTopicInfo({
    subjectId,
    chapterId,
  }: {
    subjectId: string;
    chapterId: string;
  }) {
    try {
      setLoading('loading');

      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterTopicInfo({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          chapterId: Number(chapterId),
          sectionId: class_subject_info?.sectionId,
        });

      if (response?.data) {
        const data = response.data;
        // console.log(typeof data, data);
        data.chapterTopics.sort((a, b) => a.topicNo - b.topicNo);
        dispatch(setChapterWiseTopicInfo(data));
      } else {
        // setError(new Error('Login failed'));
      }

      setLoading('completed');
    } catch (err) {
      setLoading('error');
      // setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    // if (chapter_id) fetchChapterTopicInfo();
    if (subject_id && chapter_id) {
      fetchChapterTopicInfo({ subjectId: subject_id, chapterId: chapter_id });

      dispatch(resetSelectedTasksInfo());
    }
  }, [chapter_id]);
  // console.log('subject_topic_info', chapterwise_topic);
  return (
    <Box sx={styles.root}>
      <Box sx={styles.topicContainer}>
        <Box sx={styles.chapterBox}>
          <ChapterSelectedCard
            image={findSelectedChapterData().image}
            chapterName={
              findSelectedChapterData().name
                ? findSelectedChapterData().name
                : ''
            }
            className={
              class_subject_info
                ? class_subject_info?.classname + class_subject_info?.section
                : ''
            }
            subject={class_subject_info ? class_subject_info?.subject : ''}
          />
        </Box>

        <Box sx={styles.chooseTopicBox}>
          <Box sx={styles.textWithBadge}>
            <Typography variant="h2">Choose a Topic</Typography>
            <Typography variant="h3">
              <ChipBadge
                label={chapterwise_topic?.chapterTopics.length}
                color="primary"
                size="small"
              />
            </Typography>
          </Box>

          {loading === 'loading' ? (
            <Loader />
          ) : loading === 'error' ? (
            <NoContentCard variant="error" icon="error" text="Error Occured" />
          ) : chapterwise_topic &&
            chapterwise_topic.chapterTopics.length > 0 ? (
            <Box sx={styles.topicBox}>
              {chapterwise_topic?.chapterTopics.map((topics, index) => (
                <TopicCard
                  key={index}
                  title={topics.topicTitle}
                  lessonPlanCount={topics.topicContentStats?.lessonCount}
                  questionsCount={topics.topicContentStats?.questionCount}
                  viewAllClickHandler={() =>
                    topicNavigation(topics.topicId.toString())
                  }
                />
              ))}
            </Box>
          ) : (
            <Box>
              <NoContentCard
                variant="white"
                icon="coming-soon-yellow"
                text="No topics to show"
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* right panel */}
      <Box sx={styles.resourceContainer}>
        <Box
          sx={{ ...styles.textWithBadge, paddingY: { xs: pxToRem(20), md: 0 } }}
        >
          <Typography variant="h2">Chapter Resources</Typography>
          <Typography variant="h3">
            <ChipBadge
              label={
                chapter_resources?.categoryResourceMap
                  ?.map((obj) => obj.categoryResources.length)
                  .reduce((a, b) => a + b, 0) || 0
              }
              color="primary"
              size="small"
            />
          </Typography>
        </Box>
        <Box>
          <ChapterResourcesDisplay />
        </Box>
      </Box>
    </Box>
  );
}
