import { Box, Typography } from '@mui/material';
import ClockIcon from '../../../assets/icons/clock.png';
import LessonImage from '../../../assets/tempAssets/lessonImage1.png';
import { pxToRem } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import AvatarImageWrapper from '../AvatarImageWrapper/AvatarImageWrapper';

const styles: IStyles = {
  root: {
    minHeight: { xs: pxToRem(241) },
    maxHeight: 'max-content',
    width: { xs: pxToRem(199) },
    borderRadius: { xs: pxToRem(15) },
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
    padding: { xs: `${pxToRem(13)} ${pxToRem(8)} ${pxToRem(14)} ${pxToRem(12)} ` },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(19) },
    paddingBottom: { xs: pxToRem(10) },
    borderBottom: '1px solid #E7E7E7D9',
  },
  avatarBox: {
    display: 'flex',
    gap: pxToRem(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: { xs: pxToRem(10) },
  },
};
interface IProps {
  userImage?: string;
  userName: string;
  custom: boolean;
}
export const LessonPlanCard = (props: IProps) => {
  const { userImage, userName, custom } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.content}>
        <img
          alt="lessonPlan"
          src={LessonImage}
          style={{ height: pxToRem(92), width: pxToRem(172) }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography fontSize={pxToRem(16)} fontWeight="bold">
            Production and Propagation of sound
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: pxToRem(9) } }}>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: pxToRem(5) },
              alignItems: 'center',
            }}
          >
            <IconWrapper
              name="clock"
              type="png"
              size="small"
              parentFolder="icons"
            />
            <Typography variant="smallText">10 Mins</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: pxToRem(5), alignItems: 'center' }}>
            <IconWrapper
              name="questions"
              type="png"
              size="small"
              parentFolder="icons"
            />
            <Typography variant="smallText">5 Resources</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={styles.lowerBox}>
        <Box sx={styles.avatarBox}>
          <AvatarImageWrapper
            size="small"
            name={custom ? userName : 'Geneo'}
            ImageSource={custom ? userImage : ''}
          />

          <Typography fontSize={pxToRem(14)} fontWeight="bold">
            {custom ? userName : 'Geneo'}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', gap: { xs: pxToRem(5) }, alignItems: 'center' }}
        >
          <img
            alt="topic"
            src={ClockIcon}
            style={{ height: pxToRem(15), width: pxToRem(15) }}
          />
          <Typography fontSize={pxToRem(12)} color="#007CDC">
            10 Mins
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
