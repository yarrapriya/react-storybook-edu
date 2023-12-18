import { Button, ButtonProps } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
type IProps = ButtonProps;
export default function PrimaryButton(props: IProps) {
  return (
    <Button
      sx={{
        width: {
          xs: '100%',
          md: props?.fullWidth === true ? '100%' : pxTovW(397),
        },
        height: { xs: pxToRem(52), md: pxTovW(70) },
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: { xs: '18px', md: '21px' },
        boxShadow:
          'inset 0 0 8px rgba(0, 0, 0, 0.5),0 7px 13px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
        '&:disabled': {
          backgroundColor: '#0AA34F63',
        },
      }}
      variant="contained"
      color="secondary"
      {...props}
    >
      {props.children}
    </Button>
  );
}
