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
} from "@mui/material";
import { createUser } from "../../services/userService";
import type { TabPanelProps, UserData, UserFormProps } from "../../interfaces/user";

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
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("");
    const [rol, setRol] = useState("");
    const [permisos, setPermisos] = useState({
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
    const [nombreUsuarioError, setNombreUsuarioError] = useState("");
    const [correoElectronicoError, setCorreoElectronicoError] = useState("");
    const [nuevaContrasenaError, setConfirmarNuevaContrasenaError] = useState("");
    const [rolError, setRolError] = useState("");

    // Estado para mensajes de respuesta de la API
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        switch (name) {
            case "fullName":
                setNombreUsuario(value);
                setNombreUsuarioError("");
                break;
            case "email":
                setCorreoElectronico(value);
                setCorreoElectronicoError("");
                break;
            case "password":
                setNuevaContrasena(value);
                setNuevaContrasenaError("");
                if (confirmarNuevaContrasena) {
                    setConfirmarNuevaContrasenaError("");
                }
                break;
            case "confirmarNuevaContrasena":
                setConfirmarNuevaContrasena(value);
                setConfirmarNuevaContrasenaError("");
                break;
            case "roles":
                setRol(value);
                setRolError("");
                break;
            default:
                break;
        }
    };

    const handlePermisoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPermisos({ ...permisos, [event.target.name]: event.target.checked });
    };

    const validateForm = () => {
        let isValid = true;

        if (!nombreUsuario.trim()) {
            setNombreUsuarioError("El nombre de usuario es requerido");
            isValid = false;
        }
        if (!correoElectronico.trim()) {
            setCorreoElectronicoError("El correo electrónico es requerido");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
            setCorreoElectronicoError("El correo electrónico no es válido");
            isValid = false;
        }
        if (!nuevaContrasena.trim()) {
            setNuevaContrasenaError("La contraseña es requerida");
            isValid = false;
        } else if (nuevaContrasena !== confirmarNuevaContrasena) {
            setConfirmarNuevaContrasenaError("Las contraseñas no coinciden");
            isValid = false;
        }
        if (!rol) {
            setRolError("El rol es requerido");
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
                fullName: nombreUsuario,
                email: correoElectronico,
                password: nuevaContrasena,
                roles: [rol.toLowerCase()],
                permissions: {
                    control_usuarios: {
                        read: permisos.verUsuarios,
                        write: permisos.editarUsuarios,
                        delete: permisos.eliminarUsuarios,
                    },
                    inventario: {
                        read: permisos.verInventario,
                        write: permisos.editarInventario,
                        delete: permisos.eliminarProductos,
                    },
                    ventas_diarias: {
                        read: permisos.verVentas,
                        write: permisos.editarVentas,
                        delete: false,
                    },
                    reportes: {
                        read: permisos.generarReportes,
                        write: false,
                        delete: false,
                    },
                },
            };

            try {
                const newUser = await createUser(userData);
                console.log("Usuario creado:", newUser);
                setSuccessMessage(`Usuario "${newUser.username}" creado exitosamente.`);
                setNombreUsuario("");
                setCorreoElectronico("");
                setNuevaContrasena("");
                setConfirmarNuevaContrasena("");
                setRol("");
                setPermisos({
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
                setTabValue(0);
                onUserCreated();
            } catch (error: any) {
                console.error("Error al crear usuario:", error);
                setErrorMessage(`Error al crear usuario: ${error.message || "Ocurrió un error inesperado."}`);
            }
        }
    };

    const handleCancel = () => {
        console.log("Cancelar");
        onCancel();
    };

    useEffect(() => {
        // Pre-seleccionar permisos según el rol
        switch (rol) {
            case "admin":
            case "developer":
                setPermisos({
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
                setPermisos({
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
                setPermisos({
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
    }, [rol]);

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
                aria-label="basic tabs example"
            >
                <Tab label="Información General" {...a11yProps(0)} />
                <Tab label="Permisos" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nombre de Usuario"
                    name="fullName"
                    value={nombreUsuario}
                    onChange={handleInputChange}
                    required
                    error={!!nombreUsuarioError}
                    helperText={nombreUsuarioError}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Correo Electrónico"
                    name="email"
                    value={correoElectronico}
                    onChange={handleInputChange}
                    required
                    type="email"
                    error={!!correoElectronicoError}
                    helperText={correoElectronicoError}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Nueva Contraseña"
                    name="password"
                    value={nuevaContrasena}
                    onChange={handleInputChange}
                    required
                    type="password"
                    error={!!nuevaContrasenaError}
                    helperText={nuevaContrasenaError}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirmar Nueva Contraseña"
                    name="confirmarNuevaContrasena"
                    value={confirmarNuevaContrasena}
                    onChange={handleInputChange}
                    required
                    type="password"
                    helperText={nuevaContrasenaError}
                />
                <FormControl fullWidth margin="normal" required error={!!rolError}>
                    <InputLabel id="rol-label">Rol</InputLabel>
                    <Select
                        labelId="rol-label"
                        id="rol"
                        name="roles"
                        value={rol}
                        onChange={handleInputChange}
                        label="Rol"
                    >
                        <MenuItem value="employee">Empleado</MenuItem>
                        <MenuItem value="admin">Administrador</MenuItem>
                        <MenuItem value="developer">Desarrollador</MenuItem>
                    </Select>
                    {rolError && <FormHelperText>{rolError}</FormHelperText>}
                </FormControl>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <div className="flex flex-row items-center justify-center gap-20">
                    <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
                        <FormLabel component="legend">
                            Módulo de Control de Usuarios
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.verUsuarios}
                                        onChange={handlePermisoChange}
                                        name="verUsuarios"
                                    />
                                }
                                label="Ver usuarios"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.editarUsuarios}
                                        onChange={handlePermisoChange}
                                        name="editarUsuarios"
                                    />
                                }
                                label="Editar usuarios"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.eliminarUsuarios}
                                        onChange={handlePermisoChange}
                                        name="eliminarUsuarios"
                                    />
                                }
                                label="Eliminar usuarios"
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
                        <FormLabel component="legend">Módulo de Inventario</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.verInventario}
                                        onChange={handlePermisoChange}
                                        name="verInventario"
                                    />
                                }
                                label="Ver inventario"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.editarInventario}
                                        onChange={handlePermisoChange}
                                        name="editarInventario"
                                    />
                                }
                                label="Editar inventario"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.eliminarProductos}
                                        onChange={handlePermisoChange}
                                        name="eliminarProductos"
                                    />
                                }
                                label="Eliminar productos"
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset" variant="standard" sx={{ mb: 2 }}>
                        <FormLabel component="legend">Módulo de Ventas Diarias</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.verVentas}
                                        onChange={handlePermisoChange}
                                        name="verVentas"
                                    />
                                }
                                label="Ver ventas diarias"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.editarVentas}
                                        onChange={handlePermisoChange}
                                        name="editarVentas"
                                    />
                                }
                                label="Editar ventas diarias"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={permisos.generarReportes}
                                        onChange={handlePermisoChange}
                                        name="generarReportes"
                                    />
                                }
                                label="Generar reportes"
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