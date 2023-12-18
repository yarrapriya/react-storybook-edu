import {
  Box,
  Paper,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ProfileRolesEnum } from '@protos/user_management/ums.db_pb';
import { useEffect, useRef, useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import LinkButton from '../../composites/LinkButton';
import ImageWrapper from '../ImageWrapper';
import PrimaryButton from '../PrimaryButton';

const styles: IStyles = {
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: {
      xs: 'initial',
      md: '#F1F0F0',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    position: 'absolute',
    width: { xs: pxToRem(75), md: pxTovW(140) },
    height: { xs: pxToRem(42), md: pxTovW(82) },
    left: { xs: pxToRem(17), md: pxTovW(37) },
    top: { xs: pxToRem(20), md: pxTovW(37) },
    zIndex: 1,
  },
  skip: {
    display: { md: 'none' },
    position: 'absolute',
    width: { xs: pxToRem(75), md: pxTovW(140) },
    height: { xs: pxToRem(42), md: pxTovW(82) },
    right: { xs: pxToRem(17), md: pxTovW(37) },
    top: { xs: pxToRem(20), md: pxTovW(37) },
    zIndex: 1,

    '& >span': {
      fontSize: pxToRem(16),
      color: '#3F4D8F',
    },
  },
  carouselImage: {
    maxHeight: {
      xs: pxToRem(300),
      md: pxTovW(500),
    },
  },
  dots: {
    width: { xs: pxToRem(12), md: pxTovW(12) },
    height: { xs: pxToRem(12), md: pxTovW(12) },
    borderRadius: '50%',
    cursor: 'pointer',
  },
};
export interface LoginCarouselProps {
  skipped: boolean;
  setSkipped: () => void;
  role: ProfileRolesEnum;
}
export function GeneoLoginCarousel(props: LoginCarouselProps) {
  const { setSkipped, role } = props;
  const carouselData =
    role === ProfileRolesEnum.PROFILE_ROLE_STUDENT
      ? carouselMapping.student
      : carouselMapping.teacher;
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNext = () => {
    setIndex((index + 1) % carouselData.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Call handleNext every 2 seconds
    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, [index]);

  return (
    <Box sx={styles.root}>
      {/* <ImageWrapper
        name="geneo-logo"
        type="png"
        parentFolder="images"
        styles={styles.logo}
      /> */}
      <LinkButton sx={styles.skip} onClick={setSkipped}>
        Skip
      </LinkButton>
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 'auto',
          marginBottom: { xs: 'initial', md: 'auto' },
        }}
        ref={containerRef}
      >
        <Slide
          key={index}
          direction={'left'}
          in={true}
          mountOnEnter
          unmountOnExit
          container={containerRef.current}
        >
          <Paper
            sx={{
              boxShadow: 'none',
              background: 'transparent',
              textAlign: 'center',
            }}
          >
            <ImageWrapper
              name={carouselData[index].imageName}
              parentFolder="illustrations"
              type="png"
              styles={styles.carouselImage}
            />
            <Box>
              <Typography
                variant={isMobile ? 'h1' : 'h2'}
                sx={{ marginTop: { xs: pxToRem(20), md: pxTovW(20) } }}
              >
                {carouselData[index].heading}
              </Typography>
              <Box sx={{ marginTop: { xs: pxToRem(10), md: pxTovW(10) } }}>
                <Typography variant="bodyText">
                  {carouselData[index].subText}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Slide>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: { xs: pxToRem(20), md: pxTovW(20) },
          }}
        >
          {carouselData.map((_val, ind) => (
            <Box
              key={ind}
              onClick={() => setIndex(ind)}
              sx={{
                ...styles.dots,
                bgcolor: index === ind ? 'warning.main' : 'hsl(46, 100%, 82%)',
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 'auto',
          marginBottom: '50px',
          width: '80%',
          display: { xs: 'initial', md: 'none' },
        }}
      >
        <PrimaryButton onClick={setSkipped}>GET STARTED</PrimaryButton>
      </Box>
    </Box>
  );
}

const carouselMapping = {
  student: [
    {
      imageName: 'lessonplan',
      heading: 'Supercharge Your Learning',
      subText:
        'Make learning exciting with 1000s of engaging lessons completely aligned to your school',
    },
    {
      imageName: 'homework',
      heading: 'Homework Made Easy',
      subText: 'Complete and submit your homeworks anytime, anywhere',
    },
    {
      imageName: 'analytics',
      heading: 'Your Progress, Your Story',
      subText: 'Witness your growth through personalized performance tracking',
    },
  ],
  teacher: [
    {
      imageName: 'homework',
      heading: 'Create Homework in 2 Minutes',
      subText:
        'Turn homework setup into a breeze – create and assign in 2 minutes',
    },
    {
      imageName: 'lessonplan',
      heading: 'Ready Lesson Plans',
      subText:
        'Explore 1000s of curriculum-aligned resources that spark learning excitement',
    },

    {
      imageName: 'analytics',
      heading: 'Smart Analytics, Smarter Teaching',
      subText:
        'Track class progress effortlessly with auto-evaluated analytics',
    },
  ],
};

export default GeneoLoginCarousel;
