import express from "express";
import * as inventoryController from "../controllers/inventory.controller.mjs";

const router = express.Router();

// Rutas sin parámetros de ruta al final o rutas más específicas primero
/**
 * @swagger
 * /api/inventory/search:
 * get:
 * summary: Search products by name.
 * description: Returns a list of products whose name contains the provided search term (case-insensitive).
 * parameters:
 * - in: query
 * name: name
 * required: true
 * description: Name of the product to search for.
 * schema:
 * type: string
 * example: potato
 * responses:
 * '200':
 * description: List of products matching the search term. Returns an empty array if no products are found.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/PaginatedInventoryResponse' # Reutilizamos el schema de paginación para la lista de resultados
 * example:
 * success: true
 * message: Resultados de búsqueda para "potato".
 * data:
 * totalItems: 2 # Podría ser 0 si no hay resultados
 * totalPages: 1
 * currentPage: 1
 * products:
 * - id: PROD-0001
 * name: Brand X Potato Chips
 * unitPrice: 1.50
 * quantity: 20
 * storageLocation: in stock
 * stockStatus: bien
 * - id: PROD-0003
 * name: Sweet Potato Crisps
 * unitPrice: 2.20
 * quantity: 10
 * storageLocation: in warehouse
 * stockStatus: medio
 * '400':
 * description: Error if the 'name' query parameter is not provided or is invalid.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El nombre del producto para la búsqueda es requerido.
 * tags:
 * - Inventory
 */
router.get("/search", inventoryController.searchProductByName); // <-- MUEVE ESTA LÍNEA AQUÍ ARRIBA

/**
 * @swagger
 * /api/inventory:
 * post:
 * summary: Add a new product or update an existing one in the inventory.
 * description: Allows adding a new product or increasing/updating the quantity and storage location of an existing product by its name.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - name
 * - unitPrice
 * - quantity
 * - storageLocation
 * properties:
 * name:
 * type: string
 * example: Brand X Potato Chips
 * unitPrice:
 * type: number
 * format: float
 * example: 1.50
 * quantity:
 * type: integer
 * example: 20
 * storageLocation:
 * type: string
 * enum: ["in stock", "in warehouse"]
 * example: "in stock"
 * responses:
 * '201':
 * description: Product added successfully.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductResponse'
 * example:
 * success: true
 * message: Product "Brand X Soda" added.
 * data:
 * id: PROD-0005
 * name: Brand X Soda
 * unitPrice: 2.25
 * quantity: 50
 * storageLocation: in warehouse
 * stockStatus: bien
 * '200':
 * description: Quantity of existing product updated.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductResponse'
 * example:
 * success: true
 * message: Quantity of "Brand X Potato Chips" updated.
 * data:
 * id: PROD-0001
 * name: Brand X Potato Chips
 * unitPrice: 1.50
 * quantity: 30
 * storageLocation: in stock
 * stockStatus: bien
 * '400':
 * description: Error if required fields are not provided, data types are incorrect, or storage location is invalid.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Errores de validación
 * errors:
 * - El nombre del producto es requerido y debe ser una cadena de texto.
 * tags:
 * - Inventory
 */
router.post("/", inventoryController.addProduct);

/**
 * @swagger
 * /api/inventory:
 * get:
 * summary: Get the complete inventory list with pagination.
 * description: Returns a paginated list of all products in the inventory, including their quantity, price, and location.
 * parameters:
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * description: Page number for pagination.
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * description: Number of items per page for pagination.
 * responses:
 * '200':
 * description: Paginated list of products in the inventory.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/PaginatedInventoryResponse'
 * example:
 * success: true
 * message: Inventario recuperado exitosamente.
 * data:
 * totalItems: 50
 * totalPages: 5
 * currentPage: 1
 * products:
 * - id: PROD-0001
 * name: Brand X Potato Chips
 * unitPrice: 1.50
 * quantity: 20
 * storageLocation: in stock
 * stockStatus: bien
 * - id: PROD-0002
 * name: Brand Y Cookies
 * unitPrice: 2.00
 * quantity: 15
 * storageLocation: in stock
 * stockStatus: bien
 * '400':
 * description: Invalid page or limit parameters.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El parámetro 'page' debe ser un número entero positivo.
 * tags:
 * - Inventory
 */
router.get("/", inventoryController.getInventory);

// Rutas con parámetros de ruta al final (estas deben ir DESPUÉS de las rutas más específicas como '/search')
/**
 * @swagger
 * /api/inventory/{id}:
 * get:
 * summary: Get a product from the inventory by its ID.
 * description: Returns the detailed information of a specific product identified by its unique ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the product to retrieve.
 * schema:
 * type: string
 * example: PROD-0001
 * responses:
 * '200':
 * description: Product found.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductResponse'
 * example:
 * success: true
 * message: Producto encontrado.
 * data:
 * id: PROD-0001
 * name: Brand X Potato Chips
 * unitPrice: 1.50
 * quantity: 20
 * storageLocation: in stock
 * stockStatus: bien
 * '404':
 * description: Product not found.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Producto no encontrado.
 * tags:
 * - Inventory
 */
router.get("/:id", inventoryController.getProductById);

/**
 * @swagger
 * /api/inventory/{id}:
 * put:
 * summary: Update the information of a product by its ID.
 * description: Allows modifying the price, quantity, and location of an existing product. All fields are optional, but at least one must be provided.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the product to update.
 * schema:
 * type: string
 * example: PROD-0001
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * unitPrice:
 * type: number
 * format: float
 * example: 1.75
 * quantity:
 * type: integer
 * example: 25
 * storageLocation:
 * type: string
 * enum: ["in stock", "in warehouse"]
 * example: "in warehouse"
 * minProperties: 1
 * responses:
 * '200':
 * description: Product updated successfully.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ProductResponse'
 * example:
 * success: true
 * message: Producto con ID "PROD-0001" actualizado exitosamente.
 * data:
 * id: PROD-0001
 * name: Brand X Potato Chips
 * unitPrice: 1.75
 * quantity: 25
 * storageLocation: in warehouse
 * stockStatus: bien
 * '400':
 * description: Error if validation fails for any of the fields provided.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Errores de validación para la actualización.
 * errors:
 * - El precio unitario debe ser un número positivo.
 * '404':
 * description: Product not found.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Producto no encontrado.
 * tags:
 * - Inventory
 */
router.put("/:id", inventoryController.updateProduct);

/**
 * @swagger
 * /api/inventory/{id}:
 * delete:
 * summary: Delete a product from the inventory by its ID.
 * description: Removes a specific product from the inventory based on its unique ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * description: ID of the product to delete.
 * schema:
 * type: string
 * example: PROD-0001
 * responses:
 * '200':
 * description: Product deleted successfully.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * success:
 * type: boolean
 * example: true
 * message:
 * type: string
 * example: Product with ID "PROD-0001" deleted successfully.
 * '400':
 * description: Error if the product ID is not provided or invalid.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: El ID del producto es requerido para la eliminación.
 * '404':
 * description: Product not found.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/ErrorResponse'
 * example:
 * success: false
 * message: Producto con ID "PROD-0001" no encontrado.
 * tags:
 * - Inventory
 */
router.delete("/:id", inventoryController.deleteProduct);

export default router;
