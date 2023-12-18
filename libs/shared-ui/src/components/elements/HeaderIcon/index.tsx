import { Box, Typography, TypographyStyle } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

export interface HeaderIconProps {
  fileName: string;
  type?: 'png' | 'jpg';
  path?: string;
  iconStyles?: TypographyStyle;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets';
  cardText?: string;
  onClick?: () => void;
}

function getImageUrl(iconProps: HeaderIconProps) {
  const { fileName, type, parentFolder } = iconProps;
  return `/assets/shared-ui/${parentFolder || 'icons'}/${fileName}${
    type ? '.' + type : ''
  }`;
}

const styles: IStyles = {
  wrapperStyles: {
    display: 'flex',
    width: 'max-content',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconWrapperStyle: {
    height: {
      xs: pxToRem(75),
      md: pxTovW(95),
    },
    width: {
      xs: pxToRem(75),
      md: pxTovW(95),
    },
    marginBottom: {
      xs: pxToRem(5),
      md: pxTovW(5),
    },
    borderRadius: pxToRem(15),
    backgroundColor: '#EEEEEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyles: {
    width: {
      xs: pxToRem(42),
      md: pxTovW(36),
    },
  },
  cardText: {
    width: {
      xs: pxToRem(75),
      md: pxTovW(95),
    },
    textAlign: 'center',
    lineBreak: 'auto',
    fontSize: {
      xs: pxToRem(14),
      md: pxTovW(18),
    },
  },
};

export function HeaderIcon(props: HeaderIconProps) {
  const { fileName, iconStyles, path, cardText, onClick } = props;
  return (
    <Box sx={styles.wrapperStyles}>
      <Box sx={styles.iconWrapperStyle} onClick={onClick}>
        <Box
          component="img"
          sx={styles.iconStyles}
          key={fileName + '-image'}
          src={path ? path : getImageUrl(props)}
          style={iconStyles}
          alt={fileName}
        />
      </Box>
      <Typography variant="cardText" sx={styles.cardText}>
        {cardText || ''}
      </Typography>
    </Box>
  );
}

export default HeaderIcon;
