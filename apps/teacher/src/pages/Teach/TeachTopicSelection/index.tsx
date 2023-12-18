import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';

import { Box, Typography } from '@mui/material';

import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChapterSelectedCard,
  ChipBadge,
  ContentDetailCard,
  IStyles,
  Loader,
  NoContentCard,
  SectionListWithTopCarousel,
  TopicCard,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import {
  ChapterTopicMiniInfo,
  ResourceInfo,
  SubjectChapterMiniInfo,
} from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import {
  LESSON_PLAN_LISTS,
  TEACH_CHAPTER_SELECTION,
} from '../../../routeHandling/RoutesNomenclature';
import { resourceTypeName } from '../../../utils/functions';
import { onResourceClick } from '../../../utils/resource';
import { ResourceShimmer } from '../LessonPlanLists/shimmer';
import {
  setChapterResources,
  setChapterTopicInfo,
  setSelectedTopic,
} from '../reducer/teach.slice';

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
    padding: {
      xs: `${pxToRem(20)} ${pxToRem(20)} ${pxToRem(5)} ${pxToRem(20)}`,
      md: 0,
    },
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
    // gap: { xs: pxToRem(25) },
    gap: { xs: pxToRem(7), md: pxTovW(18) },
  },
  topicBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    '& > div': { borderBottom: '1px solid #C6C6C6' },
  },
};

interface FetchFuncArg {
  subjectId: string;
  chapterId: string;
}

