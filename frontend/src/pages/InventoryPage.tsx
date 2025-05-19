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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CreateProductForm from "../components/product/CreateProductForm";
import type { Product } from "../interfaces/inventory";
import { createProduct, updateProduct } from "../services/inventoryService";
import EditProductForm from "../components/product/EditProductForm";

const InventoryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
  } = useInventory(page, itemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
    setProductToEdit(null);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setCreateProductError(null);
    setCreateProductSuccess(false);
    setProductToEdit(null);
  };

  const handleOpenEditDialog = (product: Product) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setProductToEdit(null);
    setCreateProductError(null);
    setCreateProductSuccess(false);
  };

  const handleCreateProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      await createProduct(newProduct);
      setCreateProductSuccess(true);
      refetchInventory();
      setTimeout(() => setCreateProductSuccess(false), 3000);
    } catch (err: any) {
      setCreateProductError(
        err.message || "Error de conexión al crear el producto"
      );
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      await updateProduct(updatedProduct);
      setCreateProductSuccess(true);
      refetchInventory();
      setTimeout(() => setCreateProductSuccess(false), 3000);
    } catch (err: any) {
      setCreateProductError(
        err.message || "Error de conexión al actualizar el producto"
      );
    } finally {
      handleCloseEditDialog();
    }
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1); 
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
            message="Producto guardado correctamente" 
          />
        )}
        {createProductError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createProductError}
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

        {/* Diálogo para la creación de productos */}
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

        {/* Diálogo para la edición de productos */}
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
