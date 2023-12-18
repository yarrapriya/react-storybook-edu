import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChipBadge,
  ContentDetailCard,
  IStyles,
  NoContentCard,
  SectionListWithTopCarousel,
  deserify,
  getMediaBasePath,
  getResourceEnumIcon,
  pxToRem,
  pxTovW,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../reduxStore/reduxHooks';
import { onResourceClick } from '../../../../../utils/learn';
import { setSelectedTopicResourceList } from '../../../reducer/learn.slice';
import { ResourceShimmer } from '../../Shimmer';

const styles: IStyles = {};

export const TopicResources = () => {
  const { subject_id, topic_id, chapter_id } = useParams();
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const topicId = Number(topic_id);
  const chapterId = Number(chapter_id);
  const subjectId = Number(subject_id);

  const topicResources = deserify(
    useAppSelector((state) => state.learn.selected_topic_resources)
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopicResources();
  }, []);

  const fetchTopicResources = async () => {
    try {
      setLoading('loading');
      const response =
        await ContentCommonAPIServiceV1Client.fetchTopicResources({
          personId: user?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          subjectId: subjectId,
          chapterId: chapterId,
          topicId: topicId,
        });
      setLoading('completed');
      if (response) {
        if (response?.data) {
          response.data.categoryResourceMap.forEach((elem) => {
            elem.categoryResources.sort((a, b) => a.rank - b.rank);
          });
          const categoryResourceMap = response.data?.categoryResourceMap;
          dispatch(setSelectedTopicResourceList(categoryResourceMap));
          return;
        }
      }
      dispatch(setSelectedTopicResourceList(undefined));
    } catch (err) {
      console.log(err);
      setLoading('error');
      dispatch(setSelectedTopicResourceList(undefined));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(10), md: pxTovW(10), alignItems: 'center' },
          paddingLeft: { xs: pxToRem(20), md: 0 },
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Resources
        </Typography>
        <ChipBadge
          label={
            topicResources
              ?.map((obj) => obj.categoryResources.length)
              .reduce((a, b) => a + b, 0) || 0
          }
          color="primary"
          size="small"
        />
      </Box>
      {loading === 'loading' ? (
        <ResourceShimmer />
      ) : loading === 'error' ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : topicResources?.length === 0 ? (
        <NoContentCard
          variant="soon"
          icon="hourglass-web"
          text="Coming Soon!"
        />
      ) : (
        <Box>
          {topicResources?.map((topicResource, index) => (
            <SectionListWithTopCarousel
              itemsToShow={2}
              key={'topic_category_' + index}
              title={topicResource.categoryTitle}
              subtitle={topicResource.categoryDescription}
              items={topicResource.categoryResources.map((resource, rIndex) => (
                <ContentDetailCard
                  onClick={() =>
                    onResourceClick(
                      navigate,
                      {
                        resourceId: resource.resourceId,
                        subjectId,
                        chapterId,
                        topicId,
                      },
                      SessionModeEnum.SESSION_MODE_LEARN
                    )
                  }
                  key={'topic_category_' + index + '_resource_' + rIndex}
                  variant="medium"
                  image={getMediaBasePath(
                    resource.posterImageUrl,
                    'processedMediaBucket'
                  )}
                  heading={resource.title}
                  iconDetails={[
                    {
                      iconName: 'clock',
                      text: resource.estimatedTimeInMin + ' Min',
                    },
                    {
                      iconName: getResourceEnumIcon(resource.resourceType),
                      text: transformResourceTypeEnumValue(
                        resource.resourceType
                      ),
                    },
                  ]}
                  rootStyle={{
                    backgroundColor: 'common.white',
                  }}
                />
              ))}
              containerMdWidth={pxTovW(715)}
            />
          ))}
        </Box>
      )}
    </>
  );
};
