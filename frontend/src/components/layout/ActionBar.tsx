import React from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';

interface ActionBarProps {
  onOpenCreateDialog: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onOpenCreateDialog }) => {
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

      <FormControl size="small" style={{marginRight: '16px'}} className="w-[190px]">
        <InputLabel id="category-label">Todas las categorías</InputLabel>
        <Select labelId="category-label" id="category-select" value="">
          <MenuItem value="">Todas las categorías</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" style={{ marginRight: '16px' }} className="w-[180px]">
        <InputLabel id="status-label">Todos los estados</InputLabel>
        <Select labelId="status-label" id="status-select" value="">
          <MenuItem value="">Todos los estados</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onOpenCreateDialog}>
        Nuevo Producto
      </Button>
    </div>
  )
}

export default ActionBar;