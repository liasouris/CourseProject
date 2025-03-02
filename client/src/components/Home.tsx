import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Board } from './Board';

const Home = () => {
  // State to track the user's authentication token
  const [jwt, setJwt] = useState<string | null>(null);

  // Load JWT from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwt(token); // Set token if it exists
    }
  }, []);

  return (
    // Wrapper with padding for layout
    <Box sx={{ padding: 2 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom>
        Your Kanban Board
      </Typography>

      {/* Show login prompt if no JWT is found */}
      {!jwt ? (
        <Typography variant="body1" align="center">
          Please login or register to access your board.
        </Typography>
      ) : (
        // Show the Kanban board if user is logged in
        <Board />
      )}
    </Box>
  );
};

export default Home;
