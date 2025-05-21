import { inventory, generateProductId } from "../data/mockData.mjs";

/**
 * @function getStockStatus
 * @description Determina el estado del stock de un producto basándose en su cantidad actual.
 * @param {number} cantidad - La cantidad actual del producto.
 * @returns {string} - "bien" si la cantidad es > 10, "medio" si es > 3, "bajo" en caso contrario.
 */
export const getStockStatus = (cantidad) => {
  if (cantidad > 10) {
    return "bien";
  } else if (cantidad > 3) {
    return "medio";
  } else {
    return "bajo";
  }
};

/**
 * @function addProduct
 * @description Añade un nuevo producto al inventario o actualiza la cantidad y ubicación de uno existente.
 * Valida los datos de entrada y maneja la lógica de adición/actualización.
 * @param {object} req - El objeto de solicitud de Express, esperando `name`, `unitPrice`, `quantity`, `storageLocation` en `req.body`.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 201 - Si se añade un nuevo producto.
 * @returns {object} 200 - Si se actualiza un producto existente.
 * @returns {Error} 400 - Si la validación de los datos falla.
 */
export const addProduct = (req, res) => {
  const { name, unitPrice, quantity, storageLocation } = req.body;

  const parsedUnitPrice = parseFloat(unitPrice);
  const parsedQuantity = parseInt(quantity);

  const errors = [];

  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push(
      "El nombre del producto es requerido y debe ser una cadena de texto."
    );
  }
  if (isNaN(parsedUnitPrice) || parsedUnitPrice <= 0) {
    errors.push("El precio unitario debe ser un número positivo.");
  }
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    errors.push("La cantidad debe ser un número entero positivo.");
  }
  if (
    !storageLocation ||
    (storageLocation !== "in stock" && storageLocation !== "in warehouse")
  ) {
    errors.push(
      "La ubicación de almacenamiento debe ser 'in stock' o 'in warehouse'."
    );
  }

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ success: false, message: "Errores de validación", errors });
  }

  const existingProduct = inventory.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (existingProduct) {
    existingProduct.quantity += parsedQuantity;
    existingProduct.storageLocation = storageLocation;
    existingProduct.stockStatus = getStockStatus(existingProduct.quantity);
    return res.status(200).json({
      success: true,
      message: `Cantidad de "${name}" actualizada.`,
      data: existingProduct,
    });
  } else {
    const newProduct = {
      id: generateProductId(),
      name: name.trim(),
      unitPrice: parsedUnitPrice,
      quantity: parsedQuantity,
      storageLocation,
      stockStatus: getStockStatus(parsedQuantity),
    };

    inventory.push(newProduct);
    return res.status(201).json({
      success: true,
      message: `Producto "${name}" añadido.`,
      data: newProduct,
    });
  }
};

/**
 * @function getInventory
 * @description Recupera la lista completa de productos del inventario con soporte de paginación.
 * @param {object} req - El objeto de solicitud de Express, esperando `page` y `limit` como parámetros de consulta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Un objeto que contiene los productos paginados, el total de ítems y el total de páginas.
 * @returns {Error} 400 - Si los parámetros de paginación (`page` o `limit`) son inválidos.
 */
