import { Box, SxProps, Typography, useMediaQuery } from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import QuestionIcon from '../../../assets/icons/Questions.png';
import lessonIcon from '../../../assets/icons/lesson.png';
import rightArrow from '../../../assets/icons/rightArrow.png';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { theme } from '../../../theme/themeProvider';
import TertiaryButton from '../../elements/TertiaryButton';
const styles: IStyles = {
  root: {
    height: { xs: pxToRem(72), md: 'max-content' },
    // padding: { xs: '1.9rem 1.4rem 2.2rem 1rem' },
    padding: {
      xs: `${pxToRem(14)} ${pxToRem(32)}`,
      md: `${pxTovW(14)} ${pxTovW(32)}`,
    },
    boxSizing: 'border-box',
    width: { xs: '100%', md: '100%' },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',

    // gap: { xs: pxToRem(11), md: pxTovW(20) },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(11) },
    width: { md: '86%' },
  },
};
interface IProps {
  viewAllClickHandler: () => void;
  title: string;
  lessonPlanCount: number | undefined;
  questionsCount: number | undefined;
  profileType?: ProfileRolesEnum;
  rootStyle?: SxProps;
}
export const TopicCard = (props: IProps) => {
  const {
    title,
    viewAllClickHandler,
    lessonPlanCount,
    questionsCount,
    profileType,
    rootStyle,
  } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box sx={rootSx} onClick={viewAllClickHandler}>
      <Box sx={styles.content}>
        <Typography
          fontSize={pxToRem(16)}
          fontWeight="bold"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: { xs: pxToRem(9) } }}>
          {!!lessonPlanCount && (
            <Box sx={{ display: 'flex', gap: { xs: pxToRem(5) } }}>
              <img
                alt="topic"
                src={lessonIcon}
                style={{ height: pxToRem(17), width: pxToRem(14) }}
              />
              <Typography fontSize={pxToRem(12)}>
                {lessonPlanCount}{' '}
                {profileType === ProfileRolesEnum.PROFILE_ROLE_STUDENT
                  ? 'Lesson'
                  : 'Lesson Plan'}
                {lessonPlanCount > 1 ? 's' : ''}
              </Typography>
            </Box>
          )}

          {!!questionsCount && (
            <Box sx={{ display: 'flex', gap: pxToRem(5) }}>
              <img
                alt="topic"
                src={QuestionIcon}
                style={{
                  height: pxToRem(17),
                  width: pxToRem(14),
                }}
              />
              <Typography fontSize={pxToRem(12)}>
                {questionsCount} Questions
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {isMobile ? (
        <img
          alt="chapter"
          src={rightArrow}
          onClick={viewAllClickHandler}
          style={{
            height: pxToRem(12.5),
            width: pxToRem(7),
            marginLeft: pxToRem(5),
          }}
        ></img>
      ) : (
        <Typography variant="smallText" fontWeight="bold">
          <TertiaryButton onClick={viewAllClickHandler}>View</TertiaryButton>
        </Typography>
      )}
    </Box>
  );
};
