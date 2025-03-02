import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

//function to send login request to backend
const fetchData = async (username: string, password: string) => {
  try {
    //Sending post request to authenticate user
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    console.log(data);

    // If the server returns a token, save it to localStorage

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    }
  } catch (error) {

    // Handle any errors that occur during login
    if (error instanceof Error) {
      console.log(`Error when trying to login: ${error.message}`);
    }
  }
};

const Login = () => {
 // States variables to store the input values

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Center vertically
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => fetchData(username, password)}
          variant="contained"
          sx={{ width: '25ch', m: 1 }}
          color="primary"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;