import { useState } from 'react';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import {
  FilterSortPopup,
  IStyles,
  SecondaryButton,
  SecondaryOutlinedButton,
  deserify,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { getSubjectsMap } from '../../../../utils/icons';
import { setHomeworkSubjectId } from '../../reducer/homework.slice';

const styles: IStyles = {
  choicesBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(24) },
    alignItems: 'center',
    mt: { xs: pxToRem(15), md: pxTovW(39) },
    px: {
      xs: `${pxToRem(20)}`,
      md: 0,
    },
  },
  filterBox: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(5), md: pxTovW(7) },
    width: { xs: pxToRem(120), md: pxTovW(140) },
    height: { xs: pxToRem(40), md: pxTovW(56) },
    border: `${pxTovW(1)} solid red`,
    borderColor: 'text.disabled',
    borderRadius: { xs: pxToRem(8), md: pxTovW(10) },
  },

  menuItem: {
    width: { xs: pxToRem(150), md: pxTovW(276) },
    height: { xs: pxToRem(60), md: pxTovW(52) },
    borderTop: `${pxTovW(1)} solid red`,
    borderColor: 'neutral.honeydew',
    p: { md: `${pxTovW(18)} ${pxTovW(21)}` },
  },
};

interface IProps {
  setModalState: (arg: boolean) => void;
  sortFunction: (data: string) => void;
}

export const HwDashSubjectFilter = ({
  setModalState,
  sortFunction,
}: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //^ Menu Selection
  const selectedSubjectId = deserify(
    useAppSelector((state) => state.homework.homework_subject_id)
  );
  const learnSubjects =
    deserify(useAppSelector((state) => state.auth.userInfo?.learnSubjects)) ||
    [];
  const subMap = getSubjectsMap(learnSubjects);
  const dispatch = useDispatch();

  return (
    <Box sx={styles.choicesBox}>
      {!mobile && (
        <Box>
          <SecondaryOutlinedButton
            size="medium"
            witharrow={typeof selectedSubjectId == 'undefined'}
            onClick={() => setModalState(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5">
              {typeof selectedSubjectId == 'number'
                ? subMap[selectedSubjectId].subjectName
                : 'All Subjects'}
            </Typography>
            {typeof selectedSubjectId == 'number' && (
              <CloseIcon
                sx={{
                  color: 'common.black',
                  fontSize: { xs: pxToRem(14), md: pxTovW(18) },
                }}
                onClick={(ev) => {
                  ev.stopPropagation();
                  dispatch(setHomeworkSubjectId(undefined));
                }}
              />
            )}
          </SecondaryOutlinedButton>
        </Box>
      )}

      {mobile && (
        <Box sx={{ flexGrow: 1 }}>
          <SecondaryButton
            onClick={() => setModalState(true)}
            sx={{ position: 'relative', width: '100%' }}
            witharrow={typeof selectedSubjectId == 'undefined'}
          >
            <Typography variant="button">
              {typeof selectedSubjectId == 'number'
                ? subMap[selectedSubjectId].subjectName
                : 'All Subjects'}
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
                  dispatch(setHomeworkSubjectId(undefined));
                }}
              />
            )}
          </SecondaryButton>
        </Box>
      )}
      <FilterSortPopup
        iconName="Sort"
        title="Sort by"
        options={['Questions', 'Time Left', 'Score']}
        sortFunction={sortFunction}
      />
    </Box>
  );
};
