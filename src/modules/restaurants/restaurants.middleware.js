const AppError = require('../../common/errors/appError')
const { catchAsync } = require('../../common/errors/catchAsync')
const RestaurantServices = require('./restaurants.services')

const validateExistRestaurant = catchAsync(async ( req, res, next) => {
    const { id } = req.params

    const restaurant = await RestaurantServices.findOne(id)

    if(!restaurant) {
        return next(new AppError(`Restaurant with id: ${id} not found`, 404))
    }

    req.restaurant = restaurant
    next()
})

module.exports = {
    validateExistRestaurant
}