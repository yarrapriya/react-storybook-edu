import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  HeaderIconProps,
  HeaderIconWrapper,
  IStyles,
  SecondaryButton,
  StudentSubjectPopup,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../app/Context/GlobalContextProvider';
import { useAppSelector } from '../../reduxStore/reduxHooks';
import {
  HOME,
  HOMEWORK_STUDENT_DASHBOARD,
  LEARN_DASHBOARD,
  PERFORMANCE_STUDENT_DASHBOARD,
} from '../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../utils/icons';
import { setUserInfo } from '../Auth/reducer/auth.slice';
import { setResourceRedirectionPath } from '../Learn/reducer/learn.slice';
import ActiveHomeworkList from './components/ActiveHomeworkList';
import OngoingLessonList from './components/OngoingLessonList';
import RecommendedResourcesList from './components/RecommendedResourcesList';
import TextBookList from './components/TextBookList';
import { setHomeSelectedSubjectId } from './reducer/homeDashboard.slice';

export const Home = () => {
  const token = useAppSelector((state) => state.auth.userInfo?.token);
  const studentProfileId = deserify(
    useAppSelector((state) => state.auth.userInfo?.studentProfileId)
  );
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const styles: IStyles = {
    mainContainer: {
      padding: { md: `${pxTovW(40)} ${pxTovW(240)}` },
      paddingTop: { md: pxTovW(184) },
      // border: '2px solid red',
    },
  };

  const dispatch = useDispatch();

  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate(HOME);
  };
  useEffect(() => {
    dispatch(setResourceRedirectionPath(undefined));
    fetchStudentProfile();

    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  async function fetchStudentProfile() {
    try {
      const response = await UMSLoginAPIServiceV1Client.fetchStudentProfile({
        studentProfileId: studentProfileId,
      });
      const resp = response.data;
      if (resp) {
        if (token) {
          resp.token = token;
        }
        dispatch(setUserInfo(resp));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const [clickedFrom, setClickedFrom] = useState<
    'header' | 'learn' | undefined
  >(undefined);

  const onHomeworkClick = () => {
    // console.log('Homework Clicked');
    navigate(HOMEWORK_STUDENT_DASHBOARD);
  };
  const onAnalyticsClick = () => {
    // console.log('Homework Clicked');
    navigate(PERFORMANCE_STUDENT_DASHBOARD);
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const headerIconList: HeaderIconProps[] = [
    {
      fileName: 'teach',
      type: 'png',
      cardText: 'Learn',
      onClick: () => {
        if (typeof selectedSubjectId == 'number') {
          navigate(`${LEARN_DASHBOARD}/${selectedSubjectId}`);
        } else {
          setClickedFrom('learn');
          setModalState(true);
        }
      },
    },
    {
      fileName: 'new-hw',
      type: 'png',
      cardText: 'Homework',
      onClick: onHomeworkClick,
    },
    {
      fileName: 'analytics',
      type: 'png',
      cardText: 'Performance',
      onClick: onAnalyticsClick,
    },
  ];

  return (
    <>
      {mobile && (
        <Box sx={{ p: `${pxToRem(20)} ${pxToRem(20)} 0` }}>
          <SecondaryButton
            witharrow
            onClick={() => {
              setClickedFrom('header');
              setModalState(true);
            }}
            sx={{ position: 'relative', width: '100%' }}
          >
            <Typography variant="button" fontWeight="regular">
              {typeof selectedSubjectId == 'number'
                ? subMap[selectedSubjectId].subjectName
                : 'Choose Subject'}
            </Typography>
            {typeof selectedSubjectId == 'number' && (
              <CloseIcon
                sx={{
                  position: 'absolute',
                  right: '10px',
                  display: 'inline-block',
                  fontSize: { xs: pxToRem(14), md: pxTovW(18) },
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  dispatch(setHomeSelectedSubjectId(undefined));
                }}
              />
            )}
          </SecondaryButton>
        </Box>
      )}

      <Box sx={{ position: { md: 'fixed' }, width: '100vw', zIndex: 1 }}>
        <HeaderIconWrapper icons={headerIconList} />
      </Box>

      <Box sx={styles.mainContainer}>
        <ActiveHomeworkList />
        <OngoingLessonList />
        <RecommendedResourcesList />
        <TextBookList />
      </Box>

      <StudentSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={Object.values(subMap).map((sub) => ({
          subject: sub.subjectName,
          icon: sub.iconUrl,
          color: sub.textColor,
          onClick: () => {
            if (clickedFrom === 'learn') {
              // dispatch(setHomeSelectedSubjectId(sub.subjectId))
              navigate(`${LEARN_DASHBOARD}/${sub.subjectId}`);
            } else {
              dispatch(setHomeSelectedSubjectId(sub.subjectId));
            }
            setModalState(false);
          },
        }))}
        title="Choose Subject"
      />
    </>
  );
};

export default Home;
