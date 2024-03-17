const server = require('../controllers/typeController')
const axios = require("axios");

jest.mock('axios')

// Переопределяем конфигурацию подключения к базе данных для тестов
jest.mock('../.env', () => ({
    development: {
        username: 'postgres',
        password: '89119387037',
        database: 'meta-snacks',
        host: 'localhost',
        port: 1443,
        dialect: 'postgres',
    },
}));

jest.mock('G:\\Java\\Metasnacks\\src\\js\\metasnacks\\server\\models\\models.js', () => ({
    TypeOfProduct: {
        findAll: jest.fn()
    }
}));

describe('getDataCategories', () => {
    let response
    beforeEach(()=>{
        response = {
            data: [
                {
                    "id": 1,
                    "name_type": "Chips"
                },
                {
                    "id": 2,
                    "name_type": "Crackers"
                },
                {
                    "id": 3,
                    "name_type": "Hazelnuts"
                },
                {
                    "id": 4,
                    "name_type": "jerky"
                }
            ]
        }
        axios.get.mockReturnValue(Promise.resolve(response));
    })

    test('What the reason of disappointed', async () => {
        const req = {};
        const res = {
            json: jest.fn() // Мокируем метод json()
        };
        const data = await server.getAll(req, res);
        expect(axios.get).toBeCalledTimes(0);
        expect(res.json).toHaveBeenCalled();
        expect(data).toEqual([
            { id: 1, name_type: "Chips" },
            { id: 2, name_type: "Crackers" },
            { id: 3, name_type: "Hazelnuts" },
            { id: 4, name_type: "jerky" }
        ])
    })
})
