import { Box, Button, Typography, useMediaQuery } from '@mui/material';

import {
  IStyles,
  pxToRem,
  pxTovW,
  ScoreProgressBar,
  theme,
} from '@geneo2-web/shared-ui';

import { ImageWrapper } from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { ANALYTICS_CHAPTER_SCORE } from '../../../../routeHandling/RoutesNomenclature';
const styles: IStyles = {
  root: {
    width: { xs: '100vw', md: '100%' },
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headImage: {
    width: { xs: pxToRem(58), md: pxTovW(82) },
    height: { xs: pxToRem(58), md: pxTovW(82) },
    borderRadius: '50%',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FDE0',
    gap: { xs: pxToRem(5), md: pxTovW(5) },
    padding: '17px 20px 16px 20px',
    border: '1px solid #0AA34FAB',
    width: 'max-content',
    height: { xs: pxToRem(31), md: pxTovW(53) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
  },
};
interface IProps {
  iconName: string;
  className: string;
  score: number;
  path?: string;
  withButton?: boolean;
}

export const ClassScore = (props: IProps) => {
  const { score, className, iconName, withButton, path } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',

          gap: { xs: pxToRem(10), md: pxTovW(19) },
          //   height: '100%',
          width: '85%',
          //   backgroundColor: 'red',
        }}
      >
        <Box>
          <ImageWrapper
            path={path}
            name={iconName}
            type="png"
            parentFolder="icons"
            styles={styles.headImage}
          />
        </Box>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'space-around',

            gap: { xs: pxToRem(20), md: pxTovW(22) },
            width: { xs: '65%', md: '60%' },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {className}
          </Typography>
          <ScoreProgressBar variant={largeScreen ? 'md' : 'lg'} score={score} />
          {/* <Button onClick={()=>setChapterScoreDisplay(false)}>student</Button> */}
        </Box>
      </Box>

      {withButton && (
        <Button
          sx={styles.buttonBox}
          onClick={() => navigate(ANALYTICS_CHAPTER_SCORE)}
        >
          <Typography
            variant={largeScreen ? 'h4' : 'smallText'}
            fontWeight="medium"
            color="#0AA34F"
          >
            Chapter
          </Typography>
          <Typography
            variant={largeScreen ? 'h4' : 'smallText'}
            fontWeight="medium"
            color="#0AA34F"
          >
            Score
          </Typography>

          <ArrowForwardIosIcon
            sx={{
              width: { xs: pxToRem(10.04), md: pxTovW(18.62) },
              height: { xs: pxToRem(12.81), md: pxTovW(20.06) },
              color: '#0AA34F',
            }}
          />
        </Button>
      )}
    </Box>
  );
};
