import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { Product } from "../../interfaces/inventory";

interface ProductTableProps {
  products: Product[];
  onOpenEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onOpenEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    handleClose();
    if (selectedProduct) {
      onOpenEdit(selectedProduct);
    }
  };

  const getStockStatusColor = (status: Product["stockStatus"]) => {
    switch (status) {
      case "bien":
      case "good":
        return "success";
      case "bajo":
      case "low":
        return "warning";
      case "agotado":
      case "out of stock":
        return "error";
      default:
        return "primary";
    }
  };

  const getDisplayStockStatus = (status: Product["stockStatus"]) => {
    switch (status) {
      case "bien":
        return "Bien";
      case "bajo":
        return "Bajo";
      case "agotado":
        return "Agotado";
      case "good":
        return "Bien";
      case "low":
        return "Bajo";
      case "out of stock":
        return "Agotado";
      default:
        return status;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Almacenamiento</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.unitPrice.toFixed(1)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {product.storageLocation === "in stock"
                  ? "En Tienda"
                  : product.storageLocation === "in warehouse"
                  ? "En Almacén"
                  : product.storageLocation}
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  color={getStockStatusColor(product.stockStatus)}
                >
                  {getDisplayStockStatus(product.stockStatus)}
                </Button>
              </TableCell>
              <TableCell>
                <IconButton
                  aria-label="acciones"
                  onClick={(event) => handleClick(event, product)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id={`menu-${product.id}`}
                  anchorEl={anchorEl}
                  open={open && selectedProduct?.id === product.id}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleEdit}>Editar</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
