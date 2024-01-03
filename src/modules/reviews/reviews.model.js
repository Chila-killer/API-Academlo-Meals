const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')


const Review = sequelize.define("reviews", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    },

    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "restaurant_id"
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('active', 'deleted'),
        allowNull: false,
        defaultValue: 'active'
    }
} 
)

module.exports = Review