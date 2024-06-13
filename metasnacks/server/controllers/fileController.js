const fs = require('fs');
const path = require('path');
const { User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Document, Packer, Table, TableRow, TableCell, Paragraph } = require('docx');

class FileController {
    async downloadFile(req, res) {
        try {
            console.log('Downloading file...');
            const role = 'USER'
            const users = await User.findAll({
                where:{role:role}
            });
            if (!users || users.length === 0) {
                throw ApiError.forbidden('No products found');
            }

            const tableRows = [
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph('ID пользователя')] }),
                        new TableCell({ children: [new Paragraph('Название организации')] }),
                        new TableCell({ children: [new Paragraph('Имя заказчика')] }),
                        new TableCell({ children: [new Paragraph('Номер телефона')] }),
                        new TableCell({ children: [new Paragraph('Откуда узнал о компании')] }),
                    ],
                }),
                ...users.map((user) => new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph(user.id.toString())] }),
                        new TableCell({ children: [new Paragraph(user.organisation_name)] }),
                        new TableCell({ children: [new Paragraph(user.contactName)] }),
                        new TableCell({ children: [new Paragraph(user.phoneNumber.toString())] }),
                        new TableCell({ children: [new Paragraph(user.comeFrom)] }),
                    ],
                })),
            ];

            const table = new Table({ rows: tableRows });

            const doc = new Document({
                creator: 'Your Name', // Replace with your name or app name
                sections: [ // Make sure 'sections' is an array
                    {
                        properties: {}, // Section properties (can be empty)
                        children: [table], // Add the table as a child of the section
                    },
                ],
            });

            const buffer = await Packer.toBuffer(doc);
            const filePath = path.resolve(__dirname, '..', 'downloads', 'products.docx');
            fs.writeFileSync(filePath, buffer);
            console.log('File successfully generated:', filePath);
            res.download(filePath, 'products.docx');

        } catch (e) {
            console.error('Error generating file:', e);
            res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

module.exports = new FileController();
