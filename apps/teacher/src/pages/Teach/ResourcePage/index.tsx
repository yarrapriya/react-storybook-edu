import { useEffect, useState } from 'react';

import { Timestamp } from '@bufbuild/protobuf';
import {
  ContentCommonAPIServiceV1Client,
  LessonTeachAPIServiceV1Client,
  LmsCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ContentIdAttempt,
  IStyles,
  IconWrapper,
  ImageWrapper,
  InPageHeader,
  Loader,
  NoContentCard,
  PaginationButton,
  ResourcePageContent,
  deepClone,
  deserify,
  getMediaBasePath,
  getTeacherSubjectEnum,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Button, Typography } from '@mui/material';
import {
  Content,
  Question,
  ResourceContent,
  ResourceTeacherInstruction,
} from '@protos/content_management/content.db_pb';
import { UpdateTeacherResourceSessionRequest } from '@protos/learning_management/lms.common.apis_pb';
import {
  ContentAttempt,
  SessionModeEnum,
  SessionStatusEnum,
  TeacherContentResponse,
  TeacherLessonSessionMetrics,
  VisitedResourceContentInfoList,
} from '@protos/learning_management/lms.db_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';

import { ResourceInfo } from '@protos/content_management/content.common.apis_pb';
import { UpdateTeacherLessonSessionRequest } from '@protos/learning_management/lms.lesson.teach.apis_pb';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  EDIT_LESSON_PLAN,
  HOME,
  LESSON_PLAN_LISTS,
  TEACHING_FLOW,
  TEACH_TOPIC_SELECTION,
} from '../../../routeHandling/RoutesNomenclature';
import { resourceTypeName } from '../../../utils/functions';
import { ResourceViewMode, onResourceClick } from '../../../utils/resource';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import {
  setLessonContent,
  setResourceRedirectionPath,
  setSelectedResourceContent,
  setSelectedResourceSessionId,
  setUpdatedLessonSessionVisitedResourceInfo,
} from '../reducer/teach.slice';
import { LessonListPopup } from './components/LessonListPopup';

