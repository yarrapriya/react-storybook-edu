import { Timestamp } from '@bufbuild/protobuf';
import {
  IStyles,
  ImageWrapper,
  SecondaryButton,
  deserify,
  pxToRem,
  pxTovW,
  theme,
} from '@geneo2-web/shared-ui';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../app/Context/GlobalContextProvider';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_MANAGE, HOMEWORK_ONGOING } from '../../../routeHandling/RoutesNomenclature';
import { setSelectedHwId } from '../../ManageHomework/reducer/manageHomework.slice';
const styles: IStyles = {
  root: {
    // width: { xs: '90vw', md: '97.5%' },
    height: { xs: '92vh', md: '94vh', lg: '84vh' },
    display: 'flex',
    background: '#F2F3FE',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: pxToRem(0), md: pxTovW(15) },
    paddingLeft: { xs: pxToRem(18), md: pxTovW(24) },
    paddingRight: { xs: pxToRem(18), md: pxTovW(24) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(80) }
  },
  correctImage: {
    paddingTop: { xs: pxToRem(0), md: pxTovW(40) },
    height: { xs: pxToRem(88.12), md: pxTovW(119) },
    width: { xs: pxToRem(156), md: pxTovW(208) },
  },
};
export const CongratulationsPage = () => {
  const navigate = useNavigate();
  const { created_hw_details } = deserify(
    useAppSelector((state) => state.homework)
  );
  const dispatch = useAppDispatch();
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const { setSelectedFunction } = useGlobalContext();

  const backButtonClick = async () => {
    navigate(HOMEWORK_MANAGE);
  };

  useEffect(() => {
    setSelectedFunction(() => backButtonClick);
    return () => {
      setSelectedFunction(null);
    };
  }, [])

  return (
    <Box sx={styles.root}>
      <Box>
        <ImageWrapper
          name="correct-tick"
          parentFolder="icons"
          type="png"
          styles={styles.correctImage}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: pxToRem(15), md: pxTovW(4) },
          marginTop: { xs: pxToRem(20), md: pxTovW(0) },
        }}
      >
        <Typography variant="h1" color="success.main" fontWeight="bold">
          Congratulations!
        </Typography>
        <Typography variant="h2" fontWeight="bold">
          Homework Successfully Assigned
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: { xs: 'max-content', md: pxTovW(125) },
          width: { xs: pxToRem(302), md: pxTovW(757) },
          justifyContent: 'center',
          alignItems: 'center',

          gap: { xs: pxToRem(20), md: pxTovW(40) },
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          border: '1px solid #3ACBFC',
          backgroundColor: '#E3F6FD',
          borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
          paddingLeft: { xs: pxToRem(18), md: pxTovW(24) },
          paddingTop: { xs: pxToRem(10), md: pxTovW(32) },
          paddingBottom: { xs: pxToRem(10), md: pxTovW(32) },
          paddingRight: { xs: pxToRem(18), md: pxTovW(24) },
          marginTop: { xs: pxToRem(20), md: pxTovW(17) },
        }}
      >
        <Box
          sx={{
            borderRight: { md: '1px dashed #007CDC' },
            borderBottom: { xs: '1px dashed #007CDC', md: 'none' },
            display: 'flex',
            flexDirection: 'column',
            paddingRight: { md: pxTovW(40) },
            paddingBottom: { xs: pxTovW(40), md: '0px' },
            gap: { xs: pxToRem(15), md: pxTovW(0) },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={largeScreen ? 'cardText' : 'h3'}>
            Quiz Name:
          </Typography>
          <Typography
            variant={largeScreen ? 'bodyText' : 'h1'}
            color="primary.main"
          >
            {created_hw_details?.homeworkTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            borderRight: { md: '1px dashed #007CDC' },
            borderBottom: { xs: '1px dashed #007CDC', md: 'none' },
            display: 'flex',
            flexDirection: 'column',
            paddingRight: { md: pxTovW(40) },
            paddingBottom: { xs: pxTovW(40), md: '0px' },
            gap: { xs: pxToRem(15), md: pxTovW(0) },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={largeScreen ? 'cardText' : 'h3'}>
            Deadline:
          </Typography>
          <Typography
            variant={largeScreen ? 'bodyText' : 'h1'}
            color="primary.main"
          >
            {new Timestamp(created_hw_details?.homeworkTargetDate)
              .toDate()
              .toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            // borderRight: '1px dashed #007CDC',
            display: 'flex',
            flexDirection: 'column',
            paddingRight: { md: pxTovW(40) },
            paddingBottom: { xs: pxTovW(40), md: '0px' },
            gap: { xs: pxToRem(15), md: pxTovW(0) },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant={largeScreen ? 'cardText' : 'h3'}>
            Class:
          </Typography>
          <Typography
            variant={largeScreen ? 'bodyText' : 'h1'}
            color="primary.main"
          >
            {created_hw_details?.class}
            {created_hw_details?.section} {created_hw_details?.subject}
          </Typography>
        </Box>
      </Box>
      {/* Disabled Share for now */}
      {/* <Box
        sx={{
          display: 'flex',
          height: { xs: pxToRem(54), md: pxTovW(54) },
          width: { xs: '100vw', md: pxTovW(757) },
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #D8D8FA',
          gap: { xs: pxToRem(20), md: pxTovW(20) },
          backgroundColor: '#F8F8FF',
          marginTop: { xs: pxToRem(20), md: pxTovW(17) },
          borderRadius: { xs: pxToRem(5), md: pxTovW(5) },
        }}
      >
        <Typography variant={largeScreen ? 'cardText' : 'h3'} color="#3F4D8F">
          SHARE:
        </Typography>
        <Box
          sx={{
            display: 'flex',

            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageWrapper
            name="whatsapp"
            parentFolder="icons"
            type="png"
            styles={{
              height: { xs: pxToRem(32), md: pxTovW(32) },
              width: { xs: pxToRem(32), md: pxTovW(32) },
            }}
          />
          <ImageWrapper
            name="copy-link"
            parentFolder="icons"
            type="png"
            styles={{
              height: { xs: pxToRem(32), md: pxTovW(42) },
              width: { xs: pxToRem(32), md: pxTovW(42) },
            }}
          />
        </Box>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          position: { xs: 'fixed', md: 'unset' },
          bottom: { xs: '14px' },
          // backgroundColor: 'red',
          gap: { xs: pxToRem(20), md: pxTovW(20) },
          marginTop: { xs: pxToRem(20), md: pxTovW(17) },
        }}
      >
        {/* <SecondaryButton
          styles={{
            backgroundColor: '#E4FFF0',
            height: { xs: pxToRem(55), md: pxTovW(55) },
            width: { xs: pxToRem(332), md: pxTovW(350) },
            border: '1px solid #0AA34F75',
            color: '#0AA34F',
            display: { xs: 'none', md: 'block' },
          }}
          onClick={() => navigate('/homework-dashboard')}
        >
          NEXT HOMEWORK
        </SecondaryButton> */}
        <SecondaryButton
          styles={{
            height: { xs: pxToRem(55), md: pxTovW(55) },
            width: { xs: pxToRem(332), md: pxTovW(350) },
          }}
          onClick={() => {
            dispatch(setSelectedHwId(created_hw_details?.homeworkId));
            navigate(HOMEWORK_ONGOING);
          }}
        >
          <Typography variant={largeScreen ? 'h4' : 'h2'} color="#FFFFFF" fontWeight={600}>
            GO TO HOMEWORK
          </Typography>
        </SecondaryButton>
      </Box>
    </Box>
  );
};

function formatDate(inputDate?: string) {
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  if (!inputDate) {
    return 'No date';
  }
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Extract day and month
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });

  // Format day with ordinal suffix
  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDay = `${day}${ordinalSuffix}`;

  // Split formattedDate to separate date and time
  const [formattedTime, amPm] = formattedDate.split(' ');

  return `${formattedDay} ${month}, ${formattedTime}${amPm}`;
}

function getOrdinalSuffix(number: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = number % 10;
  const suffix =
    lastDigit <= 3 && (number < 11 || number > 13)
      ? suffixes[lastDigit]
      : suffixes[0];
  return suffix;
}
