import { ActionPopUpSingleButton } from '@geneo2-web/shared-ui';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function ContactAdmin() {

  const [actionPopupState, setActionPopupState] = useState(true);

  return (
    <Box>
      <ActionPopUpSingleButton
        fontSmall={true}
        open={actionPopupState}
        iconName="costumer-service"
        popupText="Please Contact Your School Admin for Registration"
        handleClose={() => setActionPopupState(false)}
        ctaHandler={() => setActionPopupState(false)}
        buttontext='OK'
        background='rgba(193, 248, 218, 1)'
      />
    </Box>
  )
}
