import { Box, SxProps, Typography } from '@mui/material';

import { ReactNode } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import { IconWrapper } from '../../elements/IconWrapper/Index';
import ImageWrapper from '../../elements/ImageWrapper';

const styles: IStyles = {
  root: {
    // border:"1px solid red",
    borderRadius: { xs: pxToRem(15), md: pxTovW(20) },
    boxSizing: 'border-box',
    boxShadow: `0 0 ${pxTovW(39)} #E7E7E7D9`,
    '&:hover': { boxShadow: `0 0 ${pxTovW(20)} grey` },
    cursor: 'pointer',
    padding: {
      xs: `${pxToRem(13)} ${pxToRem(8)} ${pxToRem(14)} ${pxToRem(12)}`,
      md: pxTovW(14),
    },

    // height: 'max-content',
    // minWidth: { xs: pxToRem(199), md: pxTovW(253) },
    minWidth: { xs: pxToRem(199), md: 'unset' },

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
    // gap: { xs: pxToRem(7), md: pxTovW(7) },
    bgcolor: 'white',
  },

  headingIconStatusBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  headingIconBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: { xs: `${pxToRem(10)} 0`, md: `${pxTovW(10)} 0` },
    // gap: { xs: pxToRem(37), md: pxTovW(65.38) },
    // gap: { xs: pxToRem(37), md: 'unset' },
  },

  avatarBox: {
    display: 'flex',
    gap: pxToRem(5),
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainHeadingBox: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textAlign: 'center',
  },
  mainHeading: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },

  iconTextBoxContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: { xs: pxToRem(13), md: pxTovW(11) },
    // mt: { xs: pxToRem(30), md: pxTovW(30) },
  },
  lowerBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // mt: { xs: pxToRem(7), md: pxTovW(10) },
    borderTop: `${pxTovW(2)} solid #E7E7E7D9`,
    pt: { xs: pxToRem(5), md: pxTovW(5) },
  },
};

const variantWidth = {
  xs: { small: pxToRem(199), medium: pxToRem(199), large: pxToRem(199) },
  md: { small: pxTovW(253), medium: pxTovW(277), large: pxTovW(310) },
};
const variantHeight = {
  xs: { small: pxToRem(241), medium: pxToRem(241), large: pxToRem(246) },
  md: { small: pxTovW(266), medium: pxTovW(314), large: pxTovW(357) },
};

// const variantHeadingWidth = {
//   xs: { small: pxToRem(199), medium: pxToRem(199), large: pxToRem(199) },
//   md: { small: pxTovW(225), medium: pxTovW(253), large: pxTovW(286) },
// };

interface IconDetails {
  iconName: string;
  text: string;
}
interface IVariants {
  small: string;
  medium: string;
  large: string;
}
interface IProps {
  variant: keyof IVariants;
  mainHeading: string;
  iconDetails: IconDetails[];
  status?: ReactNode;
  rootStyle?: SxProps;
  image?: string;
  lastSessionTime?: string;
  teacherName?: string;
  teacherImage?: string;
  onClick?: () => void;
}
export const LessonPlanInfoPanel = ({
  variant,
  mainHeading,
  iconDetails,
  status,
  rootStyle,
  image,
  lastSessionTime,
  teacherName,
  teacherImage,
  onClick,
}: IProps) => {
  let rootSx = { ...styles.root };
  if (rootStyle) rootSx = { ...rootSx, ...rootStyle };

  return (
    <Box
      onClick={onClick}
      sx={{
        width: {
          xs: variantWidth.xs[variant],
          md: variantWidth.md[variant],
        },
        height: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },
        maxWidth: {
          xs: variantWidth.xs[variant],
          md: variantWidth.md[variant],
        },
        maxHeight: {
          xs: variantHeight.xs[variant],
          md: variantHeight.md[variant],
        },
        ...rootSx,
      }}
    >
      <ImageWrapper
        name="lessonplan-v1"
        type="png"
        parentFolder="icons"
        styles={{
          width: '100%',
          objectFit: 'cover',
          borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
          aspectRatio: 272 / 144
        }}
        path={image}
      />

      <Box sx={styles.headingIconStatusBox}>
        <Box sx={styles.headingIconBox}>
          <Box sx={styles.mainHeadingBox}>
            <Typography variant="cardText" sx={styles.mainHeading}>
              {mainHeading}
            </Typography>
          </Box>

          <Box sx={styles.iconTextBoxContainer}>
            {iconDetails.map((elem, index) => (
              <IconTextBox
                key={index}
                iconName={elem.iconName}
                text={elem.text}
              />
            ))}
          </Box>
        </Box>

        {status ? (
          status
        ) : (
          <Box sx={styles.lowerBox}>
            <Box sx={styles.avatarBox}>
              <ImageWrapper
                name="user"
                type="png"
                parentFolder="tempAssets"
                styles={{
                  width: { xs: pxToRem(18), md: pxTovW(25) },
                  height: { xs: pxToRem(18), md: pxTovW(25) },
                  borderRadius: '50%',
                }}
                path={teacherImage}
              />

              <Typography variant="smallText" fontWeight="bold">
                {teacherName ? teacherName : 'Geneo'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: pxToRem(5) },
                alignItems: 'center',
              }}
            >
              {lastSessionTime ? (
                <>
                  <IconWrapper
                    name="calender"
                    size="small"
                    parentFolder="icons"
                    type="png"
                  />
                  <Typography fontSize={pxToRem(12)} color="#007CDC">
                    {lastSessionTime}
                  </Typography>
                </>
              ) : (
                <>
                  <IconWrapper
                    name="clock"
                    size="small"
                    parentFolder="icons"
                    type="png"
                  />
                  <Typography variant="subText" color="#007CDC">
                    10 Mins
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface IBox {
  iconName: string;
  text: string;
}
const IconTextBox = ({ iconName, text }: IBox) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: pxToRem(3.13), md: pxTovW(4) } }}>
      <IconWrapper
        name={iconName}
        size="small"
        parentFolder="icons"
        type="png"
      />
      <Typography variant="smallText">{text}</Typography>
    </Box>
  );
};
