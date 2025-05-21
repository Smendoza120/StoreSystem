import React, { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "../components/common/Pagination";
import NoDataDisplay from "../components/common/NoDataDisplay";

interface SaleRecord {
  id: string;
  saleNumber: string;
  date: string;
  customerName: string;
  totalAmount: number;
  status: "Completed" | "Cancelled";
}

const sampleSalesHistory: SaleRecord[] = [
  {
    id: "VNT001",
    saleNumber: "20250520-001",
    date: "2025-05-20",
    customerName: "Cliente A",
    totalAmount: 15000,
    status: "Completed",
  },
  {
    id: "VNT002",
    saleNumber: "20250519-002",
    date: "2025-05-19",
    customerName: "Cliente B",
    totalAmount: 7500,
    status: "Completed",
  },
  {
    id: "VNT003",
    saleNumber: "20250518-003",
    date: "2025-05-18",
    customerName: "Cliente C",
    totalAmount: 22000,
    status: "Completed",
  },
  {
    id: "VNT004",
    saleNumber: "20250517-004",
    date: "2025-05-17",
    customerName: "Cliente D",
    totalAmount: 3000,
    status: "Cancelled",
  },
  {
    id: "VNT005",
    saleNumber: "20250516-005",
    date: "2025-05-16",
    customerName: "Cliente E",
    totalAmount: 10000,
    status: "Completed",
  },
];

const SalesHistoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const salesPerPage = 5;
  const totalSales = sampleSalesHistory.length;
  const totalPages = Math.ceil(totalSales / salesPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * salesPerPage;
  const endIndex = startIndex + salesPerPage;
  const currentSales = sampleSalesHistory.slice(startIndex, endIndex);

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
            label="Buscar venta..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <Box>
            <FormControl size="small" sx={{ mr: 2 }}>
              <InputLabel id="status-filter-label">Estado</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter-select"
                value=""
              >
                <MenuItem value="">Todos los estados</MenuItem>
                <MenuItem value="Completed">Completada</MenuItem>
                <MenuItem value="Cancelled">Cancelada</MenuItem>
              </Select>
            </FormControl>
            <IconButton aria-label="download" sx={{ mr: 2 }}>
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="sales history table">
            <TableHead>
              <TableRow>
                <TableCell>No. Venta</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSales.length > 0 ? (
                currentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.saleNumber}</TableCell>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.customerName}</TableCell>
                    <TableCell align="right">
                      ${sale.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{sale.status}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <NoDataDisplay message="No hay ventas registradas." />
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
            Mostrando {startIndex + 1}-{Math.min(endIndex, totalSales)} de{" "}
            {totalSales} ventas
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SalesHistoryPage;
