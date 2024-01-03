const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')


const Order = sequelize.define("orders", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'meal_id'
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },

    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('active', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'active'
    }
}, 
)

module.exports = Order