import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
const styles: IStyles = {
  tagWrapper: {
    paddingLeft: {
      xs: pxToRem(8),
      md: pxTovW(8),
    },
    borderLeft: {
      md: '8px solid #F8C807',
      xs: '4px solid #F8C807',
    },
  },
};
interface IProps {
  text: string;
}
export const ElementHeadingTag = (props: IProps) => {
  const { text } = props;
  return (
    <Box sx={styles.tagWrapper}>
      <Typography variant="elementH2">{text}</Typography>
    </Box>
  );
};
