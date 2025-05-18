import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import HeaderInventory from "../components/layout/HeaderInventory";
import ActionBar from "../components/layout/ActionBar";
import ProductTable from "../components/product/ProductTable";
import Pagination from "../components/common/Pagination";
import useInventory from "../hooks/useInventory";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
} from "@mui/material";
import CreateProductForm from "../components/product/CreateProductForm";

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createProductError, setCreateProductError] = useState<string | null>(null);
  const [createProductSuccess, setCreateProductSuccess] = useState<boolean>(false);
  const productsPerPage = 5;
  const { inventoryData, loading, error, totalItems, refetch: refetchInventory } = useInventory(page, productsPerPage);
  const totalPages = Math.ceil(totalItems / productsPerPage);

  const handleOpenCreateDialog  = () => {
    setIsCreateDialogOpen(true);
  }

  const handleCloseCreateDialog  = () => {
    setIsCreateDialogOpen(false);
    setCreateProductError(null);
    setCreateProductSuccess(false);
  }

  const handleCreateProduct = async (newProduct: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setCreateProductSuccess(true);
        refetchInventory(); 
        setTimeout(() => setCreateProductSuccess(false), 3000); 
      } else {
        const errorData = await response.json();
        setCreateProductError(errorData.message || 'Error al crear el producto');
      }
    } catch (err: any) {
      setCreateProductError(err.message || 'Error de conexión al crear el producto');
    }
  };

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
        <ActionBar onOpenCreateDialog={handleOpenCreateDialog} />

        {createProductSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>Producto creado correctamente.</Alert>
        )}
        {createProductError && (
          <Alert severity="error" sx={{ mb: 2 }}>{createProductError}</Alert>
        )}

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

        <Dialog open={isCreateDialogOpen} onClose={handleCloseCreateDialog} fullWidth maxWidth="sm">
          <CreateProductForm onClose={handleCloseCreateDialog} onCreate={handleCreateProduct} />
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryPage;
