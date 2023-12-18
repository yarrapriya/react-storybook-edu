import { Timestamp } from '@bufbuild/protobuf';
import {
  ContentCommonAPIServiceV1Client,
  LessonLearnAPIServiceV1Client,
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
  getStudentSubjectEnum,
  pxToRem,
  pxTovW,
  transformResourceTypeEnumValue,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import {
  Content,
  Question,
  ResourceContent,
  ResourceTeacherInstruction,
} from '@protos/content_management/content.db_pb';
import { UpdateStudentResourceSessionRequest } from '@protos/learning_management/lms.common.apis_pb';
import {
  ContentAttempt,
  SessionModeEnum,
  SessionStatusEnum,
  StudentLessonSessionMetrics,
  TeacherContentResponse,
  VisitedResourceContentInfoList,
} from '@protos/learning_management/lms.db_pb';
import { UpdateStudentLessonSessionRequest } from '@protos/learning_management/lms.lesson.learn.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  LEARN_TOPIC_SELECTION,
  TOPIC_LESSON,
} from '../../../routeHandling/RoutesNomenclature';
import { onLessonCardClick, onResourceClick } from '../../../utils/learn';
import {
  setResourceRedirectionPath,
  setSelectedResourceContent,
  setSelectedResourceSessionId,
  setUpdatedLessonSessionVisitedResourceInfo,
} from '../reducer/learn.slice';

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
export default function ResourceView(props: IProps) {
  const navigate = useNavigate();
  const userInfo = deserify(useAppSelector((state) => state.auth.userInfo));
  const studentId = userInfo?.studentProfileId;
  const activeResourceContent = deserify(
    useAppSelector((state) => state.learn.selected_resource_content)
  )?.parsedData;
  const rawResourceContent = deserify(
    useAppSelector((state) => state.learn.selected_resource_content)
  )?.rawData;
  const activeResourceSessionId = deserify(
    useAppSelector((state) => state.learn.selected_resource_session_id)
  );
  const selectedLessonContent = deserify(
    useAppSelector((state) => state.learn.selected_lesson_content)
  );

  const [completedResourceIds, setCompletedResourceIds] = useState<string[]>(
    []
  );
  const { setSelectedFunction } = useGlobalContext();

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
  const sessionMode = session_mode
    ? (Number(session_mode) as SessionModeEnum)
    : undefined;
  const lesson_session_visited_resource_info =
    deserify(
      useAppSelector(
        (state) => state.learn.lesson_session_visited_resource_info
      )
    ) || {};
  const visitedResourceInfo =
    (lessonSessionId
      ? lesson_session_visited_resource_info[lessonSessionId]
      : []) || [];
  const resourceRedirectionPath = useAppSelector(
    (state) => state.learn.resource_redirection_path
  );
  const pageContents = (
    new ResourceContent(activeResourceContent)?.resourceContentData
      ?.pageContent || []
  ).sort((a, b) => a.pageNumber - b.pageNumber);
  const [pageNumber, setPageNumber] = useState(0);
  const [contentIdAttempt, updateContentIdAttempt] = useState<ContentIdAttempt>(
    {}
  );

  const pageContent = pageContents[pageNumber];
  const [startTime, setStartTime] = useState(Timestamp.fromDate(new Date()));
  const [loading, setLoading] = useState<'loading' | 'completed' | 'error'>(
    'completed'
  );

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
            personId: studentId,
            personType: ProfileRolesEnum.PROFILE_ROLE_STUDENT,
            resourceId: resourceId,
          });
        const resourceSession =
          await LmsCommonAPIServiceV1Client.createStudentResourceSession({
            studentId: studentId,
            sessionMode: sessionMode,
            startTime: Timestamp.fromDate(new Date()),
            resourceId: resourceId,
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
            moduleId: topicId
              ? Number(topicId)
              : chapterId
              ? Number(chapterId)
              : undefined,
            studentLessonSessionId:
              lessonSessionId && !isNaN(Number(lessonSessionId))
                ? Number(lessonSessionId)
                : undefined,
            sessionStatus: SessionStatusEnum.SESSION_STATUS_STARTED,
          });
        const gcpJsonURL = resourceContent.data?.gcpJsonUrl;
        if (!gcpJsonURL) {
          throw Error('Error while loading resource content');
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
        if (lessonId) {
          const prevLessonSessionInfo =
            await LessonLearnAPIServiceV1Client.getPreviousLessonSessionInfo({
              studentId: userInfo?.studentProfileId,
              lessonId: lessonId,
            });
          const resIds = prevLessonSessionInfo.data?.completedResourceIds;
          if (resIds && resIds.length > 0) {
            setCompletedResourceIds(resIds);
          } else {
            setCompletedResourceIds([]);
          }
        } else {
          setCompletedResourceIds([]);
        }
        dispatch(
          setSelectedResourceSessionId(resourceSession.studentResourceSessionId)
        );
        setLoading('completed');
      } catch (err) {
        console.error(err);
        setLoading('error');
        dispatch(setSelectedResourceContent(undefined));
        setCompletedResourceIds([]);
        dispatch(setSelectedResourceSessionId(undefined));
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

  const makeResponseObject = (
    sessionStatus: SessionStatusEnum
  ): UpdateStudentResourceSessionRequest => {
    const contentIdAttemptCopy = deepClone(contentIdAttempt);
    pageContent?.contents.forEach((con) => {
      const contentValue = con.model.value;
      const contentId =
        contentValue instanceof Content
          ? contentValue.contentId
          : contentValue instanceof Question
          ? contentValue.questionId
          : contentValue instanceof ResourceTeacherInstruction
          ? contentValue.resourceId
          : undefined;
      if (contentId) {
        if (!contentIdAttemptCopy[contentId]) {
          contentIdAttemptCopy[contentId] = new TeacherContentResponse({
            contentId: contentId,
          });
        }
        if (
          !(contentValue instanceof Question) ||
          contentIdAttemptCopy[contentId].responses.length == 0
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
    updateContentIdAttempt(contentIdAttemptCopy);
    return new UpdateStudentResourceSessionRequest({
      studentResourceSessionId: activeResourceSessionId,
      studentId: studentId,
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
  ): UpdateStudentLessonSessionRequest => {
    const resourceIdsCompletedCopy = completedResourceIds.slice();
    let lessonStatus = resourceStatus;
    if (
      resourceStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED &&
      resourceId
    ) {
      if (!resourceIdsCompletedCopy.includes(resourceId)) {
        resourceIdsCompletedCopy.push(resourceId);
        setCompletedResourceIds(resourceIdsCompletedCopy);
      }
      const resourceIdsOfLesson =
        selectedLessonContent?.resources.map((val) => val.resourceId) || [];
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
    return new UpdateStudentLessonSessionRequest({
      studentId: userInfo?.studentProfileId,
      studentLessonSessionId: Number(lessonSessionId),
      lessonId,
      sessionStatus: lessonStatus,
      endTime:
        lessonStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED
          ? Timestamp.fromDate(new Date())
          : undefined,
      sessionMode: sessionMode,
      metrics: new StudentLessonSessionMetrics({
        studentLessonSessionId: Number(lessonSessionId),
        isComplete: lessonStatus == SessionStatusEnum.SESSION_STATUS_COMPLETED,
        responseScore: 0,
        maxScore: 0,
        completedResourceIds: resourceIdsCompletedCopy,
        visitedResourceContentInfoList: updatedResourceInfo,
      }),
    });
  };

  const handleResourceCompleteOrEnd = async (
    sessionStatus: SessionStatusEnum
  ) => {
    const resp = await LmsCommonAPIServiceV1Client.updateStudentResourceSession(
      makeResponseObject(sessionStatus)
    );
    if (lessonId && lessonSessionId && topicId && resourceId) {
      const resourceIds =
        selectedLessonContent?.resources.map((val) => val.resourceId) || [];
      const currentIndex = resourceIds.indexOf(resourceId);
      const nextResourceId =
        currentIndex >= 0 ? resourceIds[currentIndex + 1] : undefined;
      const isOngoingLessonSession =
        nextResourceId &&
        sessionStatus === SessionStatusEnum.SESSION_STATUS_COMPLETED;
      const resp2 =
        await LessonLearnAPIServiceV1Client.updateStudentLessonSession(
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
          },
          SessionModeEnum.SESSION_MODE_LESSON_RESOURCE
        );
      } else {
        onLessonCardClick(dispatch, navigate, {
          subjectId: Number(subjectId),
          lessonId: lessonId,
          topicId: Number(topicId),
          lessonSessionId: Number(lessonSessionId),
        });
      }
      return;
    }
    if (resourceRedirectionPath) {
      navigate(resourceRedirectionPath);
      dispatch(setResourceRedirectionPath(undefined));
    } else if (topicId && chapterId) {
      navigate(`${TOPIC_LESSON}/${subjectId}/${chapterId}/${topicId}`);
    } else if (chapterId) {
      navigate(`${LEARN_TOPIC_SELECTION}/${subjectId}/${chapterId}`);
    } else {
      navigate(HOME);
    }
  };

  const onNextClick = async () => {
    if (pageContents[pageNumber + 1]) {
      const resp =
        await LmsCommonAPIServiceV1Client.updateStudentResourceSession(
          makeResponseObject(SessionStatusEnum.SESSION_STATUS_ONGOING)
        );
      if (lessonId && lessonSessionId) {
        const resp2 =
          await LessonLearnAPIServiceV1Client.updateStudentLessonSession(
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

  const renderHeading = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          padding: { xs: pxToRem(15), md: pxTovW(0) },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: pxToRem(10), md: pxTovW(20) },
            flexGrow: '1',
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
              {rawResourceContent?.title || ''}
            </Typography>
            <Box sx={styles.iconTextBoxContainer}>
              {[
                {
                  iconName: 'clock',
                  text: (rawResourceContent?.estimatedTimeInMin || 0) + 'Mins',
                },
                {
                  iconName: 'questions',
                  text: rawResourceContent?.resourceType
                    ? transformResourceTypeEnumValue(
                        rawResourceContent.resourceType
                      )
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
          {/* <Button variant="contained" color="secondary">
            Add
          </Button> */}
        </Box>
      </Box>
    );
  };

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

  if (loading === 'loading') {
    return <Loader />;
  }

  if (!resourceId || !activeResourceContent) {
    return (
      <Box>
        <NoContentCard variant="info" icon="cards" text="No Data available" />
      </Box>
    );
  }

  return (
    <Box sx={styles.resourcePage}>
      {pageNumber == 0 && <InPageHeader title={renderHeading()} />}
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
    </Box>
  );
}

const cdcIconDetails = [
  {
    iconName: 'clock',
    text: '_15 Min',
  },
  {
    iconName: 'questions',
    text: '_video',
  },
];

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
