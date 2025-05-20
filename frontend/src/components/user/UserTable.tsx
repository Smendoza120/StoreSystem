import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { UserTableProps } from '../../interfaces/user';

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
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.username}
                            </TableCell>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.roles.join(', ')}</TableCell>
                            <TableCell>
                                <Chip label={user.isEnabled ? 'Activo' : 'Inactivo'} color={user.isEnabled ? 'success' : 'error'} size="small" />
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {Object.entries(user.permissions).flatMap(([module, permissions]) =>
                                        Object.entries(permissions)
                                            .filter(([, value]) => value === true)
                                            .map(() => module)
                                    ).map((permission, index) => (
                                        <Chip key={index} label={permission} size="small" />
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
