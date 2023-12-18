import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Typography, useMediaQuery } from '@mui/material';

import { ContentCommonAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ChapterCard,
  ChapterInfoCard,
  ChipBadge,
  DashboardGrid,
  IStyles,
  Loader,
  NoContentCard,
  SubjectCard,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  HOMEWORK_TOPIC_SELECTION,
} from '../../../routeHandling/RoutesNomenclature';
import {
  resetCreatedHomeworkStatus,
  resetFetchedHwDetails,
  resetSelectedTasksInfo,
  setSubjectWiseChaptersInfo,
} from '../reducer/homework.slice';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    padding: { md: `${pxTovW(50)} ${pxTovW(240)}` },
    gap: { xs: pxToRem(20), md: pxTovW(40) },
  },
  subjectBox: {
    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(15), md: 0 },
    boxSizing: 'border-box',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    padding: { xs: pxToRem(20), md: 0 },
  },
  onGoing: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(15), md: pxTovW(10) },
    mt: { md: pxTovW(15) },
  },
  allChaptersContainer: {
    width: '100%',
    boxSizing: 'border-box',

    '& .grid': {
      padding: { xs: pxToRem(12), md: pxTovW(12) },
    },
    '& .grid > div': {
      borderBottom: '1px solid #B8B8B8',
    },
    '& .grid:not(:nth-child(3n))': {
      borderRight: { xs: '1px solid none', md: '1px solid #B8B8B8' },
      borderImage:
        'linear-gradient(to bottom, white 10%,#B8B8B8 10% 90%,white 90% 100%) 1',
    },
  },

  lowerBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(15), md: pxTovW(25) },
  },

  textWithBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    padding: { xs: pxToRem(20), md: 0 },
  },
};

export default function TeachChapterSelection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { subject_id } = useParams();

  const { setSelectedFunction } = useGlobalContext();

  const teacher_id = getLocalStorage('userId');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { subjectwise_chapters_info } = deserify(
    useAppSelector((state) => state.homework)
  );
  const [loading, setLoading] = useState(false);
  // console.log('subjectChapterInfo:', subjectwise_chapters_info);
  // getting current class and subject selected
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);
  // getting image path from user_info.subjects.iconUrl, by matching className,sectionName,subjectName
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const findSubjectImage = () => {
    let subjectImage = '';

    user_info?.teachClassSubjects.forEach((classData) => {
      if (
        class_subject_info?.classname === classData.className &&
        class_subject_info?.section === classData.sectionName
      ) {
        classData.subjects.forEach((subjectData) => {
          if (class_subject_info?.subject === subjectData.subjectName) {
            subjectImage = subjectData.iconUrl;
          }
        });
      }
    });

    return subjectImage;
  };
  async function fetchSubjectChapterInfo(subjectId: string) {
    try {
      setLoading(true);
      const response =
        await ContentCommonAPIServiceV1Client.fetchSubjectChapterInfo({
          personId: BigInt(teacher_id),
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          subjectId: Number(subjectId),
          bookId: class_subject_info?.bookId,
        });

      if (response?.data) {
        const data = response.data;
        // console.log(typeof data, data);
        dispatch(setSubjectWiseChaptersInfo(data));
      } else {
        // setError(new Error('Login failed'));
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  useEffect(() => {
    dispatch(resetSelectedTasksInfo());
    dispatch(resetCreatedHomeworkStatus());
    dispatch(resetFetchedHwDetails());
    if (subject_id) {
      fetchSubjectChapterInfo(subject_id);
    }
  }, [subject_id]);

  useEffect(() => {
    const onBackClick = () => {
      navigate(HOME);
    };
    setSelectedFunction(() => onBackClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  const newItems = subjectwise_chapters_info?.response
    .sort((a, b) => a.chapterNo - b.chapterNo)
    .map((elem, index) => (
      <ChapterCard
        key={index}
        withArrow
        variant="normal"
        image={getMediaBasePath(elem.posterImagesUrl, 'processedMediaBucket')}
        mainHeading={elem.chapterNo + '. ' + elem.chapterTitle}
        blueSubText={`${elem.noOfTopics} topics`}
        rootStyle={{ width: '100%' }}
        cardClickHandler={() => {
          navigate(
            `${HOMEWORK_TOPIC_SELECTION}/${subject_id}/${elem.chapterId}`
          );
        }}
      />
    ));

  // const selectedChapterId = subjectwise_chapters_info?.response.find(
  //   (val) => !!val.noOfTopics
  // )?.chapterId;
  // const ongoingChapter = subjectwise_chapters_info?.response.find(
  //   (value) => value.chapterId === selectedChapterId
  // );
  const ongoingChapterId = subjectwise_chapters_info?.ongoingChapterId;
  const ongoingChapter = subjectwise_chapters_info?.response.find(
    (val) => val.chapterId === ongoingChapterId
  );
  return (
    <Box sx={styles.root}>
      <Box sx={styles.subjectBox}>
        <SubjectCard
          image={findSubjectImage()}
          title={class_subject_info ? class_subject_info?.subject : ''}
          subTitle={
            class_subject_info
              ? 'Class ' +
              class_subject_info?.classname +
              class_subject_info?.section
              : ''
          }
        />

        {ongoingChapter && (
          <Box sx={styles.onGoing}>
            {isMobile && <Typography variant="h2">Ongoing Chapter</Typography>}
            <ChapterInfoCard
              variant="small"
              tagName="Ongoing"
              withArrow
              image={getMediaBasePath(
                ongoingChapter?.posterImagesUrl,
                'processedMediaBucket'
              )}
              mainHeading={
                ongoingChapter?.chapterNo +
                '. ' +
                ongoingChapter?.chapterTitle || '_'
              }
              blueSubText={`${ongoingChapter?.noOfTopics} topics`}
              cardClickHandler={() =>
                navigate(
                  `${HOMEWORK_TOPIC_SELECTION}/${subject_id}/${ongoingChapter?.chapterId}`
                )
              }
            />
          </Box >
        )
        }
      </Box >

      <Box sx={styles.lowerBox}>
        <Box sx={styles.textWithBadge}>
          <Typography variant="h2">All Chapters</Typography>
          <Typography variant="h4">
            <ChipBadge
              label={subjectwise_chapters_info?.response.length}
              color="primary"
              size="small"
            />
          </Typography>
        </Box>

        <Box sx={{ marginBottom: { xs: pxToRem(20), md: 0 } }}>
          {/* <DashboardGrid items={items} WebNoOfCols={3} mobileNoOfCols={1} /> */}

          {loading === true ? (
            <Loader />
          ) : newItems ? (
            <DashboardGrid
              items={[...newItems]}
              WebNoOfCols={3}
              mobileNoOfCols={1}
            />
          ) : (
            [
              <NoContentCard
                variant="info"
                icon="cards"
                text="No Chapters to show"
              />,
            ]
          )}
        </Box>
      </Box>
    </Box >
  );
}

const cdcIconDetails = [
  { iconName: 'clock', text: '15 Min' },
  { iconName: 'questions', text: 'video' },
];
