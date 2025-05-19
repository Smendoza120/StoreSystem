import express from "express";
const router = express.Router();
import * as inventoryController from "../controllers/inventory.controller.mjs";

/**
 * @route POST /api/inventory
 * @group Inventory - Inventory management operations
 * @param {string} name.body.required - Product name.
 * @param {number} unitPrice.body.required - Unit price of the product.
 * @param {number} quantity.body.required - Quantity of the product to add.
 * @param {string} storageLocation.body.required - Product location ('in stock' or 'in warehouse').
 * @returns {object} 201 - Product added successfully.
 * @returns {object} 200 - Quantity of existing product updated.
 * @returns {Error}  400 - Error if required fields are not provided or storage location is invalid.
 */
router.post('/', inventoryController.addProduct);

/**
 * @route GET /api/inventory
 * @group Inventory - Inventory management operations
 * @returns {array<object>} 200 - List of all products in the inventory.
 */
router.get('/', inventoryController.getInventory);

/**
 * @route GET /api/inventory/{id}
 * @group Inventory - Inventory management operations
 * @param {string} id.path.required - ID of the product to retrieve.
 * @returns {object} 200 - Product found.
 * @returns {Error}  404 - Product not found.
 */
router.get('/:id', inventoryController.getProductById);

/**
 * @route PUT /api/inventory/{id}
 * @group Inventory - Inventory management operations
 * @param {string} id.path.required - ID of the product to update.
 * @param {number} unitPrice.body - New unit price of the product (optional).
 * @param {number} quantity.body - New quantity of the product (optional).
 * @param {string} storageLocation.body - New storage location ('in stock' or 'in warehouse') (optional).
 * @returns {object} 200 - Product updated successfully.
 * @returns {Error}  400 - Error if the provided storage location is invalid.
 * @returns {Error}  404 - Product not found.
 */
router.put('/:id', inventoryController.updateProduct);

/**
 * @route DELETE /api/inventory/{id}
 * @group Inventory - Inventory management operations
 * @param {string} id.path.required - ID of the product to delete.
 * @returns {object} 200 - Product deleted successfully.
 * @returns {Error}   404 - Product not found.
 */
router.delete('/:id', inventoryController.deleteProduct);

/**
 * @route GET /api/inventory/search
 * @group Inventory - Inventory management operations
 * @param {string} name.query.required - Name of the product to search for.
 * @returns {array<object>} 200 - List of products matching the search term.
 * @returns {Error}  400 - Error if the 'name' query parameter is not provided.
 * @returns {Error}  404 - No products found matching the search term.
 */
router.get('/search', inventoryController.searchProductByName);

export default router;