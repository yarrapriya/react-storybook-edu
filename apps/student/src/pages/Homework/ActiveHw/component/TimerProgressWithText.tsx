import { useEffect } from 'react';

import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { useTimer } from '../../../../utils/timer';

const styles: IStyles = {
  root: {
    width: 'max-content',
    position: 'relative',
    margin: 'auto',
    cursor: 'pointer',
  },

  textBox: {
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    position: 'absolute',
    top: { xs: pxToRem(0), md: pxTovW(10) },
    left: { xs: pxToRem(50), md: pxTovW(50) },
    gap: { xs: pxToRem(10), md: pxTovW(20) },
  },

  linearProgressBox: {
    transition: 'width 1s linear',
    overflow: 'hidden',
  },
  linearProgress: {
    width: { xs: pxToRem(332), md: pxTovW(450) },
    height: { xs: pxToRem(55), md: pxTovW(70) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
  },
};

interface IProps {
  memeEndHandler: () => void;
}
export const TimerProgressWithText = ({ memeEndHandler }: IProps) => {
  const memeTimeInSecons = 5;
  const timesAValueIsUpdatedInASecond = 10;
  const timer = useTimer(memeTimeInSecons, timesAValueIsUpdatedInASecond);
  const secondsRemaining = timer.value;
  const progress = (memeTimeInSecons - secondsRemaining) * 100 / memeTimeInSecons;

  useEffect(() => {
    if (timer.value <= 0) {
      memeEndHandler()
    }
  }, [timer.value])

  return (
    <Box sx={styles.root} onClick={memeEndHandler}>
      <LinearProgressWithLabel value={progress} />

      <Box sx={styles.textBox}>
        <Typography variant="h2" color="success.light">
          NEXT QUESTION IN
        </Typography>

        <Typography variant="g2" color="success.light">
          {Math.ceil(secondsRemaining)}
        </Typography>
      </Box>
    </Box>
  );
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  const { value, ...otherProps } = props;

  return (
    <Box sx={styles.linearProgressBox}>
      <LinearProgress
        variant="determinate"
        color="secondary"
        sx={styles.linearProgress}
        value={value}
        {...otherProps}
      />
    </Box>
  );
}
