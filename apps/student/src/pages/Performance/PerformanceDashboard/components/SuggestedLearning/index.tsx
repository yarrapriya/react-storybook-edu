import { LmsStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContentDetailCard,
  FullWidthSectionList,
  IStyles,
  deserify,
  getMediaBasePath,
  getResourceEnumIcon,
  pxToRem,
  pxTovW,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../reduxStore/reduxHooks';
import { onResourceClick } from '../../../../../utils/learn';
import SectionListSckeleton, {
  ShimmerActiveHwCard,
} from '../../../../Home/shimmer';
import { setResourceRedirectionPath } from '../../../../Learn/reducer/learn.slice';
const styles: IStyles = {};
export const SuggestedLearning = () => {
  const [resources, setResources] = useState<ResourceInfo[]>([]);
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRecommendations();
  }, []);
  async function fetchRecommendations() {
    try {
      if (!studentId) {
        return;
      }
      setLoading(true);
      const response =
        await LmsStudentAPIServiceV1Client.getStudentResourceRecommendation({
          studentId: studentId,
        });
      if (response) {
        setLoading(false);
        if (response.data) {
          setResources(response.data?.resources || []);
          return;
        }
      }
      setResources([]);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
      setResources([]);
      // setLoading('error');
    }
  }
  if (loading === true) {
    return (
      <Box
        sx={{
          width: { md: pxTovW(555), xs: '100%' },
          '&  h2,h3': {
            fontWeight: 'bold',
            fontSize: { xs: pxToRem(18), md: pxTovW(30) },
          },
        }}
      >
        <SectionListSckeleton fullWidth children={ResourceShimmerArray} />
      </Box>
    );
  }
  if (resources.length === 0) {
    return null;
  }
  return (
    <Box
      sx={{
        width: { md: pxTovW(555), xs: '100%' },
        '&  h2,h3': {
          fontWeight: 'bold',
          fontSize: { xs: pxToRem(18), md: pxTovW(30) },
          marginBottom: pxToRem(5),
        },
      }}
    >
      <FullWidthSectionList
        hideListCount
        sectionTitle="Suggested Learning"
        items={resources.map((val, index) => (
          <ContentDetailCard
            onClick={() => {
              dispatch(setResourceRedirectionPath(location.pathname));
              onResourceClick(
                navigate,
                {
                  resourceId: val.resourceId,
                },
                SessionModeEnum.SESSION_MODE_RESOURCE
              );
            }}
            key={'res_' + index}
            variant="small"
            image={getMediaBasePath(val.posterImageUrl, 'processedMediaBucket')}
            heading={val.title}
            iconDetails={[
              { iconName: 'clock', text: `${val.estimatedTimeInMin} Min` },
              {
                iconName: getResourceEnumIcon(val.resourceType),
                text: transformResourceTypeEnumValue(val.resourceType),
              },
            ]}
            rootStyle={{
              backgroundColor: 'common.white',
            }}
          />
        ))}
      />
    </Box>
  );
};

const ResourceShimmerArray = [
  <ShimmerActiveHwCard variant="small" key={1} />,
  <ShimmerActiveHwCard variant="small" key={2} />,
];
