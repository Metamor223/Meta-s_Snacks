const { Basket, BasketProduct, Product } = require("../models/models");

class BasketController {
    /*async getBasket(req, res) {
        try {
            const userId = req.user.id;
            console.log("userId:", req.user.id);
            const basket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: Product // Подгружаем товары
                }]
            });
            console.log("basket:", basket);
            if (!basket) {
                const newBasket = await Basket.create({ userId, count: 0 });
                return res.json(newBasket);
            }

            return res.json(basket); // Возвращаем корзину с товарами и count
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async addToBasket(req, res) {
        try {
            const userId = req.user.id;
            const {productProductId} = req.body;

            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return res.status(400).json({ message: 'Корзина не найдена' });
            }

            let basketProduct = await BasketProduct.findOne({
                where: { basketId: basket.id, productProductId }
            });

            if (basketProduct) {
                // Если товар уже в корзине, увеличиваем количество
                basket.count += 1;
                await basket.save();
            } else {
                // Если товара нет, создаем новый элемент корзины
                basketProduct = await BasketProduct.create({
                    basketId: basket.id,
                    productProductId,
                    count: 1
                });

                basket.count +=1;
                await basket.save();
            }

            return res.json(basketProduct);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async deleteFromBasket(req, res) {
        try {
            const userId = req.user.id;
            const { productProductId } = req.body;

            const basket = await Basket.findOne({where: { userid }});

            if (!basket) {
                return res.status(400).json({ message: "Корзина не найдена" });
            }

            const basketProduct = await BasketProduct.findOne({
                where: { basketId: basket.id, productProductId },
            });

            if (!basketProduct) {
                return res.status(404).json({ message: "Товар не найден в корзине" });
            }

            basket.count -= 1;
            await basket.save();

            await basketProduct.destroy();
            res.json({ message: 'Товар удален из корзины' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }*/
}

module.exports = new BasketController();