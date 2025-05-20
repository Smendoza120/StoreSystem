import React, { useState } from "react";
import HeaderUsers from "../components/layout/HeaderUsers";
import UserTable from "../components/user/UserTable";
import Pagination from "../components/common/Pagination";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Button,
} from "@mui/material";
import CreateUserForm from "../components/user/CreateUserForm";

// Datos de ejemplo de usuarios (reemplazar con tu lógica de obtención de datos)
const sampleUsers = [
  {
    Usuario: "admin",
    NombreCompleto: "Juan Pérez",
    Correo: "juan.perez@empresa.com",
    Rol: "Administrador",
    Estado: "Activo",
    Permisos: ["Usuarios", "Inventario", "Ventas"],
  },
  {
    Usuario: "mrodriguez",
    NombreCompleto: "María Rodríguez",
    Correo: "maria.rodriguez@empresa.com",
    Rol: "Gerente",
    Estado: "Activo",
    Permisos: ["Usuarios", "Inventario", "Ventas"],
  },
  {
    Usuario: "cgomez",
    NombreCompleto: "Carlos Gómez",
    Correo: "carlos.gomez@empresa.com",
    Rol: "Vendedor",
    Estado: "Activo",
    Permisos: ["Inventario", "Ventas"],
  },
  {
    Usuario: "lmartinez",
    NombreCompleto: "Laura Martínez",
    Correo: "laura.martinez@empresa.com",
    Rol: "Inventario",
    Estado: "Activo",
    Permisos: ["Inventario", "Ventas"],
  },
  {
    Usuario: "rlopez",
    NombreCompleto: "Roberto López",
    Correo: "roberto.lopez@empresa.com",
    Rol: "Vendedor",
    Estado: "Inactivo",
    Permisos: ["Inventario", "Ventas"],
  },
  {
    Usuario: "asoto",
    NombreCompleto: "Ana Soto",
    Correo: "ana.soto@empresa.com",
    Rol: "Cliente",
    Estado: "Activo",
    Permisos: [],
  },
  {
    Usuario: "jramirez",
    NombreCompleto: "Javier Ramírez",
    Correo: "javier.ramirez@empresa.com",
    Rol: "Vendedor",
    Estado: "Activo",
    Permisos: ["Ventas"],
  },
  {
    Usuario: "mfernandez",
    NombreCompleto: "Marta Fernández",
    Correo: "marta.fernandez@empresa.com",
    Rol: "Administrador",
    Estado: "Activo",
    Permisos: ["Usuarios", "Inventario", "Ventas"],
  },
];

interface User {
  Usuario: string;
  NombreCompleto: string;
  Correo: string;
  Rol: string;
  Estado: "Activo" | "Inactivo";
  Permisos: string[];
}

const UserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const totalUsers = sampleUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleNuevoUsuarioClick = () => {
    setIsCreatingUser(true);
  };

  const handleUsuarioCreado = () => {
    setIsCreatingUser(false);
  };

  const handleCreacionCancelada = () => {
    setIsCreatingUser(false);
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = sampleUsers.slice(startIndex, endIndex);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HeaderUsers totalUsuarios={totalUsers} />
        {!isCreatingUser ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <TextField
                label="Buscar usuarios..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
              />
              <Box>
                <FormControl size="small" sx={{ mr: 2 }}>
                  <InputLabel id="roles-label">Todos los roles</InputLabel>
                  <Select labelId="roles-label" id="roles-select" value="">
                    <MenuItem value="">Todos los roles</MenuItem>
                    {/* Aquí irían las opciones de roles */}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ mr: 2 }}>
                  <InputLabel id="estados-label">Todos los estados</InputLabel>
                  <Select labelId="estados-label" id="estados-select" value="">
                    <MenuItem value="">Todos los estados</MenuItem>
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
                <IconButton aria-label="descargar" sx={{ mr: 2 }}>
                  <DownloadIcon />
                </IconButton>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleNuevoUsuarioClick}
                >
                  Nuevo Usuario
                </Button>
              </Box>
            </Box>
            <UserTable users={currentUsers} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">
                Mostrando {startIndex + 1}-{Math.min(endIndex, totalUsers)} de{" "}
                {totalUsers} usuarios
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            </Box>
          </>
        ) : (
          <CreateUserForm
            onUserCreated={handleUsuarioCreado}
            onCancel={handleCreacionCancelada}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserPage;
