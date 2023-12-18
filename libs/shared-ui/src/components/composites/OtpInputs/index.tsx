import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';

import { Box, Typography } from '@mui/material';

import { IStyles, pxToRem, pxTovW } from '@geneo2-web/shared-ui';
import { InfoBox } from './infoBox';
//   import { InfoBox } from './InfoBox';

const styles: IStyles = {
  inputMapper: {
    display: 'flex',
    gap: { xs: pxToRem(18), md: pxTovW(30) },
    mt: { xs: pxToRem(7), md: pxTovW(12) },
  },
  input: {
    width: { xs: pxToRem(50), md: pxTovW(78) },
    height: { xs: pxToRem(50), md: pxTovW(78) },
    boxSizing: 'border-box',
    border: '1px solid red',
    borderColor: '#A8D3FC',
    borderRadius: { xs: pxToRem(10), md: pxTovW(10) },
    backgroundColor: '#F5FAFF',
    textAlign: 'center',
    fontSize: { xs: pxToRem(25), md: pxTovW(30) },
    fontWeight: 'bold',
    boxShadow: ` 0px ${pxTovW(9)} ${pxTovW(6)} #0000001A`,
    '&:focus': {
      outline: '1px solid red',
      outlineColor: '#A8D3FC',
      boxShadow: `inset 0px 0px ${pxTovW(10)} #70B6F9B8, 0px ${pxTovW(
        9
      )} ${pxTovW(6)} #0000001A`,
    },
  },
};

interface IProps {
  otpLength?: number;
  enteredOtp: string;
  setEnteredOtp: Dispatch<SetStateAction<string>>;
  otpWrong: boolean;
}

export const OtpInputs = ({
  otpLength = 5,
  enteredOtp,
  setEnteredOtp,
  otpWrong,
}: IProps) => {
  //^ OTP input operation
  const [otp, setOtp] = useState<string[]>([]);
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    const updatedInputs = [...otp];
    const numericValue = value.replace(/\D/g, '');
    updatedInputs[index] = numericValue;

    console.log('changeHandler: ', updatedInputs);
    setEnteredOtp(updatedInputs.join(''));
    setOtp(updatedInputs);

    const nextElement = event.target
      .nextElementSibling as HTMLInputElement | null;

    if (value !== '' && value.match(/[0-9]/) && nextElement) {
      nextElement.focus();
    }
  };

  const keyUpHandler = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousElement = event.currentTarget
      .previousElementSibling as HTMLInputElement | null;
    const nextElement = event.currentTarget
      .nextElementSibling as HTMLInputElement | null;

    if (
      (event.key === 'ArrowLeft' || event.key === 'Backspace') &&
      previousElement
    ) {
      previousElement.focus();
    } else if (event.key === 'ArrowRight' && nextElement) {
      nextElement.focus();
    }
  };

  const pasteHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').split('').slice(0, otpLength);
    setEnteredOtp(digits.join(''));
    setOtp(digits);

    console.log('pasteHandler : ', digits.join(''));

    const inputElements =
      event.currentTarget.parentElement?.querySelectorAll('input');

    if (inputElements && digits.length === otpLength) {
      const point = digits.length - 1;
      const lastInputElement = inputElements[point] as HTMLInputElement;
      lastInputElement.focus();
    }
    // if you copy digits less than the total length of the otp
    else if (inputElements && digits.length < otpLength) {
      const lastInputElement = inputElements[digits.length] as HTMLInputElement;
      lastInputElement.focus();
    }

    // Prevent the default paste behavior
    event.preventDefault();
  };

  return (
    <>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Enter {otpLength} Digit OTP
        </Typography>

        {/* Use 'form' as the component for Box to enable focus management */}
        <Box component="form" sx={styles.inputMapper}>
          {Array.from({ length: otpLength }).map((_, index) => (
            <Box
              key={index}
              component="input"
              value={otp[index] || ''}
              type="text"
              maxLength={1} // Limit the input to one character (digit)
              onChange={(e) => changeHandler(e, index)}
              onKeyUp={(e) => keyUpHandler(e, index)}
              onPaste={pasteHandler}
              min="0"
              max="9"
              step="1"
              pattern="\d{1}"
              inputMode="numeric"
              sx={styles.input}
            />
          ))}
        </Box>
      </Box>

      {otpWrong && (
        <Box sx={{ mt: { xs: pxToRem(10), md: pxTovW(15) } }}>
          <InfoBox error message="Invalid OTP" />
        </Box>
      )}
    </>
  );
};
