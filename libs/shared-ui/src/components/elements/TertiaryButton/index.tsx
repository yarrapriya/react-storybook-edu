import { Button, ButtonProps } from '@mui/material';

type IProps = ButtonProps;

export default function TertiaryButton(props: IProps) {
  return (
    <Button
      sx={{ background: '#F2F8FD', ...props.sx }}
      variant="outlined"
      color="primary"
      {...props}
    >
      {props.children}
    </Button>
  );
}
