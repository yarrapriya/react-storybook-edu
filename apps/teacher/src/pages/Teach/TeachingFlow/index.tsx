import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, Typography } from '@mui/material';

import { Timestamp } from '@bufbuild/protobuf';
import {
  LessonCommonAPIServiceV1Client,
  LessonTeachAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ActionsPopup,
  ContentDetailCard,
  HwProceedButton,
  IStyles,
  IconWrapper,
  ImageWrapper,
  InPageHeader,
  InstructionsPopup,
  Loader,
  NoContentCard,
  PrimaryButton,
  SecondaryButton,
  deserify,
  getLocalStorage,
  getMediaBasePath,
  getTeacherSubjectEnum,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { CreationStatusEnum } from '@protos/content_management/content.db_pb';
import {
  SessionModeEnum,
  SessionStatusEnum,
} from '@protos/learning_management/lms.db_pb';
import {
  LessonContent,
  LessonInfo,
} from '@protos/learning_management/lms.lesson.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { EDIT_LESSON_PLAN } from '../../../routeHandling/RoutesNomenclature';
import {
  findSectionIdFromClassSection,
  getResourceCategory,
  resourceTypeName
} from '../../../utils/functions';
import { onResourceClick } from '../../../utils/resource';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import {
  setLessonContent,
  setLessonPlanRedirectionPath,
  setSelectedLessonInfo,
  setUpdatedLessonSessionVisitedResourceInfo,
} from '../reducer/teach.slice';
import InfoBar from './components/InfoBar';

const styles: IStyles = {
  root: {
    backgroundColor: 'neutral.paleGrey',
    height: '100vh',
    marginBottom: pxTovW(10),
    padding: { xs: `${pxToRem(20)} ${pxToRem(20)} 0`, md: 0 },
  },
  headingImage: {
    width: { xs: pxToRem(60), md: pxTovW(105) },
    height: { xs: pxToRem(60), md: pxTovW(105) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    objectFit: 'cover',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: pxToRem(40), md: pxTovW(270) },
    padding: { md: `${pxTovW(15)} ${pxTovW(240)}` },
    // margin: {
    //   xs: `${pxToRem(0)} ${pxToRem(20)} ${pxToRem(0)} ${pxToRem(20)}`,
    //   md: 0,
    // },
  },
  leftPanel: {
    flexBasis: { md: pxTovW(444) },
    display: 'flex',
    flexDirection: 'column',
    gap: { md: pxTovW(30) },
  },
  rightPanel: {
    height: '100%',
    overflow: 'auto',
    paddingX: pxTovW(20),
    flexBasis: { md: pxTovW(747) },
  },
  rightPanelHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoBox: {},
  editButton: {
    cursor: 'pointer',
    padding: 0,
    minWidth: 0,
    width: { xs: pxToRem(34), md: pxTovW(50) },
    height: { xs: pxToRem(34), md: pxTovW(50) },
    borderRadius: { xs: pxToRem(8), md: pxTovW(8) },
    bgcolor: 'common.white',
    border: '1px solid #EEEEEE',
  },
  cardsContainer: {
    paddingTop: pxTovW(20),
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    mb: { xs: pxToRem(100), md: pxTovW(0) },
  },
  item: {
    display: { xs: 'flex', md: 'none' },
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(5),
    '&>div': {
      display: 'flex',
      gap: pxToRem(2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    // backgroundColor: 'red',
  },
};
export default function TeachingFlow() {
  const [contentLoading, setContentLoading] = useState<
    'loading' | 'completed' | 'error' | 'invalid session'
  >('completed');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );

  const lesson_session_id =
    new URLSearchParams(location.search).get('lessonSessionId') || undefined;

  const class_id =
    new URLSearchParams(location.search).get('classId') || undefined;
  const classId = class_id ? Number(class_id) : class_subject_info?.classId;
  const section =
    new URLSearchParams(location.search).get('section') ||
    class_subject_info?.section;

  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const sectionId = findSectionIdFromClassSection(user_info, class_subject_info, section, classId) || class_subject_info?.sectionId;

  const teacher_id = getLocalStorage('userId');
  const { subject_id, topic_id, lesson_id } = useParams();

  const [openIntructionsPopup, setOpenIntructionsPopup] = useState(false);

  const [copyLpPopup, setCopyLpPopup] = useState(false);
  const closePopup = () => {
    setCopyLpPopup(false);
  };

  // /resource.estimatedTimeInMin


  // Copy of the selected Lesson Plan
  const { selected_lessons_info } = deserify(
    useAppSelector((state) => state.teach)
  );

  const editClickHandler = () => {
    // if LP belongs to another id a copy will be made
    const createdByTeacher =
      selected_lessons_info?.createdBy.toString() === teacher_id;

    if (createdByTeacher) {
      navigate(`${EDIT_LESSON_PLAN}/${subject_id}/${topic_id}/${lesson_id}`);
    } else {
      setCopyLpPopup(true);
    }
  };

  const [completedResourceId, setCompletedResourceId] = useState<string[]>([]);

  const { setSelectedFunction } = useGlobalContext();
  const redirectionPath = useAppSelector(
    (state) => state.teach.lesson_plan_redirection_path
  );

  const backButtonClick = async () => {
    if (lesson_session_id && lesson_id && lessons_content && completedResourceId.length > 0 && completedResourceId.length < lessons_content?.resources.length) {
      LessonTeachAPIServiceV1Client.updateTeacherLessonSession({
        teacherId: teacher_id,
        teacherLessonSessionId: Number(lesson_session_id),
        lessonId: lesson_id,
        sessionStatus: SessionStatusEnum.SESSION_STATUS_EXITED,
        endTime: Timestamp.fromDate(new Date()),
      })
    }
    if (redirectionPath) {
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
  }, [completedResourceId, lesson_session_id]);

  // API call create teacher lesson session
  async function lessonSessionInfo() {
    try {
      // setLoading(true);

      if (!lesson_id) return;
      await fetchLessonContent(lesson_id);

      const response =
        await LessonTeachAPIServiceV1Client.getPreviousLessonSessionInfo({
          teacherId: BigInt(teacher_id),
          lessonId: lesson_id,
        });

      // console.log('lessonSessionInfo: response', response);
      setCompletedResourceId(response.data?.completedResourceIds || []);

      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  //
  async function createLessonCopy(selectedLesson: LessonInfo) {
    if (!selectedLesson.lessonId) {
      return;
    }
    try {
      // setLoading(true);

      const response = await LessonTeachAPIServiceV1Client.upsertLesson({
        teacherId: BigInt(teacher_id),
        title: selectedLesson.title + ' (Copy)',
        subjectId: Number(subject_id),
        moduleId: selectedLesson.moduleId,
        moduleCategory: selectedLesson.moduleCategory,
        posterImageUrl: selectedLesson.posterImageUrl,
        resourceIds: selectedLesson.resourceIds,
        sourceLessonId: selectedLesson.lessonId,
        creationStatus: CreationStatusEnum.CREATION_STATUS_APPROVED,
        schoolClassSectionId: sectionId
      });

      if (response?.data) {
        const data = response.data;
        // console.log('createLessonCopy', data);
        dispatch(setSelectedLessonInfo(data));
        navigate(
          `${EDIT_LESSON_PLAN}/${subject_id}/${topic_id}/${data.lessonId}`
        );
      } else {
        dispatch(
          setToastInfo({
            variant: 'error',
            label: 'Error while making lesson copy',
            open: true,
          })
        );
      }

      // setLoading(false);
    } catch (err) {
      dispatch(
        setToastInfo({
          variant: 'error',
          label: 'Error while making lesson copy',
          open: true,
        })
      );
      // setLoading(false);
      // setError(err);
      console.log(err);
    }
  }

  // Getting all the Lesson content
  const { lessons_content } = deserify(useAppSelector((state) => state.teach));

  async function fetchLessonContent(lessonId: string) {
    try {
      setContentLoading('loading');

      const response = await LessonCommonAPIServiceV1Client.fetchLessonContent({
        personId: BigInt(teacher_id),
        personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
        lessonId: lessonId,
      });

      if (response) {
        if (response?.data) {
          const data = response.data;
          // console.log('fetchLessonContent', data);
          // console.log(typeof data, data);
          dispatch(setLessonContent(data));
        }
        setContentLoading('completed');
      }
    } catch (err) {
      setContentLoading('error');
      console.log(err);
    }
  }

  useEffect(() => {
    lessonSessionInfo();
  }, [lesson_id]);

  // to check which resource to start
  const onLearnClicked = async (resourceId?: string) => {
    if (!resourceId) {
      const allResourceIds =
        lessons_content?.resources.map((res) => res.resourceId) || [];
      if (!allResourceIds.length) {
        return;
      }
      const notCompletedResourceIds = allResourceIds.filter(
        (resId) => !completedResourceId.includes(resId)
      );
      resourceId = notCompletedResourceIds[0] || allResourceIds[0];
      if (!resourceId) {
        return;
      }
    }

    let lessonSessionId = lesson_session_id
      ? Number(lesson_session_id)
      : undefined;
    const newSessionInfo =
      await LessonTeachAPIServiceV1Client.createTeacherLessonSession({
        teacherId: BigInt(teacher_id),
        lessonId: lesson_id,

        schoolId: user_info?.schoolDetails[0]?.schoolId,
        academicYear: 0,
        classId: classId,
        section: section,
        subject:
          subject_id && !isNaN(Number(subject_id))
            ? getTeacherSubjectEnum(
              Number(subject_id),
              user_info?.teachClassSubjects
            )
            : undefined,
        // teacherLessonSessionId: ,
        sessionResourceIds: completedResourceId || [],
        startTime: Timestamp.fromDate(new Date()),
        sessionStatus: SessionStatusEnum.SESSION_STATUS_STARTED,
        sessionMode: SessionModeEnum.SESSION_MODE_TEACH,
      });
    if (newSessionInfo.teacherLessonSessionId) {
      lessonSessionId = newSessionInfo.teacherLessonSessionId;
      dispatch(setUpdatedLessonSessionVisitedResourceInfo({}));
    }

    onResourceClick(
      navigate,
      {
        resourceId,
        lessonId: lesson_id,
        lessonSessionId,
        subjectId: Number(subject_id),
        topicId: Number(topic_id),
        section: section,
        classId: classId
      },
      SessionModeEnum.SESSION_MODE_LESSON_RESOURCE
    );
  };

  const totalTimeOfResources = lessons_content?.resources.reduce(
    (acc, resource) => acc + resource.estimatedTimeInMin,
    0
  );

  return contentLoading === 'loading' ? (
    <Loader />
  ) : contentLoading === 'error' ? (
    <NoContentCard variant="error" icon="error" text="Error Occured" />
  ) : contentLoading === 'invalid session' ? (
    <NoContentCard variant="error" icon="error" text="Invalid session" />
  ) : (
    <Box sx={styles.root}>
      <InPageHeader
        title={
          <Heading
            selectedLessonInfo={lessons_content}
            totalResourceTime={totalTimeOfResources}
          />
        }
        buttonText="Teach"
        buttonClickHandler={() => onLearnClicked()}
      />

      <Box sx={styles.mainContainer}>
        <Box sx={styles.leftPanel}>
          {lessons_content?.learningOutcomes &&
            lessons_content.learningOutcomes.length !== 0 && (
              <Box
                sx={{
                  margin: {
                    xs: `${pxToRem(26)} ${pxToRem(4)} ${pxToRem(0)} ${pxToRem(
                      4
                    )}`,
                    md: 0,
                  },
                }}
              >
                <SecondaryButton
                  variant="outlined"
                  witharrow
                  fullWidth
                  onClick={() => setOpenIntructionsPopup(true)}
                >
                  <Typography variant="h5" fontWeight="bold">
                    Learning Outcome
                  </Typography>
                </SecondaryButton>
              </Box>
            )}

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <InfoBar
              noOfResources={lessons_content?.resources.length}
              totalTime={totalTimeOfResources}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <PrimaryButton fullWidth onClick={() => onLearnClicked()}>
              Teach
            </PrimaryButton>
          </Box>
        </Box>

        <Box sx={styles.rightPanel}>
          <Box sx={styles.rightPanelHeading}>
            <Typography variant="h2">Teaching Flow</Typography>

            <Button sx={styles.editButton} onClick={editClickHandler}>
              <EditOutlinedIcon fontSize="medium" color="secondary" />
            </Button>
          </Box>

          {lessons_content && lessons_content.resources.length !== 0 ? (
            <Box sx={styles.cardsContainer}>
              {lessons_content?.resources.map(
                (resource: ResourceInfo, resourceIndex: number) => (
                  <ContentDetailCard
                    key={resourceIndex}
                    variant="large"
                    tagName={getResourceCategory(resource.resourceCategoryType)}
                    image={getMediaBasePath(
                      resource.posterImageUrl,
                      'processedMediaBucket'
                    )}
                    heading={resource.title}
                    iconDetails={iconDetails(resource)}
                    rootStyle={{
                      width: '100%',
                      backgroundColor: 'common.white',
                    }}
                    showCompletedRibbon={completedResourceId.includes(
                      resource.resourceId
                    )}
                    onClick={() => onLearnClicked(resource.resourceId)}
                  />
                )
              )}
            </Box>
          ) : (
            <NoContentCard
              variant="info"
              icon="cards"
              text="No Content Available"
            />
          )}

          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              position: 'fixed',
              bottom: pxToRem(10),
              right: pxToRem(15),
            }}
            onClick={() => onLearnClicked()}
          >
            <HwProceedButton
              buttonTitle="TEACH"
              clickHandler={() => onLearnClicked()}
              tabs={[
                {
                  quantity: lessons_content?.resources.length.toString() || '0',
                  title: 'Resources',
                },
                {
                  quantity: totalTimeOfResources?.toString() || '0',
                  title: 'Mins',
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <InstructionsPopup
        popupText={lessons_content?.learningOutcomes}
        open={openIntructionsPopup}
        handleClose={() => setOpenIntructionsPopup(false)}
      />

      <ActionsPopup
        open={copyLpPopup}
        handleClose={closePopup}
        fontSmall
        iconName="edit"
        popupText={`A copy of ${selected_lessons_info?.title} will be created`}
        yesClickHandler={() => {
          if (selected_lessons_info) createLessonCopy(selected_lessons_info);
        }}
        noClickHandler={closePopup}
      />
    </Box>
  );
}

interface HProps {
  selectedLessonInfo?: LessonContent;
  totalResourceTime?: number;
}
const Heading = ({ selectedLessonInfo, totalResourceTime }: HProps) => {
  // console.log('selectedLessonInfo:', selectedLessonInfo);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: pxToRem(10), md: pxTovW(20) },
        width: { xs: '100%', md: '70%' },
        alignItems: 'center',
      }}
    >
      <ImageWrapper
        name="chapterImage"
        type="png"
        styles={styles.headingImage}
        parentFolder="tempAssets"
        path={getMediaBasePath(
          selectedLessonInfo?.lessonPosterImageUrl,
          'processedMediaBucket'
        )}
      />
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(5), md: pxTovW(0) },
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {selectedLessonInfo?.lessonTitle}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            // bgcolor: 'blue',
            width: '100%',
            gap: pxToRem(5),
            alignItems: 'center',
          }}
        >
          <Box sx={styles.item}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper
                name="clock"
                size="md"
                type="png"
                parentFolder="icons"
              />
              <Typography variant="smallText">
                {totalResourceTime || 0}
              </Typography>

              <Typography variant="smallText">Minutes</Typography>
            </Box>
          </Box>
          <Box sx={styles.item}>
            <Box
              sx={{
                display: 'flex',

                alignItems: 'center',
              }}
            >
              <IconWrapper
                name="questions"
                size="small"
                type="png"
                parentFolder="icons"
              />
              <Typography variant="smallText">
                {selectedLessonInfo?.resources.length || 0}
              </Typography>

              <Typography variant="smallText">Resources</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const iconDetails = (resource: ResourceInfo) => {
  const retValue = [
    {
      iconName: 'clock',
      text: `${resource.estimatedTimeInMin} Min`,
    },

    {
      iconName: resourceTypeName(resource.resourceType).icon,
      text: resourceTypeName(resource.resourceType).name,
    },
  ];

  return retValue;
};
