//* MUI imports
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

interface IProps {
  value?: string;
  handleTimeChange?: (value: string) => void;
  fullWidth?: boolean;
  name?: string;
  date?: string;
}
export const TimePicker = (props: IProps) => {
  const { name, value, handleTimeChange, fullWidth, date } = props;
  const arr = [];
  for (let i = 0; i < 24; i++) {
    const h = i >= 13 ? i - 12 : i;
    const amPm = i >= 12 ? 'PM' : 'AM';
    arr.push({ text: `${h}:00 ${amPm}`, hours: i, mins: 0 });
    arr.push({ text: `${h}:30 ${amPm}`, hours: i, mins: 30 });
  }

  // const [time, setTime] = useState<string | undefined>(undefined);
  // console.log({ time });
  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const newValue = convertTo24HourFormat(value);
    // setTime(value);
    handleTimeChange && handleTimeChange(newValue || '00:00');
  };

  const CheckTime = (props: { hours: number; mins: number }) => {
    const { hours, mins } = props;
    if (date && date.slice(0, 10) === new Date().toISOString().slice(0, 10)) {
      const H = new Date().getHours();
      const M = new Date().getMinutes();
      if (H > hours) {
        return true;
      } else if (H === hours) {
        if (M >= mins) {
          return true;
        }
      }

      return false;
    } else {
      // console.log(date.slice(0, 10), new Date().toISOString().slice(0, 10));
      return false;
    }
  };
  return (
    <Select
      value={convertTo12HourFormat(value)}
      onChange={handleChange}
      name={name}
      displayEmpty
      sx={{
        width: fullWidth ? '100%' : 'inherit',
        borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: '#CCE6FE',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CCE6FE',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CCE6FE',
        },
        '&:focus-visible .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CCE6FE',
        },
      }}
      renderValue={(value) => (
        <Typography variant="bodyText">
          {value ? value : 'Select Time'}
        </Typography>
      )}
      inputProps={{
        sx: {
          '&.MuiInputBase-input': {
            padding: {
              xs: `${pxToRem(20)} ${pxToRem(35)} ${pxToRem(20)} ${pxToRem(
                20
              )}!important `,
              md: `${pxTovW(20)} ${pxTovW(35)} ${pxTovW(20)} ${pxTovW(
                20
              )} !important`,
            },
            width: '100%',
          },
        },
      }}
      MenuProps={{
        sx: {
          maxHeight: { xs: pxToRem(300), md: pxTovW(300) },
        },
        PaperProps: {
          sx: {
            borderRadius: { xs: pxToRem(15), md: pxTovW(15) },
          },
        },
      }}
    >
      <MenuItem value={undefined}>
        <Typography variant="bodyText">Select Time</Typography>
      </MenuItem>
      {arr.map((time, index) => (
        <MenuItem
          key={index}
          disabled={CheckTime({ hours: time.hours, mins: time.mins })}
          value={time.text}
        >
          <Typography variant="bodyText">{time.text}</Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default TimePicker;

function convertTo24HourFormat(time: string): string {
  const date = new Date(`2000-01-01 ${time}`.replace(/-/g, '/'));
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formattedTime;
}
function convertTo12HourFormat(time?: string): string {
  if (!time) {
    return '0:00 AM';
  }
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formattedTime;
}
