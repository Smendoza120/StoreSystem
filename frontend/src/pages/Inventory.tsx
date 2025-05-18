import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import HeaderInventory from "../components/layout/HeaderInventory";
import ActionBar from "../components/layout/ActionBar";
import ProductTable from "../components/product/ProductTable";
import Pagination from "../components/common/Pagination";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import useInventory from "../hooks/useInventory";

const InventarioPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const productsPerPage = 5; // Ajusta según necesites
  const { inventoryData, loading, error, totalItems } = useInventory(
    page,
    productsPerPage
  );
  const totalPages = Math.ceil(totalItems / productsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, totalItems);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={true} onClose={() => {}} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HeaderInventory />
        <ActionBar />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <ProductTable products={inventoryData} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">
                Mostrando {startIndex + 1}-{endIndex} de {totalItems} productos
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default InventarioPage;
