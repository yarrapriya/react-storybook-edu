import { Box, Typography } from '@mui/material';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import InputField from '../../elements/InputField';
const styles: IStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
};
interface Iprops {
  topLabel: string;
  type?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const PasswordInputField = (props: Iprops) => {
  const { topLabel, type, value, onChange } = props;
  return (
    <Box sx={styles.root}>
      <Typography variant="cardText" fontWeight="bold">
        {topLabel}
      </Typography>
      <Box sx={styles.inputContainer}>
        <InputField
          variant="outlined"
          fullWidth
          boldtext
          nonCircular
          type={type ? type : 'text'}
          value={value}
          onChange={onChange}
          sx={{ bgcolor: 'neutral.lightBlue' }}
        />
      </Box>
    </Box>
  );
};

