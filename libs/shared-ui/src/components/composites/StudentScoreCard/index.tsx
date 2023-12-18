import { ImageWrapper, theme } from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { ScoreProgressBar } from '../ScoreProgressBar';
// import {} from '../../../assets/tempAssets/student1.png'
const styles: IStyles = {
  root: {
    width: { xs: '90vw', md: pxTovW(360) },
    height: { xs: pxToRem(56), md: pxTovW(80) },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headImage: {
    width: { xs: pxToRem(60), md: pxTovW(80) },
    height: { xs: pxToRem(56), md: pxTovW(80) },
    borderRadius: pxToRem(15),
  },
};
interface IProps {
  imageUrl?: string;
  path?: string;
  parentFolder?: 'icons' | 'illustrations' | 'images' | 'tempAssets';
  studentName: string;
  score: number;
}

export const StudentScoreCard = (props: IProps) => {
  const { imageUrl, score, studentName } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(20), md: pxTovW(19) },
          width: '100%',
        }}
      >
        <Box>
          <ImageWrapper
            name="student1"
            type="png"
            parentFolder="tempAssets"
            path={imageUrl}
            styles={styles.headImage}
          />
        </Box>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: { xs: pxToRem(20), md: pxTovW(19) },
            width: { xs: '50vw', md: '60%' },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {studentName}
          </Typography>
          <ScoreProgressBar variant={largeScreen ? 'md' : 'lg'} score={score} />
        </Box>
      </Box>
      <Box sx={{ marginLeft: { md: pxTovW(26) } }}>
        <ArrowForwardIosIcon
          sx={{
            fontSize: pxToRem(12),
            fontWeight: 'bold',
            marginBottom: pxToRem(10),
            color: '#828282',
          }}
        />
      </Box>
    </Box>
  );
};
