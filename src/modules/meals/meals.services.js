const Restaurant = require('../restaurants/restaurants.model')
const Meal = require('./meals.model')

class MealServices {

    static async create(data) {
        return await Meal.create(data)
    }

    static async findAll() {
        return await Meal.findAll({
            where: {
                status: 'active'
            },
            include: [{
                model: Restaurant
            }]
        })
    }

    static async findOne(id) {
        return await Meal.findOne({
            where: {
                id,
                status: 'active'
            },
            include: [{
                model: Restaurant
            }]
        })
    }

    static async update(meal, data) {
        return await meal.update(data)
    }

    static async delete(meal) {
        return await meal.update({
            status: 'inactive'
        })
    }

}

module.exports = MealServices
