import { useEffect, useRef } from 'react';

import { Box, Button, Pagination, Typography } from '@mui/material';

import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    p: { xs: `0 ${pxToRem(20)}` },
    // boxSizing: 'border-box',
    width: { md: '100%' },
  },

  pagination: {
    '&.MuiPagination-root': {
      overflowX: 'scroll',
    },
    '& .MuiPagination-ul': {
      flexWrap: 'nowrap',
      gap: { xs: pxToRem(10), md: pxTovW(10) },
    },
  },

  button: {
    padding: '0',
    minWidth: '0',
    width: { xs: pxToRem(45), md: pxTovW(45) },
    height: { xs: pxToRem(45), md: pxTovW(45) },
    // borderColor: 'neutral.cornflowerBlue',
  },
};

interface IProps {
  selectedPage: number;
  totalPages: number;
  handlePageChange: (arg1: number | null) => void;
}
export const HwPagination = ({
  selectedPage,
  totalPages,
  handlePageChange,
}: IProps) => {
  const selectedButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.focus();
    }
  }, [selectedPage]);

  return (
    <Box sx={styles.root}>
      <Pagination
        count={totalPages}
        defaultPage={1}
        siblingCount={totalPages}
        variant="outlined"
        shape="rounded"
        size="large"
        hidePrevButton
        hideNextButton
        sx={styles.pagination}
        renderItem={(item) => {
          const isButtonSelected = selectedPage === item.page;

          return (
            <Button
              variant="outlined"
              color={selectedPage !== item.page ? 'inherit' : 'primary'}
              onClick={() => handlePageChange(item.page)}
              ref={isButtonSelected ? selectedButtonRef : null}
              sx={{
                border:
                  selectedPage !== item.page
                    ? 'none'
                    : `${pxToRem(1)} solid neutral.cornflowerBlue`,
                color: selectedPage !== item.page ? 'text.disabled' : 'primary',
                boxShadow:
                  selectedPage === item.page
                    ? 'none'
                    : 'inset 0px 0px 5px 2px #00000021',

                ...styles.button,
              }}
            >
              {/* {item.page} */}
              <Typography
                variant="h2"
                color={selectedPage !== item.page ? 'text.disabled' : 'primary'}
                fontWeight={selectedPage === item.page ? 'bold' : 'regular'}
              >
                {item.page}
              </Typography>
            </Button>
          );
        }}
      />
    </Box>
  );
};
