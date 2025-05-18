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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.unitPrice.toFixed(2)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.storageLocation}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  color={
                    product.stockStatus === "good"
                      ? "success"
                      : product.stockStatus === "low"
                      ? "warning"
                      : "error"
                  }
                >
                  {product.stockStatus === 'good' ? 'En stock' :
                   product.stockStatus === 'low' ? 'Stock bajo' :
                   'Agotado'} 
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
