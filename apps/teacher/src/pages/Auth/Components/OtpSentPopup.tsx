import { ActionPopUpSingleButton } from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function OtpSentpopup() {

  const [actionPopupState, setActionPopupState] = useState(true);

  return (
    <Box>
      <ActionPopUpSingleButton
        fontSmall={true}
        open={actionPopupState}
        iconName="reset-password"
        popupText="An email with a Reset Password link was just sent to your email ID"
        splitText='in.....@gmail.com'
        handleClose={() => setActionPopupState(false)}
        ctaHandler={() => setActionPopupState(false)}
        buttontext='OK'
        background='rgba(193, 248, 218, 1)'
      />
    </Box>
  )
}
