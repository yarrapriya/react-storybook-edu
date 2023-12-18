import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';
import { IStyles } from '../../../commonUtils/styleUtils';
import InputField from '../../elements/InputField';
import { IconWrapper } from '../../elements/IconWrapper/Index';
const styles: IStyles = {
  root: {
    mt: { xs: pxToRem(50), md: pxTovW(60) },
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: pxToRem(10), md: pxTovW(20) },
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  helperText: {
    bgcolor: '#FFDFDF',
    color: 'error.main',
    padding: { xs: pxToRem(10), md: `${pxTovW(12)} ${pxTovW(30)}` },
  },
  helperText2: {
    height: { xs: pxToRem(32), md: pxTovW(52) },
  },
};
interface InputContainerProps {
  topLabel: string;
  type?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  nonEditable?: boolean;
  helperTextvariant: 'success' | 'error';
  editFunction?: () => void;
}
export const InputFieldContainer = ({
  topLabel,
  type,
  value,
  onChange,
  helperText,
  nonEditable,
  helperTextvariant,
  editFunction,
}: InputContainerProps) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    if (editFunction) {
      editFunction();
    } else {
      return;
    }
  };
  return (
    <Box sx={styles.root}>
      <Typography variant="cardText">{topLabel}</Typography>
      <Box sx={styles.inputContainer}>
        <InputField
          variant="outlined"
          fullWidth
          boldtext
          nonCircular
          type={type ? type : 'text'}
          value={value}
          onChange={onChange}
          sx={{
            bgcolor: nonEditable ? '#EEEEEE' : 'neutral.lightBlue',
            border: 'none',
            // mb: nonEditable ? '20px' : '0px',
          }}
          disabled={nonEditable ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handleEdit}>
                {nonEditable && editFunction && (
                  <IconWrapper
                    name="edit2"
                    type="png"
                    parentFolder="icons"
                    customSx={{
                      height: { xs: pxToRem(29), md: pxTovW(47) },
                      width: { xs: pxToRem(30), md: pxTovW(48) },
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        {helperText ? (
          <Typography
            variant="h4"
            sx={{
              bgcolor: variantMapping[helperTextvariant].bgColor,
              color: variantMapping[helperTextvariant].textColor,
              padding: { xs: pxToRem(10), md: `${pxTovW(12)} ${pxTovW(30)}` },
              mb: { xs: pxToRem(30), md: pxTovW(30) },
            }}
          >
            {helperText}*
          </Typography>
        ) : (
          <Typography sx={styles.helperText2}></Typography>
        )}
      </Box>
    </Box>
  );
};

const EditIcon = () => {
  return (
    <Box
      sx={{
        bgcolor: 'white',
        padding: { md: pxTovW(12.5) },
        borderRadius: { xs: pxToRem(4), md: pxTovW(8) },
      }}
    >
      <EditOutlinedIcon fontSize="medium" color="secondary" />
    </Box>
  );
};
const variantMapping = {
  success: {
    bgColor: '#F1FFF7',
    textColor: '#0AA34F',
    border: '2px solid #0AA34F',
  },
  error: {
    bgColor: '#FFEAEA',
    textColor: '#F54040',
    border: '2px solid #F54040',
  },
};
