import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import {
  IQuestionStatus,
  IQuestionStatusObject,
} from '../../../commonUtils/constants';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    minHeight: { xs: pxToRem(60), md: pxTovW(75) },
    width: '100%',
    overflowX: { xs: 'auto', md: 'hidden' },
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: { xs: 'flex-start', md: 'center' },
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },
  prevNextButtons: {
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: { xs: pxToRem(33), md: pxTovW(33) },
    padding: '0',
    minWidth: '0',
    width: { xs: pxToRem(38), md: pxTovW(38) },
    height: { xs: pxToRem(38), md: pxTovW(38) },
    boxShadow:
      'inset 0px -2px 6px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.5)',
  },
  button: {
    fontSize: { xs: pxToRem(33), md: pxTovW(33) },
    padding: '0',
    minWidth: '0',
    flexShrink: 0,
    width: { xs: pxToRem(45), md: pxTovW(68) },
    height: { xs: pxToRem(45), md: pxTovW(68) },
    // borderColor: 'neutral.cornflowerBlue',
    // '&:first-child': {
    //   // marginLeft: 'auto',
    // },
    '&:last-child': {
      // marginRight: 'auto',
    },
    boxShadow:
      'inset 0px -2px 6px rgba(0, 0, 0, 0.5), 0px 0px 2px rgba(0, 0, 0, 0.5)',
  },
};

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  showPreviousNextButtons: boolean;
  questionStatusArray: IQuestionStatusObject[];
  maxButtonsToDisplay?: number;
}

export const HomeworkPagination = (props: IPaginationProps) => {
  const {
    currentPage,
    totalPages,
    onPageChange,
    showPreviousNextButtons,
    questionStatusArray,
    maxButtonsToDisplay,
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    }
  };

  const getButtonStyle = (
    status: IQuestionStatus,
    currentPage: number,
    index: number
  ) => {
    const onCurrentPage = currentPage - 1 === index;
    if (status === IQuestionStatus.Correct) {
      return {
        backgroundColor: 'white',
        color: '#0AA34F',
        border: onCurrentPage ? '2px solid #0AA34F' : 'none',
      };
    } else if (status === IQuestionStatus.Incorrect) {
      return {
        backgroundColor: 'white',
        color: '#F23F3F',
        border: onCurrentPage ? '2px solid #F23F3F' : 'none',
      };
    } else if (status === IQuestionStatus.Attempted) {
      return {
        backgroundColor: 'white',
        color: '#007CDC',
        border: onCurrentPage ? '2px solid #61BAFF' : 'none',
      };
    } else if (status === IQuestionStatus.NotAttempted) {
      return {
        backgroundColor: 'white',
        color: '#828282',
        border: onCurrentPage ? '2px solid #61BAFF' : 'none',
      };
    }
  };
  const displayedButtons = () => {
    if (maxButtonsToDisplay && !isMobile) {
      if (totalPages <= maxButtonsToDisplay) {
        return questionStatusArray;
      }
      const halfDisplayButtons = Math.floor(maxButtonsToDisplay / 2);
      let start = currentPage - halfDisplayButtons;
      if (start < 1) {
        start = 1;
      }
      let end = start + maxButtonsToDisplay - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - maxButtonsToDisplay + 1;
      }
      return questionStatusArray.slice(start - 1, end);
    } else {
      return questionStatusArray;
    }
  };

  return (
    <Box sx={styles.root}>
      {showPreviousNextButtons && (
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          sx={styles.prevNextButtons}
        >
          <span>{`<`}</span>
        </Button>
      )}

      {displayedButtons().map((item) => (
        <Button
          key={item.index}
          onClick={() => handlePageChange(item.index + 1)}
          sx={{
            ...getButtonStyle(item.statusInfo, currentPage, item.index),
            ...styles.button,
          }}
        >
          {item.index + 1}
        </Button>
      ))}

      {showPreviousNextButtons && (
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          sx={styles.prevNextButtons}
        >
          <span>{`>`}</span>
        </Button>
      )}
    </Box>
  );
};
