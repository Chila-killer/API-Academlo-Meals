const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')


const Restaurant = sequelize.define("restaurants", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    }
}, 
)

module.exports = Restaurant