import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NoDataDisplay from "../common/NoDataDisplay";

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface SalesTableProps {
  saleItems: SaleItem[];
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const SalesTable: React.FC<SalesTableProps> = ({
  saleItems,
  onQuantityChange,
  onRemoveItem,
}) => {
  if (saleItems.length === 0) {
    return <NoDataDisplay message="No hay productos agregados a la venta." />;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sales table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre del Producto</TableCell>
            <TableCell align="center">Cantidad</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Precio en Conjunto</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {saleItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    onQuantityChange(item.id, parseInt(e.target.value) || 0)
                  }
                  inputProps={{ min: 1 }}
                  size="small"
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell align="right">
                ${item.unitPrice.toLocaleString()}
              </TableCell>
              <TableCell align="right">
                ${item.totalPrice.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <IconButton color="error" onClick={() => onRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
