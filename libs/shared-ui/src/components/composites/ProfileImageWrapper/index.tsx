import { IStyles } from '@geneo2-web/shared-ui';
import { Avatar, Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(10), md: pxTovW(21) },
    boxSizing: 'border-box',
    // width: '200px',
    // backgroundColor: 'blue',
  },
};

interface IProps {
  size: 'small' | 'md' | 'lg';
  ImageSource?: string;
  name?: string;
  backgroundColor?: string;
}
export function ProfileImageWrapper(props: IProps) {
  const { size, ImageSource, name, backgroundColor } = props;
  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // backgroundColor: 'red',
          width: '100%',
          // padding: '20%',
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            backgroundColor: 'transparent',
            width: {
              xs:
                size === 'small'
                  ? pxToRem(100)
                  : size === 'md'
                  ? pxToRem(120)
                  : pxToRem(150),
              md:
                size === 'small'
                  ? pxTovW(150)
                  : size === 'md'
                  ? pxTovW(200)
                  : pxTovW(250),
            },
            height: {
              xs:
                size === 'small'
                  ? pxToRem(100)
                  : size === 'md'
                  ? pxToRem(120)
                  : pxToRem(150),
              md:
                size === 'small'
                  ? pxTovW(150)
                  : size === 'md'
                  ? pxTovW(200)
                  : pxTovW(250),
            },
          }}
        >
          {ImageSource ? (
            <img
              src={ImageSource}
              alt="subject"
              style={{ height: '100%', width: '100%', borderRadius: '50%' }}
            />
          ) : (
            <Box
              sx={{
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                p: '10px',
                backgroundColor: 'white',
                boxShadow: `0 0 ${pxTovW(20)} grey`,
              }}
            >
              <Avatar
                sx={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: backgroundColor || 'secondary.main',
                }}
              >
                <Typography
                  variant="g1"
                  color="white"
                  sx={{ fontSize: '66px' }}
                >
                  {name?.substring(0, 2).toUpperCase()}
                </Typography>
              </Avatar>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: { xs: pxToRem(21), md: pxTovW(21) },
          width: '100%',
          // backgroundColor: 'red',
        }}
      >
        <Typography variant="bodyText" fontWeight={600}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
}
