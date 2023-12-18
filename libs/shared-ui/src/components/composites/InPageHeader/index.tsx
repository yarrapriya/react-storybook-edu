import { Box } from '@mui/material';
import React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { default as PrimaryButton } from '../../elements/PrimaryButton';
const styles: IStyles = {
  root: {
    display: 'flex',
    // width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    bgcolor: { xs: 'inherit', md: 'common.white' },
    padding: { xs: pxToRem(0), md: `${pxTovW(20)} ${pxTovW(240)}` },
  },
};
interface IProps {
  title: string | React.ReactNode;
  buttonClickHandler?: () => void;
  buttonText?: string;
}
export const InPageHeader = (props: IProps) => {
  const { title, buttonText, buttonClickHandler } = props;

  return (
    <Box sx={styles.root}>
      {title}
      {buttonText && (
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <PrimaryButton onClick={buttonClickHandler}>
            {buttonText}
          </PrimaryButton>
        </Box>
      )}
    </Box>
  );
};
