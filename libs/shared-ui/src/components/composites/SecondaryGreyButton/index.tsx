import { Button, ButtonProps } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
export const styles: IStyles = {
  filterButton: {
    borderRadius: { xs: pxToRem(8), md: '0.586vw' }, //0.586vw
    backgroundColor: '#FFFFFF',
    height: { xs: pxToRem(40), md: pxTovW(56) },
    color: 'rgba(130, 130, 130, 1)',
    width: { xs: pxToRem(73), md: pxTovW(86) },
    display: 'flex',
    justifyContent: 'space-evenly',
    p: {
      xs: `${pxToRem(11)} ${pxToRem(9)} ${pxToRem(11)} ${pxToRem(8)}`,
    },
    border: '1px solid rgba(112, 112, 112, 1)',
  },
};
type IProps = ButtonProps;
export const SecondaryGreyButton = (props: IProps) => {
  return (
    <Button sx={styles.filterButton} {...props}>
      {props.children}
    </Button>
  );
};
