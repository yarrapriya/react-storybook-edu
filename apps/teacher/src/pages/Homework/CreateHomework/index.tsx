import {
  LmsHomewokTeacherAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  HomeworkCard,
  IStyles,
  IconWrapper,
  ImageWrapper,
  PrimaryButton,
  deserify,
  firstLetterImage,
  getHumanReadableTimestampString,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  HomeworkTask,
  HomeworksByModule,
} from '@protos/learning_management/lms.hw.common.apis_pb';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_CURRENT } from '../../../routeHandling/RoutesNomenclature';
import {
  calculateMinMaxTime,
  totalNoQuestions,
} from '../../../utils/functions';
import { ReadylessonShimmer } from '../../Teach/LessonPlanLists/shimmer';
import DifficultyNos from '../ReviewHomework/components/DifficultyNos';
import InfoBar from '../ReviewHomework/components/InfoBar';
import {
  convertToSequenceInfo,
  createTaskInfoModel,
} from '../ReviewHomework/functions';
import {
  setCreatedHomeworkStatus,
  setFetchedHwDetails,
  setModuleFilteredQuestions,
  setQuestionStats,
  setQuestionsCount,
  setSelectedTasksInfo,
} from '../reducer/homework.slice';
import { ReadymadeHomeworkSection } from './components/ReadymadeHw';
const styles: IStyles = {
  root: {
    bgcolor: 'neutral.paleGrey',
    paddingLeft: { xs: pxToRem(20), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(5), md: pxTovW(10) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
  },
  addBox: {
    height: { xs: 'max-content', md: pxTovW(259) },
    width: { xs: '90vw', md: pxTovW(651) },
    borderRadius: { md: pxToRem(30) },
    backgroundColor: '#FFFFFF',
    border: { md: '1px solid #EAEAEA' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: { md: `0px 3px ${pxToRem(35)} #0000000F` },
    padding: { xs: 0, md: pxTovW(40) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
  },
  countBox: {
    height: { xs: pxToRem(79), md: pxTovW(141) },
    width: { xs: pxToRem(297), md: pxTovW(530.09) },
    borderRadius: pxToRem(10),
    backgroundColor: '#FFFFFF',
    border: '1px dashed #BEB8FD',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 3px ${pxToRem(35)} #0000000F`,
    padding: { xs: pxToRem(20), md: pxTovW(40) },
  },
};
export const CreateHomework = () => {
  const navigate = useNavigate();
  const { module_id } = useParams();
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const { questions_count, chapterwise_topic, questions_stats } = deserify(
    useAppSelector((state) => state.homework)
  );
  const dispatch = useAppDispatch();
  const teacher_id = getLocalStorage('userId');
  const { setSelectedFunction } = useGlobalContext();
  const [hwLoading, setHwLoading] = useState(false);
  const [hwError, setHwError] = useState(false);
  const [quesLoading, setQuesLoading] = useState(false);
  const [quesError, setQuesError] = useState(false);
  const [homeworkList, sethomeworkList] = useState<
    HomeworksByModule | undefined
  >();
  const location = useLocation();
  // console.log('location', location);

  useEffect(() => {
    if (module_id) {
      fetchHomeworks(module_id);
      getModuleQuestionStats();
    }
  }, [module_id]);
  const fetchHomeworks = async (moduleId: string) => {
    try {
      setHwLoading(true);
      const response =
        await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworksByModule({
          personId: teacher_id,
          personType: ProfileRolesEnum.PROFILE_ROLE_TEACHER,
          moduleId: Number(moduleId),
        });
      if (response.data) {
        // console.log('fetchHomeworks', response.data);

        const sortedData = response.data?.existingHomeworks.sort(
          (a, b) =>
            Number(b.lastModifiedTime?.seconds) -
            Number(a.lastModifiedTime?.seconds)
        );

        response.data.existingHomeworks = sortedData;

        sethomeworkList(response.data);
      }
      setHwLoading(false);
    } catch (err) {
      console.log(err);
      setHwLoading(false);
      setHwError(true);
    }
  };
  const getModuleQuestions = async (moduleId: string) => {
    try {
      setQuesLoading(true);
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getModuleQuestionsWithFilters(
          {
            teacherId: teacher_id,
            subjectId: class_subject_info?.subjectId,
            moduleId: Number(moduleId),
            requiredDifficultyLevelsCountInfo: questions_count,
          }
        );
      if (response.data) {
        dispatch(
          setModuleFilteredQuestions({ questions: response.data.questions })
        );
        const tasksInfo = createTaskInfoModel(response.data.questions);
        dispatch(setSelectedTasksInfo(tasksInfo));
      }
      setQuesLoading(false);
      navigate(`${HOMEWORK_CURRENT}/${moduleId}`);
    } catch (err) {
      console.log(err);
      setQuesLoading(false);
      setQuesError(true);
    }
  };
  const homeworkCardClickHandler = (homeworkId: number) => {
    if (module_id) {
      getHomeworkDetails(homeworkId, module_id);
    }
  };
  const getHomeworkDetails = async (homeworkId: number, moduleId: string) => {
    try {
      const response =
        await LmsHomeworkCommonAPIServiceV1Client.fetchHomeworkContent({
          personId: teacher_id,
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
        dispatch(setQuestionsCount());
        navigate(`${HOMEWORK_CURRENT}/${moduleId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getModuleQuestionStats = async () => {
    try {
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getModuleQuestionStats({
          moduleId: Number(module_id),
        });
      if (response.data) {
        dispatch(setQuestionStats(response.data));
      }
    } catch (err) {
      console.log(err);
      setQuestionStats(undefined);
    }
  };
  const createClickHandler = () => {
    if (module_id) {
      getModuleQuestions(module_id);
    }
  };
  const filteredTopic = (topicId: number) => {
    return chapterwise_topic?.chapterTopics.find((e) => e.topicId === topicId);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">
          {filteredTopic(Number(module_id))?.topicTitle || 'Topic Name'}
        </Typography>
        <Typography variant="cardText" sx={{ color: '#007CDC' }}>
          Class {class_subject_info?.classname}
          {class_subject_info?.section} | {class_subject_info?.subject}
        </Typography>
      </Box>

      <Grid container columnSpacing={pxTovW(48)} rowSpacing={pxToRem(20)}>
        <Grid item xs={12} md={6}>
          {hwLoading === true ? (
            <ReadylessonShimmer />
          ) : (
            <ReadymadeHomeworkSection
              sectionTitle="Ready Homeworks"
              items={homeworkList?.existingHomeworks.map((e) => (
                <HomeworkCard
                  homeworkTask={e}
                  cardClickHandler={() =>
                    homeworkCardClickHandler(e.homeworkId)
                  }
                  status={<LessonPlanInfoPanelStatus homeworkTask={e} />}
                />
              ))}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4} sx={{}}>
          <Box
            sx={{
              paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
              gap: { xs: pxToRem(10), md: pxTovW(10), alignItems: 'center' },
            }}
          >
            <Typography variant="h2" fontWeight="bold">
              Create Homeworks
            </Typography>
            <Typography variant="h3" sx={{ color: '#6D6C6C' }}>
              Add Questions Across Level
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: pxToRem(25), md: pxTovW(40) },
              paddingRight: { xs: pxToRem(20), md: 0 },
            }}
          >
            <DifficultyNos mobileVariant="vertical" desktopVariant="vertical" />
            <InfoBar
              contentList={[
                {
                  iconName: 'questions',
                  quantity: `${totalNoQuestions(questions_count)}`,
                  label: 'Questions',
                },
                {
                  iconName: 'clock',
                  quantity: `${calculateMinMaxTime(questions_count).min}-${calculateMinMaxTime(questions_count).max
                    }`,
                  label: 'Minutes',
                },
              ]}
            />
            <PrimaryButton
              onClick={createClickHandler}
              disabled={
                !questions_stats ||
                (questions_count.noOfHighQuestions === 0 &&
                  questions_count.noOfLowQuestions === 0 &&
                  questions_count.noOfMediumQuestions === 0)
              }
            >
              Create
            </PrimaryButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

interface InfoDisplayPanelStatus {
  homeworkTask: HomeworkTask;
}
const LessonPlanInfoPanelStatus = ({
  homeworkTask,
}: InfoDisplayPanelStatus) => {
  const { user_info } = deserify(useAppSelector((state) => state.auth));

  const editTime = getHumanReadableTimestampString(
    homeworkTask?.lastModifiedTime
  )?.split(' ');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: { xs: pxToRem(10), md: pxTovW(10) },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: pxToRem(5),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageWrapper
          path={
            homeworkTask?.teacherProfileImageUrl ||
            firstLetterImage(homeworkTask?.teacherName || 'Geneo')
          }
          name={homeworkTask?.teacherName || 'Geneo'}
          type="png"
          parentFolder="tempAssets"
          styles={{
            height: { xs: pxToRem(18), md: pxTovW(28) },
            width: { xs: pxToRem(18), md: pxTovW(28) },
            borderRadius: '50%',
          }}
        />

        {/* <Typography variant="smallText" fontWeight="bold">
          {homeworkTask?.teacherName || 'Geneo'}
        </Typography> */}

        <Typography variant="smallText" fontWeight="bold">
          {user_info?.teacherProfileId.toString() ===
            homeworkTask?.teacherId?.toString()
            ? 'You'
            : homeworkTask.teacherName || 'Geneo'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(2), md: pxTovW(2) },
          // wordWrap: 'break-word',
          alignItems: 'center',
          width: 'max-content',
        }}
      >
        <IconWrapper
          name="clock"
          size="small"
          parentFolder="icons"
          type="png"
        />
        {/* <Typography variant="smallText" color="#007CDC">
      {homeworkTask?.estimatedTimeInMin?.toString()}
    </Typography> */}
        <Typography variant="subText" color="text.disabled">
          {editTime && Number(editTime[0]) < 2
            ? 'Recently Edited'
            : 'Edited ' + editTime?.join(' ')}
        </Typography>
      </Box>
    </Box>
  );
};
