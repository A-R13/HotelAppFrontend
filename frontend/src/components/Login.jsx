import React, { useState } from 'react';
import { Button, TextField, Container, Paper, Typography, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorPage, setErrorPage] = React.useState(false);
  // const [errorMsg, setErrorMsg] = React.useState('')
  // const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    console.log('login submit was clicked');

    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-type': 'application/json',
      }
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else if (data.token) {
      console.log(data.token);
    }
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '5em' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center">Login</Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleLoginSubmit()}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
