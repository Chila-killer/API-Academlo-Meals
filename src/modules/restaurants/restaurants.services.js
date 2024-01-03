const Restaurant = require("./restaurants.model")
const Review = require("../reviews/reviews.model")

class RestaurantServices {

    static async create(data) {
        return await Restaurant.create(data)
    }

    static async findAll() {
        return await Restaurant.findAll({
            where: {
                status: "active"
            },
            include: [{
                model: Review,
                required: false
            }]
        })
    }

    static async findOne(id) {
        return await Restaurant.findOne({
            where: {
                id,
            },
            include: [{
                model: Review,
                required: false
            }]
        })
    }

    static async update(restaurant, data) {
        return await restaurant.update(data)
    }

    static async delete(restaurant) {
        return await restaurant.update({
            status: 'inactive'
       })
    }
}

module.exports = RestaurantServices