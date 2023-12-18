import { ActionPopUpSingleButton } from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function PasswordSet() {

  const [actionPopupState, setActionPopupState] = useState(true);

  return (
    <Box>
      <ActionPopUpSingleButton
        fontSmall={true}
        open={actionPopupState}
        iconName="reset-password"
        popupText="Your Password has been Successfully Reset"
        handleClose={() => setActionPopupState(false)}
        ctaHandler={() => setActionPopupState(false)}
        buttontext='GO TO LOGIN'
        background='#0AA34F'
        textcolor='common.white'
      />
    </Box>
  )
}
