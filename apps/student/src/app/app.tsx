import { Box, Button, Typography } from '@mui/material';
// import NxWelcome from './nx-welcome';
import { Link } from 'react-router-dom';
import { LOGIN } from '../routeHandling/RoutesNomenclature';

export function App() {
  return (
    <Box
      sx={{ pl: '10vw', display: 'flex', flexDirection: 'column', gap: '2vw' }}
    >
      {/* <NxWelcome title="teacher" /> */}
      <Typography variant="h1">Hello user</Typography>

      <div>
        <Link to="/docs">
          <Button variant="outlined" color="secondary">
            Documentation
          </Button>
        </Link>

        <Link to={LOGIN}>
          <Button variant="outlined" color="secondary">
            Login
          </Button>
        </Link>
      </div>
    </Box>
  );
}

export default App;
