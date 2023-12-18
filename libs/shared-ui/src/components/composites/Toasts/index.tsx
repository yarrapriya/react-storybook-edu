import ClearIcon from '@mui/icons-material/Clear';
import { Box, Typography } from '@mui/material';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import * as React from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

interface IToastParams extends SnackbarProps {
  label?: string | React.ReactElement;
  open?: boolean;
  onClose: () => void;
  variant?: 'success' | 'error' | 'info';
  details?: React.ReactElement;
  children?: React.ReactElement;
  hideClearIcon?: boolean;
}

export const Toast = (props: IToastParams) => {
  const { onClose } = props;
  const label = props.label || "";
  const open = props.open || false;
  const variant = props.variant || "info"
  React.useEffect(() => {
    if (open) {
      // Automatically close the toast after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, onClose]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...props}
      sx={{ mt: { xs: '75vh', md: '40vh' } }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          backgroundColor: variantMapping[variant]?.bgColor,
          border: variantMapping[variant]?.border,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          padding: {
            xs: `${pxToRem(17)} ${pxToRem(12)}`,
            md: `${pxTovW(27)} ${pxTovW(22)}`,
          },
          width: { xs: '90vw', md: pxTovW(713) },
          borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: variantMapping[variant]?.textColor }}
        >
          {label}
        </Typography>
        <Box>
          <ClearIcon
            sx={{
              width: { xs: pxToRem(28), md: pxTovW(28) },
              height: { xs: pxToRem(28), md: pxTovW(28) },
              alignItems: 'center',
              cursor: 'pointer',
              color: variantMapping[variant]?.textColor,
            }}
            onClick={() => onClose()}
          />
        </Box>
      </Box>
    </Snackbar>
  );
};

const variantMapping = {
  success: {
    bgColor: '#F1FFF7',
    textColor: '#0AA34F',
    border: '2px solid #0AA34F',
  },
  error: {
    bgColor: '#FFEAEA',
    textColor: '#F54040',
    border: '2px solid #F54040',
  },

  info: {
    bgColor: '#F1F8FF',
    textColor: '#007CDC',
    border: '2px solid #007CDC',
  },
};
