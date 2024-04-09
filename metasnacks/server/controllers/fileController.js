const fs = require('fs');
const path = require('path');
const { Product } = require('../models/models');
const ApiError = require('../error/ApiError');

// Функция для генерации содержимого файла
const generateFileContent = (products) => {
    let content = 'Product ID | Product Name | Type | Description | Price\n';
    products.forEach(product => {
        content += `${product.product_id} | ${product.Product_name} | ${product.typeofproductId} | ${product.description} | ${product.price}\n`;
    });
    return content;
};

class FileController {
    async downloadFile(req, res) {
        try {
            console.log('Downloading file...'); // Добавляем лог перед началом загрузки файла

            const products = await Product.findAll();
            if (!products || products.length === 0) {
                throw ApiError.forbidden('No products found');
            }
            const fileContent = generateFileContent(products);

            const filePath = path.resolve(__dirname, '..', 'downloads', 'products.txt');
            fs.writeFileSync(filePath, fileContent);

            console.log('File successfully generated:', filePath); // Добавляем лог после успешной генерации файла

            // Отправляем файл на frontend
            res.download(filePath, 'products.txt');
        } catch (e) {
            console.error('Error generating file:', e);
            res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

module.exports = new FileController();
