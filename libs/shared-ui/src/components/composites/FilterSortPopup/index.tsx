import {
  Box,
  FormControl,
  FormControlLabel,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { theme } from '../../../theme/themeProvider';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';
import PrimaryButton from '../../elements/PrimaryButton';
import { SecondaryGreyButton } from '../SecondaryGreyButton';
const styles: IStyles = {
  modal: {
    boxSizing: 'border-box',
    display: { xs: 'flex', md: 'block' },
    alignItems: 'flex-end',
  },

  root: {
    display: { xs: 'flex' },
    flexDirection: 'column',
    backgroundColor: 'common.white',
    overflowY: 'auto',
    margin: { md: 'auto' },
    width: { xs: '100%', md: pxTovW(300) },
    // height: { xs: pxToRem(407), md: 'max-content' },
    height: 'max-content',
    maxHeight: { xs: pxToRem(407), md: '25.156vw' },
    borderRadius: { xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`, md: pxToRem(15) },
    // paddingY: pxToRem(22),
    paddingTop: pxToRem(22),
    paddingX: { md: pxToRem(22) },
    justifyContent: 'center',
    mt: { md: '30vh' },
    // alignItems: 'center',
  },

  headingBox: {
    borderBottom: '1px solid #E8E8E8',
    display: 'flex',
    justifyContent: 'space-between',

    padding: pxToRem(22),
    paddingTop: pxToRem(10),
    '&:hover': {
      backgroundColor: { md: '#ECFFF5' },
    },
  },
  closeBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  close: {
    width: { xs: pxToRem(13) },
    height: { xs: pxToRem(13) },
    alignItems: 'center',
    cursor: 'pointer',
  },
  popoverBox: {
    '& > :nth-of-type(3)': {
      width: pxTovW(277),
      height: 'max-content',
      // overflow: 'hidden',
      backgroundColor: '#F8FCFF',
      boxShadow: `0px 6px ${pxToRem(24)} #00000030`,
      borderRadius: {
        xs: `${pxToRem(30)} ${pxToRem(30)} 0 0`,
        md: pxToRem(15),
      },
      marginTop: '10px',
      // padding: pxToRem(22),
    },
  },
};

interface IProps {
  iconName: string;
  options?: string[];
  filterFunction?: (value: string) => void;
  sortFunction?: (value: string) => void;
  title: string;
}
export const FilterSortPopup = (props: IProps) => {
  const { filterFunction, sortFunction } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [modalstate, setModalState] = React.useState(false);
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [sortFilterValue, setSortFilterValue] = useState('');
  return (
    <Box>
      <SecondaryGreyButton
        aria-describedby={id}
        onClick={mediumScreen ? handleClick : () => setModalState(true)}
      >
        <IconWrapper
          name={props.iconName}
          type="png"
          size="small"
          parentFolder="icons"
        />
        <Typography
          variant="smallText"
          fontWeight="bold"
          color="rgba(130, 130, 130, 1)"
        >
          {props.title}
        </Typography>
      </SecondaryGreyButton>

      {mediumScreen ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            ...styles.popoverBox,
          }}
        >
          <Box>
            {props.options?.map((elem, index) => (
              <Box
                key={index}
                sx={{
                  ...styles.headingBox,
                  width: pxTovW(277),
                  padding: `${pxToRem(11)} ${pxToRem(20)}`,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  (props.sortFunction && props.sortFunction(elem)) ||
                    (props.filterFunction && props.filterFunction(elem));
                  setSortFilterValue(elem);
                  handleClose();
                }}
              >
                <Typography variant="h5" fontWeight="medium">
                  {elem}
                </Typography>
              </Box>
            ))}
          </Box>
        </Popover>
      ) : (
        <MobilePopup
          title={props.title}
          options={props.options}
          modalState={modalstate}
          setModalState={setModalState}
          sortFunction={sortFunction}
          filterFunction={filterFunction}
        />
      )}
    </Box>
  );
};

interface IPopupProps {
  options?: string[];
  title: string;
  modalState: boolean;
  setModalState: (arg: boolean) => void;
  onChange?: (event: React.SyntheticEvent, newValue: string | null) => void;
  filterFunction?: (value: string) => void;
  sortFunction?: (value: string) => void;
  clearall?: boolean;
}
export const MobilePopup = ({
  options,
  title,
  modalState,
  setModalState,
  filterFunction,
  sortFunction,
  onChange,
  clearall,
}: IPopupProps) => {
  // const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const temp = new Array(options?.length).fill(false);
  // const [checkedArray, setCheckedArray] = useState(temp);
  // const handleCheck = (index: number) => {
  //   const temp = new Array(options?.length).fill(false);
  //   setCheckedArray(temp);
  // };
  const [sortFilterValue, setSortFilterValue] = useState('');
  return (
    <Modal
      open={modalState}
      onClose={() => setModalState(false)}
      sx={styles.modal}
    >
      <Box sx={styles.root}>
        <Box
          sx={{
            ...styles.headingBox,
            padding: `${pxToRem(11)} ${pxToRem(29)} ${pxToRem(20)} ${pxToRem(
              20
            )}`,
          }}
        >
          <Typography variant="h2" fontWeight="medium">
            {title}
          </Typography>

          <Box onClick={(e) => setModalState(false)} sx={styles.closeBox}>
            <ImageWrapper
              name="close"
              type="png"
              parentFolder="icons"
              styles={styles.close}
            />
          </Box>
        </Box>
        <FormControl>
          <RadioGroup>
            {options?.map((elem, i) => (
              <Box
                key={i}
                sx={{
                  ...styles.headingBox,
                  padding: `${pxToRem(11)} ${pxToRem(0)} ${pxToRem(
                    0
                  )} ${pxToRem(20)}`,
                  alignItems: 'center',
                }}
                onClick={(e) => setSortFilterValue(elem)}
              >
                <Typography variant="h2" fontWeight="medium">
                  {elem}
                </Typography>
                <FormControlLabel
                  label=""
                  control={
                    <Radio
                      checked={sortFilterValue === elem ? true : false}
                      sx={{
                        color: '#CCE6FE',

                        '&.Mui-checked': {
                          color: 'secondary',
                        },
                        '& .MuiSvgIcon-root': {
                          fontSize: 28,
                          fontWeight: 'bold',
                        },
                      }}
                      value={elem}
                    />
                  }
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingY: { xs: pxToRem(20), md: pxTovW(5) },
            width: '100%',
            // margin: 'auto',
          }}
        >
          {clearall && (
            <PrimaryButton
              sx={{ height: pxToRem(55), width: '40%', margin: 'auto' }}
              variant="outlined"
              onClick={(e) => {
                (sortFunction && sortFunction('')) ||
                  (filterFunction && filterFunction(''));
                setSortFilterValue('');
                onChange && onChange(e, null);
                setModalState(false);
              }}
            >
              <Typography variant="h2" fontWeight="bold" color="success.main">
                {' '}
                Clear All
              </Typography>
            </PrimaryButton>
          )}
          <PrimaryButton
            sx={{
              height: pxToRem(55),
              width: clearall ? '40%' : '90%',
              margin: 'auto',
            }}
            onClick={(e) => {
              (sortFunction && sortFunction(sortFilterValue)) ||
                (filterFunction && filterFunction(sortFilterValue));
              onChange && onChange(e, sortFilterValue);
              setModalState(false);
            }}
          >
            <Typography variant="h2" fontWeight="bold" color="common.white">
              {' '}
              Apply
            </Typography>
          </PrimaryButton>
        </Box>
      </Box>
    </Modal>
  );
};
