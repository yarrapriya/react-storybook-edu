import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

interface IProps {
  score: number;
  variant: 'small' | 'md' | 'lg';
}

export const ScoreProgressBar = (props: IProps) => {
  const { score, variant } = props;

  const formattedScore = Number(score.toFixed(2));

  return (
    <Box sx={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      <LinearProgress
        variant="determinate"
        sx={{
          // minWidth: { xs: pxToRem(109), md: pxTovW(79.93) },
          height:
            variant === 'small'
              ? { xs: pxToRem(12), md: pxTovW(16) }
              : variant === 'md'
              ? { xs: pxToRem(16), md: pxTovW(24) }
              : { xs: pxToRem(18), md: pxTovW(27) },
          borderRadius: { xs: pxToRem(4), md: pxTovW(4) },
          backgroundColor: '#B3B3B3',
          width: '100%',
          // flexGrow: 1,
        }}
        color={
          formattedScore < 30
            ? 'error'
            : formattedScore < 60
            ? 'warning'
            : 'success'
        }
        value={formattedScore}
      />
      <Typography
        variant="smallText"
        sx={{
          position: 'absolute',
          color: 'white',
          top: variant === 'small' ? '2%' : '10%',
          left: '30%',
          transform: 'translateX(-50%)',
        }}
      >
        {formattedScore}%
      </Typography>
    </Box>
  );
};
