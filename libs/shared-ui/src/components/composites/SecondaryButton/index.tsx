import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, ButtonProps, useMediaQuery, useTheme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { pxToRem } from '../../../commonUtils/resizeUtils';
interface IProps extends ButtonProps {
  witharrow?: boolean;
  onClick?: () => void;
  styles?: SxProps;
  children?: React.ReactNode;
}
export default function SecondaryButton(props: IProps) {
  const { witharrow, styles, onClick, children } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Button
      onClick={onClick}
      sx={{
        width: { xs: '100%', md: '100%' },
        height: { xs: pxToRem(45), md: '45px' },
        fontFamily: 'Poppins',
        fontWeight: 700,
        fontSize: { xs: '18px', md: '21px' },
        borderRadius: '10px',
        ...styles,
      }}
      {...props}
      variant={props.variant ? props.variant : 'contained'}
      color="secondary"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: witharrow ? 'space-between' : 'center',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {props.children}
        {witharrow && (
          <ChevronRightIcon fontSize={mobile ? 'small' : 'large'} />
        )}
      </Box>
    </Button>
  );
}
