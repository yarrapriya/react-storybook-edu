import { Timestamp } from '@bufbuild/protobuf';
import { LmsHomewokTeacherAPIServiceV1Client } from '@geneo2-web/services-clients';
import {
  DatePicker,
  IStyles,
  InputField,
  PrimaryButton,
  TimePicker,
  deserify,
  getLocalStorage,
  pxToRem,
  pxTovW,
} from '@geneo2-web/shared-ui';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../reduxStore/reduxHooks';
import { HOMEWORK_CONGRATULATIONS } from '../../../routeHandling/RoutesNomenclature';
import {
  combineStartTimeAndDate,
  convertTimeStringToTimestamp,
} from '../../../utils/functions';
import { setToastInfo } from '../../Home/reducer/homeDashboard.slice';
import { setCreatedHWDetails } from '../reducer/homework.slice';
import { RadioGroupForm } from './components/RadioGroupForm';

const styles: IStyles = {
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: { xs: pxToRem(20), md: pxTovW(241) },
    paddingRight: { xs: pxToRem(20), md: pxTovW(241) },
    paddingTop: { xs: pxToRem(20), md: pxTovW(40) },
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: { xs: pxToRem(20), md: pxTovW(40) },
  },
  inputFeildBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(20), md: pxTovW(40) },
    width: { xs: '100%', md: pxTovW(856) },
    // backgroundColor: 'blue',
    mb: '2.343vw', //32px
  },
  instructionBox: {
    width: { xs: '100%' },
    // boarder: '1px solid #CCE6FE',
    boxSizing: 'border-box',
  },
  instructionCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: { xs: pxToRem(14), md: pxTovW(10) },
    boxSizing: 'border-box',
    paddingBottom: { xs: pxToRem(14), md: pxTovW(47) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    width: { xs: '100%' },
    backgroundColor: '#F6FBFF',
    border: '1px solid #CCE6FE',
    gap: { xs: pxToRem(20), md: pxTovW(16) },
    marginBottom: { xs: pxToRem(60) },
    // backgroundColor: 'blue',
  },
  textBox: {
    display: 'flex',
    // alignItems: 'center',
    width: '100%',
    paddingLeft: { md: pxTovW(20) },
    gap: { xs: pxToRem(6.61), md: pxTovW(6.61) },
    // paddingTop: '20px',
    alignItems: 'flex-start',
  },
  inputFeild: {
    // backgroundColor: "red",
    height: { xs: pxToRem(50), md: pxTovW(70) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    border: '1px solid #CCE6FE',
    width: { xs: '100%', md: pxTovW(856) },
    justifyContent: 'center',
  },
  timeFeild: {
    height: { xs: pxToRem(50), md: pxTovW(70) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    border: '1px solid #CCE6FE',
    width: { xs: pxToRem(145), md: pxTovW(200) },
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderFeild: {
    width: { xs: pxToRem(311), md: pxTovW(419) },
    height: { xs: pxToRem(50), md: pxTovW(70) },
    borderRadius: { xs: pxToRem(10), md: pxTovW(15) },
    border: '1px solid #CCE6FE',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(10) },
  },
  label: {
    color: 'black',
    '@media(max-width:640px)': { fontSize: pxToRem(30) },
  },
};
interface IHomeworkData {
  taskName: string;
  dailyReminder: string;
  allowLateSubmission: boolean;
}
export const AssignHomework = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { homework_id } = useParams();
  const { class_subject_info } = deserify(
    useAppSelector((state) => state.homeDashboard)
  );
  const { fetched_hw_details, submitted_hw_id } = deserify(
    useAppSelector((state) => state.homework)
  );
  const [homeworkData, setHomeworkData] = useState<IHomeworkData>({
    // taskName: fetched_hw_details?.homeworkTitle || '',
    taskName: '',
    dailyReminder: '06:00',
    allowLateSubmission: true,
  });
  const [startTimeValues, setStartTimeValues] = useState({
    timeValue: `${new Date().getHours()} : ${new Date().getMinutes()}`,
    dateValue: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    ).toISOString(), // Includes timezone offset
  });
  const [endTimeValues, setEndTimeValues] = useState({
    timeValue: '23:59',
    dateValue: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    ).toISOString(),
  });

  const teacher_id = deserify(getLocalStorage('userId'));
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setHomeworkData({ ...homeworkData, [name]: value });
  };
  const assignClickHandler = () => {
    const startTimeIsoString = combineStartTimeAndDate(startTimeValues);
    const endTimeIsoString = combineStartTimeAndDate(endTimeValues);
    const startTime = new Date(startTimeIsoString);
    const endTime = new Date(endTimeIsoString);
    // console.log(startTime, endTime);
    if (startTime > endTime) {
      dispatch(
        setToastInfo({
          variant: 'error',
          label: 'Start date connot be after End date',
          open: true,
        })
      );
    } else if (homeworkData.taskName === '') {
      dispatch(
        setToastInfo({
          variant: 'error',
          label: 'Homework Name Cannot be empty',
          open: true,
        })
      );
    } else {
      assignmentSubmission();
    }
  };
  const assignmentSubmission = async () => {
    try {
      const startTimeIsoString = combineStartTimeAndDate(startTimeValues);
      const endTimeIsoString = combineStartTimeAndDate(endTimeValues);
      const response =
        await LmsHomewokTeacherAPIServiceV1Client.homeworkAssignmentSubmit({
          homeworkName: homeworkData.taskName,
          teacherId: teacher_id,
          homeworkId: submitted_hw_id,
          startTime: Timestamp.fromDate(new Date(startTimeIsoString)),
          endTime: Timestamp.fromDate(new Date(endTimeIsoString)),
          dailyReminderTime: convertTimeStringToTimestamp(
            homeworkData.dailyReminder
          ),
          allowLateSubmission: homeworkData.allowLateSubmission,
          homeworkInstructions: Instructions,
          sectionId: class_subject_info?.sectionId,
        });
      if (response.data) {
        dispatch(setCreatedHWDetails(response.data?.updatedHW));
        navigate(
          `${HOMEWORK_CONGRATULATIONS}/${response.data.updatedHW?.homeworkId}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h1">Assign Homework</Typography>
        <Typography variant="cardText" sx={{ color: '#007CDC' }}>
          Class {class_subject_info?.classname || ''}
          {class_subject_info?.section || ''} |{' '}
          {class_subject_info?.subject || ''}
        </Typography>
      </Box>
      <Box
        sx={{
          boxSizing: 'border-box',
          // paddingLeft: { xs: pxToRem(20), md: pxTovW(40) },
          // paddingRight: { xs: pxToRem(20), md: pxTovW(40) },
          display: { md: 'flex' },
          gap: { xs: pxToRem(10), md: pxTovW(36) },
        }}
      >
        <Box sx={styles.inputFeildBox}>
          <Box sx={styles.inputBox}>
            <Typography variant="bodyText">Homework Name</Typography>
            <InputField
              nonCircular
              value={homeworkData.taskName}
              name="taskName"
              onChange={handleChange}
              variant="outlined"
              sx={styles.inputFeild}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '1vw',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={styles.inputBox}>
              <Typography variant="bodyText">Start Date</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '2vw',
                }}
              >
                <DatePicker
                  value={startTimeValues.dateValue}
                  handleDateChange={(date) => {
                    // console.log(date);
                    setStartTimeValues({ ...startTimeValues, dateValue: date });
                  }}
                />
                <TimePicker
                  date={startTimeValues.dateValue}
                  value={startTimeValues.timeValue}
                  handleTimeChange={(time) => {
                    setStartTimeValues({ ...startTimeValues, timeValue: time });
                  }}
                />
              </Box>
            </Box>

            <Box sx={styles.inputBox}>
              <Typography variant="bodyText">End Date</Typography>
              <Box sx={{ display: 'flex', gap: '2vw' }}>
                <DatePicker
                  minDate={startTimeValues.dateValue.slice(0, 10)}
                  value={endTimeValues.dateValue}
                  handleDateChange={(date) =>
                    setEndTimeValues({ ...endTimeValues, dateValue: date })
                  }
                />
                <TimePicker
                  date={endTimeValues.dateValue}
                  value={endTimeValues.timeValue}
                  handleTimeChange={(time) => {
                    setEndTimeValues({ ...endTimeValues, timeValue: time });
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'space-between', md: 'flex-start' },
              gap: { md: pxTovW(27) },
              flexDirection: { xs: 'column-reverse', md: 'row' },
            }}
          >
            <Box
              sx={{
                ...styles.inputBox,
                width: { md: pxTovW(409) },
                flexGrow: { xs: '1', md: '0' },
              }}
            >
              <Typography variant="bodyText">Daily Reminder</Typography>
              <Box>
                <TimePicker
                  fullWidth
                  value={homeworkData.dailyReminder}
                  name="dailyReminder"
                  handleTimeChange={(time) => {
                    setHomeworkData((prev) => ({
                      ...prev,
                      dailyReminder: time,
                    }));
                  }}
                />
              </Box>
            </Box>
            <Box sx={styles.inputBox}>
              <Typography variant="bodyText">Allow Late Submission</Typography>
              <RadioGroupForm
                homeworkData={homeworkData}
                setHomeworkData={setHomeworkData}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={styles.instructionBox}>
          <Box sx={styles.instructionCard}>
            <Box
              sx={{
                height: '5px',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                // padding: { md: pxTovW(20) },
              }}
            >
              {/* <IconWrapper
                name="edit"
                parentFolder="icons"
                type="png"
                size="md"
                customSx={{
                  height: { xs: pxToRem(34), md: pxTovW(34) },
                  width: { xs: pxToRem(34), md: pxTovW(34) },
                }}
              /> */}
            </Box>
            <Box
              sx={{
                ...styles.textBox,
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                Instructions:
              </Typography>
            </Box>
            <Box sx={styles.textBox}>
              <Box sx={{ paddingTop: { xs: pxToRem(5), md: pxTovW(3) } }}>
                <CheckOutlinedIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="h4">
                Answer all questions to complete the Homework assignment.
              </Typography>
            </Box>
            <Box sx={styles.textBox}>
              <Box sx={{ paddingTop: { xs: pxToRem(5), md: pxTovW(3) } }}>
                <CheckOutlinedIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="h4">
                Feel free to retry the Homework for better understanding.
              </Typography>
            </Box>
            <Box sx={styles.textBox}>
              <Box sx={{ paddingTop: { xs: pxToRem(5), md: pxTovW(3) } }}>
                <CheckOutlinedIcon fontSize="small" color="primary" />
              </Box>
              <Typography variant="h4">
                Ensure Homework completion by the specified Deadline.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          top: { md: pxTovW(126) },
          left: { xs: pxToRem(14), md: pxTovW(1279) },
          bottom: { xs: pxToRem(10) },
          width: { xs: '90vw', md: 'max-content' },
        }}
      >
        <PrimaryButton onClick={assignClickHandler}>Assign</PrimaryButton>
      </Box>
    </Box>
  );
};
const Instructions = [
  'Answer all questions to complete the Homework assignment.',
  'Feel free to retry the Homework for better understanding.',
  'Ensure Homework completion by the specified Deadline.',
];
