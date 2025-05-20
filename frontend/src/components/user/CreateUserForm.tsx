import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  FormHelperText,
  Alert,
  Typography,
} from "@mui/material";
import { createUser } from "../../services/userService";
import type {
  TabPanelProps,
  UserData,
  UserFormProps,
} from "../../interfaces/user";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CreateUserForm: React.FC<UserFormProps> = ({
  onUserCreated,
  onCancel,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [fullName, setFullName] = useState(""); // Cambiado de nombreUsuario a fullName
  const [email, setEmail] = useState(""); // Cambiado de correoElectronico a email
  const [password, setPassword] = useState(""); // Cambiado de nuevaContrasena a password
  const [confirmPassword, setConfirmPassword] = useState(""); // Cambiado de confirmarNuevaContrasena a confirmPassword
  const [role, setRole] = useState(""); // Cambiado de rol a role
  const [permissions, setPermissions] = useState({
    // Nombres de los estados de permisos se mantienen consistentes con el formulario
    verUsuarios: false,
    editarUsuarios: false,
    eliminarUsuarios: false,
    verInventario: false,
    editarInventario: false,
    eliminarProductos: false,
    verVentas: false,
    editarVentas: false,
    generarReportes: false,
  });

  // Estados para los errores de validación
  const [fullNameError, setFullNameError] = useState(""); // Error para fullName
  const [emailError, setEmailError] = useState(""); // Error para email
  const [passwordError, setPasswordError] = useState(""); // Error para password
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error para confirmPassword
  const [roleError, setRoleError] = useState(""); // Error para role

  // Estado para mensajes de respuesta de la API
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Limpiar mensajes de éxito y error al cambiar de tab
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [tabValue]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // Limpiar mensajes de éxito y error al escribir
    setSuccessMessage("");
    setErrorMessage("");

    switch (name) {
      case "fullName":
        setFullName(value);
        setFullNameError("");
        break;
      case "email":
        setEmail(value);
        setEmailError("");
        break;
      case "password":
        setPassword(value);
        setPasswordError("");
        // También limpiar error de confirmación si se cambia la contraseña
        if (confirmPassword) {
          setConfirmPasswordError("");
        }
        break;
      case "confirmPassword": // Cambiado el nombre del estado
        setConfirmPassword(value);
        setConfirmPasswordError("");
        break;
      case "roles": // Cambiado el nombre del estado
        setRole(value);
        setRoleError("");
        break;
      default:
        break;
    }
  };

  const handlePermisoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Reiniciar todos los errores
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRoleError("");

    if (!fullName.trim()) {
      setFullNameError("El nombre completo es requerido");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("El correo electrónico es requerido");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("El correo electrónico no es válido");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("La contraseña es requerida");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      isValid = false;
    }
    if (!role) {
      setRoleError("El rol es requerido");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setSuccessMessage("");
      setErrorMessage("");

      const userData: UserData = {
        fullName: fullName,
        email: email,
        password: password,
        roles: [role.toLowerCase()], // Usa el estado 'role'
        permissions: {
          control_usuarios: {
            read: permissions.verUsuarios,
            write: permissions.editarUsuarios,
            delete: permissions.eliminarUsuarios,
          },
          inventario: {
            read: permissions.verInventario,
            write: permissions.editarInventario,
            delete: permissions.eliminarProductos,
          },
          ventas_diarias: {
            read: permissions.verVentas,
            write: permissions.editarVentas,
            delete: false, // Asegúrate de que esto sea correcto según tu backend
          },
          reportes: {
            read: permissions.generarReportes,
            write: false, // Asegúrate de que esto sea correcto según tu backend
            delete: false, // Asegúrate de que esto sea correcto según tu backend
          },
        },
      };

      try {
        const newUser = await createUser(userData);
        console.log("Usuario creado:", newUser);
        setSuccessMessage(
          `Usuario "${
            newUser.username || newUser.fullName
          }" creado exitosamente.`
        );
        // Limpiar formulario
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        setPermissions({
          verUsuarios: false,
          editarUsuarios: false,
          eliminarUsuarios: false,
          verInventario: false,
          editarInventario: false,
          eliminarProductos: false,
          verVentas: false,
          editarVentas: false,
          generarReportes: false,
        });
        setTabValue(0); // Volver a la primera pestaña
        onUserCreated(); // ¡Llamar a la función de callback para actualizar la tabla!
      } catch (error: any) {
        console.error("Error al crear usuario:", error);
        setErrorMessage(
          `Error al crear usuario: ${
            error.message || "Ocurrió un error inesperado."
          }`
        );
      }
    }
  };

  const handleCancel = () => {
    // Limpiar campos y errores al cancelar
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
    setPermissions({
      verUsuarios: false,
      editarUsuarios: false,
      eliminarUsuarios: false,
      verInventario: false,
      editarInventario: false,
      eliminarProductos: false,
      verVentas: false,
      editarVentas: false,
      generarReportes: false,
    });
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRoleError("");
    setSuccessMessage("");
    setErrorMessage("");
    setTabValue(0);
    onCancel();
  };

  useEffect(() => {
    // Pre-seleccionar permisos según el rol
    switch (
      role // Usar el estado 'role'
    ) {
      case "admin":
      case "developer":
        setPermissions({
          verUsuarios: true,
          editarUsuarios: true,
          eliminarUsuarios: true,
          verInventario: true,
          editarInventario: true,
          eliminarProductos: true,
          verVentas: true,
          editarVentas: true,
          generarReportes: true,
        });
        break;
      case "employee":
        setPermissions({
          verUsuarios: false,
          editarUsuarios: false,
          eliminarUsuarios: false,
          verInventario: false,
          editarInventario: false,
          eliminarProductos: false,
          verVentas: true,
          editarVentas: true,
          generarReportes: false,
        });
        break;
      default:
        setPermissions({
          verUsuarios: false,
          editarUsuarios: false,
          eliminarUsuarios: false,
          verInventario: false,
          editarInventario: false,
          eliminarProductos: false,
          verVentas: false,
          editarVentas: false,
          generarReportes: false,
        });
        break;
    }
  }, [role]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="tabs de creación de usuario"
      >
        <Tab label="Información General" {...a11yProps(0)} />
        <Tab label="Permisos" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre Completo" // Cambiado a "Nombre Completo"
          name="fullName"
          value={fullName} // Usa el estado 'fullName'
          onChange={handleInputChange}
          required
          error={!!fullNameError}
          helperText={fullNameError}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Correo Electrónico"
          name="email"
          value={email} // Usa el estado 'email'
          onChange={handleInputChange}
          required
          type="email"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nueva Contraseña"
          name="password"
          value={password} // Usa el estado 'password'
          onChange={handleInputChange}
          required
          type="password"
          error={!!passwordError}
          helperText={passwordError} // Muestra el error de password aquí
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirmar Nueva Contraseña"
          name="confirmPassword" // Cambiado el name
          value={confirmPassword} // Usa el estado 'confirmPassword'
          onChange={handleInputChange}
          required
          type="password"
          error={
            !!confirmPasswordError ||
            (passwordError && password !== confirmPassword)
          } // Combinar errores
          helperText={
            confirmPasswordError ||
            (passwordError && password !== confirmPassword
              ? "Las contraseñas no coinciden"
              : "")
          }
        />
        <FormControl fullWidth margin="normal" required error={!!roleError}>
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            id="rol"
            name="roles" // El name debe coincidir con el campo de la API, que es 'roles'
            value={role} // Usa el estado 'role'
            onChange={handleInputChange}
            label="Rol"
          >
            <MenuItem value="employee">Empleado</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="developer">Desarrollador</MenuItem>
          </Select>
          {roleError && <FormHelperText>{roleError}</FormHelperText>}
        </FormControl>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <div className="flex flex-row items-center justify-center gap-20">
          <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
            <FormLabel component="legend">
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Módulo de Control de Usuarios
              </Typography>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.verUsuarios}
                    onChange={handlePermisoChange}
                    name="verUsuarios"
                  />
                }
                label="Ver usuarios"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.editarUsuarios}
                    onChange={handlePermisoChange}
                    name="editarUsuarios"
                  />
                }
                label="Editar usuarios"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.eliminarUsuarios}
                    onChange={handlePermisoChange}
                    name="eliminarUsuarios"
                  />
                }
                label="Eliminar usuarios"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
            <FormLabel component="legend">
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Módulo de Inventario
              </Typography>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.verInventario}
                    onChange={handlePermisoChange}
                    name="verInventario"
                  />
                }
                label="Ver inventario"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.editarInventario}
                    onChange={handlePermisoChange}
                    name="editarInventario"
                  />
                }
                label="Editar inventario"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.eliminarProductos}
                    onChange={handlePermisoChange}
                    name="eliminarProductos"
                  />
                }
                label="Eliminar productos"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
            <FormLabel component="legend">
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Módulo de Ventas Diarias
              </Typography>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.verVentas}
                    onChange={handlePermisoChange}
                    name="verVentas"
                  />
                }
                label="Ver ventas diarias"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permissions.editarVentas}
                    onChange={handlePermisoChange}
                    name="editarVentas"
                  />
                }
                label="Editar ventas diarias"
              />
            </FormGroup>
          </FormControl>
        </div>
      </TabPanel>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={handleCancel} sx={{ mr: 2 }}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUserForm;
