import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  ClassAndSubjectPopup,
  IClassAndSubjectSelected,
  IStyles,
  ImageWrapper,
  SecondaryOutlinedButton,
  deserify,
  firstLetterImage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '../../app/Context/GlobalContextProvider';
import { setClassAndSubjectInfo } from '../../pages/Home/reducer/homeDashboard.slice';
import { useAppDispatch, useAppSelector } from '../../reduxStore/reduxHooks';
import {
  HOME,
  HOMEWORK_CONGRATULATIONS,
} from '../../routeHandling/RoutesNomenclature';
import { subjectsWithClass } from '../../utils/icons';
import { useSideBarOptions } from '../../utils/sidebarOptions';

const styles: IStyles = {
  root: {
    width: '100vw',
    height: { xs: pxToRem(60), md: pxTovW(100) },
    background: 'grey',
    position: 'fixed',

    borderBottomWidth: pxTovW(1),
    borderBottomStyle: 'solid',
    borderBottomColor: 'neutral.grey',
    boxSizing: 'border-box',

    display: 'flex',
    justifyContent: { md: 'space-between' },
    alignItems: 'center',
    // gap: { xs: '30%', md: 'unset' },
    p: { xs: `0 ${pxToRem(20)}`, md: `0 ${pxTovW(240)}` },
    bgcolor: 'common.white',
    zIndex: '1',
  },

  leftArrow: {
    cursor: 'pointer',
    width: { xs: pxToRem(14), md: pxTovW(19) },
    height: { xs: pxToRem(13), md: pxTovW(26) },
  },
  logo: {
    // display: 'flex',
    cursor: 'pointer',
    width: { xs: pxToRem(75), md: pxTovW(100) },
    height: { xs: pxToRem(42), md: pxTovW(56) },
  },

  userBox: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    gap: pxTovW(10),
    cursor: 'pointer',
  },
  userImage: {
    width: pxTovW(55),
    height: pxTovW(55),
    borderRadius: '50%',
    cursor: 'pointer',
  },

  downArrow: {
    cursor: 'pointer',
    width: pxTovW(13),
    height: pxTovW(7),
  },

  menuTriple: {
    cursor: 'pointer',
    // width: pxToRem(16),
    // height: pxToRem(14),

    width: { xs: pxToRem(14), md: pxTovW(25) },
    height: { xs: pxToRem(14), md: pxTovW(18) },
  },
};

interface IProps {
  sidebarDisplay: boolean;
  setSidebarDisplay: (arg0: boolean) => void;
}

export default function Header(props: IProps) {
  const { setSidebarDisplay, sidebarDisplay } = props;

  const options = useSideBarOptions();

  const navigate = useNavigate();
  const currentPage = window.location.pathname;
  const { user_info } = deserify(useAppSelector((state) => state.auth));

  const { class_subject_info } = useAppSelector((state) => state.homeDashboard);
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  //^ SubjectPopup
  const [modalState, setModalState] = useState(false);
  //use teacher_profile_id to fill the subjects
  const { selectedFunction, setSelectedFunction } = useGlobalContext();
  const goBack = () => {
    if (selectedFunction) {
      selectedFunction();
      setSelectedFunction(null);
      return;
    }
    navigate(-1);
  };

  const logoClickHandler = () => {
    // console.log('logoClickHandler:');
    navigate(HOME);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //
  const classAndsubjectClickHandler = (
    inputClassInfo: IClassAndSubjectSelected
  ) => {
    dispatch(setClassAndSubjectInfo(inputClassInfo));
    setModalState(false);
  };

  return (
    <Box sx={styles.root}>
      {/* {currentPage !== "/" && } */}

      {currentPage !== '/home' && currentPage !== HOMEWORK_CONGRATULATIONS ? (
        <Box onClick={goBack}>
          <KeyboardBackspaceIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
        </Box>
      ) : (
        <Box sx={{ display: 'none' }}></Box>
      )}

      <Box
        onClick={logoClickHandler}
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(14), md: pxTovW(25) },
          margin: { xs: 'auto', md: 'unset' },
        }}
      >
        <ImageWrapper
          name="geneo-logo"
          type="png"
          parentFolder="images"
          styles={styles.logo}
        />

        {currentPage === '/home' && !isMobile ? (
          <Box>
            <SecondaryOutlinedButton
              size="small"
              witharrow={class_subject_info ? false : true}
              onClick={() => setModalState(true)} //dispatch action setSchoolCourseId in homeDashboard slice
            >
              {class_subject_info && class_subject_info?.classname ? (
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h4">{`${class_subject_info?.classname} ${class_subject_info?.section} - ${class_subject_info?.subject}`}</Typography>
                  <CloseIcon
                    sx={{
                      color: 'common.black',
                      fontSize: { xs: pxToRem(14), md: pxTovW(18) },
                    }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      dispatch(setClassAndSubjectInfo(undefined));
                    }}
                  />
                </Box>
              ) : (
                <Typography variant="h4">Choose Class & Subject</Typography>
              )}
            </SecondaryOutlinedButton>
          </Box>
        ) : (
          <Box sx={{ display: 'none' }}></Box>
        )}
      </Box>

      <Box sx={styles.userBox}>
        {/* Fill details with teacher_profile_id */}
        <ImageWrapper
          name="userBlue"
          path={
            user_info?.profilePics[0]?.url ||
            firstLetterImage(user_info?.firstName)
          }
          type="png"
          parentFolder="icons"
          styles={styles.userImage}
        />

        <Typography variant="bodyText" fontWeight="medium">
          {`${user_info?.firstName} ${user_info?.lastName}`}
        </Typography>

        <Box onClick={(e) => handleClick(e)} pt={pxTovW(10)}>
          <KeyboardArrowDownIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt.name}
              onClick={() => {
                handleClose();
                opt.onClick();
              }}
            >
              <ImageWrapper
                name={opt.icon}
                parentFolder="icons"
                type="png"
                styles={{ width: pxTovW(21), marginRight: pxTovW(15) }}
              />
              {opt.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box
        onClick={(e) => {
          setSidebarDisplay(!sidebarDisplay);
        }}
        sx={{ display: { xs: 'block', md: 'none', zIndex: 'toolTip' } }}
      >
        <ImageWrapper
          name="menuTriple"
          type="png"
          parentFolder="icons"
          styles={styles.menuTriple}
        />
      </Box>

      <ClassAndSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={subjectsWithClass}
        classAndsubjectClickHandler={classAndsubjectClickHandler}
        classSubjectsList={user_info?.teachClassSubjects}
      />
    </Box>
  );
}
