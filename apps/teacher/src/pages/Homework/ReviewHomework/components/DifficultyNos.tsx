import {
  deserify,
  IStyles,
  pxToRem,
  pxTovW,
  QuantityButton,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../reduxStore/reduxHooks';
import {
  setHighQuestionsCount,
  setLowQuestionsCount,
  setMediumQuestionsCount,
} from '../../reducer/homework.slice';

interface IVariant {
  horizontal: string;
  vertical: string;
}
interface IProps {
  mobileVariant?: keyof IVariant;
  desktopVariant?: keyof IVariant;
}
export default function DifficultyNos({
  mobileVariant,
  desktopVariant,
}: IProps) {
  if (!mobileVariant) mobileVariant = 'horizontal';
  if (!desktopVariant) desktopVariant = 'horizontal';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const styles: IStyles = {
    root: {
      width: '100%',
      backgroundColor: '#fafafa',
      // height: { xs: pxToRem(95), md: 'max-content' },
      height: 'max-content',
      boxSizing: 'border-box',
      display: 'flex',
      // flexDirection: { xs: 'row ', md: 'column' },
      flexDirection: {
        xs: mobileVariant === 'horizontal' ? 'row' : 'column',
        md: desktopVariant === 'horizontal' ? 'row' : 'column',
      },
      justifyContent: { xs: 'space-around', md: 'space-between' },
      alignItems: { xs: 'center', md: 'inherit' },
      boxShadow: '0px 3px 35px #0000000F',
      // border: '1px solid #EAEAEA',
      borderRadius: pxTovW(30),
      padding: { md: `${pxTovW(20)} ${pxTovW(30)}` },
      '&>:not(:last-child)': {
        borderBottom: '1px solid lightgrey',
      },
    },
    buttonContainer: {
      // width: '100%',
      width: {
        xs: mobileVariant === 'horizontal' ? 'unset' : '100%',
        md: desktopVariant === 'horizontal' ? 'unset' : '100%',
      },
      display: 'flex',
      // flexDirection: { xs: 'column ', md: 'row' },

      flexDirection: {
        xs: mobileVariant === 'horizontal' ? 'column' : 'row',
        md: desktopVariant === 'horizontal' ? 'column' : 'row',
      },
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: { xs: pxToRem(10), md: 'inherit' },
      padding: { xs: `${pxToRem(10)} 0`, md: `${pxTovW(20)} 0px` },
    },
  };

  const { questions_count, module_filtered_questions, questions_stats } =
    deserify(useAppSelector((state) => state.homework));
  const dispatch = useAppDispatch();
  const handleIncrement = (callback: any) => {
    return () => dispatch(callback({ type: 'inc' }));
  };
  const handleDecrement = (callback: any) => {
    return () => dispatch(callback({ type: 'dec' }));
  };
  return (
    <Box sx={styles.root}>
      <Box sx={styles.buttonContainer}>
        <Typography variant="h3">Easy</Typography>
        <QuantityButton
          smallVariant={isMobile}
          quantity={questions_count.noOfLowQuestions}
          incrementClickHandler={handleIncrement(setLowQuestionsCount)}
          decrementClickHandler={handleDecrement(setLowQuestionsCount)}
          maxQuantity={
            questions_stats?.questionDifficultyLevel?.noOfLowQuestions
          }
        />
      </Box>

      <Box sx={styles.buttonContainer}>
        <Typography variant="h3">Medium</Typography>
        <QuantityButton
          smallVariant={isMobile}
          quantity={questions_count.noOfMediumQuestions}
          incrementClickHandler={handleIncrement(setMediumQuestionsCount)}
          decrementClickHandler={handleDecrement(setMediumQuestionsCount)}
          maxQuantity={
            questions_stats?.questionDifficultyLevel?.noOfMediumQuestions
          }
        />
      </Box>

      <Box sx={styles.buttonContainer}>
        <Typography variant="h3">Hard</Typography>
        <QuantityButton
          smallVariant={isMobile}
          quantity={questions_count.noOfHighQuestions}
          incrementClickHandler={handleIncrement(setHighQuestionsCount)}
          decrementClickHandler={handleDecrement(setHighQuestionsCount)}
          maxQuantity={
            questions_stats?.questionDifficultyLevel?.noOfHighQuestions
          }
        />
      </Box>
    </Box>
  );
}