const styles: IStyles = {
  paginationButtonBox: {
    position: 'fixed',
    bottom: { md: pxTovW(30), xs: pxToRem(10) },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
    alignItems: 'center',
    mt: { xs: pxToRem(10), md: pxTovW(10) },
  },
  headingImage: {
    width: { xs: pxToRem(60), md: pxToRem(105) },
    height: { xs: pxToRem(60), md: pxToRem(105) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    objectFit: 'cover',
  },
  resourcePage: {
    paddingBottom: {
      xs: pxToRem(75),
      md: pxTovW(110),
    },
  },
};

interface IProps {
  headerButtonText?: string;
  buttonClickHandler?: () => void;
}
export const ResourcePage = (props: IProps) => {
  const navigate = useNavigate();
  const [lessonListPopupState, setLessonListPopupState] = useState(false);

  const user_info = deserify(useAppSelector((state) => state.auth.user_info));
  const class_subject_info = deserify(
    useAppSelector((state) => state.homeDashboard.class_subject_info)
  );
  const teacher_id = user_info?.teacherProfileId;
  const selectedResourceContent = deserify(
    useAppSelector((state) => state.teach.selected_resource_content)
  )?.parsedData;
  const rawResourceContent = deserify(
    useAppSelector((state) => state.teach.selected_resource_content)
  )?.rawData;
  const activeResourceSessionId = deserify(
    useAppSelector((state) => state.teach.selected_resource_session_id)
  );

  const [completedResourceIds, setCompletedResourceIds] = useState<string[]>(
    []
  );

  const dispatch = useDispatch();

  const location = useLocation();
  const subjectId =
    new URLSearchParams(location.search).get('subjectId') || undefined;
  const resourceId =
    new URLSearchParams(location.search).get('resourceId') || undefined;
  const lessonId =
    new URLSearchParams(location.search).get('lessonId') || undefined;
  const lessonSessionId =
    new URLSearchParams(location.search).get('lessonSessionId') || undefined;
  const chapterId =
    new URLSearchParams(location.search).get('chapterId') || undefined;
  const topicId =
    new URLSearchParams(location.search).get('topicId') || undefined;
  const session_mode =
    new URLSearchParams(location.search).get('sessionMode') || undefined;
  const class_id =
    new URLSearchParams(location.search).get('classId') || undefined;
  const classId = class_id ? Number(class_id) : class_subject_info?.classId
  const section =
    new URLSearchParams(location.search).get('section') || class_subject_info?.section;
  const sessionMode = session_mode
    ? (Number(session_mode) as SessionModeEnum)
    : undefined;
  const resource_index =
    new URLSearchParams(location.search).get('resourceIndex') || undefined;
  const resourceIndex = resource_index ? Number(resource_index) : undefined;
  const resourceRedirectionPath = useAppSelector(
    (state) => state.teach.resource_redirection_path
  );

  const lesson_session_visited_resource_info =
    deserify(
      useAppSelector(
        (state) => state.teach.lesson_session_visited_resource_info
      )
    ) || {};
  const visitedResourceInfo =
    (lessonSessionId
      ? lesson_session_visited_resource_info[lessonSessionId]
      : []) || [];
  // console.log(
  //   'visitedResourceInfo',
  //   visitedResourceInfo,
  //   lesson_session_visited_resource_info
  // );

  const { lessons_content } = deserify(useAppSelector((state) => state.teach));

  const viewMode =
    (new URLSearchParams(location.search).get(
      'viewMode'
    ) as ResourceViewMode) || undefined;

  const pageContents = (
    new ResourceContent(selectedResourceContent)?.resourceContentData
      ?.pageContent || []
  ).sort((a, b) => a.pageNumber - b.pageNumber);
  const [pageNumber, setPageNumber] = useState(0);
  const [contentIdAttempt, updateContentIdAttempt] = useState<ContentIdAttempt>(
    {}
  );

  const pageContent = pageContents[pageNumber];
  const [startTime, setStartTime] = useState(Timestamp.fromDate(new Date()));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'loading'
  );
  const { setSelectedFunction } = useGlobalContext();
  const [createLoader, setCreateLoader] = useState(false);
  useEffect(() => {
    fetchResourceData();
    updateContentIdAttempt({});
  }, [resourceId]);

  useEffect(() => {
    setSelectedFunction(() => () => {
      handleResourceCompleteOrEnd(SessionStatusEnum.SESSION_STATUS_EXITED);
    });
    return () => {
      setSelectedFunction(null);
    };
  }, [activeResourceSessionId, resourceId, contentIdAttempt]);

  useEffect(() => {
    setStartTime(Timestamp.fromDate(new Date()));
  }, [pageNumber, resourceId]);

  const fetchResourceData = async () => {
    setPageNumber(0);
    if (resourceId) {
      try {
        setLoading('loading');
        const resourceContent =
          await ContentCommonAPIServiceV1Client.fetchResourceContent({
            personId: teacher_id,
            personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
            resourceId: resourceId,
          });
        const gcpJsonURL = resourceContent.data?.gcpJsonUrl;
        if (!gcpJsonURL) {
          throw new Error('Invalid Resource Data');
          return;
        }
        const modifiedUrl = getMediaBasePath(
          gcpJsonURL,
          'resourceContentBucket'
        );
        const gcpResponse = await (await fetch(modifiedUrl)).json();
        const resContent = new ResourceContent().fromJson(gcpResponse, {
          ignoreUnknownFields: true,
        });
        dispatch(
          setSelectedResourceContent({
            rawData: resourceContent.data,
            parsedData: resContent,
          })
        );
        if (viewMode) {
          setLoading('completed');
          return;
        }
        const resourceSession =
          await LmsCommonAPIServiceV1Client.createTeacherResourceSession({
            teacherId: teacher_id,
            sessionMode: sessionMode,
            startTime: Timestamp.fromDate(new Date()),
            resourceId: resourceId,
            schoolId: user_info?.schoolDetails[0]?.schoolId,
            academicYear: 0,
            classId,
            section,
            subject:
              subjectId && !isNaN(Number(subjectId))
                ? getTeacherSubjectEnum(
                  Number(subjectId),
                  user_info?.teachClassSubjects
                )
                : undefined,
            moduleId: topicId
              ? Number(topicId)
              : chapterId
                ? Number(chapterId)
                : undefined,
            teacherLessonSessionId:
              lessonSessionId && !isNaN(Number(lessonSessionId))
                ? Number(lessonSessionId)
                : undefined,
            sessionStatus: SessionStatusEnum.SESSION_STATUS_STARTED,
          });
        if (lessonId) {
          const prevLessonSessionInfo =
            await LessonTeachAPIServiceV1Client.getPreviousLessonSessionInfo({
              teacherId: user_info?.teacherProfileId,
              lessonId: lessonId,
            });
          const resIds = prevLessonSessionInfo.data?.completedResourceIds;
          if (resIds && resIds.length > 0) {
            setCompletedResourceIds(resIds);
          }
        }
        dispatch(
          setSelectedResourceSessionId(resourceSession.teacherResourceSessionId)
        );
        setLoading('completed');
      } catch (err) {
        setLoading('error');
        dispatch(setSelectedResourceContent(undefined));
        dispatch(setSelectedResourceSessionId(undefined));
        console.error(err);
      }
    }
  };

  const handleAnswerSubmit = (contentId: string, answer: string[]) => {
    const contentIdAttemptCopy = deepClone(contentIdAttempt);
    if (!contentIdAttemptCopy[contentId]) {
      contentIdAttemptCopy[contentId] = new TeacherContentResponse({
        contentId: contentId,
        responses: [],
      });
    }
    contentIdAttemptCopy[contentId].responses.push(
      new ContentAttempt({
        startTime: startTime,
        endTime: Timestamp.fromDate(new Date()),
        answer,
      })
    );
    updateContentIdAttempt(contentIdAttemptCopy);
  };

  const getUpdatedContentAttempt = () => {
    const contentIdAttemptCopy = deepClone(contentIdAttempt);
    pageContent?.contents.forEach((con) => {
      const contentValue = con.model.value;
      const contentId =
        contentValue instanceof Content
          ? contentValue.contentId
          : contentValue instanceof Question
            ? contentValue.questionId
            : contentValue instanceof ResourceTeacherInstruction
              ? contentValue.resourceTeacherInstructionId
              : undefined;
      if (contentId) {
        if (!contentIdAttemptCopy[contentId]) {
          contentIdAttemptCopy[contentId] = new TeacherContentResponse({
            contentId: contentId,
          });
        }
        if (
          !(contentValue instanceof Question) ||
          contentIdAttemptCopy[contentId].responses.length === 0
        ) {
          contentIdAttemptCopy[contentId].responses.push(
            new ContentAttempt({
              startTime: startTime,
              endTime: Timestamp.fromDate(new Date()),
              answer: undefined,
            })
          );
        }
      }
    });
    return contentIdAttemptCopy;
  };

  const makeResponseObject = (
    sessionStatus: SessionStatusEnum
  ): UpdateTeacherResourceSessionRequest => {
    const contentIdAttemptCopy = getUpdatedContentAttempt();
    updateContentIdAttempt(contentIdAttemptCopy);
    return new UpdateTeacherResourceSessionRequest({
      teacherResourceSessionId: activeResourceSessionId,
      teacherId: teacher_id,
      resourceId,
      sessionStatus: sessionStatus,
      endTime:
        sessionStatus === SessionStatusEnum.SESSION_STATUS_EXITED ||
          sessionStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED
          ? Timestamp.fromDate(new Date())
          : undefined,
      response: Object.values(contentIdAttemptCopy),
    });
  };

  function getUpdatedVisitedResourceInfo(
    resourceId: string,
    pageNo: number,
    pageContentIds: string[]
  ) {
    const existingIndex = visitedResourceInfo.findIndex(
      (obj) => obj.resourceId === resourceId && obj.pageNo === pageNo
    );

    if (existingIndex > -1) {
      // If the object with the resourceId and pageNo exists, create a new object with the updated pageContentIds
      const updatedObject = new VisitedResourceContentInfoList({
        ...visitedResourceInfo[existingIndex],
        pageContentIds: Array.from(
          new Set([
            ...visitedResourceInfo[existingIndex].pageContentIds,
            ...pageContentIds,
          ])
        ),
      });
      // Return a new array with the updated object
      return [
        ...visitedResourceInfo.slice(0, existingIndex),
        updatedObject,
        ...visitedResourceInfo.slice(existingIndex + 1),
      ];
    } else {
      // If the object does not exist, return a new array with the new object added
      return [
        ...visitedResourceInfo,
        new VisitedResourceContentInfoList({
          resourceId,
          pageNo,
          pageContentIds,
        }),
      ];
    }
  }

  const makeLessonSessionObject = (
    resourceStatus: SessionStatusEnum
  ): UpdateTeacherLessonSessionRequest => {
    const resourceIdsCompletedCopy = completedResourceIds.slice();
    let lessonStatus = resourceStatus;
    // console.log("resourceStatus", resourceStatus)
    if (
      resourceStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED &&
      resourceId
    ) {
      if (!resourceIdsCompletedCopy.includes(resourceId)) {
        resourceIdsCompletedCopy.push(resourceId);
        setCompletedResourceIds(resourceIdsCompletedCopy);
      }
      const resourceIdsOfLesson =
        lessons_content?.resources.map((val) => val.resourceId) || [];
      const notCompletedResources = resourceIdsOfLesson.filter(
        (val) => !resourceIdsCompletedCopy.includes(val)
      );
      lessonStatus =
        notCompletedResources.length > 0 &&
          resourceStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED
          ? SessionStatusEnum.SESSION_STATUS_ONGOING
          : lessonStatus;
    }
    const pageNo = pageContent.pageNumber;
    const conIds = pageContent.contents.map((con) => {
      const contentValue = con.model.value;
      const contentId =
        contentValue instanceof Content
          ? contentValue.contentId
          : contentValue instanceof Question
            ? contentValue.questionId
            : contentValue instanceof ResourceTeacherInstruction
              ? contentValue.resourceTeacherInstructionId
              : undefined;
      return contentId || '';
    });
    const updatedResourceInfo = resourceId
      ? getUpdatedVisitedResourceInfo(resourceId, pageNo, conIds)
      : visitedResourceInfo;
    if (lessonSessionId) {
      dispatch(
        setUpdatedLessonSessionVisitedResourceInfo({
          ...lesson_session_visited_resource_info,
          [lessonSessionId]: updatedResourceInfo,
        })
      );
    }
    return new UpdateTeacherLessonSessionRequest({
      teacherId: teacher_id,
      teacherLessonSessionId: Number(lessonSessionId),
      lessonId,
      sessionStatus: lessonStatus,
      endTime:
        lessonStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED
          ? Timestamp.fromDate(new Date())
          : undefined,
      metrics: new TeacherLessonSessionMetrics({
        teacherLessonSessionId: Number(lessonSessionId),
        isComplete: lessonStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED,
        completedResourceIds: resourceIdsCompletedCopy,
        maxScore: 0,
        responseScore: 0,
        visitedResourceContentInfoList: updatedResourceInfo,
      }),
    });
  };

  const handleResourceCompleteOrEnd = async (
    sessionStatus: SessionStatusEnum
  ) => {
    if (viewMode) {
      navigate(-1);
      return;
    }
    const resp = await LmsCommonAPIServiceV1Client.updateTeacherResourceSession(
      makeResponseObject(sessionStatus)
    );
    if (lessonId && lessonSessionId && topicId && resourceId) {
      const resourceIds =
        lessons_content?.resources.map((val) => val.resourceId) || [];
      const currentIndex = resourceIds.indexOf(resourceId);
      const nextResourceId =
        currentIndex >= 0 ? resourceIds[currentIndex + 1] : undefined;
      const isOngoingLessonSession =
        nextResourceId &&
        sessionStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED;
      const resp2 =
        await LessonTeachAPIServiceV1Client.updateTeacherLessonSession(
          makeLessonSessionObject(sessionStatus)
        );
      if (isOngoingLessonSession) {
        onResourceClick(
          navigate,
          {
            resourceId: nextResourceId,
            lessonId: lessonId,
            lessonSessionId: Number(lessonSessionId),
            subjectId: Number(subjectId),
            topicId: Number(topicId),
            classId,
            section
          },
          SessionModeEnum.SESSION_MODE_LESSON_RESOURCE
        );
      } else {
        let redirectURL = `${TEACHING_FLOW}/${subjectId}/${topicId}/${lessonId}?lessonSessionId=${lessonSessionId}`;
        if (classId && section) {
          redirectURL = redirectURL + `&classId=${classId}&section=${section}`
        }
        navigate(redirectURL);
      }
      return;
    } else if (resourceRedirectionPath) {
      navigate(resourceRedirectionPath);
      dispatch(setResourceRedirectionPath(undefined));
    } else if (topicId && chapterId) {
      navigate(`${LESSON_PLAN_LISTS}/${subjectId}/${chapterId}/${topicId}`);
    } else if (chapterId) {
      navigate(`${TEACH_TOPIC_SELECTION}/${subjectId}/${chapterId}`);
    } else {
      navigate(HOME);
    }
  };

  const onNextClick = async () => {
    if (pageContents[pageNumber + 1]) {
      if (viewMode) {
        const contentIdAttemptCopy = getUpdatedContentAttempt();
        updateContentIdAttempt(contentIdAttemptCopy);
        setPageNumber(pageNumber + 1);
        return;
      }
      const resp =
        await LmsCommonAPIServiceV1Client.updateTeacherResourceSession(
          makeResponseObject(SessionStatusEnum.SESSION_STATUS_ONGOING)
        );
      if (lessonId && lessonSessionId) {
        const resp2 =
          await LessonTeachAPIServiceV1Client.updateTeacherLessonSession(
            makeLessonSessionObject(SessionStatusEnum.SESSION_STATUS_ONGOING)
          );
      }
      setPageNumber(pageNumber + 1);
    } else {
      handleResourceCompleteOrEnd(SessionStatusEnum.SESSION_STATUS_COMPLETED);
    }
  };

  const onPreviousClick = () => {
    if (pageNumber > 0 && pageContents[pageNumber - 1]) {
      setPageNumber(pageNumber - 1);
    }
  };

  const chooseHandler = () => {
    if (
      !lessons_content ||
      typeof resourceIndex !== 'number' ||
      !rawResourceContent
    ) {
      setLoading('error');
      return;
    }
    const lessonContentCopy = deepClone(lessons_content);
    const tempResources = lessonContentCopy?.resources.slice();
    if (viewMode === 'add') {
      tempResources.splice(
        resourceIndex,
        0,
        new ResourceInfo({
          resourceId: rawResourceContent.resourceId,
          title: rawResourceContent?.title,
          posterImageUrl: rawResourceContent.posterImageUrl,
          estimatedTimeInMin: rawResourceContent.estimatedTimeInMin,
          resourceType: rawResourceContent.resourceType,
          resourceCategoryType: rawResourceContent.resourceCategory,
        })
      );
      // rank fix
      tempResources.forEach((content, index) => {
        tempResources[index].rank = index + 1;
      });
      lessonContentCopy.resources = tempResources;

      dispatch(setLessonContent(lessonContentCopy));

      dispatch(
        setToastInfo({
          variant: 'info',
          label: `New Resource added - ${rawResourceContent?.title}`,
          open: true,
        })
      );
      navigate(`${EDIT_LESSON_PLAN}/${subjectId}/${topicId}/${lessonId}`);
    }
    if (viewMode == 'replace') {
      tempResources[resourceIndex] = new ResourceInfo({
        resourceId: rawResourceContent.resourceId,
        title: rawResourceContent?.title,
        posterImageUrl: rawResourceContent.posterImageUrl,
        estimatedTimeInMin: rawResourceContent.estimatedTimeInMin,
        resourceType: rawResourceContent.resourceType,
        resourceCategoryType: rawResourceContent.resourceCategory,
      });
      // rank fix
      tempResources.forEach((content, index) => {
        tempResources[index].rank = index + 1;
      });
      lessonContentCopy.resources = tempResources;
      dispatch(setLessonContent(lessonContentCopy));
      navigate(`${EDIT_LESSON_PLAN}/${subjectId}/${topicId}/${lessonId}`);
    }
  };

  const headerButtonHandler = () => {
    // console.log('headerButtonHandler');
    setLessonListPopupState(true);
  };

  const renderHeading = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          flexGrow: 1,
          alignItems: 'center',
          padding: { xs: pxToRem(15), md: pxTovW(0) },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: pxToRem(10), md: pxTovW(20) },
            // flexGrow: '1',
          }}
        >
          <ImageWrapper
            name="chapterImage"
            type="png"
            styles={styles.headingImage}
            parentFolder="tempAssets"
            path={getMediaBasePath(
              rawResourceContent?.posterImageUrl,
              'processedMediaBucket'
            )}
          />
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: pxToRem(10) }}
          >
            <Typography variant="elementH1">
              {rawResourceContent?.title}
            </Typography>
            <Box sx={styles.iconTextBoxContainer}>
              {[
                {
                  iconName: 'clock',
                  text: (rawResourceContent?.estimatedTimeInMin || 0) + 'Mins',
                },
                {
                  iconName: rawResourceContent?.resourceType
                    ? resourceTypeName(rawResourceContent.resourceType).icon
                    : 'questions',
                  text: rawResourceContent?.resourceType
                    ? resourceTypeName(rawResourceContent.resourceType).name
                    : 'Resource',
                },
              ].map((elem, index) => (
                <IconTextBox
                  key={index}
                  iconName={elem.iconName}
                  text={elem.text}
                  index={index}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          {viewMode === 'replace' || viewMode === 'add' ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={chooseHandler}
              sx={{
                top: { xs: pxToRem(-10), md: 0, lg: 0 },
                width: { xs: pxToRem(70), md: pxTovW(190), lg: pxTovW(120) },
                height: { xs: pxToRem(36), md: pxTovW(58), lg: pxTovW(45) },
              }}
            >
              <Typography variant="elementBodyText" color="common.white">
                Choose
              </Typography>
            </Button>
          ) : (
            sessionMode === SessionModeEnum.SESSION_MODE_TEACH && (
              <Button
                variant="contained"
                color="secondary"
                onClick={headerButtonHandler}
                sx={{
                  width: { xs: pxToRem(70), md: pxTovW(190), lg: pxTovW(120) },
                  height: { xs: pxToRem(36), md: pxTovW(58), lg: pxTovW(45) },
                  // padding: `${pxToRem(7)} ${pxToRem(30)}`,
                }}
              >
                <Typography variant="elementBodyText" color="common.white">
                  +Add
                </Typography>
              </Button>
            )
          )}
        </Box>
      </Box>
    );
  };

  if (loading === 'loading') {
    return <Loader />;
  }

  if (loading === 'error') {
    return (
      <Box
        width={{ xs: undefined, md: '95%' }}
        margin={{ xs: pxToRem(20), md: pxTovW(40) }}
        marginRight={{ xs: pxToRem(20), md: pxTovW(40) }}
      >
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      </Box>
    );
  }
  if (createLoader === true) {
    return <Loader />;
  }
  if (!resourceId || !selectedResourceContent) {
    return (
      <Box>
        <NoContentCard variant="info" icon="cards" text="No Cards available" />
      </Box>
    );
  }

  return (
    <Box sx={styles.resourcePage}>
      {(pageNumber === 0 || viewMode) && (
        <InPageHeader title={renderHeading()} />
      )}

      <ResourcePageContent
        pageContents={pageContents}
        pageNumber={pageNumber}
        contentIdAttempt={contentIdAttempt}
        handleAnswerSubmit={handleAnswerSubmit}
      />

      <Box sx={styles.paginationButtonBox}>
        <PaginationButton
          currentPage={pageNumber + 1}
          totalPages={pageContents.length}
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
        />
      </Box>

      <LessonListPopup
        popupState={lessonListPopupState}
        setPopupState={setLessonListPopupState}
        topic_id={topicId}
        subject_id={subjectId}
        resource_id={resourceId}
        setCreateLoaderState={setCreateLoader}
        section_id={class_subject_info?.sectionId}
      />
      {/* {createLoader === true && <Loader />} */}
    </Box>
  );
};

interface IBox {
  iconName: string;
  text?: string;
  index: number;
}

const IconTextBox = ({ iconName, text, index }: IBox) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(4), md: pxTovW(4) } }}>
      <IconWrapper name={iconName} size="md" parentFolder="icons" type="png" />
      <Typography
        variant="bodyText"
        fontWeight={'bold'}
        color={index % 2 === 0 ? 'primary' : 'secondary'}
      >
        {text}
      </Typography>
    </Box>
  );
};
