import React, { useState, useEffect, useCallback } from "react";
import HeaderUsers from "../components/layout/HeaderUsers";
import UserTable from "../components/user/UserTable";
import Pagination from "../components/common/Pagination";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import CreateUserForm from "../components/user/CreateUserForm";
import type { UserDataTable } from "../interfaces/user";
import { getAllUsers } from "../services/userService";
import type { ApiResponse } from "../utils/apiClient";

const transformUserDataToUserTable = (data: {
  id?: string;
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  password?: string; 
  roles?: string[];
  isEnabled?: boolean;
  permissions?: {
    control_usuarios?: { read?: boolean; write?: boolean; delete?: boolean };
    inventario?: { read?: boolean; write?: boolean; delete?: boolean };
    ventas_diarias?: { read?: boolean; write?: boolean; delete?: boolean };
    reportes?: { read?: boolean; write?: boolean; delete?: boolean };
  };
}): UserDataTable => {
  return {
    id:
      data.id ||
      data._id ||
      "temp-id-" + Math.random().toString(36).substring(2, 9),
    fullName: data.fullName || "",
    username: data.username || "",
    email: data.email || "",
    roles: data.roles || [],
    isEnabled: data.isEnabled ?? true, 
    permissions: {
      control_usuarios: {
        read: data.permissions?.control_usuarios?.read || false,
        write: data.permissions?.control_usuarios?.write || false,
        delete: data.permissions?.control_usuarios?.delete || false,
      },
      inventario: {
        read: data.permissions?.inventario?.read || false,
        write: data.permissions?.inventario?.write || false,
        delete: data.permissions?.inventario?.delete || false,
      },
      ventas_diarias: {
        read: data.permissions?.ventas_diarias?.read || false,
        write: data.permissions?.ventas_diarias?.write || false,
        delete: data.permissions?.ventas_diarias?.delete || false,
      },
      reportes: {
        read: data.permissions?.reportes?.read || false,
        write: data.permissions?.reportes?.write || false,
        delete: data.permissions?.reportes?.delete || false,
      },
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
      const apiResponse: ApiResponse<UserDataTable[]> = await getAllUsers();

      if (apiResponse.success) {
        if (Array.isArray(apiResponse.data)) {
          const transformedUsers: UserDataTable[] = apiResponse.data.map(
            (userItem) => transformUserDataToUserTable(userItem)
          );
          setUsersData(transformedUsers);
        } else {
          setError(
            "La respuesta de la API no contiene un array de usuarios en la propiedad 'data'."
          );
          setUsersData([]);
        }
      } else {
        setError(apiResponse.message || "Error al cargar los usuarios.");
        setUsersData([]); 
      }
    } catch (err: unknown) {
      console.error("Error al cargar los usuarios:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido al cargar los usuarios.");
      }
      setUsersData([]); 
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
            <div className="pt-4">
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
                  <FormControl
                    size="small"
                    sx={{ mr: 2 }}
                    className="w-[150px]"
                  >
                    <InputLabel id="roles-label">Todos los roles</InputLabel>
                    <Select labelId="roles-label" id="roles-select" value="">
                      <MenuItem value="">Todos los roles</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    size="small"
                    sx={{ mr: 2 }}
                    className="w-[180px]"
                  >
                    <InputLabel id="estados-label">
                      Todos los estados
                    </InputLabel>
                    <Select
                      labelId="estados-label"
                      id="estados-select"
                      value=""
                    >
                      <MenuItem value="">Todos los estados</MenuItem>
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
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
            </div>
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
