import { Box, Grid, SxProps } from '@mui/material';
import React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {
  root: {
    boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.1)',
    paddingX: {
      xs: 0,
      md: pxTovW(20),
    },
  },
};
interface IProps {
  items: React.ReactNode[];
  WebNoOfCols: number;
  mobileNoOfCols: number;
  rootStyle?: SxProps;
  hiddenBorderBottom?: boolean;
}
export const DashboardGrid = (props: IProps) => {
  const {
    items = [],
    WebNoOfCols,
    mobileNoOfCols,
    rootStyle,
    hiddenBorderBottom,
  } = props;

  // if (!items || items.length === 0) {
  //   return <Box>No items to display</Box>;
  // }
  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };
  const totalRowsWeb = Math.ceil(items.length / WebNoOfCols);
  const totalRowsMobile = Math.ceil(items.length / mobileNoOfCols);
  return (
    <Grid container sx={rootSx}>
      {items.map((item, index) => {
        const currentItemWeb = Math.ceil((index + 1) / WebNoOfCols);
        const isLastRowWeb = currentItemWeb === totalRowsWeb;
        const isLastColumnWeb = (index + 1) % WebNoOfCols === 0;
        const currentItemMobile = Math.ceil((index + 1) / mobileNoOfCols);
        const isLastRowMobile = currentItemMobile === totalRowsMobile;
        const isLastColumnMobile = (index + 1) % mobileNoOfCols === 0;
        return (
          <Grid
            item
            xs={12 / mobileNoOfCols}
            md={12 / WebNoOfCols}
            key={`dashboard_item_${index}`}
            sx={{
              '& >div': {
                borderRight: {
                  md: !isLastColumnWeb ? '1px solid #DADADA' : 'none',
                  xs: !isLastColumnMobile ? '1px solid #DADADA' : 'none',
                },
              },
              borderBottom: {
                md:
                  !isLastRowWeb && !hiddenBorderBottom
                    ? '1px solid #DADADA'
                    : 'none',
                xs:
                  !isLastRowMobile && !hiddenBorderBottom
                    ? '1px solid #DADADA'
                    : 'none',
              },
              '&:nth-of-type(3n) >div': {
                paddingLeft: {
                  xs: 0,
                  md: pxTovW(20),
                },
              },
              '&:nth-of-type(3n+1) >div': {
                paddingRight: {
                  xs: 0,
                  md: pxTovW(20),
                },
              },
              '&:nth-of-type(3n+2) >div': {
                paddingLeft: {
                  xs: 0,
                  md: pxTovW(20),
                },
                paddingRight: {
                  xs: 0,
                  md: pxTovW(20),
                },
              },
            }}
          >
            <Box
              sx={{
                marginTop: {
                  md: pxTovW(20),
                  xs: pxToRem(10),
                },
                marginBottom: {
                  md: pxTovW(20),
                  xs: pxToRem(10),
                },
              }}
            >
              {item}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
