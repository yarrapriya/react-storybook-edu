import { LmsStudentAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ContentDetailCard,
  DashboardGrid,
  IStyles,
  Loader,
  deserify,
  getMediaBasePath,
  getResourceEnumIcon,
  pxToRem,
  pxTovW,
  transformResourceCategoryEnumValue,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { SessionModeEnum } from '@protos/learning_management/lms.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOME } from '../../../routeHandling/RoutesNomenclature';
import { onResourceClick } from '../../../utils/learn';
import { setResourceRedirectionPath } from '../../Learn/reducer/learn.slice';

const styles: IStyles = {
  root: {
    width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: { xs: pxToRem(20), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: { xs: pxToRem(10), md: pxTovW(40) },
  },
  card: {
    // paddingLeft: { xs: pxToRem(20), md: pxTovW(120) },
    paddingTop: { xs: pxToRem(10), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    // paddingRight: { xs: pxToRem(20), md: pxTovW(40) },

    borderRadius: { md: pxTovW(15) },
    backgroundColor: '#FFFFFFFF',
    boxSizing: 'border-box',
    boxShadow: { md: `0px 0px ${pxToRem(11)} #E7E7E7D9` },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: 'auto', md: 'auto auto auto ' },
    '&  > div > div': {
      borderRight: { md: '1px solid #E7F4E7' },
    },
    '& > div': {
      paddingBottom: '10px',
      paddingTop: '10px',
      borderBottom: { md: '1px solid #E7F4E7' },
    },
    '&  > :nth-last-child(-n+3) ': {
      borderBottom: 'none',
    },
    '&  > :nth-child(3n) > div': {
      borderRight: 'none',
    },
  },
};
export const ViewRecommendations = () => {
  const { subject_id, topic_id, chapter_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [resources, setResources] = useState<ResourceInfo[]>([]);
  const topicId = Number(topic_id);
  const chapterId = Number(chapter_id);
  const subjectId = Number(subject_id);
  const navigate = useNavigate();
  const studentId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const { setSelectedFunction } = useGlobalContext();

  const backButtonClick = async () => {
    navigate(HOME);
  };

  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [subjectId, topicId, chapterId]);

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
          chapterId,
          topicId,
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

  const items = resources.map((val, index) => (
    <Box
      key={'recommendation_res_' + index}
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={() => {
        dispatch(setResourceRedirectionPath(location.pathname));
        onResourceClick(
          navigate,
          {
            resourceId: val.resourceId,
            subjectId,
            chapterId,
            topicId,
          },
          SessionModeEnum.SESSION_MODE_RESOURCE
        );
      }}
    >
      <ContentDetailCard
        tagName={transformResourceCategoryEnumValue(val.resourceCategoryType)}
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
          height: {
            xs: pxToRem(127),
            md: pxTovW(121),
          },
          width: {
            xs: '100%',
          },
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}
      />
      {!isMobile && (
        <ChevronRightIcon
          fontSize="medium"
          fontWeight="normal"
          sx={{ color: '#828282' }}
        />
      )}
    </Box>
  ));

  return loading === true ? (
    <Loader />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">View Recommendations</Typography>
      </Box>
      {/* <Box sx={styles.card}> */}
      <DashboardGrid
        rootStyle={{
          boxShadow: 'none',
          backgroundColor: {
            md: 'common.white',
          },
        }}
        hiddenBorderBottom={isMobile}
        items={items}
        WebNoOfCols={3}
        mobileNoOfCols={1}
      />
      {/* </Box> */}
    </Box>
  );
};
