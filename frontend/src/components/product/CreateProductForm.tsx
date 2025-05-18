import React, { useState } from "react";
import {
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface CreateProductFormProps {
  onClose: () => void;
  onCreate: (newProduct: any) => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [storageLocation, setStorageLocation] = useState<
    "in stock" | "in warehouse"
  >("in stock");

  const handleCreate = () => {
    const newProduct = {
      name,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
      storageLocation,
    };
    onCreate(newProduct);
    onClose();
  };

  const handleChangeStorage = (event: any) => {
    setStorageLocation(event.target.value);
  };

  return (
    <>
      <DialogTitle>Nuevo Producto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre del Producto"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          margin="dense"
          id="unitPrice"
          label="Precio Unitario"
          type="number"
          fullWidth
          value={unitPrice}
          onChange={(e) =>
            setUnitPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <TextField
          margin="dense"
          id="quantity"
          label="Cantidad Inicial"
          type="number"
          fullWidth
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="storage-location-label">
            Ubicación de Almacenamiento
          </InputLabel>
          <Select
            labelId="storage-location-label"
            id="storage-location"
            value={storageLocation}
            label="Ubicación de Almacenamiento"
            onChange={handleChangeStorage}
          >
            <MenuItem value="in stock">En Tienda</MenuItem>
            <MenuItem value="in warehouse">En Almacén</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleCreate} color="primary">
          Crear
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateProductForm;
