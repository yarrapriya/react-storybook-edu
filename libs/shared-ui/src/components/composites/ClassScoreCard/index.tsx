import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { theme } from '../../../theme/themeProvider';
import ImageWrapper from '../../elements/ImageWrapper';
import { ScoreProgressBar } from '../ScoreProgressBar';
const styles: IStyles = {
  root: {
    width: { xs: '90vw', md: '100%' },
    height: { xs: pxToRem(56), md: pxTovW(80) },
    display: 'flex',
    alignItems: 'center',
    justifyContent: { md: 'space-between' },
    // backgroundColor: 'red',
  },
  headImage: {
    width: { xs: pxToRem(46), md: pxTovW(82) },
    height: { xs: pxToRem(46), md: pxTovW(82) },
    borderRadius: '50%',
  },
};
interface IProps {
  iconName?: string;
  className: string;
  score: number;
  path?: string;
}

export const ClassScoreCard = (props: IProps) => {
  const { score, className, iconName, path } = props;
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(20), md: pxTovW(19) },
          width: '100%',
          // backgroundColor: 'red',
        }}
      >
        <Box>
          <ImageWrapper
            name={'book'}
            type="png"
            path={path || ''}
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

            gap: { xs: pxToRem(17), md: pxTovW(19) },
            width: { xs: '60vw', md: '100%' },
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {className}
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
