import {
  LmsHomewokTeacherAPIServiceV1Client,
  LmsHomeworkCommonAPIServiceV1Client,
} from '@geneo2-web/services-clients';
import {
  ClassAndSubjectPopup,
  FilterSortPopup,
  IClassAndSubjectSelected,
  IStyles,
  Loader,
  ManageHomeworkCard,
  PrimaryButton,
  SecondaryButton,
  SecondaryOutlinedButton,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { TabComp } from '../../../components/TabComp';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import {
  HOME,
  HOMEWORK_CHAPTER_SELECTION,
  HOMEWORK_COMPLETED,
  HOMEWORK_CURRENT,
  HOMEWORK_ONGOING,
} from '../../../routeHandling/RoutesNomenclature';
import { getSubjectsMap, subjectsWithClass } from '../../../utils/icons';
import { convertToSequenceInfo } from '../../Homework/ReviewHomework/functions';
import {
  setCreatedHomeworkStatus,
  setFetchedHwDetails,
  setModuleFilteredQuestions,
  setSelectedTasksInfo,
} from '../../Homework/reducer/homework.slice';
import {
  setHomeworkListsData,
  setSelectedHwId,
} from '../reducer/manageHomework.slice';

const styles: IStyles = {
  root: {
    width: '100vw',
    cursor: 'pointer',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    paddingLeft: { xs: pxToRem(20), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(241) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'hidden',
    // backgroundColor: 'red',
  },
  header: {
    width: '100%',
    height: { md: pxTovW(25) },
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    paddingBottom: { xs: pxToRem(20), md: 0 },
    paddingLeft: { xs: pxToRem(20), md: 0 },
  },
  inputBox: {
    display: 'flex',
    // flexDirection: 'column',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    justifyContent: { xs: 'space-between', md: 'center' },
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },
  inputFeild: {
    // backgroundColor: 'red',
    display: 'flex',
    height: { xs: pxToRem(50), md: pxTovW(56) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    border: '1px solid #CCE6FE',
    width: { xs: pxToRem(311), md: pxTovW(457) },
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputFeildBox: {
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
  },
};

export const ManageHomework = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const teacher_profile_id = getLocalStorage('userId');
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  //Draft
  const mapData = ['Assigned', 'Ended'];
  const subMap = getSubjectsMap();
  const dispatch = useAppDispatch();
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const [classSubject, setClassAndSubject] = useState<
    IClassAndSubjectSelected | undefined
  >(undefined);
  const { homework_list_data } = deserify(
    useAppSelector((state) => state.manageHomework)
  );
  // console.log(homework_list_data?.assigned);
  const [value, setValue] = useState(mapData[0]);

  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate(HOME);
  };

  useEffect(() => {
    setCount(assignedHomework?.length || 0);
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);
  useEffect(() => {
    if (teacher_profile_id) {
      getTeacherLessonList(teacher_profile_id);
    }
  }, [classSubject]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    switch (newValue) {
      case 'Assigned':
        setCount(assignedHomework?.length || 0);
        break;
      case 'Ended':
        setCount(endedHomework?.length || 0);
        break;
      case 'Draft':
        setCount(draftHomework?.length || 0);
        break;
      default:
        break;
    }
  };

  const cardClickHandler = (homeworkId: number, moduleId?: number) => {
    console.log('homeworkId', homeworkId);
    switch (value) {
      case 'Assigned':
        dispatch(setSelectedHwId(homeworkId));
        navigate(HOMEWORK_ONGOING);
        break;
      case 'Ended':
        dispatch(setSelectedHwId(homeworkId));
        navigate(HOMEWORK_COMPLETED);
        break;
      case 'Draft':
        if (moduleId) {
          getHomeworkDetails(homeworkId, moduleId.toString());
        }
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
  //^ SubjectPopup
  const [modalState, setModalState] = useState(false);
  const classAndsubjectClickHandler = (
    inputClassInfo: IClassAndSubjectSelected
  ) => {
    setClassAndSubject(inputClassInfo);
    // dispatch(setClassAndSubjectInfo(inputClassInfo));
    setModalState(false);
  };
  const getTeacherLessonList = async (teacherId: string) => {
    try {
      setLoading(true);
      // const response = await LmsTeacherHWAPIsSer({
      //   teacherId: BigInt(teacherId),
      // });
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.getTeacherHomeworkList({
          teacherId: BigInt(teacherId),
          sectionId: classSubject?.sectionId,
          subjectId: classSubject?.subjectId,
        });
      const data = response.data;
      // console.log(response.data);
      if (data?.homeworkList) {
        const hw_data = data.homeworkList;
        setAssignedHomework(data.homeworkList.assigned);
        setDraftHomework(data.homeworkList.draft);
        setEndedHomework(data.homeworkList.ended);
        dispatch(setHomeworkListsData(hw_data));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(err);
    }
  };
  const [assignedHomework, setAssignedHomework] = useState(
    homework_list_data?.assigned
  );
  const [endedHomework, setEndedHomework] = useState(homework_list_data?.ended);
  const [draftHomework, setDraftHomework] = useState(homework_list_data?.draft);
  const [count, setCount] = useState(0);
  const sortData = (data: any, sortvalue: any) => {
    switch (sortvalue) {
      case 'Score: High to Low':
        return data
          .slice()
          .sort((a: any, b: any) => (b.classScore || 0) - (a.classScore || 0));
      case 'Score: Low to High':
        return data
          .slice()
          .sort((a: any, b: any) => (a.classScore || 0) - (b.classScore || 0));
      case 'Date':
        return data
          .slice()
          .sort(
            (a: any, b: any) =>
              Number(a.homeworkTargetDate.seconds) -
              Number(b.homeworkTargetDate.seconds)
          );
        return data;
      case 'Submission':
        return data
          .slice()
          .sort(
            (a: any, b: any) =>
              (b.studentsSubmissionCount || 0) -
              (a.studentsSubmissionCount || 0)
          );
      case 'Difficulty':
        return data
          .slice()
          .sort((a: any, b: any) => b.difficultyLevel - a.difficultyLevel);
      default:
        return data;
    }
  };

  const SortFunction = (sortvalue: string) => {
    if (value === 'Assigned') {
      const temp = homework_list_data?.assigned.slice() || [];
      const sortedData = sortData(temp, sortvalue);
      setAssignedHomework(sortedData);
      // console.log(sortedData);
    } else if (value === 'Ended') {
      const temp = homework_list_data?.ended.slice() || [];
      const sortedData = sortData(temp, sortvalue);
      setEndedHomework(sortedData);
      // console.log(sortedData);
    } else if (value === 'Draft') {
      const temp = homework_list_data?.draft.slice() || [];
      const sortedData = sortData(temp, sortvalue);
      setDraftHomework(sortedData);
      // console.log(sortedData);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">Manage Homework</Typography>
      </Box>
      <Box
        sx={{
          position: { xs: 'fixed', md: 'sticky' },
          // top: { md: pxTovW(126) },
          left: { xs: 'unset', md: '100%' }, // md: pxTovW(1079)
          right: { xs: pxToRem(0), md: '100%' },
          bottom: { xs: pxToRem(10), md: '100%' },
          width: { xs: pxToRem(144), md: 'max-content' },
        }}
      >
        <PrimaryButton
          onClick={() =>
            navigate(
              `${HOMEWORK_CHAPTER_SELECTION}/${class_subject_info?.subjectId}`
            )
          }
        >
          <AddIcon fontSize={largeScreen ? 'large' : 'medium'} />
          {largeScreen ? (
            <Typography variant="bodyText" color="white" fontWeight="bold">
              NEW HOMEWORK
            </Typography>
          ) : (
            <Typography variant="smallText" color="white">
              New Homework
            </Typography>
          )}
        </PrimaryButton>
      </Box>

      <TabComp
        handleChange={handleChange}
        mapData={mapData}
        stateValue={value}
        count={count}
      />

      <Box sx={styles.inputFeildBox}>
        <Box sx={styles.inputBox}>
          {/* {largeScreen ? (
            <Box sx={styles.inputFeild}>
              <InputField
                value={'Daily Homework'}
                name="task_name"
                // onChange={changeDetailsHandler}
                variant="outlined"
              ></InputField>
              <ExpandMoreOutlinedIcon fontSize="medium" />
            </Box>
          ) : (
            <SecondaryButton withArrow>8A Science</SecondaryButton>
          )} */}

          <Box
            onClick={(e) => setModalState(true)}
            sx={{ flex: { xs: 1, md: 'unset' } }}
          >
            {largeScreen ? (
              <SecondaryOutlinedButton
                size="medium"
                witharrow={classSubject ? false : true}
              >
                {classSubject && classSubject.classname ? (
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h4">{`${classSubject?.classname} ${classSubject?.section} - ${classSubject?.subject}`}</Typography>
                    <CloseIcon
                      sx={{
                        color: 'common.black',
                        fontSize: { xs: pxToRem(14), md: pxTovW(18) },
                      }}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setClassAndSubject(undefined);
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="h4">Choose Class & Subject</Typography>
                )}
              </SecondaryOutlinedButton>
            ) : (
              <SecondaryButton witharrow>
                <Typography variant="h5" fontWeight="bold" color="white">
                  {classSubject
                    ? `${classSubject.classname}${classSubject.section}-${classSubject.subject}`
                    : 'Choose Class & Subject'}
                </Typography>
              </SecondaryButton>
            )}
          </Box>

          {/* <FilterSortPopup
            iconName="Filter"
            title="Filter"
            options={['High Score', 'Low Score', 'Medium Score']}
          /> */}

          <FilterSortPopup
            iconName="Sort"
            title="Sort By"
            options={[
              'Date',
              'Submission',
              'Score: Low to High',
              'Score: High to Low',
            ]}
            sortFunction={SortFunction}
          />
        </Box>
      </Box>

      <Box
        sx={{
          // backgroundColor: 'red',
          paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
          paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
          // maxHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {loading === true ? (
          // <Grid container columns={{ xs: 1, md: 3 }} rowGap={3}>
          //   {Array.from({ length: 5 }, (_, index) => (
          //     <Typography>No content</Typography>
          //   ))}
          //   ;
          // </Grid>
          <Loader />
        ) : error === true ? (
          <Typography>Error Occurred</Typography>
        ) : (
          <Grid
            container
            // columns={{ xs: 1, md: 3 }}
            rowGap={3}
            // columnGap={'26px'}
            sx={{ width: { md: pxTovW(1100) } }}
          >
            {value === 'Draft' &&
              draftHomework?.map((card, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ManageHomeworkCard
                    hwDraft={card}
                    subjectName={`${card.subject}`}
                    clickHandler={() =>
                      cardClickHandler(card.homeworkId, card.moduleId)
                    }
                    hwType="Draft"
                  />
                </Grid>
              ))}

            {value === 'Assigned' &&
              assignedHomework?.map((card, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ManageHomeworkCard
                    hwAssigned={card}
                    subjectName={card.subject}
                    clickHandler={() => cardClickHandler(card.homeworkId)}
                    hwType="Assigned"
                  />
                </Grid>
              ))}

            {value === 'Ended' &&
              endedHomework?.map((card, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ManageHomeworkCard
                    hwAssigned={card}
                    subjectName={card.subject}
                    clickHandler={() => cardClickHandler(card.homeworkId)}
                    hwType="Ended"
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>

      <ClassAndSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={subjectsWithClass}
        classSubjectsList={user_info?.teachClassSubjects}
        classAndsubjectClickHandler={classAndsubjectClickHandler}
      />
    </Box>
  );
};
