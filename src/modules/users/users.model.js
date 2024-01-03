const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')
const { encryptedPassword } = require('../../config/plugins/encryptedPassword.plugin')

const User = sequelize.define("users", {
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

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('available', 'disabled'),
        allowNull: false,
        defaultValue: 'available'
    },

    role: {
        type: DataTypes.ENUM('normal', 'admin'),
        allowNull: false,
        defaultValue: 'normal'
    }

}, {
    hooks: {
        beforeCreate: async(user) => {
            user.password = await encryptedPassword(user.password)
        }
    }
})

module.exports = User