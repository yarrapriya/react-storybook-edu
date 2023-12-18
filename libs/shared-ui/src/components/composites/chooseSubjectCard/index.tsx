import { Box, Typography } from '@mui/material';
import { pxToRem } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';

const styles: IStyles = {
  root: {
    height: { xs: pxToRem(117) },
    width: { xs: pxToRem(153) },
    borderRadius: { xs: pxToRem(10) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: pxToRem(10),
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
  },
  imageBox: {
    height: { xs: pxToRem(57.27) },
    width: { xs: pxToRem(56.52) },
  },
};
interface IProps {
  image: string;
  subjectName: string;
}

export const ChooseSubjectCard = (props: IProps) => {
  const { image, subjectName } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.imageBox}>
        <img
          src={image}
          alt="subject"
          style={{ height: '100%', width: '100%' }}
        />
      </Box>
      <Typography variant="h3" fontWeight="bold">
        {subjectName}
      </Typography>
    </Box>
  );
};
