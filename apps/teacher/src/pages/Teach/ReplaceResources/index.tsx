import { useNavigate, useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import {
  ChipBadge,
  ContentDetailCard,
  IStyles,
  NoContentCard,
  SectionListWithTopCarousel,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';

import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { LessonContent } from '@protos/learning_management/lms.lesson.common.apis_pb';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { EDIT_LESSON_PLAN } from '../../../routeHandling/RoutesNomenclature';
import { resourceTypeName } from '../../../utils/functions';
import { onResourceClick } from '../../../utils/resource';
import { setLessonContent } from '../reducer/teach.slice';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import { ResourceShimmer } from '../LessonPlanLists/shimmer';
import { ReplaceLpPopup } from 'apps/teacher/src/components/ReplaceLpPopup';

const styles: IStyles = {
  root: {
    // width: '100vw',
    bgcolor: 'neutral.paleGrey',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: pxToRem(20), md: pxTovW(56) },
    padding: { xs: `${pxTovW(28)} 0`, md: `${pxTovW(48)} ${pxTovW(240)}` },
  },
  rightPanel: {
    flexBasis: { md: pxTovW(670) },
    padding: pxTovW(20),
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: ' 0px 0px 11px #E7E7E74A',
  },
  leftPanel: {
    flexBasis: { md: pxTovW(765) },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(40) },
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
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
};
export default function ReplaceResources() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [totalResources, setTotalResources] = useState(0);
  const teacher_id = getLocalStorage('userId');

  // index at which we will add the new Resource
  const { subject_id, topic_id, lesson_id, resource_index } = useParams();

  // Copy of the selected Lesson Plan
  const { selected_lessons_info } = deserify(
    useAppSelector((state) => state.teach)
  );

  // Getting all the Topic/Teaching Resources
  const topicResources = deserify(
    useAppSelector((state) => state.teach.topic_resources)
  );
  // console.log('topicResources:', topicResources);

  // Getting all the Lesson content
  const { lessons_content } = deserify(useAppSelector((state) => state.teach));
  // if (resource_index)
  // console.log(
  //   'lessons_content:',
  //   lessons_content?.resources[Number(resource_index)]
  // );
  const [newResource, setNewResource] = useState<ResourceInfo>();
  const [replacePopup, setReplacePopup] = useState(false);
  const cardClick = (res: ResourceInfo) => {
    const hasResource = lessons_content?.resources.some(
      (obj) => obj.resourceId === res.resourceId
    );

    if (hasResource) {
      dispatch(
        setToastInfo({
          variant: 'info',
          label: 'Resource already present',
          open: true,
        })
      );
    } else {
      onResourceClick(
        navigate,
        {
          resourceId: res.resourceId,
          subjectId: Number(subject_id),
          topicId: Number(topic_id),
          lessonId: lesson_id,
          resourceIndex: Number(resource_index),
        },
        SessionModeEnum.SESSION_MODE_RESOURCE,
        'replace'
      );
    }
  };

  // Adding chosen card details to lessons_content and fixing rank values
  const cardClickHandler = (resourceIndex: number, categoryIndex: number) => {
    const clickedCardDetail =
      topicResources?.categoryResourceMap[resourceIndex].categoryResources[
        categoryIndex
      ];

    let tempResources: ResourceInfo[];
    if (lessons_content && clickedCardDetail) {
      // array copy
      tempResources = [...lessons_content.resources];

      // replacing resource_index with clicked resource
      tempResources[Number(resource_index)] = clickedCardDetail;

      // rank fix
      tempResources.forEach((content, index) => {
        tempResources[index].rank = index + 1;
      });

      // copy of lessons_content and replacing value of resources
      const temp_lessons_content: LessonContent = JSON.parse(
        JSON.stringify(lessons_content)
      );
      temp_lessons_content.resources = tempResources;

      // redux update
      dispatch(setLessonContent(temp_lessons_content));

      navigate(`${EDIT_LESSON_PLAN}/${subject_id}/${topic_id}/${lesson_id}`);
    }
  };
  const countTotalResources = () => {
    let totalCount = 0;

    if (topicResources?.categoryResourceMap) {
      for (const item of topicResources.categoryResourceMap) {
        totalCount += item.categoryResources.length;
      }
    }
    // console.log(totalCount);
    return totalCount;
  };
  useEffect(() => {
    countTotalResources();
  }, []);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftPanel}>
        <Box sx={styles.textWithBadge}>
          <Typography variant="h1">Replace</Typography>
        </Box>

        <Box>
          <SectionListWithTopCarousel
            title={
              <Typography variant="h2">More Hook Options for You</Typography>
            }
            itemsToShow={2}
            containerMdWidth={pxTovW(745)}
            items={Array.from({ length: 6 }).map((e) => (
              <ContentDetailCard
                variant="medium"
                image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
                heading="Fluid Friction"
                iconDetails={cdcIconDetails}
              />
            ))}
          />
        </Box>

        <Box sx={styles.textWithBadge}>
          <Typography variant="h2">Your Current Selection</Typography>
        </Box>

        <Box>
          {lessons_content ? (
            <ContentDetailCard
              variant="large"
              // image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
              // heading="Fluid Friction"
              // iconDetails={cdcIconDetails}

              image={getMediaBasePath(
                lessons_content?.resources[Number(resource_index)]
                  .posterImageUrl,
                'processedMediaBucket'
              )}
              heading={lessons_content?.resources[Number(resource_index)].title}
              iconDetails={[
                {
                  iconName: 'clock',
                  text:
                    lessons_content?.resources[
                      Number(resource_index)
                    ].estimatedTimeInMin.toString() + ' min',
                },
                {
                  iconName: resourceTypeName(
                    lessons_content?.resources[Number(resource_index)]
                      .resourceType
                  ).icon,

                  text: resourceTypeName(
                    lessons_content?.resources[Number(resource_index)]
                      .resourceType
                  ).name,
                },
              ]}
            />
          ) : (
            <ResourceShimmer />
          )}
        </Box>
      </Box>
      <Box sx={styles.rightPanel}>
        <Box sx={styles.textWithBadge}>
          <Typography variant="h2">Other Resources</Typography>
          <Typography variant="h4">
            <ChipBadge
              label={countTotalResources()}
              color="primary"
              size="small"
            />
          </Typography>
        </Box>

        <Box sx={styles.cardsContainer}>
          {/* <SectionListWithTopCarousel
            title="Hooks"
            subtitle="Lorem ipsum dolor sit amet consectetur"
            itemsToShow={2}
            containerMdWidth={pxTovW(550)}
            items={Array.from({ length: 6 }).map((e) => (
              <ContentDetailCard
                variant="small"
                image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
                heading="Fluid Friction"
                iconDetails={cdcIconDetails}
              />
            ))}
          />
          <SectionListWithTopCarousel
            title="Explanations"
            subtitle="Lorem ipsum dolor sit amet consectetur"
            itemsToShow={2}
            containerMdWidth={pxTovW(550)}
            items={Array.from({ length: 6 }).map((e) => (
              <ContentDetailCard
                variant="small"
                image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
                heading="Fluid Friction"
                iconDetails={cdcIconDetails}
              />
            ))}
          />
          <SectionListWithTopCarousel
            title="Solved Examples"
            subtitle="Lorem ipsum dolor sit amet consectetur"
            itemsToShow={2}
            containerMdWidth={pxTovW(550)}
            items={Array.from({ length: 6 }).map((e) => (
              <ContentDetailCard
                variant="small"
                image={'/assets/shared-ui/tempAssets/lessonImage1.png'}
                heading="Fluid Friction"
                iconDetails={cdcIconDetails}
              />
            ))}
          /> */}

          {topicResources && topicResources.categoryResourceMap.length !== 0 ? (
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
                          key={categoryIndex}
                          onClick={
                            () => {
                              setNewResource(category);
                              setReplacePopup(true);
                            }
                            // cardClickHandler(resourceIndex, categoryIndex)
                          }
                          variant="small"
                          image={getMediaBasePath(
                            category.posterImageUrl,
                            'processedMediaBucket'
                          )}
                          heading={category.title}
                          iconDetails={[
                            {
                              iconName: 'clock',
                              text:
                                category.estimatedTimeInMin.toString() + ' min',
                            },
                            {
                              iconName: resourceTypeName(category.resourceType)
                                .icon,

                              text: resourceTypeName(category.resourceType)
                                .name,
                            },
                          ]}
                        />
                      )
                    )}
                  />
                )
              )}
            </>
          ) : (
            <NoContentCard
              variant="info"
              icon="cards"
              text="No Resources Available"
            />
          )}
        </Box>
      </Box>
      {/* <ReplaceLpPopup
        modalState={replacePopup}
        setModalState={setReplacePopup}
        currentLesson={
          lessons_content && lessons_content?.resources[Number(resource_index)]
        }
        newLesson={newResource && newResource}
        yesClickHandler={() => newResource && cardClick(newResource)}
        noClickHandler={() => setReplacePopup(false)}
      /> */}
    </Box>
  );
}
const cdcIconDetails = [
  {
    iconName: 'clock',
    text: '15 Min',
  },
  {
    iconName: 'questions',
    text: 'video',
  },
];