export const getInventory = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (isNaN(page) || page < 1) {
    return res.status(400).json({
      success: false,
      message: "El parámetro 'page' debe ser un número entero positivo.",
    });
  }
  if (isNaN(limit) || limit < 1) {
    return res.status(400).json({
      success: false,
      message: "El parámetro 'limit' debe ser un número entero positivo.",
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalItems = inventory.length;

  const results = inventory.slice(startIndex, endIndex);

  return res.status(200).json({
    success: true,
    message: "Inventario recuperado exitosamente.",
    data: {
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      products: results,
    },
  });
};

/**
 * @function getProductById
 * @description Busca y recupera un producto específico del inventario por su ID único.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el producto es encontrado.
 * @returns {Error} 404 - Si el producto no es encontrado.
 */
export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = inventory.find((item) => item.id === id);

  if (product) {
    return res.status(200).json({
      success: true,
      message: "Producto encontrado.",
      data: product,
    });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Producto no encontrado." });
  }
};

/**
 * @function searchProductByName
 * @description Busca productos en el inventario por su nombre (búsqueda no sensible a mayúsculas/minúsculas).
 * @param {object} req - El objeto de solicitud de Express, esperando `name` como parámetro de consulta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Una lista de productos que coinciden con el término de búsqueda (puede estar vacía si no hay coincidencias).
 * @returns {Error} 400 - Si el parámetro de búsqueda `name` no es proporcionado o es inválido.
 */
export const searchProductByName = (req, res) => {
  const { name } = req.query;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "El nombre del producto para la búsqueda es requerido.",
    });
  }

  const results = inventory.filter((item) =>
    item.name.toLowerCase().includes(name.toLowerCase().trim())
  );

  if (results.length === 0) {
    return res.status(200).json({
      success: true,
      message: `No se encontraron productos que coincidan con "${name}".`,
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: `Resultados de búsqueda para "${name}".`,
    data: results,
  });
};

/**
 * @function updateProduct
 * @description Actualiza la información (precio, cantidad, ubicación) de un producto existente por su ID.
 * Valida los campos proporcionados y actualiza el estado del stock.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta y campos a actualizar en `req.body`.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el producto es actualizado exitosamente.
 * @returns {Error} 400 - Si los datos de actualización son inválidos.
 * @returns {Error} 404 - Si el producto no es encontrado.
 */
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { unitPrice, quantity, storageLocation } = req.body;

  if (!id || typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "El ID del producto es requerido para la actualización.",
    });
  }

  const productIndex = inventory.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Producto no encontrado." });
  }

  const productToUpdate = inventory[productIndex];
  const updateErrors = [];

  if (unitPrice !== undefined) {
    const parsedUnitPrice = parseFloat(unitPrice);
    if (isNaN(parsedUnitPrice) || parsedUnitPrice <= 0) {
      updateErrors.push("El precio unitario debe ser un número positivo.");
    } else {
      productToUpdate.unitPrice = parsedUnitPrice;
    }
  }

  if (quantity !== undefined) {
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      updateErrors.push("La cantidad debe ser un número entero no negativo.");
    } else {
      productToUpdate.quantity = parsedQuantity;
      productToUpdate.stockStatus = getStockStatus(parsedQuantity);
    }
  }

  if (storageLocation !== undefined) {
    if (storageLocation !== "in stock" && storageLocation !== "in warehouse") {
      updateErrors.push(
        "La ubicación de almacenamiento debe ser 'in stock' o 'in warehouse'."
      );
    } else {
      productToUpdate.storageLocation = storageLocation;
    }
  }

  if (updateErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación para la actualización.",
      errors: updateErrors,
    });
  }

  inventory[productIndex] = productToUpdate;

  return res.status(200).json({
    success: true,
    message: `Producto con ID "${id}" actualizado exitosamente.`,
    data: productToUpdate,
  });
};


/**
 * @function deleteProduct
 * @description Elimina un producto del inventario por su ID único.
 * @param {object} req - El objeto de solicitud de Express, esperando `id` como parámetro de ruta.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Si el producto es eliminado exitosamente.
 * @returns {Error} 400 - Si el ID del producto no es proporcionado o es inválido.
 * @returns {Error} 404 - Si el producto no es encontrado.
 */
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "El ID del producto es requerido para la eliminación.",
    });
  }

  const initialLength = inventory.length;

  const newInventory = inventory.filter((item) => item.id !== id);

  if (newInventory.length < initialLength) {
    inventory.splice(0, inventory.length, ...newInventory);
    return res.status(200).json({
      success: true,
      message: `Producto con ID "${id}" eliminado exitosamente.`,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: `Producto con ID "${id}" no encontrado.`,
    });
  }
};
