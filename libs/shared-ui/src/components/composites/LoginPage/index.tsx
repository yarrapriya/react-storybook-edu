import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

export default function index() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: '2vw',
          width: { xs: '90vw', md: '40vw' },
          border: '1px solid grey',
          boxShadow: '10px 10px 10px black',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vw',
        }}
      >
        <Typography sx={{ textAlign: 'center' }} variant="h1">
          Login
        </Typography>
        <Box>
          <InputLabel>
            <Typography variant="bodyText">Email id/Phone Number</Typography>
          </InputLabel>
          <TextField fullWidth />
        </Box>
        <Box>
          <InputLabel>
            <Typography variant="bodyText">Password</Typography>
          </InputLabel>
          <TextField fullWidth />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" color="primary">
            <h2>Sign Up</h2>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
