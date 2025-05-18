import { v4 as uuidv4 } from 'uuid';
import { inventory, getStockStatus } from './inventory.controller.mjs';
import PDFDocument from 'pdfkit';

let salesHistory = [];

const generateSaleId = () => {
  return uuidv4();
}

export const recordSale = (req, res) => {
  const { products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No products provided." });
  }

  const saleId = generateSaleId();
  const saleDate = new Date().toISOString();
  let totalSaleAmount = 0;
  const soldProducts = [];

  for (const item of products) {
    const { productId, quantity } = item;
    const productInInventory = inventory.find(p => p.id === productId);

    if (!productInInventory) {
      return res.status(400).json({ message: `Product with ID "${productId}" not found in inventory.` });
    }

    if (productInInventory.quantity < quantity) {
      return res.status(400).json({ message: `Insufficient stock for product "${productInInventory.name}". Available: ${productInInventory.quantity}, Requested: ${quantity}` });
    }

    const totalPrice = productInInventory.unitPrice * quantity;
    totalSaleAmount += totalPrice;

    soldProducts.push({
      productId: productInInventory.id,
      name: productInInventory.name,
      quantity,
      unitPrice: productInInventory.unitPrice,
      totalPrice
    });

    productInInventory.quantity -= quantity;
    productInInventory.stockStatus = getStockStatus(productInInventory.quantity);
  }

  const newSaleRecord = {
    id: saleId,
    date: saleDate,
    products: soldProducts,
    totalSaleAmount
  };

  salesHistory.push(newSaleRecord);

  return res.status(201).json({ message: "Sale recorded successfully.", sale: newSaleRecord });
}

export const getSalesHistory = (req, res) => {
  return res.status(200).json(salesHistory);
}

export const generateInvoicePDF = (sale) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    doc.on('error', (error) => {
      reject(error);
    });

    doc.fontSize(20).text('Factura de Venta', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`ID de Venta: ${sale.id}`);
    doc.text(`Fecha: ${new Date(sale.date).toLocaleDateString()} ${new Date(sale.date).toLocaleTimeString()}`);
    doc.moveDown();
    doc.fontSize(14).text('Productos:');
    doc.moveDown();

    const tableTop = doc.y;
    let itemY = tableTop + 25;
    const lineHeight = 15;

    // Headers de la tabla
    doc.text('Producto', 50, tableTop, { width: 150 });
    doc.text('Cantidad', 200, tableTop, { width: 60, align: 'right' });
    doc.text('Precio Unitario', 250, tableTop, { width: 110, align: 'right' });
    doc.text('Precio Total', 350, tableTop, { width: 110, align: 'right' });
    doc.moveTo(50, tableTop + lineHeight)
      .lineTo(550, tableTop + lineHeight)
      .stroke();

    sale.products.forEach(item => {
      doc.text(item.name, 50, itemY, { width: 155 });
      doc.text(item.quantity.toString(), 200, itemY + 0.5, { width: 55, align: 'right' }); 
      doc.text(`$${item.unitPrice.toFixed(2)}`, 250, itemY, { width: 105, align: 'right' });
      doc.text(`$${item.totalPrice.toFixed(2)}`, 350, itemY, { width: 105, align: 'right' });
      itemY += lineHeight;
    });

    doc.moveTo(50, itemY + lineHeight / 2)
      .lineTo(550, itemY + lineHeight / 2)
      .stroke();
    doc.moveDown();
    doc.fontSize(14).text(`Total: $${sale.totalSaleAmount.toFixed(2)}`, { align: 'right' });

    doc.end();
  });
};

export const downloadInvoice = async (req, res) => {
  const { saleId } = req.params;

  const sale = salesHistory.find(s => s.id === saleId);

  if (!sale) {
    return res.status(404).json({ message: `Sale with ID "${saleId}" not found.` });
  }

  try {
    const pdfBuffer = await generateInvoicePDF(sale);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice_${saleId}.pdf"`);
    res.send(pdfBuffer); // Envía el buffer del PDF como respuesta
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate invoice PDF.' });
  }
};