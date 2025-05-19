export let inventory = [];

const generateProductId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const getStockStatus = (cantidad) => {
  if (cantidad > 10) {
    return "bien";
  } else if (cantidad > 3) {
    return "medio";
  } else {
    return "bajo";
  }
};

export const addProduct = (req, res) => {
  const { name, unitPrice, quantity, storageLocation } = req.body;

  if (
    !name ||
    unitPrice === undefined ||
    quantity === undefined ||
    !storageLocation
  ) {
    return res.status(400).json({
      message: "Name, unit price, quantity, and storage location are required.",
    });
  }

  if (storageLocation !== "in stock" && storageLocation !== "in warehouse") {
    return res.status(400).json({
      message: "Storage location must be 'in stock' or 'in warehouse'.",
    });
  }

  const existingProductIndex = inventory.findIndex(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (existingProductIndex > -1) {
    inventory[existingProductIndex].quantity += parseInt(quantity);
    inventory[existingProductIndex].storageLocation = storageLocation;
    inventory[existingProductIndex].stockStatus = getStockStatus(
      inventory[existingProductIndex].quantity
    );
    return res.status(200).json({
      message: `Quantity of "${name}" updated`,
      product: inventory[existingProductIndex],
    });
  } else {
    const newProduct = {
      id: generateProductId(),
      name,
      unitPrice: parseFloat(unitPrice),
      quantity: parseInt(quantity),
      storageLocation,
      stockStatus: getStockStatus(parseInt(quantity)),
    };

    inventory.push(newProduct);
    return res
      .status(201)
      .json({ message: `Product "${name}" added`, product: newProduct });
  }
};

export const getInventory = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res.status(400).json({ message: "Invalid page or limit parameters." });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalItems = inventory.length;

  const results = inventory.slice(startIndex, endIndex);

  return res.status(200).json({
    totalItems: totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
    products: results,
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  const product = inventory.find((item) => item.id === id);

  if (product) {
    return res.status(200).json(product);
  } else {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const searchProductByName = (req, res) => {
    console.log("Función searchProductByName ejecutada:", req.query.name);
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: "Product name is required for searching." });
    }

    const results = inventory.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase())
    );

    console.log("Resultados de la búsqueda:", results); // Agrega este log también

    if (results.length > 0) {
        return res.status(200).json(results);
    } else {
        return res.status(404).json({ message: `No products found with the name "${name}".` });
    }
};

export const updateProduct = (req, res) => {
  const { id } = req.body;
  const { unitPrice, quantity, storageLocation } = req.body;
  const productIndex = inventory.findIndex((item) => item.id === id);

  if (productIndex > -1) {
    if (unitPrice !== undefined) {
      inventory[productIndex].unitPrice = parseFloat(unitPrice);
    }

    if (quantity !== undefined) {
      inventory[productIndex].quantity = parseInt(quantity);
      inventory[productIndex].stockStatus = getStockStatus(parseInt(quantity));
    }

    if (
      storageLocation &&
      (storageLocation === "in stock" || storageLocation === "in warehouse")
    ) {
      inventory[productIndex].storageLocation = storageLocation;
    } else if (storageLocation) {
      return res.status(400).json({
        message: "Storage location must be 'in stock' or 'in warehouse'.",
      });
    }

    return res.status(200).json({
      message: `Product with ID "${id}" updated`,
      product: inventory[productIndex],
    });
  } else {
    return res.status(404).json({ message: "Product not found." });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const initialLength = inventory.length;
  inventory = inventory.filter((item) => item.id !== id);

  if (inventory.length < initialLength) {
    return res.status(200).json({ message: `Product with ID "${id}" deleted.` });
  } else {
    return res.status(404).json({ message: `Product with ID "${id}" not found.` });
  }
};
