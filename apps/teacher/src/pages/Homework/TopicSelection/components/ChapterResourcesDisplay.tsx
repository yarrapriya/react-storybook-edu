import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContentDetailCard,
  NoContentCard,
  SectionListWithTopCarousel,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../reduxStore/reduxHooks';
import { resourceTypeName } from '../../../../utils/functions';
import { onResourceClick } from '../../../../utils/resource';
import { setResourceRedirectionPath } from '../../../Teach/reducer/teach.slice';
import { setChapterResources } from '../../reducer/homework.slice';

export default function ChapterResourcesDisplay() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { subject_id, chapter_id } = useParams();
  const teacher_id = getLocalStorage('userId');
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const { chapter_resources } = deserify(
    useAppSelector((state) => state.homework)
  );

  useEffect(() => {
    // if (chapter_id) fetchChapterTopicInfo();
    if (subject_id && chapter_id) {
      fetchChapterResources({ subjectId: subject_id, chapterId: chapter_id });
    }
  }, [chapter_id]);

  async function fetchChapterResources({
    subjectId,
    chapterId,
  }: {
    subjectId: string;
    chapterId: string;
  }) {
    try {
      setLoading('loading');

      const response =
        await ContentCommonAPIServiceV1Client.fetchChapterResources({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          chapterId: Number(chapterId),
        });

      if (response?.data) {
        const data = response.data;
        // console.log(typeof data, data);
        dispatch(setChapterResources(data));
        console.log('data chapters', data);
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

  return (
    <Box>
      {chapter_resources && chapter_resources.categoryResourceMap.length > 0 ? (
        <>
          {chapter_resources.categoryResourceMap.map((resource) => (
            <SectionListWithTopCarousel
              title={resource.categoryTitle}
              subtitle={resource.categoryDescription}
              itemsToShow={3}
              containerMdWidth={pxTovW(855)}
              items={resource.categoryResources.map((category) => (
                <ContentDetailCard
                  onClick={() => {
                    dispatch(setResourceRedirectionPath(location.pathname));
                    onResourceClick(
                      navigate,
                      {
                        resourceId: category.resourceId,
                        subjectId: Number(subject_id),
                        chapterId: Number(chapter_id),
                      },
                      SessionModeEnum.SESSION_MODE_RESOURCE
                    );
                  }}
                  variant="small"
                  image={getMediaBasePath(
                    category.posterImageUrl,
                    'processedMediaBucket'
                  )}
                  heading={category.title}
                  iconDetails={[
                    {
                      iconName: 'clock',
                      text: category.estimatedTimeInMin.toString() + ' min',
                    },
                    {
                      iconName:
                        resourceTypeName(category.resourceType).icon &&
                        resourceTypeName(category.resourceType).icon,
                      text: resourceTypeName(category.resourceType).name,
                    },
                  ]}
                />
              ))}
            />
          ))}
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
  );
}
