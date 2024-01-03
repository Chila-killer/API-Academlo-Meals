const Order = require("../../modules/orders/orders.model")
const Meal = require("../../modules/meals/meals.model")
const Restaurant = require("../../modules/restaurants/restaurants.model")

class OrderServices {
    static async findAllOrders(userId) {
        return await Order.findAll({
            where: {
                userId
            },
            include: [{
                model: Meal,
                required: false,
                include: [{
                    model: Restaurant,
                    attributes: ['name']
                }],
                attributes: ['name']
        }]
        })
    }

    static async validateFindOne(id) {
        return await Order.findOne({
            where: {
                id,
                status: 'active'
            }
        })
    }

    static async findOneOrder(userId, id) {
        return await Order.findOne({
            where: {
                userId,
                id
            },
            include: [{
                model: Meal,
                required: false,
                include: [{
                    model: Restaurant,
                    attributes: ['name']
                }],
                attributes: ['name']
        }]
        })
    }

    static async createOrder(data) {
        return await Order.create(data)
    }

    static async updateOrder(order) {
        return await order.update({
            status: 'completed'
        })
    }

    static async deleteOrder(order) {
        return await order.update({
            status: 'cancelled'
        })
    }
}

module.exports = OrderServices