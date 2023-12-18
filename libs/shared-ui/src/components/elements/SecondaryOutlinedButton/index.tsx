import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, ButtonProps, Box } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { fontWeight } from '@mui/system';
const variantWidth = {
  xs: { small: '100%', medium: '100%', large: '100%' },
  md: { small: pxTovW(240), medium: pxTovW(457), large: pxTovW(550) },
};

interface IVariants {
  small: string;
  medium: string;
  large: string;
}
const styles: IStyles = {
  button: {
    display: 'flex',

    alignItems: 'center',
    padding: {
      xs: `${pxToRem(17)} ${pxToRem(14)}`,
      md: `${pxTovW(16)} ${pxTovW(14)}`,
    },
    border: '1px solid #0AA34FAB',
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
  },
};

interface IProps extends ButtonProps {
  size: keyof IVariants;
  witharrow?: boolean;
}
export const SecondaryOutlinedButton = (props: IProps) => {
  const { size, witharrow } = props;
  return (
    <Box>
      <Button
        sx={{
          ...styles.button,
          justifyContent: witharrow ? 'space-between' : 'center',
          width: {
            xs: variantWidth.xs[size],
            md: variantWidth.md[size],
          },
          height: {
            xs: pxToRem(56),
            md: pxTovW(56),
          },
        }}
        {...props}
      >
        {props.children}
        {witharrow && (
          <ArrowForwardIosIcon
            sx={{
              color: '#828282',
              fontWeight: 'bold',
              width: { xs: pxToRem(7.18), md: pxTovW(20) },
              height: { xs: pxToRem(12.55), md: pxTovW(20) },
            }}
          />
        )}
      </Button>
    </Box>
  );
};
