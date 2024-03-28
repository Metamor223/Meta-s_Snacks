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

const Orders = sequelize.define('order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    detailsOrder: {type: DataTypes.STRING},
    detailsCart: {type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.DOUBLE},
    order_date:{type: DataTypes.DATE},
    issued:{type: DataTypes.BOOLEAN}
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
    count:{type: DataTypes.INTEGER, allowNull:false}
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

Product.belongsToMany(Warehouse, {through: Recipes})
Warehouse.belongsToMany(Product, {through: Recipes})

module.exports = {
    User,
    Orders,
    Product,
    Recipes,
    Warehouse,
    TypeOfProduct
}