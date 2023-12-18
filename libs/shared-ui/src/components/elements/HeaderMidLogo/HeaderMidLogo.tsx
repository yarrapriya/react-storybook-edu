import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Menu, MenuItem, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import SecondaryButton from '../../composites/SecondaryButton';
import ImageWrapper from '../ImageWrapper';

const styles: IStyles = {
  root: {
    width: '100vw',
    height: { xs: pxToRem(60), md: pxTovW(100) },
    background: 'grey',
    // position: 'fixed',

    borderBottomWidth: pxTovW(1),
    borderBottomStyle: 'solid',
    borderBottomColor: 'neutral.grey',
    boxSizing: 'border-box',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: { xs: `0 ${pxToRem(20)}`, md: `0 ${pxTovW(240)}` },
    bgcolor: 'common.white',
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
export const HeaderMidLogo = () => {
  //^ SubjectPopup
  const [modalState, setModalState] = useState(false);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const logoClickHandler = () => {
    // console.log('logoClickHandler:');
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
      <Box
        onClick={goBack}
        sx={{ display: location.pathname !== '/home' ? 'block' : 'none' }}
      >
        <ImageWrapper
          name="left-arrow"
          type="png"
          parentFolder="icons"
          styles={styles.menuTriple}
        />
      </Box>

      <Box
        onClick={logoClickHandler}
        sx={{ display: 'flex', alignItems: 'center', gap: { md: pxTovW(27) } }}
      >
        <ImageWrapper
          name="geneo-logo"
          type="png"
          parentFolder="images"
          styles={styles.logo}
        />

        {location.pathname === '/home' ? (
          <Box onClick={(e) => setModalState(true)}>
            <SecondaryButton witharrow>Choose Subject</SecondaryButton>
          </Box>
        ) : (
          <></>
        )}
      </Box>

      <Box sx={styles.userBox}>
        <Box
          component="img"
          src="https://placehold.co/55x55"
          alt="UserImage"
          sx={styles.userImage}
        />

        <Typography variant="bodyText" fontWeight="medium">
          Deepali Joshi
        </Typography>

        <Box
          onClick={(e) => {
            // handleClick(e);
            // setModalState(true);
          }}
        >
          <ImageWrapper
            name="down-arrow"
            type="png"
            parentFolder="icons"
            styles={styles.downArrow}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>

      <Box
        onClick={(e) => {
          // handleClick(e);
          // setModalState(true);
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

      {/* <SubjectPopup
        modalState={modalState}
        setModalState={setModalState}
        displayData={subjectsWithClass}
      /> */}
    </Box>
  );
};
