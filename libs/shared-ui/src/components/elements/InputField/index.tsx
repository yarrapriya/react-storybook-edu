import { OutlinedTextFieldProps, TextField } from '@mui/material';
import { useState } from 'react';
import { pxToRem, pxTovW } from '../../../commonUtils/resizeUtils';

interface IProps extends OutlinedTextFieldProps {
  boldtext?: boolean;
  id?: string;
  nonCircular?: boolean;
}
export default function InputField(props: IProps) {
  const { boldtext } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextField
      id={props.id}
      InputProps={
        boldtext === true
          ? { style: { fontWeight: '700', color: 'black' } }
          : { style: { color: 'black' } }
      }
      label={null}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
      sx={{
        borderRadius: props.nonCircular
          ? { xs: pxToRem(5), md: pxTovW(15) }
          : { xs: pxToRem(30), md: pxTovW(30) },

        '&.MuiFormControl-root': {
          border: 'none',
        },
        '& .MuiOutlinedInput-root': {
          padding: { xs: pxToRem(15), md: `${pxTovW(20)}` },
          border: props.disabled ? 'none' : `${pxTovW(1)} solid red`,
          // borderColor: isFocused ? 'neutral.cornflowerBlue' : '#CCE6FE',
          borderColor: 'neutral.cornflowerBlue',
          borderRadius: props.nonCircular
            ? { xs: pxToRem(5), md: pxTovW(15) }
            : { xs: pxToRem(30), md: pxTovW(30) },
          boxShadow: isFocused
            ? `inset 0 0 1px 0 #61BAFF, inset 0 0 2px 1px rgba(97, 186, 255, 0.6), inset 0 0 3px 2px rgba(97, 186, 255, 0.4), inset 0 0 4px 3px rgba(97, 186, 255, 0.2), inset 0 0 5px 4px rgba(97, 186, 255, 0.1)`
            : 'none',
        },
        ...props.sx,
      }}
    />
  );
}
