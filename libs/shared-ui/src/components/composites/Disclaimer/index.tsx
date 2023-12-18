import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { Cookie } from './cookie';
import { DisclaimerComp } from './disclaimerComp';
import { Privacy } from './privacy';
import { Terms } from './terms';
const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: {
      xs: `${pxToRem(15)} ${pxToRem(20)}`
    },
    margin: '0 auto',
    maxWidth: {
      xs: 'unset',
      md: pxTovW(900)
    }
  },
  header: {
    marginBottom: {
      xs: pxToRem(6),
      md: pxTovW(10)
    }
  },
  tabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: {
      xs: pxToRem(10),
      md: pxTovW(15)
    },
    py: {
      xs: pxToRem(14),
      md: pxTovW(15)
    },
    mt: {
      xs: pxToRem(8),
      md: pxTovW(10)
    },
    mb: {
      xs: pxToRem(15),
      md: pxTovW(15)
    },
    borderTop: '1px solid rgba(0,0,0,0.2)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
  },
  selectedTab: {
    cursor: 'pointer',
    backgroundColor: 'warning.main',
    p: {
      xs: `${pxToRem(6)} ${pxToRem(15)}`,
      md: `${pxTovW(6)} ${pxTovW(15)}`,
    },
    borderRadius: '20px',
    '&>span': {
      color: '#000'
    },
    textAlign: 'center'
  },
  tab: {
    cursor: 'pointer',
    '&>span': {
      color: '#575757'
    },
    textAlign: 'center'
  }
};

export const Disclaimer = () => {
  const [value, setValue] = useState(tabs[0].key);

  const handleChange = (key: string) => {
    if (key === value) {
      return;
    }
    setValue(key);
  };

  const selectedTab = tabs.find(tab => tab.key === value)

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">Disclaimer & Policies</Typography>
      </Box>
      <Box sx={styles.tabsWrapper}>
        {tabs.map(tab => {
          return <Box key={tab.key} sx={tab.key === value ? styles.selectedTab : styles.tab} onClick={() => handleChange(tab.key)}>
            <Typography variant={'cardText'} sx={{ fontWeight: tab.key === value ? 900 : 500 }}>{tab.name}</Typography>
          </Box>
        })}
      </Box>
      <Box>
        {selectedTab?.value}
      </Box>
    </Box>
  );
};

const tabs = [
  {
    key: 'disclaimer',
    name: 'Disclaimer',
    value: <DisclaimerComp />
  },
  {
    key: 'cookie',
    name: 'Cookie Policy',
    value: <Cookie />
  },
  {
    key: 'privacy',
    name: 'Privacy Policy',
    value: <Privacy />
  },
  {
    key: 'terms',
    name: 'Terms of Service',
    value: <Terms />
  },
]
