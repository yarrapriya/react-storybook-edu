import {
  FilterSortPopup,
  IStyles,
  StudentScoreCard,
  deserify,
  firstLetterImage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import { Box, Grid, Typography } from '@mui/material';
import { StudentPerformanceInfo } from '@protos/learning_management/lms.hw.teacher.apis_pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../reduxStore/reduxHooks';
const styles: IStyles = {
  root: {
    width: { xs: '80vw', md: pxTovW(794) },
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
interface IProps {
  Class: string;
  studentPerformanceInfo?: StudentPerformanceInfo[];
  cardOnClickHandler?: (studentId: string) => void;
}
export const StudentSection = (props: IProps) => {
  const { Class, studentPerformanceInfo, cardOnClickHandler } = props;
  const [studentList, setStudentList] = useState<
    StudentPerformanceInfo[] | undefined
  >();
  const navigate = useNavigate();
  const { homework_list_data } = deserify(
    useAppSelector((state) => state.manageHomework)
  );

  function splitName(fullName: string) {
    const nameParts = fullName.split(' ');
    const firstname = nameParts[0];
    const lastname = nameParts.slice(1).join(' '); // In case there are middle names or multiple last names

    return {
      firstname: firstname,
      lastname: lastname,
    };
  }
  useEffect(
    () => setStudentList(studentPerformanceInfo),
    [studentPerformanceInfo]
  );

  const SortFunction = (value: string) => {
    const temp = studentPerformanceInfo?.slice();
    switch (value) {
      case 'Score: High to Low':
        temp?.sort((a, b) => b.scorePercent - a.scorePercent);
        setStudentList(temp);
        // console.log(temp);
        // console.log(studentList);
        break;
      case 'Score: Low to High':
        temp?.sort((a, b) => a.scorePercent - b.scorePercent);
        setStudentList(temp);
        // console.log(temp);
        // console.log(studentList);
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
    const temp = studentPerformanceInfo;
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
            Class {Class}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: pxToRem(10), md: pxTovW(22) } }}>
          <FilterSortPopup
            iconName="Sort"
            title="Sort By"
            options={[
              'First Name',
              'Last Name',
              'Score: Low to High',
              'Score: High to Low',
            ]}
            sortFunction={SortFunction}
          />
          <FilterSortPopup
            iconName="Filter"
            title="Filter"
            options={['High Score', 'Low Score', 'Medium Score']}
            filterFunction={FilterFunction}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: {
            xs: '100vw',
            md: pxTovW(794),
          },
          paddingLeft: { xs: pxToRem(20), md: pxTovW(40) },
          paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
          paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
          paddingRight: { xs: pxToRem(0), md: pxTovW(10) },
          boxShadow: `0px 0px ${pxToRem(13)} #E0DFDE`,
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
        }}
      >
        <Grid
          container
          columns={{ xs: 1, md: 2 }}
          // columnGap={pxToRem(12)}
          rowGap={6}
          //   sx={{ backgroundColor: 'blue' }}
        >
          {studentList?.map((elem, index) => (
            <Grid
              key={index}
              item
              xs={1}
              md={1}
              onClick={() =>
                cardOnClickHandler && cardOnClickHandler(String(elem.studentId))
              }
              sx={{ cursor: 'pointer' }}
            >
              <StudentScoreCard
                studentName={elem.name}
                score={elem.scorePercent}
                imageUrl={elem.profileImgUrl || firstLetterImage(elem.name)}
              ></StudentScoreCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const scoreArray = [
  {
    studentName: 'Jeson Andrew',
    score: 60,
  },
  {
    studentName: 'Jeson Andrew',
    score: 10,
  },
  {
    studentName: 'Jeson Andrew',
    score: 20,
  },
  {
    studentName: 'Jeson Andrew',
    score: 20,
  },
  {
    studentName: 'Jeson Andrew',
    score: 60,
  },
  {
    studentName: 'Jeson Andrew',
    score: 60,
  },
  {
    studentName: 'Jeson Andrew',
    score: 30,
  },
  {
    studentName: 'Jeson Andrew',
    score: 50,
  },
];
