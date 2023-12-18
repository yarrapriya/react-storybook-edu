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
  transformResourceCategoryEnumValue,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { HOME } from '../../../../routeHandling/RoutesNomenclature';
import { onResourceClick } from '../../../../utils/learn';
import SectionListSckeleton, {
  ShimmerActiveHwCard,
} from '../../../Home/shimmer';
import { setResourceRedirectionPath } from '../../../Learn/reducer/learn.slice';
const styles: IStyles = {};
interface IProps {
  subjectId?: number;
  topicId?: number;
  chapterId?: number;
}
export const HomeworkRecommendations = (props: IProps) => {
  const { subjectId, topicId, chapterId } = props;
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
          subjectId,
          topicId,
          chapterId,
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

  const getRecommendedResourcesItems = () => {
    if (!resources) {
      return [];
    }
    return resources.map((val, index) => (
      <ContentDetailCard
        tagName={transformResourceCategoryEnumValue(val.resourceCategoryType)}
        onClick={() => {
          dispatch(setResourceRedirectionPath(HOME));
          onResourceClick(
            navigate,
            {
              resourceId: val.resourceId,
            },
            SessionModeEnum.SESSION_MODE_RESOURCE
          );
        }}
        key={'home_content_detail_' + index}
        variant="medium"
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
          width: { xs: pxToRem(283), md: pxTovW(347) },
          height: { xs: pxToRem(103), md: pxTovW(112) },
          maxWidth: { xs: '100%', md: pxTovW(347) },
        }}
      />
    ));
  };

  return loading === true ? (
    <SectionListSckeleton fullWidth children={ResourceShimmerArray} />
  ) : (
    <FullWidthSectionList
      isError={error}
      hideListCount
      sectionTitle="Recommended Resources"
      items={getRecommendedResourcesItems()}
      noContentMessage={'No Recommended Resources Available'}
    />
    // <SectionListSckeleton fullWidth children={OngoingLsShimmerArray} />
  );
};

const ResourceShimmerArray = [
  <ShimmerActiveHwCard variant="small" />,
  <ShimmerActiveHwCard variant="small" />,
  <ShimmerActiveHwCard variant="small" />,
  <ShimmerActiveHwCard variant="small" />,
  <ShimmerActiveHwCard variant="small" />,
];
