//* MUI imports
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import InputField from '../InputField';

interface IProps {
  name?: string;
  value?: string;
  handleDateChange?: (selectedDate: string) => void;
  minDate?: string;
}

export const DatePicker = (props: IProps) => {
  const { name, value, handleDateChange, minDate } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTimestamp = event.target.value;
    const selectedDate = selectedTimestamp
      ? new Date(selectedTimestamp).toISOString()
      : null;
    // console.log({ selectedDate });
    handleDateChange && handleDateChange(selectedDate || '');
  };

  return (
    <InputField
      name={name}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '100%',
          border: '1px solid #CCE6FE',
          padding: { xs: pxToRem(20), md: pxTovW(20) },
          borderRadius: {
            xs: pxToRem(15),
            md: pxTovW(15),
          },
        },
      }}
      inputProps={{
        min: minDate || new Date().toISOString().slice(0, 10),
      }}
      value={fromIsoTimestampToDate(value)}
      onChange={handleChange}
      type="date"
    />
  );
};

export default DatePicker;

function fromIsoTimestampToDate(date?: string) {
  if (!date) {
    return '';
  }
  const dateStringSubstring = date.slice(0, 10);
  return dateStringSubstring;
}
