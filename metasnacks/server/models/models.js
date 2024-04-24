const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique:true, allowNull:false},
    organisation_name:{type: DataTypes.STRING, allowNull:false},
    contactName:{type: DataTypes.STRING, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Basket = sequelize.define('basket',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:{type: DataTypes.INTEGER}
})

const Orders = sequelize.define('order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    detailsOrder: {type: DataTypes.STRING},
    detailsCart: {type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.DOUBLE},
    orderDate:{type: DataTypes.DATE},
    issued:{type: DataTypes.BOOLEAN}
})

const BasketOrder = sequelize.define('basketOrder',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Product = sequelize.define('product',{
    product_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_name:{type: DataTypes.STRING, allowNull:false},
    image_path:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false}
})

const BasketProduct = sequelize.define('basketProduct',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Stats =sequelize.define('stats',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    salesQuantity:{type: DataTypes.INTEGER},
    profit:{type: DataTypes.DECIMAL},
    avgProfit:{type: DataTypes.DECIMAL}
})

const Warehouse = sequelize.define('warehouse',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:{type: DataTypes.INTEGER}
})

const Info =sequelize.define('info',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull:false}
})

const Type = sequelize.define('type',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false, unique: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

Basket.belongsToMany(Product, {'through': BasketProduct})
Product.belongsToMany(Basket, {'through': BasketProduct})

Orders.belongsToMany(Basket, {'through': BasketOrder})
Basket.belongsToMany(Orders,{'through': BasketOrder})

Product.hasMany(Stats)
Stats.belongsTo(Product)

Product.hasMany(Info)
Info.belongsTo(Product)

Product.hasMany(Warehouse)
Warehouse.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Product)

module.exports = {
    User,
    Basket,
    Orders,
    Product,
    Warehouse,
    Type,
    Info,
    Stats,
    BasketOrder
}