import { useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { ChipBadge, IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';

const styles: IStyles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: `${pxTovW(1)} solid #E0E0E0`,
    borderBottom: `${pxTovW(1)} solid #E0E0E0`,
    backgroundColor: 'common.white',
  },

  tabs: {
    '&.MuiTabs-root': {
      minHeight: { xs: '7vw', md: '3.441vw' },
      bgcolor: 'unset',
    },
    '& .MuiTabs-indicator': {
      height: { xs: pxToRem(4), md: pxTovW(4) },
      bgcolor: 'warning.main',
    },
  },

  tab: {
    '&.MuiButtonBase-root': {
      fontSize: { xs: pxToRem(25), md: '1vw' },
      color: 'text.primary',
      fontWeight: 'light',
      m: {
        xs: `${pxToRem(15)} ${pxToRem(15)} ${pxToRem(10)} ${pxToRem(15)}`,
        md: `${pxTovW(20)} ${pxTovW(20)} ${pxTovW(8)} ${pxTovW(20)}`,
      },
    },
    '&.Mui-selected': {
      color: 'text.secondary',
      fontWeight: 'bold',
    },

    // border: '1px solid red',
    p: { xs: `${pxToRem(5)} ${pxToRem(10)}`, md: `0` },
  },

  tabBox: {
    display: 'flex',
    gap: { xs: pxToRem(13), md: pxTovW(13) },
    p: { md: `${pxTovW(0)} ${pxTovW(21)}` },
  },

  tabBoxTotal: {
    borderRadius: { xs: pxToRem(13), md: pxTovW(13) },
    bgcolor: 'primary.main',
    p: { md: `${pxTovW(0)} ${pxTovW(15)}` },
  },
};

interface IProps {
  stateValue: string;
  mapData: string[];
  handleChange: (arg: string) => void;
  count?: number;
}
export const TabComp = ({
  stateValue,
  mapData,
  handleChange,
  count,
}: IProps) => {
  const [value, setValue] = useState(0);

  const handleClick = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleChange(mapData[newValue]);
  };

  return (
    <Box sx={styles.root}>
      <Tabs
        value={value}
        onChange={handleClick}
        aria-label="basic tabs example"
        sx={styles.tabs}
      >
        {mapData.map((elem, index) => (
          <Tab
            key={index}
            sx={styles.tab}
            label={
              <TotalCountTab
                elem={elem}
                stateValue={stateValue}
                totalCount={count || 0}
              />
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};

interface TCT {
  elem: string;
  stateValue: string;
  totalCount: number;
}
const TotalCountTab = ({ elem, stateValue, totalCount }: TCT) => {
  return (
    <Box sx={styles.tabBox}>
      <Typography
        variant="h3"
        fontWeight={elem === stateValue ? 'bold' : 'light'}
      >
        {elem}{' '}
        {/* length to be retrieved by sending the entire data or from redux */}
        <ChipBadge
          label={totalCount}
          color="primary"
          size="small"
          sx={{
            visibility: elem === stateValue ? 'visible' : 'hidden',
          }}
        />
      </Typography>

      {/* <Box
        sx={{
          ...styles.tabBoxTotal,
          visibility: elem === stateValue ? 'visible' : 'hidden',
        }}
      >
        {totalCount}
      </Box> */}
    </Box>
  );
};
