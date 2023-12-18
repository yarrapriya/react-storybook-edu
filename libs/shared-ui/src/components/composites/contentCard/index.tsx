import { Box, Chip, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
const styles: IStyles = {
  root: {
    height: { xs: pxToRem(102), md: pxTovW(119.84) },
    width: { xs: pxToRem(283), md: pxTovW(255) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    padding: { xs: `${pxToRem(12)} ${pxToRem(12)} ${pxToRem(12)} ${pxToRem(12)}`, md: pxTovW(12) },
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(14) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
  },
  imageBox: {
    height: { xs: pxToRem(75.2), md: pxTovW(75.2) },
    width: { xs: pxToRem(75.2), md: pxTovW(75.2) },
  },
};
interface IProps {
  image: string;
  contentName: string;
  contentType: string;
  withTag?: boolean;
  taskName?: string;
}

export const ContentCard = (props: IProps) => {
  const { image, contentName, contentType, taskName, withTag } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <img
          src={image}
          alt="subject"
          style={{ height: '100%', width: '100%' }}
        />
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {withTag && (
            <Chip
              label={taskName}
              sx={{
                height: { xs: pxToRem(22), md: pxTovW(22) },
                width: 'max-content',
                backgroundColor: 'warning.main',
                fontSize: { md: '16px' },
              }}
            />
          )}
          <Typography variant="h5" fontWeight="bold">
            {contentName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: { xs: pxToRem(5), md: pxTovW(5) },
              width: 'max-content',
              alignItems: 'center',
            }}
          >
            <IconWrapper
              name="clock"
              size="small"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="smallestText" color="#007CDC">
              10 Mins
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: pxToRem(5), md: pxTovW(5) },
              width: 'max-content',
              alignItems: 'center',
            }}
          >
            <IconWrapper
              name="reading"
              size="small"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="smallestText" color={'secondary.main'}>
              {contentType}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
