import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Box,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import {
  IStyles,
  ImageWrapper,
  SecondaryOutlinedButton,
  StudentSubjectPopup,
  deserify,
  firstLetterImage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalContext } from '../../app/Context/GlobalContextProvider';
import { setHomeSelectedSubjectId } from '../../pages/Home/reducer/homeDashboard.slice';
import { useAppDispatch, useAppSelector } from '../../reduxStore/reduxHooks';
import { HOME } from '../../routeHandling/RoutesNomenclature';
import { getSubjectsMap } from '../../utils/icons';
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
    justifyContent: 'space-between',
    alignItems: 'center',
    p: { xs: `0 ${pxToRem(20)}`, md: `0 ${pxTovW(240)}` },
    bgcolor: 'common.white',
    zIndex: 1,
  },

  leftArrow: {
    cursor: 'pointer',
    width: { xs: pxToRem(14), md: pxTovW(19) },
    height: { xs: pxToRem(13), md: pxTovW(26) },
    flexBasis: { xs: pxToRem(14), md: pxTovW(19) },
  },
  logo: {
    cursor: 'pointer',
    width: { xs: pxToRem(75), md: pxTovW(100) },
    height: { xs: pxToRem(42), md: pxTovW(56) },
    flexFlow: '1',
  },

  userBox: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    gap: pxTovW(10),
  },
  userImage: {
    width: pxTovW(55),
    height: pxTovW(55),
    borderRadius: '50%',
  },

  downArrow: {
    cursor: 'pointer',
    width: pxTovW(13),
    height: pxTovW(7),
  },

  menuTriple: {
    width: pxToRem(16),
    height: pxToRem(14),
  },
};

interface IProps {
  sidebarDisplay: boolean;
  setSidebarDisplay: (arg0: boolean) => void;
}

export default function Header(props: IProps) {
  const { setSidebarDisplay, sidebarDisplay } = props;
  const currentPage = window.location.pathname;
  const dispatch = useAppDispatch();
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.home.selected_subject_id)
  );
  const options = useSideBarOptions();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const userInfo = deserify(useAppSelector((state) => state.auth.userInfo));

  const learnSubjects = userInfo?.learnSubjects || [];
  const subMap = getSubjectsMap(learnSubjects);

  //^ StudentSubjectPopup
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();
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

  const location = useLocation();

  return (
    <Box sx={styles.root}>
      {currentPage !== HOME ? (
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
        {currentPage === HOME && !isMobile ? (
          <Box>
            <SecondaryOutlinedButton
              size="small"
              witharrow={typeof selectedSubjectId == 'undefined' ? true : false}
              onClick={() => setModalState(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4">
                {typeof selectedSubjectId == 'number' &&
                subMap[selectedSubjectId]
                  ? subMap[selectedSubjectId].subjectName
                  : 'Choose Subject'}
              </Typography>
              {typeof selectedSubjectId == 'number' && (
                <CloseIcon
                  sx={{
                    color: 'common.black',
                    fontSize: { xs: pxToRem(14), md: pxTovW(18) },
                  }}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(setHomeSelectedSubjectId(undefined));
                  }}
                />
              )}
            </SecondaryOutlinedButton>
          </Box>
        ) : (
          <Box sx={{ display: 'none' }}></Box>
        )}
      </Box>

      <Box sx={styles.userBox}>
        <ImageWrapper
          name="userBlue"
          path={
            userInfo?.profilePics[0]?.url ||
            firstLetterImage(userInfo?.firstName)
          }
          type="png"
          parentFolder="icons"
          styles={styles.userImage}
        />

        <Typography
          sx={{ textTransform: 'capitalize' }}
          variant="bodyText"
          fontWeight="medium"
        >
          {userInfo?.firstName} {userInfo?.lastName}
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
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <ImageWrapper
          name="menuTriple"
          type="png"
          parentFolder="icons"
          styles={styles.menuTriple}
        />
      </Box>

      <StudentSubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={Object.values(subMap).map((sub) => ({
          subject: sub.subjectName,
          icon: sub.iconUrl,
          color: sub.textColor,
          onClick: () => {
            dispatch(setHomeSelectedSubjectId(sub.subjectId));
            setModalState(false);
          },
        }))}
        title="Choose Subject"
      />
    </Box>
  );
}
