import { Box, Typography } from '@mui/material';
import userImage from '../../../assets/tempAssets/user.png';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';
import AvatarImageWrapper from '../AvatarImageWrapper/AvatarImageWrapper';
import { ScoreProgressBar } from '../ScoreProgressBar';
const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 'max-content', md: pxTovW(220) },
    width: { xs: '90vw', md: pxTovW(476) },
    borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
    backgroundColor: '#FFFFFF',
    border: '1px solid #E0DFDE',
    boxSizing: 'border-box',
    boxShadow: `0px 0px ${pxToRem(11)} #E7E7E7D9`,
    // justifyContent: 'right',
  },
  content: {
    height: '90%',
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: pxToRem(10),
  },
};
interface IProps {
  imageUrl?: string;
  subjectName: string;
  chapterName: string;
  questions: number;
  time: string;
  status: 'Pending' | 'Completed' | 'Scored';
  score: number;
}

export const ActiveHomeworkCard = (props: IProps) => {
  const { chapterName, questions, status, subjectName, time, score } = props;
  return (
    <Box sx={styles.root}>
      <Box sx={styles.content}>
        <ImageWrapper
          styles={{
            height: { xs: pxToRem(104), md: pxTovW(160) },
            width: { xs: pxToRem(104), md: pxTovW(160) },
            marginLeft: { xs: pxToRem(12), md: pxTovW(19) },
          }}
          name="lessonImage1"
          parentFolder="tempAssets"
          type="png"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            gap: { xs: pxToRem(15), md: pxTovW(15) },
            margin: { xs: pxToRem(15), md: pxTovW(7) },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="smallText" color="primary.main">
              {subjectName}
            </Typography>
            <Typography variant="cardText" fontWeight="bold">
              {chapterName}
            </Typography>
            <Typography variant="cardText" fontWeight="regular">
              Daily Homework
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconWrapper
                  name="questions"
                  size="small"
                  parentFolder="icons"
                  type="png"
                />
                <Typography variant="cardText" fontWeight="bold">
                  {questions}
                </Typography>
              </Box>
              <Typography variant="smallText" fontWeight="regular">
                Questions
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconWrapper
                  name="clock"
                  size="small"
                  parentFolder="icons"
                  type="png"
                />
                <Typography variant="cardText" fontWeight="bold">
                  {time}
                </Typography>
              </Box>
              <Typography variant="smallText" fontWeight="regular">
                Remaining
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          //   justifySelf: 'right',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: { xs: '80vw', md: 'max-content' },
          alignSelf: { xs: 'center', md: 'flex-end' },
          gap: { md: pxTovW(133) },
          //   backgroundColor: 'red',
          padding: { xs: pxToRem(15), md: '0px' },
          paddingBottom: { xs: pxToRem(15), md: pxTovW(5) },
          marginRight: '1vw',
          marginLeft: '1vw',
          borderTop: { xs: '1px solid #E0DFDE', md: 'none' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: pxToRem(4), md: pxTovW(6), alignItems: 'center' },
          }}
        >
          <AvatarImageWrapper
            size="small"
            name="Deepali"
            ImageSource={userImage}
          />
          <Typography variant="smallText">Deepali</Typography>
        </Box>
        {status !== 'Scored' ? (
          <Typography
            variant="smallText"
            color={status === 'Pending' ? 'red' : 'green'}
          >
            {status}
          </Typography>
        ) : (
          <ScoreProgressBar variant="small" score={score} />
        )}
      </Box>
    </Box>
  );
};
