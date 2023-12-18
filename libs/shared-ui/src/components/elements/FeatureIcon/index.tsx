import { Box, Typography, TypographyStyle } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

interface IconProps {
  fileName: string;
  type?: 'png' | 'jpg';
  path?: string;
  iconStyles?: TypographyStyle;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets';
  cardText?: string;
  bgColor?: string;
  onClick?: () => void
}

function getImageUrl(iconProps: IconProps) {
  const { fileName, type, parentFolder } = iconProps;
  return `/assets/shared-ui/${parentFolder || 'icons'}/${fileName}${type ? '.' + type : ''
    }`;
}

const styles: IStyles = {
  wrapperStyles: {
    bgcolor: 'common.white',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: 'center',
    boxShadow: { xs: 'none', md: '0 0 11px #E7E7E7D9' },
    p: { xs: 0, md: pxTovW(11) },
    width: { xs: pxToRem(128), md: pxTovW(330) },
    boxSizing: 'border-box',
    borderRadius: pxToRem(20),
    cursor: 'pointer'
  },
  iconWrapperStyle: {
    height: { xs: pxToRem(94), md: '6.9vw' },
    width: { xs: pxToRem(128), md: '6.6vw' },
    flexGrow: { md: 0 },
    flexShrink: { md: 0 },
    borderRadius: pxToRem(15),
    backgroundColor: '#FFEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    width: { xs: pxToRem(68), md: pxTovW(72) },
  },
  cardText: {
    fontWeight: 'bold',
    flexBasis: pxTovW(160),
    paddingLeft: { xs: 0, md: pxTovW(17) },
    paddingTop: { xs: pxToRem(10), md: 0 },
    textAlign: { xs: 'center', md: 'left' },
  },
};

export function FeatureIcon(props: IconProps) {
  const { fileName, iconStyles, path, cardText, bgColor, onClick } = props;
  return (
    <Box sx={styles.wrapperStyles} onClick={onClick}>
      <Box
        sx={{
          ...styles.iconWrapperStyle,
          backgroundColor: bgColor ? bgColor : 'error.light',
        }}
      >
        <Box
          component="img"
          sx={styles.iconStyles}
          key={fileName + '-image'}
          src={path ? path : getImageUrl(props)}
          style={iconStyles}
          alt={fileName}
        />
      </Box>
      <Typography fontWeight={'bold'} sx={styles.cardText} variant="cardText">
        {cardText || ''}
      </Typography>
    </Box>
  );
}

export default FeatureIcon;
