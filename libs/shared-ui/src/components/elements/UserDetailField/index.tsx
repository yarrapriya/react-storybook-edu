import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
interface IProps {
  label: string;
  value: string;
}
export default function UserDetailField(props: IProps) {
  const { label, value } = props;
  return (
    <>
      <Box sx={{
        paddingY: { xs: pxToRem(20), md: pxTovW(20) },
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '2px dashed grey'
      }}>
        <Box sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          width: '40%',

        }}>
          <Typography variant='bodyText' >{label}</Typography>
        </Box>
        <Box sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          width: '60%',
          textAlign: 'end'
        }}>
          <Typography variant='bodyText' color={'neutral.royalBlue'} paddingRight={2}>{value}</Typography>
        </Box>
      </Box>
    </>
  );
};
