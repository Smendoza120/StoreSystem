import React from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Product {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  storageLocation: string;
  stockStatus: "good" | "low" | "out of stock";
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const stockAlto = 10;
  const stockBajo = 5;

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
                  color={
                    product.quantity > stockAlto
                      ? "success" // En stock
                      : product.quantity > stockBajo
                      ? "warning" // Stock bajo
                      : "error" // Agotado
                  }
                >
                  {product.quantity > stockAlto
                    ? "En stock"
                    : product.quantity > stockBajo
                    ? "Stock bajo"
                    : "Agotado"}
                </Button>
              </TableCell>
              <TableCell>
                <IconButton aria-label="acciones">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
