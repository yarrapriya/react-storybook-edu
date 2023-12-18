import { useEffect, useState } from 'react';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import {
  ClassAndSubjectPopup,
  HeaderIconProps,
  HeaderIconWrapper,
  IClassAndSubjectSelected,
  IStyles,
  SecondaryButton,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { useNavigate } from 'react-router-dom';
import {
  ANALYTICS_CLASS_SELECTION,
  HOME,
  HOMEWORK_CHAPTER_SELECTION,
  HOMEWORK_MANAGE,
  TEACH_CHAPTER_SELECTION,
} from '../../routeHandling/RoutesNomenclature';

import { useGlobalContext } from '../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../reduxStore/reduxHooks';
import { subjectsWithClass } from '../../utils/icons';
import FeatureList, { FeatureType } from './components/FeatureList';
import HomeHomeworksList from './components/HomeHomeworksList';
import HomeLessonPlansList from './components/HomeLessonPlansList';
import { TeacherHomeMobileCarousel } from './components/TeacherHomeMobileCarousel';
import { TeacherHomeWebCarousel } from './components/TeacherHomeWebCarousel';
import { setClassAndSubjectInfo } from './reducer/homeDashboard.slice';
import { UMSLoginAPIServiceV1Client } from '@geneo2-web/services-clients';
import { setUserInfo } from '../Auth/reducer/auth.slice';

const styles: IStyles = {
  root: {},
  mainContainer: {
    padding: { md: `${pxTovW(40)} ${pxTovW(240)}` },
    paddingTop: { md: pxTovW(184) },
  },
};

export const Home = () => {
  const token = deserify(
    useAppSelector((state) => state.auth.user_info?.token)
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);
  const [currentRoute, setCurrentRoute] = useState('');
  const teacher_profile_id = deserify(getLocalStorage('userId'));

  const { setSelectedFunction } = useGlobalContext();
  const backButtonClick = async () => {
    navigate(HOME);
  };
  useEffect(() => {
    fetchTeacherProfile();
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, []);

  async function fetchTeacherProfile() {
    try {
      const response = await UMSLoginAPIServiceV1Client.fetchTeacherProfile({
        teacherProfileId: teacher_profile_id,
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

  // useEffect(() => {
  //   //geneo.ums.login.UMSLoginAPIServiceV1/fetchTeacherProfile
  // }, []);

  //^ SubjectPopup
  const [subjectPopupState, setSubjectPopupState] = useState(false);

  const dashBoardrouting = (route: string) => {
    if (!class_subject_info) {
      setSubjectPopupState(true);
      setCurrentRoute(route);
    } else {
      navigate(route);
    }
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const featureList: FeatureType[] = [
    {
      fileName: 'book',
      type: 'png',
      cardText: 'Create your Homework in 2 Minutes',
      bgColor: '#EEFFB3',
      onClick: () =>
        dashBoardrouting(
          `${HOMEWORK_CHAPTER_SELECTION}/${class_subject_info?.subjectId}`
        ),
    },
    {
      fileName: 'provision',
      type: 'png',
      cardText: 'Curriculum Teaching Resources',
      bgColor: '#DAF5FF',
      onClick: () =>
        dashBoardrouting(
          `${TEACH_CHAPTER_SELECTION}/${class_subject_info?.subjectId}`
        ),
    },
    {
      fileName: 'homework',
      type: 'png',
      cardText: 'Class Analysis',
      bgColor: '#FFEEEE',
      onClick: () => dashBoardrouting(ANALYTICS_CLASS_SELECTION),
    },
  ];

  const headerIconList: HeaderIconProps[] = [
    {
      fileName: 'teach',
      type: 'png',
      cardText: 'Teach',
      onClick: () => {
        dashBoardrouting(
          `${TEACH_CHAPTER_SELECTION}/${class_subject_info?.subjectId}`
        );
      },
    },
    {
      fileName: 'new-hw',
      type: 'png',
      cardText: 'New Homework',
      onClick: () =>
        dashBoardrouting(
          `${HOMEWORK_CHAPTER_SELECTION}/${class_subject_info?.subjectId}`
        ),
    },
    {
      fileName: 'manage-hw',
      type: 'png',
      cardText: 'Manage Homework',
      onClick: () => dashBoardrouting(HOMEWORK_MANAGE),
    },
    {
      fileName: 'analytics',
      type: 'png',
      cardText: 'Analysis',
      onClick: () => navigate(ANALYTICS_CLASS_SELECTION),
    },
  ];

  const classAndsubjectClickHandler = (
    inputClassInfo: IClassAndSubjectSelected
  ) => {
    dispatch(setClassAndSubjectInfo(inputClassInfo));
    setSubjectPopupState(false);
    if (currentRoute) {
      if (currentRoute.includes('undefined')) {
        const newRoute = currentRoute.replace(
          'undefined',
          inputClassInfo.subjectId.toString()
        );
        navigate(newRoute);
      } else {
        navigate(currentRoute);
      }
    }
    setCurrentRoute('');
  };

  return (
    <Box>
      {mobile && (
        <Box sx={{ p: `${pxToRem(20)} ${pxToRem(20)} 0` }}>
          <SecondaryButton witharrow onClick={() => setSubjectPopupState(true)}>
            {class_subject_info && class_subject_info?.classname ? (
              <Typography variant="button">{`${class_subject_info?.classname} ${class_subject_info?.section} - ${class_subject_info?.subject}`}</Typography>
            ) : (
              <Typography variant="button">Choose Class & Subject</Typography>
            )}
          </SecondaryButton>
        </Box>
      )}

      <Box sx={{ position: { md: 'fixed' }, width: '100vw', zIndex: 1 }}>
        <HeaderIconWrapper icons={headerIconList} />
      </Box>

      <Box sx={styles.mainContainer}>
        <Box>
          <HomeLessonPlansList />
        </Box>

        <Box>
          <HomeHomeworksList />
        </Box>

        <Box>
          <FeatureList
            feaureList={featureList}
            background={
              mobile
                ? 'linear-gradient(to bottom, white 25%,#FCF1C7 25% 50%,white 50% 100%)'
                : undefined
            }
          />
        </Box>

        <Box
          sx={{
            p: { xs: pxToRem(18), md: pxTovW(0) },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: pxToRem(10) },
          }}
        >
          <Typography variant="h2" mb={pxTovW(22)}>
            Performance Snapshot
          </Typography>

          {mobile ? <TeacherHomeMobileCarousel /> : <TeacherHomeWebCarousel />}
        </Box>
      </Box>

      <ClassAndSubjectPopup
        modalState={subjectPopupState}
        setModalState={setSubjectPopupState}
        displayData={subjectsWithClass}
        classSubjectsList={user_info?.teachClassSubjects}
        classAndsubjectClickHandler={classAndsubjectClickHandler}
      />
    </Box>
  );
};

export default Home;

/*

<Box sx={{ display: 'flex', gap: pxTovW(28) }}>
  {Array.from({ length: 3 }).map(() => (
    <ImageWrapper
      name="Group41484"
      type="png"
      parentFolder="tempAssets"
      styles={{
        width: pxTovW(446),
        height: pxTovW(215),
        objectFit: 'cover',
        borderRadius: pxTovW(30),
        // boxShadow: `0px 0px ${pxTovW(10)} #E7E7E7D9`,
      }}
    />
  ))}
</Box>

*/
