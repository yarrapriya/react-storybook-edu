import { LmsStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContentDetailCard,
  FullWidthSectionList,
  deserify,
  getMediaBasePath,
  getResourceEnumIcon,
  transformResourceCategoryEnumValue,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { onResourceClick } from '../../../../utils/learn';
import { setHomeRecommendedResourceList } from '../../reducer/homeDashboard.slice';
import SectionListSckeleton, { ShimmerActiveHwCard } from '../../shimmer';

export default function RecommendedResourcesList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { recommended_resources_list } = deserify(
    useAppSelector((state) => state.home)
  );
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getStudentResourceRecommendation();
  }, [selectedSubjectId]);

  async function getStudentResourceRecommendation() {
    try {
      if (!studentId) {
        return;
      }
      setLoading(true);
      const response =
        await LmsStudentAPIServiceV1Client.getStudentResourceRecommendation({
          studentId: studentId,
          subjectId: selectedSubjectId,
        });
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(setHomeRecommendedResourceList(response.data?.resources));
          return;
        }
      }
      dispatch(setHomeRecommendedResourceList(undefined));
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
      dispatch(setHomeRecommendedResourceList(undefined));
      // setLoading('error');
    }
  }

  const getRecommendedResourcesItems = () => {
    if (!recommended_resources_list) {
      return [];
    }
    return recommended_resources_list.map((val, index) => (
      <ContentDetailCard
        tagName={transformResourceCategoryEnumValue(val.resourceCategoryType)}
        onClick={() =>
          onResourceClick(
            navigate,
            {
              resourceId: val.resourceId,
            },
            SessionModeEnum.SESSION_MODE_RESOURCE
          )
        }
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
}

const ResourceShimmerArray = [
  <ShimmerActiveHwCard key={1} variant="small" />,
  <ShimmerActiveHwCard key={2} variant="small" />,
  <ShimmerActiveHwCard key={3} variant="small" />,
  <ShimmerActiveHwCard key={4} variant="small" />,
  <ShimmerActiveHwCard key={5} variant="small" />,
];
