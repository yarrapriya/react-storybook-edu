import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Chip, Typography } from '@mui/material';
import { IconWrapper } from 'libs/shared-ui/src/components/elements/IconWrapper/Index';
const styles: IStyles = {
  root: {
    height: { xs: pxToRem(140), md: pxTovW(119.84) },
    width: { xs: '95%', md: pxTovW(410) },
    borderRadius: { xs: pxToRem(15), md: '0px' },
    backgroundColor: '#FFFFFF',
    // borderRight: '1px solid grey',
    border: { xs: '1px solid #E0DFDE', md: 'none' },
    padding: { xs: `${pxToRem(12)}`, md: pxTovW(12) },
    display: 'flex',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(14) },
    boxSizing: 'border-box',
    boxShadow: { xs: `0px 0px ${pxToRem(11)} #E7E7E7D9`, md: 'none' },
    // outline: '1px solid red',
  },
  imageBox: {
    height: { xs: pxToRem(105), md: pxTovW(75.2) },
    width: { xs: pxToRem(105), md: pxTovW(75.2) },
    paddingLeft: { xs: pxToRem(20), md: pxTovW(40) },
  },
};
interface IProps {
  image: string;
  contentName: string;
  contentType: string;
  withTag?: boolean;
  taskName?: string;
  onClick?: () => void
}

export const ContentCard = (props: IProps) => {
  const { image, contentName, contentType, taskName, withTag, onClick } = props;
  return (
    <Box sx={styles.root} onClick={onClick}>
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
          // padding: { md: '2vw 0vw 2vw 0vw' },
          flexGrow: 1,
          justifyContent: 'space-between',
          // backgroundColor: 'red',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'red',
          }}
        >
          {withTag && (
            <Chip
              label={taskName}
              sx={{
                height: { xs: pxToRem(22), md: pxTovW(22) },
                width: 'max-content',
                backgroundColor: 'warning.main',
                fontSize: { xs: pxToRem(12), md: pxTovW(16) },
              }}
            />
          )}
          <Typography variant="cardText" fontWeight="bold">
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
            <Typography variant="smallText" color="#007CDC">
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
            <Typography variant="smallText" color={'secondary.main'}>
              {contentType}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: pxToRem(7.18), md: pxTovW(7.18) },
          height: { xs: pxToRem(12.55), md: pxTovW(12.55) },
          paddingRight: { xs: pxToRem(20), md: pxTovW(40) },
        }}
      >
        <ArrowForwardIosIcon sx={{ color: '#828282' }} />
      </Box>
    </Box>
  );
};
