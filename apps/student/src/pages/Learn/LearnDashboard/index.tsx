import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChapterCard,
  ChipBadge,
  DashboardGrid,
  IStyles,
  Loader,
  NoContentCard,
  SubjectCard,
  deserify,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  LEARN_TOPIC_SELECTION,
} from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import { setSubjectChapterInfo } from '../reducer/learn.slice';
import OngoingChapterCard from './components/OngoingChapterCard';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: { md: `${pxTovW(50)} ${pxTovW(240)}` },
  },
  subjectBox: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    padding: { xs: pxToRem(20), md: 0 },
  },
};
export default function LearnDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subjectChapterInfo = deserify(
    useAppSelector((state) => state.learn.subject_chapter_info)
  );
  const { subject_id } = useParams();
  const subjectId = Number(subject_id);
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const user = deserify(useAppSelector((state) => state.auth.userInfo));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );
  const { setSelectedFunction } = useGlobalContext();

  const backButtonClick = async () => {
    navigate(HOME);
  };

  useEffect(() => {
    fetchSubjectChapterInfo();
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const fetchSubjectChapterInfo = async () => {
    try {
      setLoading('loading');
      const response =
        await ContentCommonAPIServiceV1Client.fetchSubjectChapterInfo({
          personId: user?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          subjectId: subjectId,
          bookId: (subjectId && subMap[subjectId]?.bookId) || 0,
          sectionId: user?.classSectionDetails?.sectionId,
        });
      // console.log(response.data);
      if (response) {
        setLoading('completed');
        if (response?.data) {
          const data = response.data;
          // console.log(typeof data, data);
          dispatch(setSubjectChapterInfo(response.data));
          return;
        }
      }
      dispatch(setSubjectChapterInfo(undefined));
    } catch (err) {
      setLoading('error');
      console.log(err);
      dispatch(setSubjectChapterInfo(undefined));
    }
  };

  const onChapterSelect = (chapterId: number) => {
    // dispatch(setActiveChapterId(chapterId));
    if (typeof subjectId != 'number') {
      return;
    }
    navigate(`${LEARN_TOPIC_SELECTION}/${subjectId}/${chapterId}`);
  };

  const items = subjectChapterInfo?.response
    .sort((a, b) => a.chapterNo - b.chapterNo)
    .map((chap) => (
      <ChapterCard
        image={getMediaBasePath(chap.posterImagesUrl, 'processedMediaBucket')}
        variant="normal"
        mainHeading={`${chap.chapterNo}. ${chap.chapterTitle}`}
        blueSubText={`${chap.noOfTopics} Topics`}
        cardClickHandler={() => {
          onChapterSelect(chap.chapterId);
        }}
        withArrow
      />
    ));

  const ongoingChapterId = subjectChapterInfo?.ongoingChapterId;
  const ongoingChapter = subjectChapterInfo?.response.find(
    (val) => val.chapterId === ongoingChapterId
  );
  // const ongoingChapter =
  //   subjectChapterInfo?.response.find((val) => !!val.noOfTopics) ||
  //   subjectChapterInfo?.response[0];

  const getSubjectName = () => {
    if (typeof subjectId == 'number') {
      return subMap[subjectId]?.subjectName || '';
    } else {
      return 'Invalid Subject';
    }
  };

  const getClassDetails = () => {
    if (user?.classSectionDetails?.className) {
      return (
        'Class ' +
        user?.classSectionDetails?.className +
        (user?.classSectionDetails?.sectionName || '')
      );
    }
    return '';
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.subjectBox}>
        <SubjectCard
          image={subMap[subjectId]?.iconUrl}
          title={getSubjectName()}
          subTitle={getClassDetails()}
        />
        {ongoingChapter && (
          <OngoingChapterCard
            chapter={ongoingChapter}
            onChapterCardClick={onChapterSelect}
          />
        )}
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5vw',
            padding: { xs: pxToRem(20), md: pxTovW(20) },
          }}
        >
          <Typography variant="h2">All Chapters</Typography>
          <Typography variant="h4">
            <ChipBadge
              label={items?.length || 0}
              color="primary"
              size="small"
            />
          </Typography>
        </Box>
        <Box
          sx={{
            marginBottom: { xs: pxToRem(20), md: 0 },
          }}
        >
          {loading === 'loading' ? (
            // <Typography variant="h2">Loading ...</Typography>
            <Loader />
          ) : loading === 'error' ? (
            <NoContentCard variant="error" icon="error" text="Error Occured" />
          ) : (
            loading === 'completed' &&
            (items ? (
              <DashboardGrid items={items} WebNoOfCols={3} mobileNoOfCols={1} />
            ) : (
              <NoContentCard
                variant="info"
                icon="cards"
                text="No cards to show"
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
