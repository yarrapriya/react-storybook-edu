import { useState } from 'react';

import { Box, Button, Typography, useMediaQuery } from '@mui/material';

import {
  ClassAndSubjectPopup,
  IClassAndSubjectSelected,
  IStyles,
  IconWrapper,
  SecondaryButton,
  deserify,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppSelector } from 'apps/teacher/src/reduxStore/reduxHooks';
import { ANALYTICS_CLASS_SCORE } from 'apps/teacher/src/routeHandling/RoutesNomenclature';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { subjectsWithClass } from '../../../../utils/icons';
import { setSelectedClassInfo } from '../../reducer/analytics.slice';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
    justifyContent: { xs: 'center', md: 'normal' },
    alignItems: { xs: 'center', md: 'normal' },
    width: { xs: '100%', md: '35%' },
  },

  iconCard: {
    width: { xs: '90vw', md: pxTovW(554) },
    height: { xs: pxToRem(81), md: pxTovW(121) },
    borderRadius: pxToRem(10),
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(10)} #0000001F`,
    marginLeft: { xs: pxToRem(0), md: pxTovW(0) },
  },

  iconCardSubContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  dropDownButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '17px 20px 16px 20px',
    border: '1px solid #0AA34FAB',
    width: pxTovW(552),
    height: pxTovW(56),
    borderRadius: pxTovW(15),
    marginTop: pxTovW(18),
    marginBottom: pxTovW(20),
  },

  arrowForwardIosIcon: {
    height: { xs: pxToRem(12.55), md: pxTovW(15) },
    width: { xs: pxToRem(7.18), md: pxTovW(15) },
    color: '#828282',
  },

  iconBox: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(4), md: pxTovW(8) },
    flexDirection: 'column',
  },

  iconInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(5.5), md: pxTovW(7.5) },
  },
};

export const AnalysisStatSection = () => {
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const [modalState, setModalState] = useState(false);
  const { user_info } = deserify(useAppSelector((state) => state.auth));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OverallData = deserify(
    useAppSelector((state) => state.analytics.overall_analysis)
  );
  const classAndsubjectClickHandler = (
    inputClassInfo: IClassAndSubjectSelected
  ) => {
    dispatch(setSelectedClassInfo(inputClassInfo));
    navigate(ANALYTICS_CLASS_SCORE);
    setModalState(false);
  };
  return (
    <Box sx={styles.root}>
      {largeScreen ? (
        <Button sx={styles.dropDownButton} onClick={() => setModalState(true)}>
          <Typography variant="h5" fontWeight="medium">
            Choose Class & Subject
          </Typography>
          <Box>
            <ArrowForwardIosIcon sx={styles.arrowForwardIosIcon} />
          </Box>
        </Button>
      ) : (
        <SecondaryButton
          styles={{ height: { xs: pxToRem(45) }, width: '90%' }}
          witharrow
          onClick={() => setModalState(true)}
        >
          <Typography>All class & Subject</Typography>
        </SecondaryButton>
      )}
      <Box sx={styles.iconCard}>
        <Box sx={styles.iconCardSubContainer}>
          <Box sx={styles.iconBox}>
            <Box sx={styles.iconInfo}>
              <IconWrapper
                name="lesson-taughts"
                size="md"
                parentFolder="icons"
                type="png"
              />
              <Typography variant="h2" fontWeight="bold">
                {OverallData?.lessonTaughts}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              Lesson Taughts
            </Typography>
          </Box>

          <Box sx={styles.iconBox}>
            <Box sx={styles.iconInfo}>
              <IconWrapper
                name="reading"
                size="md"
                parentFolder="icons"
                type="png"
              />
              <Typography variant="h2" fontWeight="bold">
                {OverallData?.assignedHwCount}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              HW Assigned
            </Typography>
          </Box>
          <Box sx={styles.iconBox}>
            <Box sx={styles.iconInfo}>
              <IconWrapper
                name="clock"
                size="md"
                parentFolder="icons"
                type="png"
              />
              <Typography variant="h2" fontWeight="bold">
                {OverallData?.timeSpentInMinutes}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontWeight="regular"
              sx={{ color: '#828282' }}
            >
              Minutes
            </Typography>
          </Box>
        </Box>
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
