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
  Snackbar,
} from "@mui/material";
import CreateProductForm from "../components/product/CreateProductForm";
import type { Product } from "../interfaces/inventory";

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createProductError, setCreateProductError] = useState<string | null>(
    null
  );
  const [createProductSuccess, setCreateProductSuccess] =
    useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const productsPerPage = 5;
  const {
    inventoryData,
    loading,
    error,
    totalItems,
    refetch: refetchInventory,
  } = useInventory(page, productsPerPage);
  const totalPages = Math.ceil(totalItems / productsPerPage);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
    setProductToEdit(null);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setCreateProductError(null);
    setCreateProductSuccess(false);
    setProductToEdit(null);
  };

  const handleOpenEditDialog = (product: Product) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleCreateProduct = async (newProduct: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setCreateProductSuccess(true);
        refetchInventory();
        setTimeout(() => setCreateProductSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setCreateProductError(
          errorData.message || "Error al crear el producto"
        );
      }
    } catch (err: any) {
      setCreateProductError(
        err.message || "Error de conexión al crear el producto"
      );
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        setCreateProductSuccess(true);
        refetchInventory();
        setTimeout(() => setCreateProductSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setCreateProductError(
          errorData.message || "Error al actualizar el producto"
        );
      }
    } catch (err: any) {
      setCreateProductError(
        err.message || "Error de conexión al actualizar el producto"
      );
    } finally {
      setIsEditDialogOpen(false);
      setProductToEdit(null);
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setCreateProductSuccess(false);
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
          <Snackbar
            open={createProductSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Producto guardado correctamente" // Mensaje genérico para crear y editar
          />
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
            <ProductTable
              products={inventoryData}
              onOpenEdit={handleOpenEditDialog}
            />
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

        <Dialog
          open={isCreateDialogOpen || isEditDialogOpen}
          onClose={handleCloseCreateDialog}
          fullWidth
          maxWidth="sm"
        >
          <CreateProductForm
            onClose={handleCloseCreateDialog}
            onCreate={productToEdit ? handleUpdateProduct : handleCreateProduct}
            initialValues={productToEdit}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryPage;
