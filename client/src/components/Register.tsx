import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

// Function to handle user registration
const fetchData = async (username: string, password: string) => {
  try {
    // Sending a POST request to the backend
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // Checks if the request was successful
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    console.log(data);

    // Redirect to the login page if registration was successful
    if (response.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {
    // Handle errors if problem with registering
    if (error instanceof Error) {
      console.log(`Error when trying to register: ${error.message}`);
    }
  }
};

const Register = () => {
  // Statse variables to store the input values
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    // Centers the form on the screen
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', 
      }}
    >
      {/* Register title */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Register
      </Typography>

      {/* Form container */}
      <Box
        component="form"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { m: 1, width: '25ch' }, // Margin and width for input fields
        }}
        noValidate
        autoComplete="off"
      >
        {/* Username input field */}
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password input field */}
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Register button */}
        <Button
          variant="contained"
          sx={{ width: '25ch', m: 1 }}
          color="primary"
          onClick={() => fetchData(username, password)} // Call fetchData on click
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register
