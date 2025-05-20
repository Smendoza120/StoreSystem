import React, { useState, useEffect, useCallback } from "react";
import HeaderUsers from "../components/layout/HeaderUsers";
import UserTable from "../components/user/UserTable";
import Pagination from "../components/common/Pagination";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
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
import type { UserDataTable } from "../interfaces/user";
import { getAllUsers } from "../services/userService";

const transformUserDataToUserTable = (data: any): UserDataTable => {
  return {
    id:
      data.id ||
      data._id ||
      "temp-id-" + Math.random().toString(36).substr(2, 9),
    fullName: data.fullName || "",
    username: data.username || "",
    email: data.email || "",
    password: data.password || "",
    roles: data.roles || [],
    isEnabled: data.isEnabled ?? true,
    permissions: data.permissions || {
      control_usuarios: { read: false, write: false, delete: false },
      inventario: { read: false, write: false, delete: false },
      ventas_diarias: { read: false, write: false, delete: false },
      // Se elimina el módulo de reportes
    },
  };
};

const UserPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [usersData, setUsersData] = useState<UserDataTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalUsers = usersData.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const usersFromApi = await getAllUsers();
      const transformedUsers = usersFromApi.map(transformUserDataToUserTable);
      setUsersData(transformedUsers);
    } catch (err: any) {
      setError(err.message || "Error al cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleNuevoUsuarioClick = () => {
    setIsCreatingUser(true);
  };

  const handleUserActionComplete = () => {
    setIsCreatingUser(false);
    fetchUsers();
  };

  const handleCreacionCancelada = () => {
    setIsCreatingUser(false);
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = usersData.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          p: 3,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          p: 3,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
            <UserTable
              users={currentUsers}
              onUserStatusChange={handleUserActionComplete}
            />
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
            onUserCreated={handleUserActionComplete}
            onCancel={handleCreacionCancelada}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserPage;
