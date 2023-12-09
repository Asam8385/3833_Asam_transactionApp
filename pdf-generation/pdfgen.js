const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');


function generatePDF(transactions) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        transactions = JSON.parse(transactions)
        doc.font('Helvetica');
    
        // Table header
        doc.font('Helvetica-Bold');
        drawTableCell(doc, 'Date', 50, 50, 200, 30, 'left');
        drawTableCell(doc, 'Amount', 250, 50, 200, 30, 'right');
        doc.font('Helvetica');
    
        // Table rows
        transactions.forEach((transaction, index) => {
          const yOffset = 80 + index * 30;
          drawTableCell(doc, transaction.date_of_transaction, 50, yOffset, 200, 30, 'left');
          drawTableCell(doc, transaction.amount, 250, yOffset, 200, 30, 'right');
        });
    
        // Save the PDF to a buffer
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });
    
        doc.end();
      });
  
}

function drawTableCell(doc, text, x, y, width, height, align) {
  doc.rect(x, y, width, height).stroke();
  doc.text(text, x + 5, y + 5, { width: width - 10, align });
}

module.exports = generatePDF;
