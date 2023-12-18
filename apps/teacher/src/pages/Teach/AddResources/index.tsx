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
import { Box, Typography } from '@mui/material';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { resourceTypeName } from '../../../utils/functions';
import { onResourceClick } from '../../../utils/resource';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';

const styles: IStyles = {
  root: {
    // width: '100vw',
    bgcolor: 'neutral.paleGrey',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: { md: 'space-between' },
    // gap: { md: pxTovW(509) },
    padding: { xs: `${pxTovW(28)} 0`, md: `${pxTovW(48)} ${pxTovW(240)}` },
  },
  rightPanel: {
    flexBasis: { md: pxTovW(670) },
    padding: pxTovW(20),
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: ' 0px 0px 11px #E7E7E74A',
  },
  leftPanel: { flexBasis: { md: pxTovW(320) } },

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

export default function AddResources() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const teacher_id = getLocalStorage('userId');

  // Copy of the selected Lesson Plan
  const { selected_lessons_info } = deserify(
    useAppSelector((state) => state.teach)
  );
  // console.log('selected_lessons_info: ', selected_lessons_info);

  // index at which we will add the new Resource
  const { subject_id, topic_id, lesson_id, resource_index } = useParams();

  // Getting all the Topic/Teaching Resources
  const topicResources = deserify(
    useAppSelector((state) => state.teach.topic_resources)
  );
  // console.log('topicResources:', topicResources);

  // Getting all the Lesson content
  const { lessons_content } = deserify(useAppSelector((state) => state.teach));

  // ----------------------------------------------

  // Adding chosen card details to lessons_content and fixing rank values
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
        'add'
      );
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftPanel}>
        <Box sx={styles.textWithBadge}>
          <Typography variant="h2">Add Resources</Typography>
          <Typography variant="h4">
            <ChipBadge
              label={topicResources?.categoryResourceMap.length}
              color="primary"
              size="small"
            />
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.rightPanel}>
        <Box sx={styles.cardsContainer}>
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
                            () => cardClick(category)
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
