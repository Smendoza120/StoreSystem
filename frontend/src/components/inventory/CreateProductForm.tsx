import React, { useEffect, useState } from "react";
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
  type SelectChangeEvent,
} from "@mui/material";
import type { Product } from "../../interfaces/inventory";

interface CreateProductFormProps {
  onClose: () => void;
  onCreate: (newProduct: Omit<Product, "id"> | Product) => void;
  initialValues?: Product | null;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  onClose,
  onCreate,
  initialValues,
}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [unitPrice, setUnitPrice] = useState<number | "">(
    initialValues?.unitPrice || ""
  );
  const [quantity, setQuantity] = useState<number | "">(
    initialValues?.quantity || ""
  );

  const getSafeStorageLocation = (
    value: string | undefined
  ): "in stock" | "in warehouse" => {
    if (value === "in stock" || value === "in warehouse") {
      return value;
    }
    return "in stock"; // Valor por defecto si no coincide
  };

  const [storageLocation, setStorageLocation] = useState<
    "in stock" | "in warehouse"
  >(getSafeStorageLocation(initialValues?.storageLocation));
  const [stockStatus, setStockStatus] = useState<Product["stockStatus"]>(
    initialValues?.stockStatus || "good"
  );

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setUnitPrice(initialValues.unitPrice || "");
      setQuantity(initialValues.quantity || "");
      setStorageLocation(getSafeStorageLocation(initialValues.storageLocation));
      setStockStatus(initialValues.stockStatus || "good");
    } else {
      setName("");
      setUnitPrice("");
      setQuantity("");
      setStorageLocation("in stock");
      setStockStatus("good");
    }
  }, [initialValues]);

  const handleCreate = () => {
    const newProduct = {
      name,
      unitPrice: Number(unitPrice),
      quantity: Number(quantity),
      storageLocation,
      stockStatus,
      ...(initialValues?.id && { id: initialValues.id }),
    };
    onCreate(newProduct);
    onClose();
  };

  const handleChangeStorage = (
    event: SelectChangeEvent<"in stock" | "in warehouse">
  ) => {
    setStorageLocation(event.target.value as "in stock" | "in warehouse");
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
