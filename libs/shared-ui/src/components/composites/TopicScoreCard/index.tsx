import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { theme } from '../../../theme/themeProvider';
import ImageWrapper from '../../elements/ImageWrapper';
import { ScoreProgressBar } from '../ScoreProgressBar';
const styles: IStyles = {
  root: {
    width: { xs: '90%', md: pxTovW(341) },
    height: { xs: pxToRem(47), md: pxTovW(85) },
    display: 'flex',
    alignItems: 'center',
    justifyContent: { md: 'space-between' },
    gap: { xs: pxToRem(20), md: pxTovW(9) },
    // backgroundColor: 'blue',
    boxSizing: 'border-box',
  },
  headImage: {
    width: { xs: pxToRem(47), md: pxTovW(80) },
    height: { xs: pxToRem(47), md: pxTovW(80) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
  },
};
interface IProps {
  imageName?: string;
  topicName: string;
  score: number;
  path?: string;
  withoutArrow?: boolean;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets';
}

export const TopicScoreCard = (props: IProps) => {
  const { score, topicName, imageName, parentFolder, path, withoutArrow } =
    props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(20), md: pxTovW(9) },
          height: { xs: pxToRem(47), md: pxTovW(80) },
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}
      >
        <Box sx={styles.headImage}>
          <ImageWrapper
            name={imageName || ''}
            type="png"
            parentFolder={parentFolder}
            path={path}
            styles={styles.headImage}
          />
        </Box>
        <Box
          sx={{
            height: { xs: pxToRem(47), md: pxTovW(80) },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',

            // gap: { xs: pxToRem(20), md: pxTovW(10) },
            width: { xs: '70%', md: '100%' },
          }}
        >
          <Typography
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: { xs: 2, md: 2 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              width: '90%',
              lineHeight: { xs: pxToRem(13), md: pxTovW(25) },
            }}
            variant="h3"
            fontWeight="bold"
          >
            {topicName}
          </Typography>

          <ScoreProgressBar variant={largeScreen ? 'md' : 'lg'} score={score} />
        </Box>
      </Box>

      {!withoutArrow && (
        <Box sx={{ marginLeft: { md: pxTovW(26) } }}>
          <ArrowForwardIosIcon
            sx={{
              fontSize: pxToRem(12),
              fontWeight: 'bold',
              // marginBottom: pxToRem(10),
              color: '#828282',
            }}
          />
        </Box>
      )}
    </Box>
  );
};
