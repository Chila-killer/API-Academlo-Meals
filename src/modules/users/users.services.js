const { where } = require('sequelize')

const Users = require('./users.model')

class UsersServices {
    // static async findAllOrders(id) {
    //     return await Users.findAll({
    //         where: {
    //             status: 'available'
    //         }
    //     })
    // }

    static async create(data) {
        return await Users.create(data)
    }

    static async validateEmail(email) {
        return await Users.findOne({
            where: {
                email
            }
        })
    }

    static async findOne(id) {
        return await Users.findOne({
            where: {
                id,
            }
        })
    }

    static async update(user, data) {
        return await user.update(data)
    }

    static async delete(user) {
       return await user.update({
            status: 'disabled'
       })
    }
}

module.exports = UsersServices