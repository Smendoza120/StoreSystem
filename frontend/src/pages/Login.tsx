import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Container, Box, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Inicio de sesión
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;