import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import Pagination from "../components/common/Pagination";
import NoDataDisplay from "../components/common/NoDataDisplay";
import SaleDetailsModal from "../components/sales/SaleDetailsModal";
import { downloadInvoice, getSalesHistory } from "../services/salesService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import type { ApiResponse } from "../utils/apiClient";
import type { SaleRecord } from "../interfaces/sales";

const SalesHistoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [allSales, setAllSales] = useState<SaleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info"
  >("success");

  const [isDetailsModalOpen, setIsDetailsModal] = useState(false);
  const [selectedSaleForDetails, setSelectedSaleForDetails] =
    useState<SaleRecord | null>(null);

  const authToken = "";

  const fetchAllSalesHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: ApiResponse<SaleRecord[]> = await getSalesHistory(
        authToken
      );

      if (response.success && response.data) {
        setAllSales(response.data);
      } else {
        setError(response.message || "Error al cargar el historial de ventas.");
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.message || "Error al cargar historial de ventas."
        );
        setSnackbarOpen(true);
        setAllSales([]);
      }
    } catch (err: unknown) {
      console.error("Error fetching sales history:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar el historial de ventas.";
      setError(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchAllSalesHistory();
  }, [fetchAllSalesHistory]);

  const filteredSales = useMemo(() => {
    let tempSales = allSales;

    if (searchTerm) {
      tempSales = tempSales.filter((sale) =>
        sale.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return tempSales;
  }, [allSales, searchTerm]);

  const totalSalesCount = filteredSales.length;
  const totalPages = Math.ceil(totalSalesCount / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentSales = filteredSales.slice(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleViewDetails = (sale: SaleRecord) => {
    setSelectedSaleForDetails(sale);
    setIsDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModal(false);
    setSelectedSaleForDetails(null);
  };

  const handleDownloadInvoice = async (saleId: string) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Generando PDF de la factura...");
    setSnackbarOpen(true);
    try {
      await downloadInvoice(saleId, authToken);
      setSnackbarSeverity("success");
      setSnackbarMessage("PDF generado y descargado con éxito!");
    } catch (err: unknown) {
      console.error("Error al generar el PDF de la factura:", err);
      setSnackbarSeverity("error");
      let errorMessage =
        "Fallo al generar el PDF. Revisa la consola para más detalles.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setSnackbarMessage(errorMessage);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader
          title="Historial de Ventas"
          subtitle="Visualiza y gestiona tus ventas realizadas"
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <TextField
            label="Buscar venta por ID..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
          <Box>
            <IconButton
              aria-label="download all sales"
              onClick={() => handleDownloadInvoice("all")}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sales history table">
            <TableHead>
              <TableRow>
                <TableCell>ID Venta</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                    <Typography sx={{ ml: 1 }}>Cargando ventas...</Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Alert severity="error">{error}</Alert>
                  </TableCell>
                </TableRow>
              ) : currentSales.length > 0 ? (
                currentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.id}</TableCell>
                    <TableCell>
                      {new Date(sale.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {sale.totalSaleAmount.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="view details"
                        onClick={() => handleViewDetails(sale)}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <IconButton
                        aria-label="download invoice"
                        onClick={() => handleDownloadInvoice(sale.id)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>
                    <NoDataDisplay message="No hay ventas registradas que coincidan con los filtros." />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2">
            Mostrando {currentSales.length > 0 ? startIndex + 1 : 0}-
            {Math.min(endIndex, totalSalesCount)} de {totalSalesCount} ventas
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>

        <SaleDetailsModal
          open={isDetailsModalOpen}
          onClose={handleCloseDetailsModal}
          saleDetails={selectedSaleForDetails}
        />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default SalesHistoryPage;
