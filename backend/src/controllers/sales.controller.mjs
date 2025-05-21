import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
import { getStockStatus } from "./inventory.controller.mjs";
import { inventory, salesHistory } from "../data/mockData.mjs";

/**
 * @function generateSaleId
 * @description Genera un ID único universal (UUID) para una nueva venta.
 * @returns {string} Un UUID v4 para la venta.
 */
const generateSaleId = () => {
  return uuidv4();
};

/**
 * @function recordSale
 * @description Registra una nueva venta en el sistema.
 * Valida la disponibilidad de los productos en el inventario,
 * actualiza las cantidades de stock y calcula el monto total de la venta.
 * @param {object} req - El objeto de solicitud de Express, esperando un cuerpo JSON con un array de `products`.
 * @param {Array<object>} req.body.products - Un array de objetos, donde cada objeto contiene `productId` (string) y `quantity` (number).
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 201 - Si la venta se registra exitosamente, retorna un objeto con `success`, `message` y los detalles de la `sale`.
 * @returns {object} 400 - Si no se proporcionan productos, si un producto no se encuentra en el inventario o si no hay stock suficiente.
 */
export const recordSale = (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No se proporcionaron productos para la venta.",
    });
  }

  const saleId = generateSaleId();
  const saleDate = new Date().toISOString();
  let totalSaleAmount = 0;
  const soldProducts = [];

  for (const item of products) {
    const { productId, quantity } = item;
    const productInInventory = inventory.find((p) => p.id === productId);

    if (!productInInventory) {
      return res.status(400).json({
        success: false,
        message: `Producto con ID "${productId}" no encontrado en el inventario.`,
      });
    }

    if (productInInventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente para el producto "${productInInventory.name}". Disponible: ${productInInventory.quantity}, Solicitado: ${quantity}`,
      });
    }

    const totalPrice = productInInventory.unitPrice * quantity;
    totalSaleAmount += totalPrice;

    soldProducts.push({
      productId: productInInventory.id,
      name: productInInventory.name,
      quantity,
      unitPrice: productInInventory.unitPrice,
      totalPrice,
    });

    productInInventory.quantity -= quantity;
    productInInventory.stockStatus = getStockStatus(
      productInInventory.quantity
    );
  }

  const newSaleRecord = {
    id: saleId,
    date: saleDate,
    products: soldProducts,
    totalSaleAmount,
  };

  salesHistory.push(newSaleRecord);

  return res.status(201).json({
    success: true,
    message: "Venta registrada exitosamente.",
    sale: newSaleRecord,
  });
};

/**
 * @function getSalesHistory
 * @description Recupera y retorna el historial completo de todas las ventas registradas.
 * @param {object} req - El objeto de solicitud de Express (no se utilizan parámetros en esta ruta).
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {object} 200 - Un objeto con `success`, `message` y un array de todos los registros de ventas en `data`.
 */
export const getSalesHistory = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Historial de ventas recuperado exitosamente.",
    data: salesHistory,
  });
};

/**
 * @function generateInvoicePDF
 * @description Genera un documento PDF de factura para una venta específica.
 * Esta función es auxiliar y se utiliza internamente para crear el buffer del PDF.
 * @param {object} sale - El objeto de venta que contiene `id`, `date`, `products` y `totalSaleAmount`.
 * @returns {Promise<Buffer>} Una promesa que resuelve con un Buffer que contiene los datos del PDF generado.
 * @throws {Error} Si ocurre un error durante la generación del PDF.
 */
export const generateInvoicePDF = (sale) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    doc.on("error", (error) => {
      reject(error);
    });

    doc.fontSize(20).text("Factura de Venta", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`ID de Venta: ${sale.id}`);
    doc.text(
      `Fecha: ${new Date(sale.date).toLocaleDateString()} ${new Date(
        sale.date
      ).toLocaleTimeString()}`
    );
    doc.moveDown();
    doc.fontSize(14).text("Productos:");
    doc.moveDown();

    const tableTop = doc.y;
    let itemY = tableTop + 25;
    const lineHeight = 15;

    doc.text("Producto", 50, tableTop, { width: 150 });
    doc.text("Cantidad", 200, tableTop, { width: 60, align: "right" });
    doc.text("Precio Unitario", 250, tableTop, { width: 110, align: "right" });
    doc.text("Precio Total", 350, tableTop, { width: 110, align: "right" });
    doc
      .moveTo(50, tableTop + lineHeight)
      .lineTo(550, tableTop + lineHeight)
      .stroke();

    sale.products.forEach((item) => {
      doc.text(item.name, 50, itemY, { width: 155 });
      doc.text(item.quantity.toString(), 200, itemY + 0.5, {
        width: 55,
        align: "right",
      });
      doc.text(`$${item.unitPrice.toFixed(2)}`, 250, itemY, {
        width: 105,
        align: "right",
      });
      doc.text(`$${item.totalPrice.toFixed(2)}`, 350, itemY, {
        width: 105,
        align: "right",
      });
      itemY += lineHeight;
    });

    doc
      .moveTo(50, itemY + lineHeight / 2)
      .lineTo(550, itemY + lineHeight / 2)
      .stroke();
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total: $${sale.totalSaleAmount.toFixed(2)}`, { align: "right" });

    doc.end();
  });
};

/**
 * @function downloadInvoice
 * @description Maneja la solicitud para descargar la factura de una venta específica en formato PDF.
 * Busca la venta por su ID y, si la encuentra, genera y envía el PDF al cliente.
 * @param {object} req - El objeto de solicitud de Express, esperando `saleId` en los parámetros de la ruta.
 * @param {string} req.params.saleId - El ID de la venta para la cual se desea generar la factura.
 * @param {object} res - El objeto de respuesta de Express.
 * @returns {void} Envía el archivo PDF si la venta se encuentra y el PDF se genera correctamente.
 * @returns {object} 404 - Si la venta con el `saleId` proporcionado no se encuentra.
 * @returns {object} 500 - Si ocurre un error interno al generar el PDF de la factura.
 */
export const downloadInvoice = async (req, res) => {
  const { saleId } = req.params;

  const sale = salesHistory.find((s) => s.id === saleId);

  if (!sale) {
    return res.status(404).json({
      success: false,
      message: `Venta con ID "${saleId}" no encontrada.`,
    });
  }

  try {
    const pdfBuffer = await generateInvoicePDF(sale);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="invoice_${saleId}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error al generar PDF:", error);
    res.status(500).json({
      success: false,
      message: "Fallo al generar el PDF de la factura.",
    });
  }
};
