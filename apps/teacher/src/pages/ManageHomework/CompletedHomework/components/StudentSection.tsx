import {
  FilterSortPopup,
  IStyles,
  StudentScoreCard,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HOMEWORK_PERFORMANCE } from '../../../../routeHandling/RoutesNomenclature';
const styles: IStyles = {
  root: {
    width: { xs: '80vw', md: '50%' },
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: { xs: pxToRem(0), md: pxTovW(40) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(0) },
    // paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    // overflowX: 'hidden',
  },
  header: {
    width: { xs: '100%', md: '100%' },
    display: 'flex',
    // flexDirection: 'column',
    paddingLeft: { xs: pxToRem(40), md: pxTovW(40) },
    // paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    justifyContent: 'space-between',
    //
    // alignItems: 'center',
  },
};

export const StudentSection = () => {
  //NOT BEING USED
  const navigate = useNavigate();
  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h2" fontWeight="bold">
            Students
          </Typography>
          <Typography
            variant="cardText"
            fontWeight="bold"
            sx={{ color: '#007CDC' }}
          >
            Class 8A
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: pxToRem(10), md: pxTovW(22) } }}>
          <FilterSortPopup
            iconName="Filter"
            title="Filter"
            options={['High Score', 'Low Score', 'Medium Score']}
          />
          <FilterSortPopup
            iconName="Sort"
            title="Sort By"
            options={[
              'First Name',
              'Last Name',
              'Score: Low to High',
              'Score: High to Low',
            ]}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100vw',
            md: '100%',
          },
          paddingLeft: { xs: pxToRem(20), md: pxTovW(40) },
          paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
          paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
          paddingRight: { xs: pxToRem(0), md: pxTovW(40) },
          boxShadow: `0px 0px ${pxToRem(13)} #E0DFDE`,
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
        }}
      >
        <Grid
          container
          columns={{ xs: 1, md: 3 }}
          columnGap={34}
          rowGap={6}
          //   sx={{ backgroundColor: 'blue' }}
        >
          <Grid
            item
            xs={1}
            md={1}
            onClick={() => navigate(HOMEWORK_PERFORMANCE)}
          >
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={80}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={20}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={10}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={50}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={30}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={70}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={10}
            ></StudentScoreCard>
          </Grid>
          <Grid item xs={1} md={1}>
            <StudentScoreCard
              studentName="Jeson Andrew"
              score={60}
            ></StudentScoreCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
