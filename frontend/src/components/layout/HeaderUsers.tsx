import React from 'react';
import { Typography } from '@mui/material';

interface HeaderUsuariosProps {
  totalUsuarios: number;
}

const HeaderUsers: React.FC<HeaderUsuariosProps> = ({ totalUsuarios }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Control de Usuarios
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Gestiona los usuarios y sus permisos en el sistema
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Total de usuarios en el sistema: {totalUsuarios}
      </Typography>
    </div>
  );
};

export default HeaderUsers;