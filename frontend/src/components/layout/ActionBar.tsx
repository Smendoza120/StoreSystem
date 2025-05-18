import React from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

const ActionBar: React.FC = () => {
  return(
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <TextField 
        label="Buscar..."
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: <SearchIcon />
        }}
        style={{ marginRight: '16px' }}
      />

      <FormControl size="small" style={{marginRight: '16px'}}>
        <InputLabel id="category-label">Todas las categorías</InputLabel>
        <Select labelId="category-label" id="category-select" value="">
          <MenuItem value="">Todas las categorías</MenuItem>
          {/* Aquí irían las opciones de categorías */}
        </Select>
      </FormControl>

      <FormControl size="small" style={{ marginRight: '16px' }}>
        <InputLabel id="status-label">Todos los estados</InputLabel>
        <Select labelId="status-label" id="status-select" value="">
          <MenuItem value="">Todos los estados</MenuItem>
          {/* Aquí irían las opciones de estados */}
        </Select>
      </FormControl>
      
      <IconButton aria-label="descargar" style={{ marginRight: '16px' }}>
        <DownloadIcon />
      </IconButton>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Nuevo Producto
      </Button>
    </div>
  )
}

export default ActionBar;