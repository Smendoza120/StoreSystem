import React, { useState, useEffect, useCallback } from "react";
import PageHeader from "../components/layout/PageHeader";
import ProductFilter from "../components/sales/ProductFilter";
import SalesTable from "../components/sales/SalesTable";
import SalesSummary from "../components/sales/SalesSummary";
import SaleConfirmationDialog from "../components/sales/SaleConfirmationDialog";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { makeSale } from "../services/salesService";
import {
  getAllInventoryProducts,
  searchProductsByName,
} from "../services/inventoryService";

import type {
  InventoryProduct,
  SaleItem,
  SalePayload,
} from "../interfaces/sales";

const SalesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fullInventoryProducts, setFullInventoryProducts] = useState<
    InventoryProduct[]
  >([]);
  const [filteredProducts, setFilteredProducts] = useState<InventoryProduct[]>(
    []
  );
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [totalSale, setTotalSale] = useState<number>(0);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const fetchAllInventoryProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const products = await getAllInventoryProducts();
      setFullInventoryProducts(products);
    } catch (err: any) {
      setError(
        err.message ||
          "Error al cargar los productos del inventario para validación."
      );
      setSnackbarSeverity("error");
      setSnackbarMessage(
        err.message || "Error al cargar productos de inventario completo."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllInventoryProducts();
  }, [fetchAllInventoryProducts]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 0) {
        setLoading(true);
        setError(null);
        try {
          const results = await searchProductsByName(searchTerm);
          console.log("Resultados de búsqueda:", results);
          const inStockResults = results.filter((product) => product.stock > 0);
          setFilteredProducts(inStockResults);
        } catch (err: any) {
          setError(err.message || "Error al buscar productos.");
          setSnackbarSeverity("error");
          setSnackbarMessage(err.message || "Error al buscar productos.");
          setSnackbarOpen(true);
          setFilteredProducts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredProducts([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const calculatedTotal = saleItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    setTotalSale(calculatedTotal);
  }, [saleItems]);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleProductSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleProductSelect = (product: InventoryProduct | null) => {
    if (!product) {
      setSearchTerm("");
      setFilteredProducts([]);
      return;
    }

    const inventoryProductForStock = fullInventoryProducts.find(
      (p) => p.id === product.id
    );

    if (!inventoryProductForStock) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Error: Producto no encontrado en el inventario actual para validación de stock."
      );
      setSnackbarOpen(true);
      return;
    }

    const existingItemIndex = saleItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedSaleItems = [...saleItems];
      const currentItem = updatedSaleItems[existingItemIndex];

      if (inventoryProductForStock.stock > currentItem.quantity) {
        updatedSaleItems[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity + 1,
          totalPrice: (currentItem.quantity + 1) * currentItem.unitPrice,
        };
        setSaleItems(updatedSaleItems);
      } else {
        setSnackbarSeverity("warning");
        setSnackbarMessage(
          `No hay suficiente stock para agregar más de ${product.name}. Stock disponible: ${inventoryProductForStock.stock}`
        );
        setSnackbarOpen(true);
      }
    } else {
      if (inventoryProductForStock.stock > 0) {
        setSaleItems((prevItems) => [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            quantity: 1,
            unitPrice: product.price,
            totalPrice: product.price,
          },
        ]);
      } else {
        setSnackbarSeverity("warning");
        setSnackbarMessage(
          `El producto ${product.name} no tiene stock disponible.`
        );
        setSnackbarOpen(true);
      }
    }
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setSaleItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const inventoryProductForStock = fullInventoryProducts.find(
            (p) => p.id === id
          );
          if (
            inventoryProductForStock &&
            newQuantity > inventoryProductForStock.stock
          ) {
            setSnackbarSeverity("warning");
            setSnackbarMessage(
              `No hay suficiente stock para esta cantidad de ${item.name}. Stock disponible: ${inventoryProductForStock.stock}`
            );
            setSnackbarOpen(true);
            const quantityToUse = Math.max(1, inventoryProductForStock.stock);
            return {
              ...item,
              quantity: quantityToUse,
              totalPrice: quantityToUse * item.unitPrice,
            };
          }
          if (newQuantity < 1) newQuantity = 1;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setSaleItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleMakeSale = () => {
    if (saleItems.length === 0) {
      setSnackbarSeverity("warning");
      setSnackbarMessage("Agregue productos a la venta antes de realizarla.");
      setSnackbarOpen(true);
      return;
    }
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmSale = async () => {
    setIsConfirmationDialogOpen(false);

    const productsForSale: SalePayload["products"] = saleItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      const response = await makeSale(productsForSale);
      console.log("Venta realizada:", response);
      setSnackbarSeverity("success");
      setSnackbarMessage(
        `Venta realizada exitosamente! ID: ${response.saleId}`
      );
      setSnackbarOpen(true);

      setSaleItems([]);
      setTotalSale(0);
      setSearchTerm("");
      setFilteredProducts([]);

      fetchAllInventoryProducts();
    } catch (err: any) {
      console.error("Error al confirmar la venta:", err);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `Error al realizar la venta: ${
          err.message || "Ocurrió un error inesperado."
        }`
      );
      setSnackbarOpen(true);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);
  };

  const displayLoading = loading && searchTerm.length === 0;
  const displaySearchLoading = loading && searchTerm.length > 0;

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader
          title="Ventas Diarias"
          subtitle="Agrega productos para realizar una venta"
        />

        <ProductFilter
          searchTerm={searchTerm}
          onSearchChange={handleProductSearch}
          filteredProducts={filteredProducts}
          onProductSelect={handleProductSelect}
        />
        {displaySearchLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={24} />
            <Typography sx={{ ml: 1 }}>Buscando...</Typography>
          </Box>
        )}
        {error && !displaySearchLoading && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Productos de la Venta
          </Typography>
          <SalesTable
            saleItems={saleItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        </Box>

        <SalesSummary totalSale={totalSale} onMakeSale={handleMakeSale} />

        <SaleConfirmationDialog
          open={isConfirmationDialogOpen}
          onClose={handleCloseConfirmationDialog}
          onConfirm={handleConfirmSale}
          saleItems={saleItems}
          totalSale={totalSale}
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

export default SalesPage;
