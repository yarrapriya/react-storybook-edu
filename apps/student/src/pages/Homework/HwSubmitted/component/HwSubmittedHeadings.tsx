import { Box, Typography, useMediaQuery } from '@mui/material';

import { IStyles, pxToRem, pxTovW, theme } from '@geneo2-web/shared-ui';
import { IconWrapper } from 'libs/shared-ui/src/components/elements/IconWrapper/Index';

const styles: IStyles = {
  root: {},

  heading: {
    width: 'max-content',
    margin: 'auto',
    mt: { xs: pxToRem(20), md: pxTovW(20) },
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(7), md: pxTovW(10) },
  },

  subHeadingBox: {
    p: {
      xs: `${pxToRem(14)} ${pxToRem(41)} ${pxToRem(41)} ${pxToRem(41)}`,
      md: `${pxTovW(40)} 0`,
    },
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(14), md: pxTovW(14) },
  },
};

interface IProps {
  scorePercent: number;
  fractionClickHandler: () => void;
  topicName?: string;
}
export const HwSubmittedHeadings = ({
  scorePercent,
  fractionClickHandler,
  topicName,
}: IProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <IconWrapper
          name="green-circle-check"
          size={isMobile ? 'small' : 'md'}
          parentFolder="icons"
          type="png"
        />

        <Typography variant="h2">Homework Submitted</Typography>
      </Box>

      <Box sx={styles.subHeadingBox}>
        <Box>
          <Typography variant="g2" color="warning.main">
            {scorePercent}%
          </Typography>
          <Typography variant="h2" color="neutral.grey">
            Score
          </Typography>
        </Box>

        <Box>
          <Typography variant="bodyText" color="text.secondary">
            Reattempt to improve your score {topicName ? `on ${topicName}` : ''}
          </Typography>

          {/* <Typography
            variant="linkText"
            color="primary"
            onClick={fractionClickHandler}
          >
            _Fraction
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};
