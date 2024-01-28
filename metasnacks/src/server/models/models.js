const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    user_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:{type: DataTypes.STRING},
    organisation_name:{type: DataTypes.STRING, allowNull:false},
    itn:{type: DataTypes.INTEGER, unique:true, allowNull:false},
    password: {type: DataTypes.STRING, allowNull:false},
    role: {type: DataTypes.STRING, defaultvalue: "USER"}
})

const Orders = sequelize.define('orders',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:{type: DataTypes.INTEGER, allowNull:false},
    product_id:{type: DataTypes.INTEGER, allowNull:false},
    amount: {type: DataTypes.INTEGER, allowNull:false},
    order_date:{type: DataTypes.DATE},
    price:{type: DOUBLE, allowNull:false}
})

const Product = sequelize.define('product',{
    product_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_name:{type: DataTypes.STRING, allowNull:false},
    type_product:{type: DataTypes.INTEGER, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false}
})

const Recepts = sequelize.define('recepts',{
    id_product:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ingredient_id:{type: DataTypes.INTEGER, allowNull:false},
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
    name_type:{type: DataTypes.STRING, allowNull:false}
})

const Product_Order = sequelize.define('product_order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Warehouse_recepts = sequelize.define('product_order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Orders)
Orders.belongsTo(User)

Orders.belongsToMany(Product, {through: Product_Order})
Product.belongsToMany(Orders, {through: Product_Order})

TypeOfProduct.hasMany(Product)
Product.belongsTo(TypeOfProduct)

Product.hasOne(Recepts)
Recepts.belongsTo(Product)

Recepts.belongsToMany(Warehouse, {through: Warehouse_recepts})
Warehouse.belongsToMany(Recepts, {through: Warehouse_recepts})

module.exports = {
    User,
    Orders,
    Product,
    Recepts,
    Warehouse,
    TypeOfProduct,
    Product_Order,
    Warehouse_recepts
}