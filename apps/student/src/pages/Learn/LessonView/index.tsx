import { Timestamp } from '@bufbuild/protobuf';
import {
  LessonCommonAPIServiceV1Client,
  LessonLearnAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ChapterSelectedCard,
  ContentDetailCard,
  HwProceedButton,
  IStyles,
  Loader,
  NoContentCard,
  PrimaryButton,
  deserify,
  getMediaBasePath,
  getResourceEnumIcon,
  getStudentSubjectEnum,
  pxToRem,
  pxTovW,
  theme,
  transformResourceCategoryEnumValue,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  SessionModeEnum,
  SessionStatusEnum,
} from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../utils/icons';
import { onResourceClick } from '../../../utils/learn';
import {
  setLessonPlanRedirectionPath,
  setLessonPreviousSessionInfo,
  setSelectedLessonContent,
  setUpdatedLessonSessionVisitedResourceInfo,
} from '../reducer/learn.slice';
import InfoBar from './components/InfoBar';
const styles: IStyles = {
  root: {
    width: '100vw',
    // display: 'flex',
    // flexDirection: 'column',
    paddingY: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
    paddingX: { xs: pxToRem(20), md: 0 },

    p: { xs: pxToRem(20), md: `${pxTovW(30)} ${pxTovW(240)} ${pxTovW(100)}` },
  },
  header: {
    maxWidth: {
      xs: '100%',
      md: 'unset',
    },
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    justifyContent: {
      xs: 'flex-start',
      md: 'space-between',
    },
    margin: '0 auto',
    alignItems: { md: 'center' },
  },
  bodySection: {
    display: 'flex',
    gap: { xs: 0, md: pxTovW(60) },
    flexDirection: { xs: 'column', md: 'row' },
    maxWidth: {
      xs: '100%',
      md: 'unset',
    },
    margin: '0 auto',
  },
  countBox: {
    height: { xs: pxToRem(79), md: pxTovW(141) },
    width: '100%',
    borderRadius: pxToRem(10),
    backgroundColor: '#FFFFFF',
    border: '1px dashed #BEB8FD',
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 3px ${pxToRem(35)} #0000000F`,
    padding: { xs: pxToRem(20), md: pxTovW(40) },
  },

  //
  rightPanel: {
    paddingX: pxTovW(20),
    // flexBasis: { md: pxTovW(847) },
    flexGrow: 1,
  },
  infoBox: {},
  editButton: {
    cursor: 'pointer',
    padding: 0,
    minWidth: 0,
    width: { xs: pxToRem(34), md: pxTovW(50) },
    height: { xs: pxToRem(34), md: pxTovW(50) },
    borderRadius: pxTovW(8),
    bgcolor: 'common.white',
    border: '1px solid #EEEEEE',
  },
  cardsContainer: {
    paddingTop: pxTovW(20),
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
};

export const LessonView = () => {
  const [contentLoading, setContentLoading] = useState<
    'loading' | 'completed' | 'error' | 'invalid session'
  >('completed');
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { subject_id, lesson_id, topic_id } = useParams();
  const lessonId = lesson_id;
  const subjectId = Number(subject_id);
  const topicId = Number(topic_id);

  const dispatch = useDispatch();
  const userInfo = deserify(useAppSelector((state) => state.auth.userInfo));
  const previousLessonSessionInfo = deserify(
    useAppSelector((state) => state.learn.previous_lesson_session_info)
  );

  const navigate = useNavigate();
  const { setSelectedFunction } = useGlobalContext();
  const redirectionPath = useAppSelector(
    (state) => state.learn.lesson_plan_redirection_path
  );

  const location = useLocation();
  const lesson_session_id =
    new URLSearchParams(location.search).get('lessonSessionId') || undefined;

  const backButtonClick = async () => {
    if (redirectionPath) {
      const completedIds = previousLessonSessionInfo?.completedResourceIds || [];
      if (lesson_session_id && lesson_id && lessonContent && completedIds.length > 0 && completedIds.length < lessonContent?.resources.length) {
        LessonLearnAPIServiceV1Client.updateStudentLessonSession({
          studentId: userInfo?.studentProfileId,
          studentLessonSessionId: Number(lesson_session_id),
          lessonId: lesson_id,
          sessionStatus: SessionStatusEnum.SESSION_STATUS_EXITED,
          endTime: Timestamp.fromDate(new Date()),
        })
      }
      navigate(redirectionPath);
      dispatch(setLessonPlanRedirectionPath(undefined));
      dispatch(setUpdatedLessonSessionVisitedResourceInfo({}));
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, [previousLessonSessionInfo, lesson_session_id]);

  const lessonContent = deserify(
    useAppSelector((state) => state.learn.selected_lesson_content)
  );
  const estimatedTime =
    lessonContent?.resources.reduce(
      (acc, lc) => acc + lc.estimatedTimeInMin,
      0
    ) || 0;

  const completedResourceIds =
    previousLessonSessionInfo?.completedResourceIds || [];
  const learnSubjects = userInfo?.learnSubjects || [];
  const subMap = getSubjectsMap(learnSubjects);
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );

  const onLearnClicked = async (resourceId?: string) => {
    if (!resourceId) {
      const allResourceIds =
        lessonContent?.resources.map((res) => res.resourceId) || [];
      if (!allResourceIds.length) {
        return;
      }
      const notCompletedResourceIds = allResourceIds.filter(
        (resId) => !completedResourceIds.includes(resId)
      );
      resourceId = notCompletedResourceIds[0] || allResourceIds[0];
      if (!resourceId) {
        return;
      }
    }
    let lessonSessionId = lesson_session_id
      ? Number(lesson_session_id)
      : undefined;
    if (!lesson_session_id) {
      const newSessionInfo =
        await LessonLearnAPIServiceV1Client.createStudentLessonSession({
          studentId: userInfo?.studentProfileId,
          lessonId: lessonId,
          startTime: Timestamp.fromDate(new Date()),
          sessionResourceIds:
            previousLessonSessionInfo?.completedResourceIds || [],
          schoolId: userInfo?.schoolDetails?.schoolId,
          academicYear: 0,
          classId: userInfo?.classSectionDetails?.classId,
          section: userInfo?.classSectionDetails?.sectionName,
          subject:
            subjectId && !isNaN(Number(subjectId))
              ? getStudentSubjectEnum(
                Number(subjectId),
                userInfo?.learnSubjects
              )
              : undefined,
          sessionStatus: SessionStatusEnum.SESSION_STATUS_STARTED,
          sessionMode: SessionModeEnum.SESSION_MODE_LEARN,
        });
      if (newSessionInfo.studentLessonSessionId) {
        lessonSessionId = newSessionInfo.studentLessonSessionId;
        dispatch(setUpdatedLessonSessionVisitedResourceInfo({}));
      }
    }
    onResourceClick(
      navigate,
      {
        resourceId,
        lessonId,
        lessonSessionId,
        subjectId,
        topicId,
      },
      SessionModeEnum.SESSION_MODE_LESSON_RESOURCE
    );
  };

  useEffect(() => {
    fetchLessonContent();
  }, []);

  const fetchLessonContent = async () => {
    try {
      setLoading('loading');
      setContentLoading('loading');
      const lessonContent =
        await LessonCommonAPIServiceV1Client.fetchLessonContent({
          personId: userInfo?.studentProfileId,
          personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
          lessonId: lessonId,
        });
      const prevLessonSessionInfo =
        await LessonLearnAPIServiceV1Client.getPreviousLessonSessionInfo({
          studentId: userInfo?.studentProfileId,
          lessonId: lessonId,
        });
      if (lessonContent) {
        if (lessonContent.data) {
          dispatch(setSelectedLessonContent(lessonContent.data));
        } else {
          dispatch(setSelectedLessonContent(undefined));
        }
        setContentLoading('completed');
      } else {
        dispatch(setSelectedLessonContent(undefined));
        setContentLoading('error');
      }
      dispatch(setLessonPreviousSessionInfo(prevLessonSessionInfo.data));
    } catch (err) {
      console.log('error', err);
      setLoading('error');

      dispatch(setSelectedLessonContent(undefined));
      dispatch(setLessonPreviousSessionInfo(undefined));
    }
  };

  const lessonTabs = [
    {
      quantity: (lessonContent?.resources.length || 0).toString(),
      title: 'Resources',
    },
    { quantity: estimatedTime.toString(), title: 'Mins' },
  ];

  return contentLoading === 'loading' ? (
    // <Typography variant="h2">Loading ...</Typography>
    <Loader />
  ) : contentLoading === 'error' ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : contentLoading === 'invalid session' ? (
    <NoContentCard variant="error" icon="error" text="Invalid Session" />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box>
          <ChapterSelectedCard
            image={getMediaBasePath(
              lessonContent?.lessonPosterImageUrl,
              'processedMediaBucket'
            )}
            chapterName={lessonContent?.lessonTitle || ''}
            subject={subjectId ? subMap[subjectId]?.subjectName || '' : ''}
          />
        </Box>

        <Box
          sx={{ display: { xs: 'none', md: 'block' }, height: 'max-content' }}
        >
          <PrimaryButton onClick={() => onLearnClicked(undefined)}>
            LEARN
          </PrimaryButton>
        </Box>
      </Box>

      <Box sx={styles.bodySection}>
        <Box
          sx={{
            width: { xs: '100%', md: '35%' },
            flexBasis: { md: pxTovW(442) },
          }}
        >
          {/* {renderCountBox()} */}
          {largeScreen && (
            <InfoBar
              tabs={[
                {
                  iconName: 'questions',
                  heading: (lessonContent?.resources.length || 0).toString(),
                  subHeading: 'resources',
                },
                {
                  iconName: 'clock',
                  heading: estimatedTime.toString(),
                  subHeading: 'Minutes',
                },
              ]}
            />
          )}
          <Box
            sx={{
              marginTop: { md: pxTovW(20) },
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <PrimaryButton onClick={() => onLearnClicked(undefined)} fullWidth>
              LEARN
            </PrimaryButton>
          </Box>
        </Box>

        <Box sx={styles.rightPanel}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h2">Lesson Flow</Typography>
          </Box>
          {lessonContent && lessonContent.resources.length !== 0 ? (
            <Box sx={styles.cardsContainer}>
              {lessonContent?.resources.map((e, i) => (
                <ContentDetailCard
                  key={i}
                  variant="large"
                  tagName={transformResourceCategoryEnumValue(
                    e.resourceCategoryType
                  )}
                  image={getMediaBasePath(
                    e.posterImageUrl,
                    'processedMediaBucket'
                  )}
                  heading={e.title}
                  onClick={() => onLearnClicked(e.resourceId)}
                  showCompletedRibbon={completedResourceIds.includes(
                    e.resourceId
                  )}
                  iconDetails={[
                    {
                      iconName: 'clock',
                      text: e.estimatedTimeInMin + ' Min',
                    },
                    {
                      iconName: getResourceEnumIcon(e.resourceType),
                      text: transformResourceTypeEnumValue(e.resourceType),
                    },
                  ]}
                  rootStyle={{
                    width: '100%',
                    backgroundColor: 'common.white',
                  }}
                />
              ))}
            </Box>
          ) : (
            <NoContentCard
              variant="info"
              icon="cards"
              text="No Content Available"
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 10,
        }}
        onClick={() => onLearnClicked(undefined)}
      >
        <HwProceedButton buttonTitle="LEARN" tabs={lessonTabs} />
      </Box>
    </Box>
  );
};

const cdcIconDetails = [
  {
    iconName: 'clock',
    text: '15 Min',
  },
  {
    iconName: 'questions',
    text: 'Reading',
  },
];
