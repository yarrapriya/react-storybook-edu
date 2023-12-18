import { Box, SxProps } from '@mui/system';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

function getImageUrl(imageProps: IconProps) {
  const { name, type, parentFolder } = imageProps;
  return `/assets/shared-ui/${parentFolder || 'images'}/${name}${
    type ? '.' + type : ''
  }`;
}

const styles: IStyles = {
  small: {
    height: { xs: pxToRem(14), md: pxTovW(14) },
    width: { xs: pxToRem(14), md: pxTovW(14) },
  },
  md: {
    height: { xs: pxToRem(16.87), md: pxTovW(24.43) },
    width: { xs: pxToRem(16.87), md: pxTovW(24.43) },
  },
};

interface IconProps {
  name: string;
  type?: 'png' | 'jpg';
  size?: 'small' | 'md';
  path?: string;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets';
  onClick?: () => void;
  customSx?: SxProps;
}
export function IconWrapper(props: IconProps) {
  const { name, size, path, onClick, customSx } = props;

  return (
    <Box
      component="img"
      key={name + '-image'}
      src={path ? path : getImageUrl(props)}
      sx={customSx ? customSx : size === 'small' ? styles.small : styles.md}
      alt={name}
      onClick={onClick}
    />
  );
}
