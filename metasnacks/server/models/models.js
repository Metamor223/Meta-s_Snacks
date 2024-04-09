const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique:true, allowNull:false},
    organisation_name:{type: DataTypes.STRING, allowNull:false},
    itn:{type: DataTypes.BIGINT, unique:true, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:{type: DataTypes.INTEGER}
})

const BasketProduct= sequelize.define('basket_product',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Orders = sequelize.define('order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    detailsOrder: {type: DataTypes.STRING},
    detailsCart: {type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.DOUBLE},
    orderDate:{type: DataTypes.DATE},
    issued:{type: DataTypes.BOOLEAN}
})

const OrderProduct = sequelize.define('order_product',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define('product',{
    product_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_name:{type: DataTypes.STRING, allowNull:false},
    image_path:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false}
})

const Recipes = sequelize.define('recipes',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    IngredientList:{type: DataTypes.STRING, allowNull:false}
})

const Warehouse = sequelize.define('warehouse',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    count:{type: DataTypes.INTEGER}
})

const TypeOfProduct = sequelize.define('typeofproduct',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_type:{type: DataTypes.STRING, allowNull:false, unique: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

TypeOfProduct.hasMany(Product)
Product.belongsTo(TypeOfProduct)

// Recipes.hasOne(Product)
// Product.belongsTo(Recipes)

Recipes.hasMany(Warehouse)
Warehouse.belongsTo(Recipes)

module.exports = {
    User,
    Orders,
    Product,
    Recipes,
    Warehouse,
    TypeOfProduct,
    OrderProduct
}