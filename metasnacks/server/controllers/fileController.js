const fs = require('fs');
const path = require('path');
const { Product } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Document, Packer, Table, TableRow, TableCell, Paragraph } = require('docx');

class FileController {
    async downloadFile(req, res) {
        try {
            console.log('Downloading file...');

            const products = await Product.findAll();
            if (!products || products.length === 0) {
                throw ApiError.forbidden('No products found');
            }

            const tableRows = [
                new TableRow({
                    children: [
                        new TableCell({children: [new Paragraph("Product ID")]}),
                        new TableCell({children: [new Paragraph("Product Name")]}),
                        new TableCell({children: [new Paragraph("Type")]}),
                        new TableCell({children: [new Paragraph("Description")]}),
                        new TableCell({children: [new Paragraph("Price")]}),
                    ],
                }),
                ...products.map(product => new TableRow({
                    children: [
                        new TableCell({children: [new Paragraph(product.product_id.toString())]}),
                        new TableCell({children: [new Paragraph(product.Product_name)]}),
                        new TableCell({children: [new Paragraph(product.typeId.toString())]}),
                        new TableCell({children: [new Paragraph(product.description)]}),
                        new TableCell({children: [new Paragraph(product.price.toString())]}),
                    ],
                }))
            ];

            const doc = new Document({
                creator: 'Your Name',
            });

            const table = new Table({rows: tableRows})

            doc.addSection({
                children:  [table],
            });

            Packer.toBuffer(doc).then((buffer) => {
            const filePath = path.resolve(__dirname, '..', 'downloads', 'products.docx');
            fs.writeFileSync(filePath, buffer);
            console.log('File successfully generated:', filePath);
            res.download(filePath, 'products.docx');
            });
        } catch (e) {
            console.error('Error generating file:', e);
            res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

module.exports = new FileController();
