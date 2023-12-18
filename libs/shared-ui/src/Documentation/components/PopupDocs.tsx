import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { ActionsPopup } from '../../components/composites/ActionsPopup';
import { FilterSortPopup } from '../../components/composites/FilterSortPopup';
import { pxTovW } from '../../commonUtils/resizeUtils';
import { Toast } from '../../components/composites/Toasts';
import { InstructionsPopup } from '../../components/composites/InstructionsPopup';

export const PopupDocs = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTextPopup, setOpenTextPopup] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        height: '80vh',
        width: '100vw',
        gap: '20px',
      }}
    >
      <Box sx={{ margin: 'auto' }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          {' '}
          Open Popup
        </Button>
        <FilterSortPopup
          iconName="Filter"
          title="Filter"
          options={['Price', 'Rating', 'Popularity', 'Date']}
        />
        <Button onClick={() => setOpenTextPopup(true)}>Open text popup</Button>
      </Box>
      <ActionsPopup
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        iconName="delete"
        popupText="Are you sure want to delete this question"
        yesClickHandler={() => console.log('yes')}
        noClickHandler={() => console.log('No')}
      />
      <Toast
        open={open}
        onClose={() => setOpen(false)}
        variant="success"
        label="New Card Fast Fluid Fraction add here"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>Toast</Typography>
      </Toast>
      <InstructionsPopup
        open={openTextPopup}
        handleClose={() => setOpenTextPopup(false)}
      />
    </Box>
  );
};
