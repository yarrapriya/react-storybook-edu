import { Box, SxProps, Typography } from '@mui/material';

import { IStyles, ImageWrapper, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { ScoreProgressBar } from 'libs/shared-ui/src/components/composites/ScoreProgressBar';
import { IconWrapper } from 'libs/shared-ui/src/components/elements/IconWrapper/Index';

const styles: IStyles = {
  hwDisplayCard: {
    boxSizing: 'border-box',
    borderRadius: { md: pxTovW(15) },
    boxShadow: `0 0 ${pxTovW(39)} #E7E7E7D9`,
    '&:hover': {
      boxShadow: `0 0 ${pxTovW(20)} grey`,
    },
    width: { xs: pxToRem(313), md: pxTovW(313) },
    minWidth: { xs: pxToRem(313), md: pxTovW(313) },
    height: { xs: pxToRem(157), md: pxTovW(157) },
    p: {
      xs: pxToRem(10),
      md: `${pxTovW(13)} ${pxTovW(11)} ${pxTovW(9.5)} ${pxTovW(13.5)}`,
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: { xs: pxToRem(11), md: pxTovW(10) },
    bgcolor: 'common.white',
  },

  hwImage: {
    width: { xs: pxToRem(103), md: pxTovW(114) },
    height: { xs: pxToRem(103), md: pxTovW(121) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
  },

  rightTextBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(4), md: pxTovW(2) },
    alignItems: 'flex-start',
    marginBottom: 'auto',
  },

  questionAndTimeBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  hwStatusBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    pt: '10px',

    borderTopWidth: pxTovW(1),
    borderTopStyle: 'solid',
    borderTopColor: 'text.disabled',
  },
};

interface HomeworkItem {
  subject: string;
  chapter: string;
  hwName: string;
  totalQuestion: string;
  timeLeft: string;
  name: string;
  completed: string;
}
interface IProps {
  homeworkItem: HomeworkItem;
  currentTabValue?: string;
  rootStyle?: SxProps;
  // rootStyle?: SxProps | undefined;
}
export const HwInfoDisplayCard = ({
  homeworkItem,
  currentTabValue,
  rootStyle,
}: IProps) => {
  if (currentTabValue === undefined) currentTabValue = 'Active';

  let rootSx = { ...styles.hwDisplayCard };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box sx={rootSx}>
      <ImageWrapper
        name="lesson-plan-sample"
        type="png"
        parentFolder="tempAssets"
        styles={styles.hwImage}
      />

      <Box sx={styles.rightTextBox}>
        <Typography variant="subText" fontWeight="bold" color="primary">
          {homeworkItem.subject}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {homeworkItem.chapter}
        </Typography>

        <Typography variant="smallText" fontWeight="light">
          {homeworkItem.hwName}
        </Typography>

        <Box sx={styles.questionAndTimeBox}>
          <IconTextBox
            iconName="questions"
            text={homeworkItem.totalQuestion}
            label="Questions"
          />
          <IconTextBox
            iconName="clock"
            text={homeworkItem.timeLeft}
            label="Remaining"
          />
        </Box>

        <Box sx={styles.hwStatusBox}>
          <Typography variant="subText">{homeworkItem.name}</Typography>

          {+homeworkItem.completed === 0 ? (
            <Typography variant="subText" color="crimson">
              {currentTabValue === 'Active' ? 'PENDING' : 'NOT SUBMITTED'}
            </Typography>
          ) : (
            // <Typography variant="subText" color="crimson">
            //   ScoreProgressBar-{homeworkItem.completed}%
            // </Typography>
            <ScoreProgressBar score={+homeworkItem.completed} variant="small" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface IBox {
  iconName: string;
  text: string;
  label: string;
}
const IconTextBox = ({ iconName, text, label }: IBox) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: { md: pxTovW(4) } }}>
        <IconWrapper
          name={iconName}
          size="small"
          parentFolder="icons"
          type="png"
        />
        <Typography variant="smallText">{text}</Typography>
      </Box>

      <Typography variant="smallestText">{label}</Typography>
    </Box>
  );
};
