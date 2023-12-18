import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
interface IProps {
  image?: string;
  chapterName: string;
  className?: string;
  subject: string;
}
const styles: IStyles = {
  root: {
    display: 'flex',
    gap: pxTovW(20),
    width: '100%',
    padding: pxTovW(4),
  },
  img: {
    height: { xs: pxToRem(60), md: pxTovW(124) },
    width: { xs: pxToRem(60), md: pxTovW(124) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    objectFit: 'cover',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    gap: pxToRem(10),
  },
};
export default function ChapterSelectedCard(props: IProps) {
  const { image, className, chapterName, subject } = props;

  return (
    <Box sx={styles.root}>
      {/* <Box
        component="img"
        src={image ? image : chapterImage}
        // alt="chapterImage"
        sx={styles.img}
      /> */}

      <ImageWrapper
        name="chapterImage"
        type="png"
        parentFolder="tempAssets"
        styles={styles.img}
        path={image}
      />

      <Box sx={styles.textContainer}>
        <Box
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h1" fontWeight="bold">
            {chapterName}
          </Typography>
        </Box>
        <Typography variant="bodyText" color="primary">
          {className && <>Class {className} | </>}
          {subject}
        </Typography>
      </Box>
    </Box>
  );
}
