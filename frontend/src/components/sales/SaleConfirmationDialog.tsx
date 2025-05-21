import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface SaleConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  saleItems: SaleItem[];
  totalSale: number;
}

const SaleConfirmationDialog: React.FC<SaleConfirmationDialogProps> = ({ open, onClose, onConfirm, saleItems, totalSale }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Confirmar Venta</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>Detalle de la Venta:</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="sale detail table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saleItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">${item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell align="right">${item.totalPrice.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="h6">
            Total de la Venta: <Box component="span" sx={{ fontWeight: 'bold' }}>${totalSale.toLocaleString()}</Box>
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          ¿Desea confirmar esta venta y generar el PDF?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirmar y Generar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaleConfirmationDialog;