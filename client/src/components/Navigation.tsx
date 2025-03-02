import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

  // State to track JWT (user authentication token)
const Navigation = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  //loads JWT from localstorage
  useEffect(() => {
    setJwt(localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setJwt(null);
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Button component={Link} to="/" color="inherit">Home</Button>
          {!jwt ? (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/register" color="inherit">Register</Button>
            </>
          ) : (
            <Button component={Link} to="/logout" color="inherit" onClick={logout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
