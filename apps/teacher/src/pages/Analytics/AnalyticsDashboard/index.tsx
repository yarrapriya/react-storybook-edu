import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

import { TeacherAnalysisAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  ClassScoreCard,
  IStyles,
  NoContentCard,
  deserify,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../utils/icons';
import {
  setOverallAnalysis,
  setSelectedClassInfo,
} from '../reducer/analytics.slice';
import { AnalysisStatSection } from './components/AnalysisStatSection';
import { Shimmer } from './shimmer';

const styles: IStyles = {
  root: {
    width: '100vw',
    // display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    paddingLeft: { xs: pxToRem(0), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(0), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'column',
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    //
    marginLeft: { xs: pxToRem(20), md: pxTovW(0) },
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  chapterScoreCard: {
    minHeight: { md: pxTovW(100) },
    minWidth: { md: pxTovW(100) },
    width: { xs: '100vw', md: pxTovW(794) },
    backgroundColor: 'common.white',
    // margin: { xs: 'auto', md: 'none' },
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginTop: { xs: pxToRem(20), md: pxTovW(18) },
    paddingLeft: { md: pxTovW(20) },
    paddingRight: { md: pxTovW(20) },
    paddingTop: { xs: pxToRem(10), md: pxTovW(39) },
    paddingBottom: { md: pxTovW(39) },
    marginLeft: { md: pxTovW(95) },
  },
  grid: {
    width: '100%',
    // backgroundColor: 'red',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: { xs: 'auto', md: 'auto auto  ' },

    '& > div': {
      paddingBottom: '13px',
      paddingTop: '13px',
      borderBottom: '1px solid #E0DFDE',
    },
    '&  > :nth-last-of-type(-n+2) ': {
      borderBottom: { md: 'none' },
    },
    '&    > :nth-last-of-type(-n+1) ': {
      borderBottom: 'none',
    },
  },
  cardBox: {
    // backgroundColor: 'blue',

    // padding: { xs: pxToRem(10), md: pxTovW(0) },
    width: { md: pxTovW(339) },
    boxSizing: 'border-box',
    paddingTop: { md: pxTovW(20) },
    paddingLeft: { xs: pxToRem(20), md: pxTovW(0) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(0) },
    // paddingBottom: { md: pxTovW(10) },
    // marginRight: { md: pxTovW(70) },
    cursor: 'pointer',
  },
};
export const AnalyticsDashboard = () => {
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const OverallData = deserify(
    useAppSelector((state) => state.analytics.overall_analysis)
  );
  const TeachClassSubjects =
    deserify(
      useAppSelector((state) => state.auth.user_info?.teachClassSubjects)
    ) || [];

  const classSubMap = getSubjectsMap();
  useEffect(() => {
    fetchOverallAnalytics();
  }, []);

  async function fetchOverallAnalytics() {
    try {
      setLoading(true);
      const response =
        await TeacherAnalysisAPIServiceV1Client.getOverallAnalysis({
          teacherId: user_info?.teacherProfileId,
        });
      // console.log(response.data);
      if (response) {
        setLoading(false);
        if (response.data) {
          dispatch(setOverallAnalysis(response.data));
        }
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log(err);
    }
  }
  const navigate = useNavigate();
  return loading === true ? (
    <Shimmer />
  ) : (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant={largeScreen ? 'h1' : 'h2'}>Analysis</Typography>
      </Box>

      {error === true ? (
        <NoContentCard variant="error" icon="error" text="Error Occured" />
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: pxToRem(20), md: pxTovW(40) },
            justifyContent: { xs: 'center', md: 'normal' },
            alignItems: { xs: 'center', md: 'normal' },
          }}
        >
          <AnalysisStatSection />

          {OverallData ? (
            <Box>
              {OverallData.listClassSubjectPerformance.length === 0 ? (
                <NoContentCard
                  variant="info"
                  icon="cards"
                  text="No cards to show"
                />
              ) : (
                <Box sx={styles.chapterScoreCard}>
                  <Box container component={Grid} sx={styles.grid}>
                    {OverallData?.listClassSubjectPerformance.map(
                      (elem, index) => (
                        <Box key={index}>
                          <Box
                            sx={styles.cardBox}
                            onClick={() => {
                              dispatch(
                                setSelectedClassInfo({
                                  classname: `${elem.class}`,
                                  section: elem.section,
                                  sectionId: elem.sectionId,
                                  subject: elem.subject,
                                  subjectId: elem.subjectId,
                                })
                              );
                              navigate('/analytics-classScore');
                            }}
                          >
                            <ClassScoreCard
                              iconName={classSubMap[elem.subjectId]?.iconUrl}
                              path={elem.subjectIconImageUrl}
                              className={`${elem.class}${elem.section} ${elem.subject}`}
                              score={elem.scorePercent}
                            />
                          </Box>
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <NoContentCard
              variant="info"
              icon="cards"
              text="No cards to show"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

const displayData = [
  {
    iconName: 'science',
    className: '8A Science',
    score: 10,
  },
  {
    iconName: 'maths',
    className: '5B Maths',
    score: 50,
  },
  {
    iconName: 'english',
    className: '6C English',
    score: 30,
  },
  {
    iconName: 'vocab-victory',
    className: '7A Vocab-Victory',
    score: 60,
  },
  {
    iconName: 'marathi',
    className: '4B Marathi',
    score: 45,
  },
  {
    iconName: 'social-science',
    className: '9C Social Science',
    score: 85,
  },
];
