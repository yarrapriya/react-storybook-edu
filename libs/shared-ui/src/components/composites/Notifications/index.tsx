import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import AvatarImageWrapper from '../AvatarImageWrapper/AvatarImageWrapper';
const styles: IStyles = {
  root: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    margin: '0 auto',
    maxWidth: {
      xs: 'unset',
      md: pxTovW(900)
    }
  },
  header: {
    padding: { xs: `${pxToRem(15)} ${pxToRem(20)}` },
  },
  notificationCard: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    padding: {
      xs: `${pxToRem(15)} ${pxToRem(20)} ${pxToRem(30)} ${pxToRem(20)}`,
      md: pxTovW(17),
    },
    '& > div': {
      borderBottom: '1px solid #666e66',
    },
    '& > :nth-last-child(-n+1) ': {
      border: 'none',
    },
    // gap: { xs: pxToRem(15), md: pxTovW(17) },
    // backgroundColor: 'blue',
  },
};
export const Notifications = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">Notifications</Typography>
      </Box>
      <Box sx={styles.notificationCard}>
        {notificationArray.map((elem) => (
          <Box
            sx={{
              display: 'flex',
              // justifyContent: 'space-between',
              alignItems: 'center',
              // gap: { xs: pxToRem(5), md: pxTovW(17) },
              paddingY: pxToRem(15),
            }}
          >
            <Box>
              <AvatarImageWrapper size="lg" name={elem.name} ImageSource={''} />
            </Box>
            <Typography variant="h3" fontWeight="bold" color="#1D1D1D" sx={{
              paddingLeft: {
                xs: pxToRem(10),
                md: pxTovW(15)
              }
            }}>
              {elem.text}
            </Typography>
            <Typography variant="subText" color="#828282" marginLeft="auto">
              {elem.time + 'h'}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <Box
          sx={{ margin: 'auto', textAlign: 'center', marginBottom: pxToRem(10) }}
        >
          <Typography variant="h4" color="#0AA34F">
            View all notifications
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const notificationArray = [
  {
    name: 'Alice',
    text: 'This is some text for Alice. She is a character in a story.',
    time: 3,
  },
  {
    name: 'Bob',
    text: 'Bob enjoys outdoor activities. He loves hiking and camping.',
    time: 5,
  },
  {
    name: 'Charlie',
    text: 'Charlie is a talented musician. He plays the guitar and piano.',
    time: 2,
  },
  {
    name: 'David',
    text: "David is an aspiring writer. He's currently working on a novel.",
    time: 7,
  },
  {
    name: 'Ella',
    text: 'Ella is a passionate artist. Her favorite medium is watercolors.',
    time: 1,
  },
  {
    name: 'Frank',
    text: 'Frank is a dedicated scientist. He conducts experiments in the lab.',
    time: 4,
  },
  {
    name: 'Grace',
    text: 'Grace is a skilled chef. She specializes in French cuisine.',
    time: 6,
  },
  {
    name: 'Henry',
    text: 'Henry is a history enthusiast. He loves studying ancient civilizations.',
    time: 9,
  },
  {
    name: 'Isabel',
    text: 'Isabel is a computer programmer. She develops web applications.',
    time: 8,
  },
  {
    name: 'Jack',
    text: 'Jack is an adventurous traveler. He has explored over 30 countries.',
    time: 10,
  },
];
