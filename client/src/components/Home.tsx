import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Board } from './Board';

const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwt(token);
    }
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to your Kanban Board
      </Typography>
      {!jwt ? (
        <Typography variant="body1" align="center">
          Please login or register to access your board.
        </Typography>
      ) : (
        // Render the board component if a JWT is present
        <Board />
      )}
    </Box>
  );
};

export default Home;
