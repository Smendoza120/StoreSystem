import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface PdfDownloadDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDownload: () => void; 
}

const PdfDownloadDialog: React.FC<PdfDownloadDialogProps> = ({
  open,
  onClose,
  onConfirmDownload,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="pdf-download-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="pdf-download-dialog-title">Venta Confirmada</DialogTitle>
      <DialogContent>
        <DialogContentText>
          La venta se ha realizado exitosamente. ¿Deseas descargar el PDF de la
          factura ahora?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          No, gracias
        </Button>
        <Button
          onClick={onConfirmDownload}
          color="primary"
          variant="contained"
          autoFocus
        >
          Descargar PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfDownloadDialog;
