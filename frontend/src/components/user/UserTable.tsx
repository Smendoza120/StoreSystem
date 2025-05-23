import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  IconButton,
  Popover,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { UserTableProps } from "../../interfaces/user";
import { disableUser } from "../../services/userService";

interface ApiError {
  message: string;
  statusCode?: number;
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    userId: string | undefined
  ) => {
    if (userId) {
      setAnchorEl(event.currentTarget);
      setSelectedUserId(userId);
    } else {
      console.warn("Intento de abrir menú para un usuario sin ID.");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDisableUser = async () => {
    if (!selectedUserId) {
      setSnackbarSeverity("error");
      setSnackbarMessage("No hay usuario seleccionado para deshabilitar.");
      setSnackbarOpen(true);
      return;
    }

    try {
      await disableUser(selectedUserId);
      setSnackbarSeverity("success");
      setSnackbarMessage(
        `Usuario con ID ${selectedUserId} deshabilitado exitosamente.`
      );
      setSnackbarOpen(true);
    } catch (error: unknown) {
      setSnackbarSeverity("error");
      let errorMessage = "Error desconocido al deshabilitar usuario.";

      if (error instanceof Error) {
        errorMessage = `Error al deshabilitar usuario: ${error.message}`;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        errorMessage = `Error al deshabilitar usuario: ${
          (error as ApiError).message
        }`;
      }

      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      handleMenuClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-actions-popover" : undefined;
  const currentUser = users.find((user) => user.id === selectedUserId);

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
              <TableCell>{user.roles.join(", ")}</TableCell>
              <TableCell>
                <Chip
                  label={user.isEnabled ? "Activo" : "Inactivo"}
                  color={user.isEnabled ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {Object.entries(user.permissions)
                    .filter(([, modulePermissions]) =>
                      Object.values(modulePermissions).some(
                        (permission) => permission === true
                      )
                    )
                    .map(([moduleName]) => (
                      <Chip
                        key={moduleName}
                        label={moduleName.replace(/_/g, " ")}
                        size="small"
                      />
                    ))}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="acciones"
                  aria-controls={id}
                  aria-haspopup="true"
                  onClick={(event) => handleMenuClick(event, user.id)}
                  disabled={!user.isEnabled}
                >
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {currentUser && (
                    <MenuItem
                      onClick={handleDisableUser}
                      disabled={!currentUser.isEnabled}
                    >
                      <Typography
                        color={
                          currentUser.isEnabled ? "error" : "text.disabled"
                        }
                      >
                        {currentUser.isEnabled
                          ? "Deshabilitar Usuario"
                          : "Usuario Inactivo"}
                      </Typography>
                    </MenuItem>
                  )}
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default UserTable;
