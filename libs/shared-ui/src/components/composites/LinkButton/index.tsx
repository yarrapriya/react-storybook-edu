import { Button, ButtonProps, Typography } from '@mui/material';
import React from 'react';

interface IProps extends ButtonProps {
  children: string | React.ReactNode;
}
export default function LinkButton(props: IProps) {
  return (
    <Button
      sx={{
        backgroundColor: 'transparent',
        '& :hover': {
          backgroundColor: 'transparent',
        },
      }}
      variant="text"
      {...props}
    >
      <Typography variant="linkText">{props.children}</Typography>
    </Button>
  );
}
