import { Box, Typography } from '@mui/material';
import { pxToRem } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import AvatarImageWrapper from '../AvatarImageWrapper/AvatarImageWrapper';

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
  classBox: {
    height: { xs: pxToRem(57.27) },
    width: { xs: pxToRem(56.25) },
  },
  avatarBox: {
    display: 'flex',
    gap: pxToRem(5),
  },
};
interface IProps {
  image?: string;
  subjectName: string;
  color: string;
}

export const ChooseClassSubjectCard = (props: IProps) => {
  const { image, subjectName, color } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.classBox}>
        <Typography fontSize={pxToRem(46)} color={color} fontWeight="bold">
          8A
        </Typography>
      </Box>
      <Box sx={styles.avatarBox}>
        <AvatarImageWrapper
          size="small"
          ImageSource={image}
          name={subjectName}
        />
        <Typography variant="h3" fontWeight="bold">
          {subjectName}
        </Typography>
      </Box>
    </Box>
  );
};
