import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value);
  };

  const handleContrasenaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContrasena(event.target.value);
  };

  const handleCancelar = () => {
    // Lógica para cancelar el inicio de sesión (ej: limpiar campos, redirigir)
    console.log('Cancelar');
    setUsuario('');
    setContrasena('');
  };

  const handleIngresar = () => {
    // Lógica para enviar los datos de inicio de sesión
    console.log('Ingresar', { usuario, contrasena });
    // Aquí iría la llamada a la API de autenticación
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="usuario"
        label="Usuario"
        name="usuario"
        autoComplete="usuario"
        autoFocus
        value={usuario}
        onChange={handleUsuarioChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="contrasena"
        label="Contraseña"
        type="password"
        id="contrasena"
        autoComplete="current-password"
        value={contrasena}
        onChange={handleContrasenaChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          onClick={handleCancelar}
          startIcon={<CloseIcon />}
          sx={{ mr: 2 }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleIngresar}
        >
          Ingresar
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;