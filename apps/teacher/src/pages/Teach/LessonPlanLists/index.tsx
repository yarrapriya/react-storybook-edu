import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';

import { Box, Typography, useMediaQuery } from '@mui/material';

import {
  ContentCommonAPIServiceV1Client,
  LessonCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ChipBadge,
  ContentDetailCard,
  IStyles,
  ImageWrapper,
  LessonPlanInfoPanel,
  SectionListWithTopCarousel,
  deserify,
  firstLetterImage,
  getHumanReadableTimestampString,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';

import { NoContentCard } from '@geneo2-web/shared-ui';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { LessonInfo } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import {
  TEACHING_FLOW,
  TEACH_TOPIC_SELECTION,
} from '../../../routeHandling/RoutesNomenclature';
import { resourceTypeName } from '../../../utils/functions';
import { onResourceClick } from '../../../utils/resource';
import { ReadymadeHomeworkSection } from '../../Homework/CreateHomework/components/ReadymadeHw';
import {
  setLessonPlanRedirectionPath,
  setLessonsByModule,
  setSelectedLessonInfo,
  setTopicResources,
} from '../reducer/teach.slice';
import { ReadylessonShimmer, ResourceShimmer } from './shimmer';

const styles: IStyles = {
  root: {
    padding: { md: `${pxTovW(40)} ${pxTovW(240)}` },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: pxToRem(20), md: pxTovW(50) },
  },
  leftPanel: { flexBasis: { md: pxTovW(424) } },
  rightPanel: { flexBasis: { md: pxTovW(670) } },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(5), md: pxTovW(10) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    paddingLeft: { xs: pxToRem(20), md: 0 },
    paddingTop: { xs: pxToRem(20), md: 0 },
  },
  textWithBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    padding: { xs: pxToRem(20), md: 0 },
  },
  cardsContainer: {
    paddingTop: pxTovW(20),
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(25), md: pxTovW(20) },
  },

  twoLineClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    width: '90%',
  },
};

interface FetchFuncArg {
  subjectId: string;
  chapterId: string;
  topicId: string;
}

