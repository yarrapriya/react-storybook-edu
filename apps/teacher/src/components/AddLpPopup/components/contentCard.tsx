import {
  IStyles,
  IconWrapper,
  ImageWrapper,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';

const styles: IStyles = {
  root: {
    display: 'flex',
    // backgroundColor: 'red',
    height: { xs: pxToRem(68), md: pxTovW(97) },
    width: '100%',
    alignItems: 'center',
    gap: { xs: pxToRem(20), md: pxTovW(20) },
  },
  imageBox: {
    height: { xs: pxToRem(68), md: pxTovW(97) },
    width: { xs: pxToRem(68), md: pxTovW(97) },
  },
};
interface IProps {
  image: string;
  contentName: string;
  time: string;
  totalResources: number;
}

export const ContentCard = (props: IProps) => {
  const { image, contentName, time, totalResources } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <ImageWrapper
          name={image}
          type="png"
          parentFolder="tempAssets"
          // onClick={flagClickHandler}
          styles={{
            width: { xs: pxToRem(60), md: pxTovW(97) },
            height: { xs: pxToRem(56), md: pxTovW(97) },
          }}
        />
      </Box>
      <Box
        sx={{
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {contentName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            boxSizing: 'border-box',
            gap: { xs: pxToRem(10), md: pxTovW(10) },
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
              size="md"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="cardText" color="#007CDC">
              {time}
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
              name="questions"
              size="md"
              parentFolder="icons"
              type="png"
            />
            <Typography variant="cardText" color={'secondary.main'}>
              {totalResources}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
