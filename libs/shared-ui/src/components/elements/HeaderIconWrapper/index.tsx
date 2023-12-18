//* MUI imports
import { Box } from '@mui/material';

import React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import HeaderIcon, { HeaderIconProps } from '../HeaderIcon';

//* Interface
interface HeaderIconWrapperProps {
  icons: HeaderIconProps[];
}

const styles: IStyles = {
  root: {
    // border: '1px solid red',
    borderBottom: {
      md: '0.052vw solid',
    },
    borderBottomColor: {
      md: 'neutral.grey',
    },
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    backgroundColor: {
      md: 'common.white',
    },

    justifyContent: 'center',
    p: {
      xs: `${pxToRem(17)} ${pxToRem(20)}`,
      md: pxTovW(14),
    },
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  container: {
    width: { xs: '100%' },
    display: 'flex',
    '&>div:not(:last-child)': {
      marginRight: {
        xs: pxToRem(10),
        md: pxTovW(81),
      },
    },
    justifyContent: {
      xs: 'space-between',
      md: 'center',
    },
    '&>div': {
      width: 'max-content',
    },
  },
};

export const HeaderIconWrapper: React.FC<HeaderIconWrapperProps> = (props) => {
  const { icons } = props;
  if (!icons.length) {
    return null;
  }
  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        {icons.map((icon, index) => (
          <HeaderIcon key={`HeaderIcon-${index}`} {...icon} />
        ))}
      </Box>
    </Box>
  );
};

export default HeaderIconWrapper;
