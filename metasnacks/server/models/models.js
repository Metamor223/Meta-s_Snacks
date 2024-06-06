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

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user', key: 'id' } },
    receiverId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'user', key: 'id' } },
    text: { type: DataTypes.TEXT, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

const Orders = sequelize.define('order',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    CompanyName: {type: DataTypes.STRING},
    detailsOrder: {type: DataTypes.STRING, allowNull:false},
    orderDate:{type: DataTypes.DATE},
    price:{type: DataTypes.DECIMAL},
})

const Status = sequelize.define('status',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING}
})

const Product = sequelize.define('product',{
    product_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Product_name:{type: DataTypes.STRING, allowNull:false},
    image_path:{type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.INTEGER, allowNull:false}
})

const Warehouse = sequelize.define('warehouse',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING},
    count:{type: DataTypes.INTEGER}
})

const Type = sequelize.define('type',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull:false, unique: true}
})

User.hasMany(Orders)
Orders.belongsTo(User)

Product.hasMany(Warehouse)
Warehouse.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Product)

Status.hasMany(Orders)
Orders.belongsTo(Status)

module.exports = {
    User,
    Orders,
    Product,
    Warehouse,
    Type,
    Message,
    Status
}