export default function LessonPlanLists() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [lpLoading, setLpLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const [resourceLoading, setResourceLoading] = useState<
    'loading' | 'completed' | 'error'
  >('completed');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const teacher_id = getLocalStorage('userId');
  const { subject_id, chapter_id, topic_id } = useParams();
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const location = useLocation();

  const { selected_topic_info } = deserify(
    useAppSelector((state) => state.teach)
  );
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);

  const { setSelectedFunction } = useGlobalContext();

  const backButtonClick = async () => {
    navigate(`${TEACH_TOPIC_SELECTION}/${subject_id}/${chapter_id}`);
  };

  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const lpInfoPanelClickHandler = (lessonInfo: LessonInfo) => {
    dispatch(setSelectedLessonInfo(lessonInfo));

    navigate(
      `${TEACHING_FLOW}/${subject_id}/${topic_id}/${lessonInfo.lessonId}`
    );
  };

  // Getting all the Lesson PLans by Module
  const lessonPlans = deserify(
    useAppSelector((state) => state.teach.lessons_by_module)
  );
  // console.log('lessonPlans: ', lessonPlans);

  async function fetchLessonsByModule(topicId: string) {
    try {
      setLpLoading('loading');

      const response =
        await LessonCommonAPIServiceV1Client.fetchLessonsByModule({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          // subjectId: Number(subjectId),
          // chapterId: Number(chapterId),
          moduleId: Number(topicId),
          sectionId: class_subject_info?.sectionId
        });
      if (response) {
        setLpLoading('completed');

        if (response?.data) {
          // sort here
          const sortedData = response.data?.lessons.sort((a, b) =>
            a.lastSessionTime && b.lastSessionTime
              ? Number(b.lastSessionTime?.seconds) -
              Number(a.lastSessionTime?.seconds)
              : Number(b.modifiedOn?.seconds) - Number(a.modifiedOn?.seconds)
          );

          response.data.lessons = sortedData;
          dispatch(setLessonsByModule(response.data));
        }
      }

      // setLoading(false);
    } catch (err) {
      setLpLoading('error');
      console.log(err);
    }
  }

  // Getting all the Topic/Teaching Resources
  const topicResources = deserify(
    useAppSelector((state) => state.teach.topic_resources)
  );
  // console.log('topicResources:', topicResources);

  async function fetchTopicResources({
    subjectId,
    chapterId,
    topicId,
  }: FetchFuncArg) {
    try {
      setResourceLoading('loading');
      const response =
        await ContentCommonAPIServiceV1Client.fetchTopicResources({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          chapterId: Number(chapterId),
          topicId: Number(topicId),
        });
      if (response) {
        setResourceLoading('completed');
        if (response?.data) {
          response.data.categoryResourceMap.forEach((elem) => {
            elem.categoryResources.sort((a, b) => a.rank - b.rank);
          });
          const data = response.data;
          // console.log(typeof data, data);
          dispatch(setTopicResources(data));
        }
      }

      // setLoading(false);
    } catch (err) {
      setResourceLoading('error');
      // setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    if (subject_id && chapter_id && topic_id) {
      fetchTopicResources({
        subjectId: subject_id,
        chapterId: chapter_id,
        topicId: topic_id,
      });
    }

    if (topic_id) fetchLessonsByModule(topic_id);
  }, [chapter_id]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftPanel}>
        <Box sx={styles.header}>
          <Typography variant="h1" sx={styles.twoLineClamp}>
            {selected_topic_info?.topicTitle}
          </Typography>
          <Typography variant="cardText" sx={{ color: '#007CDC' }}>
            {/* Class 8A | Science */}
            {class_subject_info
              ? 'Class ' +
              class_subject_info?.classname +
              class_subject_info?.section +
              ' | ' +
              class_subject_info?.subject
              : ''}
          </Typography>
        </Box>

        {lpLoading === 'loading' ? (
          <ReadylessonShimmer />
        ) : lessonPlans && lessonPlans.lessons.length > 0 ? (
          <ReadymadeHomeworkSection
            isError={lpLoading === 'error'}
            sectionTitle="Ready Lesson Plans"
            items={
              lessonPlans.lessons?.map((lesson, lessonIndex) => (
                <LessonPlanInfoPanel
                  key={lessonIndex}
                  variant={isMobile ? 'small' : 'large'}
                  image={getMediaBasePath(
                    lesson.posterImageUrl,
                    'processedMediaBucket'
                  )}
                  mainHeading={lesson.title}
                  onClick={() => {
                    dispatch(setLessonPlanRedirectionPath(location.pathname));
                    lpInfoPanelClickHandler(lesson);
                  }}
                  iconDetails={[
                    {
                      iconName: 'clock',
                      text: `${lesson.estimatedTimeInMin || 0} Min`,
                    },
                    {
                      iconName: 'questions',
                      text:
                        lesson.resourceIds.length > 1
                          ? `${lesson.resourceIds.length} resources`
                          : `${lesson.resourceIds.length} resource`,
                    },
                  ]}
                  status={<LessonPlanInfoPanelStatus lesson={lesson} />}
                  rootStyle={{
                    width: { xs: pxToRem(199), md: pxTovW(295) },
                    height: { xs: pxToRem(241), md: pxTovW(332) },
                  }}
                />
              ))
              // []
            }
          />
        ) : (
          //   <Box sx={{ p: { xs: pxToRem(20), md: pxTovW(40) } }}>
          //   <NoContentCard
          //     variant="info"
          //     icon="cards"
          //     text="No cards to show"
          //   />
          // </Box>

          <NoContentCard
            variant="white"
            icon="coming-soon-yellow"
            text="No Lessons to show"
            rootStyle={{
              width: { xs: '100vw', md: pxTovW(741) },
              boxSizing: 'border-box',
              flexDirection: 'column',
              gap: { xs: pxToRem(20), md: pxTovW(20) },
            }}
          />
        )}
      </Box>

      <Box sx={styles.rightPanel}>
        <Box sx={styles.textWithBadge}>
          <Typography variant="h2">Teaching Resources</Typography>
          <Typography variant="h4">
            <ChipBadge
              label={
                topicResources?.categoryResourceMap
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
        ) : !topicResources ||
          topicResources.categoryResourceMap.length === 0 ? (
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
        ) : (
          <Box sx={styles.cardsContainer}>
            <>
              {topicResources.categoryResourceMap.map(
                (resource, resourceIndex) => (
                  <SectionListWithTopCarousel
                    key={resourceIndex}
                    title={resource.categoryTitle}
                    subtitle={resource.categoryDescription}
                    itemsToShow={2}
                    containerMdWidth={pxTovW(550)}
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
                                topicId: Number(topic_id),
                              },
                              SessionModeEnum.SESSION_MODE_TEACH
                            )
                          }
                          key={categoryIndex}
                          variant="small"
                          image={getMediaBasePath(
                            category.posterImageUrl,
                            'processedMediaBucket'
                          )}
                          heading={category.title}
                          iconDetails={iconDetailsCDC(category)}
                        />
                      )
                    )}
                  />
                )
              )}
            </>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const iconDetailsCDC = (resource: ResourceInfo) => {
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

interface InfoDisplayPanelStatus {
  lesson: LessonInfo;
}
const LessonPlanInfoPanelStatus = ({ lesson }: InfoDisplayPanelStatus) => {
  const { user_info } = deserify(useAppSelector((state) => state.auth));
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
          {user_info?.teacherProfileId.toString() ===
            lesson.createdBy.toString()
            ? 'You'
            : lesson.teacherName || 'Geneo'}
        </Typography>
      </Box>

      <Box>
        {lesson.lastSessionTime ? (
          <Typography variant="subText" color="text.disabled">
            {taughtTime && Number(taughtTime[0]) < 2
              ? 'Taught Today'
              : 'Taught ' + taughtTime?.join(' ')}
          </Typography>
        ) : (
          editTime &&
          lesson.teacherName &&
          !lesson.lastSessionTime && (
            <Typography variant="subText" color="text.disabled">
              {Number(editTime[0]) < 2
                ? 'Recently Edited'
                : 'Edited ' + editTime?.join(' ')}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
};
