import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { SaleRecord, SoldProductDetail } from "../../interfaces/sales";

interface SaleDetailsModalProps {
  open: boolean;
  onClose: () => void;
  saleDetails: SaleRecord | null;
}

const SaleDetailsModal: React.FC<SaleDetailsModalProps> = ({
  open,
  onClose,
  saleDetails,
}) => {
  if (!saleDetails) {
    return null;
  }

  const formattedDate = new Date(saleDetails.date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalles de la Venta: {saleDetails.id}</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            **ID de Venta:** {saleDetails.id}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            **Fecha:** {formattedDate}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Productos
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio Unitario</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {saleDetails.products && saleDetails.products.length > 0 ? (
                  saleDetails.products.map((product: SoldProductDetail) => (
                    <TableRow key={product.productId}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        ${product.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        ${product.totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        No hay productos detallados para esta venta.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Typography variant="h6">
              Total de la Venta: ${saleDetails.totalSaleAmount.toFixed(2)}
              {/* Usamos totalSaleAmount */}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaleDetailsModal;
