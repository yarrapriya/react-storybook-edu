import { Timestamp } from '@bufbuild/protobuf';
import {
  LmsHomewokTeacherAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ImageWrapper,
  InfoDisplayPanel,
  NewSectionList,
  deserify,
  firstLetterImage,
  getDifficultyLevelString,
  getHumanReadableTimestampString,
  getLocalStorage,
  getMediaBasePath,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';
import { HomeworkTask } from '@protos/learning_management/lms.hw.common.apis_pb';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOMEWORK_COMPLETED,
  HOMEWORK_CURRENT,
  HOMEWORK_ONGOING,
} from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../../utils/icons';
import { convertToSequenceInfo } from '../../Homework/ReviewHomework/functions';
import {
  resetCreatedHomeworkStatus,
  resetSelectedTasksInfo,
  setCreatedHomeworkStatus,
  setFetchedHwDetails,
  setModuleFilteredQuestions,
  setSelectedTasksInfo,
} from '../../Homework/reducer/homework.slice';
import {
  setHomeworkListsData,
  setSelectedHwId,
} from '../../ManageHomework/reducer/manageHomework.slice';
import SectionListSckeleton from '../shimmer';

export default function HomeHomeworksList() {
  const navigate = useNavigate();
  const [homeworkList, setHomeworkList] = useState<HomeworkTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useAppDispatch();
  const teacher_profile_id = getLocalStorage('userId');
  const { homework_list_data } = useAppSelector(
    (state) => state.manageHomework
  );
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);

  const subMap = getSubjectsMap();

  useEffect(() => {
    dispatch(resetSelectedTasksInfo());
    dispatch(resetCreatedHomeworkStatus());
  }, []);

  useEffect(() => {
    getTeacherLessonList(teacher_profile_id);
  }, [class_subject_info]);

  const getTeacherLessonList = async (teacherId: string) => {
    try {
      setLoading(true);
      // const response = await LmsTeacherHWAPIsSer({
      //   teacherId: BigInt(teacherId),
      // });
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getTeacherHomeworkList({
          teacherId: BigInt(teacherId),
          sectionId: class_subject_info?.sectionId,
          subjectId: class_subject_info?.subjectId,
        });
      const data = response.data;
      if (data?.homeworkList) {
        // console.log(data);
        const hw_data = data.homeworkList;
        dispatch(setHomeworkListsData(hw_data));
        const list = [
          ...data.homeworkList.assigned,
          ...data.homeworkList.ended,
        ];

        //even after sending a subject id as payload all the homeworks are received,
        //even if we use filter at our end then only few combination of (subject and class) have data
        setHomeworkList(list);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };
  const cardClickHandler = (
    homeworkId: number,
    homeworkTargetDate?: Timestamp,
    moduleId?: number
  ) => {
    if (!homeworkTargetDate) {
      return;
    }
    if (!homeworkTargetDate) {
      if (moduleId) {
        getHomeworkDetails(homeworkId, moduleId.toString());
        return;
      }
    }
    const time = homeworkTargetDate.toDate();
    const isEnded = hasTimePassed(time.getTime().toString());
    switch (isEnded) {
      case false:
        dispatch(setSelectedHwId(homeworkId));
        navigate(HOMEWORK_ONGOING);
        break;
      case true:
        dispatch(setSelectedHwId(homeworkId));
        navigate(HOMEWORK_COMPLETED);
        break;
      default:
        break;
    }
  };
  const getHomeworkDetails = async (homeworkId: number, moduleId: string) => {
    try {
      const response =
        await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
          personId: teacher_profile_id,
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          homeworkId: homeworkId,
        });
      if (response.data) {
        const HwData = response.data;
        dispatch(setCreatedHomeworkStatus(HwData.homework?.taskCreationStatus));
        dispatch(
          setModuleFilteredQuestions({ questions: HwData.homeworkContent })
        );
        dispatch(setFetchedHwDetails(HwData.homework));
        const sequenceInfo = convertToSequenceInfo(
          HwData.questionsSequenceInfo
        );
        if (sequenceInfo) {
          dispatch(setSelectedTasksInfo(sequenceInfo));
        }
        navigate(`${HOMEWORK_CURRENT}/${moduleId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  function hasTimePassed(milliseconds: string) {
    const currentTime = new Date().getTime();
    const targetTime = Number(milliseconds);
    return targetTime <= currentTime;
  }

  return loading === true ? (
    <SectionListSckeleton />
  ) : (
    <Box>
      <NewSectionList
        noContentMessage="No Homeworks for Today"
        isError={error}
        rightPanelWidth="1214"
        itemsPerPage={4}
        sectionTitle="Homeworks"
        items={homeworkList.map((hw) => (
          <InfoDisplayPanel
            defaultImage="homework-v1"
            image={getMediaBasePath(
              hw.homeworkPosterImgUrl,
              'processedMediaBucket'
            )}
            cardClickHandler={() =>
              cardClickHandler(
                hw.homeworkId,
                hw.homeworkTargetDate,
                hw.moduleId
              )
            }
            variant="small"
            blueSubText={`${hw.class}${hw.section} - ${hw.subject}`}
            mainHeading={hw.homeworkTitle}
            iconDetails={[
              { iconName: 'clock', text: `${hw.estimatedTimeInMin} mins` },
              {
                iconName: 'questions',
                text: `${hw.homeworkContentInfo?.numberOfQuestions}`,
              },
              {
                iconName: 'bar-graph',
                text: `${getDifficultyLevelString(hw.difficultyLevel)}`,
              },
            ]}
            status={<LessonPlanInfoPanelStatus lesson={hw} />}
          />
        ))}
      />
    </Box>
  );
}

interface InfoDisplayPanelStatus {
  lesson: HomeworkTask;
}
const LessonPlanInfoPanelStatus = ({ lesson }: InfoDisplayPanelStatus) => {
  // const taughtTime = getHumanReadableTimestampString(
  //   lesson.lastSessionTime
  // )?.split(' ');
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const editTime = getHumanReadableTimestampString(
    lesson.lastModifiedTime
  )?.split(' ');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `${pxTovW(2)} solid #E7E7E7D9`,
        pt: { xs: pxToRem(5), md: pxTovW(5) },
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: pxToRem(5), md: pxTovW(5) },
        }}
      >
        <ImageWrapper
          name="geneo-blue"
          type="png"
          parentFolder="icons"
          styles={{
            width: { xs: pxToRem(18), md: pxTovW(28) },
            height: { xs: pxToRem(18), md: pxTovW(28) },
            borderRadius: '50%',
          }}
          path={
            lesson.teacherProfileImageUrl ||
            firstLetterImage(lesson.teacherName) ||
            firstLetterImage('Geneo')
          }
        />
        <Typography variant="smallText" fontWeight="bold">
          {user_info?.teacherProfileId.toString() ===
            lesson?.teacherId?.toString()
            ? 'You'
            : lesson.teacherName || 'Geneo'}
        </Typography>
      </Box>

      {lesson.teacherName && (
        <Typography variant="subText" color="text.disabled">
          {editTime && Number(editTime[0]) < 2
            ? 'Recently Edited'
            : 'Edited ' + editTime?.join(' ')}
        </Typography>
      )}
    </Box>
  );
};
