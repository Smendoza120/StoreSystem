import React, { useState } from 'react';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Tabs, Tab } from '@mui/material';

interface UserFormProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CreateUserForm: React.FC<UserFormProps> = () => {
  const [tabValue, setTabValue] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [permisos, setPermisos] = useState({
    verUsuarios: false,
    crearUsuarios: false,
    editarUsuarios: false,
    eliminarUsuarios: false,
    verInventario: false,
    crearProductos: false,
    editarInventario: false,
    eliminarProductos: false,
    verVentas: false,
    crearVentas: false,
    editarVentas: false,
    generarReportes: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nombre':
        setNombre(value);
        break;
      case 'apellido':
        setApellido(value);
        break;
      case 'nombreUsuario':
        setNombreUsuario(value);
        break;
      case 'correoElectronico':
        setCorreoElectronico(value);
        break;
      case 'nuevaContrasena':
        setNuevaContrasena(value);
        break;
      case 'confirmarNuevaContrasena':
        setConfirmarNuevaContrasena(value);
        break;
      case 'rol':
        setRol(value);
        break;
      case 'estado':
        setEstado(value as 'Activo' | 'Inactivo');
        break;
      default:
        break;
    }
  };

  const handlePermisoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermisos({ ...permisos, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    console.log('Datos del formulario:', {
      nombre,
      apellido,
      nombreUsuario,
      correoElectronico,
      nuevaContrasena,
      confirmarNuevaContrasena,
      rol,
      estado,
      permisos,
    });
    // También podrías navegar de vuelta a la lista de usuarios
  };

  const handleCancel = () => {
    // Lógica para cancelar la creación/edición y volver a la lista de usuarios
    console.log('Cancelar');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label="Información General" {...a11yProps(0)} />
        <Tab label="Permisos" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={0} index={0}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre"
          name="nombre"
          value={nombre}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Apellido"
          name="apellido"
          value={apellido}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nombre de Usuario"
          name="nombreUsuario"
          value={nombreUsuario}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Correo Electrónico"
          name="correoElectronico"
          value={correoElectronico}
          onChange={handleInputChange}
          required
          type="email"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nueva Contraseña"
          name="nuevaContrasena"
          value={nuevaContrasena}
          onChange={handleInputChange}
          helperText="Dejar en blanco para mantener la contraseña actual"
          type="password"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirmar Nueva Contraseña"
          name="confirmarNuevaContrasena"
          value={confirmarNuevaContrasena}
          onChange={handleInputChange}
          helperText="Dejar en blanco para mantener"
          type="password"
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            id="rol"
            name="rol"
            value={rol}
            onChange={handleInputChange}
          >
            <MenuItem value="Administrador">Administrador</MenuItem>
            <MenuItem value="Gerente">Gerente</MenuItem>
            <MenuItem value="Vendedor">Vendedor</MenuItem>
            <MenuItem value="Inventario">Inventario</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            id="estado"
            name="estado"
            value={estado}
            onChange={handleInputChange}
          >
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </TabPanel>
      <TabPanel value={1} index={1}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Módulo de Control de Usuarios</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={permisos.verUsuarios} onChange={handlePermisoChange} name="verUsuarios" />}
              label="Ver usuarios"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.crearUsuarios} onChange={handlePermisoChange} name="crearUsuarios" />}
              label="Crear usuarios"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.editarUsuarios} onChange={handlePermisoChange} name="editarUsuarios" />}
              label="Editar usuarios"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.eliminarUsuarios} onChange={handlePermisoChange} name="eliminarUsuarios" />}
              label="Eliminar usuarios"
            />
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" variant="standard" sx={{ mt: 2 }}>
          <FormLabel component="legend">Módulo de Inventario</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={permisos.verInventario} onChange={handlePermisoChange} name="verInventario" />}
              label="Ver inventario"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.crearProductos} onChange={handlePermisoChange} name="crearProductos" />}
              label="Crear productos"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.editarInventario} onChange={handlePermisoChange} name="editarInventario" />}
              label="Editar inventario"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.eliminarProductos} onChange={handlePermisoChange} name="eliminarProductos" />}
              label="Eliminar productos"
            />
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" variant="standard" sx={{ mt: 2 }}>
          <FormLabel component="legend">Módulo de Ventas Diarias</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={permisos.verVentas} onChange={handlePermisoChange} name="verVentas" />}
              label="Ver ventas"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.crearVentas} onChange={handlePermisoChange} name="crearVentas" />}
              label="Crear ventas"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.editarVentas} onChange={handlePermisoChange} name="editarVentas" />}
              label="Editar ventas"
            />
            <FormControlLabel
              control={<Checkbox checked={permisos.generarReportes} onChange={handlePermisoChange} name="generarReportes" />}
              label="Generar reportes"
            />
          </FormGroup>
        </FormControl>
      </TabPanel>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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