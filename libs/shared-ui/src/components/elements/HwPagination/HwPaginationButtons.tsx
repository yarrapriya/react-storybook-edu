import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },

  button: {
    padding: '0',
    minWidth: '0',
    width: { xs: pxToRem(45), md: pxTovW(68) },
    height: { xs: pxToRem(45), md: pxTovW(68) },
    // borderColor: 'neutral.cornflowerBlue',
    '& > :first-of-type': {
      marginLeft: 'auto',
    },
    '&:last-child': {
      marginRight: 'auto',
    },
  },
};

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  displayButtons: number;
  colored?: boolean;
  withButtons?: boolean;
}

export const HwPaginationButtons: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  displayButtons,
  colored,
  withButtons,
}) => {
  const visiblePages = [];
  if (totalPages <= displayButtons) {
    // Case: Total number of pages are less than or equal to displayButtons
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
  } else {
    // Case: Total number of pages are greater than displayButtons
    if (currentPage <= Math.floor(displayButtons / 2) + 1) {
      // Show first displayButtons pages
      for (let i = 1; i <= displayButtons; i++) {
        visiblePages.push(i);
      }
    } else if (currentPage >= totalPages - Math.floor(displayButtons / 2)) {
      // Show last displayButtons pages
      for (let i = totalPages - displayButtons + 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Show displayButtons pages centered around the current page
      const startPage = currentPage - Math.floor(displayButtons / 2);
      const endPage = currentPage + Math.floor(displayButtons / 2);
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
    }
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const showPreviousButton = currentPage > 1 && totalPages > displayButtons;
  const showNextButton =
    currentPage < totalPages && totalPages > displayButtons;

  return (
    <Box sx={styles.root}>
      {withButtons && (
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!showPreviousButton}
          sx={styles.button}
        >
          <Typography variant="h2" color="primary">
            {'<'}
          </Typography>
        </Button>
      )}

      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          gap: { xs: pxToRem(10), md: pxTovW(13) },
        }}
      >
        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant="outlined"
            color={currentPage !== page ? 'inherit' : 'primary'}
            sx={{
              /* colored && page % 2 === 0
              replace with correct or wrong questions */
              border:
                currentPage !== page && !colored
                  ? 'none'
                  : currentPage === page && !colored
                  ? `${pxToRem(1)} solid neutral.cornflowerBlue`
                  : currentPage === page && colored && page % 2 === 0
                  ? `${pxToRem(1)} solid success.main`
                  : currentPage === page && colored && page % 2 !== 0
                  ? `${pxToRem(1)} solid error.main`
                  : 'none',

              borderColor:
                currentPage !== page && !colored
                  ? 'none'
                  : currentPage === page && !colored
                  ? `neutral.cornflowerBlue`
                  : currentPage === page && colored && page % 2 === 0
                  ? `success.main`
                  : currentPage === page && colored && page % 2 !== 0
                  ? `error.main`
                  : 'none',

              boxShadow:
                currentPage === page
                  ? 'none'
                  : 'inset 0px 0px 5px 2px #00000021',
              ...styles.button,
            }}
          >
            <Typography
              variant="h2"
              color={
                currentPage !== page && !colored
                  ? 'text.disabled'
                  : currentPage === page && !colored
                  ? 'primary'
                  : colored && page % 2 === 0
                  ? 'success.main'
                  : 'error.main'
              }
              fontWeight={currentPage === page ? 'bold' : 'regular'}
            >
              {page}
            </Typography>
          </Button>
        ))}
      </Box>

      {withButtons && (
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!showNextButton}
          sx={styles.button}
        >
          <Typography variant="h2" color="primary">
            {'>'}
          </Typography>
        </Button>
      )}
    </Box>
  );
};
