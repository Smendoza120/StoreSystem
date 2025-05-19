import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface User {
  Usuario: string;
  NombreCompleto: string;
  Correo: string;
  Rol: string;
  Estado: 'Activo' | 'Inactivo';
  Permisos: string[];
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Permisos</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.Usuario}>
              <TableCell component="th" scope="row">
                {user.Usuario}
              </TableCell>
              <TableCell>{user.NombreCompleto}</TableCell>
              <TableCell>{user.Correo}</TableCell>
              <TableCell>{user.Rol}</TableCell>
              <TableCell>
                <Chip label={user.Estado} color={user.Estado === 'Activo' ? 'success' : 'error'} size="small" />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {user.Permisos.map((permiso) => (
                    <Chip key={permiso} label={permiso} size="small" />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton aria-label="acciones">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;