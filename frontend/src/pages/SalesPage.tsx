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
  Button,
} from "@mui/material";
import { recordSale, downloadInvoice } from "../services/salesService";
import {
  getAllInventoryProducts,
  searchProductsByName,
} from "../services/inventoryService";
import type { ApiResponse } from "../utils/apiClient";
import type {
  SaleItem,
  SalePayload,
  RecordSaleResponseData,
} from "../interfaces/sales";
import type {
  Product as InventoryProduct,
  ProductApiResponse,
} from "../interfaces/inventory";
import PdfDownloadDialog from "../components/sales/PdfDownloadDialog";
import { Link } from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';

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
  const [lastSaleId, setLastSaleId] = useState<string | null>(null);
  const [isPdfDownloadDialogOpen, setIsPdfDownloadDialogOpen] = // <-- Nuevo estado para el diálogo de PDF
    useState<boolean>(false);

  const authToken = "";

  const fetchAllInventoryProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: ProductApiResponse = await getAllInventoryProducts(
        authToken
      );

      if (
        response.success &&
        response.data &&
        Array.isArray(response.data.products)
      ) {
        setFullInventoryProducts(response.data.products);
      } else {
        setError(
          response.message || "Error al cargar productos del inventario."
        );
        setSnackbarSeverity("error");
        setSnackbarMessage(
          response.message ||
            "Error al cargar productos de inventario completo."
        );
        setSnackbarOpen(true);
        setFullInventoryProducts([]);
      }
    } catch (err: unknown) {
      console.error("Error al cargar los productos del inventario:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar productos de inventario.";
      setError(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      setFullInventoryProducts([]);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchAllInventoryProducts();
  }, [fetchAllInventoryProducts]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 0) {
        setLoading(true);
        setError(null);
        try {
          const response: ProductApiResponse = await searchProductsByName(
            searchTerm,
            authToken
          );

          if (response.success && response.data) {
            const productsFound: InventoryProduct[] =
              response.data as unknown as InventoryProduct[];

            setFilteredProducts(productsFound);

            if (response.message) {
              setSnackbarSeverity("success");
              setSnackbarMessage(response.message);
              setSnackbarOpen(true);
            }
          } else {
            setError(response.message || "Error al buscar productos.");
            setSnackbarSeverity("error");
            setSnackbarMessage(
              response.message || "Error al buscar productos."
            );
            setSnackbarOpen(true);
            setFilteredProducts([]);
          }
        } catch (err: unknown) {
          console.error("Error al buscar productos:", err);
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Error desconocido al buscar productos.";
          setError(errorMessage);
          setSnackbarSeverity("error");
          setSnackbarMessage(errorMessage);
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
  }, [searchTerm, authToken]);

  useEffect(() => {
    const calculatedTotal = saleItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    setTotalSale(calculatedTotal);
  }, [saleItems]);

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
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

    if (inventoryProductForStock.quantity <= 0) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `El producto "${product.name}" está agotado y no puede ser agregado.`
      );
      setSnackbarOpen(true);
      setSearchTerm("");
      setFilteredProducts([]);
      return;
    }

    const existingItemIndex = saleItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedSaleItems = [...saleItems];
      const currentItem = updatedSaleItems[existingItemIndex];

      if (inventoryProductForStock.quantity > currentItem.quantity) {
        updatedSaleItems[existingItemIndex] = {
          ...currentItem,
          quantity: currentItem.quantity + 1,
          totalPrice: (currentItem.quantity + 1) * currentItem.unitPrice,
        };
        setSaleItems(updatedSaleItems);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage(
          `No hay suficiente stock para agregar más de ${product.name}. Stock disponible: ${inventoryProductForStock.quantity}`
        );
        setSnackbarOpen(true);
      }
    } else {
      if (inventoryProductForStock.quantity > 0) {
        setSaleItems((prevItems) => [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            quantity: 1,
            unitPrice: product.unitPrice,
            totalPrice: product.unitPrice,
          },
        ]);
      } else {
        setSnackbarSeverity("error");
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
            newQuantity > inventoryProductForStock.quantity
          ) {
            setSnackbarSeverity("error");
            setSnackbarMessage(
              `No hay suficiente stock para esta cantidad de ${item.name}. Stock disponible: ${inventoryProductForStock.quantity}`
            );
            setSnackbarOpen(true);
            const quantityToUse = Math.max(
              1,
              inventoryProductForStock.quantity
            );
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
      setSnackbarSeverity("error");
      setSnackbarMessage("Agregue productos a la venta antes de realizarla.");
      setSnackbarOpen(true);
      return;
    }
    setIsConfirmationDialogOpen(true);
  };

  const handleGeneratePdf = async () => {
    if (lastSaleId) {
      setSnackbarSeverity("success");
      setSnackbarMessage("Generando PDF de la factura...");
      setSnackbarOpen(true);
      try {
        await downloadInvoice(lastSaleId, authToken);
        setSnackbarSeverity("success");
        setSnackbarMessage("PDF generado y descargado con éxito!");
      } catch (err: unknown) {
        console.error("Error al generar el PDF:", err);
        setSnackbarSeverity("error");
        let errorMessage =
          "Fallo al generar el PDF. Revisa la consola para más detalles.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setSnackbarMessage(errorMessage);
      } finally {
        setIsPdfDownloadDialogOpen(false);
      }
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Error: No se encontró ID de venta para generar el PDF."
      );
      setSnackbarOpen(true);
      setIsPdfDownloadDialogOpen(false);
    }
  };

  const handleConfirmSale = async () => {
    const productsForSale: SalePayload["products"] = saleItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      const response: ApiResponse<RecordSaleResponseData> = await recordSale(
        productsForSale
      );

      if (response.success && response.data?.sale) {
        setSnackbarSeverity("success");
        setSnackbarMessage(
          `Venta realizada exitosamente! ID: ${response.data.sale.id}`
        );
        setSnackbarOpen(true);
        setLastSaleId(response.data.sale.id);

        setIsConfirmationDialogOpen(false);
        setIsPdfDownloadDialogOpen(true);
      } else {
        throw new Error(
          response.message || "Error desconocido al registrar la venta."
        );
      }
    } catch (err: unknown) {
      console.error("Error al confirmar la venta:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado al realizar la venta.";
      setSnackbarSeverity("error");
      setSnackbarMessage(`Error al realizar la venta: ${errorMessage}`);
      setSnackbarOpen(true);
    }
  };

  const handleCloseConfirmationDialog = () => {
    setIsConfirmationDialogOpen(false);

    setLastSaleId(null);
    setSaleItems([]);
    setTotalSale(0);
    setSearchTerm("");
    setFilteredProducts([]);
    fetchAllInventoryProducts();
  };

  const handleClosePdfDownloadDialog = () => {
    setIsPdfDownloadDialogOpen(false);
    setLastSaleId(null);
    setSaleItems([]);
    setTotalSale(0);
    setSearchTerm("");
    setFilteredProducts([]);
    fetchAllInventoryProducts();
  };

  const displayLoadingContent = loading && searchTerm.length === 0;
  const displaySearchLoadingContent = loading && searchTerm.length > 0;

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader
          title="Ventas Diarias"
          subtitle="Agrega productos para realizar una venta"
          actionButton={
            <Button
              component={Link} 
              to="/daily-sales/history" 
              variant="contained"
              color="primary"
              startIcon={<HistoryIcon />} 
            >
              Historial de Ventas
            </Button>
          }
        />

        <ProductFilter
          searchTerm={searchTerm}
          onSearchChange={handleProductSearch}
          filteredProducts={filteredProducts}
          onProductSelect={handleProductSelect}
        />

        {displayLoadingContent && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={24} />
            <Typography sx={{ ml: 1 }}>Cargando inventario...</Typography>
          </Box>
        )}

        {displaySearchLoadingContent && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress size={24} />
            <Typography sx={{ ml: 1 }}>Buscando productos...</Typography>
          </Box>
        )}

        {error && !loading && (
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

        <PdfDownloadDialog
          open={isPdfDownloadDialogOpen}
          onClose={handleClosePdfDownloadDialog}
          onConfirmDownload={handleGeneratePdf}
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
