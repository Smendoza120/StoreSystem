import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import type { InventoryProduct } from "../../interfaces/sales";

interface ProductFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredProducts: InventoryProduct[];
  onProductSelect: (product: InventoryProduct | null) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  searchTerm,
  onSearchChange,
  filteredProducts,
  onProductSelect,
}) => {
  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Autocomplete
        options={filteredProducts}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event, newValue) => {
          onProductSelect(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          onSearchChange(newInputValue);
        }}
        inputValue={searchTerm}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Buscar producto..."
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        noOptionsText="No se encontraron productos o no hay stock."
      />
    </Box>
  );
};

export default ProductFilter;
