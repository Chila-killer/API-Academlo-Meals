const AppError = require('../../common/errors/appError')
const { catchAsync } = require('../../common/errors/catchAsync')
const MealServices = require('./meals.services')

const validateExistMeal = catchAsync(async ( req, res, next) => {
    const { id } = req.params
    const meal = await MealServices.findOne(id)

    if(!meal) {
        return next(new AppError(`Meal with id: ${id} not found`, 404))
    }

    req.meal = meal
    next()
})

module.exports = {
    validateExistMeal
}