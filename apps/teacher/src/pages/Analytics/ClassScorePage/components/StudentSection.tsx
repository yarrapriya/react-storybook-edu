import {
  FilterSortPopup,
  IStyles,
  NoContentCard,
  StudentScoreCard,
  deserify,
  firstLetterImage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
import { setSelectedStudentInfo } from '../../reducer/analytics.slice';
const styles: IStyles = {
  root: {
    width: { xs: '100vw', md: pxTovW(794) },
    // display: 'flex',
    // flexDirection: 'column',
    // paddingLeft: { xs: pxToRem(0), md: pxTovW(40) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(0) },
    // paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    // overflowX: 'hidden',
    // backgroundColor: 'blue',
  },
  header: {
    width: { xs: '90%', md: '100%' },
    display: 'flex',
    // flexDirection: 'column',
    paddingLeft: { xs: pxToRem(20), md: pxTovW(0) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(0) },
    // paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    gap: { xs: pxToRem(10), md: pxTovW(22) },
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    //
    // alignItems: 'center',
  },
};

export const StudentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected_class_info } = deserify(
    useAppSelector((state) => state.analytics)
  );
  const ClassSubjectAnalysisData = deserify(
    useAppSelector((state) => state.analytics.class_subject_analysis)
  );
  const [studentList, setStudentList] = useState(
    ClassSubjectAnalysisData?.studentsPerformanceList
  );
  const handleStudentClick = (i: number) => {
    dispatch(
      setSelectedStudentInfo(
        ClassSubjectAnalysisData?.studentsPerformanceList[i]
      )
    );

    navigate('/analytics-studentScore');
  };
  function splitName(fullName: string) {
    const nameParts = fullName.split(' ');
    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(' '); // In case there are middle names or multiple last names

    return {
      firstname: firstname,
      lastname: lastname,
    };
  }

  const SortFunction = (value: string) => {
    const temp = ClassSubjectAnalysisData?.studentsPerformanceList.slice();
    switch (value) {
      case 'Score: High to Low':
        temp?.sort((a, b) => b.scorePercent - a.scorePercent);
        setStudentList(temp);
        // console.log(temp);
        break;
      case 'Score: Low to High':
        temp?.sort((a, b) => a.scorePercent - b.scorePercent);
        setStudentList(temp);
        // console.log(temp);
        break;
      case 'First Name':
        temp?.sort((a, b) => {
          const FirstNameA = splitName(a.name).firstname;
          const FirstNameB = splitName(b.name).firstname;
          const nameA = FirstNameA.toLowerCase();
          const nameB = FirstNameB.toLowerCase();

          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        });
        setStudentList(temp);
        break;
      case 'Last Name':
        temp?.sort((a, b) => {
          const LastNameA = splitName(a.name).lastname;
          const LastNameB = splitName(b.name).lastname;
          const nameA = LastNameA.toLowerCase();
          const nameB = LastNameB.toLowerCase();

          if (nameA < nameB) {
            return -1;
          } else if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        });
        setStudentList(temp);
        break;

      default:
        break;
    }
  };

  const FilterFunction = (value: string) => {
    const temp = ClassSubjectAnalysisData?.studentsPerformanceList.slice();
    switch (value) {
      case 'High Score':
        setStudentList(temp?.filter((elem) => elem.scorePercent > 80));
        // console.log(temp?.filter((elem) => elem.scorePercent > 80));
        break;
      case 'Low Score':
        setStudentList(temp?.filter((elem) => elem.scorePercent < 30));
        break;
      case 'Medium Score':
        setStudentList(
          temp?.filter(
            (elem) => elem.scorePercent > 30 && elem.scorePercent < 80
          )
        );
        break;

      default:
        break;
    }
  };
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
            {`Class  ${selected_class_info?.classname}${selected_class_info?.section}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: pxToRem(10), md: pxTovW(22) } }}>
          <FilterSortPopup
            iconName="Sort"
            title="Sort By"
            sortFunction={SortFunction}
            options={[
              'First Name',
              'Last Name',
              'Score: Low to High',
              'Score: High to Low',
            ]}
          />
          <FilterSortPopup
            iconName="Filter"
            title="Filter"
            options={['High Score', 'Low Score', 'Medium Score']}
            filterFunction={FilterFunction}
          />
        </Box>
      </Box>
      {studentList && studentList.length !== 0 ? (
        <Box
          sx={{
            width: {
              xs: '100vw',
              md: pxTovW(794),
            },
            paddingLeft: { xs: pxToRem(20), md: pxTovW(20) },
            paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
            paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
            paddingRight: { xs: pxToRem(0), md: pxTovW(10) },
            boxShadow: `0px 0px ${pxToRem(13)} #E0DFDE`,
            backgroundColor: '#FFFFFF',
            // backgroundColor: 'red',
            borderRadius: '5px',
          }}
        >
          <Grid
            container
            columns={{ xs: 1, md: 2 }}
            // columnGap={{ md: 10 }}
            rowGap={6}
            //   sx={{ backgroundColor: 'blue' }}
          >
            {studentList?.map((elem, i) => (
              <Grid
                key={i}
                item
                xs={1}
                md={1}
                onClick={() => handleStudentClick(i)}
                sx={{ cursor: 'pointer' }}
              >
                <StudentScoreCard
                  imageUrl={elem.profileImageUrl || firstLetterImage(elem.name)}
                  studentName={elem.name}
                  score={elem.scorePercent}
                ></StudentScoreCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <NoContentCard
          variant="info"
          icon="cards"
          text="No students assigned"
        />
      )}
    </Box>
  );
};

const students = [
  { studentName: 'John', score: 25 },
  { studentName: 'Alice', score: 92 },
  { studentName: 'Michael', score: 48 },
  { studentName: 'Sarah', score: 38 },
  { studentName: 'David', score: 15 },
  { studentName: 'David', score: 65 },
];
