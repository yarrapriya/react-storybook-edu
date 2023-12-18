import { Avatar, Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
interface IProps {
  size: 'small' | 'md' | 'lg';
  ImageSource?: string;
  name?: string;
}
function AvatarImageWrapper(props: IProps) {
  const { size, ImageSource, name } = props;
  return (
    <Box
      sx={{
        borderRadius: '50%',
        backgroundColor: 'secondary.main',
        width: {
          xs:
            size === 'small'
              ? pxToRem(18)
              : size === 'md'
              ? pxToRem(28)
              : pxToRem(48),
          md:
            size === 'small'
              ? pxTovW(28)
              : size === 'md'
              ? pxTovW(30)
              : '4.514vw',
        },
        height: {
          xs:
            size === 'small'
              ? pxToRem(18)
              : size === 'md'
              ? pxToRem(28)
              : pxToRem(48),
          md:
            size === 'small'
              ? pxTovW(28)
              : size === 'md'
              ? pxTovW(30)
              : '4.514vw',
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
        <Avatar
          sx={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}
        >
          <Typography variant="h4">
            {name?.substring(0, 1).toUpperCase()}
          </Typography>
        </Avatar>
      )}
    </Box>
  );
}

export default AvatarImageWrapper;
