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
import { setSelectedChapterResources } from '../../../reducer/learn.slice';

const styles: IStyles = {};

export default function SelectedChapterResources() {
  const { subject_id, chapter_id } = useParams();
  const subjectId = Number(subject_id);
  const chapterId = Number(chapter_id);
  const navigate = useNavigate();
  const selectedChapterResources = deserify(
    useAppSelector((state) => state.learn.selected_chapter_resources)
  );
  const dispatch = useDispatch();
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );

  useEffect(() => {
    fetchChapterTopicInfo();
  }, []);

  const fetchChapterTopicInfo = async () => {
    try {
      setLoading('loading');
      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterResources({
          personId: user?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          subjectId: subjectId,
          chapterId: chapterId,
        });
      // console.log(response.data);
      if (response) {
        setLoading('completed');
        if (response?.data) {
          const data = response.data;
          // console.log(typeof data, data);
          dispatch(setSelectedChapterResources(response.data));
          return;
        }
      }
      dispatch(setSelectedChapterResources(undefined));
    } catch (err) {
      console.log(err);
      setLoading('error');
      dispatch(setSelectedChapterResources(undefined));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: pxTovW(2),
          padding: { xs: pxToRem(20), md: 0 },
        }}
      >
        <Typography variant="h2">Chapter Resources</Typography>
        <Typography
          variant="h3"
          sx={{ marginLeft: { xs: pxToRem(6), md: pxTovW(9) } }}
        >
          <ChipBadge
            label={
              selectedChapterResources?.categoryResourceMap
                ?.map((obj) => obj.categoryResources.length)
                .reduce((a, b) => a + b, 0) || 0
            }
            color="primary"
            size="small"
          />
        </Typography>
      </Box>
      {loading === 'loading' ? (
        <Typography variant="h2">Loading ...</Typography>
      ) : loading === 'error' ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : selectedChapterResources?.categoryResourceMap.length === 0 ? (
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
        <Box>
          {selectedChapterResources?.categoryResourceMap.map(
            (category, index) => (
              <SectionListWithTopCarousel
                key={'category_' + index}
                title={category.categoryTitle}
                subtitle={category.categoryDescription}
                items={category.categoryResources.map((resource, rIndex) => (
                  <ContentDetailCard
                    onClick={() =>
                      onResourceClick(
                        navigate,
                        {
                          resourceId: resource.resourceId,
                          subjectId,
                          chapterId,
                        },
                        SessionModeEnum.SESSION_MODE_LEARN
                      )
                    }
                    key={'category_' + index + '_resource_' + rIndex}
                    variant="small"
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
                  />
                ))}
                containerMdWidth={pxTovW(855)}
                itemsToShow={3}
              />
            )
          )}
        </Box>
      )}
    </>
  );
}
