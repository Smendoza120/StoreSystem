import express from "express";
const router = express.Router();
import * as salesController from "../controllers/sales.controller.mjs";

/**
 * @swagger
 * /api/sales:
 * post:
 * summary: Registra una nueva venta.
 * description: Registra una nueva venta, actualiza el historial de ventas y disminuye la cantidad de stock de los productos vendidos.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * products:
 * type: array
 * items:
 * type: object
 * properties:
 * productId:
 * type: string
 * example: abc-123-xyz
 * quantity:
 * type: integer
 * example: 2
 * responses:
 * '201':
 * description: Venta registrada exitosamente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SaleRecordResponse' # Usaremos un schema de respuesta para la venta
 * '400':
 * description: Error si no se proporcionan productos, el producto no se encuentra o hay stock insuficiente.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse' # Reutilizamos ErrorResponse
 * tags:
 * - Ventas
 */
router.post("/", salesController.recordSale);

/**
 * @swagger
 * /api/sales/history:
 * get:
 * summary: Obtiene el historial de todas las ventas.
 * description: Retorna una lista de todos los registros de ventas.
 * responses:
 * '200':
 * description: Lista de todos los registros de ventas.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/SalesHistoryResponse' # Usaremos un schema para el historial
 * tags:
 * - Ventas
 */
router.get("/history", salesController.getSalesHistory);

/**
 * @swagger
 * /api/sales/{saleId}/invoice:
 * get:
 * summary: Descarga factura de venta en PDF.
 * description: Genera y descarga la factura en formato PDF para una venta específica.
 * tags:
 * - Ventas
 * parameters:
 * - in: path
 * name: saleId
 * required: true
 * description: ID de la venta para la cual se generará la factura.
 * schema:
 * type: string
 * example: uuid-de-la-venta
 * responses:
 * '200':
 * description: Archivo PDF de la factura.
 * content:
 * application/pdf:
 * schema:
 * type: string
 * format: binary
 * '404':
 * description: Venta no encontrada.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * '500':
 * description: Error al generar el PDF de la factura.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:saleId/invoice", salesController.downloadInvoice);

export default router;
