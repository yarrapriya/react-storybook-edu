import { Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';

interface IProps {
  icon: string;
  text: string;
  variant: 'error' | 'info' | 'white' | 'soon';
  rootStyle?: SxProps;
}
export const NoContentCard = (props: IProps) => {
  const { icon, text, variant, rootStyle } = props;

  const styles: IStyles = {
    root: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: { xs: pxToRem(241), md: pxTovW(241) },
      flexBasis: pxToRem(1214),
      // backgroundColor: '#DDFAEA',
      padding: { xs: pxToRem(40), md: pxTovW(40) },
      backgroundColor: variantMapping[variant]?.bgColor,
    },
    image: {
      height: { xs: pxToRem(114), md: pxTovW(114) },
      width: { xs: pxToRem(114), md: pxTovW(114) },
    },
  };

  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };
  return (
    <Box sx={rootSx}>
      <ImageWrapper
        styles={styles.image}
        name={icon}
        type="png"
        parentFolder="icons"
      />
      <Typography variant="h2" fontWeight="bold">
        {text}
      </Typography>
    </Box>
  );
};

const variantMapping = {
  error: { bgColor: '#FCF1C7' },
  info: { bgColor: '#DDFAEA' },
  white: { bgColor: 'white' },
  soon: { bgColor: '#EAF3FA' }
};
