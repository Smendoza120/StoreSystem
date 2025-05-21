import express from "express";
const router = express.Router();
import * as salesController from "../controllers/sales.controller.mjs";

/**
 * @route POST /api/sales
 * @group Sales - Operations related to daily sales
 * @param {array<object>} products.body.required - List of products sold.
 * @param {string} products[].productId.required - ID of the product sold.
 * @param {number} products[].quantity.required - Quantity of the product sold.
 * @returns {object} 201 - Sale recorded successfully.
 * @returns {Error}  400 - Error if no products provided, product not found, or insufficient stock.
 */
router.post('/', salesController.recordSale);

/**
 * @route GET /api/sales/history
 * @group Sales - Operations related to daily sales
 * @returns {array<object>} 200 - List of all sales records.
 */
router.get('/history', salesController.getSalesHistory);

/**
 * @route GET /api/sales/{saleId}/invoice
 * @group Sales - Operations related to daily sales
 * @param {string} saleId.path.required - ID of the sale to generate the invoice for.
 * @returns {file} 200 - PDF invoice file.
 * @returns {Error}  404 - Sale not found.
 * @returns {Error}  500 - Failed to generate invoice PDF.
 */
router.get('/:saleId/invoice', salesController.downloadInvoice);

export default router;