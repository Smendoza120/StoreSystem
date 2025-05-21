import React, { useEffect, useState } from "react";
import HeaderInventory from "../components/layout/HeaderInventory";
import ActionBar from "../components/layout/ActionBar";
import ProductTable from "../components/inventory/ProductTable";
import Pagination from "../components/common/Pagination";
import useInventory from "../hooks/useInventory";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import type { Product } from "../interfaces/inventory";
import { createProduct, updateProduct } from "../services/inventoryService";
import CreateProductForm from "../components/inventory/CreateProductForm";
import EditProductForm from "../components/inventory/EditProductForm";

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccessMessage, setApiSuccessMessage] = useState<string | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // const token = localStorage.getItem("token") || "";
  const token = "";

  const {
    inventoryData,
    loading,
    error,
    totalItems,
    refetch: refetchInventory,
  } = useInventory(page, itemsPerPage, token);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (!isCreateDialogOpen && !isEditDialogOpen) {
      setApiError(null);
      setApiSuccessMessage(null);
    }
  }, [isCreateDialogOpen, isEditDialogOpen]);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
    setProductToEdit(null);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setApiError(null);
  };

  const handleOpenEditDialog = (product: Product) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setProductToEdit(null);
    setApiError(null);
  };

  const handleCreateProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const response = await createProduct(newProduct, token);
      if (response.success) {
        setApiSuccessMessage(
          response.message || "Producto creado exitosamente."
        );
        refetchInventory();
        handleCloseCreateDialog();
      } else {
        setApiError(response.message || "Error al crear el producto.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message || "Error de conexión al crear el producto.");
      } else {
        setApiError("Ocurrió un error inesperado al crear el producto.");
      }
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await updateProduct(updatedProduct, token);
      if (response.success) {
        setApiSuccessMessage(
          response.message || "Producto actualizado exitosamente."
        );
        refetchInventory();
        handleCloseEditDialog();
      } else {
        setApiError(response.message || "Error al actualizar el producto.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(
          err.message || "Error de conexión al actualizar el producto."
        );
      } else {
        setApiError("Ocurrió un error inesperado al actualizar el producto.");
      }
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(parseInt(String(event.target.value), 10));
    setPage(1);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setApiSuccessMessage(null);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <HeaderInventory />
        <ActionBar onOpenCreateDialog={handleOpenCreateDialog} />

        {apiSuccessMessage && (
          <Snackbar
            open={!!apiSuccessMessage}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            message="Producto guardado correctamente"
          />
        )}
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
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
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="items-per-page-label">Mostrar</InputLabel>
                <Select
                  labelId="items-per-page-label"
                  id="items-per-page"
                  value={itemsPerPage}
                  label="Mostrar"
                  onChange={handleChangeItemsPerPage}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  {/* Puedes agregar más opciones */}
                </Select>
              </FormControl>
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
          open={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
          fullWidth
          maxWidth="sm"
        >
          <CreateProductForm
            onClose={handleCloseCreateDialog}
            onCreate={handleCreateProduct}
          />
        </Dialog>

        <Dialog
          open={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          fullWidth
          maxWidth="sm"
        >
          {productToEdit ? (
            <EditProductForm
              onClose={handleCloseEditDialog}
              onUpdate={handleUpdateProduct}
              initialValues={productToEdit}
            />
          ) : null}
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryPage;
