import { Box, Typography, useMediaQuery } from '@mui/material';

import {
  IStyles,
  ImageWrapper,
  ScoreProgressBar,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
const styles: IStyles = {
  root: {
    width: { xs: '90vw', md: pxTovW(360) },
    height: { xs: pxToRem(56), md: pxTovW(80) },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  headImage: {
    width: { xs: pxToRem(62), md: pxTovW(100) },
    height: { xs: pxToRem(62), md: pxTovW(100) },
    borderRadius: '50%',
  },
};
interface IProps {
  path: string;
  className: string;
  studentName: string;
  score: number;
}

export const StudentScoreCard = (props: IProps) => {
  const { score, studentName, className, path } = props;
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
            path={path}
            name="student1"
            type="png"
            parentFolder="tempAssets"
            styles={styles.headImage}
          />
        </Box>
        <Box
          sx={{
            height: { xs: pxToRem(62), md: pxTovW(100) },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: { xs: pxToRem(10), md: pxTovW(19) },
            width: { xs: '50vw', md: '80%' },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {studentName}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'column' },
              gap: { xs: pxToRem(10), md: pxTovW(10) },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: '#007CDC', whiteSpace: 'nowrap' }}
            >
              {className}
            </Typography>
            <ScoreProgressBar
              variant={largeScreen ? 'md' : 'lg'}
              score={score}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
