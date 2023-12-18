import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import * as React from 'react';

interface IHomeworkData {
  taskName: string;
  dailyReminder: string;
  allowLateSubmission: boolean;
}

interface IProps {
  homeworkData: IHomeworkData;
  setHomeworkData: React.Dispatch<React.SetStateAction<IHomeworkData>>;
}

export const RadioGroupForm: React.FC<IProps> = ({
  homeworkData,
  setHomeworkData,
}) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isLateSubmissionAllowed = event.target.value === 'Yes';
    setHomeworkData({
      ...homeworkData,
      allowLateSubmission: isLateSubmissionAllowed,
    });
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={homeworkData.allowLateSubmission ? 'Yes' : 'No'}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="Yes"
          control={
            <Radio
              sx={{
                color: '#CCE6FE',
                '&.Mui-checked': {
                  color: 'secondary',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                  fontWeight: 'bold',
                },
              }}
            />
          }
          label="Yes"
        />
        <FormControlLabel
          value="No"
          control={
            <Radio
              sx={{
                color: '#CCE6FE',
                fontWeight: 'bold',
                '&.Mui-checked': {
                  color: 'blue',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 28,
                },
              }}
            />
          }
          label="No"
        />
      </RadioGroup>
    </FormControl>
  );
};

// Render the HomeworkForm component with controlled props
