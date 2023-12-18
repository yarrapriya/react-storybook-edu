import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  root: {
    height: { xs: pxToRem(172), md: pxTovW(224) },
    width: { xs: pxToRem(129), md: pxTovW(170) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(13) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: `0 0 ${pxTovW(20)} grey`,
    },
  },
  imageBox: {
    width: '100%'
  },
};
interface IProps {
  image: string;
  subjectName: string;
  onClick?: () => void
}
export const TextBookCover = (props: IProps) => {
  const { image, subjectName, onClick } = props;
  return (
    <Box sx={styles.root} onClick={onClick}>
      <Box sx={styles.imageBox}>
        <ImageWrapper
          path={image}
          name='textBook'
          type='png'
          parentFolder='tempAssets'
          styles={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: { xs: `${pxToRem(10)} ${pxToRem(10)} 0 0`, md: `${pxTovW(15)} ${pxTovW(15)} 0 0` },
          }}
        />
      </Box>

      <Typography
        sx={{
          marginLeft: pxTovW(13),
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
        variant="h3"
        fontWeight="bold"
      >
        {subjectName}
      </Typography>
    </Box>
  );
};
