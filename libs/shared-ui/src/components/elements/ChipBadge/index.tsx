import { Chip, ChipProps } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

interface IProps extends ChipProps {
  styles?: string;
}

export const ChipBadge = (props: IProps) => {
  return (
    <Chip
      {...props}
      sx={{
        width: 'max-content',
        padding: {
          xs: `${pxToRem(6)} ${pxToRem(10)}`,
          md: `${pxTovW(6)} ${pxTovW(10)}`,
        },
        // width: { xs: pxToRem(45), md: pxTovW(55) },
        fontSize: 'inherit',
        ...props.sx,
      }}
    />
  );
};
