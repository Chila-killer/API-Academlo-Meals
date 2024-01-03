const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')


const Meal = sequelize.define("meals", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'restaurant_id'
    },

    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active"
    }
}, 
)

module.exports = Meal