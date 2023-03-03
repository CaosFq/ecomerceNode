const { DataTypes } = require("sequelize")
const { db } = require("../database/db")

const ProductImgs = db.define('productImg', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = ProductImgs;
