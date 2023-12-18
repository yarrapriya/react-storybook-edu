import {
  IStyles,
  ImageWrapper,
  pxToRem,
  pxTovW
} from '@geneo2-web/shared-ui';
import { Box, Typography } from '@mui/material';

const styles: IStyles = {
  root: {
    height: { xs: pxToRem(73), md: pxTovW(86) },
    width: { xs: pxToRem(319), md: pxTovW(377) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    padding: {
      xs: `${pxToRem(7)} ${pxToRem(8)} ${pxToRem(7)} ${pxToRem(8)}`,
      md: `${pxTovW(7)} ${pxTovW(8)} ${pxTovW(7)} ${pxTovW(8)}`,
    },
    display: 'flex',
    // alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(14) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
  },
};
interface IProps {
  image: string;
  contentName: string;
}

export const ContentCard = (props: IProps) => {
  const { image, contentName } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <ImageWrapper
          name={image}
          type="png"
          parentFolder="tempAssets"
          // onClick={flagClickHandler}
          styles={{
            width: { xs: pxToRem(58), md: pxTovW(69) },
            height: { xs: pxToRem(58), md: pxTovW(69) },
          }}
        />
      </Box>
      <Box
        sx={{
          height: '60%',
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
      </Box>
    </Box>
  );
};
