import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { Box, LinearProgress, linearProgressClasses } from '@mui/material';

const styles: IStyles = {
  progressBar: {
    width: { xs: '100%', md: pxTovW(1440) },
    height: { xs: pxToRem(5), md: pxTovW(10) },
    position: 'absolute',
    top: 0,
  },
  progressLine: {
    height: '100%',
    background: '#E5FFC4',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: '10px',
    },
  },
};
interface IProps {
  percentage: number;
}
export default function ActiveProgressbar(props: IProps) {
  const { percentage } = props;
  return (
    <Box sx={styles.progressBar}>
      <LinearProgress
        variant="determinate"
        sx={styles.progressLine}
        color={'success'}
        value={Math.round(Math.min(100, Math.max(0, percentage)))}
      />
    </Box>
  );
}
