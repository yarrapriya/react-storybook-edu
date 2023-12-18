import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
const styles: IStyles = {
  Card: {
    // height: { xs: pxToRem(78), md: 'max-content' },
    height: 'max-content',
    padding: { md: `${pxToRem(15)} ${pxToRem(15)} ${pxToRem(15)} ${pxToRem(15)}` },
    width: { xs: '90vw', md: '25vw' },
    // backgroundColor: 'red',
    justifyContent: 'center',
    display: 'flex',
    // border: 'none',
    flexDirection: 'column',
  },
};

interface IProps {
  image?: string
  title?: string
  subTitle?: string
}

export const SubjectCard = (props: IProps) => {
  const { image, title, subTitle } = props;
  return (
    <Box sx={styles.Card}>
      <Box sx={{ display: 'flex', gap: pxToRem(10) }}>
        {/* <img
          alt="chapter"
          src={ChapterImage1}
          style={{ height: pxToRem(60), width: pxToRem(60) }}
        /> */}
        <ImageWrapper
          name="ChapterImage1"
          type="png"
          parentFolder="tempAssets"
          styles={{
            height: { xs: pxToRem(60), md: pxTovW(154) },
            width: { xs: pxToRem(60), md: pxTovW(151) },
          }}
          path={image}
        />
        <Box sx={{ display: 'flex', gap: { xs: pxToRem(3), md: pxTovW(13) }, flexDirection: 'column' }}>
          <Typography variant="h1" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {subTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
