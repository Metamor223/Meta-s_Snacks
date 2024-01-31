const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    user_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique:true, allowNull:false},
    organisation_name:{type: DataTypes.STRING, allowNull:false},
    itn:{type: DataTypes.INTEGER, unique:true, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Orders = sequelize.define('orders',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:{type: DataTypes.INTEGER, allowNull:false},
    product_id:{type: DataTypes.INTEGER, allowNull:false},
    amount: {type: DataTypes.INTEGER, allowNull:false},
    order_date:{type: DataTypes.DATE},
    price:{type: DataTypes.DOUBLE, allowNull:false}
})

const Product = sequelize.define('product',{
    product_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_name:{type: DataTypes.STRING, allowNull:false},
    type_product:{type: DataTypes.INTEGER, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false}
})

const Recepts = sequelize.define('recepts',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:{type: DataTypes.INTEGER, allowNull:false},
    image_path:{type: DataTypes.STRING, allowNull:false}
})

const Warehouse = sequelize.define('warehouse',{
    id_ingredient:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false},
    count:{type: DataTypes.INTEGER, allowNull:false}
})

const TypeOfProduct = sequelize.define('typeofproduct',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_type:{type: DataTypes.STRING, allowNull:false, unique: true}
})

User.hasMany(Orders)
Orders.belongsTo(User)

Orders.hasMany(Product)
Product.belongsTo(Orders)

TypeOfProduct.hasMany(Product)
Product.belongsTo(TypeOfProduct)

Product.belongsToMany(Warehouse, {through: Recepts})
Warehouse.belongsToMany(Product, {through: Recepts})

module.exports = {
    User,
    Orders,
    Product,
    Recepts,
    Warehouse,
    TypeOfProduct
}