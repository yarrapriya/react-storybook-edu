import { Box, Typography } from '@mui/material';
import { SUPPORT_EMAIL } from '../../../commonUtils/constants';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import ImageWrapper from '../../elements/ImageWrapper';
const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: {
      xs: `${pxToRem(15)} ${pxToRem(20)}`,
    },
    margin: '0 auto',
    maxWidth: {
      xs: 'unset',
      md: pxTovW(900),
    },
  },
  header: {
    marginBottom: {
      xs: pxToRem(6),
      md: pxTovW(10),
    },
  },
  helpBox: {
    display: 'flex',
    alignItems: 'center',
    gap: {
      xs: pxToRem(14),
      md: pxTovW(20),
    },
    padding: {
      xs: pxToRem(15),
      md: pxTovW(15),
    },
    borderRadius: '10px',
    boxShadow: '0 0 10px #00000029',
    marginBottom: {
      xs: pxToRem(20),
      md: pxTovW(22),
    },
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'inherit',
  },
  iconImage: {
    height: {
      xs: pxToRem(56),
      md: pxTovW(56),
    },
    width: {
      xs: pxToRem(56),
      md: pxTovW(56),
    },
  },
  videoBox: {
    display: 'flex',
    gap: {
      xs: pxToRem(10),
      md: pxTovW(15),
    },
    padding: {
      xs: pxToRem(8),
      md: pxTovW(8),
    },
    borderRadius: '10px',
    boxShadow: '0 0 10px #00000029',
    marginBottom: {
      xs: pxToRem(20),
      md: pxTovW(22),
    },
    cursor: 'pointer',
  },
  videoImage: {
    height: {
      xs: pxToRem(60),
      md: pxTovW(80),
    },
    width: {
      xs: pxToRem(60),
      md: pxTovW(80),
    },
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

interface IProps {
  onFaqClick?: () => void;
}

export const HelpSupport = (props: IProps) => {
  const { onFaqClick } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">Help & Support</Typography>
      </Box>
      <Box
        sx={{
          marginY: {
            xs: pxToRem(20),
            md: pxTovW(20),
          },
          textAlign: {
            xs: 'center',
            md: 'left',
          },
        }}
      >
        <Typography variant="bodyText">
          We are here to help so please get in touch with us.
        </Typography>
      </Box>
      <Box sx={styles.helpBox} component="a" href={`mailto:${SUPPORT_EMAIL}`}>
        <ImageWrapper
          name="support-color"
          parentFolder="icons"
          type="png"
          styles={styles.iconImage}
        />
        <Typography variant="h3">Raise a support request</Typography>
      </Box>
      <Box sx={styles.helpBox} onClick={onFaqClick}>
        <ImageWrapper
          name="faq"
          parentFolder="icons"
          type="png"
          styles={styles.iconImage}
        />
        <Box>
          <Typography variant="h3">FAQs</Typography>
          <Typography
            variant="h4"
            sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}
          >
            Get answers to most common questions
          </Typography>
        </Box>
      </Box>
      {/* How to videos */}
      {/* <Box>
        <Typography variant='h3' sx={{ marginY: { xs: pxToRem(10), md: pxTovW(10) } }}>
          How to videos
        </Typography>
      </Box> */}
      {/* <Box sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
        <Box sx={styles.videoBox}>
          <ImageWrapper
            name="lessonImage1"
            parentFolder='tempAssets'
            type='png'
            styles={styles.videoImage}
          />
          <Box>
            <Typography variant='h3'>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant='smallText' color="#007CDC" sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
              10 mins
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.videoBox}>
          <ImageWrapper
            name="lessonImage1"
            parentFolder='tempAssets'
            type='png'
            styles={styles.videoImage}
          />
          <Box>
            <Typography variant='h3'>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant='smallText' color="#007CDC" sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
              10 mins
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.videoBox}>
          <ImageWrapper
            name="lessonImage1"
            parentFolder='tempAssets'
            type='png'
            styles={styles.videoImage}
          />
          <Box>
            <Typography variant='h3'>
              Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant='smallText' color="#007CDC" sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
              10 mins
            </Typography>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};
