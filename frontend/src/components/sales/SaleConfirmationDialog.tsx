import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  DialogContentText,
} from "@mui/material";
import type { SaleItem } from "../../interfaces/sales";

interface SaleConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  saleItems: SaleItem[];
  totalSale: number;
}

const SaleConfirmationDialog: React.FC<SaleConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  saleItems,
  totalSale,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-sale-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="confirm-sale-dialog-title">Confirmar Venta</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Por favor, revisa los detalles de la venta antes de confirmar.
        </DialogContentText>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small" aria-label="sale items table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${item.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${item.totalPrice.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="h6">
            Total a Pagar: ${totalSale.toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          autoFocus
        >
          Confirmar Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaleConfirmationDialog;
