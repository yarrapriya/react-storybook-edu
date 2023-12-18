import { Box, Grid, SxProps, Typography } from '@mui/material';

// import { ScoreProgressBar } from 'libs/shared-ui/src/components/composites/ScoreProgressBar';
import { ScoreProgressBar, firstLetterImage } from '@geneo2-web/shared-ui';
import { ReactNode } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  hwDisplayCard: {
    // border: '1px solid red',
    boxSizing: 'border-box',
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    boxShadow: `0 0 ${pxTovW(39)} #E7E7E7D9`,
    '&:hover': {
      boxShadow: `0 0 ${pxTovW(20)} grey`,
    },
    // minWidth: { xs: pxToRem(313), md: pxTovW(313) },
    minWidth: { xs: pxToRem(313), md: 'unset' },
    // maxWidth: { xs: pxToRem(313), md: pxTovW(476) },
    maxWidth: { xs: pxToRem(313), md: 'unset' },

    p: {
      xs: pxToRem(10),
      // md: `${pxTovW(13)} ${pxTovW(11)} ${pxTovW(9.5)} ${pxTovW(13.5)}`,
      md: pxTovW(10),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: pxToRem(11), md: pxTovW(10) },
    bgcolor: 'common.white',
    cursor: 'pointer',
  },

  mainGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  leftGrid: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: { xs: '100%', md: '98%' },
    objectFit: 'cover',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    // aspectRatio: '1/1',
    maxWidth: { xs: pxToRem(105), md: pxTovW(181) },
  },
  textIconGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  questionAndTimeBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  hwStatusBox: {
    width: '100%',
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'space-between',
    alignItems: 'center',
    pt: pxTovW(7),

    borderTopWidth: pxTovW(1),
    borderTopStyle: 'solid',
    borderTopColor: 'text.disabled',
  },
};

const variantWidth = {
  xs: { small: pxToRem(313), medium: pxToRem(319), large: pxToRem(313) },
  md: { small: pxTovW(313), medium: pxTovW(347), large: pxTovW(476) },
};
const variantHeight = {
  xs: { small: pxToRem(157), medium: pxToRem(160), large: pxToRem(157) },
  md: { small: pxTovW(157), medium: pxTovW(170), large: pxTovW(196) },
};

interface IVariants {
  small: string;
  medium: string;
  large: string;
}
interface HomeworkItem {
  subject: string;
  chapter: string;
  hwName: string;
  teacherName: string;
  teacherProfileImageUrl?: string;
  completed: string;
}
interface IconDetails {
  iconName: string;
  text: string;
  label: string;
}
interface IProps {
  image?: string;
  homeworkItem: HomeworkItem;
  currentTabValue?: string;
  rootStyle?: SxProps;
  variant: keyof IVariants;
  iconDetails: IconDetails[];
  status?: ReactNode;
  onCardClick?: () => void;
}

export const InfoDisplayCard = ({
  image,
  homeworkItem,
  currentTabValue,
  rootStyle,
  variant,
  iconDetails,
  status,
  onCardClick,
}: IProps) => {
  if (currentTabValue === undefined) currentTabValue = 'Active';

  let rootSx = { ...styles.hwDisplayCard };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box
      onClick={onCardClick}
      sx={{
        width: {
          xs: variantWidth.xs[variant],
          md: variantWidth.md[variant],
        },
        height: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },
        ...rootSx,
      }}
    >
      <Grid container sx={styles.mainGrid}>
        <Grid item xs={4.6} md={4.6} sx={styles.leftGrid}>
          <ImageWrapper
            name={'homework-v1'}
            type="png"
            parentFolder="icons"
            styles={styles.image}
            path={image}
          />
        </Grid>

        <Grid item xs={7} md={7} sx={styles.textIconGrid}>
          <Typography
            variant="subText"
            fontWeight="bold"
            color="primary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {homeworkItem.subject}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {homeworkItem.chapter}
          </Typography>

          <Typography
            variant="smallText"
            fontWeight="light"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {homeworkItem.hwName}
          </Typography>

          <Box sx={styles.questionAndTimeBox}>
            {iconDetails.map((elem, index) => (
              <IconTextBox
                key={index}
                iconName={elem.iconName}
                text={elem.text}
                label={elem.label}
              />
            ))}
          </Box>

          <Box sx={styles.hwStatusBox}>
            <StatusBox
              status={status}
              homeworkItem={homeworkItem}
              currentTabValue={currentTabValue}
              variant={variant}
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ ...styles.hwStatusBox, display: { xs: 'flex', md: 'none' } }}>
        <StatusBox
          status={status}
          homeworkItem={homeworkItem}
          currentTabValue={currentTabValue}
          variant={variant}
        />
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: pxToRem(3), md: pxTovW(3) },
      }}
    >
      <Box sx={{ display: 'flex', gap: { xs: pxToRem(4), md: pxTovW(4) } }}>
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

// ------------------------------------------------------

interface IStatusBox {
  status?: ReactNode;
  homeworkItem: HomeworkItem;
  currentTabValue?: string;
  variant: string;
}
const StatusBox = ({
  status,
  homeworkItem,
  currentTabValue,
  variant,
}: IStatusBox) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: pxToRem(3), md: pxTovW(3) },
          mr: { xs: pxToRem(10), md: pxTovW(10) },
        }}
      >
        <ImageWrapper
          name="user"
          type="png"
          parentFolder="tempAssets"
          styles={{
            height: { xs: pxToRem(18), md: pxTovW(25) },
            width: { xs: pxToRem(18), md: pxTovW(25) },
            borderRadius: '50%',
          }}
          path={
            homeworkItem.teacherProfileImageUrl ||
            firstLetterImage(homeworkItem.teacherName)
          }
        />
        <Typography variant="subText">{homeworkItem.teacherName}</Typography>
      </Box>

      {status ? (
        status
      ) : (
        <>
          {+homeworkItem.completed === 0 ? (
            <Typography
              variant="subText"
              fontWeight="bold"
              color={currentTabValue === 'Active' ? 'crimson' : 'primary'}
            >
              {currentTabValue === 'Active' ? 'PENDING' : 'NOT SUBMITTED'}
            </Typography>
          ) : +homeworkItem.completed === 100 ? (
            <Typography variant="subText" color="secondary" fontWeight="bold">
              COMPLETED
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: { xs: '50%', md: variant === 'large' ? '50%' : '70%' },
                alignItems: 'center',
                gap: { xs: pxToRem(5), md: pxTovW(5) },
              }}
            >
              <Typography variant="smallestText" fontWeight="bold">
                Score
              </Typography>
              <ScoreProgressBar
                score={+homeworkItem.completed}
                variant="small"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};
