import React, { useState, useEffect } from "react";
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
import type { Product } from "../../interfaces/inventory";

interface EditProductFormProps {
  onClose: () => void;
  onUpdate: (updatedProduct: Product) => void;
  initialValues: Product;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  onClose,
  onUpdate,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues.name);
  const [unitPrice, setUnitPrice] = useState<number | "">(
    initialValues.unitPrice
  );
  const [quantity, setQuantity] = useState<number | "">(initialValues.quantity);
  const [storageLocation, setStorageLocation] = useState<
    "in stock" | "in warehouse"
  >(initialValues.storageLocation as "in stock" | "in warehouse");
  const [stockStatus, setStockStatus] = useState<Product["stockStatus"]>(
    initialValues.stockStatus
  );

  const handleEdit = () => {
    const updatedProduct = {
      id: initialValues.id,
      name,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
      storageLocation,
      stockStatus,
    };
    onUpdate(updatedProduct);
    onClose();
  };

  const handleChangeStorage = (event: any) => {
    setStorageLocation(event.target.value as "in stock" | "in warehouse");
  };

  const handleChangeStockStatus = (event: any) => {
    setStockStatus(event.target.value as Product["stockStatus"]);
  };

  return (
    <>
      <DialogTitle>Editar Producto</DialogTitle>
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
          label="Cantidad"
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
        <FormControl fullWidth margin="dense">
          <InputLabel id="stock-status-label">Estado del Stock</InputLabel>
          <Select
            labelId="stock-status-label"
            id="stock-status"
            value={stockStatus}
            label="Estado del Stock"
            onChange={handleChangeStockStatus}
          >
            <MenuItem value="good">Bueno</MenuItem>
            <MenuItem value="low">Bajo</MenuItem>
            <MenuItem value="out of stock">Agotado</MenuItem>
            <MenuItem value="bien">Bien</MenuItem>
            <MenuItem value="bajo">Bajo</MenuItem>
            <MenuItem value="agotado">Agotado</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleEdit} color="primary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </>
  );
};

export default EditProductForm;