export default function TeachTopicSelection() {
  const [topicLoading, setTopicLoading] = useState<
    'loading' | 'completed' | 'error'
  >('completed');
  const [resourceLoading, setResourceLoading] = useState<
    'loading' | 'completed' | 'error'
  >('completed');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const teacher_id = getLocalStorage('userId');
  const { subject_id, chapter_id } = useParams();

  const { setSelectedFunction } = useGlobalContext();

  useEffect(() => {
    // Back button functionality
    const redirectToTeachDashboard = async () => {
      navigate(`${TEACH_CHAPTER_SELECTION}/${subject_id}`);
    };
    setSelectedFunction(() => redirectToTeachDashboard);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const topicNavigation = (topicInfo: ChapterTopicMiniInfo) => {
    dispatch(setSelectedTopic(topicInfo));
    navigate(
      `${LESSON_PLAN_LISTS}/${subject_id}/${chapter_id}/${topicInfo.topicId}`
    );
  };

  // Getting Data for ChapterSelectedCard
  const { subject_chapter_info } = deserify(
    useAppSelector((state) => state.teach)
  );
  // console.log('subject_chapter_info:', subject_chapter_info);
  // Getting Data for ChapterSelectedCard
  const findSelectedChapterData = () => {
    const selectedChapter = subject_chapter_info?.response.find(
      (chapter: SubjectChapterMiniInfo) =>
        chapter_id && +chapter_id === chapter.chapterId
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

  // Getting all the Topics in chapter
  const { subject_topic_info } = deserify(
    useAppSelector((state) => state.teach)
  );

  // Getting all the Chapter Resources
  const { chapter_resources } = deserify(
    useAppSelector((state) => state.teach)
  );

  // Getting current class and subject selected
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);

  async function fetchChapterTopicInfo({ subjectId, chapterId }: FetchFuncArg) {
    try {
      setTopicLoading('loading');

      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterTopicInfo({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          chapterId: Number(chapterId),
          sectionId: class_subject_info?.sectionId,
        });
      if (response) {
        setTopicLoading('completed');
        if (response?.data) {
          const data = response.data;
          // console.log(typeof data, data);

          data.chapterTopics.sort((a, b) => a.topicNo - b.topicNo);
          dispatch(setChapterTopicInfo(data));
        }
      }

      // setLoading(false);
    } catch (err) {
      setTopicLoading('error');
      console.log(err);
    }
  }

  async function fetchChapterResources({ subjectId, chapterId }: FetchFuncArg) {
    try {
      // setLoading(true);
      setResourceLoading('loading');

      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterResources({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          chapterId: Number(chapterId),
        });
      if (response) {
        setResourceLoading('completed');
        if (response?.data) {
          const data = response.data;
          // console.log(typeof data, data);
          dispatch(setChapterResources(data));
        }
      }

      // setLoading(false);
    } catch (err) {
      setResourceLoading('error');
      // setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    // fetchChapterTopicInfo();
    // fetchChapterResources();

    if (subject_id && chapter_id) {
      fetchChapterTopicInfo({ subjectId: subject_id, chapterId: chapter_id });

      fetchChapterResources({ subjectId: subject_id, chapterId: chapter_id });
    }
  }, [chapter_id]);

  const findChapter = () => {
    const retValue = subject_chapter_info?.response.find(
      (chapter) => chapter.chapterId === Number(chapter_id)
    );

    return retValue;
  };

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
                label={subject_topic_info?.chapterTopics.length}
                color="primary"
                size="small"
                sx={{ display: { xs: 'none', md: 'unset' } }}
              />
            </Typography>
          </Box>

          {topicLoading === 'loading' ? (
            <Loader />
          ) : topicLoading === 'error' ? (
            <NoContentCard variant="error" icon="error" text="Error Occured" />
          ) : subject_topic_info ? (
            <Box sx={styles.topicBox}>
              {subject_topic_info.chapterTopics.length === 0 ? (
                <Box>
                  <NoContentCard
                    variant="white"
                    icon="coming-soon-yellow"
                    text="No topics to show"
                  />
                </Box>
              ) : (
                subject_topic_info?.chapterTopics.map((topics, index) => (
                  <TopicCard
                    key={index}
                    title={topics.topicTitle}
                    // title={`${findChapter()?.chapterNo}.${index + 1} ${topics.topicTitle
                    //   }`}
                    lessonPlanCount={topics.topicContentStats?.lessonCount}
                    questionsCount={topics.topicContentStats?.questionCount}
                    viewAllClickHandler={() => topicNavigation(topics)}
                    rootStyle={{
                      padding: {
                        xs: `${pxToRem(14)} ${pxToRem(5)} ${pxToRem(
                          14
                        )} ${pxToRem(20)}`,
                        md: `${pxTovW(14)} ${pxTovW(32)}`,
                      },
                    }}
                  />
                ))
              )}
            </Box>
          ) : (
            <NoContentCard
              variant="white"
              icon="coming-soon-yellow"
              text="No topics to show"
              rootStyle={{
                flexDirection: 'column',
                gap: { xs: pxToRem(20), md: pxTovW(20) },
              }}
            />
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

        {resourceLoading === 'loading' ? (
          <ResourceShimmer />
        ) : resourceLoading === 'error' ? (
          <Box sx={{ p: { xs: pxToRem(20), md: pxTovW(40) } }}>
            <NoContentCard variant="error" icon="error" text="Error Occured" />
          </Box>
        ) : (
          <Box>
            {chapter_resources &&
            chapter_resources.categoryResourceMap.length > 0 ? (
              <>
                {chapter_resources.categoryResourceMap.map(
                  (resource, resourceIndex) => (
                    <SectionListWithTopCarousel
                      key={resourceIndex}
                      title={resource.categoryTitle}
                      subtitle={resource.categoryDescription}
                      itemsToShow={3}
                      containerMdWidth={pxTovW(855)}
                      items={resource.categoryResources.map(
                        (category, categoryIndex) => (
                          <ContentDetailCard
                            onClick={() =>
                              onResourceClick(
                                navigate,
                                {
                                  resourceId: category.resourceId,
                                  subjectId: Number(subject_id),
                                  chapterId: Number(chapter_id),
                                },
                                SessionModeEnum.SESSION_MODE_RESOURCE
                              )
                            }
                            key={categoryIndex}
                            variant="small"
                            image={getMediaBasePath(
                              category.posterImageUrl,
                              'processedMediaBucket'
                            )}
                            heading={category.title}
                            iconDetails={iconDetails(category)}
                          />
                        )
                      )}
                    />
                  )
                )}
              </>
            ) : (
              <NoContentCard
                variant="soon"
                icon="hourglass-web"
                text="Coming Soon!"
                rootStyle={{
                  height: { xs: pxToRem(150), md: pxTovW(212) },
                  boxSizing: 'border-box',
                  mt: { xs: pxToRem(20), md: pxTovW(40) },
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

const iconDetails = (resource: ResourceInfo) => {
  const retValue = [
    {
      iconName: 'clock',
      text: `${resource.estimatedTimeInMin} Min`,
    },

    {
      iconName: resourceTypeName(resource.resourceType).icon,
      text: resourceTypeName(resource.resourceType).name,
    },
  ];

  return retValue;
};
