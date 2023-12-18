import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { LmsTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  IStyles,
  ImageWrapper,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Banner } from '@protos/learning_management/lms.teacher.apis_pb';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedClassInfo } from '../../Analytics/reducer/analytics.slice';

const styles: IStyles = {
  root: {
    p: { xs: pxToRem(0), md: pxTovW(0) },
    boxSizing: 'border-box',
  },

  dotContainer: {
    display: 'flex',
    gap: { xs: pxToRem(3) },
    justifyContent: 'center',
    mt: { xs: pxToRem(8) },
  },
  dots: {
    width: { xs: pxToRem(10) },
    height: { xs: pxToRem(10) },
    borderRadius: '50%',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: pxToRem(160),
    objectFit: 'cover',
    borderRadius: pxToRem(30),
  },
};

export const TeacherHomeMobileCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [totalDots, setTotalDots] = useState(0);
  const [currentDot, setCurrentDot] = useState(0);
  const teacher_id = deserify(getLocalStorage('userId'));
  const [currentSet, setCurrentSet] = useState<Banner[]>([]);
  useEffect(() => {
    fetchBanners();
  }, []);
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await LmsTeacherAPIServiceV1Client.fetchTeacherBanners({
        teacherId: teacher_id,
      });
      if (response.banners) {
        // const tempData: Banner[] = [...response.banners, ...response.banners];
        // setBanners(tempData);
        // const first3: Banner[] = [];
        // tempData.forEach((elem, index) => {
        //   if (index < 3) first3.push(elem);
        // });
        // setTotalDots(Math.ceil(tempData.length / 3));

        setBanners(response.banners);
        const first3: Banner[] = [];
        response.banners.forEach((elem, index) => {
          if (index < 1) first3.push(elem);
        });

        setCurrentSet(first3);
        setTotalDots(Math.ceil(response.banners.length / 1));
      }
      // console.log(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  function getElementsSet(number: number) {
    const startIndex = number * 1;
    const endIndex = startIndex + 1;
    const set = banners.slice(startIndex, endIndex);

    if (number === 1 && set.length < 1) {
      return banners.slice(banners.length - 1);
    }

    return set;
  }

  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDragStartX(event.clientX);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    const dragEndX = event.clientX;
    const deltaX = dragEndX - dragStartX!;

    if (deltaX > 0) {
      // Call your function for dragging right here
      if (currentDot > 0) {
        setCurrentDot(currentDot - 1);
        setCurrentSet(getElementsSet(currentDot - 1));
      }
    } else if (deltaX < 0) {
      // Call your function for dragging left here
      if (currentDot < totalDots - 1) {
        // console.log('currentDot:', currentDot);
        setCurrentDot(currentDot + 1);
        setCurrentSet(getElementsSet(currentDot + 1));
      }
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={styles.root}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { xs: pxToRem(10) },
          boxSizing: 'border-box',
        }}
      >
        {currentSet &&
          currentSet.map((elem, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
              onClick={() => {
                dispatch(
                  setSelectedClassInfo({
                    classname: `${elem.class}`,
                    section: elem.section,
                    sectionId: elem.sectionId,
                    subject: elem.subject,
                    subjectId: elem.subjectId,
                  })
                );
                navigate('/analytics-classScore');
              }}
            >
              <Box
                sx={{
                  width: pxToRem(322),
                  height: pxToRem(137),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <ImageWrapper
                  name="PerformanceBanner"
                  type="png"
                  // path={elem.imageUrl}
                  // parentFolder="tempAssets"
                  styles={{
                    boxShadow: `0 0 ${pxToRem(10)} grey`,
                    width: pxToRem(322),
                    height: pxToRem(137),
                    // objectFit: 'fill',
                    borderRadius: pxToRem(10),
                    // boxShadow: `0px 0px ${pxTovW(10)} #E7E7E7D9`,
                  }}
                />
                <Box
                  style={{
                    position: 'absolute',
                    top: pxToRem(20),
                    bottom: 0,
                    left: pxToRem(30),
                    width: '40%',
                  }}
                >
                  <Typography
                    variant="h1"
                    fontWeight="900"
                    color={'success.main'}
                  >
                    {elem.scorePercent}%
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight="700"
                    color={'success.main'}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    in {elem.subject}
                  </Typography>
                  <Typography variant="h2" fontWeight="bold">
                    Scored By{' '}
                  </Typography>
                  <Typography variant="h2" fontWeight="bold">
                    {elem.class}
                    {elem.section} Class
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>

      <Box sx={styles.dotContainer}>
        {Array.from({ length: totalDots || 0 }).map((elem, index) => (
          <Box
            key={index}
            onClick={() => {
              setCurrentDot(index);
              setCurrentSet(getElementsSet(index));
            }}
            sx={{
              ...styles.dots,
              bgcolor:
                index === currentDot ? 'warning.main' : 'hsl(46, 100%, 82%)',
            }}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};
