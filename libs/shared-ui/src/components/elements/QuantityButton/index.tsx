import { Backdrop, Box, Button, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

const styles = {
  root: {
    height: '40px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.04)',
    color: 'secondary.main',
    boxSizing: 'border-box',
    borderRadius: { xs: pxToRem(8), md: pxTovW(8) },
    padding: '0 15px',
    '& *': {
      fontSize: { xs: pxToRem(18), md: pxTovW(18) },
    },
    fontSize: { xs: pxToRem(18), md: pxTovW(18) },
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};
interface IProps {
  smallVariant?: boolean;
  quantity: number;
  incrementClickHandler?: () => void;
  decrementClickHandler?: () => void;
  maxQuantity?: number;
}
export default function QuantityButton(props: IProps) {
  const {
    quantity,
    smallVariant,
    incrementClickHandler,
    decrementClickHandler,
    maxQuantity,
  } = props;
  return !quantity ? (
    <Button
      sx={{ width: smallVariant ? '90px' : '116px', ...styles.root }}
      onClick={incrementClickHandler && incrementClickHandler}
      disabled={!maxQuantity}
    >
      Add
    </Button>
  ) : (
    <Box
      sx={{
        width: smallVariant ? '90px' : '116px',
        ...styles.flexBox,
        ...styles.root,
      }}
    >
      <Button
        sx={{
          height: '100%',
          fontSize: '30px !important',
        }}
        color="secondary"
        onClick={decrementClickHandler && decrementClickHandler}
        disabled={quantity === 0}
      >
        -
      </Button>
      <Typography variant="button">{quantity}</Typography>
      <Button
        sx={{
          height: '100%',
          fontSize: '22px !important',
        }}
        color="secondary"
        onClick={incrementClickHandler && incrementClickHandler}
        disabled={quantity === maxQuantity}
      >
        +
      </Button>
    </Box>
  );
}
