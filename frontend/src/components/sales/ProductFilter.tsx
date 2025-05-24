import React from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import type { Product } from "../../interfaces/inventory";

interface ProductFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredProducts: Product[];
  onProductSelect: (product: Product | null) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  searchTerm,
  onSearchChange,
  filteredProducts,
  onProductSelect,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Autocomplete
        fullWidth
        options={filteredProducts}
        getOptionLabel={(option) =>
          `${option.name} ($${option.unitPrice?.toFixed(2)} - Stock: ${
            option.quantity
          })`
        }
        onChange={(_event, newValue) => onProductSelect(newValue)}
        inputValue={searchTerm}
        onInputChange={(_event, newInputValue) => {
          onSearchChange(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Producto"
            variant="outlined"
            placeholder="Escribe el nombre del producto..."
          />
        )}
        getOptionKey={(option) => option.id}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </Box>
  );
};

export default ProductFilter;
